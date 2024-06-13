<?php

namespace App\Listeners;

use App\Events\SalesPolicyEvent;
use App\Models\Deal;
use App\Models\DealStageChange;
use Notification;
use App\Models\PendingAction;
use App\Models\PendingActionPast;
use App\Models\PolicyQuestionValue;
use App\Models\User;
use App\Notifications\SalesPolicyNotification;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;

class SalesPolicyEventListener
{

    protected $eventTypes = [
        'sales_risk_authorization' => [
            'code' => 'SRA',
            'item_name' => 'Sales risk analysis admin authorization',
            'heading' => 'Sales risk Authorization!',
            'message' => 'Project projectName from Client clientName requires (Sales person: salesPerson) risk analysis and authorization!',
            'timeframe' => 12,
            'past' => [
                'accept' => 'Sales risk for project projectName from Client clientName (Sales person: salesPerson) was authorized by admin authorizedBy!',
                'deny' => 'Sales risk for project projectName from Client clientName requires (Sales person: salesPerson) was rejected by admin authorizedBy!',
            ]
        ],

        'sales_lead_authorization' => [
            'code' => 'ASA',
            'item_name' => 'Sales authorization needed',
            'heading' => 'Sales Authorization!',
            'message' => 'Project projectName from Client clientName requires sales authorization (Sales Rep: salesPerson).',
            'timeframe' => 3,
            'past' => 'Project projectName from Client clientName from Sales Rep: salesPerson was authorized by sales lead authorizedBy'
        ],
        'pending_large_from_submission' => [
            'code' => 'PLFS',
            'item_name' => 'Larger form fill up by the sales person',
            'heading' => 'Finish the pending works for your own deal!',
            'message' => 'Finish pending works for your own deal projectName from Client clientName!',
            'timeframe' => 12,
            'past' => 'Pending works for deal projectName was completed!'
        ]
    ];


    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\SalesPolicyEvent  $event
     * @return void
     */
    public function handle(SalesPolicyEvent $event)
    {
        DB::beginTransaction();
        switch ($event->type) {
            case 'sales_risk_authorization':
                if (! isset($event->data['past'])) self::salesRiskAuthorizationPendingAction($event);
                else self::salesRiskAuthorizationPastAction($event);
                break;
            case 'sales_lead_authorization':
                if (! isset($event->data['past'])) self::saleLeadAuthorizationPendingAction($event);
                else self::saleLeadAuthorizationPastAction($event);
                break;
            case 'pending_large_from_submission':
                if (! isset($event->data['past'])) self::submitLargeFromPendingAction($event);
                else self::submitLargeFromPostAction($event);
                break;
        }

        DB::commit();
    }

    public function salesRiskAuthorizationPendingAction($event)
    {
        $data = $this->eventTypes[$event->type];
        $deal = $event->deal;
        $questionValue = $event->data['questionValue'];

        $users = User::where('role_id', 1)->get();

        $salesUser = User::find($questionValue->submitted_by);
        // 'message' => 'Project $projectName from client $clientName requires (Sales person: $salesPerson) risk analysis and authorization!',

        $messageData = [
            'projectName' => "<a href='" . route('contracts.show', $deal->id) . "'>$deal->project_name</a>",
            'clientName' => "<a href='" . route('clients.show', $deal->client_id) . "'>$deal->client_name</a>",
            'client' => $deal->client_name,
            'salesPerson' => "<a href='" . route('employees.show', $salesUser->id) . "'>$salesUser->name</a>",
            'salesPoint' => $event->data['points']
        ];

        $data['message'] = strtr($data['message'], $messageData);


        foreach ($users as $key => $user) {

            $action = new PendingAction();
            $action->code = $data['code'];
            $action->serial = $data['code'] . 'x' . $key;
            $action->item_name = $data['item_name'];
            $action->heading = $data['heading'];
            $action->message = $data['message'];
            $action->timeframe = $data['timeframe'];
            $action->deal_id = $deal->id;
            $action->client_id = $deal->client_id;
            $action->authorization_for = $user->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('account.sales-analysis-report', $deal->id),
                ],
            ];
            $action->button = json_encode($button);
            $action->save();


            // notify user
            Notification::send($user, new SalesPolicyNotification('sales_risk_authorization',  $messageData, route('account.sales-analysis-report', $deal->id)));
        }
    }

    public function salesRiskAuthorizationPastAction($event)
    {
        $data = $this->eventTypes[$event->type];
        $deal = $event->deal;
        $past = $event->data['past'];


        $questionValue = PolicyQuestionValue::where('deal_id', $deal->id)->first();
        $salesUser = User::find($questionValue->submitted_by);

        $message = strtr($data['past'][$past], [
            'projectName' => "<a href='" . route('contracts.show', $deal->id) . "'>$deal->project_name</a>",
            'clientName' => "<a href='" . route('clients.show', $deal->client_id) . "'>$deal->client_name</a>",
            'salesPerson' => "<a href='" . route('employees.show', $salesUser->id) . "'>$salesUser->name</a>",
            'authorizedBy' => "<a href='" . route('employees.show', auth()->user()->id) . "'>" . auth()->user()->name . "</a>"
        ]);

        PendingAction::where([
            'code' => $data['code'],
            'past_status' => 0,
            'deal_id' => $deal->id
        ])->get()->map(function ($item) use ($message) {

            $item->authorized_by = auth()->user()->id;
            $item->authorized_at = Carbon::now();
            $item->past_status = 1;
            $item->save();

            // past action
            $pastAction = new PendingActionPast();
            $pastAction->item_name = $item->item_name;
            $pastAction->code = $item->code;
            $pastAction->serial = $item->serial;
            $pastAction->action_id = $item->id;
            $pastAction->heading = $item->heading;
            $pastAction->message = $message;
            $pastAction->timeframe = $item->timeframe;
            $pastAction->authorization_for = $item->authorization_for;
            $pastAction->authorized_by = $item->authorized_by;
            $pastAction->authorized_at = $item->authorized_at;
            $pastAction->past_status = $item->past_status;
            $pastAction->client_id = $item->client_id;
            $pastAction->save();
        });
    }

    public function saleLeadAuthorizationPendingAction($event)
    {
        $data = $this->eventTypes[$event->type];

        if ($event->deal->authorization_status != 2 || $event->deal->released_at == null) return;

        $deal = $event->deal;

        $questionValue = PolicyQuestionValue::where('deal_id', $deal->id)->first();

        $users = User::where('role_id', 8)->get();

        $salesUser = User::find($questionValue->submitted_by);
        // 'message' => 'Project projectName from Client clientName requires sales authorization (Sales Rep: salesPerson).',

        $messageData = [
            'projectName' => "<a href='" . route('contracts.show', $deal->id) . "'>$deal->project_name</a>",
            'clientName' => "<a href='" . route('clients.show', $deal->client_id) . "'>$deal->client_name</a>",
            'client' => $deal->client_name,
            'salesPerson' => "<a href='" . route('employees.show', $salesUser->id) . "'>$salesUser->name</a>",
        ];

        $data['message'] = strtr($data['message'], $messageData);

        $releasedAt = date_create($deal->released_at);
        $time = (float) $releasedAt->format('H'). $releasedAt->format('.i');

        /**
         * 3 hours for sales made from 7.01am - 11.30 pm.
         * For sales made from 11.31pm - 7am, sales lead will get till 10 am in the morning.
         *  */
        if($time > 7.00 && $time <= 21.30) $data['timeframe'] = 3;
        else {
            $d2 = date_create(date('Y-m-d 10:00:00'));
            $diff = date_diff($releasedAt, $d2);
            $data['timeframe'] = (float) $diff->format('%H.%i');
        };

        foreach ($users as $key => $user) {

            $action = new PendingAction();
            $action->code = $data['code'];
            $action->serial = $data['code'] . 'x' . $key;
            $action->item_name = $data['item_name'];
            $action->heading = $data['heading'];
            $action->message = $data['message'];
            $action->timeframe = $data['timeframe'];
            $action->deal_id = $deal->id;
            $action->client_id = $deal->client_id;
            $action->authorization_for = $user->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('authorization_request', $deal->id),
                ],
            ];
            $action->button = json_encode($button);
            $action->save();


            // notify user
            Notification::send($user, new SalesPolicyNotification('sales_lead_authorization',  $messageData, route('authorization_request', $deal->id)));
        }
    }

    public function saleLeadAuthorizationPastAction($event)
    {
        $data = $this->eventTypes[$event->type];
        $deal = $event->deal;

        $questionValue = PolicyQuestionValue::where('deal_id', $deal->id)->first();
        $salesUser = User::find($questionValue->submitted_by);

        // 'past' => 'Project projectName from Client clientName from Sales Rep: salesPerson was authorized by sales lead authorizedBy'
        $message = strtr($data['past'], [
            'projectName' => "<a href='" . route('contracts.show', $deal->id) . "'>$deal->project_name</a>",
            'clientName' => "<a href='" . route('clients.show', $deal->client_id) . "'>$deal->client_name</a>",
            'salesPerson' => "<a href='" . route('employees.show', $salesUser->id) . "'>$salesUser->name</a>",
            'authorizedBy' => "<a href='" . route('employees.show', auth()->user()->id) . "'>" . auth()->user()->name . "</a>"
        ]);

        PendingAction::where([
            'code' => $data['code'],
            'past_status' => 0,
            'deal_id' => $deal->id
        ])->get()->map(function ($item) use ($message) {

            $item->authorized_by = auth()->user()->id;
            $item->authorized_at = Carbon::now();
            $item->past_status = 1;
            $item->save();

            // past action
            $pastAction = new PendingActionPast();
            $pastAction->item_name = $item->item_name;
            $pastAction->code = $item->code;
            $pastAction->serial = $item->serial;
            $pastAction->action_id = $item->id;
            $pastAction->heading = $item->heading;
            $pastAction->message = $message;
            $pastAction->timeframe = $item->timeframe;
            $pastAction->authorization_for = $item->authorization_for;
            $pastAction->authorized_by = $item->authorized_by;
            $pastAction->authorized_at = $item->authorized_at;
            $pastAction->past_status = $item->past_status;
            $pastAction->client_id = $item->client_id;
            $pastAction->save();
        });
    }

    public function submitLargeFromPendingAction($event)
    {
        $data = $this->eventTypes[$event->type];
        $deal = $event->deal;
        $questionValue = PolicyQuestionValue::where('deal_id', $deal->id)->first();

        $userIds = DealStageChange::where('deal_id', $deal->deal_id)->pluck('updated_by')->toArray();
        $userIds[] = $questionValue->submitted_by;
        $userIds = array_unique($userIds);
        $users = User::whereIn('id', $userIds)->get();

        // 'message' => 'Finish pending works for your own deal projectName from client clientName!',

        $messageData = [
            'projectName' => "<a href='" . route('contracts.show', $deal->id) . "'>$deal->project_name</a>",
            'clientName' => "<a href='" . route('clients.show', $deal->client_id) . "'>$deal->client_name</a>"
        ];

        $data['message'] = strtr($data['message'], $messageData);

        foreach ($users as $key => $user) {

            $action = new PendingAction();
            $action->code = $data['code'];
            $action->serial = $data['code'] . 'x' . $key;
            $action->item_name = $data['item_name'];
            $action->heading = $data['heading'];
            $action->message = $data['message'];
            $action->timeframe = $data['timeframe'];
            $action->deal_id = $deal->id;
            $action->client_id = $deal->client_id;
            $action->authorization_for = $user->id;
            $button = [
                [
                    'button_name' => 'Review',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('edit-deal-details', $deal->id),
                ],
            ];
            $action->button = json_encode($button);
            $action->save();

            $messageData['client'] = $deal->client_name;
            // notify user
            Notification::send($user, new SalesPolicyNotification('pending_large_from_submission',  $messageData, route('edit-deal-details', $deal->id)));
        }
    }

    public function submitLargeFromPostAction($event)
    {
        $data = $this->eventTypes[$event->type];
        $deal = $event->deal;

        // 'past' => 'Pending works for deal projectName was completed!'
        $message = strtr($data['past'], [
            'projectName' => "<a href='" . route('contracts.show', $deal->id) . "'>$deal->project_name</a>",
        ]);

        PendingAction::where([
            'code' => $data['code'],
            'past_status' => 0,
            'deal_id' => $deal->id,
        ])->get()->map(function ($item) use ($message) {

            $item->authorized_by = auth()->user()->id;
            $item->authorized_at = Carbon::now();
            $item->past_status = 1;
            $item->save();

            // past action
            $pastAction = new PendingActionPast();
            $pastAction->item_name = $item->item_name;
            $pastAction->code = $item->code;
            $pastAction->serial = $item->serial;
            $pastAction->action_id = $item->id;
            $pastAction->heading = $item->heading;
            $pastAction->message = $message;
            $pastAction->timeframe = $item->timeframe;
            $pastAction->authorization_for = $item->authorization_for;
            $pastAction->authorized_by = $item->authorized_by;
            $pastAction->authorized_at = $item->authorized_at;
            $pastAction->past_status = $item->past_status;
            $pastAction->client_id = $item->client_id;
            $pastAction->save();
        });
    }
}
