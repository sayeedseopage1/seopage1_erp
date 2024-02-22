import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CKEditorComponent from "../../../ckeditor/index";
import FileUploader from "../../../file-upload/FileUploader";
import { useLazyCheckSubTaskStateQuery, useMarkAsCompleteMutation } from "../../../services/api/SingleTaskPageApi";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import SubmitButton from "../../components/SubmitButton";

import { checkIsURL } from '../../../utils/check-is-url';

const MarkAsComplete = ({task, auth}) => {
    // form data
    const dispatch = useDispatch();
    const [links, setLinks] = useState([""]);
    const [linkErr, setLinkErr] = useState('');
    const [files, setFiles] = useState([]);
    const [comment, setComment] = useState('');
    const [commentErr, setCommentErr] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const [markAsComplete, {isLoading: isSubmitting}] = useMarkAsCompleteMutation();
    const [ checkSubTaskState, {isFetching} ] = useLazyCheckSubTaskStateQuery();

    const [markAsCompleteModaIsOpen, setMarkAsCompleteModalIsOpen] =
        useState(false);
    // toggle
    const toggle = () => {
        navigate(`${location.pathname}?modal=complete-task`);
    };

    const [err, setErr] = useState(null);


    useEffect(()=>{
        const url = new URLSearchParams(location.search);

        if (url.get('modal')==='complete-task') {
            if (auth.isHasRolePermission(6) || auth.isHasRolePermission(13)) {
                checkSubTaskState(task?.id)
                .unwrap()
                .then(res => {
                    if(res.status === 'true' || res.status === true){
                        const htmlContent = <ToasterContent data={res} />
                        withReactContent(Swal).fire({
                            html: htmlContent,
                            customClass: {
                                confirmButton: 'btn btn-primary py-1 px-4 f-14',
                            },
                            didClose:() => {close()}
                        });

                    }else {
                        setMarkAsCompleteModalIsOpen(true);
                    }
                })
            } else {
                setMarkAsCompleteModalIsOpen(true);
            };

        }
        else{
            setMarkAsCompleteModalIsOpen(false);
        }

    },[location])

    // close
    const close = () => {
        navigate(`${location.pathname}`);
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
        // if(!_.size(links) || links[0] === ''){
        //     setLinkErr('You must provide at least one link to your work');
        //     toast.warn('You must provide at least one link to your work');
        //     valid = false;
        // }

        // if(_.size(links)){
        //     _.forEach(links, link => {
        //         if(!checkIsURL(link)){
        //             toast.warn('Please provide a valid url');
        //             setLinkErr('Please provide a valid url');
        //             valid = false;
        //         }
        //     })
        // }

        if(comment === ''){
            setCommentErr("Please describe what you've done !");
            toast.warn("Please describe what you've done!");
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
                                    Submit links to the work you've done! 
                                    <span
                                        className="ml-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Submit links to the work you've done!"
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
                                        data={comment}
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


// toaster content
const ToasterContent = ({data}) => {
    return(
        <ToasterContainer>
            <ToasterTitle>You can't complete this task because you have some pending subtask?</ToasterTitle>
            <ToasterListContainer>
                <ToasterList>
                    {data.subtasks.map((el, idx) =>
                        <ToasterListItem key={el.id}>
                            <a href={`/account/tasks/${el.id}`}>
                            {el.heading}
                            </a> ( <a href={`/account/clients/${el.clientId}`}>{el.client_name}</a> )
                        </ToasterListItem>
                    )}
                </ToasterList>
            </ToasterListContainer>
        </ToasterContainer>
    )
}


const ToasterContainer = styled.div`
    text-align: center;
`;
const ToasterTitle = styled.div`
    font-weight: 600;
    font-size: 16px;
`;
const ToasterListContainer = styled.div`
    width: fit-content;
    margin-inline: auto;
`;
const ToasterList = styled.ol`
    margin-top: 1rem;
    list-style: decimal !important;
`;
const ToasterListItem = styled.li`
    font-size: 15px;
    list-style: unset;
    margin-left: 1rem;
    & > a:hover{
        text-decoration: underline;
    }
`;
