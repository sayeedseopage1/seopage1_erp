import React from "react";

const PendingOrCompleted = ({ pendingOrCompleted, setPendingOrCompleted }) => {
    const getBadgeClass = (type) => {
        const isSelected = pendingOrCompleted === type;
        let baseClass =
            "badge px-3 py-2 cursor-pointer badge_opacity_unselected transition-opacity";

        switch (type) {
            case "pending":
                baseClass += isSelected
                    ? " bg-danger text-white badge_opacity_selected"
                    : " bg-danger";
                break;
            case "completed":
                baseClass += isSelected
                    ? " bg-success text-white badge_opacity_selected"
                    : " bg-success";
                break;
            case "all":
                baseClass += isSelected
                    ? " bg-primary text-white badge_opacity_selected"
                    : " bg-primary";
                break;
            default:
                break;
        }

        return baseClass;
    };

    return (
        <div className="list-table-toggle d-flex justify-content-around">
            <span
                className={getBadgeClass("pending")}
                onClick={() => setPendingOrCompleted("pending")}
            >
                Pending
            </span>
            <span
                className={getBadgeClass("completed")}
                onClick={() => setPendingOrCompleted("completed")}
            >
                Completed
            </span>
            <span
                className={getBadgeClass("all")}
                onClick={() => setPendingOrCompleted("all")}
            >
                All
            </span>
        </div>
    );
};

export default PendingOrCompleted;
