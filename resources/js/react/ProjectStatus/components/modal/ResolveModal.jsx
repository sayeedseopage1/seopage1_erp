import React, { useState } from "react";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
import { IoClose } from "react-icons/io5";
import CKEditorComponent from "../../../ckeditor";
import { Flex } from "../table/ui";
import { useCreateResolveSuggestionCommentMutation } from "../../../services/api/projectStatusApiSlice";
import FractionalRating from "../FractionalRating";
const ResolveModal = ({
    pmGoalExtendReason,
    projectPmGoalId,
    projectDetails,
    isModalOpen,
    closeModal,
}) => {
    const [resolveModalData, setResolveModalData] = useState({});
    const [submitData, { isLoading }] =
        useCreateResolveSuggestionCommentMutation();

    const handleSubmit = async () => {
        try {
            const result = await submitData({
                project_pm_goal_id: projectPmGoalId,
                ...resolveModalData
            }).unwrap();

            if (result?.status) {
                closeModalThree();
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


    console.log(resolveModalData)

    return (
        <ReactModal
            style={customStyles}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
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
                    onClick={closeModal}
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
                <div className="w-100">
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
                                __html: pmGoalExtendReason
                                    ? pmGoalExtendReason
                                    : "--",
                            }}
                        />

                       
                    </Flex>

                    <Flex justifyContent="left" style={{ marginTop: "10px" }}>
                        <strong htmlFor="itemsPerPage">Rating:</strong>
                        <FractionalRating  
                            value={resolveModalData?.rating}
                            onChange={(value) => setResolveModalData({
                                ...resolveModalData,
                                rating: value
                            })}
                        />
                    </Flex>
                    <div style={styles.reasonContainer}>
                        <p>
                            <strong>Is client communication perfect here? </strong>
                        </p>
                        <div
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        >
                            <CKEditorComponent
                                onChange={(e, editor) => {
                                    setResolveModalData({
                                        ...resolveModalData,
                                        client_communication: editor.getData(),
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <p><small>Client communication rating</small></p>
                            <div>
                             <FractionalRating 
                                 value={resolveModalData.client_communication_rating}
                                onChange={(value) => setResolveModalData({
                                    ...resolveModalData,
                                    client_communication_rating: value
                                })}
                             />
                            </div>
                        </div>
                    </div>
                    <div style={styles.reasonContainer}>
                        <p>
                            <strong>Is there any negligence from project managers side? </strong>
                        </p>
                        <div
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        >
                            <CKEditorComponent onChange={(e, editor) => {
                                setResolveModalData({
                                    ...resolveModalData,
                                    negligence_project_managers: editor.getData(),
                                })
                            }} />
                        </div>
                        <div>
                            <p><small>Project managers rating</small></p>
                            <div>
                             <FractionalRating 
                                value={resolveModalData.negligence_project_managers_rating}  
                                onChange={(value) => setResolveModalData({
                                    ...resolveModalData,
                                    negligence_project_managers_rating: value
                                })}
                             />
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
        maxWidth: "600px",
        maxHeight: "800px",
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
