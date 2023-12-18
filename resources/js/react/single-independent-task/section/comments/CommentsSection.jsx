import * as React from "react";
import Comment from "./Comment";
import CommentModal from "./CommentModal";
import Button from "../../components/Button";
import CommentWritingModal from "./CommentWritingModal";
import { useLazyGetTaskDetailsQuery } from "../../../services/api/SingleTaskPageApi";
import _ from "lodash";
import Widget from "./Widget";
import { useGetTaskCommentsQuery } from "../../../services/api/TaskCommentApiSlice";
import CommentsContainer from "../../../UI/comments/CommentsContainer";

const CommentSection = ({ task, isLoading }) => {
    // const [comments, setComments] = React.useState([]);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [openAddCommentModal, setOpenAddCommentModal] = React.useState(false);
    const [modalToggleRef, setModalToggleRef] = React.useState(null);

    const toggleModalButton = () => setModalIsOpen(!modalIsOpen);
    const toggleAddCommentModal = () =>
        setOpenAddCommentModal(!openAddCommentModal);
    const closeAddCommentModal = () => setOpenAddCommentModal(false);

    // const [getTaskDetails, { isFetching }] = useLazyGetTaskDetailsQuery();
    const { data, isLoading: isFetching } = useGetTaskCommentsQuery(task.id, {
        skip: !task.id,
    });

    const comments = _.orderBy(data, "id", "desc");

    // console.log({comments})
    // // if task notes fetch completed store data into redux store
    // React.useEffect(() => {
    //     if (task && task.id) {
    //         getTaskDetails(`/${task?.id}/json?mode=task_comment`)
    //             .unwrap()
    //             .then((res) => {
    //                 let r = _.orderBy([...res], "id", "desc");
    //                 setComments(r);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // }, []);

    // on comment post
    const onCommentPost = (comment) => {
        const _comments = [...comments];
        _comments.unshift(comment);
        // setComments(_comments);
    };

    const updateComments = (comment) => {
        let _comments = comments;
        _comments = _.map(_comments, (c) =>
            c.id === comment.id ? comment : c
        );
        // setComments(_comments);
    };

    return (
        <>
            <div
                className="sp1_task_right_card mb-3"
                ref={setModalToggleRef}
                style={{ zIndex: modalIsOpen ? "99" : "" }}
            >
                {/* <CommentModal
                    isOpen={modalIsOpen}
                    toggleRef={modalToggleRef}
                    comments={comments}
                    task={task}
                    isLoading={isFetching}
                    close={() => setModalIsOpen(false)}
                    onCommentPost={onCommentPost}
                    updateComments={updateComments}
                /> */}

                <CommentsContainer
                    isOpen={modalIsOpen}
                    toggleRef={modalToggleRef}
                    comments={comments}
                    task={task}
                    close={() => setModalIsOpen(false)}
                    onCommentPost={onCommentPost}
                />

                <button
                    aria-label="openCommentModalButton"
                    className="sp1_task_right_dl_toggle"
                    onClick={toggleModalButton}
                    style={{ zIndex: modalIsOpen ? "110" : "" }}
                >
                    <i
                        className={`fa-solid fa-circle-chevron-${
                            modalIsOpen ? "right" : "left"
                        }`}
                        style={{ color: "#276fec" }}
                    />
                </button>

                <div className="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
                    <h6 className="f-16 mb-0">Comment</h6>
                    {(isLoading || isFetching) && (
                        <div
                            className="spinner-border text-dark ml-2 mr-auto"
                            role="status"
                            style={{
                                width: "16px",
                                height: "16px",
                                border: "0.14em solid rgba(0, 0, 0, .25)",
                                borderRightColor: "transparent",
                            }}
                        />
                    )}
                    <Button
                        variant="tertiary"
                        className="sp1_tark_add_item"
                        aria-label="addButton"
                        onClick={toggleModalButton}
                    >
                        <i
                            className="fa-solid fa-plus"
                            style={{ fontSize: "12px" }}
                        />
                        Comment
                    </Button>

                    <CommentWritingModal
                        isOpen={openAddCommentModal}
                        close={closeAddCommentModal}
                    />
                </div>

                <div className="sp1_task_right_card--body">
                    <Widget task={task} />

                    {/*
                    {!isFetching && !isLoading ? (
                        comments?.length > 0 ? (
                            comments?.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))
                        ) : (
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    color: "#B4BCC4",
                                    fontSize: "15px",
                                    textAlign: "center",
                                    height: "100%",
                                    width: "100%",
                                }}
                            >
                                No Comment is Available
                            </div>
                        )
                    ) : (
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                color: "#5A6169",
                                fontSize: "15px",
                                textAlign: "center",
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <div
                                className="spinner-border text-dark ml-2"
                                role="status"
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    border: "0.14em solid rgba(0, 0, 0, .25)",
                                    borderRightColor: "transparent",
                                    marginRight: "10px",
                                }}
                            />
                            Loading...
                        </div>
                    )} */}
                </div>
            </div>
        </>
    );
};

export default CommentSection;
