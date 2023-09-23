

export class Task {
    constructor(data) {
        this.id = data?.id;
        this.subtask_id = data?.subtask_id;
        this.task_short_code = data?.task_short_code;
        this.heading = data?.heading;
        this.description = data?.description;
        this.due_date = data?.due_date;
        this.original_due_date = data?.original_due_date;
        this.start_date = data?.start_date;
        this.project_id = data?.project_id;
        this.task_category_id = data?.task_category_id;
        this.priority = data?.priority;
        this.status = data?.status;
        this.task_status = data?.task_status;
        this.board_column_id = data?.board_column_id;
        this.column_priority = data?.column_priority;
        this.completed_on = data?.completed_on;
        this.created_by = data?.created_by;
        this.recurring_task_id = data?.recurring_task_id;
        this.dependent_task_id = data?.dependent_task_id;
        this.milestone_id = data?.milestone_id;
        this.deliverable_id = data?.deliverable_id;
        this.is_private = data?.is_private;
        this.billable = data?.billable;
        this.estimate_hours = data?.estimate_hours;
        this.estimate_minutes = data?.estimate_minutes;
        this.estimate_time_left_minutes = data?.estimate_time_left_minutes;
        this.added_by = data?.added_by;
        this.last_updated_by = data?.last_updated_by;
        this.hash = data?.hash;
        this.repeat = data?.repeat;
        this.repeat_complete = data?.repeat_complete;
        this.repeat_count = data?.repeat_count;
        this.repeat_type = data?.repeat_type;
        this.repeat_cycles = data?.repeat_cycles;
        this.event_id = data?.event_id;
        this.deleted_at = data?.deleted_at;
        this.task_name = data?.task_name;
        this.project_name = data?.project_name;
        this.client_id = data?.client_id;
        this.client_name = data?.client_name;
        this.client_avatar = data?.client_avatar;
        this.assigned_to_id = data?.assigned_to_id;
        this.assigned_to_name = data?.assigned_to_name;
        this.assigned_to_avatar = data?.assigned_to_avatar;
        this.added_by_name = data?.added_by_name;
        this.added_by_avatar = data?.added_by_avatar;
        this.subtasks_hours_logged = data?.subtasks_hours_logged;
        this.due_on = data?.due_on;
        this.create_on = data?.create_on;
        this.orginal = data;
    }
}