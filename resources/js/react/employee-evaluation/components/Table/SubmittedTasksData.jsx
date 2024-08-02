import React, { useEffect, useState } from "react";
import { useGetTaskListQuery } from "../../../services/api/EvaluationApiSlice";
import TaskModalComponent from "./TaskModalComponent";

const SubmittedTasksData = ({ data }) => {
    const {
        data: TaskList,
        isLoading,
        isFetching,
    } = useGetTaskListQuery(data?.user_id);

    const [latestRoundTasks, setLatestRoundTasks] = useState([]);

    useEffect(() => {
        if (TaskList?.data) {
            // Find the latest round number
            const latestRound = Math.max(
                ...TaskList.data.map((task) => task.round)
            );

            // Filter tasks that have the latest round
            const tasks = TaskList?.data.filter(
                (task) =>
                    task.round === latestRound && task.submission_date !== null
            );

            setLatestRoundTasks(tasks);
        }
    }, [TaskList]);

    return (
        <TaskModalComponent
            Tasks={latestRoundTasks}
            isLoading={isLoading}
            title={"Total task assigned"}
            taskNumbers={latestRoundTasks?.length}
        />
    );
};

export default SubmittedTasksData;
