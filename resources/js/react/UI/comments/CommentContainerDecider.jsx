import React from "react";
import Modal from "./components/Modal";
import CustomModal from "./components/CustomModal";

const CommentContainerDecider = ({
    fullScreenView,
    toggleRef,
    width,
    isOpen,
    children,
}) => {
    // console.log(width);
    const handleContainer = (children) => {
        if (fullScreenView && width <= 991) {
            return (
                <Modal isOpen={isOpen}>
                    <div
                        // className="position-relative"
                        style={{
                            position: "absolute",
                            top: "80px",
                            left: "-10px",
                            padding: "75px 23px 18px 25px",
                            height: "100vh",
                            width: "100vw",
                        }}
                    >
                        <div
                            className="sp1_task_comment_modal"
                            style={{
                                position: "absolute",
                                top: "80px",
                                left: "-10px",
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
        } else if (!fullScreenView && width <= 991) {
            return (
                <Modal isOpen={isOpen}>
                    <div
                        className="position-relative"
                        style={{
                            padding: "75px 23px 18px 25px",
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
        } else if (fullScreenView && width > 991) {
            return (
                <Modal isOpen={isOpen}>
                    <div
                        // className="position-relative"
                        style={{
                            position: "absolute",
                            top: "80px",
                            left: "-10px",
                            padding: "79px 41px 21px 261px",
                            height: "100vh",
                            width: "100vw",
                        }}
                    >
                        <div
                            className="sp1_task_comment_modal"
                            style={{
                                position: "absolute",
                                top: "80px",
                                left: "-10px",
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
        } else if (!fullScreenView && width > 991) {
            return (
                <Modal isOpen={isOpen}>
                    <div
                        className="position-relative"
                        style={{
                            paddingTop: "50px",
                        }}
                    >
                        <div
                            style={{
                                margin: "auto",
                            }}
                            className="sp1_task_comment_modal"
                        >
                            {/* modal body (start) */}
                            {children}
                            {/* modal body (end) */}
                        </div>
                    </div>
                </Modal>
            );
        }
        // else if (width <= 1200) {
        //     return (
        //         <Modal isOpen={isOpen}>
        //             <div className="position-relative">
        //                 <div className="sp1_task_comment_modal --small-device">
        //                     {/* modal body (start) */}
        //                     {children}
        //                     {/* modal body (end) */}
        //                 </div>
        //             </div>
        //         </Modal>
        //     );
        // }
        else {
            return (
                <Modal isOpen={isOpen}>
                    <div className="position-relative">
                        <div className="sp1_task_comment_modal --small-device">
                            {/* modal body (start) */}
                            {children}
                            {/* modal body (end) */}
                        </div>
                    </div>
                </Modal>
            );
        }
    };

    return handleContainer(children);
};

export default CommentContainerDecider;
