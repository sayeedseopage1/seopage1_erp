<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use Carbon\Carbon;
use App\Models\Lead;
use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Country;
use App\Models\LeadAgent;
use App\Models\LeadSource;
use App\Models\LeadStatus;
use App\Imports\LeadImport;
use App\Jobs\ImportLeadJob;
use App\Models\GdprSetting;
use App\Models\LeadCategory;
use App\Models\LeadFollowUp;
use Illuminate\Support\Facades\Validate;
use Illuminate\Http\Request;
use App\Models\PurposeConsent;
use App\DataTables\LeadsDataTable;
use App\DataTables\DealsDataTable;
use App\Models\PurposeConsentLead;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Bus;
use App\Http\Requests\CommonRequest;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\DataTables\LeadGDPRDataTable;
use App\DataTables\ProposalDataTable;
use App\DataTables\LeadNotesDataTable;
use Illuminate\Support\Facades\Artisan;
use Maatwebsite\Excel\HeadingRowImport;
use App\Http\Requests\Lead\StoreRequest;
use App\Http\Requests\Lead\UpdateRequest;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
use App\Http\Requests\Admin\Employee\ImportRequest;
use App\Http\Requests\Admin\Employee\ImportProcessRequest;
use App\Http\Requests\FollowUp\StoreRequest as FollowUpStoreRequest;
use App\Models\LeadCustomForm;
use App\Models\LeadNote;
use Auth;
use App\Models\User;
use App\Models\Contract;
use App\Models\ContractType;
use App\Models\DealStage;
use App\Models\SalesCount;
use DateTime;
use App\Models\DealStageChange;
use App\Models\Currency;
use Illuminate\Support\Facades\Redirect;
//use SweetAlert;
use Toastr;



class DealController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Deals';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
    }


    public function index(DealsDataTable $dataTable)
    {
      //  abort_403(user()->permission('view_deal') == 'none');

        if (!request()->ajax()) {
            if (in_array('client', user_roles())) {
                $this->clients = User::client();
            } else {
                $this->clients = User::allClients();
            }

        }

        return $dataTable->render('deals.index', $this->data);
    }

    public function applyQuickAction(Request $request)
    {
        if ($request->action_type == 'delete') {
            $this->deleteRecords($request);
            return Reply::success(__('messages.deleteSuccess'));
        }

        return Reply::error(__('messages.selectAction'));
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_contract') !== 'all');

        DealStage::whereIn('id', explode(',', $request->row_ids))->delete();
        return true;
    }

    public function destroy($id)
    {
        $deal = DealStage::findOrFail($id);
        $this->deletePermission = user()->permission('delete_contract');

        abort_403(
            !(
                $this->deletePermission == 'all' ||
                ($this->deletePermission == 'added' && user()->id == $contract->added_by) ||
                ($this->deletePermission == 'owned' && user()->id == $contract->client_id) ||
                ($this->deletePermission == 'both' && (user()->id == $contract->client_id || user()->id == $contract->added_by))
            )
        );

        DealStage::destroy($id);
        return Reply::success(__('Deal Deleted Successfully'));
    }

    public function create()
    {
        $this->addPermission = user()->permission('add_contract');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->contractId = request('id');
        $this->deal = null;

        if ($this->contractId != '') {
            $this->deal = DealStage::findOrFail($this->contractId);
        }


        $this->currencies = Currency::all();






        if (request()->ajax()) {
            $this->pageTitle = __('') . ' ' . __('Create Deal');
            $html = view('deals.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'deals.ajax.create';
        return view('deals.create', $this->data);
    }


    public function store(Request $request)
    {
        $request->validate([
            'client_name' => 'required',
            'client_username' => 'required',
            'project_name' => 'required',
            'project_link' => 'required|url',
            'amount' => 'required',
            'description' => 'required',
            'comments' => 'required',
        ]);

        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $suffle = substr(str_shuffle($chars), 0, 6);
        $deal = new DealStage();
        $deal->client_name= $request->client_name;
        $deal->short_code = 'DSEOP1' . $suffle;
        
        $deal->client_username= $request->client_username;
        $deal->deal_stage= 0;
        $deal->project_name = $request->project_name;
        $deal->project_link = $request->project_link;
        $deal->currency_id= 1;
        $deal->original_currency_id= $request->original_currency_id;
        $deal->actual_amount=  $request->amount;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        //dd($currency);
        $deal->amount = ($request->amount)/$currency->exchange_rate;
        $deal->description= $request->description;
        $deal->added_by= Auth::id();
        $deal->converted_by= Auth::id();
        $deal->save();
       $find_user= User::where('user_name', $request->client_username)->first();
        if($find_user == null )
        {
            $user = new User();
            $user->name = $request->client_name;
            $user->user_name = $request->client_username;
            $user->login= 'disable';
            $user->email_notifications = 0;
            $user->save();
        }

        $deal_stage= new DealStageChange();

        $deal_stage->deal_id= $deal->short_code;
        $deal_stage->comments= $request->comments;
        $deal_stage->deal_stage_id=$deal->deal_stage;
        $deal_stage->updated_by= Auth::id();
        $deal_stage->save();

        return response()->json([
            'status' => 'success',
            'redirectUrl' => route('deals.index')
        ]);


//        return redirect()->route('deals.index',__('Deals Added'));
    }

    public function edit($id)
    {
        $this->editPermission = user()->permission('edit_contract');
        $this->deal = DealStage::
            find($id);

        //dd($this->deal);





        $this->currencies = Currency::all();


        if (request()->ajax()) {
            $this->pageTitle = __('app.update') . ' ' . __('Deal');
            $html = view('deals.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'deals.ajax.edit';
        return view('deals.create', $this->data);
    }

    public function update(Request $request)
    {
//        dd($request->all());
        $request->validate([
            'client_name' => 'required',
            'client_username' => 'required',
            'project_name' => 'required',
            'project_link' => 'required|url',
            'amount' => 'required',
            'description' => 'required',

        ]);

        $deal = DealStage::findOrFail($request->id);
        $deal->client_name= $request->client_name;

        $deal->client_username= $request->client_username;
      //  $deal->deal_stage= 0;
        $deal->project_name = $request->project_name;
        $deal->project_link = $request->project_link;
        $deal->currency_id= 1;
        $deal->original_currency_id= $request->original_currency_id;
        $deal->actual_amount=  $request->amount;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        //dd($currency);
        $deal->amount = ($request->amount)/$currency->exchange_rate;
        $deal->description= $request->description;
        $deal->updated_by= Auth::id();

        $deal->save();

        //SweetAlert::message('Deal Updated Successfully!');

//         Toastr::success('Deals Updated Successfully', 'Success', ["positionClass" => "toast-top-right"]);
//        return redirect()->route('deals.index',__('Deals Updated'));
        return response()->json([
            'status' => 'success',
            'redirectUrl' => route('deals.index')
        ]);
    }

    private function storeUpdate($request, $contract)
    {
        $userrole = RoleUser::where('role_id', 4)->get();
        //dd($userrole);
        foreach ($userrole as $row) {
            $row->user_id;
            //dd($row->user_id);
        }
        $contract->client_id = $request->client;
        $contract->subject = $request->subject;
        $contract->amount = $request->amount;
        $contract->currency_id = $request->currency_id;
        $contract->original_amount = $request->amount;
        $contract->contract_name = $request->contract_name;
        $contract->alternate_address = $request->alternate_address;
        $contract->cell = $request->cell;
        $contract->office = $request->office;
        $contract->city = $request->city;
        $contract->state = $request->state;
        $contract->country = $request->country;
        $contract->postal_code = $request->postal_code;
        $contract->contract_type_id = $request->contract_type;
        $contract->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $contract->original_start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $contract->end_date = $request->end_date == null ? $request->end_date : Carbon::createFromFormat($this->global->date_format, $request->end_date)->format('Y-m-d');
        $contract->original_end_date = $request->end_date == null ? $request->end_date : Carbon::createFromFormat($this->global->date_format, $request->end_date)->format('Y-m-d');
        $contract->description = str_replace('<p><br></p>', '', trim($request->description));
        $contract->contract_detail = $request->contract_detail;
        //

        if ($request->company_logo_delete == 'yes') {
            Files::deleteFile($contract->company_logo, 'contract-logo');
            $contract->company_logo = null;
        }

        if ($request->hasFile('company_logo')) {
            Files::deleteFile($contract->company_logo, 'contract-logo');
            $contract->company_logo = Files::upload($request->company_logo, 'contract-logo', 300);
        }

        if ($request->contract_detail) {
            $contract->contract_detail = $request->contract_detail;
        }

        $contract->save();

        // if ($request->get('custom_fields_data')) {
        //     $contract->updateCustomFieldData($request->get('custom_fields_data'));
        // }

        return $contract;
    }

    /**
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|mixed|void
     */
    public function show($id)
    {
      //dd($id);
        $viewPermission = user()->permission('view_contract');
        $this->viewDiscussionPermission = $viewDiscussionPermission = user()->permission('view_contract_discussion');
        $this->viewContractFilesPermission = $viewContractFilesPermission = user()->permission('view_contract_files');

        $this->deal = DealStage::findOrFail($id);
      //  dd($this->deal );

        // abort_403(
        //     !(
        //         $viewPermission == 'all' ||
        //         ($viewPermission == 'added' && user()->id == $this->contract->added_by) ||
        //         ($viewPermission == 'owned' && user()->id == $this->contract->client_id) ||
        //         ($viewPermission == 'both' && (user()->id == $this->contract->client_id || user()->id == $this->contract->added_by))
        //     )
        // );

        $this->pageTitle = __('') . ucfirst($this->deal->short_code);

        $this->view = 'deals.ajax.deal_details';

        $tab = request('tab');

        switch ($tab) {
          case 'deal_details':
              $this->view = 'deals.ajax.deal_details';
              break;
            case 'files':
                $this->view = 'deals.ajax.files';
                break;
                case 'summary':
                    $this->view = 'deals.ajax.summary';
                    break;
            case 'followup':
                $this->view = 'deals.ajax.followup';
                break;
                case 'proposal':
                    $this->view = 'deals.ajax.proposal';
                    break;

            default:
                $this->view = 'deals.ajax.deal_details';
                break;
        }

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->activeTab = $tab == '' ? 'deal_details' : $tab;

        return view('deals.show', $this->data);
    }
    public function comments(Request $request)
    {
    if ($request->comment == null && $request->attach == null) {
      Toastr::error('Please add a comment', 'Failed', ["positionClass" => "toast-top-right"]);
     return back();
    }else {
      $deal= new DealStageChange();
      $deal->updated_by= Auth::id();
      $deal->deal_stage_id= $request->deal_stage_id;
      $deal->deal_id= $request->deal_id;

      if($request->comment != null )
      {

        $deal->comments= $request->comment;

        //$deal->save();
      }

      if($request->hasFile('attach'))

      {
        $files = $request->file('attach');
        $filename= null;
      //  dd($files);
        $value='';
        foreach ($files as $file) {
          $filename=null;
          if ($file) {
              $filename = time() . $file->getClientOriginalName();

              Storage::disk('public')->putFileAs(
                  'deal-files/',
                  $file,
                  $filename
              );

          }
            $value= $value  . $filename.',';


        }
        //dd($value);

      }else {
        $value= null;
      }

         $deal->attach= $value;


       $deal->save();
       Toastr::success('Comment Added Successfully', 'Success', ["positionClass" => "toast-top-right"]);
      return back();
    }

    }

    public function demo_serach()

    {

        return view('searchDemo');

    }

    

    /**

     * Show the form for creating a new resource.

     *

     * @return \Illuminate\Http\Response

     */

    public function SearchClient(Request $request)

    {
       

        $data = User::select(["name","user_name"])
        ->where('role_id',null)
        ->where('name', 'LIKE', '%'. $request->get('query'). '%')
        ->orwhere('user_name', 'LIKE', '%'. $request->get('query'). '%')
        ->get();
     

        return response()->json($data);
    }
}
