import ModalForm from "./ModalForm";
import ModalWithBtnTemplate from "./ModalWithBtnTemplate";
import style from "../../../../../../styles/required-action-card.module.css";
import handleBtnDisable from "../../../../utils/handleBtnDisable";
import CommentCancellation from "./CommentCancellation";
import React, { useCallback, useEffect } from "react";
import ModalForCommentWithBtn from "./ModalForCommentWithBtn";
import CommentSubmission from "./CommentSubmission";

//mitul work start
import { useGetCommentsQuery } from "../../../../../../services/api/commentsApiSlice";
import { useWindowSize } from "react-use";
import EvaluationModal from "../../../EmployeeEvaluation/modal/EvaluationModal";
import RelevantModal from "../../Developer/dev-components/RelevantModal";
import CommentsBody from "../../../../../../../react/UI/comments/CommentsBody";
import CommentBodyForPendingActions from "../../../../../../../react/UI/comments/CommentBodyForPendingActions";
import CommentContainerDecider from "../../../../../../../react/UI/comments/CommentContainerDecider";
import { useCommentStore } from "../../../../../../../react/UI/comments/zustand/store";

const ActionsButton = ({ data }) => {
    const { commentState } = useCommentStore();
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

    // useEffect hook to call refetch when commentState changes
    useEffect(() => {
        refetch();
    }, [commentState]);

    //mitul work end

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
                        <div>
                            {btn.button_name === "View and Reply" && (
                                <button
                                    onClick={() =>
                                        setViewCommentModal((prev) => !prev)
                                    }
                                    className={`${style.action_btn}`}
                                >
                                    View & Reply
                                </button>
                            )}

                            {btn.button_name === "Not relevant to me" && (
                                <button
                                    onClick={() =>
                                        setIsRelevantModal((prev) => !prev)
                                    }
                                    className={`${style.action_btn}`}
                                >
                                    Not Relevant to me
                                </button>
                            )}
                        </div>
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
                    onClick={() => setIsEvaluationModal((prev) => !prev)}
                    className={`${style.action_btn}`}
                >
                    Evaluate
                </button>
            )}

            <CommentContainerDecider
                fullScreenView={fullScreenView}
                isOpen={viewCommentModal}
                width={width}
            >
                <CommentBodyForPendingActions
                    fullScreenView={fullScreenView}
                    setFullScreenView={setFullScreenView}
                    isOpen={viewCommentModal}
                    close={() => setViewCommentModal(false)}
                    comments={comments}
                    loading={isLoading}
                    fetching={isFetching}
                    refetch={refetch}
                    taskId={taskId}
                    showFullScreenBtn={width <= 991 ? false : true}
                    height={"89vh"}
                    showCommentEditor={true}
                    showSearchBtn={true}
                />
            </CommentContainerDecider>
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
