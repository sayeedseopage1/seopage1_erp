import React from "react";
import { useGetTaskListQuery } from "../../../services/api/EvaluationApiSlice";
import TaskModalComponent from "./TaskModalComponent";

const AssignedTasksData = ({ data }) => {
    const {
        data: TaskList,
        isLoading,
        isFetching,
    } = useGetTaskListQuery(data?.user_id);
    const Tasks = TaskList?.data;
    return (
        <TaskModalComponent
            Tasks={Tasks}
            isLoading={isLoading}
            title={"Total task assigned"}
            taskNumbers={Tasks?.length}
        />
    );
};

export default AssignedTasksData;
