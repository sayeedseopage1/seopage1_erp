import dayjs from 'dayjs';
import { User } from './user-details';

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


// single task 
export class SingleTask {
    constructor(task){
        this.id = task?.id;
        this.title = _.startCase(task?.subtask_title);
        this.parentTaskTitle = _.startCase(task?.heading);
        this.projectName = _.startCase(task?.project_name);
        this.boardColumn = new BoardColumn(task?.board_column);
        this.assigneeTo = new User(task?.users?.[0]);
        this.assigneeBy = new User(task?.create_by);
        this.priority = _.startCase(task?.priority);
        this.startDate = task?.start_date;
        this.dueDate = task?.due_date;
        this.estimateHours = task?.estimate_hours;
        this.estimateMinutesa = task?.estimate_minutes;
        this.parentTaskTimeLog = task?.parent_task_time_log;
        this.subTaskTimeLog = task?.sub_task_time_log;
        this.totalTimeLog = task?.timeLog;
        this.milestoneID = Number(task?.milestone_id);
        this.milestoneTitle = _.startCase(task?.milestone_title);
        this.category = new Category(task?.category);
        this.guidelines = task?.project_summary;
        this.description = task?.description;
        this.subtask = task?.subtask;
        this.hasSubtask = task?.subtask_id ? true : false;
    }

    getSubtaskTitle(){
        return this.hasSubtask ? this.title : this.parentTaskTitle;
    }

    getStartDate(format){
        return this.startDate ? dayjs(this.startDate).format(format) : '--';
    }

    getDueDate(format){
        return this.dueDate ? dayjs(this.dueDate).format(format) : '--';
    }

    getEstimateTime(){
        if(this.estimateHours && this.estimateMinutesa){
            return `${this.estimateHours} hrs ${this.estimateMinutesa} mins`;
        }else if( !this.estimateHours && this.estimateMinutesa){
            return `${this.estimateMinutesa} mins`;
        }else{
            return `--`
        }
    }

}