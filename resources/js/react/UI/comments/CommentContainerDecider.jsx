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
    const handleContainer = (children) => {
        if (fullScreenView) {
            return (
                <Modal isOpen={isOpen}>
                    <div className="position-relative">
                        <div
                            className="sp1_task_comment_modal"
                            style={{
                                width: "100vw",
                                height: "100vh",
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
        }
        // else if (width > 1200) {
        //     return (
        //         <CustomModal toggleRef={toggleRef} isOpen={isOpen}>
        //             <div className="sp1_task_comment_modal">
        //                 {/* modal body (start) */}
        //                 {children}
        //                 {/* modal body (end) */}
        //             </div>
        //         </CustomModal>
        //     );
        // }
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
