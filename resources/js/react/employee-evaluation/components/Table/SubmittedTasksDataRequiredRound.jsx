import React from "react";
import { useGetTaskListQuery } from "../../../services/api/EvaluationApiSlice";
import TaskModalComponent from "./TaskModalComponent";

const SubmittedTasksDataRequiredRound = ({ data, round }) => {
    const {
        data: TaskList,
        isLoading,
        isFetching,
    } = useGetTaskListQuery(data?.user_id);
    const Tasks = TaskList?.data.filter(
        (item) => item.submission_date !== null && item.round === round
    );
    return (
        <TaskModalComponent
            Tasks={Tasks}
            isLoading={isLoading}
            title={"Total task assigned"}
            taskNumbers={Tasks?.length}
        />
    );
};

export default SubmittedTasksDataRequiredRound;
