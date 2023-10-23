import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import FileUploader from "../../../file-upload/FileUploader";
import CKEditorComponent from "../../../ckeditor/index";
import { useLazyCheckSubTaskStateQuery, useMarkAsCompleteMutation } from "../../../services/api/SingleTaskPageApi";
import _ from "lodash";
import SubmitButton from "../../components/SubmitButton";
import { useDispatch } from "react-redux";
import { setTaskStatus } from "../../../services/features/subTaskSlice";
import Loader from "../../components/Loader";
import {toast} from 'react-toastify'
 

const MarkAsComplete = ({task, auth}) => {
    // form data
    const dispatch = useDispatch();
    const [links, setLinks] = useState([""]);
    const [linkErr, setLinkErr] = useState('');
    const [files, setFiles] = useState([]);
    const [comment, setComment] = useState('');
    const [commentErr, setCommentErr] = useState('');
    const [showAlert, setShowAlert] = useState();

    const [markAsComplete, {isLoading: isSubmitting}] = useMarkAsCompleteMutation();
    const [ checkSubTaskState, {isFetching} ] = useLazyCheckSubTaskStateQuery();

    const [markAsCompleteModaIsOpen, setMarkAsCompleteModalIsOpen] =
        useState(false);

    // toggle
    const toggle = () => {
        if (auth.getRoleId() === 6) {
            checkSubTaskState(task?.id)
            .unwrap()
            .then(res => {
                if(res.status === 'true' || res.status === true){
                      
                    const htmlContent =  <div className="__tostar_modal">
                        <strong>You can't complete this task because you have some pending subtask?</strong>
                        <ul className="py-1">
                            {res.subtasks.map((el, idx) => 
                                <li 
                                    key={el.id} 
                                    style={{listStyle: 'unset', fontSize: '13px'}}
                                > 
                                    <a href={`/account/tasks/${el.id}`}> 
                                       {idx + 1}. {el.heading} 
                                    </a> (<a href={`/account/clients/${el.clientId}`}>{el.client_name}</a>)
                                </li>
                            )}
                        </ul> 
                    </div>
                    ;

                    toast.warn(htmlContent, {
                        position: 'top-center', 
                        icon: false,
                    });
                }else {
                    setMarkAsCompleteModalIsOpen(!markAsCompleteModaIsOpen);
                } 
            }) 
        } else {
            setMarkAsCompleteModalIsOpen(!markAsCompleteModaIsOpen);
        }
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


    // check validation
    const isValid = () => {
        let valid = true;
        if(!_.size(links) || links[0] === ''){
            setLinkErr('You must provide at least one link to your work');
            valid = false;
        }
        if(comment === ''){
            setCommentErr("Please describe what you've done !");
            valid = false;
        }

        return valid;
    }

    // handle submit 
    const handleSubmit = (e) => {
        const formData = new FormData(); 
        formData.append('text', comment);
        formData.append('user_id', auth?.getId());
        formData.append('task_id', task?.id);
        links.map( link => formData.append('link[]', link)); 
        files?.map(file => formData.append('file[]', file));
        formData.append('_token', document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content"));

        if(isValid()){
            markAsComplete(formData)
            .unwrap()
            .then(res => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                })
                
                Toast.fire({
                    icon: 'success',
                    title: 'Task submitted successfully'
                })
                close();
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <>
            <Button
                variant="tertiary"
                onClick={toggle}
                className="d-flex align-items-center btn-outline-dark text-dark"
            >
                {isFetching ? <Loader title="Processing..." /> : <i className="fa-solid fa-check" />}
                <span className="d-inline ml-1"> {isFetching? '': "Mark As Complete" }</span>
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
                    <div className="sp1_mark-as--modal-body px-3" style={{overflow: 'unset'}}>
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

                                {linkErr && <small id="emailHelp" class="form-text text-danger">{linkErr}</small>}

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
                                    Attachments
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
                                <label htmlFor="exampleFormControlInput1" style={{maxWidth: '95%'}}>
                                   Mention clearly if anything asked in the instruction couldn't be done or if there is anything else your reporting boss should know while approving or rejecting this task<sup>*</sup>
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
                                {commentErr && <small id="emailHelp" class="form-text text-danger">{commentErr}</small>}
                            </div>

                            <div className="mt-3 d-flex align-items-center">
                                <Button
                                    variant="tertiary"
                                    className="ml-auto mr-2"
                                    onClick={close}
                                >
                                    Close
                                </Button> 
                                <SubmitButton onClick={handleSubmit} isLoading={isSubmitting} title="Submit" />
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
