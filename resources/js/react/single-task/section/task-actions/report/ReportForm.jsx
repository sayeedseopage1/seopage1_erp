import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { HiOutlineSelector } from "react-icons/hi";
import Button from "../../../components/Button";
import SubmitButton from "../../../components/SubmitButton";
import CKEditorComponent from "../../../../ckeditor";
import UserSelectionList from "../stop-timer/options/UserSelectionList";
import { useCreateReportMutation } from "../../../../services/api/SingleTaskPageApi";

const reports = [
    {
        id: 1,
        name: "Project Manager/Lead Developer Is Making Me Do Their Work Without Top Managements’ Authorization",
    },
    {
        id: 2,
        name: "Need Further Clarification From Lead Developer/Project Manager",
    },
];

const ReportForm = ({close}) => {
    const [reason, setReason] = useState({});
    const [person, setPerson] = useState({});
    const [comment, setComment] = useState("");
    const [previousNotedIssue, setPreviousNotedIssue] = useState("");


    const [createReport, {isLoading}] = useCreateReportMutation();


    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
    });

    const onSubmit =(e)=>{
        e.preventDefault();
        const data = {
            reason: reason?.name,
            person: person?.id,
            comment,
            previousNotedIssue,
            user_id: window?.Laravel?.user?.id
        }
        
        createReport(data).unwrap()
        .then((res) => { 
            Toast.fire({
                icon: 'success',
                title: "Report Issued Successfully!"
            });  
            close();
        })
    }

    return (
        <React.Fragment>
            <form className="px-3">
                {/* reason selection */}
                <div className="form-group">
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
                                        {report?.name}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                    </div>
                </div>
                {/* reason selection end */}

                <div className="form-group">
                    <label htmlFor="" className="font-weight-bold">
                        Responsible Person
                    </label>
                    <div className="position-relative w-100 mb-3">
                        <UserSelectionList person={person} setPerson={setPerson} />
                    </div>
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
