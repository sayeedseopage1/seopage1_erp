import ModalForm from "./ModalForm";
import ModalWithBtnTemplate from "./ModalWithBtnTemplate";
import style from "../../../../../../styles/required-action-card.module.css";
import handleBtnDisable from "../../../../utils/handleBtnDisable";
import ModalForCommentWithBtn from "./ModalForCommentWithBtn";
import CommentCancellation from "./CommentCancellation";
import CommentSubmission from "./CommentSubmission";
import React, { useCallback, useEffect } from "react";

//mitul work start
import { useDispatch } from "react-redux";

import { useGetCommentsQuery } from "../../../../../../services/api/commentsApiSlice";
import { useWindowSize } from "react-use";
import EvaluationModal from "../../../EmployeeEvaluation/modal/EvaluationAcknowledgeSubtaskModal";
import RelevantModal from "../../Developer/dev-components/RelevantModal";
import CommentsBody from "../../../../../../../react/UI/comments/CommentsBody";
import CommentBodyForPendingActions from "../../../../../../../react/UI/comments/CommentBodyForPendingActions";
import CommentContainerDecider from "../../../../../../../react/UI/comments/CommentContainerDecider";
import { setPendingActionId } from "../../../../../../services/features/pendingActionSlice";
import CommentsBodyWithoutSendBox from "../../../../../../../react/UI/comments/CommentBodyWithoutSendBox";
import { useCommentStore } from "../../../../../../../react/UI/comments/zustand/store";

const ActionsButton = ({ data }) => {
    const dispatch = useDispatch();

    const { commentState } = useCommentStore();
    const [fullScreenView, setFullScreenView] = React.useState(false);
    const [viewCommentModal, setViewCommentModal] = React.useState(false);
    const [viewModal, setViewModal] = React.useState(false);
    const [isRelevantModal, setIsRelevantModal] = React.useState(false);

    const { width } = useWindowSize();
    const taskId = data?.task_id;

    const {
        data: comments,
        isFetching,
        isLoading,
        refetch,
    } = useGetCommentsQuery(taskId);

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
                        <div>
                            {btn.button_name === "View and Reply" && (
                                <button
                                    key={i}
                                    disabled={handleBtnDisable(1)}
                                    onClick={() => {
                                        setViewCommentModal((prev) => !prev);
                                        dispatch(setPendingActionId(data?.id));
                                    }}
                                    className={`${style.action_btn}`}
                                >
                                    View & Reply
                                </button>
                            )}

                            {btn.button_name === "Not relevant to me" && (
                                <button
                                    key={i}
                                    disabled={handleBtnDisable(1)}
                                    onClick={() => {
                                        setIsRelevantModal((prev) => !prev);

                                        dispatch(setPendingActionId(data?.id));
                                    }}
                                    className={`${style.action_btn}`}
                                >
                                    Not Relevant to me
                                </button>
                            )}
                            {btn.button_name === "View" && (
                                <button
                                    key={i}
                                    disabled={handleBtnDisable(1)}
                                    onClick={() =>
                                        setViewModal((prev) => !prev)
                                    }
                                    className={`${style.action_btn}`}
                                >
                                    View
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
                            // maxWidth={handleModalWidth(btn)}
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

            {/* this modal is for view and reply button  */}
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

            {/* //this modal is for past button */}
            <CommentContainerDecider
                fullScreenView={fullScreenView}
                isOpen={viewModal}
                width={width}
            >
                <CommentsBodyWithoutSendBox
                    fullScreenView={fullScreenView}
                    setFullScreenView={setFullScreenView}
                    isOpen={viewModal}
                    close={() => setViewModal(false)}
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
        </>
    );
};

export default React.memo(ActionsButton);
