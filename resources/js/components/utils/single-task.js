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


// single task 
export class SingleTask {
    constructor(task){
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