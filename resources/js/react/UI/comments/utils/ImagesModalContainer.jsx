import React from "react";
import Modal from "../components/Modal";

const ImagesModalContainer = ({isOpen, children}) => {
    return (
        <Modal isOpen={isOpen}>
            <div
                className="position-relative"
                style={{
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <div
                    className="sp1_task_comment_modal"
                    style={{
                        height: "100%",
                        width: "100%",
                        maxHeight: "100vh",
                    }}
                >
                    {/* modal body (start) */}
                    {children}
                    {/* modal body (end) */}
                </div>
            </div>
        </Modal>
    );
};

export default ImagesModalContainer;
