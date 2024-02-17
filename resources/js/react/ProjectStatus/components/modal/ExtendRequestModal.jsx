import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { Flex } from "../table/ui";
import CKEditorComponent from "../../../ckeditor";

import FileUpload from "./FileUpload";
import { useCreateExtendRequestMutation } from "../../../services/api/projectStatusApiSlice";

const ExtendRequestModal = ({ projectDetails, isOpen, onClose,extendRequestData }) => {
    const [extendedDaysData, setExtendedDaysData] = useState("");
    const [reasonData, setReasonData] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formError, setFormError] = React.useState(null);
    const handleResetForm = () => {
        setExtendedDaysData("");
        setReasonData("");
        setSelectedFiles([]);
    };
    const [submitData, { isLoading }] = useCreateExtendRequestMutation();

    useEffect(() => {
        handleResetForm();
    }, []);

    const handleReasonChange = (e, editor) => {
        setReasonData(editor.getData());
    };
    const handleExtendedDaysDataChange = (e) => {
        setExtendedDaysData(e.target.value);
    };

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
        if (!isValid()) {
            toast.error("Missing required field or invalid input");
            return;
        }

        e.preventDefault();
        const fd = new FormData();
        fd.append("extended_day", extendedDaysData ?? "");
        fd.append("is_client_communication", reasonData ?? "");
        fd.append("goal_id", extendRequestData?.goal_id ?? "");
        Array.from(selectedFiles).forEach((file) => {
            fd.append("screenshot[]", file);
        });
        fd.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );

        if (isValid()) {
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
        } else {
            toast.error("Please fillup all required fields");
        }
    };

    console.log("projectDetails", extendRequestData);

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
                    marginBottom: "20px",
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
                        backgroundColor: "red",
                        padding: "2px 4px 2px 4px",

                        color: "white",
                    }}
                >
                    <IoClose />
                </button>
            </div>

            <section style={styles.container}>
                <div>
                    <p>
                        <strong>Project Name </strong>{" "}
                        {projectDetails.project_name}
                    </p>
                    <p>
                        <strong>Client:</strong> {projectDetails.clientName}
                    </p>

                    <p>
                        <strong>Project Budget:</strong> $
                        {projectDetails.project_budget}
                    </p>

                    <Flex justifyContent="left" style={{ marginTop: "10px" }}>
                        <strong>Extended days:</strong>
                        <input
                            placeholder="Enter the extended days"
                            value={extendedDaysData}
                            error={formError?.extendedDaysData}
                            required={true}
                            onChange={handleExtendedDaysDataChange}
                            style={{ padding: "5px" }}
                        ></input>
                    </Flex>

                    <FileUpload
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
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
                            <CKEditorComponent onChange={handleReasonChange} />
                        </div>
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
