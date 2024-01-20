import React, { useState } from "react";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
toast;
import { Flex } from "../table/ui";
import CKEditorComponent from "../../../ckeditor";
import {
    useCreateReviewExtendRequestMutation,
    useGetProjectExtendImagesQuery,
} from "../../../services/api/projectStatusApiSlice";
import ImageViewer from "./ImageViewer";
import RefreshButton from "../RefreshButton";
import { toast } from "react-toastify";
const ReviewExtendRequestModal = ({ projectDetails, isOpen, onClose }) => {
    const [commentData, setCommentData] = useState("");
    const [extendedDay, setExtendedDay] = useState(
        projectDetails?.extended_day
    );
    const { data, isFetching, refetch } = useGetProjectExtendImagesQuery(
        projectDetails?.project_id
    );
    const [submitData, { isLoading }] = useCreateReviewExtendRequestMutation();

    const imageData = data?.data;

    const handleResetForm = () => {
        setCommentData("");
    };

    console.log("comment data", commentData);
    const handleAccept = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        console.log("accept data", fd);
        fd.append("extended_day", extendedDay ?? "");
        fd.append("is_any_negligence", commentData ?? "");
        fd.append("project_id", projectDetails?.project_id ?? "");
        fd.append("status", "1");
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
                    toast.error("Please fill up all required fields");
                }
            });
    };

    const handleReject = async (e) => {
        e.preventDefault();
        const fd = new FormData();

        fd.append("extended_day", extendedDay ?? "");
        fd.append("is_any_negligence", commentData ?? "");
        fd.append("project_id", projectDetails?.project_id ?? "");
        fd.append("status", "0");
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
                toast.success("Rejection was successful");
                handleResetForm();
            })
            .catch((err) => {
                if (err?.status === 422) {
                    toast.error("Please fill up all required fields");
                }
            });
    };
    const handleCommentChange = (e, editor) => {
        setCommentData(editor.getData());
    };
    const handleExtendedDayChange = (e) => {
        setExtendedDay(e.target.value);
    };

    console.log("extend days", extendedDay);

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
                    Review Extend Time
                </div>

                <RefreshButton onClick={refetch} isLoading={isFetching} />
            </div>

            <section style={styles.container}>
                <div>
                    <p>
                        <strong>Project Name</strong>{" "}
                        {projectDetails.project_name}
                    </p>
                    <p>
                        <strong>Client:</strong> {projectDetails.clientName}
                    </p>
                    <p>
                        <p>
                            <strong>Project Manager: </strong>
                            {projectDetails.pmName}
                        </p>
                        <strong>Project Budget:</strong> $
                        {projectDetails.project_budget}
                    </p>

                    <Flex justifyContent="left" style={{ marginTop: "10px" }}>
                        <strong>Extended Days:</strong>
                        <input
                            value={extendedDay}
                            onChange={handleExtendedDayChange}
                        ></input>
                    </Flex>
                    <Flex justifyContent="left" style={{ marginTop: "10px" }}>
                        <strong htmlFor="itemsPerPage">Screenshots:</strong>
                        <ImageViewer imageData={imageData} />
                    </Flex>

                    <div style={styles.reasonContainer}>
                        <p>
                            <strong>Comment:</strong>
                        </p>

                        <div
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        >
                            <CKEditorComponent onChange={handleCommentChange} />
                        </div>
                    </div>
                    <Flex justifyContent="flex-end">
                        <Button
                            variant="success"
                            style={styles.button}
                            onClick={handleAccept}
                            disabled={isLoading}
                        >
                            {isLoading ? "Accepting..." : "Accept"}
                        </Button>
                        <Button
                            variant="danger"
                            style={styles.button}
                            onClick={handleReject}
                            disabled={isLoading}
                        >
                            {isLoading ? "Rejecting..." : "Reject"}
                        </Button>
                    </Flex>
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
        height: "650px",
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
    reasonContainer: {
        marginTop: "20px",
    },
    button: {
        marginTop: "10px",
    },
};
export default ReviewExtendRequestModal;
