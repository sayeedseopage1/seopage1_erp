import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { Flex } from "../table/ui";
import CKEditorComponent from "../../../ckeditor";

import FileUpload from "./FileUpload";
import { useCreateExtendRequestMutation } from "../../../services/api/projectStatusApiSlice";
import { isStateAllHaveValue, markEmptyFieldsValidation } from "../../../utils/stateValidation";

const ExtendRequestModal = ({ projectDetails, isOpen, onClose,extendRequestData }) => {
    const [extendReqestData, setExtendReqestData] = useState({
        extended_day: "",
        is_client_communication: "",
        goal_id: extendRequestData?.goal_id,
    });
    const [extendReqestDataValidation, setExtendReqestDataValidation] = useState({
        extended_day: false,
        is_client_communication: false,
        isSubmitting: false,
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formError, setFormError] = React.useState(null);
    const [submitData, { isLoading }] = useCreateExtendRequestMutation();

 

  

    // check validation
    const isValid = () => {
        let err = new Object();
        let errCount = 0;

        if (extendedDaysData === "") {
            (err.extendedDaysData = "This field is required!"), errCount++;
        }

        if (reasonData === "") {
            (err.reasonData = "This field is required!"), errCount++;
        }
        // if (selectedFiles === "") {
        //     (err.selectedFiles = "This field is required!"), errCount++;
        // }

        setFormError(err);
        return !errCount;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEmpty = isStateAllHaveValue(extendReqestData);

        if (isEmpty) {
            const validation = markEmptyFieldsValidation(extendReqestData);
            setExtendReqestDataValidation({
                ...extendReqestDataValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }

        const fd = new FormData();
        fd.append("extended_day", extendReqestData.extended_day ?? "");
        fd.append("is_client_communication", extendReqestData?.is_client_communication ?? "");
        fd.append("goal_id", extendReqestData?.goal_id ?? "");
        Array.from(selectedFiles).forEach((file) => {
            fd.append("screenshot[]", file);
        });
        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );

   
        submitData(fd)
                .unwrap()
                .then((res) => {
                    onClose();
                    toast.success("Submission was successful");
                    handleResetForm();
                })
                .catch((err) => {
                    if (err?.status === 422) {
                        toast.error("Please fillup all required fields");
                    }
        });
       
    };

 

    useEffect(() => {
        if(extendReqestDataValidation.isSubmitting){
            const validation = markEmptyFieldsValidation(extendReqestData);
            setExtendReqestDataValidation({
                ...extendReqestDataValidation,
                ...validation,
            });
        }
    }, [extendReqestData, extendReqestDataValidation.isSubmitting]);


    useEffect(() => {
        if(!isOpen){
            setExtendReqestData({
                extended_day: "",
                is_client_communication: "",
            })
            setExtendReqestDataValidation({
                extended_day: false,
                is_client_communication: false,
                isSubmitting: false,
            })
        }


    }, [isOpen]);


    return (
        <ReactModal
            style={customStyles}
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                }}
            >
                <div
                    style={{
                        fontSize: "25px",
                    }}
                >
                    Extend Request
                </div>
                <button
                    onClick={onClose}
                    style={{
                        backgroundColor: "gray",
                        padding: "2px 4px 2px 4px",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "24px",
                        height: "24px",
                    }}
                >
                    <IoClose />
                </button>
            </div>

            <section style={styles.container}>
                <div className="w-100">
                    <div className="my-2 row">
                        <p className="col-4"><strong>Project Name:</strong>{" "}</p>
                        <p className="col-8">{projectDetails.project_name}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Client:</strong>{" "}</p>
                        <p className="col-8">{projectDetails.clientName}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Project Budget:</strong>{" "}</p>
                        <p className="col-8"> {projectDetails?.currency_symbol}{projectDetails.project_budget}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Extended days:</strong>{" "}</p>
                        <div className="col-8">
                            <input
                                placeholder="Enter the extended days"
                                value={extendReqestData.extended_day}
                                error={formError?.extendedDaysData}
                                required={true}
                                onChange={(e) => setExtendReqestData({
                                    ...extendReqestData,
                                    extended_day: e.target.value
                                })}
                                style={{ padding: "5px", borderRadius: "5px" }}
                            />
                            {extendReqestDataValidation.extended_day && <p className="text-danger my-1">Extended days is required</p>}
                        </div>
                    </div>

                    <FileUpload
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        className=""
                    />

                    <div>
                        <p>
                            <strong>Reason:</strong>
                        </p>

                        <div
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        >
                            <CKEditorComponent onChange={(e, editor) => setExtendReqestData({
                                ...extendReqestData,
                                is_client_communication: editor.getData()
                            })} />
                        </div>
                        {
                            extendReqestDataValidation.is_client_communication && <p className="text-danger my-1">Reason is required</p>
                        }
                    </div>

                    <Button
                        variant="success"
                        style={styles.button}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </section>
        </ReactModal>
    );
};

const customStyles = {
    overlay: {
        zIndex: 99999998,
        backgroundColor: "rgba(0, 0, 0, 0.5)",

        margin: "auto auto",
        padding: "20px",
    },
    content: {
        zIndex: 99999999,
        maxWidth: "550px",
        height: "550px",
        maxHeight: "100vh",

        margin: "auto auto",
        padding: "20px",
    },
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
    },

    button: {
        marginTop: "20px",
        marginLeft: "auto",
    },
};
export default ExtendRequestModal;
