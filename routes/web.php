<?php

use Route as GlobalRoute;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GdprController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SubTaskController;
use App\Http\Controllers\TimelogController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EstimateController;
use App\Http\Controllers\LeadFileController;
use App\Http\Controllers\LeadNoteController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TaskFileController;
use App\Http\Controllers\TaskNoteController;
use App\Http\Controllers\ClientDocController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventFileController;
use App\Http\Controllers\LeadBoardController;
use App\Http\Controllers\LeaveTypeController;
use App\Http\Controllers\PaypalIPNController;
use App\Http\Controllers\PublicUrlController;
use App\Http\Controllers\TaskBoardController;
use App\Http\Controllers\TaskLabelController;
use App\Http\Controllers\UpdateAppController;
use App\Http\Controllers\AppSettingController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ClientNoteController;
use App\Http\Controllers\CreditNoteController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DiscussionController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\StickyNoteController;
use App\Http\Controllers\TaskReportController;
use App\Http\Controllers\TaxSettingController;
use App\Http\Controllers\TicketFileController;
use App\Http\Controllers\TicketTypeController;
use App\Http\Controllers\CustomFieldController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\EmployeeDocController;
use App\Http\Controllers\KnowledgeBaseCategoryController;
use App\Http\Controllers\LeadCategoyController;
use App\Http\Controllers\LeadSettingController;
use App\Http\Controllers\LeaveReportController;
use App\Http\Controllers\LeavesQuotaController;
use App\Http\Controllers\MessageFileController;
use App\Http\Controllers\ProductFileController;
use App\Http\Controllers\ProjectFileController;
use App\Http\Controllers\ProjectNoteController;
use App\Http\Controllers\SmtpSettingController;
use App\Http\Controllers\SubTaskFileController;
use App\Http\Controllers\TaskCommentController;
use App\Http\Controllers\TaskSettingController;
use App\Http\Controllers\TicketAgentController;
use App\Http\Controllers\TicketGroupController;
use App\Http\Controllers\TicketReplyController;
use App\Http\Controllers\ContractFileController;
use App\Http\Controllers\ContractTypeController;
use App\Http\Controllers\CustomModuleController;
use App\Http\Controllers\GdprSettingsController;
use App\Http\Controllers\LeaveSettingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SlackSettingController;
use App\Http\Controllers\TaskCalendarController;
use App\Http\Controllers\TaskCategoryController;
use App\Http\Controllers\ThemeSettingController;
use App\Http\Controllers\TwoFASettingController;
use App\Http\Controllers\ClientContactController;
use App\Http\Controllers\ContractRenewController;
use App\Http\Controllers\EmployeeShiftController;
use App\Http\Controllers\EventCalendarController;
use App\Http\Controllers\FinanceReportController;
use App\Http\Controllers\KnowledgeBaseController;
use App\Http\Controllers\ModuleSettingController;
use App\Http\Controllers\ProjectMemberController;
use App\Http\Controllers\ProjectRatingController;
use App\Http\Controllers\TicketChannelController;
use App\Http\Controllers\TicketSettingController;
use App\Http\Controllers\TimelogReportController;
use App\Http\Controllers\ClientCategoryController;
use App\Http\Controllers\InvoiceSettingController;
use App\Http\Controllers\LeadCustomFormController;
use App\Http\Controllers\MessageSettingController;
use App\Http\Controllers\Payment\MollieController;
use App\Http\Controllers\Payment\PaypalController;
use App\Http\Controllers\Payment\SquareController;
use App\Http\Controllers\Payment\StripeController;
use App\Http\Controllers\ProfileSettingController;
use App\Http\Controllers\ProjectSettingController;
use App\Http\Controllers\PublicLeadGdprController;
use App\Http\Controllers\PusherSettingsController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\StorageSettingController;
use App\Http\Controllers\TimeLogSettingController;
use App\Http\Controllers\UserPermissionController;
use App\Http\Controllers\BusinessAddressController;
use App\Http\Controllers\CurrencySettingController;
use App\Http\Controllers\DiscussionFilesController;
use App\Http\Controllers\DiscussionReplyController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\LanguageSettingController;
use App\Http\Controllers\Payment\PayfastController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProjectCategoryController;
use App\Http\Controllers\ProjectTemplateController;
use App\Http\Controllers\SecuritySettingController;
use App\Http\Controllers\TimelogCalendarController;
use App\Http\Controllers\AttendanceReportController;
use App\Http\Controllers\EmergencyContactController;
use App\Http\Controllers\LeadAgentSettingController;
use App\Http\Controllers\Payment\PaystackController;
use App\Http\Controllers\Payment\RazorPayController;
use App\Http\Controllers\ProjectMilestoneController;
use App\Http\Controllers\PushNotificationController;
use App\Http\Controllers\RecurringExpenseController;
use App\Http\Controllers\RecurringInvoiceController;
use App\Http\Controllers\TicketCustomFormController;
use App\Http\Controllers\AttendanceSettingController;
use App\Http\Controllers\ClientSubCategoryController;
use App\Http\Controllers\KnowledgeBaseFileController;
use App\Http\Controllers\LeadSourceSettingController;
use App\Http\Controllers\LeadStatusSettingController;
use App\Http\Controllers\Payment\AuthorizeController;
use App\Http\Controllers\SocialAuthSettingController;
use App\Http\Controllers\ContractDiscussionController;
use App\Http\Controllers\ContractTemplateController;
use App\Http\Controllers\DiscussionCategoryController;
use App\Http\Controllers\ProductSubCategoryController;
use App\Http\Controllers\TicketEmailSettingController;
use App\Http\Controllers\NotificationSettingController;
use App\Http\Controllers\Payment\FlutterwaveController;
use App\Http\Controllers\ProjectTemplateTaskController;
use App\Http\Controllers\ProjectTimelogBreakController;
use App\Http\Controllers\TicketReplyTemplatesController;
use App\Http\Controllers\DatabaseBackupSettingController;
use App\Http\Controllers\EmployeeShiftScheduleController;
use App\Http\Controllers\ExpenseReportController;
use App\Http\Controllers\GoogleCalendarSettingController;
use App\Http\Controllers\IncomeVsExpenseReportController;
use App\Http\Controllers\OfflinePaymentSettingController;
use App\Http\Controllers\Payment\StripeWebhookController;
use App\Http\Controllers\ProjectTemplateMemberController;
use App\Http\Controllers\ProjectTemplateSubTaskController;
use App\Http\Controllers\PaymentGatewayCredentialController;
use App\Http\Controllers\ProposalTemplateController;
use App\Http\Controllers\EmployeeShiftChangeRequestController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\DealBoardController;
use App\Http\Controllers\ProjectBoardController;
use App\Http\Controllers\ReportIssueController;
use App\Http\Controllers\SuggestionController;
use App\Http\Controllers\SoftwareProjectController;
use App\Http\Controllers\InsightsController;
use App\Http\Controllers\Seopage1TeamController;
use App\Http\Controllers\KpiSettingController;
use App\Http\Controllers\IncentiveSettingController;
use App\Http\Controllers\PointsController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectCredential;
use App\Http\Controllers\IncentiveController;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\ReportCentralController;
use App\Http\Controllers\MonthlyIncentiveController;
use App\Http\Controllers\QualifiedSalesController;
use App\Http\Controllers\PendingActionController;
use App\Http\Controllers\NonCashPointSettingsController;
use App\Http\Controllers\ClientReviewController;
use App\Http\Controllers\CrossDeptWork;
use App\Http\Controllers\DisputeController;
use App\Http\Controllers\FilterController;
use App\Http\Controllers\DMContractController;
use App\Http\Controllers\DMDealController;
use App\Http\Controllers\DMLeadController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\IndependentTaskController;

use App\Http\Controllers\RevisionCalculatorController;
use App\Http\Controllers\PmPaymentReleaseHistory;
use App\Http\Controllers\RevisionController;
use App\Http\Controllers\IssuedTaskReportController;
use App\Http\Controllers\PmGoalSetingController;
use App\Http\Controllers\ProjectStatusController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect(route('login'));
});

Route::get('/invitation/{code}', [RegisterController::class, 'invitation'])->name('invitation');
Route::post('/invitation/accept-invite', [RegisterController::class, 'acceptInvite'])->name('accept_invite');

Route::get('/invoice/{hash}', [HomeController::class, 'invoice'])->name('front.invoice');
Route::get('invoices/show-image', [HomeController::class, 'showImage'])->name('invoices.public.show_image');

Route::get('/invoice-stripe/stripe-modal/', [HomeController::class, 'stripeModal'])->name('front.stripe_modal');
Route::get('/invoice-paystack/paystack-modal/', [HomeController::class, 'paystackModal'])->name('front.paystack_modal');
Route::get('/invoice-flutterwave/flutterwave-modal/', [HomeController::class, 'flutterwaveModal'])->name('front.flutterwave_modal');
Route::get('/invoice-mollie/mollie-modal/', [HomeController::class, 'mollieModal'])->name('front.mollie_modal');
Route::get('/invoice-authorize/authorize-modal/', [HomeController::class, 'authorizeModal'])->name('front.authorize_modal');
Route::post('invoice-stripe/save-stripe-detail/', [HomeController::class, 'saveStripeDetail'])->name('front.save_stripe_detail');
Route::get('/invoice/download/{id}', [HomeController::class, 'downloadInvoice'])->name('front.invoice_download');
Route::post('/invoice-payment-failed/{invoiceId}', [HomeController::class, 'invoicePaymentfailed'])->name('front.invoice_payment_failed');

Route::get('/lead-form', [HomeController::class, 'leadForm'])->name('front.lead_form');
Route::post('/lead-form/leadStore', [HomeController::class, 'leadStore'])->name('front.lead_store');
Route::get('/ticket-form', [HomeController::class, 'ticketForm'])->name('front.ticket_form');
Route::post('/lead-form/ticket-store', [HomeController::class, 'ticketStore'])->name('front.ticket_store');
Route::get('/contract/{hash}', [PublicUrlController::class, 'contractView'])->name('front.contract.show');
Route::post('/contract/sign/{id}', [PublicUrlController::class, 'contractSign'])->name('front.contract.sign');
Route::get('/contract/download/{id}', [PublicUrlController::class, 'contractDownload'])->name('front.contract.download');

// Estimate Public url
Route::get('/estimate/{hash}', [PublicUrlController::class, 'estimateView'])->name('front.estimate.show');
Route::post('/estimate/decline/{id}', [PublicUrlController::class, 'estimateDecline'])->name('front.estimate.decline');
Route::post('/estimate/accept/{id}', [PublicUrlController::class, 'estimateAccept'])->name('front.estimate.accept');
Route::get('/estimate/download/{id}', [PublicUrlController::class, 'estimateDownload'])->name('front.estimate.download');


Route::get('/task/{id}', [HomeController::class, 'taskDetail'])->name('front.task_detail');
Route::post('/gantt-chart-data/{id}', [HomeController::class, 'ganttData'])->name('front.gantt_data');
Route::get('/gantt-chart/{hash}', [HomeController::class, 'gantt'])->name('front.gantt');

Route::get('/task-board/{hash}', [HomeController::class, 'taskboard'])->name('front.taskboard');
Route::get('/task-board/load-more/{hash}', [HomeController::class, 'taskboardLoadMore'])->name('front.taskboard.load_more');


Route::get('/proposal/{hash}', [HomeController::class, 'proposal'])->name('front.proposal');
Route::post('/proposal-action/{id}', [HomeController::class, 'proposalActionStore'])->name('front.proposal_action');
Route::get('/proposal/download/{id}', [HomeController::class, 'downloadProposal'])->name('front.download_proposal');



Route::get('/consent/l/{hash}', [PublicLeadGdprController::class, 'consent'])->name('front.gdpr.consent');
Route::post('/consent/remove-lead-request', [PublicLeadGdprController::class, 'learemoveLeadRequestd'])->name('front.gdpr.remove_lead_request');
Route::post('/consent/l/update/{lead}', [PublicLeadGdprController::class, 'updateConsent'])->name('front.gdpr.consent.update');

// Socialite routes
Route::get('/redirect/{provider}', [LoginController::class, 'redirect'])->name('social_login');
Route::get('/callback/{provider}', [LoginController::class, 'callback'])->name('social_login_callback');
Route::post('check-email', [LoginController::class, 'checkEmail'])->name('check_email');
Route::post('check-code', [LoginController::class, 'checkCode'])->name('check_code');
Route::get('resend-code', [LoginController::class, 'resendCode'])->name('resend_code');

// Payment routes
Route::post('stripe/{invoiceId}', [StripeController::class, 'paymentWithStripe'])->name('stripe');
Route::post('stripe-public/{hash}', [StripeController::class, 'paymentWithStripePublic'])->name('stripe_public');

Route::post('paystack-public/{id}', [PaystackController::class, 'paymentWithPaystackPublic'])->name('paystack_public');
Route::get('paystack/callback/{id}/{type}', [PaystackController::class, 'handleGatewayCallback'])->name('paystack.callback');
Route::post('paystack_webhook', [PaystackController::class, 'handleGatewayWebhook'])->name('paystack.webhook');

Route::post('flutterwave-public/{id}', [FlutterwaveController::class, 'paymentWithFlutterwavePublic'])->name('flutterwave_public');
Route::get('flutterwave/callback/{id}/{type}', [FlutterwaveController::class, 'handleGatewayCallback'])->name('flutterwave.callback');
Route::post('flutterwave_webhook', [FlutterwaveController::class, 'handleGatewayWebhook'])->name('flutterwave.webhook');

Route::post('mollie-public/{id}', [MollieController::class, 'paymentWithMolliePublic'])->name('mollie_public');
Route::get('mollie/callback/{id}/{type}', [MollieController::class, 'handleGatewayCallback'])->name('mollie.callback');
Route::post('mollie_webhook', [MollieController::class, 'handleGatewayWebhook'])->name('mollie.webhook');

Route::post('payfast-public', [PayfastController::class, 'paymentWithPayfastPublic'])->name('payfast_public');
Route::get('payfast/callback/{id}/{type}/{status}', [PayfastController::class, 'handleGatewayCallback'])->name('payfast.callback');
Route::post('payfast_webhook', [PayfastController::class, 'handleGatewayWebhook'])->name('payfast.webhook');

Route::post('authorize-public/{id}', [AuthorizeController::class, 'paymentWithAuthorizePublic'])->name('authorize_public');

Route::post('square-public', [SquareController::class, 'paymentWithSquarePublic'])->name('square_public');
Route::get('square/callback/{id}/{type}', [SquareController::class, 'handleGatewayCallback'])->name('square.callback');
Route::post('square_webhook', [SquareController::class, 'handleGatewayWebhook'])->name('square.webhook');

Route::post('pay-with-razorpay', [RazorPayController::class, 'payWithRazorPay'])->name('pay_with_razorpay');
Route::post('razorpay_webhook', [RazorPayController::class, 'handleGatewayWebhook'])->name('razorpay.webhook');
Route::get('paypal-public/{invoiceId}', [PaypalController::class, 'paymentWithpaypalPublic'])->name('paypal_public');
Route::get('paypal/{invoiceId}', [PaypalController::class, 'paymentWithpaypal'])->name('paypal');
Route::get('paypal', [PaypalController::class, 'getPaymentStatus'])->name('get_paypal_status');
Route::get('paypal-recurring', [PaypalController::class, 'payWithPaypalRecurring'])->name('paypal_recurring');

// Paypal IPN
Route::post('paypal_webhook', [PaypalController::class, 'webhook'])->name('paypal.webhook');

// Stripe webhook
Route::post('/verify_webhook', [StripeWebhookController::class, 'verifyStripeWebhook'])->name('verify_webhook');

Route::post('setup-account', [RegisterController::class, 'setupAccount'])->name('setup_account');

// Get quill image uploaded
Route::get('quill-image/{image}', [\App\Http\Controllers\ImageController::class, 'getImage'])->name('image.getImage');

// Cropper Model
Route::get('cropper/{element}', [\App\Http\Controllers\ImageController::class, 'cropper'])->name('cropper');

// Sync user permissions
Route::get('sync-user-permissions', [HomeController::class, 'syncPermissions'])->name('sync_user_permissions');
Route::post('/tasks/task-stage/store', [TaskController::class, 'TaskReview'])->name('task-status-change');
Route::post('/tasks/task-stage/approve', [TaskController::class, 'TaskApprove'])->name('task-status-approve');
Route::post('/tasks/task-stage/revision', [TaskController::class, 'TaskRevision'])->name('task-status-revision');
Route::post('/tasks/task-time/extension', [TaskController::class, 'TaskExtension'])->name('user-time-extension');
Route::post('/tasks/task-time/extension/approve', [TaskController::class, 'TaskExtensionApprove'])->name('accept-task-extension');

/* Account routes starts from here */
Route::group(['middleware' => 'auth', 'prefix' => 'account'], function () {
    Route::post('image/upload', [\App\Http\Controllers\ImageController::class, 'store'])->name('image.store');

    Route::get('account-unverified', [DashboardController::class, 'accountUnverified'])->name('account_unverified');
    Route::get('checklist', [DashboardController::class, 'checklist'])->name('checklist');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // admin advance dashboard
    Route::get('dashboard-advanced', [DashboardController::class, 'advancedDashboard'])->name('dashboard.advanced');

    //dashboard pm performance
    Route::get('dashboard-pm-performance/{id}', [DashboardController::class, 'pmPerformance'])->name('pm-performance');
    Route::get('dashboard-core-metric', [DashboardController::class, 'coreMetric'])->name('dashboard.core.metric');
    Route::put('update-core-metric/{id}', [DashboardController::class, 'updateCoreMetric'])->name('update-core-metrics');

    Route::post('dashboard-advanced/show-project-manager-details', [DashboardController::class, 'projectManageDetalsOnAdvanceDashboard'])->name('dashboard.projectManageDetalsOnAdvanceDashboard');
    Route::post('dashboard/widget/{dashboardType}', [DashboardController::class, 'widget'])->name('dashboard.widget');
    Route::post('dashboard/week-timelog', [DashboardController::class, 'weekTimelog'])->name('dashboard.week_timelog');
    //lead developer dashboard
    Route::get('dashboard-lead-dev-performance/{id}', [DashboardController::class, 'leadDevPerformance'])->name('lead-dev-performance');
    //developer dashboard
    Route::get('dashboard-developer-performance/{id}', [DashboardController::class, 'devPerformance'])->name('dev-performance');
    //sales dashboard
    Route::get('dashboard-sales-performance/{id}', [DashboardController::class, 'salesPerformance'])->name('sales-performance');

    //clockin clock out routes
    Route::get('attendances/clock-in-modal', [DashboardController::class, 'clockInModal'])->name('attendances.clock_in_modal');
    Route::post('attendances/store-clock-in', [DashboardController::class, 'storeClockIn'])->name('attendances.store_clock_in');
    Route::get('attendances/update-clock-in', [DashboardController::class, 'updateClockIn'])->name('attendances.update_clock_in');
    Route::get('dashboard/private_calendar', [DashboardController::class, 'privateCalendar'])->name('dashboard.private_calendar');

    //pm core metrics cycle explanation route
    Route::get('dashboard/pm-cycle-explanation', [DashboardController::class, 'pmDashboardExplanation'])->name('pm-dashboard-explanation');
    //task history route
    Route::get('task_history_dashboard/{id}', [DashboardController::class, 'task_history'])->name('task_history_dashboard');

    //task revision route
    Route::get('task_revision_dashboard/{id}', [DashboardController::class, 'task_revision'])->name('revision-count-dashboard');
    // Route::resource('points/', PointsController::class)->only
    // filters route
    Route::get('/menu/filter-options/{mode}/{value?}', [PointsController::class, 'get_filter_options']);
    //employee filter
    Route::get('/menu/filter/get-employee', [PointsController::class, 'get_employe_by_filter_options']);
    //sales point routes
    Route::post('/point-table-data', [PointsController::class, 'get_point_table_data']);
    //search bar routes
    Route::get('search-bar-filter', [PointsController::class, 'get_all_search_bar_data']);
    //sales points all routes
    Route::get('/points/{any?}', [PointsController::class, 'index'])->where('any', '.*')->name('points.index');

    //sales incentive points
    Route::post('/incentives-json/get', [IncentiveController::class, 'index_json'])->name('incentives.json');
    //sales incentive points disbursed amount
    Route::get('/incentives/disbursed-amounts/disbursed-get', [IncentiveController::class, 'DisbursedAmount'])->name('disbursed-amount');
    //sales incentives help amount
    Route::get('/incentives/held-amounts/held-get', [IncentiveController::class, 'HeldAmount'])->name('held-amount');
    Route::get('/incentives/{any?}/', [IncentiveController::class, 'index'])->where('any', '.*')->name('incentives.index');

    Route::get('settings/change-language', [SettingsController::class, 'changeLanguage'])->name('settings.change_language');
    Route::resource('settings', SettingsController::class)->only(['edit', 'update', 'index', 'change_language']);
    //pending action live
    Route::get('get-pending-active-live-action', [PendingActionController::class, 'get_pending_active_live_action']);
    //pending action expired
    Route::get('get-pending-expired-live-action', [PendingActionController::class, 'get_pending_expired_live_action']);

    //pending action past
    Route::get('get-pending-past-action', [PendingActionController::class, 'get_pending_past_action']);
    //delete staging sites route
    Route::post('delete-staging-site', [PendingActionController::class, 'DeleteStagingSite'])->name('delete-staging');
    //lead developer assign task ignore
    Route::get('assign-task-ignore/{id}', [PendingActionController::class, 'AssignTaskIgnore'])->name('ignore-assign-task');

    /** DEVELOPER CHECK IN CHECK OUT START*/
    Route::get('check-in-status', [DashboardController::class, 'clockInStatus']);
    Route::post('/developer/daily-minimum-track-hours-log/acknowledgement',[DashboardController::class,'developerDailytrackHoursLog']);
    Route::put('check-out-status', [DashboardController::class, 'clockOutStatus']);
    /** DEVELOPER CHECK IN CHECK OUT START*/

    /* Setting menu routes starts from here */
    Route::group(['prefix' => 'settings'], function () {
        Route::post('app-settings/deleteSessions', [AppSettingController::class, 'deleteSessions'])->name('app-settings.delete_sessions');
        Route::resource('app-settings', AppSettingController::class);
        Route::resource('profile-settings', ProfileSettingController::class);

        /* 2FA */
        Route::get('2fa-codes-download', [TwoFASettingController::class, 'download'])->name('2fa_codes_download');
        Route::get('verify-2fa-password', [TwoFASettingController::class, 'verify'])->name('verify_2fa_password');
        Route::get('2fa-confirm', [TwoFASettingController::class, 'showConfirm'])->name('two-fa-settings.validate_confirm');
        Route::post('2fa-confirm', [TwoFASettingController::class, 'confirm'])->name('two-fa-settings.confirm');
        Route::get('2fa-email-confirm', [TwoFASettingController::class, 'showEmailConfirm'])->name('two-fa-settings.validate_email_confirm');
        Route::post('2fa-email-confirm', [TwoFASettingController::class, 'emailConfirm'])->name('two-fa-settings.email_confirm');
        Route::resource('two-fa-settings', TwoFASettingController::class);

        Route::post('profile/dark-theme', [ProfileController::class, 'darkTheme'])->name('profile.dark_theme');
        Route::post('profile/updateOneSignalId', [ProfileController::class, 'updateOneSignalId'])->name('profile.update_onesignal_id');
        Route::resource('profile', ProfileController::class);

        Route::get('smtp-settings/show-send-test-mail-modal', [SmtpSettingController::class, 'showTestEmailModal'])->name('smtp_settings.show_send_test_mail_modal');
        Route::get('smtp-settings/send-test-mail', [SmtpSettingController::class, 'sendTestEmail'])->name('smtp_settings.send_test_mail');

        Route::get('slack-settings/send-test-notification', [SlackSettingController::class, 'sendTestNotification'])->name('slack_settings.send_test_notification');

        Route::get('push-notification-settings/send-test-notification', [PushNotificationController::class, 'sendTestNotification'])->name('push_notification_settings.send_test_notification');

        Route::resource('smtp-settings', SmtpSettingController::class);
        Route::resource('notifications', NotificationSettingController::class);
        Route::resource('slack-settings', SlackSettingController::class);
        Route::resource('push-notification-settings', PushNotificationController::class);
        Route::resource('pusher-settings', PusherSettingsController::class);

        // Currency Settings routes
        Route::get('currency-settings/update/exchange-rates', [CurrencySettingController::class, 'updateExchangeRate'])->name('currency_settings.update_exchange_rates');

        /* Start Currency Settings routes */
        Route::get('currency-settings/exchange-key', [CurrencySettingController::class, 'currencyExchangeKey'])->name('currency_settings.exchange_key');
        Route::post('currency-settings/exchange-key-store', [CurrencySettingController::class, 'currencyExchangeKeyStore'])->name('currency_settings.exchange_key_store');
        Route::get('currency-settings/exchange-rate/{currency}', [CurrencySettingController::class, 'exchangeRate'])->name('currency_settings.exchange_rate');

        Route::get('currency-settings/update-currency-format', [CurrencySettingController::class, 'updateCurrencyFormat'])->name('currency_settings.update_currency_format');
        Route::resource('currency-settings', CurrencySettingController::class);
        Route::resource('payment-gateway-settings', PaymentGatewayCredentialController::class);
        /* End Currency Settings routes */

        Route::resource('offline-payment-setting', OfflinePaymentSettingController::class);
        Route::resource('invoice-settings', InvoiceSettingController::class);

        /* Start Ticket settings routes */
        Route::post('ticket-agents/update-group/{id}', [TicketAgentController::class, 'updateGroup'])->name('ticket_agents.update_group');
        Route::resource('ticket-agents', TicketAgentController::class);

        Route::resource('ticket-settings', TicketSettingController::class);
        Route::resource('ticket-groups', TicketGroupController::class);
        Route::resource('ticketTypes', TicketTypeController::class);
        Route::resource('ticketChannels', TicketChannelController::class);
        Route::resource('ticket-email-settings', TicketEmailSettingController::class);

        Route::get('replyTemplates/fetch-template', [TicketReplyTemplatesController::class, 'fetchTemplate'])->name('replyTemplates.fetchTemplate');
        Route::resource('replyTemplates', TicketReplyTemplatesController::class);
        /* End Ticket settings routes */
        Route::resource('project-settings', ProjectSettingController::class);
        Route::post('project-settings/{id?}', [ProjectSettingController::class, 'statusUpdate'])->name('project-settings.statusUpdate');
        Route::put('project-settings/change-status/{id?}', [ProjectSettingController::class, 'changeStatus'])->name('project-settings.changeStatus');
        Route::post('project-settings/set-default/{id?}', [ProjectSettingController::class, 'setDefault'])->name('project-settings.setDefault');

        Route::resource('attendance-settings', AttendanceSettingController::class);
        Route::resource('leaves-settings', LeaveSettingController::class);

        // LeaveType Resource
        Route::resource('leaveType', LeaveTypeController::class);

        // Custom Fields Settings
        Route::resource('custom-fields', CustomFieldController::class);

        // Message settings
        Route::resource('message-settings', MessageSettingController::class);

        // Storage settings
        Route::get('storage-settings/aws-local-to-aws-modal', [StorageSettingController::class, 'awsLocalToAwsModal'])->name('storage-settings.aws_local_to_aws_modal');
        Route::post('storage-settings/aws-local-to-aws', [StorageSettingController::class, 'moveFilesLocalToAwsS3'])->name('storage-settings.aws_local_to_aws');
        Route::get('storage-settings/aws-test-modal', [StorageSettingController::class, 'awsTestModal'])->name('storage-settings.aws_test_modal');
        Route::post('storage-settings/aws-test', [StorageSettingController::class, 'awsTest'])->name('storage-settings.aws_test');
        Route::resource('storage-settings', StorageSettingController::class);

        // Language settings
        Route::get('language-settings/auto-translate', [LanguageSettingController::class, 'autoTranslate'])->name('language_settings.auto_translate');
        Route::post('language-settings/auto-translate', [LanguageSettingController::class, 'autoTranslateUpdate'])->name('language_settings.auto_translate_update');
        Route::post('language-settings/update-data/{id?}', [LanguageSettingController::class, 'updateData'])->name('language_settings.update_data');
        Route::resource('language-settings', LanguageSettingController::class);

        // Task Settings
        Route::resource('task-settings', TaskSettingController::class, ['only' => ['index', 'store']]);

        // Time Log Settings
        Route::resource('timelog-settings', TimeLogSettingController::class);

        // Social Auth Settings
        Route::resource('social-auth-settings', SocialAuthSettingController::class, ['only' => ['index', 'update']]);

        /* Lead Settings */
        Route::resource('lead-settings', LeadSettingController::class);
        Route::resource('lead-source-settings', LeadSourceSettingController::class);

        Route::get('lead-status-update/{statusId}', [LeadStatusSettingController::class, 'statusUpdate'])->name('leadSetting.statusUpdate');
        Route::resource('lead-status-settings', LeadStatusSettingController::class);

        Route::resource('lead-agent-settings', LeadAgentSettingController::class);

        /* Lead Settings */

        // Security Settings
        Route::get('verify-google-recaptcha-v3', [SecuritySettingController::class, 'verify'])->name('verify_google_recaptcha_v3');
        Route::resource('security-settings', SecuritySettingController::class);

        // Google Calendar Settings
        Route::resource('google-calendar-settings', GoogleCalendarSettingController::class);
        Route::get('google-auth', [GoogleAuthController::class, 'index'])->name('googleAuth');
        Route::delete('google-auth', [GoogleAuthController::class, 'destroy'])->name('googleAuth.destroy');


        // Database Backup Settings
        Route::get('database-backup-settings/create-backup', [DatabaseBackupSettingController::class, 'createBackup'])->name('database-backup-settings.create_backup');
        Route::get('database-backup-settings/download/{file_name}', [DatabaseBackupSettingController::class, 'download'])->name('database-backup-settings.download');
        Route::get('database-backup-settings/delete/{file_name}', [DatabaseBackupSettingController::class, 'delete'])->name('database-backup-settings.delete');
        Route::resource('database-backup-settings', DatabaseBackupSettingController::class);

        // Role Permissions
        Route::post('role-permission/storeRole', [RolePermissionController::class, 'storeRole'])->name('role-permissions.store_role');
        Route::post('role-permission/deleteRole', [RolePermissionController::class, 'deleteRole'])->name('role-permissions.delete_role');
        Route::post('role-permissions/permissions', [RolePermissionController::class, 'permissions'])->name('role-permissions.permissions');
        Route::post('role-permissions/customPermissions', [RolePermissionController::class, 'customPermissions'])->name('role-permissions.custom_permissions');
        Route::post('role-permissions/reset-permissions', [RolePermissionController::class, 'resetPermissions'])->name('role-permissions.reset_permissions');
        Route::resource('role-permissions', RolePermissionController::class);

        // Theme settings
        Route::resource('theme-settings', ThemeSettingController::class);

        // Module settings
        Route::resource('module-settings', ModuleSettingController::class);

        // Custom Modules
        Route::post('custom-modules/verify-purchase', [CustomModuleController::class, 'verifyingModulePurchase'])->name('custom-modules.verify_purchase');
        Route::resource('custom-modules', CustomModuleController::class);

        Route::post('business-address/set-default', [BusinessAddressController::class, 'setDefaultAddress'])->name('business-address.set_default');
        Route::resource('business-address', BusinessAddressController::class);

        Route::post('employee-shifts/set-default', [EmployeeShiftController::class, 'setDefaultShift'])->name('employee-shifts.set_default');
        Route::resource('employee-shifts', EmployeeShiftController::class);
        Route::get('pending-action/{any?}', [PendingActionController::class, 'index'])->where('any', '.*');
        Route::post('past-pending-action-comment', [PendingActionController::class, 'pastAction']);
        Route::resource('pending-action', PendingActionController::class);



    });



    /* Setting menu routes ends here */
    Route::resource('company-settings', SettingsController::class)->only(['edit', 'update', 'index', 'change_language']);

    Route::post('approve/{id}', [ClientController::class, 'approve'])->name('clients.approve');
    Route::post('save-consent-purpose-data/{client}', [ClientController::class, 'saveConsentLeadData'])->name('clients.save_consent_purpose_data');
    Route::get('clients/gdpr-consent', [ClientController::class, 'consent'])->name('clients.gdpr_consent');
    Route::post('clients/save-client-consent/{lead}', [ClientController::class, 'saveClientConsent'])->name('clients.save_client_consent');
    Route::post('clients/ajax-details/{id}', [ClientController::class, 'ajaxDetails'])->name('clients.ajax_details');
    Route::post('clients/project-list/{id}', [ClientController::class, 'projectList'])->name('clients.project_list');
    Route::post('clients/apply-quick-action', [ClientController::class, 'applyQuickAction'])->name('clients.apply_quick_action');
    Route::get('clients/import', [ClientController::class, 'importClient'])->name('clients.import');
    Route::post('clients/import', [ClientController::class, 'importStore'])->name('clients.import.store');
    Route::post('clients/import/process', [ClientController::class, 'importProcess'])->name('clients.import.process');
    Route::resource('clients', ClientController::class);

    Route::post('client-contacts/apply-quick-action', [ClientContactController::class, 'applyQuickAction'])->name('client-contacts.apply_quick_action');
    Route::resource('client-contacts', ClientContactController::class);

    Route::get('client-notes/ask-for-password/{id}', [ClientNoteController::class, 'askForPassword'])->name('client_notes.ask_for_password');
    Route::post('client-notes/check-password', [ClientNoteController::class, 'checkPassword'])->name('client_notes.check_password');
    Route::post('client-notes/apply-quick-action', [ClientNoteController::class, 'applyQuickAction'])->name('client-notes.apply_quick_action');
    Route::resource('client-notes', ClientNoteController::class);

    Route::get('client-docs/download/{id}', [ClientDocController::class, 'download'])->name('client-docs.download');
    Route::resource('client-docs', ClientDocController::class);

    // client category & subcategory
    Route::resource('clientCategory', ClientCategoryController::class);

    Route::get('getClientSubCategories/{id}', [ClientSubCategoryController::class, 'getSubCategories'])->name('get_client_sub_categories');
    Route::resource('clientSubCategory', ClientSubCategoryController::class);

    // employee routes
    Route::post('employees/apply-quick-action', [EmployeeController::class, 'applyQuickAction'])->name('employees.apply_quick_action');
    Route::post('employees/assignRole', [EmployeeController::class, 'assignRole'])->name('employees.assign_role');
    Route::get('employees/byDepartment/{id}', [EmployeeController::class, 'byDepartment'])->name('employees.by_department');
    Route::get('employees/invite-member', [EmployeeController::class, 'inviteMember'])->name('employees.invite_member');
    Route::get('employees/import', [EmployeeController::class, 'importMember'])->name('employees.import');
    Route::post('employees/import', [EmployeeController::class, 'importStore'])->name('employees.import.store');
    Route::post('employees/import/process', [EmployeeController::class, 'importProcess'])->name('employees.import.process');
    Route::get('import/process/{name}/{id}', [ImportController::class, 'getImportProgress'])->name('import.process.progress');

    Route::get('employees/import/exception/{name}', [ImportController::class, 'getQueueException'])->name('import.process.exception');
    Route::post('employees/send-invite', [EmployeeController::class, 'sendInvite'])->name('employees.send_invite');
    Route::post('employees/create-link', [EmployeeController::class, 'createLink'])->name('employees.create_link');
    Route::resource('employees', EmployeeController::class);

    Route::resource('emergency-contacts', EmergencyContactController::class);

    Route::get('employee-docs/download/{id}', [EmployeeDocController::class, 'download'])->name('employee-docs.download');
    Route::resource('employee-docs', EmployeeDocController::class);

    Route::get('employee-leaves/employeeLeaveTypes/{id}', [LeavesQuotaController::class, 'employeeLeaveTypes'])->name('employee-leaves.employee_leave_types');
    Route::resource('employee-leaves', LeavesQuotaController::class);

    Route::get('designations/designation-hierarchy', [DesignationController::class, 'hierarchyData'])->name('designation.hierarchy');
    Route::post('designations/changeParent', [DesignationController::class, 'changeParent'])->name('designation.changeParent');
    Route::post('designations/search-filter', [DesignationController::class, 'searchFilter'])->name('designation.srchFilter');
    Route::post('designations/apply-quick-action', [DesignationController::class, 'applyQuickAction'])->name('designations.apply_quick_action');
    Route::resource('designations', DesignationController::class);

    Route::post('departments/apply-quick-action', [DepartmentController::class, 'applyQuickAction'])->name('departments.apply_quick_action');
    Route::get('departments/department-hierarchy', [DepartmentController::class, 'hierarchyData'])->name('department.hierarchy');
    Route::post('department/changeParent', [DepartmentController::class, 'changeParent'])->name('department.changeParent');
    Route::get('department/search', [DepartmentController::class, 'searchDepartment'])->name('departments.search');
    Route::resource('departments', DepartmentController::class);

    Route::post('user-permissions/customPermissions/{id}', [UserPermissionController::class, 'customPermissions'])->name('user-permissions.custom_permissions');
    Route::resource('user-permissions', UserPermissionController::class);

    /* PROJECTS */
    Route::resource('projectCategory', ProjectCategoryController::class);

    Route::group(
        ['prefix' => 'projects'],
        function () {

            Route::get('import', [ProjectController::class, 'importProject'])->name('projects.import');
            Route::post('import', [ProjectController::class, 'importStore'])->name('projects.import.store');
            Route::post('import/process', [ProjectController::class, 'importProcess'])->name('projects.import.process');

            Route::post('assignProjectAdmin', [ProjectController::class, 'assignProjectAdmin'])->name('projects.assign_project_admin');
            Route::post('archive-restore/{id}', [ProjectController::class, 'archiveRestore'])->name('projects.archive_restore');
            Route::post('archive-delete/{id}', [ProjectController::class, 'archiveDestroy'])->name('projects.archive_delete');
            Route::get('archive', [ProjectController::class, 'archive'])->name('projects.archive');
            Route::post('apply-quick-action', [ProjectController::class, 'applyQuickAction'])->name('projects.apply_quick_action');
            Route::post('updateStatus/{id}', [ProjectController::class, 'updateStatus'])->name('projects.update_status');
            Route::post('store-pin', [ProjectController::class, 'storePin'])->name('projects.store_pin');
            Route::post('destroy-pin/{id}', [ProjectController::class, 'destroyPin'])->name('projects.destroy_pin');
            Route::post('gantt-data', [ProjectController::class, 'ganttData'])->name('projects.gantt_data');
            Route::post('invoiceList/{id}', [ProjectController::class, 'invoiceList'])->name('projects.invoice_list');
            Route::get('members/{id}', [ProjectController::class, 'members'])->name('projects.members');
            Route::post('project/activity-log/ajax', [ProjectController::class, 'project_activity_time_log_ajax'])->name('project_activity_time_log_ajax');
            Route::get('labels/{id}', [TaskLabelController::class, 'labels'])->name('projects.labels');

            Route::post('project-members/save-group', [ProjectMemberController::class, 'storeGroup'])->name('project-members.store_group');
            Route::resource('project-members', ProjectMemberController::class);

            Route::post('files/store-link', [ProjectFileController::class, 'storeLink'])->name('files.store_link');
            Route::get('files/download/{id}', [ProjectFileController::class, 'download'])->name('files.download');
            Route::get('files/thumbnail', [ProjectFileController::class, 'thumbnailShow'])->name('files.thumbnail');
            Route::post('files/multiple-upload', [ProjectFileController::class, 'storeMultiple'])->name('files.multiple_upload');
            Route::resource('files', ProjectFileController::class);

            Route::get('milestones/byProject/{id}', [ProjectMilestoneController::class, 'byProject'])->name('milestones.by_project');
            Route::resource('milestones', ProjectMilestoneController::class);

            // discussion category routes
            Route::resource('discussion-category', DiscussionCategoryController::class);
            // discussion category ends

            // discussion routes
            Route::post('discussion/setBestAnswer', [DiscussionController::class, 'setBestAnswer'])->name('discussion.set_best_answer');
            Route::resource('discussion', DiscussionController::class);
            // discussion ends

            // discussion reply routes
            Route::get('discussion-reply/get-replies/{id}', [DiscussionReplyController::class, 'getReplies'])->name('discussion-reply.get_replies');
            Route::resource('discussion-reply', DiscussionReplyController::class);
            // discussion reply end

            // Discussion Files
            Route::get('discussion-files/download/{id}', [DiscussionFilesController::class, 'download'])->name('discussion_file.download');

            Route::resource('discussion-files', DiscussionFilesController::class);

            // rating routes
            Route::resource('project-ratings', ProjectRatingController::class);
            // rating end

            Route::get('projects/burndown/{projectId?}', [ProjectController::class, 'burndown'])->name('projects.burndown');


            /* PROJECT TEMPLATE */
            Route::post('project-template/apply-quick-action', [ProjectTemplateController::class, 'applyQuickAction'])->name('project_template.apply_quick_action');
            Route::resource('project-template', ProjectTemplateController::class);

            Route::post('project-template-members/save-group', [ProjectTemplateMemberController::class, 'storeGroup'])->name('project_template_members.store_group');
            Route::resource('project-template-member', ProjectTemplateMemberController::class);

            Route::get('project-template-task/data/{templateId?}', [ProjectTemplateTaskController::class, 'data'])->name('project_template_task.data');
            Route::resource('project-template-task', ProjectTemplateTaskController::class);

            Route::resource('project-template-sub-task', ProjectTemplateSubTaskController::class);
        }
    );
    Route::get('get-project-information/tasks/{id}', [ProjectController::class, 'get_project_details']);
    Route::get('project-notes/ask-for-password/{id}', [ProjectNoteController::class, 'askForPassword'])->name('project_notes.ask_for_password');
    Route::post('project-notes/check-password', [ProjectNoteController::class, 'checkPassword'])->name('project_notes.check_password');
    Route::post('project-notes/apply-quick-action', [ProjectNoteController::class, 'applyQuickAction'])->name('project_notes.apply_quick_action');
    Route::resource('project-notes', ProjectNoteController::class);
    //project task routes
    Route::get('projects/{project_id}/tasks/{any}', [ProjectController::class, 'tasks'])
    ->where('any', '^(?!api\/)[\/\w\.-]*')
    ->where('any', '^(?:(?!\d+).)*');
    Route::resource('projects', ProjectController::class);
    //projects json route
    Route::get('get-projects/{type?}', [ProjectController::class, 'get_project_json']);
    Route::get('get-clients/{type?}', [ProjectController::class, 'get_client_json']);

    /* PRODUCTS */
    Route::post('products/apply-quick-action', [ProductController::class, 'applyQuickAction'])->name('products.apply_quick_action');
    Route::post('products/remove-cart-item/{id}', [ProductController::class, 'removeCartItem'])->name('products.remove_cart_item');

    Route::post('products/add-cart-item', [ProductController::class, 'addCartItem'])->name('products.add_cart_item');
    Route::get('products/cart', [ProductController::class, 'cart'])->name('products.cart');
    Route::resource('products', ProductController::class);
    Route::resource('productCategory', ProductCategoryController::class);
    Route::get('getProductSubCategories/{id}', [ProductSubCategoryController::class, 'getSubCategories'])->name('get_product_sub_categories');
    Route::resource('productSubCategory', ProductSubCategoryController::class);

    /* PRODUCT FILES */
    Route::get('product-files/download/{id}', [ProductFileController::class, 'download'])->name('product-files.download');
    Route::post('product-files/delete-image/{id}', [ProductFileController::class, 'deleteImage'])->name('product-files.delete_image');
    Route::post('product-files/update-images', [ProductFileController::class, 'updateImages'])->name('product-files.update_images');
    Route::resource('product-files', ProductFileController::class);

    // Tax Settings
    Route::resource('taxes', TaxSettingController::class);

    /* Payments */
    Route::get('orders/offline-payment-modal', [OrderController::class, 'offlinePaymentModal'])->name('orders.offline_payment_modal');
    Route::get('orders/add-item', [OrderController::class, 'addItem'])->name('orders.add_item');
    Route::get('orders/stripe-modal', [OrderController::class, 'stripeModal'])->name('orders.stripe_modal');
    Route::post('orders/make-invoice/{orderId}', [OrderController::class, 'makeInvoice'])->name('orders.make_invoice');

    Route::post('orders/payment-failed/{orderId}', [OrderController::class, 'paymentFailed'])->name('orders.payment_failed');
    Route::post('orders/save-stripe-detail/', [OrderController::class, 'saveStripeDetail'])->name('orders.save_stripe_detail');
    Route::post('orders/change-status/', [OrderController::class, 'changeStatus'])->name('orders.change_status');
    /* Payments */
    Route::get('orders/download/{id}', [OrderController::class, 'download'])->name('orders.download');

    /* Orders */
    Route::resource('orders', OrderController::class);


    /* NOTICE */
    Route::post('notices/apply-quick-action', [NoticeController::class, 'applyQuickAction'])->name('notices.apply_quick_action');
    Route::resource('notices', NoticeController::class);

    /* KnowledgeBase */
    Route::get('knowledgebase/create/{id?}', [KnowledgeBaseController::class, 'create'])->name('knowledgebase.create');
    Route::post('knowledgebase/apply-quick-action', [KnowledgeBaseController::class, 'applyQuickAction'])->name('knowledgebase.apply_quick_action');
    Route::get('knowledgebase/searchquery/{query?}', [KnowledgeBaseController::class, 'searchQuery'])->name('knowledgebase.searchQuery');
    Route::resource('knowledgebase', KnowledgeBaseController::class)->except([
        'create'
    ]);

    Route::get('knowledgebase-files/download/{id}', [KnowledgeBaseFileController::class, 'download'])->name('knowledgebase-files.download');
    Route::resource('knowledgebase-files', KnowledgeBaseFileController::class);

    /* KnowledgeBase category */
    Route::resource('knowledgebasecategory', KnowledgeBaseCategoryController::class);

    /* EVENTS */
    Route::resource('events', EventCalendarController::class);


    /* Event Files */
    Route::get('event-files/download/{id}', [EventFileController::class, 'download'])->name('event-files.download');
    Route::resource('event-files', EventFileController::class);

    /* TASKS */
    //task timer check
    Route::get('tasks/task-timer-check/{id}', [TaskController::class, 'TaskTimeCheck']);
    //get task status
    Route::get('tasks/get-task-status/{id}', [TaskController::class, 'GetTaskStatus']);
    //task revision
    Route::get('tasks/revisions', [TaskController::class, 'task_revisions']);
    //task revision json routes
    Route::get('tasks/get-task-revision/{id}', [TaskController::class, 'GetRevision']);
    //developer daily routes
    Route::get('tasks/get-developer-tasks/{id}', [TaskController::class, 'DeveloperTask'])->name('get-developer-tasks');
    //developer task submission routes
    Route::get('tasks/get-task-submissions/{id}', [TaskController::class, 'GetTaskSubmission'])->name('get-task-submission');
    //change task status route
    Route::post('tasks/change-status', [TaskController::class, 'changeStatus'])->name('tasks.change_status');
    Route::post('tasks/apply-quick-action', [TaskController::class, 'applyQuickAction'])->name('tasks.apply_quick_action');
    Route::post('tasks/store-pin', [TaskController::class, 'storePin'])->name('tasks.store_pin');
    Route::post('tasks/reminder', [TaskController::class, 'reminder'])->name('tasks.reminder');
    Route::post('tasks/destroy-pin/{id}', [TaskController::class, 'destroyPin'])->name('tasks.destroy_pin');
    Route::post('tasks/check-task/{taskID}', [TaskController::class, 'checkTask'])->name('tasks.check_task');
    Route::post('tasks/gantt-task-update/{id}', [TaskController::class, 'updateTaskDuration'])->name('tasks.gantt_task_update');
    Route::get('tasks/members/{id}', [TaskController::class, 'members'])->name('tasks.members');

    //project single tasks
    Route::get('tasks/project_tasks/{id}', [TaskController::class, 'projectTasks'])->name('tasks.project_tasks');
    //projects subtasks
    Route::get('tasks/show-subtask/{id}/{tableView?}/{tableViews?}', [TaskController::class, 'show_subtask'])->name('tasks.show_subtask');
    Route::get('tasks/search-subtask', [TaskController::class, 'searchSubTask'])->name('tasks.search_subtask');

    // TASK COMMENTS
    //get task comment
    Route::get('tasks/{task_id}/comments', [TaskController::class, 'getTaskComments']);

    //get task replies
    Route::get('tasks/comments/{comment_id}/replies', [TaskController::class, 'getTaskCommentReplies']);
    //task comment edit
    Route::post('tasks/comment-edit', [TaskController::class, 'editComment']);
    //task comment reply
    Route::post('tasks/comment-reply', [TaskController::class, 'commentReply']);
    Route::get('tasks/comments-widget-data/{task_id}', [TaskController::class, 'taskCommentWidgetData']);
    //task comment preview
    Route::get('tasks/comments/{comment_id}/preview', [TaskController::class, 'previewTaskComment']);
    //task comment attach file delete
    Route::delete('tasks/{task_id}/comments/{comment_id}/delete-attach-file', [TaskController::class, 'deleteOldFile']);
    //task comment delete
    Route::delete('tasks/comments/{comment_id}/delete', [TaskController::class, 'deleteComment']);
    //task comment multiple delete
    Route::post('tasks-comment-delete', [TaskController::class, 'multipleCommentDelete']);

    // SUBMIT TASK FOR CLIENT APPROVAL
    //submit for task approval
    Route::post('tasks/client-approval', [TaskController::class, 'clientApproval'])->name('tasks.client_approval');
    //client approve task
    Route::post('tasks/client-approved-task', [TaskController::class, 'clientApprovedTask'])->name('tasks.client_approved_task');
    //client revision

    Route::post('tasks/client-has-revision-task', [TaskController::class, 'clientHasRevision'])->name('tasks.client_has_revision');
    //revision accept and continue
    Route::post('tasks/accept-continue', [TaskController::class, 'acceptContinue'])->name('tasks.accept_continue');
    Route::post('tasks/deny-continue', [TaskController::class, 'denyContinue'])->name('tasks.deny_continue');
    // revision reason
    Route::post('tasks/revision-reason', [TaskController::class, 'revisionReason'])->name('tasks.revision_reason');
    Route::post('tasks/revision/accept-or-revision-by-developer', [TaskController::class, 'accept_or_revision_by_developer'])->name('accept_or_revision_by_developer');
    //sales responsible on revision
    Route::put('tasks/sales-response-on-revision', [TaskController::class, 'sales_response_on_pm_revision'])->name('sales-response-on-revision');
    Route::group(
        ['prefix' => 'tasks'],
        function () {

            Route::resource('task-label', TaskLabelController::class);

            Route::resource('taskCategory', TaskCategoryController::class);

            Route::resource('taskComment', TaskCommentController::class);
            Route::resource('task-note', TaskNoteController::class);
            Route::post('task-reply', [TaskCommentController::class, 'replyStore'])->name('taskReply.store');
            Route::delete('reply-delete/{id}', [TaskCommentController::class, 'replyDelete'])->name('taskReply.delete');

            // task files routes
            Route::get('task-files/download/{id}', [TaskFileController::class, 'download'])->name('task_files.download');
            Route::resource('task-files', TaskFileController::class);

            // Sub task routes
            Route::post('sub-task/change-status', [SubTaskController::class, 'changeStatus'])->name('sub_tasks.change_status');
            Route::resource('sub-tasks', SubTaskController::class);

            // Task files routes
            Route::get('sub-task-files/download/{id}', [SubTaskFileController::class, 'download'])->name('sub-task-files.download');
            Route::resource('sub-task-files', SubTaskFileController::class);

            // Taskboard routes
            Route::post('taskboards/collapseColumn', [TaskBoardController::class, 'collapseColumn'])->name('taskboards.collapse_column');
            Route::post('taskboards/updateIndex', [TaskBoardController::class, 'updateIndex'])->name('taskboards.update_index');
            Route::get('taskboards/loadMore', [TaskBoardController::class, 'loadMore'])->name('taskboards.load_more');
            Route::resource('taskboards', TaskBoardController::class);

            Route::resource('task-calendar', TaskCalendarController::class);
        }
    );
    //Route::resource('tasks', TaskController::class)->only([ 'show', 'create', 'store', 'edit', 'update', 'destroy']);
    //pm task guidelines
    //get task project deliverables
    Route::get('tasks/add-tasks/project-deliverables/{id}', [TaskController::class, 'get_tasks_project_deliverable']);
    //new task store
    Route::post('new-task/store',[TaskController::class,'StoreNewTask'])->name('store-new-tasks');
    //new task edit
    Route::post('new-task/edit',[TaskController::class,'EditTask'])->name('edit-new-tasks');
    //pending parent task
    Route::get('tasks/pending-parent-tasks', [TaskController::class, 'PendingParentTasks']);
    //pending task authorization
    Route::put('tasks/auth-pending-tasks/{id}', [TaskController::class, 'AuthPendingParentTasks']);
    //pm task guideline checking
    Route::get('tasks/check-pm-taskguideline/{id}', [TaskController::class, 'CheckPmTaskGuideline']);
    //task guideline store
    Route::post('task-guideline-store',[TaskController::class,'storeTaskGuideline'])->name('task-guideline-store');
    //task report issue resolve
    Route::post('tasks/report-issues/resolve', [TaskController::class, 'resolve_report']);
    //get parent tasks report table data
    Route::get('tasks/get-parent-tasks/report-issues/{id}', [TaskController::class, 'get_parent_tasks_report_issues']);
    //get sub task table report data
    Route::get('tasks/get-sub-tasks/report-issues/{id}', [TaskController::class, 'get_sub_tasks_report_issues']);
    //subtasks table data
    Route::get('tasks/get-subtasks', [TaskController::class, 'get_subtasks'])->name('get-subtasks');
    //get tasks data
    Route::get('tasks/get-tasks', [TaskController::class, 'get_tasks'])->name('get-tasks');
    //developers today task data
    Route::get('tasks/get-today-tasks/{id}', [TaskController::class, 'get_today_tasks']);
    //developer daily submissions
    Route::post('tasks/daily-submissions', [TaskController::class, 'storeDailySubmission']);
    //developer daily submissions details
    Route::get('tasks/daily-submissions/{id}', [TaskController::class, 'getDailySubmission']);
    //all developer today task submission data
    Route::get('tasks/all-daily-submissions', [TaskController::class, 'allDailySubmission']);
    //get in progress task data
    Route::get('tasks/get-inprogress-tasks/{id}', [TaskController::class, 'checkInProgressTask']);
    //get tasks subtasks data
    Route::get('tasks/get-tasks-subtasks/{id}', [TaskController::class, 'get_task_subtask'])->name('get-task-subtasks');
    //tasks all data
    Route::get('tasks/{any?}', [TaskController::class, 'index'])
    ->where('any', '^(?!api\/)[\/\w\.-]*')
    ->where('any', '^(?:(?!\d+).)*');
    Route::resource('tasks', TaskController::class)->only(['index', 'show', 'create', 'store', 'edit', 'update', 'destroy']);
    //view tasl guideline
    Route::get('task-guideline/{project_id}', [TaskController::class, 'viewTaskGuideline'])->name('task-guideline');
    //store task guideline
    Route::post('task-guideline-store', [TaskController::class, 'storeTaskGuideline'])->name('task-guideline-store');
    //get working environment of project
    Route::get('working-environment/{project_id}', [TaskController::class, 'viewWorkingEnvironment'])->name('working-environment');
    Route::post('working-environment-store', [TaskController::class, 'storeWorkingEnvironment'])->name('working-environment-store');
    Route::get('working-environment/task/{task_id}', [TaskController::class, 'taskWorkingEnvironment']);

     /******* Independent TASK Start ******** */
    Route::get('independent/{any?}', [IndependentTaskController::class, 'index'])
    ->where('any', '^(?!api\/)[\/\w\.-]*')
    ->where('any', '^(?:(?!\d+).)*');
    Route::resource('independent-task',IndependentTaskController::class);
    Route::get('get-independent-task',[IndependentTaskController::class,'independentTaskGet'])->name('independent-task-get');
    Route::get('independent-task-show',[IndependentTaskController::class,'independentTaskShow'])->name('independent-task-show');
    Route::get('get-all-independent-task',[IndependentTaskController::class,'independentTaskAll'])->name('get-all-independent-task');
    Route::get('independent-task/{task_id}/subtask',[IndependentTaskController::class,'independentSubTask'])->name('get-independent-subtask');
    Route::get('independent-subtasks',[IndependentTaskController::class,'independentAllSubTask'])->name('get-independent-all-sub-task');
     /******* Independent TASK End ******** */

    /******* PENDING PARENT TASK CONVERSATION ******** */
    Route::get('pending-task-conversations/{task_id}', [TaskController::class, 'get_pending_parent_task_conversation_question'] )->name('pending-task-conversations');
    Route::post('pending-task-conversations', [TaskController::class, 'add_pending_parent_task_conversation_question'] )->name('create-pending-task-conversations');
    Route::put('pending-task-conversations', [TaskController::class, 'update_pending_parent_task_conversation_question_by_answer'] )->name('update-pending-task-conversations');


    /******* INDEPENDENT TASK CONVERSATION ******** */
    Route::get('independent-task-conversations/{id}', [IndependentTaskController::class, 'get_independent_task_conversation_question'] )->name('independent-task-conversations');
    Route::post('create-independent-task-conversations', [IndependentTaskController::class, 'add_independent_task_conversation_question'] )->name('create-independent-task-conversations');
    Route::put('update-independent-task-conversations', [IndependentTaskController::class, 'update_independent_task_conversation_question_by_answer'] )->name('update-independent-task-conversations');
    Route::put('independent-task/conversions/status/update', [IndependentTaskController::class, 'updateIndependentTaskHasUpdateStatus'] )->name('independent-task/conversions/update');
    Route::get('independent-task-clients', [IndependentTaskController::class, 'clients'] );
    /******* TASK DISPUTE ******** */
    Route::get('task-disputes', [TaskController::class, 'get_disputes'])->name('task-disputes');
    Route::post('task-dispute-question', [TaskController::class, 'store_dispute_question'])->name('task-dispute-question');
    Route::put('task-dispute-question-answer', [TaskController::class, 'update_dispute_question_with_answer'])->name('task-dispute-question-answer');
    Route::put('task-dispute-submit-to-auth', [TaskController::class, 'dispute_send_for_authorization'])->name('task-dispute-submit-to-auth');
    Route::put('task-dispute-read-status', [TaskController::class, 'update_dispute_answer_read_status'])->name('task-dispute-read-status');


    // Holidays
    Route::get('holidays/mark-holiday', [HolidayController::class, 'markHoliday'])->name('holidays.mark_holiday');
    Route::post('holidays/mark-holiday-store', [HolidayController::class, 'markDayHoliday'])->name('holidays.mark_holiday_store');
    Route::get('holidays/calendar', [HolidayController::class, 'calendar'])->name('holidays.calendar');
    Route::post('holidays/apply-quick-action', [HolidayController::class, 'applyQuickAction'])->name('holidays.apply_quick_action');
    Route::resource('holidays', HolidayController::class);

    // Lead Files
    Route::group(
        ['prefix' => 'leads'],
        function () {
            Route::get('lead-files/download/{id}', [LeadFileController::class, 'download'])->name('lead-files.download');
            Route::get('lead-files/layout', [LeadFileController::class, 'layout'])->name('lead-files.layout');
            Route::resource('lead-files', LeadFileController::class);

            Route::get('leads/follow-up/{leadID}', [LeadController::class, 'followUpCreate'])->name('leads.follow_up');
            Route::post('leads/follow-up-store', [LeadController::class, 'followUpStore'])->name('leads.follow_up_store');
            Route::get('leads/follow-up-edit/{id?}', [LeadController::class, 'editFollow'])->name('leads.follow_up_edit');
            Route::post('leads/follow-up-update', [LeadController::class, 'updateFollow'])->name('leads.follow_up_update');

            Route::post('leads/follow-up-delete/{id}', [LeadController::class, 'deleteFollow'])->name('leads.follow_up_delete');

            Route::post('leads/change-status', [LeadController::class, 'changeStatus'])->name('leads.change_status');
            Route::post('leads/apply-quick-action', [LeadController::class, 'applyQuickAction'])->name('leads.apply_quick_action');

            Route::get('leads/gdpr-consent', [LeadController::class, 'consent'])->name('leads.gdpr_consent');
            Route::post('leads/save-lead-consent/{lead}', [LeadController::class, 'saveLeadConsent'])->name('leads.save_lead_consent');

            Route::resource('leadCategory', LeadCategoyController::class);

            // Lead Note
            Route::get('lead-notes/ask-for-password/{id}', [LeadNoteController::class, 'askForPassword'])->name('lead_notes.ask_for_password');
            Route::post('lead-notes/check-password', [LeadNoteController::class, 'checkPassword'])->name('lead_notes.check_password');
            Route::post('lead-notes/apply-quick-action', [LeadNoteController::class, 'applyQuickAction'])->name('lead-notes.apply_quick_action');

            Route::resource('lead-notes', LeadNoteController::class);


            // lead board routes
            Route::post('leadboards/collapseColumn', [LeadBoardController::class, 'collapseColumn'])->name('leadboards.collapse_column');
            Route::post('leadboards/updateIndex', [LeadBoardController::class, 'updateIndex'])->name('leadboards.update_index');
            Route::get('leadboards/loadMore', [LeadBoardController::class, 'loadMore'])->name('leadboards.load_more');
            Route::resource('leadboards', LeadBoardController::class);

            Route::post('lead-form/sortFields', [LeadCustomFormController::class, 'sortFields'])->name('lead-form.sortFields');
            Route::resource('lead-form', LeadCustomFormController::class);
            Route::get('import', [LeadController::class, 'importLead'])->name('leads.import');
            Route::post('import', [LeadController::class, 'importStore'])->name('leads.import.store');
            Route::post('import/process', [LeadController::class, 'importProcess'])->name('leads.import.process');
        }
    );
    //web development leads
    Route::resource('leads', LeadController::class)->middleware('clearCookies');

    Route::get('get-all-leads', [LeadController::class,'getLead']);
    Route::get('export-lead-data', [LeadController::class,'exportLead']);

    /*=========================> DIGITAL MERKTING LEAD START <===========================*/

    Route::resource('digital-marketing-lead',DMLeadController::class);
    Route::post('/dm-lead-store', [DMLeadController::class, 'storeDmLead']);
    Route::post('/digital-marketing-lead/update', [DMLeadController::class, 'updateDMLead'])->name('digital-marketing-lead-update');
    Route::post('/digital-marketing-deal/stage', [DMLeadController::class, 'dmDealStageChange'])->name('dm-deal-stage');
    Route::get('get-all-dm-leads', [DMLeadController::class,'getDmLead']);
    Route::get('export-dm-lead-data', [DMLeadController::class,'exportDmLead']);


    /*=========================> DIGITAL MERKTING LEAD END <===========================*/

    /* LEAVES */
    Route::get('leaves/leaves-date', [LeaveController::class, 'getDate'])->name('leaves.date');
    Route::get('leaves/personal', [LeaveController::class, 'personalLeaves'])->name('leaves.personal');
    Route::get('leaves/calendar', [LeaveController::class, 'leaveCalendar'])->name('leaves.calendar');
    Route::post('leaves/data', [LeaveController::class, 'data'])->name('leaves.data');
    Route::post('leaves/leaveAction', [LeaveController::class, 'leaveAction'])->name('leaves.leave_action');
    Route::get('leaves/show-reject-modal', [LeaveController::class, 'rejectLeave'])->name('leaves.show_reject_modal');
    Route::post('leaves/apply-quick-action', [LeaveController::class, 'applyQuickAction'])->name('leaves.apply_quick_action');
    Route::resource('leaves', LeaveController::class);

    // Messages
    Route::get('messages/fetch-user-list', [MessageController::class, 'fetchUserListView'])->name('messages.fetch_user_list');
    Route::post('messages/fetch_messages/{id}', [MessageController::class, 'fetchUserMessages'])->name('messages.fetch_messages');
    Route::resource('messages', MessageController::class);

    // Chat Files
    Route::get('message-file/download/{id}', [MessageFileController::class, 'download'])->name('message_file.download');

    Route::resource('message-file', MessageFileController::class);

    // Invoices

    /* payments */
    Route::get('invoices/offline-payment-modal', [InvoiceController::class, 'offlinePaymentModal'])->name('invoices.offline_payment_modal');
    Route::get('invoices/stripe-modal', [InvoiceController::class, 'stripeModal'])->name('invoices.stripe_modal');
    Route::post('invoices/save-stripe-detail/', [InvoiceController::class, 'saveStripeDetail'])->name('invoices.save_stripe_detail');
    /* payments */

    Route::get('invoices/delete-image', [InvoiceController::class, 'deleteInvoiceItemImage'])->name('invoices.delete_image');
    Route::get('invoices/show-image', [InvoiceController::class, 'showImage'])->name('invoices.show_image');
    Route::post('invoices/store-offline-payment', [InvoiceController::class, 'storeOfflinePayment'])->name('invoices.store_offline_payment');
    Route::post('invoices/store_file', [InvoiceController::class, 'storeFile'])->name('invoices.store_file');
    Route::get('invoices/file-upload', [InvoiceController::class, 'fileUpload'])->name('invoices.file_upload');
    Route::post('invoices/delete-applied-credit/{id}', [InvoiceController::class, 'deleteAppliedCredit'])->name('invoices.delete_applied_credit');
    Route::get('invoices/applied-credits/{id}', [InvoiceController::class, 'appliedCredits'])->name('invoices.applied_credits');
    Route::get('invoices/payment-reminder/{invoiceID}', [InvoiceController::class, 'remindForPayment'])->name('invoices.payment_reminder');
    Route::post('invoices/send-invoice/{invoiceID}', [InvoiceController::class, 'sendInvoice'])->name('invoices.send_invoice');
    Route::post('invoices/apply-quick-action', [InvoiceController::class, 'applyQuickAction'])->name('invoices.apply_quick_action');
    Route::get('invoices/download/{id}', [InvoiceController::class, 'download'])->name('invoices.download');
    Route::get('invoices/add-item', [InvoiceController::class, 'addItem'])->name('invoices.add_item');
    Route::get('invoices/update-status/{invoiceID}', [InvoiceController::class, 'cancelStatus'])->name('invoices.update_status');
    Route::get('invoices/get-client-company/{projectID?}', [InvoiceController::class, 'getClientOrCompanyName'])->name('invoices.get_client_company');
    Route::post('invoices/fetchTimetart-timers', [InvoiceController::class, 'fetchTimelogs'])->name('invoices.fetch_timelogs');
    Route::get('invoices/check-shipping-address', [InvoiceController::class, 'checkShippingAddress'])->name('invoices.check_shipping_address');

    Route::get('invoices/toggle-shipping-address/{invoice}', [InvoiceController::class, 'toggleShippingAddress'])->name('invoices.toggle_shipping_address');
    Route::get('invoices/shipping-address-modal/{invoice}', [InvoiceController::class, 'shippingAddressModal'])->name('invoices.shipping_address_modal');
    Route::post('invoices/add-shipping-address/{clientId}', [InvoiceController::class, 'addShippingAddress'])->name('invoices.add_shipping_address');

    Route::group(
        ['prefix' => 'invoices'],
        function () {
            // Invoice recurring
            Route::post('recurring-invoice/change-status', [RecurringInvoiceController::class, 'changeStatus'])->name('recurring_invoice.change_status');
            Route::get('recurring-invoice/export/{startDate}/{endDate}/{status}/{employee}', [RecurringInvoiceController::class, 'export'])->name('recurring_invoice.export');
            Route::get('recurring-invoice/recurring-invoice/{id}', [RecurringInvoiceController::class, 'recurringInvoices'])->name('recurring_invoice.recurring_invoice');
            Route::resource('recurring-invoices', RecurringInvoiceController::class);
        }
    );
    Route::resource('invoices', InvoiceController::class);

    Route::get('award-time/increase/{id?}', [ContractController::class, 'award_time_increase_index'])->name('award_time_check.index');
    Route::post('award-time/increase/store', [ContractController::class, 'award_time_incress_store'])->name('award_time_check.store');
    Route::post('award-time/increase/update', [ContractController::class, 'award_time_incress_update'])->name('award_time_check.update');

    /*=========================> DIGITAL MERKTING AWARD TIME START <===========================*/
    Route::get('dm-award-time/increase/{id?}', [DMContractController::class, 'dm_award_time_increase_index'])->name('dm_award_time_check.index');
    Route::post('dm-award-time/increase/store', [DMContractController::class, 'dm_award_time_incress_store'])->name('dm_award_time_check.store');
    Route::post('dm-award-time/increase/update', [DMContractController::class, 'dm_award_time_incress_update'])->name('dm_award_time_check.update');
        /*=========================> DIGITAL MERKTING AWARD TIME START <===========================*/


    //report-central
    Route::get('report-central/performance-predefined-cycle', [ReportCentralController::class, 'performancePredefinedCycle'])->name('performance_predefined_cycle');
    Route::get('report-central/performance-real-time', [ReportCentralController::class, 'performanceRealTime'])->name('performance_real_time');
    Route::get('report-central/revision-calculator', [ReportCentralController::class, 'revisionCalculator'])->name('revision_calculator');
    Route::get('report-central/reward-point', [ReportCentralController::class, 'rewardPoint'])->name('reward_point');
    Route::get('report-central/graphs', [ReportCentralController::class, 'graphs'])->name('graphs');
    Route::get('report-central/deliverable-issues', [ReportCentralController::class, 'deliverableIssues'])->name('deliverable_issues');
    Route::get('report-central/performance', [ReportCentralController::class, 'performance'])->name('performance');
    Route::get('report-central/reward-point2', [ReportCentralController::class, 'rewardPoint2'])->name('reward_point2');
    Route::get('report-central/performance2', [ReportCentralController::class, 'performance2'])->name('performance2');
    Route::get('report-central/bandwidth', [ReportCentralController::class, 'bandwidth'])->name('bandwidth');
    Route::get('report-central/revisions', [ReportCentralController::class, 'revisions'])->name('revisions');
    Route::get('report-central/reward-point3', [ReportCentralController::class, 'rewardPoint3'])->name('reward-point3');
    Route::get('report-central/graphs2', [ReportCentralController::class, 'graphs2'])->name('graphs2');
    Route::get('report-central/time-log', [ReportCentralController::class, 'timeLog'])->name('time_log');
    Route::resource('report-central', ReportCentralController::class);


    //KPI Settings
    Route::resource('kpi-settings', KpiSettingController::class);
    //    Policy section
    Route::get('policy/next-month-policy', [PolicyController::class, 'nextMonthPolicy'])->name('nextMonthPolicy');
    Route::get('policy/show-month-policy/{id}', [PolicyController::class, 'show_month_policy'])->name('show_month_policy');
    Route::resource('policy', PolicyController::class);
    //Incentives Settings
    Route::resource('incentive-settings', IncentiveSettingController::class);
    //Monthly Incentive Settings
    Route::resource('monthly-incentive', MonthlyIncentiveController::class);
    Route::get('monthly-incentive/download/{id}', [MonthlyIncentiveController::class, 'download'])->name('monthly-incentive.download');
    
    Route::get('monthly-incentive/get-json/index', [MonthlyIncentiveController::class, 'get_index_json']);
    
    Route::resource('employee-evaluation', EvaluationController::class);
    Route::get('get-all-evaluation', [EvaluationController::class,'getAllEvaluation']);
    //Pm goal Settings
    Route::resource('pm-goal-setting', PmGoalSetingController::class);
    Route::post('pm-goal-setting-update',[PmGoalSetingController::class,'pmGoalUpdate'])->name('pm-goal-setting-update');

    /* PM PROJECT STATUS */
    Route::resource('project-status',ProjectStatusController::class);
    Route::get('get-project-status-date', [ProjectStatusController::class, 'allProjectStatus']);
    Route::get('get-pm-goal-date/{id}', [ProjectStatusController::class, 'allProjectPmGoal']);
    Route::get('project-status-calendar', [ProjectStatusController::class, 'projectStatusCalendar'])->name('project-status-calendar');
    Route::get('calendar-show/{id}', [ProjectStatusController::class, 'calendarShow'])->name('calendar.show');
    Route::post('project-status-reason-submit', [ProjectStatusController::class, 'projectStatusReason']);
    Route::post('project-status-resolve-submit', [ProjectStatusController::class, 'projectStatusResolve']);
    Route::get('project-status-extend-request/{id}', [ProjectStatusController::class, 'projectStatusExtendRequest'])->name('project-status.extendRequest');
    Route::post('pm-extend-request-store', [ProjectStatusController::class, 'storePMExtendRequest']);
    Route::get('project-extend-image/{id}', [ProjectStatusController::class, 'extendImage']);
    Route::get('project-status-review-extend-request/{id}', [ProjectStatusController::class, 'reviewExtendRequest'])->name('project-status.reviewExtendRequest');
    Route::post('project-status-accept-extend-request', [ProjectStatusController::class, 'acceptOrDenyExtendRequest'])->name('project-status-extend-request-accept');
    Route::get('goal-resolved-history', [ProjectStatusController::class, 'resolvedHistory']);

    //qualified sales Settings



    Route::resource('qualified-sales',QualifiedSalesController::class);
    Route::get('qualified-sales/get-points/{id}',[QualifiedSalesController::class,'get_point_details']);




    // Estimates
    Route::get('estimates/delete-image', [EstimateController::class, 'deleteEstimateItemImage'])->name('estimates.delete_image');
    Route::get('estimates/download/{id}', [EstimateController::class, 'download'])->name('estimates.download');
    Route::post('estimates/send-estimate/{id}', [EstimateController::class, 'sendEstimate'])->name('estimates.send_estimate');
    Route::get('estimates/change-status/{id}', [EstimateController::class, 'changeStatus'])->name('estimates.change_status');
    Route::post('estimates/accept/{id}', [EstimateController::class, 'accept'])->name('estimates.accept');
    Route::post('estimates/decline/{id}', [EstimateController::class, 'decline'])->name('estimates.decline');
    Route::resource('estimates', EstimateController::class);

    // Proposals
    Route::get('proposals/delete-image', [ProposalController::class, 'deleteProposalItemImage'])->name('proposals.delete_image');
    Route::get('proposals/download/{id}', [ProposalController::class, 'download'])->name('proposals.download');
    Route::post('proposals/send-proposal/{id}', [ProposalController::class, 'sendProposal'])->name('proposals.send_proposal');
    Route::resource('proposals', ProposalController::class);

    // Proposal Template
    Route::post('proposal-template/apply-quick-action', [ProposalTemplateController::class, 'applyQuickAction'])->name('proposal_template.apply_quick_action');
    Route::resource('proposal-template', ProposalTemplateController::class);
    Route::get('proposal-template/download/{id}', [ProposalTemplateController::class, 'download'])->name('proposal-template.download');
    Route::get('proposals-template/delete-image', [ProposalTemplateController::class, 'deleteProposalItemImage'])->name('proposal_template.delete_image');


    // Payments
    Route::post('payments/apply-quick-action', [PaymentController::class, 'applyQuickAction'])->name('payments.apply_quick_action');
    Route::get('payments/download/{id}', [PaymentController::class, 'download'])->name('payments.download');
    Route::resource('payments', PaymentController::class);


    // Credit notes
    Route::post('creditnotes/store_file', [CreditNoteController::class, 'storeFile'])->name('creditnotes.store_file');
    Route::get('creditnotes/file-upload', [CreditNoteController::class, 'fileUpload'])->name('creditnotes.file_upload');
    Route::post('creditnotes/delete-credited-invoice/{id}', [CreditNoteController::class, 'deleteCreditedInvoice'])->name('creditnotes.delete_credited_invoice');
    Route::get('creditnotes/credited-invoices/{id}', [CreditNoteController::class, 'creditedInvoices'])->name('creditnotes.credited_invoices');
    Route::post('creditnotes/apply-invoice-credit/{id}', [CreditNoteController::class, 'applyInvoiceCredit'])->name('creditnotes.apply_invoice_credit');
    Route::get('creditnotes/apply-to-invoice/{id}', [CreditNoteController::class, 'applyToInvoice'])->name('creditnotes.apply_to_invoice');
    Route::get('creditnotes/download/{id}', [CreditNoteController::class, 'download'])->name('creditnotes.download');

    Route::get('creditnotes/convert-invoice/{id}', [CreditNoteController::class, 'convertInvoice'])->name('creditnotes.convert-invoice');

    Route::resource('creditnotes', CreditNoteController::class);

    // Expenses
    Route::group(
        ['prefix' => 'expenses'],
        function () {
            Route::post('recurring-expenses/change-status', [RecurringExpenseController::class, 'changeStatus'])->name('recurring-expenses.change_status');
            Route::resource('recurring-expenses', RecurringExpenseController::class);
        }
    );

    Route::get('expenses/change-status', [ExpenseController::class, 'getEmployeeProjects'])->name('expenses.get_employee_projects');
    Route::get('expenses/category', [ExpenseController::class, 'getCategoryEmployee'])->name('expenses.get_category_employee');
    Route::post('expenses/change-status', [ExpenseController::class, 'changeStatus'])->name('expenses.change_status');
    Route::post('expenses/apply-quick-action', [ExpenseController::class, 'applyQuickAction'])->name('expenses.apply_quick_action');
    Route::resource('expenses', ExpenseController::class);
    Route::resource('expenseCategory', ExpenseCategoryController::class);


    // Timelogs
    Route::group(
        ['prefix' => 'timelogs'],
        function () {
            Route::resource('timelog-calendar', TimelogCalendarController::class);
            Route::resource('timelog-break', ProjectTimelogBreakController::class);
        }
    );
    //timers and timelogs
    Route::get('timelogs/export', [TimelogController::class, 'export'])->name('timelogs.export');
    Route::get('timelogs/show-active-timer', [TimelogController::class, 'showActiveTimer'])->name('timelogs.show_active_timer');
    Route::get('timelogs/show-timer', [TimelogController::class, 'showTimer'])->name('timelogs.show_timer');
    Route::post('timelogs/start-timer', [TimelogController::class, 'startTimer'])->name('timelogs.start_timer');
    Route::post('timelogs/stop-timer', [TimelogController::class, 'stopTimer'])->name('timelogs.stop_timer');
    Route::post('timelogs/pause-timer', [TimelogController::class, 'pauseTimer'])->name('timelogs.pause_timer');
    Route::post('timelogs/resume-timer', [TimelogController::class, 'resumeTimer'])->name('timelogs.resume_timer');
    Route::post('timelogs/apply-quick-action', [TimelogController::class, 'applyQuickAction'])->name('timelogs.apply_quick_action');
    Route::get('timelogs/by-employee', [TimelogController::class, 'byEmployee'])->name('timelogs.by_employee');
    Route::post('timelogs/employee_data', [TimelogController::class, 'employeeData'])->name('timelogs.employee_data');
    Route::post('timelogs/user_time_logs', [TimelogController::class, 'userTimelogs'])->name('timelogs.user_time_logs');
    Route::post('timelogs/approve_timelog', [TimelogController::class, 'approveTimelog'])->name('timelogs.approve_timelog');
    Route::resource('timelogs', TimelogController::class);
    //task revision disputes
    Route::resource('disputes', DisputeController::class);
    //revision calculator
    Route::any('revision-calculator/{any?}', [RevisionCalculatorController::class, 'index'])->where('any', '.*');
    Route::resource('revision-calculator', RevisionCalculatorController::class);
    Route::get('revision-calculator-data', [RevisionCalculatorController::class, 'getData']);
    Route::get('revision-calculator-data/assigne-project-count/{id}', [RevisionCalculatorController::class, 'AssignProjects']);
    Route::get('revision-calculator-data/no-of-tasks/{id}', [RevisionCalculatorController::class, 'TotalTasks']);
    Route::get('revision-calculator-data/no-of-revisions/{id}', [RevisionCalculatorController::class, 'TotalRevisions']);
    Route::get('revision-calculator-data/sales-issues/{id}', [RevisionCalculatorController::class, 'SalesIssue']);
    Route::get('revision-calculator-data/pm-issues/{id}', [RevisionCalculatorController::class, 'PMIssue']);
    Route::get('revision-calculator-data/client-issues/{id}', [RevisionCalculatorController::class, 'ClientIssue']);
    Route::get('revision-calculator-data/ldev-issues/{id}', [RevisionCalculatorController::class, 'LeadDevIssue']);
    Route::get('revision-calculator-data/dev-issues/{id}', [RevisionCalculatorController::class, 'DevIssue']);
    Route::get('revision-calculator-data/total-dispute/{id}', [RevisionCalculatorController::class, 'TotalDispute']);
    Route::get('revision-calculator-data/dispute-not-resolve/{id}', [RevisionCalculatorController::class, 'DisputeNotResolve']);
    Route::get('revision-calculator-data/pending-issues/{id}', [RevisionCalculatorController::class, 'PendingIssues']);


    // Contracts
    Route::post('contracts/deal-create', [ContractController::class, 'createDeal'])->name('create-deal');
    Route::post('contracts/deal-store', [ContractController::class, 'storeDeal'])->name('store-deals');
    Route::get('contracts/deal-delete/{id}', [ContractController::class, 'deleteDeal']);
    Route::get('deal-url/{id}', [ContractController::class, 'DealUrl']);
    Route::post('contracts/apply-quick-action', [ContractController::class, 'applyQuickAction'])->name('contracts.apply_quick_action');
    Route::get('contracts/download/{id}', [ContractController::class, 'download'])->name('contracts.download');
    Route::post('contracts/sign/{id}', [ContractController::class, 'sign'])->name('contracts.sign');
    Route::get('get-contracts-data', [ContractController::class, 'getAllContracts']);
    Route::get('export-contracts-data', [ContractController::class, 'exportContracts']);
    Route::group(
        ['prefix' => 'contracts'],
        function () {
            Route::resource('contractDiscussions', ContractDiscussionController::class);

            Route::get('contractFiles/download/{id}', [ContractFileController::class, 'download'])->name('contractFiles.download');
            Route::resource('contractFiles', ContractFileController::class);
            Route::resource('contractTypes', ContractTypeController::class);
        }
    );
    Route::resource('contracts', ContractController::class);
    Route::resource('contract-renew', ContractRenewController::class);
    Route::resource('deals', DealController::class);
    Route::get('get-deal-data', [DealController::class,'getDealData']);
    Route::get('export-deal-data', [DealController::class,'exportDeal']);


    /**ALL Currencie API START*/
    Route::get('get-all-currencies', [DealController::class,'getAllCurrencie']);
    /**ALL Currencie API END*/


    /**ALL Country API START*/
    Route::get('get-all-country', [DealController::class,'getAllCountry']);
    /**ALL Country API END*/


    /*=========================> DIGITAL MERKTING CONTRACT OR WONDEAL START <===========================*/

    Route::resource('dm-contracts', DMContractController::class);
    Route::post('dm-contracts/deal-store', [DMContractController::class, 'storeDMDeal'])->name('dm-store-deals');
    Route::get('dm-deal-url/{id}', [DMContractController::class, 'dmDealUrl']);
    Route::get('get-dm-contracts-data', [DMContractController::class, 'getAllDmContracts']);
    Route::get('export-dm-contracts-data', [DMContractController::class, 'exportDmContracts']);

    /*=========================> DIGITAL MERKTING CONTRACT OR WONDEAL START <===========================*/



    /*=========================> DIGITAL MERKTING DEALS START <===========================*/

    Route::resource('digital-marketing-deals',DMDealController::class);
    Route::post('/digital-marketing-leads/deals/store', [DMDealController::class, 'storeDMLeadDeal'])->name('digital-marketing-store-deals-stage');
    Route::post('/digital-marketing/deal/stage/lost', [DMDealController::class, 'dmDealStageUpdateLost'])->name('digital-marketing-deal-update-lost');
    Route::get('get-dm-deal-data', [DMDealController::class,'getDmDealData']);
    Route::get('export-dm-deal-data', [DMDealController::class,'exportDmDeal']);


    /*=========================> DIGITAL MERKTING DEALS END <===========================*/

    Route::post('deals/apply-quick-action', [DealController::class, 'applyQuickAction'])->name('deals.apply_quick_action');
    Route::post('accounts/deals/store', [DealController::class, 'store'])->name('store.deal');
    Route::post('accounts/deals/update', [DealController::class, 'update'])->name('update.deal');
    Route::resource('dealboards', DealBoardController::class);

    Route::get('client-deal-create/{id}',[DealController::class,'createClientDeal'])->name('create-client-deal');
    Route::post('client-deal-store',[DealController::class,'storeClientDeal'])->name('store-client-deal');

    // Contract template

    Route::post('contract-template/apply-quick-action', [ContractTemplateController::class, 'applyQuickAction'])->name('contract_template.apply_quick_action');
    Route::resource('contract-template', ContractTemplateController::class);
    Route::get('contract-template/download/{id}', [ContractTemplateController::class, 'download'])->name('contract-template.download');



    // Attendance
    Route::get('attendances/export-attendance/{year}/{month}/{id}', [AttendanceController::class, 'exportAttendanceByMemeber'])->name('attendances.export_attendance');
    Route::get('attendances/export-allattendance/{year}/{month}/{id}/{late}/{department}', [AttendanceController::class, 'exportAllAttendance'])->name('attendances.export_allattendance');
    Route::post('attendances/employee-data', [AttendanceController::class, 'employeeData'])->name('attendances.employee_data');
    Route::get('attendances/mark/{id}/{day}/{month}/{year}', [AttendanceController::class, 'mark'])->name('attendances.mark');
    Route::get('attendances/by-member', [AttendanceController::class, 'byMember'])->name('attendances.by_member');
    Route::get('attendances/by-hour', [AttendanceController::class, 'byHour'])->name('attendances.by_hour');
    Route::post('attendances/bulk-mark', [AttendanceController::class, 'bulkMark'])->name('attendances.bulk_mark');
    Route::get('attendances/import', [AttendanceController::class, 'importAttendance'])->name('attendances.import');
    Route::post('attendances/import', [AttendanceController::class, 'importStore'])->name('attendances.import.store');
    Route::post('attendances/import/process', [AttendanceController::class, 'importProcess'])->name('attendances.import.process');
    Route::get('attendances/by-map-location', [AttendanceController::class, 'byMapLocation'])->name('attendances.by_map_location');
    Route::resource('attendances', AttendanceController::class);

    Route::get('shifts/mark/{id}/{day}/{month}/{year}', [EmployeeShiftScheduleController::class, 'mark'])->name('shifts.mark');
    Route::get('shifts/export-all/{year}/{month}/{id}/{department}', [EmployeeShiftScheduleController::class, 'exportAllShift'])->name('shifts.export_all');

    Route::get('shifts/employee-shift-calendar', [EmployeeShiftScheduleController::class, 'employeeShiftCalendar'])->name('shifts.employee_shift_calendar');
    Route::post('shifts/bulk-shift', [EmployeeShiftScheduleController::class, 'bulkShift'])->name('shifts.bulk_shift');
    Route::resource('shifts', EmployeeShiftScheduleController::class);

    Route::post('shifts-change/approve_request/{id}', [EmployeeShiftChangeRequestController::class, 'approveRequest'])->name('shifts-change.approve_request');
    Route::post('shifts-change/decline_request/{id}', [EmployeeShiftChangeRequestController::class, 'declineRequest'])->name('shifts-change.decline_request');
    Route::post('shifts-change/apply-quick-action', [EmployeeShiftChangeRequestController::class, 'applyQuickAction'])->name('shifts-change.apply_quick_action');
    Route::resource('shifts-change', EmployeeShiftChangeRequestController::class);

    // Tickets
    Route::post('tickets/apply-quick-action', [TicketController::class, 'applyQuickAction'])->name('tickets.apply_quick_action');
    Route::post('tickets/updateOtherData/{id}', [TicketController::class, 'updateOtherData'])->name('tickets.update_other_data');
    Route::post('tickets/refreshCount', [TicketController::class, 'refreshCount'])->name('tickets.refresh_count');
    Route::resource('tickets', TicketController::class);

    //report issues
    Route::post('report_issues/apply-quick-action', [ReportIssueController::class, 'applyQuickAction'])->name('report_issues.apply_quick_action');
    Route::post('report_issues/updateOtherData/{id}', [ReportIssueController::class, 'updateOtherData'])->name('report_issues.update_other_data');
    Route::post('report_issues/refreshCount', [ReportIssueController::class, 'refreshCount'])->name('report_issues.refresh_count');
    Route::resource('report_issues', ReportIssueController::class);
    Route::post('/report-issue/status-change/', [ReportIssueController::class, 'StatusChange'])->name('report-issue-status');

    // Software Development Project


    Route::post('software_projects/apply-quick-action', [SoftwareProjectController::class, 'applyQuickAction'])->name('software_projects.apply_quick_action');
    Route::post('software_projects/updateOtherData/{id}', [SoftwareProjectController::class, 'updateOtherData'])->name('software_projects.update_other_data');
    Route::post('software_projects/refreshCount', [SoftwareProjectController::class, 'refreshCount'])->name('software_projects.refresh_count');
    Route::resource('software_projects', SoftwareProjectController::class);

    // Suggesstion controllers
    Route::post('suggestions/apply-quick-action', [SuggestionController::class, 'applyQuickAction'])->name('suggestions.apply_quick_action');
    Route::post('suggestions/updateOtherData/{id}', [SuggestionController::class, 'updateOtherData'])->name('suggestions.update_other_data');
    Route::post('suggestions/refreshCount', [SuggestionController::class, 'refreshCount'])->name('suggestions.refresh_count');
    Route::resource('suggestions', SuggestionController::class);
    Route::post('/suggestions/status-change/', [SuggestionController::class, 'StatusChange'])->name('suggestions-status');

    // Ticket Custom Embed From
    Route::post('ticket-form/sort-fields', [TicketCustomFormController::class, 'sortFields'])->name('ticket-form.sort_fields');
    Route::resource('ticket-form', TicketCustomFormController::class);

    Route::get('ticket-files/download/{id}', [TicketFileController::class, 'download'])->name('ticket-files.download');
    Route::resource('ticket-files', TicketFileController::class);

    Route::resource('ticket-replies', TicketReplyController::class);

    Route::post('task-report-chart', [TaskReportController::class, 'taskChartData'])->name('task-report.chart');
    Route::resource('task-report', TaskReportController::class);

    Route::post('time-log-report-chart', [TimelogReportController::class, 'timelogChartData'])->name('time-log-report.chart');

    Route::get('time-log-report/{project_id}/{employee_id}', [TimelogReportController::class, 'show'])->where([
        'project_id' => '[0-9]+',
        'employee_id' => '[0-9]+',
    ]);

    Route::get('time-log-report/{any?}', [TimelogReportController::class, 'index'])->where('any', '.*');
    Route::resource('time-log-report', TimelogReportController::class);
    Route::post('finance-report-chart', [FinanceReportController::class, 'financeChartData'])->name('finance-report.chart');
    Route::resource('finance-report', FinanceReportController::class);

    Route::resource('income-expense-report', IncomeVsExpenseReportController::class);

    Route::resource('leave-report', LeaveReportController::class);

    Route::resource('attendance-report', AttendanceReportController::class);

    Route::post('expense-report-chart', [ExpenseReportController::class, 'expenseChartData'])->name('expense-report.chart');
    Route::resource('expense-report', ExpenseReportController::class);

    Route::resource('sticky-notes', StickyNoteController::class);

    Route::post('show-notifications', [NotificationController::class, 'showNotifications'])->name('show_notifications');


    Route::get('gdpr/lead/approve-reject/{id}/{type}', [GdprSettingsController::class, 'approveRejectLead'])->name('gdpr.lead.approve_reject');
    Route::get('gdpr/customer/approve-reject/{id}/{type}', [GdprSettingsController::class, 'approveRejectClient'])->name('gdpr.customer.approve_reject');

    Route::post('gdpr-settings/apply-quick-action', [GdprSettingsController::class, 'applyQuickAction'])->name('gdpr_settings.apply_quick_action');
    Route::put('gdpr-settings.update-general', [GdprSettingsController::class, 'updateGeneral'])->name('gdpr_settings.update_general');

    Route::post('gdpr/store-consent', [GdprSettingsController::class, 'storeConsent'])->name('gdpr.store_consent');
    Route::get('gdpr/add-consent', [GdprSettingsController::class, 'AddConsent'])->name('gdpr.add_consent');
    Route::get('gdpr/edit-consent/{id}', [GdprSettingsController::class, 'editConsent'])->name('gdpr.edit_consent');

    Route::put('gdpr/update-consent/{id}', [GdprSettingsController::class, 'updateConsent'])->name('gdpr.update_consent');

    Route::delete('gdpr-settings/purpose-delete/{id}', [GdprSettingsController::class, 'purposeDelete'])->name('gdpr_settings.purpose_delete');

    Route::resource('gdpr-settings', GdprSettingsController::class);

    Route::post('gdpr/update-client-consent', [GdprController::class, 'updateClientConsent'])->name('gdpr.update_client_consent');
    Route::get('gdpr/export-data', [GdprController::class, 'downloadJson'])->name('gdpr.export_data');
    Route::resource('gdpr', GdprController::class);

    Route::get('all-notifications', [NotificationController::class, 'all'])->name('all_notfications');
    Route::post('mark-read', [NotificationController::class, 'markRead'])->name('mark_single_notification_read');
    Route::post('mark_notification_read', [NotificationController::class, 'markAllRead'])->name('mark_notification_read');

    // Update app

    //sales goal
    Route::get('/insights/deals', [InsightsController::class, 'DealConversion'])->name('insights-deals');

    Route::get('/insights/goals/get/{id}', [InsightsController::class, 'getGoal'])->name('insights-goals-get');
    Route::get('/insights/goal/get-goal-details/{data}', [InsightsController::class, 'get_goal_details'])->name('get_goal_details');

    Route::get('/insights/dashboard/get', [InsightsController::class, 'getDashboard'])->name('insights-dashboard-get');
    Route::post('update-settings/deleteFile', [UpdateAppController::class, 'deleteFile'])->name('update-settings.deleteFile');
    Route::get('update-settings/install', [UpdateAppController::class, 'install'])->name('update-settings.install');
    Route::get('update-settings/manual-update', [UpdateAppController::class, 'manual'])->name('update-settings.manual');
    Route::resource('search', SearchController::class);
    Route::resource('update-settings', UpdateAppController::class);
    //sales goal
    Route::get('/insights/sections/get', [InsightsController::class, 'getSection'])->name('insights-sections-get');
    Route::get('/insights/deal-details/{data}', [InsightsController::class, 'getGoalDetails'])->name('insights-goal-details');

    Route::get('/insights/{any}', [InsightsController::class, 'index'])->where('any', '.*');
    Route::resource('insights', InsightsController::class)->only(['index', 'show', 'create', 'store', 'edit', 'update', 'destroy']);
    Route::post('/insights/goals/add', [InsightsController::class, 'storeGoal'])->name('insights/goals/add');
    Route::post('/insights/goals/edit/{id}', [InsightsController::class, 'editGoal'])->name('insights/goals/edit');
    Route::post('/insights/goal-title/edit/title/{data}', [InsightsController::class, 'editGoalTitle'])->name('insights.goals-title.edit');
    Route::post('/insights/dashboards/add', [InsightsController::class, 'storeDashboard'])->name('insights/dashboards/add');
    //basic apis for react for data checking
    Route::get('/tasks/developer-task-history/{id}', [TimelogReportController::class,'DeveloperTaskHistory']);
    Route::get('/tasks/parent-task-subtasks/{id}', [TaskController::class,'CHeckSubtasks'])->name('check-subtasks');
    Route::post('/tasks/develoepr/report-issue', [TaskController::class,'DeveloperReportIssue'])->name('developer-report-issue');
    Route::post('/insights/sections/add', [InsightsController::class,'storeSection'])->name('insights/sections/add');
    Route::get('/developer/tracked-time-today/{id}',[TaskController::class,'DeveloperTrackedTime'])->name('developer-tracked-time');
    Route::post('/developer/stop-tasks-timer',[TaskController::class,'DeveloperStopTask'])->name('developer-stop-task');
    Route::get('/developer/tracked-time-this-task/{id}',[TaskController::class,'checkTaskTrackTime']);
    Route::get('/developer/in-progress-tasks/{id}',[TaskController::class,'DeveloperInprogressTask']);
    Route::get('/developer/check-editable-task/{id}',[TaskController::class,'checkEditableTask']);
    Route::get('/developer/check-editable-subtask/{id}',[TaskController::class,'checkEditableSubTask']);
    Route::get('/developer/primary-page-authorization-count/',[TaskController::class,'PrimaryPageAuthorization']);

    Route::get('/check-project-first-tasks/{id}',[TaskController::class,'checkfirstTask']);
    Route::get('/check-independent-task/{id}',[TaskController::class,'independenttask']);
    Route::post('/developer/checkout',[DashboardController::class,'DeveloperCheckOut'])->name('developer-check-out');



    //task type
    Route::get('/tasks-type',[TaskController::class,'getTasksType']);
    Route::put('/tasks-type-authorization/{id}',[TaskController::class,'taskTypeAuthorization']);

    Route::any('task/{id}/json', [TaskController::class, 'task_json'])->name('task.task_json');
    
    Route::resource('client-review', ClientReviewController::class);
    Route::resource('task-report-issues', IssuedTaskReportController::class);
    Route::get('get-task-report',[IssuedTaskReportController::class,'getTaskReport']);
    //cross departmental work
    Route::resource('cross-dept-work',CrossDeptWork::class);
    Route::get('view-web-content',[CrossDeptWork::class,'adminViewWebContent'])->name('adminViewWebContent');
    Route::get('view-blog-article',[CrossDeptWork::class,'adminViewBlogArticle'])->name('adminViewBlogArticle');
    Route::get('view-product-description',[CrossDeptWork::class,'adminViewProductDescription'])->name('adminViewProductDescription');
    Route::get('view-product-category',[CrossDeptWork::class,'adminViewProductCategory'])->name('adminViewProductCategory');
    Route::get('view-basic-seo',[CrossDeptWork::class,'adminViewBasicSEO'])->name('adminViewBasicSEO');
    //task revisions
    Route::get('revision/{any?}', [RevisionController::class, 'index'])->where('any', '.*');
    Route::resource('revision',RevisionController::class);

    Route::resource('pm-payment-history',PmPaymentReleaseHistory::class);
    Route::post('pm-payment-history-filter-date',[PmPaymentReleaseHistory::class,'getMonthDate'])->name('getMonthDate');

    //Portfolio Section
    Route::get('/portfolio/filter-menu', [PortfolioController::class, 'get_filter_data'])->name("filter-menu");
    Route::get('/portfolio/data', [PortfolioController::class, 'get_portfolio_data'])->name("/portfolio/data");
    Route::get('/portfolio/{portfolio_id}', [PortfolioController::class, 'filterDataShow'])->name("/portfolio/{portfolio_id}");
    Route::resource('portfolio', PortfolioController::class);
    Route::get('/portfolio/get-sub-category/{website_cat_id}', [PortfolioController::class, 'getSubCategory']);
    Route::get('/filter-cms-categories', [PortfolioController::class, 'filterCmsCategories'])->name('filter-cms-categories');
    Route::get('/filter-data/{dataId}', [PortfolioController::class, 'filterDataShow']);

  //  Route::any('tasks/{any?}', [TaskController::class, 'home'])->where('any', '.*');
});

//custom route for seopage1
Route::get('/deals/client-form/{id}', [HomeController::class, 'deal']);
Route::get('/deals/details/{id}', [ContractController::class, 'dealDetails'])->name('dealDetails');
Route::get('/deals/details/edit/{id}', [ContractController::class, 'dealDetailsedit']);
Route::post('/deals/details/store', [ContractController::class, 'storedealDetails'])->name('store-deal-details');
Route::post('/deals/details/update', [ContractController::class, 'updatedealDetails'])->name('update-deal-details');
Route::post('/deals/deny', [ContractController::class, 'DealDeny'])->name('deny-deal');
Route::post('/deals/client-form', [HomeController::class, 'ClientForm'])->name('client-submission');
Route::post('/deals/client-form-submit', [ContractController::class, 'ClientFormSubmit'])->name('form-submit-to-client');
Route::get('/thankyou', [HomeController::class, 'Thankyou']);

    /*=========================> DIGITAL MERKTING DEALS DETAILS START <===========================*/
    Route::get('/dm-deals/details/{id}', [DMContractController::class, 'dmDealDetails'])->name('dm-dealDetails');
    Route::post('/dm-deals/details/store', [DMContractController::class, 'dmStoredealDetails'])->name('dm-store-deal-details');
    Route::get('/dm-deals/details/edit/{id}', [DMContractController::class, 'dmDealDetailsedit']);
    Route::post('/dm-deals/details/update', [DMContractController::class, 'updateDmDealDetails'])->name('dm-update-deal-details');
        /*=========================> DIGITAL MERKTING DEALS DETAILS END <===========================*/

//Service type section
Route::get('/deals/service-type/web-content/{id}/{random_id}', [HomeController::class, 'webContent']);
Route::post('/deals/link-store', [HomeController::class, 'storeLink'])->name('store-link');
Route::post('/deals/pm-link-store', [HomeController::class, 'storePmLink'])->name('store-pm-link');
Route::post('/deals/store/web-content', [HomeController::class, 'storeWebContent'])->name('store_web_content');
Route::get('/deals/service-type/blogs-articles/{id}/{random_id}', [HomeController::class, 'blogArticle']);
Route::post('/deals/store/blog-articles', [HomeController::class, 'storeBlogArticle'])->name('store_blog_articles');
Route::get('/deals/service-type/product-description/{id}/{random_id}', [HomeController::class, 'productDescription']);
Route::post('/deals/store/product-description', [HomeController::class, 'storeProductDescription'])->name('store_product_description');
Route::get('/deals/service-type/product-category/{id}/{random_id}', [HomeController::class, 'productCategory']);
Route::post('/deals/store/product-category', [HomeController::class, 'storeProductCategory'])->name('store_product_category');
Route::get('/deals/service-type/basic-seo/{id}/{random_id}', [HomeController::class, 'productBasicSeo']);
Route::post('/deals/store/basic-seo', [HomeController::class, 'storeProductBasicSeo'])->name('store_product_basic_seo');
/* Account prefix routes end here */
//store custom lead route for seaopage1
Route::post('/lead/store', [LeadController::class, 'storeLead'])->name('store-lead');
Route::post('/lead/update', [LeadController::class, 'updateLead'])->name('update-lead');

//deal stage creation
Route::get('/deal-stage/{id}', [LeadController::class, 'DealStage'])->name('deal-stage-create');
Route::get('/deal-stage-view/{id}', [LeadController::class, 'DealStageView']);
Route::post('/deal/stage', [LeadController::class, 'DealStageChange'])->name('deal-stage');
Route::post('/deal/stage/update', [LeadController::class, 'DealStageUpdate'])->name('deal-stage-update');
Route::post('/deal/stage/update/lost', [LeadController::class, 'DealStageUpdateLost'])->name('deal-stage-update-lost');
//lead to own deal
Route::post('/leads/deals/store', [ContractController::class, 'storeLeadDeal'])->name('store-deals-stage');
Route::post('/deals/milestone-store', [ContractController::class, 'storeMilestone'])->name('add-milestone');
Route::get('/deals/edit-milestone/{id}', [ContractController::class, 'editMilestone']);
Route::put('/deals/update-milestone/{id}', [ContractController::class, 'updateMilestone']);
Route::delete('/deals/delete-milestone/{id}', [ContractController::class, 'deleteMilestone']);
Route::get('/deals/milestone-get/{id}', [ContractController::class, 'Milestone']);
//task review
// cliend won the dele store
Route::post('/leads/client/deals/store', [ContractController::class, 'storeClientDeal'])->name('client-store-deals-stage');

//milestone route
Route::post('/milestone/complete', [ProjectMilestoneController::class, 'CompleteMilestone'])->name('milestone-complete');
Route::get('/project-overview/filter', [ProjectController::class, 'ProjectOverviewFilter'])->name('project-overview-filter');

//project deliverables

Route::get('/projects/deliverables/{id}', [ProjectController::class, 'deliverables']);
Route::get('/get-estimation-time/{deliverableId}', [ProjectController::class, 'deliverableEstimationTime']);
Route::get('/get-due-date/{deliverableId}', [ProjectController::class, 'deliverableDueDate']);
Route::post('/projects/time-extension', [ProjectController::class, 'timeExtension'])->name('project-time-extension');
Route::get('/projects/download/{id}', [ProjectController::class, 'download'])->name('projects.download');
Route::post('projects/sign/{id}', [ProjectController::class, 'sign'])->name('projects.sign');

Route::post('/projects/public/sign/{id}', [PublicUrlController::class, 'projectSign'])->name('front.project.sign');
Route::get('/projects/public/download/{id}', [PublicUrlController::class, 'projectDownload'])->name('front.project.download');


//project dekiverables
Route::post('/projects/add-deliverables/', [ProjectController::class, 'projectDeliverable'])->name('add-project-deliverable');
Route::post('/projects/update-deliverables/', [ProjectController::class, 'updateDeliverable'])->name('update-project-deliverable');
Route::get('/projects/delete-deliverables/{id}', [ProjectController::class, 'deleteDeliverable']);
Route::get('/projects/approve-deliverables/{id}', [ProjectController::class, 'approveDeliverable']);
Route::get('project/request/modificaiton/{id}', [ProjectController::class, 'modification_form_show'])->name('deliverables_modification_form');
Route::post('/projects/set/column/permissions', [ProjectController::class, 'set_column_edit_permission'])->name('deliverables_edit_permission');

//projectboard
Route::post('projectboards/collapseColumn', [ProjectBoardController::class, 'collapseColumn'])->name('projectboards.collapse_column');
Route::post('projectboards/updateIndex', [ProjectBoardController::class, 'updateIndex'])->name('projectboards.update_index');
Route::get('projectboards/loadMore', [ProjectBoardController::class, 'loadMore'])->name('projectboards.load_more');
Route::resource('projectboards', ProjectBoardController::class);
Route::post('update-items', [ProjectBoardController::class, 'updateItems'])->name('update.items');

//project dispute
Route::get('/projects/dispute/{id}', [ProjectController::class, 'Dispute'])->name('projects.dispute');
Route::get('/projects/dispute/view/{id}', [ProjectController::class, 'DisputeView'])->name('projects.dispute.form');
Route::post('/projects/dispute/store', [ProjectController::class, 'storeDispute'])->name('store-dispute');
Route::post('/projects/dispute/authorization', [ProjectController::class, 'storeDisputeAuthorization'])->name('dispute-authorization');
// deal comments store
Route::post('/deals/comments', [DealController::class, 'comments'])->name('post-comment');

//project incomplete
Route::post('/acoounts/projects/incomplete', [ProjectController::class, 'InComplete'])->name('project-incomplete');
// project Q&C
Route::get('/projects/q&c/{id}/{milestone_id}', [ProjectController::class, 'qc'])->name('qc_form');
//project completion form
Route::get('/projects/project-completion/{id}', [ProjectController::class, 'ProjectCompletion']);
Route::post('/acoounts/project-completion/store', [ProjectController::class, 'ProjectCompletionSubmit'])->name('project-completion');
Route::get('/projects/project-completion/get-sub-niche/{niche_id}', [ProjectController::class, 'getSubNiches']);
//Route::post('/projects/project-completion/search-niche', [ProjectController::class, 'searchNiche'])->name('search_niche');
Route::post('/projects/project-completion/filter-subcategories', [ProjectController::class, 'filterSubcategories'])->name('filter_subcategories');


//Project request extension

Route::get('/projects/request-extension/{id}', [ProjectController::class, 'requestExtension'])->name('request-extension');
Route::post('/projects/store-request-extension', [ProjectController::class, 'storeRequestExtension'])->name('store-request-extension');
Route::post('/projects/approved-request-extension', [ProjectController::class, 'approvedRequestExtension'])->name('approved-request-extension');
Route::post('/projects/deny-request-extension', [ProjectController::class, 'denyRequestExtension'])->name('deny-request-extension');


Route::get('/project-deadline-extension-request', [ProjectController::class, 'projectDeadlineExtension'])->name('project-deadline-extension');
Route::get('/project-deadline-extension', [ProjectController::class, 'pDERequest'])->name('pde-request');
Route::post('store-project-deadline-exp', [ProjectController::class, 'storeProjectDeadline'])->name('store-project-deadline-exp');
Route::get('/project-deadline-extension-authorization', [ProjectController::class, 'pDExtensionAuthorization'])->name('pde-authorization');
Route::post('store-project-deadline-exp-auth', [ProjectController::class, 'storeAuthorization'])->name('store-pde-authorization');
Route::get('/project-deadline-ext-view', [ProjectController::class, 'pDExtensionView'])->name('project-deadline-ext-view');

//add project niche
Route::get('/projects/view-category', [ProjectController::class, 'viewCategory'])->name('project-view-category');
Route::get('/projects/get-sub-category/{id}', [ProjectController::class, 'parentCategoryId']);
Route::put('/projects/update-niche-category/{id}', [ProjectController::class, 'updateCategory']);

//add project cms
Route::get('/projects/view-cms', [ProjectController::class, 'viewCms'])->name('project-view-cms');
Route::post('/projects/add-cms', [ProjectController::class, 'storeCms'])->name('add-cms');
Route::put('/projects/update-cms/{id}', [ProjectController::class, 'updateCms']);

//add project website type
Route::get('/projects/view-website-type', [ProjectController::class, 'viewWebsiteType'])->name('project-view-website-type');
Route::post('/projects/add-website-type', [ProjectController::class, 'storeWebsiteType'])->name('add-website-type');
Route::put('/projects/update-website-type/{id}', [ProjectController::class, 'updateWebsiteType']);

//add project website theme
Route::get('/projects/view-website-theme', [ProjectController::class, 'viewWebsiteTheme'])->name('project-view-website-theme');
Route::post('/projects/add-website-theme', [ProjectController::class, 'storeWebsiteTheme'])->name('add-website-theme');
Route::put('/projects/update-website-theme/{id}', [ProjectController::class, 'updateWebsiteTheme']);

//add project website plugin
Route::get('/projects/view-website-plugin', [ProjectController::class, 'viewWebsitePlugin'])->name('project-view-website-plugin');
Route::post('/projects/add-website-plugin', [ProjectController::class, 'storeWebsitePlugin'])->name('add-website-plugin');
Route::put('/projects/update-website-plugin/{id}', [ProjectController::class, 'updateWebsitePlugin']);


//Cross Departmental Work
Route::get('/projects/web-content-view/{id}', [ProjectController::class, 'viewWebContent'])->name('viewWebContent');
Route::get('/projects/blog-article-view/{id}', [ProjectController::class, 'viewBlogArticle'])->name('viewBlogArticle');
Route::get('/projects/product-description-view/{id}', [ProjectController::class, 'viewProductDescription'])->name('viewProductDescription');
Route::get('/projects/product-category-collection-view/{id}', [ProjectController::class, 'viewProductCategoryCollection'])->name('viewProductCategoryCollection');
Route::get('/projects/basic-seo-view/{id}', [ProjectController::class, 'viewBasicSEO'])->name('viewBasicSEO');

// Service type Edit
Route::get('/projects/web-content-edit/{id}', [ProjectController::class, 'EditWebContent'])->name('EditWebContent');
Route::get('/projects/blog-article-edit/{id}', [ProjectController::class, 'EditBlogArticle'])->name('EditBlogArticle');
Route::get('/projects/product-description-edit/{id}', [ProjectController::class, 'EditProductDescription'])->name('EditProductDescription');
Route::get('/projects/product-category-edit/{id}', [ProjectController::class, 'EditProductCategory'])->name('EditProductCategory');
Route::get('/projects/basic-seo-edit/{id}', [ProjectController::class, 'EditBasicSEO'])->name('EditBasicSEO');

// Service type Update
Route::put('/projects/update-sales-web-content/{id}', [ProjectController::class, 'updateSalesWebContent']);
Route::put('/projects/update-sales-page-list/{id}', [ProjectController::class, 'updateSalesWebContentPageList']);
Route::put('/projects/update-sales-reference-website/{id}', [ProjectController::class, 'updateSalesWebContentReferenceWebsite']);
Route::put('/projects/update-sales-business-information/{id}', [ProjectController::class, 'updateSalesWebContentBusinessInfo']);
Route::put('/projects/update-sales-demographic-information/{id}', [ProjectController::class, 'updateSalesWebContentDemographicInfo']);

Route::put('/projects/update-sales-blog-article/{id}', [ProjectController::class, 'updateSalesBlogArticle']);
Route::put('/projects/update-sales-blog-article-business-info/{id}', [ProjectController::class, 'updateSalesBlogArticleBusinessInfo']);
Route::put('/projects/update-sales-blog-article-reference-blog/{id}', [ProjectController::class, 'updateSalesBlogArticleReferenceblog']);
Route::put('/projects/update-sales-blog-article-topics-info/{id}', [ProjectController::class, 'updateSalesBlogArticleTopiceInfo']);
Route::put('/projects/update-sales-blog-article-keywords-info/{id}', [ProjectController::class, 'updateSalesBlogArticleKeywordsInfo']);

Route::post('/projects/update-pm-web-content', [ProjectController::class, 'updatePmWebContent'])->name('pm_web_content_update');
Route::post('/projects/update-pm-blog-article', [ProjectController::class, 'updatePmBlogArticle'])->name('pm_blog_article_update');
Route::post('/projects/update-pm-product_description', [ProjectController::class, 'updatePmProductDescription'])->name('pm_product_description_update');
Route::post('/projects/update-pm-product_category', [ProjectController::class, 'updatePmProductCategory'])->name('pm_product_category_update');
Route::post('/projects/update-pm-basic-seo', [ProjectController::class, 'updatePmBasicSEO'])->name('pm_basic_seo_update');

Route::put('/projects/update-product-description/{id}', [ProjectController::class, 'updateProductDescription']);
Route::put('/projects/update-sales-product-description-business-info/{id}', [ProjectController::class, 'updateSalesProductDescriptionBusinessInfo']);
Route::put('/projects/update-sales-product-description-reference-blog/{id}', [ProjectController::class, 'updateSalesProductDescriptionReferenceblog']);
Route::put('/projects/update-sales-product-description-product-list/{id}', [ProjectController::class, 'updateSalesProductDescriptionProductList']);

Route::put('/projects/update-product-category/{id}', [ProjectController::class, 'updateProductCategory']);
Route::put('/projects/update-sales-product-category-business-info/{id}', [ProjectController::class, 'updateSalesProductCategoryBusinessInfo']);
Route::put('/projects/update-sales-product-category-reference-blog/{id}', [ProjectController::class, 'updateSalesProductCategoryReferenceblog']);
Route::put('/projects/update-sales-product-category-product-list/{id}', [ProjectController::class, 'updateSalesProductCategoryProductList']);

Route::put('/projects/update-basic-seo/{id}', [ProjectController::class, 'updateBasicSEO']);
Route::put('/projects/update-sales-basic-seo-google-search/{id}', [ProjectController::class, 'updateSalesBasicSeoGoogleSearch']);
Route::put('/projects/update-sales-basic-seo-google-analytic/{id}', [ProjectController::class, 'updateSalesBasicSeoGoogleAnalytic']);
Route::put('/projects/update-sales-basic-seo-google-account-info/{id}', [ProjectController::class, 'updateSalesBasicSeoGoogleAccountInfo']);
Route::put('/projects/update-sales-basic-seo-cms/{id}', [ProjectController::class, 'updateSalesBasicSeoShareCms']);
Route::get('/project-challenge/{id}', [ProjectController::class, 'ProjectChallenge'])->name('project-challenge');



//add project niche
Route::post('/projects/niche-store', [ProjectController::class, 'storeNiche'])->name('add-niche');
Route::get('/projects/niches', [ProjectController::class, 'Niche'])->name('get-niche');
Route::delete('/projects/delete-niche/{id}', [ProjectController::class, 'deleteNiche']);

//project credentials
Route::get('project-credentials/{id}', [ProjectCredential::class, 'index'])->name('project_credential');
//Route::resource('project-credentials',ProjectCredential::class);

//top-management project accept/deny
Route::post('/projects/accept/', [ProjectController::class, 'ProjectAccept'])->name('project-accept');
Route::post('/projects/deny/', [ProjectController::class, 'ProjectDeny'])->name('project-deny');

//project submission accept/deny
Route::post('/projects/submission-accept/', [ProjectController::class, 'ProjectSubmissionAccept'])->name('project-submit-accept');
Route::post('/projects/qc-submit/', [ProjectController::class, 'ProjectSubmissionQC'])->name('submit-qc-form');

Route::post('/projects/qc-submission-accept/', [ProjectController::class, 'ProjectQcSubmissionAccept'])->name('project-qc-accept');
Route::post('/deals/update', [ContractController::class, 'UpdateDealID'])->name('update-deal-id');
Route::post('/users/project-enable-disable', [EmployeeController::class, 'ProjectEnable'])->name('project-assign');

Route::get('/get-deliverable/{milestone_id}', [TaskController::class, 'get_deliverable']);
Route::post('/deliverable-authorization-request', [ProjectController::class, 'DeliverableAuthorizationRequest'])->name('deliverable-authorization-request');
Route::post('/deliverable-authorization-accept', [ProjectController::class, 'DeliverableAuthorizationAccept'])->name('deliverable-authorization-accept');
Route::get('/projects/send-final-authorization-deliverables/{id}', [ProjectController::class, 'DeliverableFinalAuthorizationSend']);
Route::post('/deliverable-final-authorization-accept', [ProjectController::class, 'DeliverableFinalAuthorizationAccept'])->name('deliverable-final-authorization-accept');
Route::get('update/timer/box/set/{status}', [HomeController::class, 'timer_session_set'])->whereIn('status', ['on', 'off'])->name('home.timer_session_set');


Route::controller(DealController::class)->group(function () {

    Route::get('search-client', 'SearchClient')->name('client-search');
});
//milestone cancellation
Route::post('/cancel-milestone', [ProjectMilestoneController::class, 'CancelMilestone'])->name('cancel-milestone');
Route::post('/cancel-milestone-approve', [ProjectMilestoneController::class, 'CancelMilestoneApprove'])->name('cancel-milestone-approve');
//create auto milestonesw
Route::post('/create-auto-milestone', [ProjectMilestoneController::class, 'createAutoMilestone'])->name('create-auto-milestone');
Route::post('get-timelogs/time_log_history', [TimelogReportController::class, 'timelog_history'])->name('get-timelogs-report');
Route::any('get-timelogs/{type}', [TimelogReportController::class, 'getTimeLog'])->whereIn('type', ['tasks', 'projects', 'employees'])->name('get-timelogs');





Route::any('get-users', [InsightsController::class, 'getusers'])->name('get-users');
Route::get('get-teams', [InsightsController::class, 'getteam'])->name('get-teams');
Route::get('get-users/all', [InsightsController::class, 'get_users_all'])->name('get_users_all');
Route::get('get-user/{id}', [InsightsController::class, 'get_users_by_id'])->name('get_users_by_id');

//Team Routes
Route::post('team/apply-quick-action', [Seopage1TeamController::class, 'applyQuickAction'])->name('teams.apply_quick_action');
Route::get('team/department-hierarchy', [Seopage1TeamController::class, 'hierarchyData'])->name('team.hierarchy');
Route::post('team/changeParent', [Seopage1TeamController::class, 'changeParent'])->name('team.changeParent');
Route::get('team/search', [Seopage1TeamController::class, 'searchTeam'])->name('teams.search');
Route::resource('teams', Seopage1TeamController::class);
Route::post('/get-employees-by-department', [Seopage1TeamController::class, 'getEmployeesByDepartment'])->name('getEmployeesByDepartment');

Route::post('/get-employees-by-parentteam', [Seopage1TeamController::class, 'getEmployeesByParentTeam'])->name('getEmployeesByParentTeam');

Route::get('/projects/agreement/{hash}', [HomeController::class, 'agreement'])->name('front.agreement');
Route::post('/projects/agreement/disagree/{hash}', [HomeController::class, 'agreement_disagree'])->name('front.agreement.disagree');


Route::get('/deals/get-data', [HomeController::class, 'deals_data'])->name('deals_data');


// Route::get('/goal/get-goal-details/{data}', [InsightsController::class, 'get_goal_details'])->name('get_goal_details');
Route::get('deals/request/authorization/{data}', [ContractController::class, 'authorization_request'])->name('authorization_request');
Route::post('/authorization/deal-details/', [ContractController::class, 'authorization_submit'])->name('authorization_submit');


//Route::get('fix-database', [HomeController::class, 'fix_database'])->name('fix_database');
Route::get('search-bar-filter', [PointsController::class, 'get_all_search_bar_data']);
Route::get('get-board-column-list', [TimelogReportController::class, 'board_column_json'])->name('board_column_json');
Route::post('/upload', [HomeController::class, 'upload'])->name('upload');
//task guidelines routes
Route::get('/task-guideline-approved-authorization/{id}', [TaskController::class, 'taskGuidelineApprovedAuthorization']);
Route::get('/task-guideline-deny-authorization/{id}', [TaskController::class, 'taskGuidelineDenyAuthorization']);
Route::put('/task-guideline-update/{id}', [TaskController::class, 'updateTaskGuideline']);
Route::get('/task-guideline-authorization/{id}', [TaskController::class, 'taskGuidelineAuthorization']);
Route::get('/server-time-status', [TaskController::class, 'dailyServerStatus']);

