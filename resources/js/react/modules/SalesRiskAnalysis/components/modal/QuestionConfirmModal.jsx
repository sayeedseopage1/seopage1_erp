import React from "react";
import InfoIcon from "../ui/InfoIcon";
import CustomModal from "../ui/CustomModal/CustomModal";

const QuestionConfirmModal = ({ open, closeModal }) => {
    return (
        <CustomModal
            id="addQuestionsModal"
            open={open}
            closeModal={closeModal}
            contentLabel="Question Confirm Modal"
            maxWidth="600px"
            isCloseButtonShow={true}
            height="fit-content"
            maxHeight="fit-content"
        >
            <div className="d-flex align-items-center justify-content-center flex-column py-4 px-3 px-md-5">
                <InfoIcon />
                <p
                    className="text-center py-4"
                    style={{
                        textAlign: "center",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                    }}
                >
                    This won deal has a negative risk analysis score hence it
                    has to be authorized by the top management. You can still
                    submit the larger form and it will be assigned to a project
                    manager right after it will be authorized.
                </p>
                <button
                    className="btn btn-primary"
                    style={{
                        width: "250px",
                    }}
                >
                    Continue
                </button>
            </div>
        </CustomModal>
    );
};

export default QuestionConfirmModal;
