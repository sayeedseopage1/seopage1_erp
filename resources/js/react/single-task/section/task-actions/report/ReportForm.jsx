import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { HiOutlineSelector } from "react-icons/hi";
import Button from "../../../components/Button";
import SubmitButton from "../../../components/SubmitButton";
import CKEditorComponent from "../../../../ckeditor";
import UserSelectionList from "../stop-timer/options/UserSelectionList";
import { useCreateReportMutation } from "../../../../services/api/SingleTaskPageApi";
import { User } from "../../../../utils/user-details";



const ReportForm = ({close, task, onSuccess}) => {
    const [reason, setReason] = useState(null);
    const [person, setPerson] = useState(null);
    const [comment, setComment] = useState("");
    const [previousNotedIssue, setPreviousNotedIssue] = useState("");
    const [error, setError]  = useState("");
    const auth = new User(window.Laravel.user);

    const [createReport, {isLoading}] = useCreateReportMutation(); 


    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
    });

    const isValid = () => {
        let err = new Object();
        let errCount = 0;

        if(!reason){
            errCount++;
            err.reason = 'Please select a reason for report!'
        }

        if(!person){
            errCount++;
            err.person = 'Select the responsible person!';
        }

        if(comment === ''){
            errCount++;
            err.comment = 'Please write a briefly describe about this report!'
        }

         if(previousNotedIssue === ''){
            errCount++;
            err.previousReport = 'You have to select an option.'
        }

        setError(err);
        return !errCount;
    }

    const onSubmit =(e)=>{
        e.preventDefault();
        const data = {
            reason: reason?.name,
            person: person?.id,
            comment,
            previousNotedIssue,
            user_id: window?.Laravel?.user?.id,
            task_id: task?.id
        }
        
        if(isValid()){
            createReport(data).unwrap()
            .then((res) => { 
                Toast.fire({
                    icon: 'success',
                    title: "Report Issued Successfully!"
                });
                close();
                onSuccess();
            })
        }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fillup the all required fields!",
                showConfirmButton: true,
            }); 
        }
    }

    // get user 
    const users = auth?.getRoleId() === 6 ? [4, 8] : [4, 6]
    const reports = [
        {
            id: 1,
            name: `Project Manager /Team Lead ${auth?.getRoleId() === 6 ? '' : '/ Lead Developer'} Is Making Me Do Their Work Without Top Managements’ Authorization`,
            info: "Your report will be kept private and management won't disclose your name to anyone including the project manager and lead developer!",
        },
        {
            id: 2,
            name: `Need Further Clarification From ${auth?.getRoleId() === 6 ? 'Team Lead':'Lead Developer'} / Project Manager`,
            info: '',
        },
    ];

    return (
        <React.Fragment>
            <form className="px-3"> 
                <div className="form-group">
                    {reason?.info && <div className="f-12 alert alert-info py-1">{reason?.info}</div>}
                    <label htmlFor="" className="font-weight-bold">Select Reason for report</label> 
                    <div className="position-relative w-100 mb-3">
                        <Listbox value={reason} onChange={setReason}>
                            <Listbox.Button className="w-100 bg-white py-2 pl-2 pr-1 border text-left d-flex align-items-center justify-content-between">
                                <span className="mr-auto">
                                    {reason?.name ?? <span style={{color: '#aaa'}}> -- </span>}
                                </span>
                                <HiOutlineSelector className="f-16" />
                            </Listbox.Button>

                            <Listbox.Options
                                className="position-absolute bg-white p-2 shadow w-100"
                                style={{
                                    zIndex: 10,
                                    maxHeight: "350px",
                                    overflowY: "auto",
                                }}
                            >
                                {reports?.map((report) => (
                                    <Listbox.Option
                                        key={report.id}
                                        value={report}
                                        className={({ selected, active }) =>
                                            selected
                                                ? "task-selection-list-option selected"
                                                : active
                                                ? "task-selection-list-option active"
                                                : "task-selection-list-option"
                                        }
                                    >
                                        <div>
                                            <div>{report?.name}</div>
                                        </div>
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                    </div>
                    {error?.reason && <div className="f-14" style={{color:'red'}}>{error?.reason}</div>}
                </div>
                {/* reason selection end */}

                <div className="form-group">
                    <label htmlFor="" className="font-weight-bold">
                        Responsible Person
                    </label>
                    <div className="position-relative w-100 mb-3">
                        <UserSelectionList person={person} setPerson={setPerson} roles={users} />
                    </div>
                    {error?.person && <div className="f-14" style={{color:'red'}}>{error?.person}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="editor" className="font-weight-bold">
                        Briefly describe the problem here...
                    </label>
                    <div className="ck-editor-holder">
                        <CKEditorComponent
                            onChange={(e, editor) => {
                                const data = editor.getData();
                                setComment(data);
                            }}
                        />
                    </div>
                    {error?.comment && <div className="f-14" style={{color:'red'}}>{error?.comment}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="" className="font-weight-bold">
                        Did you report the same issue previously?
                    </label>
                    <div className="">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="yes"
                                onChange={(e) =>
                                    setPreviousNotedIssue(e.target.value)
                                }
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inlineRadio1"
                            >
                                Yes
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="no"
                                onChange={(e) =>
                                    setPreviousNotedIssue(e.target.value)
                                }
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inlineRadio2"
                            >
                                No
                            </label>
                        </div>
                    </div>
                    {error?.previousReport && <div className="f-14" style={{color:'red'}}>{error?.previousReport}</div>}
                </div>

                <div className="my-3 d-flex align-items-center">
                    <Button
                        variant="tertiary"
                        onClick={close}
                        className="ml-auto mr-2"
                    >
                        Close
                    </Button>

                    <SubmitButton onClick={onSubmit} isLoading={isLoading} title="Report" />
                </div>
            </form>
        </React.Fragment>
    );
};

export default ReportForm;
