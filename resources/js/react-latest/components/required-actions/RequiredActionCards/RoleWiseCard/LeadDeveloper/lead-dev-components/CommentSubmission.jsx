//This file is not using in the system

import React, { useEffect } from "react";
import CommentsBody from "../../../../../../../react/UI/comments/CommentsBody";
import { useGetCommentsQuery } from "../../../../../../services/api/commentsApiSlice";
import Swal from "sweetalert2";
import axios from "axios";
import CommentBodyForPendingActions from "../../../../../../../react/UI/comments/CommentBodyForPendingActions";
import { useWindowSize } from "react-use";
const CommentSubmission = ({
    setIsOpen,
    task_id,
    btn_data,
    authorization_id,
}) => {
    const [fullScreenView, setFullScreenView] = React.useState(false);
    const [viewCommentModal, setViewCommentModal] = React.useState(false);

    const { width } = useWindowSize();

    const { data, isFetching, isLoading, refetch } =
        useGetCommentsQuery(task_id);

    return (
        <div>
            <CommentBodyForPendingActions
                fullScreenView={fullScreenView}
                setFullScreenView={setFullScreenView}
                isOpen={viewCommentModal}
                close={() => setViewCommentModal(false)}
                comments={data}
                loading={isLoading}
                fetching={isFetching}
                refetch={refetch}
                taskId={task_id}
                showFullScreenBtn={width <= 991 ? false : true}
                height={"520px"}
                showCommentEditor={true}
                showSearchBtn={true}
            />
        </div>
    );
};

export default CommentSubmission;
