import React, { useEffect } from "react";
import CKEditorComponent from "../../../ckeditor";
import Button from "../../../global/Button";
import { useCreateDeadlineExplanationReasonMutation } from "../../../services/api/projectStatusApiSlice";
import { toast } from "react-toastify";
const DeadlineExplanation = ({
    closeModalTwo,
    projectPmGoalId,
    isModalTwoOpen,
    projectDetails,
    refetchPmGoal,
}) => {
    const {
        project_name,
        clientName,
        project_budget,
        project_category,
        goal_start_date,
        goal_end_date,
        description,
        currency_symbol
    } = projectDetails;
    const [editorData, setEditorData] = React.useState("");
    const [isEditorEmpty, setIsEditorEmpty] = React.useState(false);
    const [submitData, { isLoading }] =
        useCreateDeadlineExplanationReasonMutation();
    const handleEditorChange = (e, editor) => {
        setEditorData(editor.getData());
    };

    // Submit data
    const handleSubmit = async () => {
        if(editorData === "" || editorData === "<p><br></p>"){
            setIsEditorEmpty(true);
            return;
        }
        try {
            const result = await submitData({
                reason: editorData,
                project_pm_goal_id: projectPmGoalId,
            }).unwrap();

            if (result?.status) {
                closeModalTwo();
                refetchPmGoal();
                toast.success("Submission was successful");
            } else {
                toast.error("Submission was not successful");
            }
        } catch (error) {
            console.log("Error submitting data", error);
            toast.error("Error submitting data");
        } finally {
            setEditorData("");
        }
    };

    // Check if editor is empty
    useEffect(() => {
        if(editorData !== "" && editorData !== "<p><br></p>"){
            setIsEditorEmpty(false);
        }
    }, [editorData]);

    // Reset editor data when modal is closed
    useEffect(() => {
        if(!isModalTwoOpen){
            setEditorData("");
            setIsEditorEmpty(false);
        }
    }, [isModalTwoOpen]);

    return (
        <div style={styles.container}>
            <div className="w-100">
                 <div className="my-2 row">
                        <p className="col-4"><strong>Project Name:</strong>{" "}</p>
                        <p className="col-8">{project_name}</p>
                </div>
                 <div className="my-2 row">
                        <p className="col-4"><strong>Client:</strong>{" "}</p>
                        <p className="col-8">{clientName}</p>
                </div>
                 <div className="my-2 row">
                        <p className="col-4"><strong>Project Budget:</strong>{" "}</p>
                        <p className="col-8">{currency_symbol}{project_budget}</p>
                </div>
                 <div className="my-2 row">
                        <p className="col-4"><strong>Project Category:</strong>{" "}</p>
                        <p className="col-8">{project_category}</p>
                </div>
                 <div className="my-2 row">
                        <p className="col-4"><strong>Start Date:</strong>{" "}</p>
                        <p className="col-8">{new Date(goal_start_date).toLocaleDateString()}</p>
                </div>
                 <div className="my-2 row">
                        <p className="col-4"><strong>Deadline:</strong>{" "}</p>
                        <p className="col-8"> {new Date(goal_end_date).toLocaleDateString()}</p>
                </div>
                 <div className="my-2 row">
                        <p className="col-4"><strong>Description:</strong>{" "}</p>
                        <p className="col-8"> {description}</p>
                </div>
                <div style={styles.reasonContainer}>
                    <p className="my-2">
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
                    {
                        isEditorEmpty && <p className="text-danger my-1">Reason is required</p>
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
