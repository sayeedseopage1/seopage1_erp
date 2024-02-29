import React from "react";
import ReactModal from "react-modal";
import { IoClose } from "react-icons/io5";
import DeadlineExplanation from "./DeadlineExplanation";


const DeadlineExplainModal = ({
    projectPmGoalId,
    projectDetails,
    isModalTwoOpen,
    closeModalTwo,
    refetchPmGoal
}) => {
    return (
        <ReactModal
            style={customStyles}
            isOpen={isModalTwoOpen}
            ariaHideApp={false}
            onRequestClose={closeModalTwo}
            contentLabel="Deadline Explanation"
        >

            <div
                className="d-flex justify-content-between align-items-center mb-3"
            >
                <h6
                    style={{
                        fontSize: "25px",
                        marginBottom: "0",
                    }}
                >
                    Deadline Explanation
                </h6>
                <button
                    onClick={closeModalTwo}
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                        backgroundColor: "gray",
                        padding: "2px 4px 2px 4px",
                        color: "white",
                        width: "24px",
                        height: "24px",
                    }}
                >
                    <IoClose />
                </button>
            </div>
            {/* Deadline Explanation Modal */}
            <DeadlineExplanation
                closeModalTwo={closeModalTwo}
                isModalTwoOpen={isModalTwoOpen}
                projectPmGoalId={projectPmGoalId}
                projectDetails={projectDetails}
                refetchPmGoal={refetchPmGoal}
            />
        </ReactModal>
    );
};

export default DeadlineExplainModal;

const customStyles = {
    overlay: {
        zIndex: 99999998,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        margin: "auto auto",
        padding: "20px",
    },
    content: {
        zIndex: 99999999,
        maxWidth: "600px",
        maxHeight: "fit-content",
        margin: "auto auto",
        padding: "20px",
    },
};