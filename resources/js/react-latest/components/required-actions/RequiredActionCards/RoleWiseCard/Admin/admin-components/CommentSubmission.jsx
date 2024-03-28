import React, { useEffect } from "react";
import CommentsBody from "../../../../../../../react/UI/comments/CommentsBody";
import { useGetCommentsQuery } from "../../../../../../services/api/commentsApiSlice";
import Swal from "sweetalert2";
import axios from "axios";

const CommentSubmission = ({
    setIsOpen,
    task_id,
    btn_data,
    authorization_id,
}) => {
    const { data, isFetching, isLoading, refetch } =
        useGetCommentsQuery(task_id);

    return (
        <div>
            <CommentsBody
                close={() => setIsOpen(false)}
                comments={data?.slice(data?.length - 3)}
                fetching={isFetching}
                height={"540px"}
                isOpen={true}
                loading={isLoading}
                refetch={refetch}
                taskId={task_id}
                onSubmit={async () => {
                    try {
                        await axios.post(btn_data?.button_url, {
                            authorization_id,
                            _token: document
                                .querySelector("meta[name='csrf-token']")
                                .getAttribute("content"),
                        });
                        Swal.fire({
                            icon: "success",
                            title: "Action is acted successfully",
                            timer: 2000,
                            showConfirmButton: true,
                            timerProgressBar: true,
                        });
                    } catch (err) {
                        Swal.fire({
                            icon: "error",
                            title: "Action is not acted",
                            timer: 2000,
                            showConfirmButton: true,
                            confirmButtonColor: "red",
                            timerProgressBar: true,
                        });
                    }
                }}
            />
        </div>
    );
};

export default CommentSubmission;
