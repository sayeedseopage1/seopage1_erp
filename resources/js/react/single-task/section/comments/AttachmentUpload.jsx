import React from "react";
import CKEditorComponent from "../../../ckeditor";
import Button from "../../../global/Button";
import Switch from "../../../global/Switch";
import UploadFilesInLine from "../../../file-upload/UploadFilesInLine";
import _ from "lodash";

const AttachmentUpload = ({ comment }) => {
    const [files, setFiles] = React.useState([]);

    const isLoading = false;

    // handle update
    const onUpdate = (e) => {
        console.log(files)
        const formData = new FormData();
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
        for (const [key, value] of formData.entries()) {
            console.log(key, ": ", value);
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
                            <Button variant="secondary">Close</Button>
                        </div>
                    </Switch.Case>
                </Switch>
            </div>
        </div>
    );
};

export default AttachmentUpload;
