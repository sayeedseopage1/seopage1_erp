import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import CKEditorComponent from "../../../ckeditor";
import FileUpload from "./FileUpload";
import { useCreateExtendRequestMutation } from "../../../services/api/projectStatusApiSlice";
import { isStateAllHaveValue, markEmptyFieldsValidation } from "../../../utils/stateValidation";

const ExtendRequestModal = ({ projectDetails, isOpen, onClose, extendRequestGoalId }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [extendRequestData, setExtendRequestData] = useState({
        extended_day: null,
        is_client_communication: "",
        goal_id: extendRequestGoalId,
    });
    const [extendRequestDataValidation, setExtendRequestDataValidation] = useState({
        extended_day: false,
        is_client_communication: false,
        isSubmitting: false,
    });
    const [submitData, { isLoading }] = useCreateExtendRequestMutation();
  
    // Reset form
    const handleResetForm = () => {
        setExtendRequestData({
            extended_day: "",
            is_client_communication: "",
            goal_id: extendRequestGoalId,
        });
        setSelectedFiles([]);
        setExtendRequestDataValidation({
            extended_day: false,
            is_client_communication: false,
            isSubmitting: false,
        });
    }

    // Submit data
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if fields are empty using state validation
        const isEmpty = isStateAllHaveValue(extendRequestData);
        if (isEmpty) {
            const validation = markEmptyFieldsValidation(extendRequestData);
            setExtendRequestDataValidation({
                ...extendRequestDataValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }
        // append data to form data
        const fd = new FormData();
        fd.append("extended_day", extendRequestData.extended_day ?? "");
        fd.append("is_client_communication", extendRequestData?.is_client_communication ?? "");
        fd.append("goal_id", extendRequestData?.goal_id  ?? extendRequestGoalId);
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

 
    // Check if fields are empty
    useEffect(() => {
        if(extendRequestDataValidation.isSubmitting){
            const validation = markEmptyFieldsValidation(extendRequestData);
            setExtendRequestDataValidation({
                ...extendRequestDataValidation,
                ...validation,
            });
        }
    }, [extendRequestData, extendRequestDataValidation.isSubmitting]);

    // Reset form when modal is closed
    useEffect(() => {
        if(!isOpen){
            handleResetForm();
        }
    }, [isOpen]);

    // Set goal id
    useEffect(() => {
        setExtendRequestData({
            ...extendRequestData,
            goal_id: extendRequestGoalId
        });
    }, [extendRequestGoalId]);


    return (
        <ReactModal
            style={customStyles}
            isOpen={isOpen}
            ariaHideApp={false}
            onRequestClose={onClose}
        >
            <div
                className="d-flex justify-content-between align-items-center mb-3"
            >
                <h6
                    style={{
                        fontSize: "25px",
                    }}
                >
                    Extend Request
                </h6>
                <button
                    onClick={onClose}
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                        backgroundColor: "gray",
                        padding: "2px 4px 2px 4px",
                        color: "white",
                        width: "24px",
                        height: "24px",
                    }}
                >
                    <IoClose />
                </button>
            </div>

            {/* Extend Request Modal Data */}
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
                                value={extendRequestData.extended_day}
                                type="number"
                                required={true}
                                min={1}
                                onChange={(e) => setExtendRequestData({
                                    ...extendRequestData,
                                    extended_day: e.target.value
                                })}
                                style={{ padding: "5px", borderRadius: "5px" }}
                            />
                            {extendRequestDataValidation.extended_day && <p className="text-danger my-1">Extended days is required</p>}
                        </div>
                    </div>

                    {/* Upload Multiple Image or single image */}
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
                            <CKEditorComponent onChange={(e, editor) => setExtendRequestData({
                                ...extendRequestData,
                                is_client_communication: editor.getData()
                            })} />
                        </div>
                        {
                            extendRequestDataValidation.is_client_communication && <p className="text-danger my-1">Reason is required</p>
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

// Modal styles
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
        height: "fit-content",
        maxHeight: "100vh",
        margin: "auto auto",
        padding: "20px",
    },
};

// Styles
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
