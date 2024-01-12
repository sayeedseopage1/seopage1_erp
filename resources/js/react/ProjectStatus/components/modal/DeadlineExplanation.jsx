import React from "react";
import CKEditorComponent from "../../../ckeditor";
import Button from "../../../global/Button";

const DeadlineExplanation = ({ projectDetails }) => {
    const {
        project_name,
        clientName,
        project_budget,
        project_category,
        goal_start_date,
        goal_end_date,
        description,
    } = projectDetails;

    return (
        <div style={styles.container}>
            <div>
                <p>
                    <strong>Project Name</strong> {project_name}
                </p>
                <p>
                    <strong>Client:</strong> {clientName}
                </p>
                <p>
                    <strong>Project Budget:</strong> ${project_budget}
                </p>
                <p>
                    <strong>Project Category:</strong> {project_category}
                </p>
                <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(goal_start_date).toLocaleDateString()}
                </p>
                <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(goal_end_date).toLocaleDateString()}
                </p>
                <p>
                    <strong>Description:</strong> {description}
                </p>

                <div style={styles.reasonContainer}>
                    <p>
                        <strong>Reason</strong>
                    </p>
                    <CKEditorComponent />
                </div>

                <Button variant="success" style={styles.button}>
                    Submit
                </Button>
            </div>
        </div>
    );
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

export default DeadlineExplanation;
