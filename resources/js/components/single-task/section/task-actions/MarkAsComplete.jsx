import React, { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import FileUploader from "../../../file-upload/FileUploader";
import CKEditorComponent from "../../../ckeditor/index";

const MarkAsComplete = () => {
    // form data
    const [links, setLinks] = useState([""]);
    const [files, setFiles] = useState([]);
    const [comment, setComment] = useState();

    const [markAsCompleteModaIsOpen, setMarkAsCompleteModalIsOpen] =
        useState(false);

    // toggle
    const toggle = () => {
        setMarkAsCompleteModalIsOpen(!markAsCompleteModaIsOpen);
    };

    // close
    const close = () => {
        setMarkAsCompleteModalIsOpen(false);
    };

    // handle editor change
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    // handle remove link
    const handleRemoveLink = (e, index) => {
        const _links = [...links];
        _links.splice(index, 1);
        setLinks(_links);
    };

    // handle link change
    const handleOnLinkInputChange =(e, index) => {
        const _links = [...links];
        _links[index] = e.target.value,
        setLinks(_links)
    }


    // handle submit 
    const handleSubmit = (e) => {
        const formData = new FormData(); 
        formData.append('comment', comment);
        links.map( link => formData.append('link', link)); 
        files?.map(file => formData.append('file', file));

        console.log({
            comment: formData.get('comment'),
            link: formData.getAll('link'),
            file: formData.getAll('file')
        })
    }

    return (
        <>
            <Button
                variant="tertiary"
                onClick={toggle}
                className="d-flex align-items-center btn-outline-dark mr-2 text-dark"
            >
                <i className="fa-solid fa-check" />
                <span className="d-inline ml-1">Mark As Complete</span>
            </Button>

            <Modal isOpen={markAsCompleteModaIsOpen} className="sp1_mark-as--modal"> 
                <div className="sp1_single_task--modal-panerl-wrapper">

                <div className="sp1_mark-as--modal-panel">
                    {/* heading bar */}
                    <div className="sp1_mark-as--modal-heading">
                        <h6 className="mb-0">Submit Task</h6>

                        <Button aria-label="closeModal" onClick={close}>
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>

                    {/* body */}
                    <div className="sp1_mark-as--modal-body" style={{overflow: 'unset'}}>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">
                                    Submit Links What You've Done<sup>*</sup>
                                    <span
                                        className="ml-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Submit Links What You've Done"
                                        data-boundary="window"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <i className="fa-regular fa-circle-question" />
                                    </span>
                                </label>
                                {links?.map((link, i) => (
                                    <div
                                        key={i}
                                        className="mark-as-compeleted-link mb-2"
                                    >
                                        <input
                                            type="text"
                                            className="form-control py-2"
                                            id="exampleFormControlInput1"
                                            placeholder="--"
                                            value={link}
                                            onChange={e => handleOnLinkInputChange(e, i)}
                                        />

                                        {links?.length > 1 && (
                                            <button
                                                onClick={(e) =>
                                                    handleRemoveLink(e, i)
                                                }
                                            >
                                                <i className="fa-regular fa-trash-can"></i>
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    className="mt-2 d-flex align-items-center bg-transparent"
                                    style={{ gap: "10px" }}
                                    onClick={(e) =>{
                                         e.preventDefault()
                                        setLinks((prev) => [...prev, ""])
                                    }}
                                >
                                    <i className="fa-solid fa-circle-plus" />
                                    Add Another Link
                                </button>
                            </div>

                            {/* upload files */}
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">
                                    Attachments<sup>*</sup>
                                    <span
                                        className="ml-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Attachment"
                                        data-boundary="window"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <i className="fa-regular fa-circle-question" />
                                    </span>
                                </label>
                                <FileUploader files={files} setFiles={setFiles}>
                                    <FileUploader.Input />
                                    <FileUploader.SelectedFiles>
                                        {({ previews, onDelete }) =>
                                            Array.from(previews)?.map(
                                                (p, i) => (
                                                    <FileUploader.Preview
                                                        key={i}
                                                        id={i}
                                                        fileName={p.name}
                                                        previewUrl={p.preview}
                                                        fileType={p.type}
                                                        onRemove={onDelete}
                                                    />
                                                )
                                            )
                                        }
                                    </FileUploader.SelectedFiles>
                                </FileUploader>
                            </div>
                            {/* End Upload files */}

                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">
                                    Describe What You've Done<sup>*</sup>
                                    <span
                                        className="ml-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Describe What You've Done"
                                        data-boundary="window"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <i className="fa-regular fa-circle-question" />
                                    </span>
                                </label>

                                <div className="ck-editor-holder stop-timer-options">
                                    <CKEditorComponent
                                        onChange={handleEditorChange}
                                    />
                                </div>
                            </div>

                            <div className="mt-3 d-flex align-items-center">
                                <Button
                                    variant="tertiary"
                                    className="ml-auto mr-2"
                                    onClick={close}
                                >
                                    Close
                                </Button>
                                <Button className="" onClick={handleSubmit}> Submit </Button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </Modal>
        </>
    );
};

export default MarkAsComplete;
