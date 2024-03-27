import ModalForm from "./ModalForm";
import ModalWithBtnTemplate from "./ModalWithBtnTemplate";
import style from "../../../../../../styles/required-action-card.module.css";
import handleBtnDisable from "../../../../utils/handleBtnDisable";
import CommentCancellation from "./CommentCancellation";
import React, { useCallback } from "react";
import ModalForCommentWithBtn from "./ModalForCommentWithBtn";
import CommentSubmission from "./CommentSubmission";

// action buttons
const ActionsButton = ({ data }) => {
    // window.location.assign();

    // return (
    //     <>
    //         <button className={style.action_btn}>Review</button>
    //         <button className={style.action_btn}>Approve</button>
    //         <button className={style.action_btn}>Deny</button>
    //         <button className={style.action_btn}>Request Modifications</button>
    //     </>
    // );

    const handleModalWidth = useCallback(
        (btn) => {
            if (data?.code === "TCOA" && btn?.modal_form) {
                // modal width for comment cancellation
                return "816px";
            } else if (data?.code === "TCOA" && !btn?.modal_form) {
                // modal width for comment
                return "1036px";
            } else {
                // modal width for others
                return "35rem";
            }
        },
        [data]
    );

    return (
        <>
            {data?.button?.map((btn, i) => {
                if (btn.button_type === "redirect_url") {
                    return (
                        <button
                            disabled={handleBtnDisable(5)}
                            key={i}
                            onClick={() =>
                                window.open(btn.button_url, "_blank")
                            }
                            className={`${style.action_btn} ${
                                style[btn.button_color]
                            }`}
                        >
                            {btn.button_name}
                        </button>
                    );
                } else if (
                    btn.button_type === "modal" &&
                    data?.code === "TCOA"
                ) {
                    return (
                        <ModalForCommentWithBtn
                            key={i}
                            btn_color={btn.button_color}
                            btn_name={btn.button_name}
                            modal_heading={data.heading}
                            showCloseBtn={false}
                            maxWidth={handleModalWidth(btn)}
                            // btn_Disable={handleBtnDisable(6)}
                        >
                            {(setIsOpen, isOpen) => {
                                if (btn?.modal_form) {
                                    return (
                                        <CommentCancellation
                                            setIsOpen={setIsOpen}
                                            modal_data={btn}
                                            data={data}
                                        />
                                    );
                                } else if (!btn?.modal_data) {
                                    return isOpen ? (
                                        <CommentSubmission
                                            setIsOpen={setIsOpen}
                                            task_id={data?.task_id}
                                            btn_data={btn}
                                            authorization_id={data?.id}
                                        />
                                    ) : (
                                        <></>
                                    );
                                }
                            }}
                        </ModalForCommentWithBtn>
                    );
                } else if (btn.button_type === "modal") {
                    return (
                        <ModalWithBtnTemplate
                            key={i}
                            btn_color={btn.button_color}
                            btn_name={btn.button_name}
                            modal_heading={data.heading}
                            showBottomCloseBtn={false}
                            maxWidth={handleModalWidth(btn)}
                            btn_Disable={handleBtnDisable(5)}
                        >
                            {(setIsOpen) => {
                                // modal form
                                if (btn?.modal_form) {
                                    return (
                                        <ModalForm
                                            setIsOpen={setIsOpen}
                                            form_data={btn}
                                        />
                                    );
                                }
                            }}
                        </ModalWithBtnTemplate>
                    );
                }
            })}
        </>
    );
};

export default React.memo(ActionsButton);