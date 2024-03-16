import ModalForm from "./ModalForm";
import ModalWithBtnTemplate from "./ModalWithBtnTemplate";
import style from "../../../../../../styles/required-action-card.module.css";
import handleBtnDisable from "../../../../utils/handleBtnDisable";
import CommentCancellation from "./CommentCancellation";
import React, { useCallback } from "react";
import ModalForCommentWithBtn from "./ModalForCommentWithBtn";
import CommentSubmission from "./CommentSubmission";

//mitul work start
import CommentsBody from "../../../../../../../react/UI/comments/CommentsBody";
import { useGetCommentsQuery } from "../../../../../../services/api/commentsApiSlice";
import { useWindowSize } from "react-use";
import ReactModal from "react-modal";

import EvaluationModal from "../../../EmployeeEvaluation/modal/EvaluationModal";
import RelevantModal from "../../Developer/dev-components/RelevantModal";

const ActionsButton = ({ data }) => {
    const [fullScreenView, setFullScreenView] = React.useState(false);
    const [viewCommentModal, setViewCommentModal] = React.useState(false);
    const [isRelevantModal, setIsRelevantModal] = React.useState(false);
    const [isEvaluationModal, setIsEvaluationModal] = React.useState(false);
    const { width } = useWindowSize();
    const taskId = data?.task_id;

    const {
        data: comments,
        isFetching,
        isLoading,
        refetch,
    } = useGetCommentsQuery(taskId);

    //mitul work end

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
                            disabled={handleBtnDisable(6)}
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
                            btn_Disable={handleBtnDisable(6)}
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
                            btn_Disable={handleBtnDisable(6)}
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

            {/* mitul work start */}

            {data?.task_id && (
                <button
                    onClick={() => setViewCommentModal((prev) => !prev)}
                    className={`${style.action_btn}`}
                >
                    {data?.expired_status === 0 ? "View & Reply" : "View"}
                </button>
            )}
            {data?.task_id && (
                <button
                    onClick={() => setIsRelevantModal((prev) => !prev)}
                    className={`${style.action_btn}`}
                >
                    Not Relevant to me
                </button>
            )}
            {data?.task_id && (
                <button
                    onClick={() => setIsEvaluationModal((prev) => !prev)}
                    className={`${style.action_btn}`}
                >
                    Evaluate
                </button>
            )}
            <ReactModal
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        margin: "auto auto",
                        zIndex: 100,
                    },
                    content: {
                        borderRadius: "10px",
                        maxWidth: fullScreenView ? "100vw" : "1020px",
                        height: fullScreenView ? "100vh" : "550px",
                        margin: "auto auto",
                        border: "none",
                        overflow: "hidden",
                    },
                }}
                isOpen={viewCommentModal}
                onRequestClose={() => setViewCommentModal(false)}
            >
                <CommentsBody
                    fullScreenView={fullScreenView}
                    setFullScreenView={setFullScreenView}
                    isOpen={viewCommentModal}
                    close={() => setViewCommentModal(false)}
                    comments={comments?.slice(data?.length - 3)}
                    loading={isLoading}
                    fetching={isFetching}
                    refetch={refetch}
                    taskId={taskId}
                    showFullScreenBtn={width <= 991 ? false : true}
                    height={"520px"}
                    showCommentEditor={true}
                    showSearchBtn={true}
                />
            </ReactModal>
            <RelevantModal
                setIsRelevantModal={setIsRelevantModal}
                isRelevantModal={isRelevantModal}
            />

            <EvaluationModal
                setIsEvaluationModal={setIsEvaluationModal}
                isEvaluationModal={isEvaluationModal}
            />
        </>
    );
};

export default React.memo(ActionsButton);
