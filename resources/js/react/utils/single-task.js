import dayjs from 'dayjs';
import { User } from './user-details';
import _ from 'lodash';

// board column
export class BoardColumn{
    constructor(boardColume){
        this.id = boardColume?.id;
        this.columnName = _.startCase(boardColume?.column_name);
        this.labelColor = boardColume?.label_color;
        this.priority = boardColume?.priority;
        this.slug = boardColume?.slug;
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
        this.id = task?.id;
        this.parentTaskId = task?.task_id;
        this.submittionType = task?.submission_type;
        this.attach = task?.attach;
        this.submittedLinkes = task?.link;
        this.explaination = task?.text;
        this.submittionNo = task?.submission_no;
        this.submittedAt = task.created_at;
        this.user = new User(task?.user); 
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
    }
}


// task revisions
export class TaskRevision {
    constructor(data) {
      this.acceptAndContinue = data?.accept_and_continue;
      this.addedBy = data?.added_by;
      this.approvalStatus = data?.approval_status;
      this.clientRevisionAcknowledgement = data?.client_revision_acknowledgement;
      this.comment = data?.comment;
      this.createdAt = data?.created_at;
      this.denyAndContinue = data?.deny_and_continue;
      this.devComment = data?.dev_comment;
      this.id = data?.id;
      this.pmComment = data?.pm_comment;
      this.projectId = data?.project_id;
      this.revisionAcknowledgement = data?.revision_acknowledgement;
      this.revisionNo = data?.revision_no;
      this.revisionReason = data?.revision_reason;
      this.revisionStatus = data?.revision_status;
      this.subtaskId = data?.subtask_id;
      this.taskId = data?.task_id;
      this.updatedAt = data?.updated_at;
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
        this.milestoneTitle = _.startCase(task?.milestone_title);
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
        this.PMTaskGuideline = new ProjectMangerGuideline(task?.pm_task_guideline);
        this.revisions = _.map(_.orderBy(task?.task_revisions, 'id', 'desc'), revision => new TaskRevision(revision)) 
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