import React from "react";
import { convertTime } from "../../../utils/converTime";

const EvaluationRatingPopover = ({ data }) => {
    return (
        <div className="revision_popover_panel">
            <div style={{ color: "red" }}>
                <div>{`Tracked Hour: ${convertTime(data?.total_min)}`}</div>

                <div>Submission Status: Not Submitted</div>
            </div>
            <br />
            <div>Hence, this task is not applicable for rating</div>
        </div>
    );
};

export default EvaluationRatingPopover;
