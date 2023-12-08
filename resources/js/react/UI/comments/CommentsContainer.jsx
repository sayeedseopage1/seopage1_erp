import React from "react";
import { useWindowSize } from "react-use";
import CustomModal from "./components/CustomModal";
import Modal from "./components/Modal";
import CommentsBody from "./CommentsBody";
import { useState } from "react";
import commentDemoData from "./_Data/commentDemoData";
import { useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../../services/api/commentsApiSlice";

const demoComments = commentDemoData(20);

const CommentsContainer = ({
    toggleRef = null,
    isOpen,
    close,
    task,
    comments = null,
    onCommentPost,
}) => {
    // ---------------------------------------------------------
    const param = useParams();
    // console.log({ param });

    // ---------------------------------------------------------

    const { width } = useWindowSize();
    const [fullScreenView, setFullScreenView] = useState(false);
    const { data, isFetching, isLoading, refetch } = useGetCommentsQuery(
        param?.taskId
    );

    if (fullScreenView) {
        return (
            <Modal isOpen={isOpen}>
                <div className="position-relative">
                    <div
                        className="sp1_task_comment_modal"
                        style={{
                            width: "100vw",
                            height: "100vh",
                            maxHeight: "100vh",
                        }}
                    >
                        {/* modal body (start) */}
                        {isOpen && (
                            <CommentsBody
                                fullScreenView={fullScreenView}
                                setFullScreenView={setFullScreenView}
                                close={close}
                                // comments={param?.taskId?data:comments}
                                comments={demoComments}
                                loading={isFetching || isLoading}
                                refetch={refetch}
                            />
                        )}
                        {/* modal body (end) */}
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <React.Fragment>
            {width > 1200 ? (
                <CustomModal toggleRef={toggleRef} isOpen={isOpen}>
                    <div className="sp1_task_comment_modal">
                        {/* modal body (start) */}
                        {/* <div className='border-bottom pb-2 d-flex align-items-center'>
                    <Button
                        aria-label="close-modal"
                        className='_close-modal ml-auto'
                        onClick={close}
                    >
                        <i className="fa-solid fa-xmark" />
                    </Button>
                </div> 
                <div className='d-flex flex-column pt-3'>
                    <CommentSendBox  onCommentPost ={onCommentPost} task={task}/>  
                    <div className='sp1_task_comment_list mt-4'>
                        <div className='font-weight-bold pb-3'>Comments: </div>
                        <div className='sp1_task_comment_list_items'>
                            {comments?.length > 0 && comments?.map(comment => (
                                <React.Fragment key={comment.id} >
                                    <React.Suspense fallback={<InnerCommentLoader />}>
                                        <InnerComment comment={comment} />
                                    </React.Suspense> 
                                </React.Fragment>
                            )) }
                        </div>
                    </div>
                </div>  */}
                        {isOpen && (
                            <CommentsBody
                                fullScreenView={fullScreenView}
                                setFullScreenView={setFullScreenView}
                                close={close}
                                // comments={param?.taskId?data:comments}
                                comments={demoComments}
                                loading={isFetching || isLoading}
                                refetch={refetch}
                            />
                        )}
                        {/* modal body (end) */}
                    </div>
                </CustomModal>
            ) : (
                <React.Fragment>
                    <Modal isOpen={isOpen}>
                        <div className="position-relative">
                            <div className="sp1_task_comment_modal --small-device">
                                {/* modal body (start) */}
                                {/* <div className='border-bottom pb-2 d-flex align-items-center'>
                        <Button
                            aria-label="close-modal"
                            className='_close-modal ml-auto'
                            onClick={close}
                        >
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div> 
                    <div className='d-flex flex-column pt-3'>
                        <CommentSendBox  onCommentPost ={onCommentPost} task={task}/>  
                        <div className='sp1_task_comment_list mt-4'>
                            <div className='font-weight-bold pb-3'>Comments: </div>
                            <div className='sp1_task_comment_list_items'>
                                {comments?.length > 0 && comments?.map(comment => (
                                    <React.Fragment key={comment.id} >
                                        <React.Suspense fallback={<InnerCommentLoader />}>
                                            <InnerComment comment={comment} />
                                        </React.Suspense> 
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>  */}
                                {isOpen && (
                                    <CommentsBody
                                        fullScreenView={fullScreenView}
                                        setFullScreenView={setFullScreenView}
                                        close={close}
                                        // comments={param?.taskId?data:comments}
                                        comments={demoComments}
                                        loading={isFetching || isLoading}
                                        refetch={refetch}
                                    />
                                )}
                                {/* modal body (end) */}
                            </div>
                        </div>
                    </Modal>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default CommentsContainer;
