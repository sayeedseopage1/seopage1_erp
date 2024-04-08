<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Country;
use App\Models\Invoice;
use App\Models\Project;
use App\Models\BaseModel;
use App\Models\ClientNote;
use App\Models\ContractType;
use Illuminate\Http\Request;
use App\Imports\ClientImport;
use App\Jobs\ImportClientJob;
use App\Models\ClientDetails;
use App\Models\ClientCategory;
use App\Models\PurposeConsent;
use App\Models\UniversalSearch;
use App\Models\ClientSubCategory;
use App\Models\PurposeConsentUser;
use Illuminate\Support\Facades\DB;
use App\DataTables\TicketDataTable;
use Illuminate\Support\Facades\Bus;
use App\DataTables\ClientsDataTable;
use Maatwebsite\Excel\Facades\Excel;
use App\DataTables\InvoicesDataTable;
use App\DataTables\PaymentsDataTable;
use App\DataTables\ProjectsDataTable;
use App\DataTables\EstimatesDataTable;
use Illuminate\Support\Facades\Config;
use App\DataTables\ClientGDPRDataTable;
use Illuminate\Support\Facades\Artisan;
use Maatwebsite\Excel\HeadingRowImport;
use App\DataTables\ClientNotesDataTable;
use App\DataTables\CreditNotesDataTable;
use App\DataTables\ClientContactsDataTable;
use App\DataTables\ClientDealDataTable;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
use App\Http\Requests\Admin\Employee\ImportRequest;
use App\Http\Requests\Admin\Client\StoreClientRequest;
use App\Http\Requests\Gdpr\SaveConsentUserDataRequest;
use App\Http\Requests\Admin\Client\UpdateClientRequest;
use App\Http\Requests\Admin\Employee\ImportProcessRequest;
use App\Models\ClientDeal;
use App\Models\LanguageSetting;
use App\Models\Payment;
use Google\Service\Dfareporting\Resource\Languages;
use Google\Service\Gmail\LanguageSettings;
use Auth;

class ClientController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.clients';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('clients', $this->user->modules));
            return $next($request);
        });
    }

    /**
     * client list
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ClientsDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_clients');
        $this->addClientPermission = user()->permission('add_clients');

        abort_403(!in_array($viewPermission, ['all', 'added', 'both']));
        if(Auth::user()->role_id == 6 || Auth::user()->role_id == 13){
            abort(403);
        }

        if (!request()->ajax()) {
            $this->clients = User::allClients();
            $this->subcategories = ClientSubCategory::all();
            $this->categories = ClientCategory::all();
            $this->projects = Project::all();
            $this->contracts = ContractType::all();
            $this->countries = countries();
            $this->totalClients = count($this->clients);
        }
        if(Auth::user()->role_id == 6 || Auth::user()->role_id == 13){
            abort(404);
        }

        return $dataTable->render('clients.index', $this->data);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function create($leadID = null)
    {
        $this->addPermission = user()->permission('add_clients');

        abort_403 (!($this->addPermission == 'all' || $this->addPermission == 'added' || $this->addPermission == 'both'));

        if ($leadID) {
            $this->leadDetail = Lead::findOrFail($leadID);
        }

        if (request('lead') != '') {
            $this->leadId = request('lead');
            $this->type = 'lead';
            $this->lead = Lead::findOrFail($this->leadId);
        }

        $this->pageTitle = __('app.add') . ' ' . __('app.client');
        $this->countries = countries();
        $this->categories = ClientCategory::all();
        $this->salutations = ['mr', 'mrs', 'miss', 'dr', 'sir', 'madam'];
        $this->languages = LanguageSetting::where('status', 'enabled')->get();

        $client = new ClientDetails();

        if (!empty($client->getCustomFieldGroupsWithFields())) {
            $this->fields = $client->getCustomFieldGroupsWithFields()->fields;
        }

        if (request()->ajax()) {
            if (request('quick-form') == 1) {
                return view('clients.ajax.quick_create', $this->data);
            }

            $html = view('clients.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'clients.ajax.create';
        return view('clients.create', $this->data);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return array
     */
    public function store(StoreClientRequest $request)
    {
        $client = new ClientDetails();
        $client_note = new ClientNote();

        DB::beginTransaction();
        $data = $request->all();
        unset($data['country']);
        $data['password'] = bcrypt($request->password);
        $data['country_id'] = $request->country;
        $data['name'] = $request->name;
        $data['email_notifications'] = $request->sendMail == 'yes' ? 1 : 0;
        $data['gender'] = $request->gender ?? null;
        $data['locale'] = $request->locale;

        if ($request->has('telegram_user_id')) {
            $data['telegram_user_id'] = $request->telegram_user_id;
        }

        if ($request->hasFile('image')) {
            $data['image'] = Files::upload($request->image, 'avatar', 300);
        }

        $user = User::create($data);
        $user->clientDetails()->create($data);

        $client_id = $client->latest()->first()->user_id;

        if ($request->has('note')) {
            $client_note->title = 'Note';
            $client_note->client_id = $client_id;
            $client_note->details = $request->note;
            $client_note->save();
        }

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $client = $user->clientDetails;
            $client->updateCustomFieldData($request->get('custom_fields_data'));
        }

        $user->attachRole(3);

        $user->assignUserRolePermission(3);

        // Log search
        $this->logSearchEntry($user->id, $user->name, 'clients.show', 'client');

        if (!is_null($user->email)) {
            $this->logSearchEntry($user->id, $user->email, 'clients.show', 'client');
        }

        if (!is_null($user->clientDetails->company_name)) {
            $this->logSearchEntry($user->id, $user->clientDetails->company_name, 'clients.show', 'client');
        }

        if ($request->has('lead')) {
            $lead = Lead::findOrFail($request->lead);
            $lead->client_id = $user->id;
            $lead->save();
        }

        DB::commit();

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('clients.index');
        }

        if ($request->has('ajax_create')) {
            $teams = User::allClients();
            $teamData = '';

            foreach ($teams as $team) {
                $selected = ($team->id == $user->id) ? 'selected' : '';
                $teamData .= '<option '.$selected.' value="' . $team->id . '"> ' . mb_ucwords($team->name) . ' </option>';
            }

            return Reply::successWithData(__('messages.clientAdded'), ['teamData' => $teamData, 'redirectUrl' => $redirectUrl]);
        }

        return Reply::successWithData(__('messages.clientAdded'), ['redirectUrl' => $redirectUrl]);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->client = User::withoutGlobalScope('active')->with('clientDetails')->findOrFail($id);
        $this->editPermission = user()->permission('edit_clients');

        abort_403 (!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->client->clientDetails->added_by == user()->id) || ($this->editPermission == 'both' && $this->client->clientDetails->added_by == user()->id)));

        $this->countries = countries();
        $this->categories = ClientCategory::all();

        if ($this->editPermission == 'all') {
            $this->employees = User::allEmployees();
        }

        $this->pageTitle = __('app.update') . ' ' . __('app.client');
        $this->salutations = ['mr', 'mrs', 'miss', 'dr', 'sir', 'madam'];
        $this->languages = LanguageSetting::where('status', 'enabled')->get();

        if (!is_null($this->client->clientDetails)) {
            $this->clientDetail = $this->client->clientDetails->withCustomFields();

            if (!empty($this->clientDetail->getCustomFieldGroupsWithFields())) {
                $this->fields = $this->clientDetail->getCustomFieldGroupsWithFields()->fields;
            }
        }

        $this->subcategories = isset($this->client->clientDetails) && !is_null($this->client->clientDetails->category_id) ? ClientSubCategory::where('category_id', $this->client->clientDetails->category_id)->get() : [];

        if (request()->ajax()) {
            $html = view('clients.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'clients.ajax.edit';

        return view('clients.create', $this->data);

    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClientRequest $request, $id)
    {
        $user = User::withoutGlobalScope('active')->findOrFail($id);
        $data = $request->all();

        unset($data['password']);
        unset($data['country']);

        if ($request->password != '') {
            $data['password'] = bcrypt($request->password);
        }

        $data['country_id'] = $request->country;

        if ($request->has('sendMail')) {
            $user->email_notifications = $request->sendMail == 'yes' ? 1 : 0;
        }

        if ($request->has('telegram_user_id')) {
            $data['telegram_user_id'] = $request->telegram_user_id;
        }


        if ($request->image_delete == 'yes') {
            Files::deleteFile($user->image, 'avatar');
            $data['image'] = null;
        }

        if ($request->hasFile('image')) {

            Files::deleteFile($user->image, 'avatar');
            $data['image'] = Files::upload($request->image, 'avatar', 300);
        }


        $user->update($data);

        if ($user->clientDetails) {
            $data['category_id'] = $request->category_id;
            $data['sub_category_id'] = $request->sub_category_id;
            $data['note'] = str_replace('<p><br></p>', '', trim($request->note));
            $data['locale'] = $request->locale;
            $fields = $request->only($user->clientDetails->getFillable());

            $user->clientDetails->fill($fields);
            $user->clientDetails->save();
        }
        else {
            $user->clientDetails()->create($data);
        }

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $user->clientDetails->updateCustomFieldData($request->get('custom_fields_data'));
        }

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('clients.index');
        }

        return Reply::successWithData(__('messages.updateSuccess'), ['redirectUrl' => $redirectUrl]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->client = User::withoutGlobalScope('active')->with('clientDetails')->findOrFail($id);
        $this->deletePermission = user()->permission('delete_clients');

        abort_403 (
            !($this->deletePermission == 'all'
            || ($this->deletePermission == 'added' && $this->client->clientDetails->added_by == user()->id)
            || ($this->deletePermission == 'both' && $this->client->clientDetails->added_by == user()->id)
            )
        );

        $universalSearches = UniversalSearch::where('searchable_id', $id)->where('module_type', 'client')->get();

        if ($universalSearches) {
            foreach ($universalSearches as $universalSearch) {
                UniversalSearch::destroy($universalSearch->id);
            }
        }

        User::withoutGlobalScope('active')->where('id', $id)->delete();

        return Reply::success(__('messages.clientDeleted'));
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
                return Reply::success(__('messages.deleteSuccess'));
        case 'change-status':
            $this->changeStatus($request);
                return Reply::success(__('messages.statusUpdatedSuccessfully'));
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        abort_403 (!(user()->permission('delete_clients') == 'all'));
        User::withoutGlobalScope('active')->whereIn('id', explode(',', $request->row_ids))->delete();
        return true;
    }

    protected function changeStatus($request)
    {
        abort_403 (!(user()->permission('edit_clients') == 'all'));
        User::withoutGlobalScope('active')
            ->whereIn('id', explode(',', $request->row_ids))
            ->update(['status' => $request->status]);
        return true;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(Auth::user()->role_id == 6 || Auth::user()->role_id == 13){
            abort(404);
        }
        $this->client = User::withoutGlobalScope('active')->with('clientDetails')->findOrFail($id);
        $this->clientLanguage = LanguageSetting::where('language_code', $this->client->locale)->first();
        $this->viewPermission = user()->permission('view_clients');

        if (!$this->client->hasRole('client')) {
            abort(404);
        }
        if(Auth::user()->role_id == 6 || Auth::user()->role_id == 13){
            abort(403);
        }

        abort_403 (!($this->viewPermission == 'all'
        || ($this->viewPermission == 'added' && $this->client->clientDetails->added_by == user()->id)
        || ($this->viewPermission == 'both' && $this->client->clientDetails->added_by == user()->id)));

        $this->pageTitle = ucfirst($this->client->name);

        $this->clientStats = $this->clientStats($id);
        $this->projectChart = $this->projectChartData($id);
        $this->invoiceChart = $this->invoiceChartData($id);

        $this->earningTotal = Payment::leftJoin('invoices', 'invoices.id', '=', 'payments.invoice_id')
            ->leftJoin('projects', 'projects.id', '=', 'payments.project_id')
            ->where(function ($q) use ($id) {
                $q->where('invoices.client_id', $id);
                $q->orWhere('projects.client_id', $id);
            })->sum('amount');

        $this->view = 'clients.ajax.profile';

        $tab = request('tab');

        switch ($tab) {
        case 'profile':

            $this->clientDetail = ClientDetails::where('user_id', '=', $this->client->id)->first();

            if (!is_null($this->clientDetail)) {
                $this->clientDetail = $this->clientDetail->withCustomFields();

                if (!empty($this->clientDetail->getCustomFieldGroupsWithFields())) {
                    $this->fields = $this->clientDetail->getCustomFieldGroupsWithFields()->fields;
                }
            }

            $this->view = 'clients.ajax.profile';
            break;
        case 'projects':
            return $this->projects();
        case 'deals':
            return $this->deals();
            break;
        case 'invoices':
            return $this->invoices();
        case 'payments':
            return $this->payments();
        case 'estimates':
            return $this->estimates();
        case 'creditnotes':
            return $this->creditnotes();
        case 'contacts':
            return $this->contacts();
        case 'documents':
            $this->view = 'clients.ajax.documents';
                break;
        case 'notes':
            return $this->notes();
        case 'tickets':
            return $this->tickets();
        case 'gdpr':
            $this->client = User::withoutGlobalScope('active')->findOrFail($id);
            $this->consents = PurposeConsent::with(['user' => function ($query) use ($id) {
                $query->where('client_id', $id)
                    ->orderBy('created_at', 'desc');
            }])->get();

            return $this->gdpr();
        default:
            $this->clientDetail = ClientDetails::where('user_id', '=', $this->client->id)->first();

            if (!is_null($this->clientDetail)) {
                $this->clientDetail = $this->clientDetail->withCustomFields();

                if (!empty($this->clientDetail->getCustomFieldGroupsWithFields())) {
                    $this->fields = $this->clientDetail->getCustomFieldGroupsWithFields()->fields;
                }
            }

            $this->view = 'clients.ajax.profile';
            break;
        }

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

            ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;

            return view('clients.show', $this->data);

    }

    public function clientStats($id)
    {
        return DB::table('users')
            ->select(
                DB::raw('(select count(projects.id) from `projects` WHERE projects.client_id = ' . $id . ') as totalProjects'),
                DB::raw('(select count(invoices.id) from `invoices` left join projects on projects.id=invoices.project_id WHERE invoices.status != "paid" and invoices.status != "canceled" and (projects.client_id = ' . $id . ' or invoices.client_id = ' . $id . ')) as totalUnpaidInvoices'),
                DB::raw('(select sum(payments.amount) from `payments` left join projects on projects.id=payments.project_id WHERE payments.status = "complete" and projects.client_id = ' . $id . ') as projectPayments'),
                DB::raw('(select sum(payments.amount) from `payments` inner join invoices on invoices.id=payments.invoice_id  WHERE payments.status = "complete" and invoices.client_id = ' . $id . ') as invoicePayments'),
                DB::raw('(select count(contracts.id) from `contracts` WHERE contracts.client_id = ' . $id . ') as totalContracts')
            )
            ->first();
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function projectChartData($id)
    {
        $labels = ['in progress', 'on hold', 'not started', 'canceled', 'finished'];
        $data['labels'] = [__('app.inProgress'), __('app.onHold'), __('app.notStarted'), __('app.canceled'), __('app.finished')];
        $data['colors'] = ['#1d82f5', '#FCBD01', '#616e80', '#D30000', '#2CB100'];
        $data['values'] = [];

        foreach ($labels as $label) {
            $data['values'][] = Project::where('client_id', $id)->where('status', $label)->count();
        }

        return $data;
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function invoiceChartData($id)
    {
        $labels = ['paid', 'unpaid', 'partial', 'canceled', 'draft'];
        $data['labels'] = [__('app.paid'), __('app.unpaid'), __('app.partial'), __('app.canceled'), __('app.draft')];
        $data['colors'] = ['#2CB100', '#FCBD01', '#1d82f5', '#D30000', '#616e80'];
        $data['values'] = [];

        foreach ($labels as $label) {
            $data['values'][] = Invoice::where('client_id', $id)->where('status', $label)->count();
        }

        return $data;
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function projectList($id)
    {
        if ($id != 0) {
            $projects = Project::where('client_id', $id)->get();
            $options = BaseModel::options($projects, null, 'project_name');
        }
        else{
            $options = '<option value="">--</option>';
        }

        return Reply::dataOnly(['status' => 'success', 'data' => $options]);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function ajaxDetails($id)
    {
        if ($id != 0) {
            $client = User::withoutGlobalScope('active')->with('clientDetails', 'country')->find($id);
        }
        else{
            $client = null;
        }

        $data = $client ? $client : null;

        return Reply::dataOnly(['status' => 'success', 'data' => $data]);
    }

    public function projects()
    {
        $dataTable = new ProjectsDataTable();
        $viewPermission = user()->permission('view_projects');

        abort_403 (!($viewPermission == 'all' || $viewPermission == 'added'));
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'clients.ajax.projects';
        return $dataTable->render('clients.show', $this->data);

    }
    public function deals()
    {
        $dataTable = new ClientDealDataTable();
        $viewPermission = user()->permission('view_projects');

        abort_403 (!($viewPermission == 'all' || $viewPermission == 'added'));
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'clients.ajax.deals';
        return $dataTable->render('clients.show', $this->data);


    }

    public function invoices()
    {
        $dataTable = new InvoicesDataTable();
        $viewPermission = user()->permission('view_invoices');

        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'clients.ajax.invoices';
        return $dataTable->render('clients.show', $this->data);
    }

    public function payments()
    {
        $dataTable = new PaymentsDataTable();
        $viewPermission = user()->permission('view_payments');

        abort_403 (!($viewPermission == 'all' || $viewPermission == 'added'));
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'clients.ajax.payments';
        return $dataTable->render('clients.show', $this->data);

    }

    public function estimates()
    {
        $dataTable = new EstimatesDataTable();
        $viewPermission = user()->permission('view_estimates');

        abort_403 (!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'clients.ajax.estimates';
        return $dataTable->render('clients.show', $this->data);
    }

    public function creditnotes()
    {
        $dataTable = new CreditNotesDataTable();
        $viewPermission = user()->permission('view_invoices');

        abort_403 ($viewPermission == 'none');
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'clients.ajax.credit_notes';
        return $dataTable->render('clients.show', $this->data);
    }

    public function contacts()
    {
        $dataTable = new ClientContactsDataTable();
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'clients.ajax.contacts';
        return $dataTable->render('clients.show', $this->data);
    }

    public function notes()
    {
        $dataTable = new ClientNotesDataTable();
        $viewPermission = user()->permission('view_clients');

        abort_403 (!($viewPermission == 'all' || $viewPermission == 'added' || $viewPermission == 'both'));
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'clients.ajax.notes';
        return $dataTable->render('clients.show', $this->data);
    }

    public function tickets()
    {
        $dataTable = new TicketDataTable();
        $viewPermission = user()->permission('view_clients');

        abort_403 (!($viewPermission == 'all' || $viewPermission == 'added' || $viewPermission == 'both'));
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'clients.ajax.tickets';
        return $dataTable->render('clients.show', $this->data);
    }

    public function gdpr()
    {
        $dataTable = new ClientGDPRDataTable();
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'gdpr' : $this->activeTab = $tab;
        $this->view = 'clients.ajax.gdpr';
        return $dataTable->render('clients.show', $this->data);
    }

    public function consent(Request $request)
    {
        $clientId = $request->clientId;
        $this->consentId = $request->consentId;
        $this->clientId = $clientId;

        $this->consent = PurposeConsent::with(['user' => function ($query) use ($request) {
            $query->where('client_id', $request->clientId)
                ->orderBy('created_at', 'desc');
        }])
            ->where('id', $request->consentId)
            ->first();

        return view('clients.gdpr.consent-form', $this->data);
    }

    public function saveClientConsent(SaveConsentUserDataRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $consent = PurposeConsent::findOrFail($request->consent_id);

        if ($request->consent_description && $request->consent_description != '') {
            $consent->description = str_replace('<p><br></p>', '', trim($request->consent_description));
            $consent->save();
        }

        // Saving Consent Data
        $newConsentLead = new PurposeConsentUser();
        $newConsentLead->client_id = $user->id;
        $newConsentLead->purpose_consent_id = $consent->id;
        $newConsentLead->status = trim($request->status);
        $newConsentLead->ip = $request->ip();
        $newConsentLead->updated_by_id = $this->user->id;
        $newConsentLead->additional_description = $request->additional_description;
        $newConsentLead->save();

        return $request->status == 'agree' ? Reply::success(__('messages.consentOptIn')) : Reply::success(__('messages.consentOptOut'));
    }

    public function approve($id)
    {
        abort_403(!in_array('admin', user_roles()));

        User::where('id', $id)->update(
            ['admin_approval' => 1]
        );

        $userSession = new AppSettingController();
        $userSession->deleteSessions([$id]);

        return Reply::success(__('messages.updateSuccess'));
    }

    public function importClient()
    {
        $this->pageTitle = __('app.importExcel') . ' ' . __('app.client');

        $addPermission = user()->permission('add_clients');
        abort_403(!in_array($addPermission, ['all', 'added', 'both']));


        if (request()->ajax()) {
            $html = view('clients.ajax.import', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'clients.ajax.import';

        return view('clients.create', $this->data);
    }

    public function importStore(ImportRequest $request)
    {
        $this->file = Files::upload($request->import_file, 'import-files', false, false, false);
        $excelData = Excel::toArray(new ClientImport, public_path(Files::UPLOAD_FOLDER. '/import-files/' . $this->file))[0];
        $this->hasHeading = $request->has('heading');
        $this->heading = array();
        $this->fileHeading = array();

        $this->columns = ClientImport::fields();
        $this->importMatchedColumns = array();
        $this->matchedColumns = array();

        if ($this->hasHeading) {
            $this->heading = (new HeadingRowImport)->toArray(public_path(Files::UPLOAD_FOLDER.'/import-files/' . $this->file))[0][0];

            // Excel Format None for get Heading Row Without Format and after change back to config
            HeadingRowFormatter::default('none');
            $this->fileHeading = (new HeadingRowImport)->toArray(public_path(Files::UPLOAD_FOLDER.'/import-files/' . $this->file))[0][0];
            HeadingRowFormatter::default(config('excel.imports.heading_row.formatter'));

            array_shift($excelData);
            $this->matchedColumns = collect($this->columns)->whereIn('id', $this->heading)->pluck('id');
            $importMatchedColumns = array();

            foreach ($this->matchedColumns as $matchedColumn) {
                $importMatchedColumns[$matchedColumn] = 1;
            }

            $this->importMatchedColumns = $importMatchedColumns;
        }

        $this->importSample = array_slice($excelData, 0, 5);

        $view = view('clients.ajax.import_progress', $this->data)->render();

        return Reply::successWithData(__('messages.importUploadSuccess'), ['view' => $view]);
    }

    public function importProcess(ImportProcessRequest $request)
    {
        // clear previous import
        Artisan::call('queue:clear database --queue=import_client');
        Artisan::call('queue:flush');
        // Get index of an array not null value with key
        $columns = array_filter($request->columns, function ($value) {
            return $value !== null;
        });

        $excelData = Excel::toArray(new ClientImport, public_path(Files::UPLOAD_FOLDER.'/import-files/' . $request->file))[0];

        if ($request->has_heading) {
            array_shift($excelData);
        }

        $jobs = [];

        foreach ($excelData as $row) {

            $jobs[] = (new ImportClientJob($row, $columns));
        }

        $batch = Bus::batch($jobs)->onConnection('database')->onQueue('import_client')->name('import_client')->dispatch();

        Files::deleteFile($request->file, 'import-files');

        return Reply::successWithData(__('messages.importProcessStart'), ['batch' => $batch]);
    }

}
