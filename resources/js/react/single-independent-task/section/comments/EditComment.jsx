import _ from "lodash";
import React from "react";
import { toast } from "react-toastify";
import CKEditorComponent from "../../../ckeditor";
import FileUploader from "../../../file-upload/FileUploader";
import Button from "../../../global/Button";
import Switch from "../../../global/Switch";
import { useRemoveCommentPreviousUploadedFileMutation, useUpdateCommentMutation } from "../../../services/api/TaskCommentApiSlice";

const EditComment = ({ comment, updateComments, close }) => {
    const [text, setText] = React.useState(comment.comment);
    const [files, setFiles] = React.useState([]);
    const [previousFiles, setPreviousFiles] = React.useState([
        ..._.map(comment.files_data, (file) => ({ id: file.name, ...file })),
    ]);

    const [updateComment, { isLoading }] = useUpdateCommentMutation();
    const [removeCommentPreviousUploadedFile, {isLoading: uploadingFileDeleting}] = useRemoveCommentPreviousUploadedFileMutation();

    // const isLoading = false;

    const handleEditor = (e, editor) => {
        const data = editor.getData();
        setText(data);
    };

    // handle previous uploaded file delete
    const handlePreviousFileDeleted = (e, file) => {
        console.log("deleted: ", file);
        const data = {
            task_id: comment.task_id,
            comment_id: comment.id,
            file_details: file
        }
        removeCommentPreviousUploadedFile(data)
        .unwrap()
        .then(res => {
            console.log(res)
        })
        .catch(err => {console.log(err)})
    };

    // handle update
    const onUpdate = (e) => {
        const formData = new FormData();
        formData.append("comment", text);
        formData.append("task_id", comment.task_id);
        formData.append("comment_id", comment.id);
        formData.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );
        Array.from(files).forEach((file) => {
            formData.append("file[]", file);
        });


        updateComment({ data: formData, commentId: comment.id })
            .unwrap()
            .then((res) => {
                toast.success("Successfully Updated!");
                updateComments(res.data);

                close();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="mt-3 pl-3 w-100">
            <div className="w-100">
                <React.Fragment>
                    <div className="ck-editor-holder">
                        <CKEditorComponent
                            data={text}
                            onChange={handleEditor}
                        />
                    </div>

                    <div className="mt-3">
                        <h6>Attach Files:</h6>
                        {/* <UploadFilesInLine
                            onPreviousFileDelete={handlePreviousFileDeleted}
                            previous={previousFiles}
                            files={files}
                            setFiles={setFiles}
                            uploadInputClass="comment-file-upload"
                            fileWrapperClass="comment-uploaded-file"
                        /> */}

                        <FileUploader files={files} setFiles={setFiles}>
                            <FileUploader.Input />
                            {comment?.files_data?.map((file) => (
                                <FileUploader.Preview
                                    id={file}
                                    key={file?.name}
                                    fileName={file?.name}
                                    downloadAble={true}
                                    deleteAble={true}
                                    onRemove={handlePreviousFileDeleted}
                                    downloadUrl={file?.url}
                                    previewUrl={file?.url}
                                    fileType={file?.icon}
                                    ext=""
                                />
                            ))}

                            <FileUploader.SelectedFiles>
                                {({previews, onDelete}) => (
                                   _.map(previews, (preview, index) => (
                                        <FileUploader.Preview
                                            id={index}
                                            key={index}
                                            fileName={preview?.name}
                                            downloadAble={true}
                                            deleteAble={true}
                                            onRemove={onDelete}
                                            previewUrl={preview.preview}
                                            fileType={preview.type}
                                            ext={preview.ext}
                                        />
                                   ))
                                )}
                            </FileUploader.SelectedFiles>
                        </FileUploader>
                    </div>
                </React.Fragment>

                <Switch>
                    <Switch.Case condition={isLoading}>
                        <div className="mt-3 d-flex align-items-center">
                            <Button
                                className="mr-2"
                                isLoading={isLoading}
                                loaderTitle="Updating.."
                            >
                                Processing...
                            </Button>
                        </div>
                    </Switch.Case>

                    <Switch.Case condition={!isLoading}>
                        <div className="mt-3 d-flex align-items-center">
                            <Button className="mr-2" onClick={onUpdate}>
                                Update
                            </Button>
                            <Button variant="secondary">Close</Button>
                        </div>
                    </Switch.Case>
                </Switch>
            </div>
        </div>
    );
};

export default EditComment;
