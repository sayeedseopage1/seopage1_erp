import ModalForm from "./ModalForm";
import ModalWithBtnTemplate from "./ModalWithBtnTemplate";
import style from "../../../../../../styles/required-action-card.module.css";
import handleBtnDisable from "../../../../utils/handleBtnDisable";
import CommentCancellation from "./CommentCancellation";
import React, { useCallback, useEffect } from "react";
import ModalForCommentWithBtn from "./ModalForCommentWithBtn";
import CommentSubmission from "./CommentSubmission";

//mitul work start
import { useDispatch } from "react-redux";

import { useGetCommentsQuery } from "../../../../../../services/api/commentsApiSlice";
import { useWindowSize } from "react-use";

import RelevantModal from "../../Developer/dev-components/RelevantModal";

import CommentBodyForPendingActions from "../../../../../../../react/UI/comments/CommentBodyForPendingActions";
import CommentContainerDecider from "../../../../../../../react/UI/comments/CommentContainerDecider";
import { useCommentStore } from "../../../../../../../react/UI/comments/zustand/store";
import { setPendingActionId } from "../../../../../../services/features/pendingActionSlice";
import CommentsBodyWithoutSendBox from "../../../../../../../react/UI/comments/CommentBodyWithoutSendBox";
import EvaluationAcknowledgeModal from "../../../EmployeeEvaluation/modal/EvaluationAcknowledgeModal";
import { usePendingActionStore } from "../../../../../Zustand/store";

const ActionsButton = ({ data }) => {
    const dispatch = useDispatch();
    const { setPendingAction } = usePendingActionStore();
    const { commentState } = useCommentStore();
    const [fullScreenView, setFullScreenView] = React.useState(false);
    const [viewCommentModal, setViewCommentModal] = React.useState(false);
    const [viewModal, setViewModal] = React.useState(false);
    const [isRelevantModal, setIsRelevantModal] = React.useState(false);
    const [acknowledgement, setAcknowledgement] = React.useState(false);
    const { width } = useWindowSize();
    const taskId = data?.task_id;
    const developerId = data?.developer_id;
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
                                    key={i}
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
                } else if (
                    btn.button_type === "modal" &&
                    data?.code === "EAFA"
                ) {
                    return (
                        <div>
                            {btn.button_name === "Acknowledge It" && (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setPendingAction(data);
                                        setAcknowledgement((prev) => !prev);
                                        dispatch(setPendingActionId(data?.id));
                                    }}
                                    className={`${style.action_btn}`}
                                >
                                    Acknowledge It
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

            {/* this modal is for live view and reply button  */}
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

            <EvaluationAcknowledgeModal
                developerId={developerId}
                setAcknowledgement={setAcknowledgement}
                acknowledgement={acknowledgement}
            />
        </>
    );
};

export default React.memo(ActionsButton);
