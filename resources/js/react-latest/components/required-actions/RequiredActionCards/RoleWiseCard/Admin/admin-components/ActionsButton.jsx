import ModalForm from "./ModalForm";
import ModalWithBtnTemplate from "./ModalWithBtnTemplate";
import style from "../../../../../../styles/required-action-card.module.css";
import handleBtnDisable from "../../../../utils/handleBtnDisable";
import ModalForCommentWithBtn from "./ModalForCommentWithBtn";
import CommentCancellation from "./CommentCancellation";
import CommentSubmission from "./CommentSubmission";
import { useCallback } from "react";

// action buttons
export default function ActionsButton({ data }) {
    const [isEvaluationModal, setIsEvaluationModal] = React.useState(false);

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
                            disabled={handleBtnDisable(1)}
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
                } else if (btn.button_type === "modal") {
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

            {
                <button
                    onClick={() => setIsEvaluationModal((prev) => !prev)}
                    className={`${style.action_btn}`}
                >
                    Evaluate
                </button>
            }

            <EvaluationModal
                setIsEvaluationModal={setIsEvaluationModal}
                isEvaluationModal={isEvaluationModal}
            />
        </>
    );
}
