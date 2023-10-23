import React from "react";
import CKEditorComponent from "../../../ckeditor";
import Button from "../../../global/Button";
import Switch from "../../../global/Switch";
import UploadFilesInLine from "../../../file-upload/UploadFilesInLine";
import _, { random } from 'lodash';

const EditComment = ({ comment }) => {
    const [text, setText] = React.useState(comment.comment);
    const [files, setFiles] = React.useState([]);
    const [previousFiles, setPreviousFiles] = React.useState([..._.map(comment.files_data, file => ({id: file.name, ...file}))]);


    const isLoading = false;

    const handleEditor = (e, editor) => {
        const data = editor.getData();
        setText(data);
    };


    // handle previous uploaded file delete
   const handlePreviousFileDeleted = (e, file) => {
        console.log('deleted: ', file)
    }

    // handle update
    const onUpdate = (e) => {
        const formData = new FormData();
        formData.append('comment', text);
        formData.append('task_id', comment.task_id);
        formData.append('_token', document.querySelector("meta[name='csrf-token']").getAttribute("content"));
        Array.from(files).forEach((file) => {
            formData.append('file[]', file);
        });


        // show formData
        for(const [key, value] of formData.entries()){
            console.log(key, ': ', value)
        }


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
                        <UploadFilesInLine
                            onPreviousFileDelete={handlePreviousFileDeleted}
                            previous={previousFiles}
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
