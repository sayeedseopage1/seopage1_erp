import React, { useEffect } from "react";
import CKEditorComponent from "../../../ckeditor";
import Button from "../../../global/Button";
import { useCreateDeadlineExplanationReasonMutation } from "../../../services/api/projectStatusApiSlice";
import { toast } from "react-toastify";
const DeadlineExplanation = ({
    closeModalTwo,
    projectPmGoalId,
    projectDetails,
}) => {
    const {
        project_name,
        clientName,
        project_budget,
        project_category,
        goal_start_date,
        goal_end_date,
        description,
    } = projectDetails;
    const [editorData, setEditorData] = React.useState("");
    const [submitData, { isLoading }] =
        useCreateDeadlineExplanationReasonMutation();
    const handleEditorChange = (e, editor) => {
        setEditorData(editor.getData());
    };

    const handleSubmit = async () => {
        try {
            const result = await submitData({
                reason: editorData,
                project_pm_goal_id: projectPmGoalId,
            }).unwrap();

            if (result?.status) {
                closeModalTwo();
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

    console.log(projectDetails)

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

                    <div
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    >
                        <div
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        >
                            <CKEditorComponent onChange={handleEditorChange} />
                        </div>
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
