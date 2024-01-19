import React, { useState } from "react";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
import { IoClose } from "react-icons/io5";

import { Flex } from "../table/ui";
import CKEditorComponent from "../../../ckeditor";
import { useGetProjectExtendImagesQuery } from "../../../services/api/projectStatusApiSlice";
import ImageViewer from "./ImageViewer";
import RefreshButton from "../RefreshButton";

const ReviewExtendRequestModal = ({ projectDetails, isOpen, onClose }) => {
    const [suggestionData, setSuggestionData] = useState("");
    const [commentData, setCommentData] = useState("");
    const [ratingValue, setRatingValue] = useState("1");
    const { data, isFetching, refetch } = useGetProjectExtendImagesQuery(
        projectDetails?.project_id
    );

    const imageData = data?.data;

    const handleSuggestionChange = (e, editor) => {
        setSuggestionData(editor.getData());
    };
    const handleCommentChange = (e, editor) => {
        setCommentData(editor.getData());
    };
    const handleRatingValueChange = (e) => {
        setRatingValue(e.target.value);
    };

    const handleSubmit = () => {
        // submitData({
        //     project_pm_goal_id: projectPmGoalId,
        //     rating: ratingValue,
        //     suggestion: suggestionData,
        //     comment: commentData,
        // });

        onClose();
    };

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
                            value={ratingValue}
                            onChange={handleRatingValueChange}
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
                            onClick={handleSubmit}
                            // disabled={isLoading}
                        >
                            {/* {isLoading ? "Submitting..." : "Submit"} */}
                            Accept
                        </Button>
                        <Button
                            variant="danger"
                            style={styles.button}
                            onClick={handleSubmit}
                            // disabled={isLoading}
                        >
                            {/* {isLoading ? "Submitting..." : "Submit"} */}
                            Reject
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
        maxHeight: "600px",

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
