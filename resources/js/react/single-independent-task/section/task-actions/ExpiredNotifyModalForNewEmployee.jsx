import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import PendingTasksForTrainee from "./PendingTasksForTrainee";

const ExpiredNotifyModalForNewEmployee = ({
    expireDateForTrainer,
    showExpirationNotifyModal,
    setShowExpirationNotifyModal,
    timeLeft,
}) => {
    const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
    useEffect(() => {
        const expireDate = new Date(expireDateForTrainer);
        const currentTime = new Date();
        if (currentTime > expireDate) {
            // if (timeLeft < 0 && expireDateForTrainer !== null) {
            setShowExpirationNotifyModal(true);
        }
    }, [timeLeft]);

    const closeModal = () => {
        setShowExpirationNotifyModal(false);
    };

    const handlePendingTasks = () => {
        setIsPendingModalOpen(true);
    };
    return (
        <ReactModal
            isOpen={showExpirationNotifyModal}
            onRequestClose={closeModal}
            contentLabel="Expired Time Modal"
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 9998,
                },
                content: {
                    width: "400px",
                    height: "fit-content",
                    margin: "auto",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    zIndex: 9999,
                },
            }}
        >
            <h2 style={{ marginBottom: "20px", color: "red" }}>
                Your time has expired
            </h2>
            <h6>
                Please Submit your{" "}
                <span
                    onClick={handlePendingTasks}
                    className="link_color"
                    style={{ cursor: "pointer" }}
                >
                    pending
                </span>{" "}
                tasks
            </h6>
            <button onClick={closeModal} className="btn btn-danger mt-4">
                Close
            </button>

            <PendingTasksForTrainee
                isPendingModalOpen={isPendingModalOpen}
                setIsPendingModalOpen={setIsPendingModalOpen}
            />
        </ReactModal>
    );
};

export default ExpiredNotifyModalForNewEmployee;
