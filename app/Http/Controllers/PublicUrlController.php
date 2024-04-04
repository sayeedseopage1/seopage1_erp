<?php

namespace App\Http\Controllers;

use App\Models\ClientForm;
use App\Models\Deal;
use Carbon\Carbon;
use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Invoice;
use App\Models\Setting;
use App\Models\Contract;
use App\Models\Estimate;
use App\Models\ContractSign;
use App\Models\EstimateItem;
use App\Models\InvoiceItems;
use Illuminate\Http\Request;
use App\Models\AcceptEstimate;
use App\Models\InvoiceSetting;
use Illuminate\Support\Facades\DB;
use App\Events\ContractSignedEvent;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use App\Traits\UniversalSearchTrait;
use App\Http\Requests\EstimateAcceptRequest;
use App\Http\Requests\Admin\Contract\SignRequest;
use App\Models\Project;
use App\Events\SignedEvent;
use App\Events\ProjectSignedEvent;
use App\Helper\ProjectManagerPointLogic;
use Notification;
use App\Notifications\ClientDeliverableSignNotification;
use App\Models\User;
use App\Models\AuthorizationAction;
use App\Models\ProjectPmGoal;
use App\Models\PendingAction;
use App\Models\PendingActionPast;
use Auth;
use App\Models\Task;


class PublicUrlController extends Controller
{
    use UniversalSearchTrait;

    /* Contract */
    public function contractView(Request $request, $hash)
    {
        $pageTitle = 'app.menu.contracts';
        $pageIcon = 'fa fa-file';
        $contract = Contract::where('hash', $hash)
            ->with('client', 'contractType', 'signature', 'discussion', 'discussion.user')->withoutGlobalScope('company')
            ->firstOrFail();
        return view('contract', ['contract' => $contract, 'global' => $this->global, 'pageTitle' => $pageTitle, 'pageIcon' => $pageIcon]);
    }

    public function contractSign(SignRequest $request, $id)
    {
        $this->contract = Contract::with('signature')->findOrFail($id);

        if($this->contract && $this->contract->signature){
            return Reply::error(__('messages.alreadySigned'));
        }

        $sign = new ContractSign();
        $sign->full_name = $request->first_name . ' ' . $request->last_name;
        $sign->contract_id = $this->contract->id;
        $sign->email = $request->email;
        $imageName = null;

        if ($request->signature_type == 'signature') {
             $image = $request->signature;  // your base64 encoded
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = str_random(32) . '.' . 'jpg';

            if (!File::exists(public_path(Files::UPLOAD_FOLDER . '/' . 'contract/sign'))) {
                $result = File::makeDirectory(public_path(Files::UPLOAD_FOLDER . '/contract/sign'), 0775, true);
            }

            File::put(public_path() . '/' . Files::UPLOAD_FOLDER . '/contract/sign/' . $imageName, base64_decode($image));
        }
        else {
            if ($request->hasFile('image')) {
                $imageName = Files::upload($request->image, 'contract/sign', 300);
            }
        }

        $sign->signature = $imageName;
        $sign->save();

        event(new ContractSignedEvent($this->contract, $sign));

        return Reply::redirect(route('contracts.show', $this->contract->id));
    }
    public function projectSign(SignRequest $request, $id)
    {
        // dd($request->all());
       // DB::beginTransaction();
        $this->project = Project::with('signature')->findOrFail($id);
        //dd($this->project);

        if($this->project && $this->project->signature){
            return Reply::error(__('messages.alreadySigned'));
        }

        $sign = new ContractSign();
        $sign->full_name = $request->first_name . ' ' . $request->last_name;
        $sign->project_id = $this->project->id;
        $sign->email = $request->email;
        $sign->number= $request->country_code . ' ' . $request->phone_no;
        $imageName = null;

        if ($request->signature_type == 'signature') {
             $image = $request->signature;  // your base64 encoded
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = str_random(32) . '.' . 'jpg';

            if (!File::exists(public_path(Files::UPLOAD_FOLDER . '/' . 'project/sign'))) {
                $result = File::makeDirectory(public_path(Files::UPLOAD_FOLDER . '/project/sign'), 0775, true);
            }

            File::put(public_path() . '/' . Files::UPLOAD_FOLDER . '/project/sign/' . $imageName, base64_decode($image));
        }
        else {
            if ($request->hasFile('image')) {
                $imageName = Files::upload($request->image, 'project/sign', 300);
            }
        }

        $sign->signature = $imageName;
        $sign->save();

        // Project Manager Point Distribution
        if($released_time = Project::with('deal')->find($id)->deal->released_at ?? null) ProjectManagerPointLogic::distribute(1, $id, Carbon::parse($released_time)->diffInHours(Carbon::now()));
        

        if($request->email != 'rajat07me@gmail.com' && $request->email != 'rajat07me@seopage1.net')
        {
           // dd("true");
            $project= Project::where('id',$this->project->id)->first();
            $deal= Deal::where('id',$project->deal_id)->first();
            $client = new ClientForm();
            $client->deal_id=$project->deal_id;

            $client->client_email= $request->email;
            $client->client_phone= $request->phone_no;
            $client->client_whatsapp= $request->phone_no;

            $client->save();
            $deal_id= Deal::find($client->deal_id);
            //dd($deal);

            $deal_id->submission_status= 'Submitted';
            $deal_id->save();
            $usr= User::where('id',$deal->client_id)->first();
            //dd($usr);
            $user=User::find($usr->id);
            $user->mobile= $request->client_phone;
            $user->email= $request->email;

            $user->save();

        }
        $actions = PendingAction::where('code','SDCA')->where('past_status',0)->where('project_id',$sign->project_id)->get();
        if($actions != null)
        {
        foreach ($actions as $key => $action) {
                $project=Project::where('id',$sign->project_id)->first();
                
               
                $action->authorized_by= Auth::id();
                $action->authorized_at= Carbon::now();
                $action->past_status = 1;
                $action->save();
                $project_manager= User::where('id',$project->pm_id)->first();
                $client= User::where('id',$project->client_id)->first();
                $authorize_by= User::where('id',$action->authorized_by)->first();

                $past_action= new PendingActionPast();
                $past_action->item_name = $action->item_name;
                $past_action->code = $action->code;
                $past_action->serial = $action->serial;
                $past_action->action_id = $action->id;
                $past_action->heading = $action->heading;
                $past_action->message = 'Deliverables for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> were shared with the client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> by PM <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>!';
             //   $past_action->button = $action->button;
                $past_action->timeframe = $action->timeframe;
                $past_action->authorization_for = $action->authorization_for;
                $past_action->authorized_by = $action->authorized_by;
                $past_action->authorized_at = $action->authorized_at;
                $past_action->expired_status = $action->expired_status;
                $past_action->past_status = $action->past_status;
                $past_action->project_id = $action->project_id;
                $past_action->task_id = $action->task_id;
                $past_action->client_id = $action->client_id;
                $past_action->milestone_id = $action->milestone_id;
                $past_action->save();


        }
    }
   // dd("dnkasmdasl");
    $current_date = Carbon::now();
    $pm_goal = ProjectPmGoal::where('project_id',$this->project->id)->where('goal_code','DCS')->first();
    if($pm_goal != null && $current_date < $pm_goal->goal_end_date)
    {
        $pm_goal->goal_status = 1;
        
       
        $task_count= Task::where('project_id',$this->project->id)->count();
            if($task_count > 0)
                {
                    $pm_goal->description = 'Deliverables is signed and tasks has been created properly';

                }elseif($task_count < 1)
                {
                    $pm_goal->description = 'Deliverables is signed and tasks has not been created properly';

                }
                $pm_goal->save();
        

    }


       // dd($sign,$client,$deal_id);

       
        $project = Project::findOrFail($this->project->id);
        $global = $settings = global_setting();

        $this->invoiceSetting = InvoiceSetting::first();
        $pdf = app('dompdf.wrapper');
        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('projects.project-pdf', ['project' => $project, 'global' => $global]);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);

        $filename = str_slug($project->project_name) . '-agreement-' . $project->id;

        // Save the PDF to a temporary location
        $tempDirectory = storage_path('app/temp');

    // Create the directory if it doesn't exist
    if (!file_exists($tempDirectory)) {
        mkdir($tempDirectory, 0755, true);
    }

    // Define the file path for the temporary PDF
    $tempFilePath = $tempDirectory . '/' . $filename . '.pdf';

    // Save the PDF to the temporary location
    $pdf->save($tempFilePath);


        event(new ProjectSignedEvent($this->project, $sign));
        if($request->email != 'rajat07me@gmail.com' && $request->email != 'rajat07me@seopage1.net')
        {
            $users= User::where('role_id',1)->orWhere('id',$this->project->pm_id)->orWhere('id',$project->client_id)->get();

        }else
        {
            $users= User::where('role_id',1)->orWhere('id',$this->project->pm_id)->get();

        }


      //  $users= User::where('id',$project->client_id)->get();
        $project_id = Project::where('id',$this->project->id)->first();
       // dd($project_id);
      foreach ($users as $user) {

    //   Notification::send($user, new ClientDeliverableSignNotification($project_id));
    $notification = new ClientDeliverableSignNotification($project_id,$user);
    //$notification->attach($tempFilePath);

    // Send the notification to the user
    Notification::send($user, $notification);
    }

      return Reply::redirect(route('projects.show', $this->project->id));
    }

    public function contractDownload($id)
    {

        $contract = Contract::findOrFail($id);
        $global = global_setting();

        $this->invoiceSetting = InvoiceSetting::first();
        $pdf = app('dompdf.wrapper');
        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('admin.contracts.contract-pdf', ['contract' => $contract, 'global' => $global]);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);

        $filename = 'contract-' . $contract->id;

        return $pdf->download($filename . '.pdf');
    }

    public function contractDownloadView($id)
    {
        $contract = Contract::findOrFail($id);
        $pdf = app('dompdf.wrapper');
        $global = global_setting();
        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('admin.contracts.contract-pdf', ['contract' => $contract, 'global' => $global]);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);

        $filename = 'contract-' . $contract->id;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

    public function projectDownload($id)
    {
        $project = Project::findOrFail($id);
          $global = $settings = global_setting();

        $this->invoiceSetting = InvoiceSetting::first();
        $pdf = app('dompdf.wrapper');
        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('projects.project-pdf', ['project' => $project, 'global' => $global]);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);

        $filename = str_slug($project->project_name) . '-agreement-' . $project->id;

        return $pdf->download($filename . '.pdf');
    }

    public function projectDownloadView($id)
    {
        $project = Project::findOrFail($id);
        $pdf = app('dompdf.wrapper');
        $global = $settings = global_setting();
        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('projects.project-pdf', ['project' => $project, 'global' => $global]);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);

        $filename = str_slug($project->project_name) . '-agreement-' . $project->id;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

    public function estimateView($hash)
    {
        $estimate = Estimate::with('client', 'clientdetails')->where('hash', $hash)->firstOrFail();
        $pageTitle = $estimate->estimate_number;
        $pageIcon = 'icon-people';

        if ($estimate->discount > 0) {
            if ($estimate->discount_type == 'percent') {
                $this->discount = (($estimate->discount / 100) * $estimate->sub_total);
            }
            else {
                $this->discount = $estimate->discount;
            }
        }
        else {
            $this->discount = 0;
        }

        $taxList = array();

        $items = EstimateItem::whereNotNull('taxes')
            ->where('estimate_id', $estimate->id)
            ->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = EstimateItem::taxbyid($tax)->first();

                if ($this->tax) {
                    if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                        if ($estimate->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $estimate->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                        } else{
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                        }

                    }
                    else {
                        if ($estimate->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $estimate->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                        } else {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                        }
                    }
                }
            }
        }

        $taxes = $taxList;
        $this->invoiceSetting = InvoiceSetting::first();
        $settings = Setting::first();

        return view('estimate', [
            'estimate' => $estimate,
            'taxes' => $taxes,
            'settings' => $settings,
            'discount' => $this->discount,
            'setting' => $settings,
            'global' => $this->global,
            'companyName' => $settings->company_name,
            'pageTitle' => $pageTitle,
            'pageIcon' => $pageIcon,
            'invoiceSetting' => $this->invoiceSetting,
        ]);

    }

    public function estimateAccept(EstimateAcceptRequest $request, $id)
    {
        DB::beginTransaction();

        $estimate = Estimate::with('sign')->findOrFail($id);

        /** @phpstan-ignore-next-line */
        if($estimate && $estimate->sign){
            return Reply::error(__('messages.alreadySigned'));
        }

        $accept = new AcceptEstimate();
        $accept->full_name = $request->first_name . ' ' . $request->last_name;
        $accept->estimate_id = $estimate->id;
        $accept->email = $request->email;
        $imageName = null;

        if ($request->signature_type == 'signature') {
            $image = $request->signature;  // your base64 encoded
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = str_random(32) . '.' . 'jpg';

            if (!File::exists(public_path(Files::UPLOAD_FOLDER . '/' . 'estimate/accept'))) {
                $result = File::makeDirectory(public_path(Files::UPLOAD_FOLDER . '/estimate/accept'), 0775, true);
            }

            File::put(public_path() . '/' . Files::UPLOAD_FOLDER . '/estimate/accept/' . $imageName, base64_decode($image));
        }
        else {
            if ($request->hasFile('image')) {
                $imageName = Files::upload($request->image, 'estimate/accept/', 300);
            }
        }

        $accept->signature = $imageName;
        $accept->save();

        $estimate->status = 'accepted';
        $estimate->save();

        $invoice = new Invoice();

        $invoice->client_id = $estimate->client_id;
        $invoice->issue_date = Carbon::now($this->global->timezone)->format('Y-m-d');
        $invoice->due_date = Carbon::now($this->global->timezone)->addDays(invoice_setting()->due_after)->format('Y-m-d');
        $invoice->sub_total = round($estimate->sub_total, 2);
        $invoice->discount = round($estimate->discount, 2);
        $invoice->discount_type = $estimate->discount_type;
        $invoice->total = round($estimate->total, 2);
        $invoice->currency_id = $estimate->currency_id;
        $invoice->note = str_replace('<p><br></p>', '', trim($estimate->note));
        $invoice->status = 'unpaid';
        $invoice->estimate_id = $estimate->id;
        $invoice->invoice_number = Invoice::lastInvoiceNumber() + 1;
        $invoice->save();

        /** @phpstan-ignore-next-line */
        foreach ($estimate->items as $key => $item) :

            if (!is_null($item)) {
                InvoiceItems::create(
                    [
                        'invoice_id' => $invoice->id,
                        'item_name' => $item->item_name,
                        'item_summary' => $item->item_summary ? $item->item_summary : '',
                        'type' => 'item',
                        'quantity' => $item->quantity,
                        'unit_price' => round($item->unit_price, 2),
                        'amount' => round($item->amount, 2),
                        'taxes' => $item->taxes
                    ]
                );
            }

        endforeach;

        // Log search
        $this->logSearchEntry($invoice->id, $invoice->invoice_number, 'invoices.show', 'invoice');

        DB::commit();

        return Reply::success(__('messages.estimateSigned'));
    }

    public function estimateDecline(Request $request, $id)
    {
        $estimate = Estimate::findOrFail($id);
        $estimate->status = 'declined';
        $estimate->save();

        return Reply::dataOnly(['status' => 'success']);
    }

    public function estimateDownload($id)
    {
        $this->invoiceSetting = invoice_setting();
        $this->estimate = Estimate::with('client', 'clientdetails')->findOrFail($id);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);

        $pdfOption = $this->domPdfObjectForDownload($id);
        $pdf = $pdfOption['pdf'];
        $filename = $pdfOption['fileName'];

        return $pdf->download($filename . '.pdf');

    }

    public function domPdfObjectForDownload($id)
    {
        $this->invoiceSetting = invoice_setting();
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $this->estimate = Estimate::findOrFail($id);

        if ($this->estimate->discount > 0) {

            if ($this->estimate->discount_type == 'percent') {
                $this->discount = (($this->estimate->discount / 100) * $this->estimate->sub_total);
            }
            else {
                $this->discount = $this->estimate->discount;
            }
        }
        else {
            $this->discount = 0;
        }

        $taxList = array();

        $items = EstimateItem::whereNotNull('taxes')
            ->where('estimate_id', $this->estimate->id)
            ->get();
        $this->invoiceSetting = invoice_setting();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = EstimateItem::taxbyid($tax)->first();

                if ($this->tax) {
                    if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                        if ($this->estimate->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->estimate->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                        } else{
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                        }

                    }
                    else {
                        if ($this->estimate->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->estimate->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

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

        $pdf = app('dompdf.wrapper');

        $pdf->getDomPDF()->set_option('enable_php', true);
        $pdf->loadView('estimates.pdf.' . $this->invoiceSetting->template, $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);
        $filename = $this->estimate->estimate_number;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

}
