import React, { useState, useEffect } from "react";

import ReactModal from "react-modal";

const ExpiredTimeModalForNewEmployee = ({
    showExpirationWarningModal,
    setShowExpirationWarningModal,
    timeLeft,
    setTimeLeft,
    taskRunning,
    task,
    timerStatusForWarningModal,
    setTimerStatusForWarningModal,
}) => {
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
            // setTimerStatusForWarningModal(task?.ranningTimer?.status);
            // console.log("timer status inside", timerStatusForWarningModal);
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    console.log("timer status outside", timerStatusForWarningModal);
    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft <= 360000) {
                setShowExpirationWarningModal(true);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     console.log("timer status", timerStatusForWarningModal);
    // }, [timerStatusForWarningModal]);

    const closeModal = () => {
        setShowExpirationWarningModal(false);
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

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
