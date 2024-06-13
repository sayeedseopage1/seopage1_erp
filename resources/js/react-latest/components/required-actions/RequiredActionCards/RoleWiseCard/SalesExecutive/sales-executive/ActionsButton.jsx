import { useWindowSize } from "react-use";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

// styles
import style from "../../../../../../styles/required-action-card.module.css";

// utils
import handleBtnDisable from "../../../../utils/handleBtnDisable";

// Api 
import { useGetCommentsQuery } from "../../../../../../services/api/commentsApiSlice";

// store 
import { useCommentStore } from "../../../../../../../react/UI/comments/zustand/store";

// action buttons
const ActionsButton = ({ data }) => {

    const { commentState } = useCommentStore();
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

    return (
        <>
            {data?.button?.map((btn, i) => {
                if (btn.button_type === "redirect_url") {
                    return (
                        <button
                            disabled={handleBtnDisable(7)}
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
                }
            })}
        </>
    );
};

export default React.memo(ActionsButton);
