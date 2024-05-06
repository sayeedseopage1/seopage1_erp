<?php

namespace App\Providers;

use App\Events\AttendanceReminderEvent;
use App\Events\AutoFollowUpReminderEvent;
use App\Events\AutoTaskReminderEvent;
use App\Events\ContractSignedEvent;
use App\Events\DiscussionEvent;
use App\Events\DiscussionReplyEvent;
use App\Events\EmployeeShiftChangeEvent;
use App\Events\EmployeeShiftScheduleEvent;
use App\Events\EstimateDeclinedEvent;
use App\Events\EventInviteEvent;
use App\Events\EventReminderEvent;
use App\Events\FileUploadEvent;
use App\Events\InvitationEmailEvent;
use App\Events\InvoicePaymentReceivedEvent;
use App\Events\InvoiceReminderAfterEvent;
use App\Events\InvoiceReminderEvent;
use App\Events\InvoiceUpdatedEvent;
use App\Events\LeadEvent;
use App\Events\LeaveEvent;
use App\Events\MilestoneAddedEvent;
use App\Events\NewChatEvent;
use App\Events\NewContractEvent;
use App\Events\NewCreditNoteEvent;
use App\Events\NewEstimateEvent;
use App\Events\NewExpenseEvent;
use App\Events\NewExpenseRecurringEvent;
use App\Events\NewInvoiceEvent;
use App\Events\NewInvoiceRecurringEvent;
use App\Events\NewIssueEvent;
use App\Events\NewNoticeEvent;
use App\Events\NewOrderEvent;
use App\Events\NewPaymentEvent;
use App\Events\NewProductPurchaseEvent;
use App\Events\NewProjectEvent;
use App\Events\NewProjectMemberEvent;
use App\Events\NewProposalEvent;
use App\Events\NewUserEvent;
use App\Events\NewUserRegistrationViaInviteEvent;
use App\Events\OrderUpdatedEvent;
use App\Events\PaymentReminderEvent;
use App\Events\ProjectReminderEvent;
use App\Events\RemovalRequestAdminEvent;
use App\Events\RemovalRequestAdminLeadEvent;
use App\Events\RemovalRequestApprovedRejectLeadEvent;
use App\Events\RemovalRequestApprovedRejectUserEvent;
use App\Events\RemovalRequestApproveRejectEvent;
use App\Events\SubTaskCompletedEvent;
use App\Events\TaskCommentEvent;
use App\Events\TaskEvent;
use App\Events\TaskNoteEvent;
use App\Events\TaskReminderEvent;
use App\Events\TicketEvent;
use App\Events\TicketReplyEvent;
use App\Events\TicketRequesterEvent;
use App\Events\TwoFactorCodeEvent;
use App\Listeners\AttendanceReminderListener;
use App\Listeners\AutoFollowUpReminderListener;
use App\Listeners\AutoTaskReminderListener;
use App\Listeners\ContractSignedListener;
use App\Listeners\DiscussionListener;
use App\Listeners\DiscussionReplyListener;
use App\Listeners\EmployeeShiftChangeListener;
use App\Listeners\EmployeeShiftScheduleListener;
use App\Listeners\EstimateDeclinedListener;
use App\Listeners\EventInviteListener;
use App\Listeners\EventReminderListener;
use App\Listeners\FileUploadListener;
use App\Listeners\InvitationEmailListener;
use App\Listeners\InvoicePaymentReceivedListener;
use App\Listeners\InvoiceReminderAfterListener;
use App\Listeners\InvoiceReminderListener;
use App\Listeners\InvoiceUpdatedListener;
use App\Listeners\LeadListener;
use App\Listeners\LeaveListener;
use App\Listeners\LogSuccessfulLogin;
use App\Listeners\MilestoneAddedEventListener;
use App\Listeners\NewChatListener;
use App\Listeners\NewContractListener;
use App\Listeners\NewCreditNoteListener;
use App\Listeners\NewEstimateListener;
use App\Listeners\NewExpenseListener;
use App\Listeners\NewExpenseRecurringListener;
use App\Listeners\NewInvoiceListener;
use App\Listeners\NewInvoiceRecurringListener;
use App\Listeners\NewIssueListener;
use App\Listeners\NewNoticeListener;
use App\Listeners\NewOrderListener;
use App\Listeners\NewPaymentListener;
use App\Listeners\NewProductPurchaseListener;
use App\Listeners\NewProjectListener;
use App\Listeners\NewProjectMemberListener;
use App\Listeners\NewProposalListener;
use App\Listeners\NewUserListener;
use App\Listeners\NewUserRegistrationViaInviteListener;
use App\Listeners\OrderUpdatedListener;
use App\Listeners\PaymentReminderListener;
use App\Listeners\ProjectReminderListener;
use App\Listeners\RemovalRequestAdminLeadListener;
use App\Listeners\RemovalRequestAdminListener;
use App\Listeners\RemovalRequestApprovedRejectLeadListener;
use App\Listeners\RemovalRequestApprovedRejectListener;
use App\Listeners\RemovalRequestApprovedRejectUserListener;
use App\Listeners\SubTaskCompletedListener;
use App\Listeners\TaskCommentListener;
use App\Listeners\TaskListener;
use App\Listeners\TaskNoteListener;
use App\Listeners\TaskReminderListener;
use App\Listeners\TicketListener;
use App\Listeners\TicketReplyListener;
use App\Listeners\TicketRequesterListener;
use App\Listeners\TwoFactorCodeListener;
use App\Models\Attendance;
use App\Models\ClientContact;
use App\Models\ClientDetails;
use App\Models\ClientDocument;
use App\Models\ClientNote;
use App\Models\ClientUserNote;
use App\Models\Contract;
use App\Models\ContractDiscussion;
use App\Models\ContractFile;
use App\Models\ContractRenew;
use App\Models\CreditNotes;
use App\Models\CustomField;
use App\Models\Discussion;
use App\Models\DiscussionCategory;
use App\Models\DiscussionReply;
use App\Models\EmployeeDetails;
use App\Models\EmployeeDocument;
use App\Models\EmployeeShift;
use App\Models\EmployeeShiftChangeRequest;
use App\Models\EmployeeShiftSchedule;
use App\Models\Estimate;
use App\Models\Event;
use App\Models\Expense;
use App\Models\ExpenseRecurring;
use App\Models\Holiday;
use App\Models\Invoice;
use App\Models\InvoiceSetting;
use App\Models\Issue;
use App\Models\Lead;
use App\Models\LeadAgent;
use App\Models\LeadCategory;
use App\Models\LeadCustomForm;
use App\Models\LeadFiles;
use App\Models\LeadFollowUp;
use App\Models\LeadNote;
use App\Models\LeadSource;
use App\Models\LeadStatus;
use App\Models\Leave;
use App\Models\LeaveType;
use App\Models\Notice;
use App\Models\Order;
use App\Models\Payment;
use App\Models\PermissionRole;
use App\Models\Pinned;
use App\Models\Product;
use App\Models\ProductFiles;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\ProjectFile;
use App\Models\ProjectMember;
use App\Models\ProjectMilestone;
use App\Models\ProjectNote;
use App\Models\ProjectRating;
use App\Models\ProjectTimeLog;
use App\Models\ProjectTimeLogBreak;
use App\Models\Proposal;
use App\Models\RecurringInvoice;
use App\Models\RemovalRequest;
use App\Models\RemovalRequestLead;
use App\Models\SubTask;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\TaskCategory;
use App\Models\TaskComment;
use App\Models\TaskFile;
use App\Models\TaskLabelList;
use App\Models\TaskNote;
use App\Models\TaskUser;
use App\Models\Ticket;
use App\Models\TicketReply;
use App\Models\User;
use App\Models\UserChat;
use App\Models\UserInvitation;
use App\Models\UserPermission;
use App\Observers\AttendanceObserver;
use App\Observers\ClientContactObserver;
use App\Observers\ClientDetailsObserver;
use App\Observers\ClientDocumentObserver;
use App\Observers\ClientNoteObserver;
use App\Observers\ClientUserNotesObserver;
use App\Observers\ContractDiscussionObserver;
use App\Observers\ContractFileObserver;
use App\Observers\ContractObserver;
use App\Observers\ContractRenewObserver;
use App\Observers\CreditNoteObserver;
use App\Observers\CustomFieldsObserver;
use App\Observers\DiscussionCategoryObserver;
use App\Observers\DiscussionObserver;
use App\Observers\DiscussionReplyObserver;
use App\Observers\EmployeeDetailsObserver;
use App\Observers\EmployeeDocsObserver;
use App\Observers\EmployeeShiftChangeObserver;
use App\Observers\EmployeeShiftObserver;
use App\Observers\EmployeeShiftScheduleObserver;
use App\Observers\EstimateObserver;
use App\Observers\EventObserver;
use App\Observers\ExpenseObserver;
use App\Observers\ExpenseRecurringObserver;
use App\Observers\FileUploadObserver;
use App\Observers\HolidayObserver;
use App\Observers\InvoiceObserver;
use App\Observers\InvoiceRecurringObserver;
use App\Observers\InvoiceSettingObserver;
use App\Observers\IssueObserver;
use App\Observers\LeadAgentObserver;
use App\Observers\LeadCategoryObserver;
use App\Observers\LeadCustomFormObserver;
use App\Observers\LeadFileObserver;
use App\Observers\LeadFollowUpObserver;
use App\Observers\LeadNoteObserver;
use App\Observers\LeadObserver;
use App\Observers\LeadSourceObserver;
use App\Observers\LeadStatusObserver;
use App\Observers\LeaveObserver;
use App\Observers\LeaveTypeObserver;
use App\Observers\NewChatObserver;
use App\Observers\NoticeObserver;
use App\Observers\OrderObserver;
use App\Observers\PaymentObserver;
use App\Observers\PermissionRoleObserver;
use App\Observers\PinnedObserver;
use App\Observers\ProductFileObserver;
use App\Observers\ProductObserver;
use App\Observers\ProjectCategoryObserver;
use App\Observers\ProjectMemberObserver;
use App\Observers\ProjectMilestoneObserver;
use App\Observers\ProjectNoteObserver;
use App\Observers\ProjectObserver;
use App\Observers\ProjectRatingObserver;
use App\Observers\ProjectTimelogBreakObserver;
use App\Observers\ProjectTimelogObserver;
use App\Observers\ProposalObserver;
use App\Observers\RemovalRequestLeadObserver;
use App\Observers\RemovalRequestObserver;
use App\Observers\SubTaskObserver;
use App\Observers\TaskBoardColumnObserver;
use App\Observers\TaskCategoryObserver;
use App\Observers\TaskCommentObserver;
use App\Observers\TaskFileObserver;
use App\Observers\TaskLabelListObserver;
use App\Observers\TaskNoteObserver;
use App\Observers\TaskObserver;
use App\Observers\TaskUserObserver;
use App\Observers\TicketObserver;
use App\Observers\TicketReplyObserver;
use App\Observers\UserInvitationObserver;
use App\Observers\UserObserver;
use App\Observers\UserPermissionObserver;
use Illuminate\Auth\Events\Login;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Login::class => [LogSuccessfulLogin::class],
        SubTaskCompletedEvent::class => [SubTaskCompletedListener::class],
        NewUserEvent::class => [NewUserListener::class],
        NewContractEvent::class => [NewContractListener::class],
        NewEstimateEvent::class => [NewEstimateListener::class],
        NewExpenseEvent::class => [NewExpenseListener::class],
        FileUploadEvent::class => [FileUploadListener::class],
        NewInvoiceEvent::class => [NewInvoiceListener::class],
        InvoiceUpdatedEvent::class => [InvoiceUpdatedListener::class],
        InvoicePaymentReceivedEvent::class => [InvoicePaymentReceivedListener::class],
        NewIssueEvent::class => [NewIssueListener::class],
        LeaveEvent::class => [LeaveListener::class],
        NewChatEvent::class => [NewChatListener::class],
        NewNoticeEvent::class => [NewNoticeListener::class],
        NewPaymentEvent::class => [NewPaymentListener::class],
        NewProjectMemberEvent::class => [NewProjectMemberListener::class],
        RemovalRequestAdminLeadEvent::class => [RemovalRequestAdminLeadListener::class],
        RemovalRequestAdminEvent::class => [RemovalRequestAdminListener::class],
        RemovalRequestApprovedRejectLeadEvent::class => [RemovalRequestApprovedRejectLeadListener::class],
        RemovalRequestApprovedRejectUserEvent::class => [RemovalRequestApprovedRejectUserListener::class],
        TaskCommentEvent::class => [TaskCommentListener::class],
        TaskNoteEvent::class => [TaskNoteListener::class],
        TaskEvent::class => [TaskListener::class],
        TicketEvent::class => [TicketListener::class],
        TicketReplyEvent::class => [TicketReplyListener::class],
        EventInviteEvent::class => [EventInviteListener::class],
        ProjectReminderEvent::class => [ProjectReminderListener::class],
        PaymentReminderEvent::class => [PaymentReminderListener::class],
        AutoTaskReminderEvent::class => [AutoTaskReminderListener::class],
        TaskReminderEvent::class => [TaskReminderListener::class],
        EventReminderEvent::class => [EventReminderListener::class],
        LeadEvent::class => [LeadListener::class],
        DiscussionReplyEvent::class => [DiscussionReplyListener::class],
        DiscussionEvent::class => [DiscussionListener::class],
        EstimateDeclinedEvent::class => [EstimateDeclinedListener::class],
        NewProposalEvent::class => [NewProposalListener::class],
        TicketRequesterEvent::class => [TicketRequesterListener::class],
        RemovalRequestApproveRejectEvent::class => [RemovalRequestApprovedRejectListener::class],
        NewExpenseRecurringEvent::class => [NewExpenseRecurringListener::class],
        NewInvoiceRecurringEvent::class => [NewInvoiceRecurringListener::class],
        NewCreditNoteEvent::class => [NewCreditNoteListener::class],
        NewProjectEvent::class => [NewProjectListener::class],
        NewProductPurchaseEvent::class => [NewProductPurchaseListener::class],
        InvitationEmailEvent::class => [InvitationEmailListener::class],
        InvoiceReminderEvent::class => [InvoiceReminderListener::class],
        InvoiceReminderAfterEvent::class => [InvoiceReminderAfterListener::class],
        AttendanceReminderEvent::class => [AttendanceReminderListener::class],
        NewOrderEvent::class => [NewOrderListener::class],
        OrderUpdatedEvent::class => [OrderUpdatedListener::class],
        NewUserRegistrationViaInviteEvent::class => [NewUserRegistrationViaInviteListener::class],
        AutoFollowUpReminderEvent::class => [AutoFollowUpReminderListener::class],
        ContractSignedEvent::class => [ContractSignedListener::class],
        EmployeeShiftScheduleEvent::class => [EmployeeShiftScheduleListener::class],
        EmployeeShiftChangeEvent::class => [EmployeeShiftChangeListener::class],
        TwoFactorCodeEvent::class => [TwoFactorCodeListener::class],
        MilestoneAddedEvent::class => [MilestoneAddedEventListener::class]
    ];

    protected $observers = [
        Attendance::class => [AttendanceObserver::class],
        ClientContact::class => [ClientContactObserver::class],
        ClientDetails::class => [ClientDetailsObserver::class],
        ClientDocument::class => [ClientDocumentObserver::class],
        ClientNote::class => [ClientNoteObserver::class],
        ClientUserNote::class => [ClientUserNotesObserver::class],
        Contract::class => [ContractObserver::class],
        ContractDiscussion::class => [ContractDiscussionObserver::class],
        ContractFile::class => [ContractFileObserver::class],
        ContractRenew::class => [ContractRenewObserver::class],
        CreditNotes::class => [CreditNoteObserver::class],
        CustomField::class => [CustomFieldsObserver::class],
        Discussion::class => [DiscussionObserver::class],
        DiscussionCategory::class => [DiscussionCategoryObserver::class],
        DiscussionReply::class => [DiscussionReplyObserver::class],
        EmployeeDetails::class => [EmployeeDetailsObserver::class],
        EmployeeDocument::class => [EmployeeDocsObserver::class],
        EmployeeShift::class => [EmployeeShiftObserver::class],
        EmployeeShiftChangeRequest::class => [EmployeeShiftChangeObserver::class],
        EmployeeShiftSchedule::class => [EmployeeShiftScheduleObserver::class],
        Estimate::class => [EstimateObserver::class],
        Event::class => [EventObserver::class],
        Expense::class => [ExpenseObserver::class],
        ExpenseRecurring::class => [ExpenseRecurringObserver::class],
        Holiday::class => [HolidayObserver::class],
        Invoice::class => [InvoiceObserver::class],
        InvoiceSetting::class => [InvoiceSettingObserver::class],
        Issue::class => [IssueObserver::class],
        Lead::class => [LeadObserver::class],
        LeadAgent::class => [LeadAgentObserver::class],
        LeadCategory::class => [LeadCategoryObserver::class],
        LeadCustomForm::class => [LeadCustomFormObserver::class],
        LeadFiles::class => [LeadFileObserver::class],
        LeadFollowUp::class => [LeadFollowUpObserver::class],
        LeadNote::class => [LeadNoteObserver::class],
        LeadSource::class => [LeadSourceObserver::class],
        LeadStatus::class => [LeadStatusObserver::class],
        Leave::class => [LeaveObserver::class],
        LeaveType::class => [LeaveTypeObserver::class],
        Notice::class => [NoticeObserver::class],
        Order::class => [OrderObserver::class],
        Payment::class => [PaymentObserver::class],
        PermissionRole::class => [PermissionRoleObserver::class],
        Pinned::class => [PinnedObserver::class],
        Product::class => [ProductObserver::class],
        ProductFiles::class => [ProductFileObserver::class],
        Project::class => [ProjectObserver::class],
        ProjectCategory::class => [ProjectCategoryObserver::class],
        ProjectFile::class => [FileUploadObserver::class],
    //    / ProjectMember::class => [ProjectMemberObserver::class],
        ProjectMilestone::class => [ProjectMilestoneObserver::class],
        ProjectNote::class => [ProjectNoteObserver::class],
        ProjectRating::class => [ProjectRatingObserver::class],
        ProjectTimeLog::class => [ProjectTimelogObserver::class],
        ProjectTimeLogBreak::class => [ProjectTimelogBreakObserver::class],
        Proposal::class => [ProposalObserver::class],
        RecurringInvoice::class => [InvoiceRecurringObserver::class],
        RemovalRequest::class => [RemovalRequestObserver::class],
        RemovalRequestLead::class => [RemovalRequestLeadObserver::class],
        SubTask::class => [SubTaskObserver::class],
        Task::class => [TaskObserver::class],
        TaskboardColumn::class => [TaskBoardColumnObserver::class],
        TaskCategory::class => [TaskCategoryObserver::class],
        TaskComment::class => [TaskCommentObserver::class],
        TaskFile::class => [TaskFileObserver::class],
        TaskLabelList::class => [TaskLabelListObserver::class],
        TaskNote::class => [TaskNoteObserver::class],
        TaskUser::class => [TaskUserObserver::class],
        Ticket::class => [TicketObserver::class],
        TicketReply::class => [TicketReplyObserver::class],
        User::class => [UserObserver::class],
        UserChat::class => [NewChatObserver::class],
        UserInvitation::class => [UserInvitationObserver::class],
        UserPermission::class => [UserPermissionObserver::class],

    ];

}
