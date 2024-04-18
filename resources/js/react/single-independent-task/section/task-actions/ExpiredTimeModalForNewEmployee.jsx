import React, { useState, useEffect } from "react";

import ReactModal from "react-modal";

const ExpiredTimeModalForNewEmployee = ({
    showExpirationWarningModal,
    setShowExpirationWarningModal,
    timeLeft,
    setTimeLeft,
    timerStatusForWarningModal,
}) => {
    const [toggleModal, setToggleModal] = useState(false); // State to trigger re-render every minute

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime >= 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    return prevTime;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0 && timeLeft < 3600000) {
                setToggleModal((prevToggle) => !prevToggle);
            } else {
                return 0;
            }
        }, 900000); // 15 minute in milliseconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (
            toggleModal &&
            timeLeft <= 3600000 &&
            timeLeft > 0 &&
            timerStatusForWarningModal
        ) {
            setShowExpirationWarningModal(true);
        }
    }, [toggleModal]);

    const closeModal = () => {
        setShowExpirationWarningModal(false);
    };
    // console.log("timeleft", timeLeft);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // console.log("timer status", timerStatusForWarningModal);
    return (
        <ReactModal
            isOpen={showExpirationWarningModal}
            onRequestClose={closeModal}
            contentLabel="Expired Time Modal"
            shouldCloseOnOverlayClick={false}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 9999999998,
                },
                content: {
                    width: "400px",
                    height: "fit-content",
                    margin: "auto",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    Index: 9999999999,
                },
            }}
        >
            <h2 style={{ marginBottom: "20px" }}>
                Your timer will be stopped by the system after
            </h2>
            <h3 style={{ marginBottom: "20px" }}>
                <span style={{ color: "red" }}>{minutes}</span> minutes{" "}
                <span style={{ color: "red" }}>{seconds}</span> seconds.
            </h3>
            <h6>
                Please complete your task, stop the timer yourself and submit
                your work
            </h6>
            <button onClick={closeModal} className="btn btn-danger mt-4">
                Close
            </button>
        </ReactModal>
    );
};

export default ExpiredTimeModalForNewEmployee;
