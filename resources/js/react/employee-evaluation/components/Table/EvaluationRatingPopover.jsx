import React from "react";
import { convertTime } from "../../../utils/converTime";

const EvaluationRatingPopover = ({ data }) => {
    // Determine the color based on data?.total_min
    const submissionStatusColor =
        data && Number(data.total_min) > 60 ? "green" : "red";

    return (
        <div className="revision_popover_panel">
            <div>
                <div
                    style={{ color: submissionStatusColor }}
                >{`Tracked Hour: ${convertTime(data?.total_min)}`}</div>

                <div style={{ color: "red" }}>
                    Submission Status:{" "}
                    <span>{data?.task_board_column_name}</span>
                </div>
            </div>
            <br />
            <div>Hence, this task is not applicable for rating</div>
        </div>
    );
};

export default EvaluationRatingPopover;
