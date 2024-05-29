import React, { useEffect, useState } from "react";
import { useGetTaskListQuery } from "../../../services/api/EvaluationApiSlice";

import { convertTime } from "../../../utils/converTime";

const TotalMin = ({ data }) => {
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
            const tasks = TaskList.data.filter(
                (task) => task.round === latestRound
            );

            setLatestRoundTasks(tasks);
        }
    }, [TaskList]);
    const TotalMin = latestRoundTasks.reduce(
        (acc, item) => acc + item.total_min,
        0
    );
    return <div>{convertTime(TotalMin)}</div>;
};

export default TotalMin;
