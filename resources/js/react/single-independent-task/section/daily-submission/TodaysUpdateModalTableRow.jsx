/* eslint-disable react/prop-types */
import { useState } from "react";
import FileUploader from "../../../file-upload/FileUploader";
import CKEditorComponent from "../../../ckeditor";
import SubmitButton from "../../components/SubmitButton";
import { convertTime } from "../../../utils/converTime";
import { Placeholder } from "../../../global/Placeholder";
import Checkbox from "../../../UI/form/Cheeckbox";
import { useSubmitDailySubmissionMutation } from "../../../services/api/dailySubmissionApiSlice";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const TodaysUpdateModalTableRow = ({ data, date, index, open, setOpen, loading, refetch }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [attachmentLink, setAttachmentLink] = useState('');
    const [checked, setChecked] = useState(false);
    const [files, setFiles] = useState([]);
    const [taskDescription, setTaskDescription] = useState('');
    const [updatedValue,] = useState(null);
    const [completedSection, setCompletedSection] = useState('');
    const [submitDailySubmission, { isLoading: isSubmitting }] = useSubmitDailySubmissionMutation();
    

    // error state
    const [attachmentLinkError, setAttachmentLinkError] = useState('');
    const [taskDescriptionError, setTaskDescriptionError] = useState('');
    const [completedSectionError, setCompletedSectionError] = useState('')

    // check validation of attachmentLink and taskDescription
    const isValid = () => {
        let valid = true;
        if (attachmentLink === '') {
            setAttachmentLinkError('You must provide the link of your work');
            valid = false;
        }
        if (taskDescription === '') {
            setTaskDescriptionError("Please describe what you've done !");
            valid = false;
        }
        if (completedSection === '') {
            setCompletedSectionError("You must provide at least one section name that you have completed");
            valid = false;
        }
        return valid;
    }


    // daily update submission function
    const handleSubmit = () => {
        if (!isValid()) {
            return;
        }
        const formData = new FormData();
        formData.append('task_id', data.id);
        formData.append('user_id', window.Laravel?.user?.id)
        formData.append('project_id', data.projectId);
        formData.append('task_heading', data.task_title);
        formData.append('client_id', data.clientId);
        formData.append('client_name', data.client_name);
        formData.append('hours_spent', data.total_time_spent);
        formData.append('link_name', attachmentLink);
        formData.append('section_name', completedSection);
        formData.append('comment', taskDescription);
        formData.append('mark_as_complete', checked);
        formData.append('report_date', date);
        const _token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        formData.append("_token", _token);
        files.forEach((file) => formData.append('file[]', file))


        submitDailySubmission(formData)
            .unwrap()
            .then(res => {
                // console.log(res);
                if (res.mark_as_complete==="true" || res.mark_as_complete===true) {
                    navigate(`${location.pathname}?modal=complete-task`);
                }
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Submitted successfully'
                })
                setOpen(null);
                refetch();
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <tr
                className={`sp1_tlr_tr ${open === index && 'openRow_bg'}`}
                // style={{
                //     backgroundColor: `${data.daily_submission_status ? 'lightgreen' : 'white'}`
                // }}
            >

                <td className={`sp1_tlr_td`} style={{ minWidth: '50px' }}>{loading ? <Placeholder /> : index + 1}</td>
                <td className={`sp1_tlr_td`}>{loading ? <Placeholder /> : data?.task_title}</td>
                <td className={`sp1_tlr_td`}>{loading ? <Placeholder /> : 
                    data?.page_url ?
                        <a href={data.page_url} title={data.page_url} target="_blank">View Link</a>
                        :
                        'No Link attached'
                }</td>
                <td className={`sp1_tlr_td`}>{loading ? <Placeholder /> : convertTime(data.total_time_spent)}</td>
                <td className={`sp1_tlr_td`}>{loading ? <Placeholder /> : (data?.client_name ?? 'N/A')}</td>
                <td className={`sp1_tlr_td`}>
                    {
                        loading ?
                            <Placeholder />
                            :
                            <button
                                onClick={() => {
                                    if (data.daily_submission_status) {
                                        return;
                                    }
                                    setOpen((prev) => {
                                        if (prev === index) {
                                            return null;
                                        } else {
                                            return index;
                                        }
                                    })
                                }
                                }
                                className={`btn btn-sm ${data.daily_submission_status ? 'btn-success' : 'btn-outline-success'}`}
                            >
                                {
                                    data.daily_submission_status ? 'Submitted' : 'Click To Submit'
                                }
                            </button>
                    }
                </td>
            </tr>
            {open === index && (
                <tr className={``} style={{ border: "solid gray 1px", borderTop: "none" }}>
                    <td colSpan={6}>
                        <form className="from_body openRow_bg">

                            {/* completed section names */}
                            <div className="form-group">
                                <label htmlFor="sectionName">
                                    Completed Section Name <sup>*</sup>
                                    <span
                                        className="ml-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Sections Name"
                                        data-boundary="window"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <i className="fa-regular fa-circle-question" />
                                    </span>
                                </label>
                                <input
                                    value={completedSection}
                                    type="text"
                                    id="sectionName"
                                    style={{
                                        width: '100%',
                                        margin: '2px 0',
                                        borderRadius: '3px',
                                        border: 'none',
                                        fontSize: '1.2rem',
                                        padding: '10px',
                                        color: 'gray'
                                    }}
                                    onChange={(e) => setCompletedSection(e.target.value)}
                                />
                                {completedSectionError && <small className="form-text text-danger">{completedSectionError}</small>}
                            </div>

                            {/* attachment url link */}
                            <div className="form-group">
                                <label htmlFor="sectionName">
                                    Screenshots/Screen records of the sections <sup>*</sup>
                                    <span
                                        className="ml-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Sections Name"
                                        data-boundary="window"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <i className="fa-regular fa-circle-question" />
                                    </span>
                                </label>
                                <input
                                    value={attachmentLink}
                                    type="text"
                                    id="sectionName"
                                    style={{
                                        width: '100%',
                                        margin: '2px 0',
                                        borderRadius: '3px',
                                        border: 'none',
                                        fontSize: '1.2rem',
                                        padding: '10px',
                                        color: 'gray'
                                    }}
                                    onChange={(e) => setAttachmentLink(e.target.value)}
                                />
                                {attachmentLinkError && <small className="form-text text-danger">{attachmentLinkError}</small>}
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
                                <label htmlFor="exampleFormControlInput2" style={{ maxWidth: '95%' }}>
                                    Describe which sections you have worked on today <sup className="text-danger">*</sup>
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

                                <div
                                    className="sp1_st_write_comment_editor"
                                    style={{ minHeight: "100px" }}
                                >
                                    <CKEditorComponent
                                        value={taskDescription}
                                        onChange={(e, editor) => {
                                            const data = editor.getData();
                                            setTaskDescription(data);
                                        }}
                                    />
                                </div>
                                {taskDescriptionError && <small className="form-text text-danger">{taskDescriptionError}</small>}
                            </div>

                            <div className="form-group">
                                <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label={'Mark as Complete'} className="user-select-none" />
                            </div>

                            <div className="mt-3 d-flex align-items-center" style={{ gap: '5px' }}>
                                <SubmitButton onClick={handleSubmit} isLoading={isSubmitting} title="Submit" />
                                {/* <SubmitButton onClick={()=>{}} isLoading={false} title="Submit & Mark as Complete"></SubmitButton> */}
                            </div>
                        </form>
                    </td>
                </tr>
            )}
        </>
    );
};

export default TodaysUpdateModalTableRow;
