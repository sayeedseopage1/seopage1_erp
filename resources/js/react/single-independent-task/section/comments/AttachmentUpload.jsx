import _ from "lodash";
import React from "react";
import { toast } from "react-toastify";
import styled from 'styled-components';
import UploadFilesInLine from "../../../file-upload/UploadFilesInLine";
import Button from "../../../global/Button";
import Switch from "../../../global/Switch";
import { useReplyTaskCommentMutation } from "../../../services/api/TaskCommentApiSlice";

const AttachmentUpload = ({ comment, onReply, close }) => {
    const [files, setFiles] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [replyTaskComment, { isLoading }] = useReplyTaskCommentMutation();

    const visibleToScreenRef = React.useRef(null);
    // update on layout change
    React.useLayoutEffect(() => {
        if (visibleToScreenRef && visibleToScreenRef.current) {
            visibleToScreenRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    // handle update
    const onUpdate = async (e) => {

        // if not select any file show error message
        if(_.size(files) === 0){
           setError(p => ({...p, fileError: "Please select at least one file."}));
           return;
        }

        // create form data
        const formData = new FormData();
        formData.append("reply_text", "");
        formData.append("task_id", comment.task_id);
        formData.append("parent_comment_id", comment.id);
        formData.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );

        Array.from(files).forEach((file) => {
            formData.append("file[]", file);
        });

        // submit form
        try {
            const response = await replyTaskComment({ formData, commentId: comment.id });
            if(response){
                toast.success("Your files has been successfully uploaded.");
                onReply();
                close();
            }
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="mt-3 pl-3 w-100">
            <div className="w-100">
                <React.Fragment>
                    <div className="mt-3">
                        <h6>Attach Files:</h6>
                        <UploadFilesInLine
                            files={files}
                            setFiles={setFiles}
                            uploadInputClass="comment-file-upload"
                            fileWrapperClass="comment-uploaded-file"
                        />

                        {error && error.fileError ? <ErrorText> {error.fileError} </ErrorText> :''}
                    </div>
                </React.Fragment>

                <Switch>
                    <Switch.Case condition={isLoading}>
                        <div className="mt-3 d-flex align-items-center">
                            <Button
                                className="mr-2"
                                isLoading={isLoading}
                                loaderTitle="Processing.."
                            >
                                Processing...
                            </Button>
                        </div>
                    </Switch.Case>

                    <Switch.Case condition={!isLoading}>
                        <div className="mt-3 d-flex align-items-center">
                            <Button className="mr-2" onClick={onUpdate}>
                                Reply
                            </Button>
                            <Button variant="secondary" onClick={close}>
                                Close
                            </Button>
                        </div>
                    </Switch.Case>
                </Switch>
            </div>

            <div ref={visibleToScreenRef} />
        </div>
    );
};

export default AttachmentUpload;


const ErrorText = styled.div`
    color: red;
`;
