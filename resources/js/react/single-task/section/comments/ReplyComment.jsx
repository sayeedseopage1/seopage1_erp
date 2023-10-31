import React from "react";
import CKEditorComponent from "../../../ckeditor";
import Button from "../../../global/Button";
import Switch from "../../../global/Switch";
import UploadFilesInLine from "../../../file-upload/UploadFilesInLine";
import _ from "lodash";
import { toast } from "react-toastify";
import { useReplyTaskCommentMutation } from "../../../services/api/TaskCommentApiSlice";

const ReplyComment = ({ comment, close, onReply }) => {
    const [text, setText] = React.useState("");
    const [files, setFiles] = React.useState([]);

    // comment reply api hook from redux toolkit
    const [replyTaskComment, { isLoading }] = useReplyTaskCommentMutation();

    const visibleToScreenRef = React.useRef(null); // reference element
    // update on layout change
    React.useLayoutEffect(() => {
        if (visibleToScreenRef && visibleToScreenRef.current) {
            // scroll into view on visible
            visibleToScreenRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    // handle ck editor text change
    const handleEditor = (e, editor) => {
        const data = editor.getData(); // get editor text
        setText(data);
    };

    // handle update
    const onReplied = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("reply_text", text);
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

        // show formData
        // for(const [key, value] of formData.entries()){
        //     console.log(key, ': ', value)
        // }

        await replyTaskComment({ formData, commentId: comment.id }).then(
            (res) => {
                toast.success("Your reply has been successfully submitted.");
                onReply();
                close();
            }
        );
    };

    return (
        <div className="mt-3 pl-3 w-100">
            <div className="w-100">
                <React.Fragment>
                    <h6>Reply: </h6>
                    <div className="ck-editor-holder">
                        <CKEditorComponent
                            data={text}
                            onChange={handleEditor}
                        />
                    </div>

                    <div className="mt-3">
                        <h6>Attach Files:</h6>
                        <UploadFilesInLine
                            files={files}
                            setFiles={setFiles}
                            uploadInputClass="comment-file-upload"
                            fileWrapperClass="comment-uploaded-file"
                        />
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
                            <Button className="mr-2" onClick={onReplied}>
                                Reply
                            </Button>
                            <Button onClick={close} variant="secondary">
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

export default ReplyComment;
