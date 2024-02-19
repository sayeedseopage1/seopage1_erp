import React from "react";
import ReactModal from "react-modal";

import { IoClose } from "react-icons/io5";

import DeadlineExplanation from "./DeadlineExplanation";
import { Flex } from "../table/ui";

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
        maxHeight: "550px",

        margin: "auto auto",
        padding: "20px",
    },
};

const DeadlineExplainModal = ({
    projectPmGoalId,
    projectDetails,
    isModalTwoOpen,
    closeModalTwo,
}) => {
    return (
        <ReactModal
            style={customStyles}
            isOpen={isModalTwoOpen}
            onRequestClose={closeModalTwo}
            contentLabel="Project Details"
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                }}
            >
                <div
                    style={{
                        fontSize: "25px",
                    }}
                >
                    Deadline Explanation
                </div>

                <button
                    onClick={closeModalTwo}
                    style={{
                        backgroundColor: "gray",
                        padding: "2px 4px 2px 4px",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "24px",
                        height: "24px",
                    }}
                >
                    <IoClose />
                </button>
            </div>

            <DeadlineExplanation
                closeModalTwo={closeModalTwo}
                projectPmGoalId={projectPmGoalId}
                projectDetails={projectDetails}
            />
        </ReactModal>
    );
};

export default DeadlineExplainModal;
