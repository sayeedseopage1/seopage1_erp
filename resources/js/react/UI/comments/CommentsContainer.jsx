import React from "react";
import { useWindowSize } from "react-use";
import CustomModal from "./components/CustomModal";
import Modal from "./components/Modal";
import CommentsBody from "./CommentsBody";
import { useState, useEffect } from "react";
import commentDemoData from "./_Data/commentDemoData";
import { useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../../services/api/commentsApiSlice";
import CommentContainerDecider from "./CommentContainerDecider";
import _ from "lodash";
import { useCommentStore } from "./zustand/store";

const CommentsContainer = ({
    toggleRef = null,
    isOpen,
    close,
    task,
    comments = null,
    onCommentPost,
    taskId,
    singleCommentId,
    showCommentEditor = true,
    showSearchBtn = true,
    showFullScreenBtn = true,
    height = "89vh",
}) => {
    const { commentState } = useCommentStore();
    // ---------------------------------------------------------
    const param = useParams();

    // ---------------------------------------------------------

    const { width } = useWindowSize();
    const [fullScreenView, setFullScreenView] = useState(false);
    const { data, isFetching, isLoading, refetch } = useGetCommentsQuery(
        param?.taskId
    );

    // useEffect hook to call refetch when commentState changes
    useEffect(() => {
        refetch();
    }, [commentState]);

    return (
        <CommentContainerDecider
            fullScreenView={fullScreenView}
            isOpen={isOpen}
            toggleRef={toggleRef}
            width={width}
        >
            {/* {isOpen && ( */}
            <CommentsBody
                fullScreenView={fullScreenView}
                setFullScreenView={setFullScreenView}
                isOpen={isOpen}
                close={close}
                // comments={param?.taskId ? data : comments}
                comments={
                    param?.taskId
                        ? singleCommentId
                            ? data?.filter(
                                  (comment) => comment.id === singleCommentId
                              )
                            : data
                        : comments
                }
                // comments={demoComments}
                loading={isLoading}
                fetching={isFetching}
                refetch={refetch}
                taskId={taskId ? taskId : param?.taskId}
                showFullScreenBtn={width <= 991 ? false : showFullScreenBtn}
                height={height}
                showCommentEditor={showCommentEditor}
                showSearchBtn={showSearchBtn}
            />
            {/* )} */}
        </CommentContainerDecider>
    );
};

export default CommentsContainer;
