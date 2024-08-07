import React from "react";
import DailySubmissionTypeModal from "./DailySubmissionTypeModal";

const DailySubmissionType = ({ data, sectionName }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div>
            <div
                className="sp1_daily_submission_type"
                onClick={() => setIsOpen(true)}
            >
                {sectionName}
            </div>
            <DailySubmissionTypeModal
                data={data}
                sectionName={sectionName}
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
            />
        </div>
    );
};

export default DailySubmissionType;
