<?php

namespace App\Http\Controllers;

use App\Models\BasicSeo;
use App\Models\BlogArticle;
use App\Models\ProductCategoryCollection;
use App\Models\ProductDescription;
use App\Models\projectDescription;
use App\Models\ProjectMilestone;
use App\Models\WebContent;
use Artisan;
use Carbon\Carbon;
use Stripe\Stripe;
use App\Models\Lead;
use App\Models\Task;
use App\Models\User;
use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Ticket;
use GuzzleHttp\Client;
use App\Models\Country;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Proposal;
use App\Models\TaskFile;
use App\Models\LeadStatus;
use App\Models\TicketType;
use App\Models\CreditNotes;
use App\Models\TicketReply;
use App\Models\InvoiceItems;
use App\Models\ProposalItem;
use App\Models\ProposalSign;
use Illuminate\Http\Request;
use App\Models\ClientDetails;
use App\Models\PusherSetting;
use App\Models\InvoiceSetting;
use App\Models\LeadCustomForm;
use App\Models\TaskboardColumn;
use App\Models\UniversalSearch;
use App\Models\TicketCustomForm;
use App\Models\ProjectDeliverablesClientDisagree;
use App\Models\ProjectActivity;
use Froiden\RestAPI\ApiResponse;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectTimeLogBreak;
use Illuminate\Support\Facades\App;
use Nwidart\Modules\Facades\Module;
use App\Models\OfflinePaymentMethod;
use App\Traits\UniversalSearchTrait;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use App\Models\PaymentGatewayCredentials;
use App\Http\Requests\Lead\StorePublicLead;
use App\Http\Requests\ProposalAcceptRequest;
use App\Http\Requests\Stripe\StoreStripeDetail;
use App\Http\Requests\Tickets\StoreCustomTicket;
use App\Models\ClientForm;
use Crypt;
use Toastr;
use App\Models\Deal;
use App\Models\DealStage;
use Illuminate\Support\Facades\Redirect;
use Mail;
use App\Mail\ClientSubmitMail;
use Session;
use Pusher\Pusher;
use App\Notifications\PusherNotificaiton;
use Notification;
use App\Models\TaskUser;
use App\Models\AuthorizationAction;
use Auth;
use App\Notifications\ClientBasicSeoSubmitNotification;
use App\Notifications\ClientBlogArticleSubmitNotification;
use App\Notifications\ClientFormSubmitNotification;
use App\Notifications\ClientProductCategoryCollectionSubmitNotification;
use App\Notifications\ClientProductDescriptionSubmitNotification;
use App\Http\Controllers\HelperPendingActionController;

class HomeController extends Controller
{
    use UniversalSearchTrait;

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        return view('home');
    }
    public function Thankyou()
    {
      return view('thankyou');
    }

    public function login()
    {
        return redirect(route('login'));
    }
    public function deal($key)
    {
      //dd($key);

      $deal= Deal::where('deal_id',$key)->first();
    //dd($deal);

      return view('client',compact('deal'));
    }
    public function ClientForm(Request $request)
    {
//        dd($request->all());


    //count($request->day);
//        $useName = User::where('user_name',$request->user_name)->first();
//        $findDeal = Deal::where('deal_id',$request->deal_id)->first();
//        $clientId =$findDeal->client_id;
//        if ($clientId==$useName->id){
//            Toastr::error('Something was wrong! please contact administrator', 'Failed', ["positionClass" => "toast-top-right"]);
//            return redirect()->back();
//        }else{
      $check = ClientForm::where('deal_id',$request->deal_id)->first();
      if ($check == null) {
        $validated = $request->validate([
            'user_name' =>  'required',
            'email' =>  'required',


        ]);
          $client = new ClientForm();
          $client->deal_id=$request->deal_id;
          $client->client_username= $request->user_name;
          $client->client_email= $request->email;
          $client->client_phone= $request->client_phone;
          $client->client_whatsapp= $request->client_whatsapp;
          $client->client_skype= $request->client_skype;
          $client->client_messenger= $request->client_messenger;
          $client->client_telegram= $request->client_telegram;
          $client->client_imo= $request->client_imo;
          $client->message= $request->message;
          $client->timezone= $request->timezone;
          $client->checklist= $request->check;

          $days = $request->day;
          $from = $request->from;
          $to = $request->to;
          for ($i=0; $i < count($request->day) ; $i++) {
            $data = array(
                   'day' => $days[$i] .' '. $from[$i] . '-'. $to[$i],

                 );

           $day[] = $data;


          }
        //  Schedule::insert($insert_schedule);
        $value= '';
        foreach ($day as $d) {
          //dd($d['day']);
          $value= $value  . $d['day'].'<br> ';

        }
        //dd($value);
        $client->day= $value;

          //$client->day= $request->day[] . $request->from[] . $request->to[];
          $client->save();
          $deal= Deal::find($client->deal_id);
          //dd($deal);
          $deal->client_username=$request->user_name;
          $deal->submission_status= 'Submitted';
          $deal->save();
          $usr= User::where('id',$deal->client_id)->first();
          //dd($usr);
          $user=User::find($usr->id);
          $user->mobile= $request->client_phone;
          $user->email= $request->email;
          $user->user_name=  $request->user_name;
          $user->save();
          $client_details= ClientDetails::where('user_id',$deal->client_id)->first();
          $cl= ClientDetails::find($client_details->id);
          $cl->client_username= $request->user_name;
          $cl->save();
          $users= User::where('role_id',1)->orWhere('id',$deal->pm_id)->get();

          foreach ($users as $user) {
            Mail::to($user->email)->send(new ClientSubmitMail($client,$user));
          }



              return redirect('/thankyou')->with('message','Submitted Successfully');
      }else {
        Toastr::error('Already Submitted the information', 'Failed', ["positionClass" => "toast-top-right"]);
       return back();
      }
//    }

    }

    public function agreement($hash)
    {
        $this->pageTitle = 'Project Agreement';
        $this->pageIcon = 'icon-draft';

        $this->project = Project::where('project_short_code', $hash)->firstOrFail();
        $this->global = $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        return view('agreement',$this->data);
    }

    public function agreement_disagree(Request $request, $id)
    {
        $project = Project::where('project_short_code', $id)->firstOrFail();
        if (count($request->comment) > 0) {
            foreach ($request->comment as $key => $value) {
                $data = new ProjectDeliverablesClientDisagree();
                $data->project_id = $project->id;
                $data->delivarable_id = $key;
                $data->comment = $value;
                $data->save();
            }
            //start authorization action

            // $authorization_action = new AuthorizationAction();
            // $authorization_action->model_name = $project->getMorphClass();
            // $authorization_action->model_id = $project->id;
            // $authorization_action->type = 'deliverable_modification_by_client';
            // $authorization_action->deal_id = $project->deal_id;
            // $authorization_action->project_id = $project->id;
            // $authorization_action->link = route('projects.show', $project->id).'?tab=deliverables';
            // $authorization_action->title = 'Client send delivarables modification request';
            // $authorization_action->authorization_for = $project->pm_id;
            // $authorization_action->save();
            //end authorization action
        }

        $project->authorization_status = 'pending';
        $project->deliverable_authorization= 0;
        $project->save();

             
        $helper = new HelperPendingActionController();


        $helper->ClientDisagreeAgreement($project);


        $text = 'Client ('.$project->client->name.') Disagree with delivarables';
        $link = '<a href="'.route('projects.show', $project->id).'?tab=deliverables">'.$text.'</a>';


        $activity = new ProjectActivity();
        $activity->activity= $link;
        $activity->project_id = $project->id;
        $activity->save();

        $data = [
            'user_id' => $project->pm_id,
            'role_id' => 4,
            'title' => 'Client Disagree Delivarables',
            'body' => $text,
            'redirectUrl' => route('projects.show', $project->id).'?tab=deliverables'
        ];

        $this->pusherSettings = pusher_settings();

        if ($this->pusherSettings->status) {
            $user = User::find($data['user_id']);

            Notification::send($user, new PusherNotificaiton($data));

            $pusher = new Pusher(
                $this->pusherSettings->pusher_app_key,
                $this->pusherSettings->pusher_app_secret,
                $this->pusherSettings->pusher_app_id,
                array(
                    'cluster' => $this->pusherSettings->pusher_cluster,
                    'useTLS' => $this->pusherSettings->force_tls
                )
            );
            $pusher->trigger('notification-channel', 'notification', $data);
        }

        Toastr::success('Request send to Project Manager', 'success', [
            'positionClass' => 'toast-top-right'
        ]);

        return redirect()->back();
    }

    public function invoice($hash)
    {
        $this->pageTitle = 'app.menu.invoices';
        $this->pageIcon = 'icon-money';

        $this->invoice = Invoice::with('currency', 'project', 'project.client', 'items.invoiceItemImage')->where('hash', $hash)->firstOrFail();
        $this->paidAmount = $this->invoice->getPaidAmount();

        if ($this->invoice->discount > 0) {
            if ($this->invoice->discount_type == 'percent') {
                $this->discount = (($this->invoice->discount / 100) * $this->invoice->sub_total);
            }
            else {
                $this->discount = $this->invoice->discount;
            }
        } else {
            $this->discount = 0;
        }

        $taxList = array();

        $items = InvoiceItems::whereNotNull('taxes')
            ->where('invoice_id', $this->invoice->id)
            ->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = InvoiceItems::taxbyid($tax)->first();

                if ($this->tax) {
                    if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                        if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                        } else{
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                        }

                    }
                    else {
                        if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                        } else {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                        }
                    }
                }
            }
        }

        $this->taxes = $taxList;
        $this->settings = Setting::organisationSetting();
        $this->credentials = PaymentGatewayCredentials::first();
        $this->methods = OfflinePaymentMethod::activeMethod();
        $this->invoiceSetting = InvoiceSetting::first();

        return view('invoice', [
            'companyName' => $this->settings->company_name,
            'pageTitle' => $this->pageTitle,
            'pageIcon' => $this->pageIcon,
            'global' => $this->settings,
            'setting' => $this->settings,
            'settings' => $this->settings,
            'invoice' => $this->invoice,
            'paidAmount' => $this->paidAmount,
            'discount' => $this->discount,
            'credentials' => $this->credentials,
            'taxes' => $this->taxes,
            'methods' => $this->methods,
            'invoiceSetting' => $this->invoiceSetting,
        ]);
    }

    public function stripeModal(Request $request)
    {
        $this->invoiceID = $request->invoice_id;
        $this->countries = countries();
        return view('public-payment.stripe.index', $this->data);
    }

    public function paystackModal(Request $request)
    {
        $this->id = $request->id;
        $this->type = $request->type;
        return view('public-payment.paystack.index', $this->data);
    }

    public function flutterwaveModal(Request $request)
    {
        $this->id = $request->id;
        $this->type = $request->type;
        return view('public-payment.flutterwave.index', $this->data);
    }

    public function mollieModal(Request $request)
    {
        $this->id = $request->id;
        $this->type = $request->type;
        return view('public-payment.mollie.index', $this->data);
    }

    public function authorizeModal(Request $request)
    {
        $this->id = $request->id;
        $this->type = $request->type;
        return view('public-payment.authorize.index', $this->data);
    }

    public function saveStripeDetail(StoreStripeDetail $request)
    {
        $id = $request->invoice_id;
        $this->invoice = Invoice::with(['client', 'project', 'project.client'])->findOrFail($id);

        if($this->invoice && $this->invoice->amountDue() == 0){
            Reply::error(__('messages.invoiceAlreadyPaid'));
        }

        $this->credentials = PaymentGatewayCredentials::first();

        $client = null;

        if (!is_null($this->invoice->client_id)) {
            $client = $this->invoice->client;
        }
        else if (!is_null($this->invoice->project_id) && !is_null($this->invoice->project->client_id)) {
            $client = $this->invoice->project->client;
        }

        if (($this->credentials->test_stripe_secret || $this->credentials->live_stripe_secret) && !is_null($client)) {
            Stripe::setApiKey($this->credentials->stripe_mode == 'test' ? $this->credentials->test_stripe_secret : $this->credentials->live_stripe_secret);

            $totalAmount = $this->invoice->amountDue();

            $customer = \Stripe\Customer::create([
                'email' => $client->email,
                'name' => $request->clientName,
                'address' => [
                    'line1' => $request->clientName,
                    'city' => $request->city,
                    'state' => $request->state,
                    'country' => $request->country,
                ],
            ]);

            $intent = \Stripe\PaymentIntent::create([
                'amount' => $totalAmount * 100,
                'currency' => $this->invoice->currency->currency_code,
                'customer' => $customer->id,
                'setup_future_usage' => 'off_session',
                'payment_method_types' => ['card'],
                'description' => $this->invoice->invoice_number . ' Payment',
                'metadata' => ['integration_check' => 'accept_a_payment', 'invoice_id' => $id]
            ]);

            $this->intent = $intent;
        }

        $customerDetail = [
            'email' => $client->email,
            'name' => $request->clientName,
            'line1' => $request->clientName,
            'city' => $request->city,
            'state' => $request->state,
            'country' => $request->country,
        ];

        $this->customerDetail = $customerDetail;

        $view = view('public-payment.stripe.stripe-payment', $this->data)->render();

        return Reply::dataOnly(['view' => $view, 'intent' => $this->intent]);
    }

    public function downloadInvoice($id)
    {
        $this->invoice = Invoice::whereRaw('md5(id) = ?', $id)->firstOrFail();
        $this->invoiceSetting = InvoiceSetting::first();
        App::setLocale($this->invoiceSetting->locale);
        // Download file uploaded
        if ($this->invoice->file != null) {
            return response()->download(storage_path('app/public/invoice-files') . '/' . $this->invoice->file);
        }

        $pdfOption = $this->domPdfObjectForDownload($this->invoice->id);
        $pdf = $pdfOption['pdf'];
        $filename = $pdfOption['fileName'];

        return $pdf->download($filename . '.pdf');
    }

    public function domPdfObjectForDownload($id)
    {
        $this->invoice = Invoice::with('items')->findOrFail($id);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $this->paidAmount = $this->invoice->getPaidAmount();
        $this->creditNote = 0;

        if ($this->invoice->credit_note) {
            $this->creditNote = CreditNotes::where('invoice_id', $id)
                ->select('cn_number')
                ->first();
        }

        if ($this->invoice->discount > 0) {
            if ($this->invoice->discount_type == 'percent') {
                $this->discount = (($this->invoice->discount / 100) * $this->invoice->sub_total);
            }
            else {
                $this->discount = $this->invoice->discount;
            }
        } else {
            $this->discount = 0;
        }

        $taxList = array();

        $items = InvoiceItems::whereNotNull('taxes')
            ->where('invoice_id', $this->invoice->id)
            ->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = InvoiceItems::taxbyid($tax)->first();

                if ($this->tax) {
                    if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                        if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                        } else{
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                        }

                    }
                    else {
                        if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                        } else {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                        }
                    }
                }
            }
        }

        $this->taxes = $taxList;

        $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        $this->payments = Payment::with(['offlineMethod'])->where('invoice_id', $this->invoice->id)->where('status', 'complete')->orderBy('paid_on', 'desc')->get();

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('invoices.pdf.' . $this->invoiceSetting->template, $this->data);
        $filename = $this->invoice->invoice_number;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

    public function app()
    {
        $setting = Setting::select('id', 'company_name')->first();

        return ['data' => $setting];
    }

    public function gantt($hash)
    {
        $this->settings = global_setting();
        $this->project = Project::with('members', 'members.user')->where('hash', $hash)->first();
        $this->pageTitle = $this->project->project_name;

        return view('gantt', [
            'global' => $this->settings,
            'pageTitle' => $this->pageTitle,
            'project' => $this->project
        ]);
    }

    public function ganttData($ganttProjectId)
    {
        $assignedTo = request('assignedTo');
        $projectTask = request('projectTask');

        if ($assignedTo != 'all') {
            $tasks = Task::projectTasks($ganttProjectId, $assignedTo, 1);
        }
        else {
            $tasks = Task::projectTasks($ganttProjectId, null, 1);
        }

        if ($projectTask) {
            $tasks = $tasks->whereIn('id', explode(',', $projectTask));
        }

        $data = array();

        foreach ($tasks as $key => $task) {

            $data[] = [
                'id' => 'task-' . $task->id,
                'name' => ucfirst($task->heading),
                'start' => ((!is_null($task->start_date)) ? $task->start_date->format('Y-m-d') : ((!is_null($task->due_date)) ? $task->due_date->format('Y-m-d') : null)),
                'end' => ((!is_null($task->due_date)) ? $task->due_date->format('Y-m-d') : $task->start_date->format('Y-m-d')),
                'progress' => 0,
                'bg_color' => $task->boardColumn->label_color,
                'taskid' => $task->hash,
                'draggable' => true
            ];

            if (!is_null($task->dependent_task_id)) {
                $data[$key]['dependencies'] = 'task-' . $task->dependent_task_id;
            }
        }

        return response()->json($data);
    }

    public function taskDetail($hash)
    {
        $this->task = Task::with('boardColumn', 'project', 'users', 'label', 'approvedTimeLogs', 'approvedTimeLogs.user')->withCount('subtasks', 'files', 'comments', 'activeTimerAll')
            ->where('hash', $hash)->firstOrFail()->withCustomFields();

        $this->pageTitle = __('app.task') . ' # ' . $this->task->id;

        if (!empty($this->task->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->task->getCustomFieldGroupsWithFields()->fields;
        }

        $this->employees = User::join('employee_details', 'users.id', '=', 'employee_details.user_id')
            ->leftJoin('project_time_logs', 'project_time_logs.user_id', '=', 'users.id')
            ->leftJoin('designations', 'employee_details.designation_id', '=', 'designations.id');


        $this->employees = $this->employees->select(
            'users.name',
            'users.image',
            'users.id',
            'designations.name as designation_name'
        );

        $this->employees = $this->employees->where('project_time_logs.task_id', '=', $this->task->id);

        $this->employees = $this->employees->groupBy('project_time_logs.user_id')
            ->orderBy('users.name')
            ->get();

        $this->breakMinutes = ProjectTimeLogBreak::taskBreakMinutes($this->task->id);

        $tab = request('view');

        switch ($tab) {
        case 'sub_task':
            $this->tab = 'front.tasks.ajax.sub_tasks';
        break;
        case 'history':
            $this->tab = 'front.tasks.ajax.history';
        break;
        default:
            $this->tab = 'front.tasks.ajax.files';
        break;
        }

        $this->global = global_setting();

        if (request()->ajax()) {
            if (request('json') == true) {
                $html = view($this->tab, $this->data)->render();
                return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
            }

            $html = view('front.tasks.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'front.tasks.ajax.show';

        return view('front.tasks.show', $this->data);

    }

    public function taskFiles($id)
    {
        $this->taskFiles = TaskFile::where('task_id', $id)->get();
        return view('task-files', ['taskFiles' => $this->taskFiles]);
    }

    public function history($id)
    {
        $this->settings = global_setting();
        $this->task = Task::with('boardColumn', 'history', 'history.boardColumn')->findOrFail($id);
        $view = view('admin.tasks.history', [
            'task' => $this->task,
            'global' => $this->settings,
        ])->render();
        return Reply::dataOnly(['status' => 'success', 'view' => $view]);
    }

    public function taskboard(Request $request, $hash)
    {
        $this->global = Setting::first();
        $project = Project::where('hash', $hash)->firstOrFail();
        $this->pageTitle = $project->project_name . ' ' . __('modules.tasks.taskBoard');

        if (request()->ajax()) {

            $this->boardEdit = false;
            $this->boardDelete = false;

            $boardColumns = TaskboardColumn::withCount(['tasks as tasks_count' => function ($q) use ($project) {
                $q->leftJoin('projects', 'projects.id', '=', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                    ->join('task_users', 'task_users.task_id', '=', 'tasks.id')
                    ->join('users', 'task_users.user_id', '=', 'users.id')
                    ->leftJoin('task_labels', 'task_labels.task_id', '=', 'tasks.id')
                    ->leftJoin('users as creator_user', 'creator_user.id', '=', 'tasks.created_by');

                $q->whereNull('projects.deleted_at');
                $q->where('tasks.is_private', 0);
                $q->where('tasks.project_id', '=', $project->id);

            }])
                ->with(['tasks' => function ($q) use ($project) {
                    $q->withCount(['subtasks', 'completedSubtasks', 'comments'])
                        ->leftJoin('projects', 'projects.id', '=', 'tasks.project_id')
                        ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                        ->join('task_users', 'task_users.task_id', '=', 'tasks.id')
                        ->join('users', 'task_users.user_id', '=', 'users.id')
                        ->leftJoin('task_labels', 'task_labels.task_id', '=', 'tasks.id')
                        ->leftJoin('users as creator_user', 'creator_user.id', '=', 'tasks.created_by')
                        ->groupBy('tasks.id');

                    $q->whereNull('projects.deleted_at');
                    $q->where('tasks.is_private', 0);
                    $q->where('tasks.project_id', '=', $project->id);

                }])->orderBy('priority', 'asc')->get();
            $result = array();

            foreach ($boardColumns as $key => $boardColumn) {
                $result['boardColumns'][] = $boardColumn;

                $tasks = Task::with(['users', 'project', 'labels'])
                    ->withCount(['subtasks', 'completedSubtasks', 'comments'])
                    ->leftJoin('projects', 'projects.id', '=', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                    ->join('task_users', 'task_users.task_id', '=', 'tasks.id')
                    ->join('users', 'task_users.user_id', '=', 'users.id')
                    ->leftJoin('task_labels', 'task_labels.task_id', '=', 'tasks.id')
                    ->leftJoin('users as creator_user', 'creator_user.id', '=', 'tasks.created_by')
                    ->select('tasks.*')
                    ->where('tasks.board_column_id', $boardColumn->id)
                    ->where('tasks.is_private', 0)
                    ->orderBy('column_priority', 'asc')
                    ->groupBy('tasks.id');

                $tasks->whereNull('projects.deleted_at');
                $tasks->where('tasks.project_id', '=', $project->id);

                $tasks->skip(0)->take($this->taskBoardColumnLength);
                $tasks = $tasks->get();

                $result['boardColumns'][$key]['tasks'] = $tasks;
            }

            $this->result = $result;

            $view = view('taskboard_data', [
                'result' => $this->result,
                'boardEdit' => $this->boardEdit
            ])->render();
            return Reply::dataOnly(['view' => $view]);
        }

        return view('taskboard', [
            'pageTitle' => $this->pageTitle,
            'global' => $this->global,
            'project' => $project
        ]);
    }

    public function taskboardLoadMore(Request $request, $hash)
    {
        $skip = $request->currentTotalTasks;
        $totalTasks = $request->totalTasks;
        $project = Project::whereRaw('hash', $hash)->firstOrFail();

        $tasks = Task::with('users', 'project', 'labels')
            ->withCount(['subtasks', 'completedSubtasks', 'comments'])
            ->leftJoin('projects', 'projects.id', '=', 'tasks.project_id')
            ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
            ->join('task_users', 'task_users.task_id', '=', 'tasks.id')
            ->join('users', 'task_users.user_id', '=', 'users.id')
            ->leftJoin('task_labels', 'task_labels.task_id', '=', 'tasks.id')
            ->leftJoin('users as creator_user', 'creator_user.id', '=', 'tasks.created_by')
            ->select('tasks.*')
            ->where('tasks.board_column_id', $request->columnId)
            ->orderBy('column_priority', 'asc')
            ->groupBy('tasks.id');

        $tasks->whereNull('projects.deleted_at');
        $tasks->where('tasks.project_id', '=', $project->id);

        $tasks->skip($skip)->take($this->taskBoardColumnLength);
        $tasks = $tasks->get();
        $this->tasks = $tasks;

        if ($totalTasks <= ($skip + $this->taskBoardColumnLength)) {
            $loadStatus = 'hide';
        }
        else {
            $loadStatus = 'show';
        }

        $view = view('taskboard_load_more', $this->data)->render();
        return Reply::dataOnly(['view' => $view, 'load_more' => $loadStatus]);
    }

    public function taskShare($id)
    {
        $this->pageTitle = 'app.task';

        $this->settings = global_setting();

        $this->task = Task::with('boardColumn', 'subtasks', 'project', 'users')->whereRaw('md5(id) = ?', $id)->firstOrFail();

        return view('task-share', [
            'task' => $this->task,
            'global' => $this->settings
        ]);
    }

    /**
     * custom lead form
     *
     * @return \Illuminate\Http\Response
     */
    public function leadForm()
    {
        $this->pageTitle = 'modules.lead.leadForm';
        $this->settings = global_setting();
        $this->countries = countries();

        $this->leadFormFields = LeadCustomForm::with('customField')->where('status', 'active')
            ->orderBy('field_order', 'asc')->get();

        return view('lead-form', $this->data);
    }

    /**
     * save lead
     *
     * @return \Illuminate\Http\Response
     */
    // public function leadStore(StorePublicLead $request)
    public function leadStore(StorePublicLead $request)
    {
        $setting = Setting::with('currency')->first();

        if ($setting->ticket_form_google_captcha) {
            // Checking is google recaptcha is valid
            $gRecaptchaResponseInput = 'g-recaptcha-response';
            $gRecaptchaResponse = $request->{$gRecaptchaResponseInput};
            $validateRecaptcha = $this->validateGoogleRecaptcha($gRecaptchaResponse);

            if (!$validateRecaptcha) {
                return Reply::error(__('auth.recaptchaFailed'));
            }
        }

        $leadStatus = LeadStatus::where('default', '1')->first();
        $settings = global_setting();

        $lead = new Lead();
        $lead->company_name = (request()->has('company_name') ? $request->company_name : '');
        $lead->website      = (request()->has('website') ? $request->website : '');
        $lead->address      = (request()->has('address') ? $request->address : '');
        $lead->client_name  = (request()->has('name') ? $request->name : '');
        $lead->client_email = (request()->has('email') ? $request->email : '');
        $lead->mobile       = (request()->has('mobile') ? $request->mobile : '');
        $lead->city         = (request()->has('city') ? $request->city : '');
        $lead->state        = (request()->has('state') ? $request->state : '');
        $lead->country      = (request()->has('country') ? $request->country : '');
        $lead->postal_code  = (request()->has('postal_code') ? $request->postal_code : '');
        $lead->status_id    = $leadStatus->id;
        $lead->value        = 0;
        $lead->currency_id  = $settings->currency->id;
        $lead->save();

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $lead->updateCustomFieldData($request->get('custom_fields_data'));
        }

        return Reply::success(__('messages.LeadAddedUpdated'));
    }

    /**
     * custom lead form
     *
     * @return \Illuminate\Http\Response
     */
    public function ticketForm()
    {
        $this->pageTitle = 'modules.ticketForm';
        $this->ticketFormFields = TicketCustomForm::with('customField')->where('status', 'active')
            ->orderBy('field_order', 'asc')
            ->get();
        $this->types = TicketType::all();
        $this->settings = Setting::first();
        App::setLocale($this->settings->locale);
        Carbon::setLocale($this->settings->locale);
        setlocale(LC_TIME, $this->settings->locale . '_' . mb_strtoupper($this->settings->locale));

        return view('ticket-form', $this->data);
    }

    /**
     * save lead
     *
     * @return \Illuminate\Http\Response
     */
    public function ticketStore(StoreCustomTicket $request)
    {
        $setting = Setting::with('currency')->first();

        if ($setting->ticket_form_google_captcha) {
            // Checking is google recaptcha is valid
            $gRecaptchaResponseInput = 'g-recaptcha-response';
            $gRecaptchaResponse = $request->{$gRecaptchaResponseInput};
            $validateRecaptcha = $this->validateGoogleRecaptcha($gRecaptchaResponse);

            if (!$validateRecaptcha) {
                return Reply::error(__('auth.recaptchaFailed'));
            }
        }

        /* $rules['g-recaptcha-response'] = 'required'; */
        $existing_user = User::withoutGlobalScopes(['active'])->select('id', 'email')->where('email', $request->email)->first();
        $newUser = $existing_user;

        if (!$existing_user) {
            $password = str_random(8);
            // create new user
            $client = new User();
            $client->name           = $request->name;
            $client->email          = $request->email;
            $client->password       = Hash::make($password);
            $client->save();

            // attach role
            $client->attachRole(3);

            $clientDetail = new ClientDetails();
            $clientDetail->user_id      = $client->id;
            $clientDetail->save();

            // Log search
            $this->logSearchEntry($client->id, $client->name, 'clients.edit', 'client');
            $this->logSearchEntry($client->id, $client->email, 'clients.edit', 'client');

            $newUser = $client;
        }

        // Create New Ticket
        $ticket = new Ticket();
        $ticket->subject        = (request()->has('ticket_subject') ? $request->ticket_subject : '');;
        $ticket->status         = 'open';
        $ticket->user_id        = $newUser->id;
        $ticket->type_id        = (request()->has('type') ? $request->type : null);
        $ticket->priority       = (request()->has('priority') ? $request->priority : 'medium');
        $ticket->save();

        // Save first message
        $reply = new TicketReply();
        $reply->message     = (request()->has('message') ? $request->message : '');
        $reply->ticket_id   = $ticket->id;
        $reply->user_id     = $newUser->id; // Current logged in user
        $reply->save();

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $ticket->updateCustomFieldData($request->get('custom_fields_data'));
        }

        return Reply::success(__('messages.ticketAddSuccess'));
    }

    public function validateGoogleRecaptcha($googleRecaptchaResponse)
    {
        $setting = Setting::with('currency')->first();
        $secret = $setting->google_recaptcha_v2_status == 'active' ? $setting->google_recaptcha_v2_secret_key : $setting->google_recaptcha_v3_secret_key;

        $client = new Client();
        $response = $client->post(
            'https://www.google.com/recaptcha/api/siteverify',
            [
                'form_params' => [
                    'secret' => $secret,
                    'response' => $googleRecaptchaResponse,
                    'remoteip' => $_SERVER['REMOTE_ADDR']
                ]
            ]
        );

        $body = json_decode((string)$response->getBody());

        return $body->success;
    }

    public function installedModule()
    {
        $message = '';
        $plugins = Module::allEnabled();

        $applicationVersion = trim(
            preg_replace(
                '/\s\s+/',
                ' ',
                !file_exists(File::get(public_path() . '/version.txt')) ? File::get(public_path() . '/version.txt') : '0'
            )
        );
        $enableModules = [];
        $enableModules['application'] = 'worksuite';
        $enableModules['version'] = $applicationVersion;
        $enableModules['worksuite'] = $applicationVersion;

        foreach ($plugins as $plugin) {
            $enableModules[$plugin->getName()] = trim(
                preg_replace(
                    '/\s\s+/',
                    ' ',
                    !file_exists(File::get($plugin->getPath() . '/version.txt')) ? File::get($plugin->getPath() . '/version.txt') : '0'
                )
            );
        }

        if (((int)str_replace('.', '', $enableModules['RestAPI'])) < 110) {
            $message .= 'Please update Rest API module greater then 1.1.0 version';
        }

        if (((int)str_replace('.', '', $enableModules['worksuite'])) < 400) {
            $message .= 'Please update' . ucfirst(config('app.name')) . ' greater then 4.0.0 version';
        }

        $enableModules['message'] = $message;

        return ApiResponse::make('Plugin data fetched successfully', $enableModules);
    }

    public function proposal($hash)
    {
        $this->pageTitle = __('app.menu.proposal');
        $this->pageIcon  = 'icon-people';

        $this->proposal = Proposal::with(['items'])->where('hash', $hash)->firstOrFail();

        if ($this->proposal->discount > 0) {
            if ($this->proposal->discount_type == 'percent') {
                $this->discount = (($this->proposal->discount / 100) * $this->proposal->sub_total);
            }
            else {
                $this->discount = $this->proposal->discount;
            }
        } else {
            $this->discount = 0;
        }

        $this->taxes = ProposalItem::where('type', 'tax')
            ->where('proposal_id', $this->proposal->id)
            ->get();

        $items = ProposalItem::whereNotNull('taxes')
            ->where('proposal_id', $this->proposal->id)
            ->get();

        $taxList = array();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = ProposalItem::taxbyid($tax)->first();

                if ($this->tax) {
                    if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                        if ($this->proposal->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->proposal->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                        } else{
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                        }

                    }
                    else {
                        if ($this->proposal->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->proposal->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                        } else {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                        }
                    }
                }
            }
        }

        $this->taxes = $taxList;

        return view('proposal', [
            'proposal' => $this->proposal,
            'pageTitle' => $this->pageTitle,
            'pageIcon' => $this->pageIcon,
            'taxes' => $this->taxes,
            'discount' => $this->discount,
            'global' => global_setting(),
            'settings' => global_setting(),
            'invoiceSetting' => invoice_setting(),
        ]);
    }

    public function proposalActionStore(ProposalAcceptRequest $request, $id)
    {
        $this->proposal = Proposal::with('signature')->findOrFail($id);

        if($this->proposal && $this->proposal->signature){
            return Reply::error(__('messages.alreadySigned'));
        }

        if ($request->type == 'accept') {
            $sign = new ProposalSign();
            $sign->full_name   = $request->full_name;
            $sign->proposal_id = $this->proposal->id;
            $sign->email       = $request->email;
            $imageName = null;

            if ($request->signature_type == 'signature' && $request->isSignatureNull == 'false') {
                $image     = $request->signature;  // your base64 encoded
                $image     = str_replace('data:image/png;base64,', '', $image);
                $image     = str_replace(' ', '+', $image);
                $imageName = str_random(32) . '.' . 'jpg';

                if (!File::exists(public_path(Files::UPLOAD_FOLDER . '/' . 'proposal/sign'))) {
                    File::makeDirectory(public_path(Files::UPLOAD_FOLDER . '/proposal/sign'), 0775, true);
                }

                File::put(public_path() . '/' . Files::UPLOAD_FOLDER . '/proposal/sign/' . $imageName, base64_decode($image));
            }
            else {
                if ($request->hasFile('image')) {
                    $imageName = Files::upload($request->image, 'proposal/sign', 300);
                }
            }

            $sign->signature = $imageName;
            $sign->save();

            $this->proposal->status = 'accepted';
        }
        else {
            $this->proposal->client_comment = $request->comment;
            $this->proposal->status = 'declined';
        }

        $this->proposal->save();

        return Reply::success(__('messages.proposalUpdated'));
    }

    public function domPdfObjectProposalDownload($id)
    {

        $this->proposal = Proposal::findOrFail($id);

        if ($this->proposal->discount > 0) {
            if ($this->proposal->discount_type == 'percent') {
                $this->discount = (($this->proposal->discount / 100) * $this->proposal->sub_total);
            }
            else {
                $this->discount = $this->proposal->discount;
            }
        } else {
            $this->discount = 0;
        }

        $this->taxes = ProposalItem::where('type', 'tax')
            ->where('proposal_id', $this->proposal->id)
            ->get();

        $items = ProposalItem::whereNotNull('taxes')
            ->where('proposal_id', $this->proposal->id)
            ->get();

        $taxList = array();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = ProposalItem::taxbyid($tax)->first();

                if ($this->tax) {
                    if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                        if ($this->proposal->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->proposal->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                        } else{
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                        }

                    }
                    else {
                        if ($this->proposal->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->proposal->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                        } else {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                        }
                    }
                }
            }
        }

        $this->taxes = $taxList;
        $this->invoiceSetting = invoice_setting();

        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);

        $this->settings = Setting::organisationSetting();

        $pdf = app('dompdf.wrapper');
        $this->company = Setting::organisationSetting();
        $this->global = Setting::with('currency')->first();;

        $pdf->getDomPDF()->set_option('enable_php', true);
        $pdf->loadView('proposals.pdf.' . $this->invoiceSetting->template, $this->data);
        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);
        $filename = 'proposal-' . $this->proposal->id;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

    /**
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function downloadProposal($id)
    {

        $this->proposal = Proposal::whereRaw('md5(id) = ?', $id)->first();
        $this->company = Setting::organisationSetting();
        App::setLocale(isset($this->company->locale) ? $this->company->locale : 'en');

        $pdfOption = $this->domPdfObjectProposalDownload($this->proposal->id);
        $pdf = $pdfOption['pdf'];
        $filename = $pdfOption['fileName'];

        return $pdf->download($filename . '.pdf');
    }

    public function invoicePaymentfailed($invoiceId)
    {
        $invoice = Invoice::find($invoiceId);

        if(request()->gateway == 'Razorpay'){
            $errorMessage = ['code' => request()->errorMessage['code'], 'message' => request()->errorMessage['description']];
        }

        if(request()->gateway == 'Stripe'){
            $errorMessage = ['code' => request()->errorMessage['type'], 'message' => request()->errorMessage['message']];
        }

        /* make new payment entry with status=failed and other details */
        $payment = new Payment();
        $payment->invoice_id = $invoice->id;
        $payment->currency_id = $invoice->currency_id;
        $payment->amount = $invoice->total;
        $payment->gateway = request()->gateway;
        $payment->paid_on = now();
        $payment->status = 'failed';
        /** @phpstan-ignore-next-line */
        $payment->payment_gateway_response = $errorMessage;
        $payment->save();

        return Reply::error(__('messages.paymentFailed'));
    }

    public function showImage()
    {
        $this->imageUrl = request()->image_url;
        return view('invoices.ajax.show_image', $this->data);
    }

    public function syncPermissions()
    {
        return Artisan::call('sync-user-permissions');
    }

    public function timer_session_set($status) {
        Session::put('timer_box_status', '');
        if (Session::has('timer_box_status')) {
            // $timer = Session::get('timer_box_status');

            if ($status == 'on') {
                Session::put('timer_box_status', 'on');
            } else {
                Session::put('timer_box_status', 'off');
            }
        } else {
            // Session::put('timer_box_status', '');
        }
        // dd(Session::get('timer_box_status'));
    }

    public function deals_data()
    {
        // $data = DealStage::join('deal_stage_changes', 'deal_stages.short_code', 'deal_stage_changes.deal_id')->groupBy('deal_stages.short_code')->get()->take(10);

        // $new_array = [];
        // foreach ($data as $key => $value) {

        // }
        // dd($groupedData);
    }

    //    STORE MILESTONE LINK FUNCTION
    public function storeLink(Request $request){
        if ($request->service_type=='web-content'){
        $web_content = new WebContent();
        $web_content->deal_id = $request->deal_id;
        $web_content->random_id = $request->random_id;
        $web_content->client_link = $request->value;
        $web_content->service_type = $request->service_type;
        $web_content->save();
        }
        if ($request->service_type=='blogs-articles'){
            $blog_article = new BlogArticle();
            $blog_article->deal_id = $request->deal_id;
            $blog_article->random_id = $request->random_id;
            $blog_article->client_link = $request->value;
            $blog_article->service_type = $request->service_type;
            $blog_article->save();
        }
        if ($request->service_type=='product-description'){
            $product_description = new ProductDescription();
            $product_description->deal_id = $request->deal_id;
            $product_description->random_id = $request->random_id;
            $product_description->client_link = $request->value;
            $product_description->service_type = $request->service_type;
            $product_description->save();
        }
        if ($request->service_type=='product-category'){
            $product_category = new ProductCategoryCollection();
            $product_category->deal_id = $request->deal_id;
            $product_category->random_id = $request->random_id;
            $product_category->client_link = $request->value;
            $product_category->service_type = $request->service_type;
            $product_category->save();
        }
        if ($request->service_type=='basic-seo'){
            $basic_seo = new BasicSeo();
            $basic_seo->deal_id = $request->deal_id;
            $basic_seo->random_id = $request->random_id;
            $basic_seo->client_link = $request->value;
            $basic_seo->service_type = $request->service_type;
            $basic_seo->save();
        }
        return response()->json(['status'=>200]);
    }
     //   PROJECT MANAGER MILESTONE STORE LINK FUNCTION
     public function storePmLink(Request $request){
        // dd($request->all());
        if ($request->service_type=='web-content'){
            $web_content = new WebContent();
            $web_content->deal_id = $request->deal_id;
            $web_content->random_id = $request->random_id;
            $web_content->client_link = $request->value;
            $web_content->submitted_by = $request->submitted_by;
            $web_content->service_type = $request->service_type;
            $web_content->save();
        }
        if ($request->service_type=='blogs-articles'){
            $blog_article = new BlogArticle();
            $blog_article->deal_id = $request->deal_id;
            $blog_article->random_id = $request->random_id;
            $blog_article->client_link = $request->value;
            $blog_article->service_type = $request->service_type;
            $blog_article->save();
        }
        if ($request->service_type=='product-description'){
            $product_description = new ProductDescription();
            $product_description->deal_id = $request->deal_id;
            $product_description->random_id = $request->random_id;
            $product_description->client_link = $request->value;
            $product_description->service_type = $request->service_type;
            $product_description->save();
        }
        if ($request->service_type=='product-category'){
            $product_category = new ProductCategoryCollection();
            $product_category->deal_id = $request->deal_id;
            $product_category->random_id = $request->random_id;
            $product_category->client_link = $request->value;
            $product_category->service_type = $request->service_type;
            $product_category->save();
        }
        if ($request->service_type=='basic-seo'){
            $basic_seo = new BasicSeo();
            $basic_seo->deal_id = $request->deal_id;
            $basic_seo->random_id = $request->random_id;
            $basic_seo->client_link = $request->value;
            $basic_seo->service_type = $request->service_type;
            $basic_seo->save();
        }
        return response()->json(['status'=>200]);
    }
    // ==================== VIEW WEB CONTENT START ==================
    public function webContent($id, $random_id){
        return view('service-type.web_content',compact('id','random_id'));
    }
    // ==================== STORE WEB CONTENT START ==================
    public function storeWebContent(Request $request){
        DB::beginTransaction();
        $data = $request->all();
        $folder_links = json_encode($data['folder_link']);
        $reference_websites = json_encode($data['reference_website']);
        $description1 = json_encode($data['description1']);
        $description2 = json_encode($data['description2']);
        $description3 = json_encode($data['description3']);
        $page_names = json_encode($data['page_name']);
        $quantitys = json_encode($data['quantity']);
        $approximate_words = json_encode($data['approximate_word']);

        $web_content = WebContent::where('random_id',$request->random_id)->first();
        $web_content->website_link = $data['website_link'];
        $web_content->website_niche = $data['website_niche'];
        $web_content->website_name = $data['website_name'];
        $web_content->business_information = $data['business_information'];
        $web_content->share_file_info = $request->share_file_info;
        $web_content->folder_link = $folder_links;
        $web_content->reference_website = $reference_websites;
        $web_content->competitor_content = $request->competitor_content;
        $web_content->description1 = $description1;
        $web_content->description2 = $description2;
        $web_content->description3 = $description3;
        $web_content->product_list = $data['product_list'];
        $web_content->page_name = $page_names;
        $web_content->quantity = $quantitys;
        $web_content->approximate_word = $approximate_words;
        $web_content->gender = $data['gender'];
        $web_content->age1 = $data['age1'];
        $web_content->age2 = $data['age2'];
        $web_content->monthly_income = $data['monthly_income'];
        $web_content->education_level = $data['education_level'];
        $web_content->country = $data['country'];
        $web_content->city = $data['city'];
        $web_content->interest = $data['interest'];
        $web_content->buying_habit1 = $data['buying_habit1'];
        $web_content->buying_habit2 = $data['buying_habit2'];
        $web_content->buying_habit3 = $data['buying_habit3'];
        $web_content->language = $data['language'];
        $web_content->status = $data['status'];
        $web_content->save();


        if($web_content->submitted_by == 4){
            $milestone = ProjectMilestone::where('id',$web_content->milestone_id)->first();
            $pm = User::where('id',$milestone->added_by)->first();
            $users = User::where('role_id',1)->orWhere('id',$pm->id)->orWhere('role_id',8)->get();
            foreach($users as $user)
                {
                    Notification::send($user, new ClientFormSubmitNotification($web_content));
                }
        }else{
            if(Auth::user()->role_id==11 || Auth::user()->role_id==12){
                $users = User::where('role_id',1)->orWhere('role_id',11)->orWhere('role_id',12)->get();
                    foreach($users as $user)
                    {
                        Notification::send($user, new ClientFormSubmitNotification($web_content));
                    }
            }else{
                $users = User::where('role_id',1)->orWhere('role_id',7)->orWhere('role_id',8)->get();
                    foreach($users as $user)
                    {
                        Notification::send($user, new ClientFormSubmitNotification($web_content));
                    }
            }
        }

        return response()->json(['status'=>200]);
    }
    // ==================== STORE WEB CONTENT END ==================
    // ==================== STORE BLOG ARTICLE START ==================
    public function blogArticle($id, $random_id){
        return view('service-type.blog_article',compact('id','random_id'));
    }
    public function storeBlogArticle(Request $request){

        $data = $request->all();

        $folderLinks = json_encode($data['folder_link']);
        $blogUrls = json_encode($data['blog_url']);
        $topicLinks = json_encode($data['topic_link']);
        $keywordLinks = json_encode($data['keyword_link']);

        $blog_article = BlogArticle::where('random_id',$request->random_id)->first();
        $blog_article->website_link = $data['website_link'];
        $blog_article->website_niche = $data['website_niche'];
        $blog_article->website_name = $data['website_name'];
        $blog_article->business_information = $data['business_information'];
        $blog_article->share_file_info = $request->share_file_info;
        $blog_article->topic_info = $request->topic_info;
        $blog_article->keyword_info = $request->keyword_info;
        $blog_article->product_no = $data['product_no'];
        $blog_article->status = $data['status'];
        $blog_article->folder_link = $folderLinks;
        $blog_article->blog_url = $blogUrls;
        $blog_article->topic_link = $topicLinks;
        $blog_article->keyword_link = $keywordLinks;
        $blog_article->save();

        if($blog_article->submitted_by == 4){
            $milestone = ProjectMilestone::where('id',$blog_article->milestone_id)->first();
            $pm = User::where('id',$milestone->added_by)->first();
            $users = User::where('role_id',1)->orWhere('id',$pm->id)->orWhere('role_id',8)->get();
            foreach($users as $user)
                {
                    Notification::send($user, new ClientBlogArticleSubmitNotification($blog_article));
                }
        }else{
            if(Auth::user()->role_id==11 || Auth::user()->role_id==12){
                $users = User::where('role_id',1)->orWhere('role_id',11)->orWhere('role_id',12)->get();
                    foreach($users as $user)
                    {
                        Notification::send($user, new ClientBlogArticleSubmitNotification($blog_article));
                    }
            }else{
            $users = User::where('role_id',1)->orWhere('role_id',7)->orWhere('role_id',8)->get();
                foreach($users as $user)
                    {
                        Notification::send($user, new ClientBlogArticleSubmitNotification($blog_article));
                    }
                }
        }

        return response()->json(['status'=>200]);
    }
    // ==================== STORE BLOG ARTICLE END ==================

    public function productDescription($id, $random_id){
        return view('service-type.product_description',compact('id','random_id'));
    }
 // ==================== STORE PRODUCT DESCRIPTION START==================
    public function storeProductDescription(Request $request){
        $data = $request->all();

        $folder_links = json_encode($data['folder_link']);
        $blogUrls = json_encode($data['blog_url']);
        $product_lists = json_encode($data['product_list']);

        $product_description = ProductDescription::where('random_id',$request->random_id)->first();
        $product_description->website_link = $data['website_link'];
        $product_description->website_niche = $data['website_niche'];
        $product_description->website_name = $data['website_name'];
        $product_description->business_information = $data['business_information'];
        $product_description->share_file_info = $request->share_file_info;
        $product_description->folder_link = $folder_links;
        $product_description->blog_url = $blogUrls;
        $product_description->product_no = $data['product_no'];
        $product_description->product_list = $product_lists;
        $product_description->word_count = $data['word_count'];
        $product_description->status = $data['status'];
        $product_description->save();

        if($product_description->submitted_by == 4){
            $milestone = ProjectMilestone::where('id',$product_description->milestone_id)->first();
            $pm = User::where('id',$milestone->added_by)->first();
            $users = User::where('role_id',1)->orWhere('id',$pm->id)->orWhere('role_id',8)->get();
            foreach($users as $user)
                {
                     Notification::send($user, new ClientProductDescriptionSubmitNotification($product_description));
                }
        }else{
            if(Auth::user()->role_id==11 || Auth::user()->role_id==12){
                $users = User::where('role_id',1)->orWhere('role_id',11)->orWhere('role_id',12)->get();
                    foreach($users as $user)
                    {
                        Notification::send($user, new ClientProductDescriptionSubmitNotification($product_description));
                    }
            }else{
                $users = User::where('role_id',1)->orWhere('role_id',7)->orWhere('role_id',8)->get();
                    foreach($users as $user)
                    {
                        Notification::send($user, new ClientProductDescriptionSubmitNotification($product_description));
                    }
            }
        }

        return response()->json(['status'=>200]);

    }
    // ==================== STORE PRODUCT DESCRIPTION END==================

    public function productCategory($id, $random_id){
        return view('service-type.product_category',compact('id','random_id'));
    }
    public function storeProductCategory(Request $request){

        $data = $request->all();

        $folder_links = json_encode($data['folder_link']);
        $categoryUrls = json_encode($data['category_url']);
        $category_lists = json_encode($data['category_list']);

        $product_category_collection = ProductCategoryCollection::where('random_id',$request->random_id)->first();
        $product_category_collection->website_link = $data['website_link'];
        $product_category_collection->website_niche = $data['website_niche'];
        $product_category_collection->website_name = $data['website_name'];
        $product_category_collection->business_information = $data['business_information'];
        $product_category_collection->share_file_info = $request->share_file_info;
        $product_category_collection->folder_link = $folder_links;
        $product_category_collection->category_url = $categoryUrls;
        $product_category_collection->product_no = $data['product_no'];
        $product_category_collection->category_list = $category_lists;
        $product_category_collection->word_count = $data['word_count'];
        $product_category_collection->status = $data['status'];
        $product_category_collection->save();

        if($product_category_collection->submitted_by == 4){
            $milestone = ProjectMilestone::where('id',$product_category_collection->milestone_id)->first();
            $pm = User::where('id',$milestone->added_by)->first();
            $users = User::where('role_id',1)->orWhere('id',$pm->id)->orWhere('role_id',8)->get();
            foreach($users as $user)
                {
                    Notification::send($user, new ClientProductCategoryCollectionSubmitNotification($product_category_collection));
                }
        }else{
            if(Auth::user()->role_id==11 || Auth::user()->role_id==12){
                $users = User::where('role_id',1)->orWhere('role_id',11)->orWhere('role_id',12)->get();
                    foreach($users as $user)
                    {
                        Notification::send($user, new ClientProductCategoryCollectionSubmitNotification($product_category_collection));
                    }
            }else{
                $users = User::where('role_id',1)->orWhere('role_id',7)->orWhere('role_id',8)->get();
                    foreach($users as $user)
                    {
                        Notification::send($user, new ClientProductCategoryCollectionSubmitNotification($product_category_collection));
                    }
            }
        }
        return response()->json(['status'=>200]);
    }
    public function productBasicSeo($id, $random_id){
        return view('service-type.basic_seo',compact('id','random_id'));
    }
    public function storeProductBasicSeo(Request $request){

        $basic_seo = BasicSeo::where('random_id',$request->random_id)->first();
        $basic_seo->owner_name = $request->owner_name;
        $basic_seo->business_name = $request->business_name;
        $basic_seo->business_address = $request->business_address;
        $basic_seo->phone_number = $request->phone_number;
        $basic_seo->zip_code = $request->zip_code;
        $basic_seo->google_search_info = $request->google_search_info;
        $basic_seo->done1 = $request->done1;
        $basic_seo->email1 = $request->email1;
        $basic_seo->password1 = $request->password1;
        $basic_seo->google_analytic_info = $request->google_analytic_info;
        $basic_seo->done2 = $request->done2;
        $basic_seo->email2 = $request->email2;
        $basic_seo->password2 = $request->password2;
        $basic_seo->google_business_account_info = $request->google_business_account_info;
        $basic_seo->done3 = $request->done3;
        $basic_seo->email3 = $request->email3;
        $basic_seo->password3 = $request->password3;
        $basic_seo->share_cms_access_info = $request->share_cms_access_info;
        $basic_seo->url = $request->url;
        $basic_seo->user_name = $request->user_name;
        $basic_seo->password4 = $request->password4;
        $basic_seo->confirm_adding = $request->confirm_adding;
        $basic_seo->status = $request->status;
        $basic_seo->save();

        if($basic_seo->submitted_by == 4){
            $milestone = ProjectMilestone::where('id',$basic_seo->milestone_id)->first();
            $pm = User::where('id',$milestone->added_by)->first();
            $users = User::where('role_id',1)->orWhere('id',$pm->id)->orWhere('role_id',8)->get();
            foreach($users as $user)
                {
                    Notification::send($user, new ClientBasicSeoSubmitNotification($basic_seo));
                }
        }else{
            if(Auth::user()->role_id==11 || Auth::user()->role_id==12){
                $users = User::where('role_id',1)->orWhere('role_id',11)->orWhere('role_id',12)->get();
                    foreach($users as $user)
                    {
                        Notification::send($user, new ClientBasicSeoSubmitNotification($basic_seo));
                    }
            }else{
                $users = User::where('role_id',1)->orWhere('role_id',7)->orWhere('role_id',8)->get();
                    foreach($users as $user)
                        {
                            Notification::send($user, new ClientBasicSeoSubmitNotification($basic_seo));
                        }
            }
        }

        return response()->json(['status'=>200]);
    }

    // public function fix_database()
    // {
    //     dd('ok');
    // }


    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        // Retrieve the uploaded file
        $image = $request->file('image');

        // Generate a unique name for the file
        $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

        // Move the uploaded file to a designated directory
        $image->move(public_path('uploads'), $imageName);

        // Perform any additional operations as needed (e.g., saving the file path to a database)

        return response()->json([
            'filename' => \URL::asset('uploads/'.$imageName)
        ]);
    }

    function app_requirements()
    {
        if (auth()->check() && auth()->user()->role_id == 1) {
            return view('app_requirements.index');
        } else {
            abort(403);
        }
    }

}
