import React, { useState } from "react";
import style from "../../../../../../styles/required-action-card.module.css";
import Modal from "../../../../../../ui/Modal";
import Button from "../../../../../../ui/Button";

const ModalForCommentWithBtn = ({
    btn_color,
    btn_name,
    modal_heading,
    showCloseBtn,
    children,
    maxWidth,
    btn_Disable,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <div>
            <button
                disabled={btn_Disable}
                onClick={open}
                className={`${style.action_btn} ${style[btn_color]}`}
            >
                {btn_name}
            </button>

            <Modal
                isOpen={isOpen}
                // isOpen={true}
                className="sp1_mark-as--modal"
                closeModal={close}
            >
                <div
                    className="sp1_single_task--modal-panerl-wrapper"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        className="sp1_mark-as--modal-panel"
                        style={{
                            overflow: "visible",
                            maxWidth: maxWidth,
                            padding: "0",
                        }}
                    >
                        {/* heading bar */}
                        {showCloseBtn ? (
                            <div className="sp1_mark-as--modal-heading">
                                <div />
                                <Button aria-label="closeModal" onClick={close}>
                                    <i className="fa-solid fa-xmark" />
                                </Button>
                            </div>
                        ) : (
                            <></>
                        )}

                        {/* body */}
                        <div
                            className="sp1_mark-as--modal-body"
                            style={{ overflow: "visible", padding: "0" }}
                        >
                            {/* modal body  */}
                            {children(setIsOpen,isOpen)}

                            {/* {showBottomCloseBtn && (
                                <Button
                                    variant="tertiary"
                                    className="ml-auto mr-2"
                                    onClick={close}
                                >
                                    Close
                                </Button>
                            )} */}
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </Modal>
        </div>
    );
};

export default ModalForCommentWithBtn;
