import React, { useState } from "react";
import ReactModal from "react-modal";

import { usePendingActionsIdMutation } from "../../../react-latest/services/api/pendingActionsApiSlice";
import { useSelector } from "react-redux";
import useCounterStore from "../../../react-latest/Zustand/store";

const CloseModal = ({ onClose, isOpen, setIsOpen }) => {
    const { increaseCount } = useCounterStore();
    const pendingActionId = useSelector(
        (state) => state.pendingActions.pendingActionId
    );

    const [updatePendingAction] = usePendingActionsIdMutation();

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    const handleConfirm = () => {
        handleClose();
    };

    const handleDeny = () => {
        updatePendingAction({ id: pendingActionId })
            .then((res) => {
                increaseCount();
                handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCancel = () => {
        console.log("You clicked 'Back to Pending Action'");
        handleClose();
    };

    return (
        <ReactModal
            style={{
                overlay: {
                    zIndex: 9999999998,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    margin: "auto auto",
                    padding: "20px",
                },
                content: {
                    zIndex: 99999999999,
                    maxWidth: "600px",
                    height: "fit-content",
                    maxHeight: "fit-content",
                    margin: "auto auto",
                    padding: "20px",
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
                    blur: "5px",
                },
            }}
            shouldCloseOnOverlayClick={false}
            isOpen={isOpen}
            onRequestClose={handleClose}
            contentLabel="Example Modal"
            overlayClassName="overlay"
            className="modal-content"
        >
            <div>
                <h2>Would you like to add any more comments?</h2>
                <p style={{ marginTop: "5px", textAlign: "justify" }}>
                    If you click{" "}
                    <span
                        style={{
                            padding: "4px",
                            fontSize: "12px",
                            borderRadius: "5px",
                            backgroundColor: "#007bff",
                            color: "white",
                        }}
                    >
                        Yes
                    </span>
                    , you can add more comments. If you click{" "}
                    <span
                        style={{
                            padding: "4px",
                            fontSize: "12px",
                            borderRadius: "5px",
                            backgroundColor: "#dc3545",
                            color: "white",
                        }}
                    >
                        No
                    </span>
                    , this pending action will be marked as completed and moved
                    to the past.
                </p>
                <p style={{ marginTop: "10px", textAlign: "justify" }}>
                    If you click{" "}
                    <span
                        style={{
                            padding: "4px",
                            fontSize: "12px",
                            borderRadius: "5px",
                            backgroundColor: "#17A2B8",
                            color: "white",
                        }}
                    >
                        Back to Pending Action
                    </span>
                    , this comment window will close and you'll return to the
                    pending action page.
                </p>
            </div>
            <div>
                <button
                    className="btn btn-primary mt-2 py-2"
                    onClick={handleConfirm}
                >
                    Yes
                </button>
                <button className="btn btn-info py-2" onClick={handleCancel}>
                    Back to Pending Action
                </button>
                <button className="btn btn-danger py-2" onClick={handleDeny}>
                    No
                </button>
            </div>
        </ReactModal>
    );
};

export default CloseModal;
