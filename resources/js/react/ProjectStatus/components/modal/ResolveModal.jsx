import React, { useState } from "react";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
import { IoClose } from "react-icons/io5";
import CKEditorComponent from "../../../ckeditor";
import { Flex } from "../table/ui";
import { useCreateResolveSuggestionCommentMutation } from "../../../services/api/projectStatusApiSlice";
const ResolveModal = ({
    projectPmGoalId,
    projectDetails,
    isModalThreeOpen,
    closeModalThree,
}) => {
    const [suggestionData, setSuggestionData] = useState("");
    const [commentData, setCommentData] = useState("");
    const [ratingValue, setRatingValue] = useState("1");
    const [submitData, { isLoading }] =
        useCreateResolveSuggestionCommentMutation();

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
        submitData({
            project_pm_goal_id: projectPmGoalId,
            rating: ratingValue,
            suggestion: suggestionData,
            comment: commentData,
        });

        closeModalThree();
    };

    console.log("s r c", suggestionData, ratingValue, commentData);
    return (
        <ReactModal
            style={customStyles}
            isOpen={isModalThreeOpen}
            onRequestClose={closeModalThree}
            contentLabel="Project Details"
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
                    Resolve
                </div>

                <button
                    onClick={closeModalThree}
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
                        <strong>Project Name</strong>{" "}
                        {projectDetails.project_name}
                    </p>
                    <p>
                        <strong>Client:</strong> {projectDetails.clientName}
                    </p>
                    <p>
                        <strong>Project Budget:</strong> $
                        {projectDetails.project_budget}
                    </p>
                    <p>
                        <strong>Project Category:</strong>{" "}
                        {projectDetails.project_category}
                    </p>
                    <p>
                        <strong>Start Date:</strong>{" "}
                        {new Date(
                            projectDetails.goal_start_date
                        ).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Deadline:</strong>{" "}
                        {new Date(
                            projectDetails.goal_end_date
                        ).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Description:</strong>{" "}
                        {projectDetails.description}
                    </p>
                    <Flex justifyContent="left">
                        <strong>Reason: </strong>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: projectDetails.reason
                                    ? projectDetails.reason
                                    : "--",
                            }}
                        />
                    </Flex>

                    <Flex justifyContent="left" style={{ marginTop: "10px" }}>
                        <div htmlFor="itemsPerPage">Rating:</div>
                        <select
                            id="itemsPerPage"
                            value={ratingValue}
                            onChange={handleRatingValueChange}
                        >
                            {[1, 2, 3, 4, 5].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </Flex>

                    <div style={styles.reasonContainer}>
                        <p>
                            <strong>Suggestion:</strong>
                        </p>
                        <CKEditorComponent onChange={handleSuggestionChange} />
                    </div>
                    <div style={styles.reasonContainer}>
                        <p>
                            <strong>Comment:</strong>
                        </p>
                        <CKEditorComponent onChange={handleCommentChange} />
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
        maxHeight: "80vh",

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
export default ResolveModal;
