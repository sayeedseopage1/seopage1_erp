import React, { useState } from "react";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { Flex } from "../table/ui";
import CKEditorComponent from "../../../ckeditor";

import FileUpload from "./FileUpload";
import { useCreateExtendRequestMutation } from "../../../services/api/projectStatusApiSlice";

const ExtendRequestModal = ({ projectDetails, isOpen, onClose }) => {
    const [extendedDaysData, setExtendedDaysData] = useState("");
    const [reasonData, setReasonData] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [submitData, { isLoading }] = useCreateExtendRequestMutation();

    const handleReasonChange = (e, editor) => {
        setReasonData(editor.getData());
    };
    const handleExtendedDaysDataChange = (e) => {
        setExtendedDaysData(e.target.value);
    };
    const handleSubmit = async () => {
        try {
            const result = await submitData({
                screenshot: selectedFiles,
                extended_day: extendedDaysData,
                is_client_communication: reasonData,
            }).unwrap();

            if (result?.status) {
                onClose();
                toast.success("Submission was successful");
            } else {
                toast.error("Submission was not successful");
            }
        } catch (error) {
            toast.error("Error submitting data");
        } finally {
            setEditorData("");
        }
    };

    console.log("e ,r s", extendedDaysData, reasonData, selectedFiles);
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
                        <strong htmlFor="itemsPerPage">Extended days:</strong>
                        <input
                            id="itemsPerPage"
                            value={extendedDaysData}
                            onChange={handleExtendedDaysDataChange}
                        ></input>
                    </Flex>
                    <Flex justifyContent="left" style={{ marginTop: "10px" }}>
                        <strong htmlFor="itemsPerPage">Screenshots:</strong>
                        <FileUpload
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                        />
                    </Flex>

                    <div style={styles.reasonContainer}>
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
        maxHeight: "500px",

        margin: "auto auto",
        padding: "20px",
    },
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
    },
    reasonContainer: {
        marginTop: "20px",
    },
    button: {
        marginTop: "20px",
        marginLeft: "auto",
    },
};
export default ExtendRequestModal;
