import React from "react";
import { useGetTaskListQuery } from "../../../services/api/EvaluationApiSlice";
import TaskModalComponent from "./TaskModalComponent";

const AssignedTasksDataRequiredRound = ({ data, round }) => {
    const {
        data: TaskList,
        isLoading,
        isFetching,
    } = useGetTaskListQuery(data?.user_id);
    const Tasks = TaskList?.data.filter((task) => task.round === round);
    return (
        <TaskModalComponent
            Tasks={Tasks}
            isLoading={isLoading}
            title={"Total task assigned"}
            taskNumbers={Tasks?.length}
        />
    );
};

export default AssignedTasksDataRequiredRound;
