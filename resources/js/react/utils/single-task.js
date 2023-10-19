import dayjs from 'dayjs';
import { User } from './user-details';
import _ from 'lodash';

// board column
export class BoardColumn{
    constructor(boardColume){
        this.id = boardColume?.id;
        this.columnName = boardColume?.column_name;
        this.labelColor = boardColume?.label_color;
        this.priority = boardColume?.priority;
        this.slug = boardColume?.slug;
    }


    getTaskStatusName(authRoleId, isSubtask){
        if(!isSubtask && this.id === 8 && _.includes([1, 4, 6], authRoleId)){
            return "Awaiting for Client Approval"
        }else return this.columnName;
    }
}


// category
export class Category{
    constructor(cat){
        this.name = _.startCase(cat?.category_name),
        this.addedBy = cat?.added_by,
        this.id = cat?.id;
    }
}

// sub task
export class SubmittedWork {
    constructor(task){
        this.id = task?.task_id;
        this.attaches = _.split(task?.attaches, ',');
        this.submittedLinkes = _.split(task?.links, ',');
        this.explaination = task?.text;
        this.submittionNo = task?.submission_no;
        this.submittedAt = task?.submission_date;
        this.user = {
            id: task?.user_id,
            name: task?.user_name || task?.name,
            avatar: task?.image ? `/user-uploads/avatar/${task?.image}` : null,
            profile: `/account/employees/${task?.user_id}`
        }
    }

    getSubmittionDate(format = 'MMM DD, YYYY'){
        return dayjs(this.submittedAt).format(format);
    }
}

// comment
export class Comment {
    constructor(data) {
      this.id = data?.id;
      this.comment = data?.comment;
      this.userId = data?.user_id;
      this.taskId = data?.task_id;
      this.addedBy = data?.added_by;
      this.lastUpdatedBy = data?.last_updated_by;
      this.totalReplies = data?.total_replies;
      this.lastUpdatedAt = data?.last_updated_at;
      this.replies = data?.replies;
      this.filesData = data?.files_data;
      this.user = new User(data?.user);
    }

    getLastUpdatedAt(format = 'MMM DD, YYYY'){
        return dayjs(this.lastUpdatedAt).format(format)
    }
}

// time log
export class TimeLog{
    constructor(data){
        this.id = data?.id;
        this.projectId = data?.project_id;
        this.taskId = data?.task_id;
        this.startTime = data?.start_time;
        this.endTime = data?.end_time;
        this.duration = data?.duration;
        this.hoursLogged = data?.hours_logged;
        this.timer = data?.timer;
        this.totalHours = data?.total_hours;
        this.totalMinutes = data?.total_minutes;
        this.breaks = data?.breaks;
        this.totalBreakMinutes = data?.total_break_minutes;
        this.earnings = data?.earnings;
        this.hourlyRate = data?.hourly_rate;
        this.invoiceId = data?.invoice_id;
        this.memo = data?.memo;
        this.userId = data?.user_id;
        this.addedBy = data?.added_by;
        this.editedByUser = data?.edited_by_user;
        this.approved = data?.approved;
        this.approvedBy = data?.approved_by;
        this.lastUpdatedBy = data?.last_updated_by;
        this.user = new User(data?.user);
    }

    getStartTime(format='MMM DD, YYYY'){
        return dayjs(this.startTime).format(format)
    }

    getEndTime(format='MMM DD, YYYY'){
        return dayjs(this.endTime).format(format)
    }
}


// project manager guideline

export class ProjectMangerGuideline {
    constructor(data){
        this.id = data?.id;
        this.theme_name = data?.theme_name;
        this.theme_details = data?.theme_details;
        this.theme_url = data?.theme_url;
        this.color = data?.color ? JSON.parse(data.color) : [];
        this.color_description = data?.color_description ? JSON.parse(data.color_description) : [];
        this.color_schema = data?.color_schema;
        this.created_at = data?.created_at;
        this.design = data?.design;
        this.drive_url = data?.drive_url;
        this.google_drive_link = data?.google_drive_link;
        this.instruction = data?.instruction;
        this.instruction_plugin = data?.instruction_plugin;
        this.plugin_name = data?.plugin_name;
        this.plugin_research = data?.plugin_research;
        this.plugin_url = data?.plugin_url;
        this.project_id = data?.project_id;
        this.reference_link = data?.reference_link;
        this.xd_url = data?.xd_url;
        this.updated_at = data?.updated_at;
        this.primary_color = data?.primary_color;
        this.primary_color_description = data?.primary_color_description
    }
}


// task revisions
// export class TaskRevision {
//     constructor(data) {
//       this.acceptAndContinue = data?.accept_statement;
//       this.addedBy = data?.added_by;
//       this.approvalStatus = data?.approval_status;
//       this.clientRevisionAcknowledgement = data?.client_revision_acknowledgement;
//       this.comment = data?.lead_comment;
//       this.createdAt = data?.created_at;
//       this.devComment = data?.dev_comment;
//       this.id = data?.id;
//       this.pmComment = data?.pm_comment;
//       this.projectId = data?.project_id;
//       this.revisionAcknowledgement = data?.revision_acknowledgement;
//       this.revisionNo = data?.revision_no;
//       this.revisionReason = data?.revision_reason;
//       this.revisionStatus = data?.revision_status;
//       this.taskId = data?.task_id;
//       this.updatedAt = data?.updated_at;
//       this.isDeniable = data?.is_deniable;
//       this.isDeny = data?.is_deny;
//       this.isAccept= data?.is_accept;
//     }
//   }

export class TaskRevision {
    constructor(data) {
        this.acknowledgementId = data.acknowledgement_id;
        this.addedBy = data.added_by;
        this.additionalAmount = data.additional_amount;
        this.additionalDenyComment = data.additional_deny_comment;
        this.additionalStatus = data.additional_status;
        this.approvalStatus = data.approval_status;
        this.clientPmDispute = data.client_pm_dispute;
        this.createdAt = data.created_at;
        this.denyReason = data.deny_reason;
        this.devComment = data.dev_comment;
        this.disputeBetween = data.dispute_between;
        this.disputeCreated = data.dispute_created;
        this.disputeId = data.dispute_id;
        this.disputeStatus = data.dispute_status;
        this.finalResponsiblePerson = data.final_responsible_person;
        this.id = data.id;
        this.isAccept = data.is_accept;
        this.isDeniable = data.is_deniable;
        this.isDeny = data.is_deny;
        this.leadComment = data.lead_comment;
        this.pmComment = data.pm_comment;
        this.projectId = data.project_id;
        this.revisionAcknowledgement = data.revision_acknowledgement;
        this.revisionNo = data.revision_no;
        this.revisionReason = data.revision_reason;
        this.revisionStatus = data.revision_status;
        this.saleAccept = data.sale_accept;
        this.saleComment = data.sale_comment;
        this.saleDeny = data.sale_deny;
        this.salePerson = data.sale_person;
        this.taskId = data.task_id;
        this.updatedAt = data.updated_at;
    }
  }



// single task
export class SingleTask {
    constructor(task){
        this.id = task?.id;
        this.title = _.startCase(task?.heading);
        this.parentTaskId = task?.parent_task_id;
        this.parentTaskTitle = _.startCase(task?.parent_task_title);
        this.projectName = _.startCase(task?.project_name);
        this.projectId = task?.project_id;
        this.boardColumn = new BoardColumn(task?.board_column);
        this.assigneeTo = new User(task?.users?.[0]);
        this.assigneeBy = new User(task?.create_by);
        this.priority = _.startCase(task?.priority);
        this.startDate = task?.start_date;
        this.dueDate = task?.due_date;
        this.estimateHours = task?.estimate_hours;
        this.estimateMinutes = task?.estimate_minutes;
        this.parentTaskTimeLog = task?.parent_task_time_log;
        this.subTaskTimeLog = task?.sub_task_time_log;
        this.totalTimeLog = task?.timeLog;
        this.milestoneID = Number(task?.milestone_id);
        this.milestoneTitle = task?.milestone_title;
        this.category = new Category(task?.category);
        this.guidelines = task?.project_summary;
        this.description = task?.description;
        this.subtask = task?.subtask;
        this.isSubtask = this.parentTaskId ? true : false;
        this.leadDeveloperParentTaskAction =  task?.parent_task_action;
        this.ranningTimer= task?.running_timer;
        this.workingEnvironment = task?.working_environment;
        this.workEnvData = task?.working_environment_data;
        this.hasProjectManagerGuideline = task?.pm_task_guideline ? true : false;
        this.clientName = task?.client_name;
        this.clientId = task?.clientId;
        this.PMTaskGuideline = new ProjectMangerGuideline(task?.pm_task_guideline);
        this.revisions = _.map(_.orderBy(task?.task_revisions, 'id', 'desc'), revision => new TaskRevision(revision));
        this.taskSubTask = task?.taskSubTask;
        this.taskType = task?.task_type;
        this.pageType = task?.page_type;
        this.pageName = task?.page_name;
        this.pageUrl = task?.page_url;
        this.subtaskId = task?.subtask_id;
        this.projectManagerId = task?.project_manager_id;
        this.projectManagerAvatar = task?.project_manager_avatar;
        this.projectManagerName = task?.project_manager_name;
        this.projectManagerDesignation = task?.pm_designation;
        this.subAcknowledgement = task?.sub_acknowledgement;
        this.acknowledgement = task?.acknowledgement;
        this.approvalStatus = task?.approval_status;
    }

    isLeadDeveloperAbleToSubmit () {
        let text = "Lead Developer Can not Complete Parent Task";
        let compareWith = _.lowerCase(text.replace(/\s/g, ''));
        let compareText  = _.lowerCase(this.leadDeveloperParentTaskAction.replace(/\s/g, ''));

        return  compareText === compareWith ? false : true
    }

    getSubtaskTitle(){
        return this.title;
    }

    getStartDate(format){
        return this.startDate ? dayjs(this.startDate).format(format) : '--';
    }

    getDueDate(format){
        return this.dueDate ? dayjs(this.dueDate).format(format) : '--';
    }

    getEstimateTime(){
        if(this.estimateHours && this.estimateMinutes){
            return `${this.estimateHours} hrs ${this.estimateMinutes} mins`;
        }else if(this.estimateHours && !this.estimateMinutes){
            return `${this.estimateHours} hrs ${this.estimateMinutes} mins`;
        }else if( !this.estimateHours && this.estimateMinutes){
            return `${this.estimateMinutes} mins`;
        }else{
            return `Not Provided!`
        }
    }
}
