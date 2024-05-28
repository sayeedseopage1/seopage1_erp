import React from "react";
import { useGetTaskListQuery } from "../../../services/api/EvaluationApiSlice";
import TaskModalComponent from "./TaskModalComponent";
import { convertTime } from "../../../utils/converTime";

const TotalMinRequiredRound = ({ data, round }) => {
    const {
        data: TaskList,
        isLoading,
        isFetching,
    } = useGetTaskListQuery(data?.user_id);
    const TotalMin = TaskList?.data
        .filter((task) => task.round === round)
        .reduce((acc, item) => acc + item.total_min, 0);
    return <div>{convertTime(TotalMin)}</div>;
};

export default TotalMinRequiredRound;
