import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
import { IoClose } from "react-icons/io5";
import CKEditorComponent from "../../../ckeditor";
import { Flex } from "../table/ui";
import { useCreateResolveSuggestionCommentMutation } from "../../../services/api/projectStatusApiSlice";
import FractionalRating from "../FractionalRating";
import { isStateAllHaveValue, markEmptyFieldsValidation } from "../../../utils/stateValidation";
import { formatAPIErrors } from "../../../utils/formatAPIErrors";
const ResolveModal = ({
    pmGoalExtendReason,
    projectPmGoalId,
    projectDetails,
    isModalOpen,
    closeModal,
    refetchPmGoal
}) => {
    const [resolveModalData, setResolveModalData] = useState({
        client_communication: "",
        client_communication_rating: null,
        negligence_pm: "",
        negligence_pm_rating: null,
    });
    const [resolveModalDataValidation, setResolveModalDataValidation] = useState({
        client_communication: false,
        client_communication_rating: false,
        negligence_pm: false,
        negligence_pm_rating: false,
        isSubmitting: false,
      });
    const [submitData, { isLoading }] =
        useCreateResolveSuggestionCommentMutation();

    const handleSubmit = async () => {
        const isEmpty = isStateAllHaveValue({
            project_pm_goal_id: projectPmGoalId,
            ...resolveModalData
        });

        if (isEmpty) {
            const validation = markEmptyFieldsValidation({
                    project_pm_goal_id: projectPmGoalId,
                    ...resolveModalData
                });
            setResolveModalDataValidation({
                ...resolveModalDataValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }

        try {
            // here rating is hardcoded for now, it will be removed once PM confirms
            const result = await submitData({
                project_pm_goal_id: projectPmGoalId,
                ...resolveModalData,
                rating: 5,
            }).unwrap();
            if (result?.status) {
                closeModal();
                toast.success("Submission was successful");
                refetchPmGoal();
            } else {
                toast.error("Submission was not successful");
            }
        } catch (error) {
            if(error?.status === 422){
                const errors = formatAPIErrors(error?.data?.errors);
                errors.forEach(error => {
                    toast.error(error);
                });
            } else {
                console.log("error", error);
                toast.error("Error submitting data");
            }
        } finally {
            setEditorData("");
        }
    };


    useEffect(() => {
        if(resolveModalDataValidation.isSubmitting){
            const validation = markEmptyFieldsValidation({
                project_pm_goal_id: projectPmGoalId,
                ...resolveModalData
            });
            setResolveModalDataValidation({
                ...resolveModalDataValidation,
                ...validation,
            });
        }
    }, [resolveModalData, resolveModalDataValidation.isSubmitting]);


    return (
        <ReactModal
            style={customStyles}
            isOpen={isModalOpen}
            ariaHideApp={false}
            onRequestClose={closeModal}
            contentLabel="Resolve"
        >
            <div
                className="d-flex justify-content-between align-items-center mb-3"
            >
                <h6
                    style={{
                        fontSize: "25px",
                    }}
                >
                    Resolve
                </h6>

                <button
                    onClick={closeModal}
                    style={{
                        backgroundColor: "gray",
                        padding: "2px 4px 2px 4px",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "24px",
                        height: "24px",
                    }}
                >
                    <IoClose />
                </button>
            </div>

            <section style={styles.container}>
                <div className="w-100">
                    <div className="my-2 row">
                        <p className="col-4"><strong>Project Name</strong>{" "}</p>
                        <p className="col-8">{projectDetails.project_name}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Client:</strong>{" "}</p>
                        <p className="col-8">{projectDetails.clientName}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Project Budget:</strong>{" "}</p>
                        <p className="col-8">{projectDetails.currency_symbol} {projectDetails.project_budget}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Project Category:</strong>{" "}</p>
                        <p className="col-8">{projectDetails.project_category}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Start Date:</strong>{" "}</p>
                        <p className="col-8">{new Date(
                            projectDetails.goal_start_date
                        ).toLocaleDateString()}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Deadline:</strong>{" "}</p>
                        <p className="col-8">{new Date(
                            projectDetails.goal_end_date
                        ).toLocaleDateString()}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Description:</strong>{" "}</p>
                        <p className="col-8">{projectDetails.description}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Reason:</strong>{" "}</p>
                        <p className="col-8"><span
                            dangerouslySetInnerHTML={{
                                __html: pmGoalExtendReason
                                    ? pmGoalExtendReason
                                    : "--",
                            }}
                        /></p>
                    </div>
                    {/* <div className="my-2 row">
                        <p className="col-4"><strong>Rating:</strong>{" "}</p>
                        <div className="col-8 flex-col">
                            <div className="d-flex justify-content-between align-items-center"><FractionalRating
                        className=""
                            value={resolveModalData?.rating}
                            onChange={(value) => setResolveModalData({
                                ...resolveModalData,
                                rating: value
                            })}
                        />
                        {resolveModalData?.rating  && <small>{resolveModalData?.rating} /10</small>}</div>
                            {resolveModalDataValidation.rating && <small className="text-danger my-1">Rating is required</small>}
                        </div>
                    </div> */}
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
                        {resolveModalDataValidation.client_communication && <small className="text-danger my-1">Client communication is required</small>}
                        <div className="my-2">
                            <p><strong>Client communication rating</strong></p>
                            <div className="d-flex justify-content-between align-items-center">
                             <FractionalRating 
                                 value={resolveModalData.client_communication_rating}
                                onChange={(value) => setResolveModalData({
                                    ...resolveModalData,
                                    client_communication_rating: value
                                })}
                             />
                                {resolveModalData?.client_communication_rating  && <small>{resolveModalData?.client_communication_rating} /10</small>}
                            </div>
                            {resolveModalDataValidation.client_communication_rating && <small className="text-danger my-1">Client Communication Rating is required</small>}
                        </div>
                    </div>
                    <div style={styles.reasonContainer}>
                        <p className="my-2">
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
                                    negligence_pm: editor.getData(),
                                })
                            }} />
                          
                        </div>
                        {resolveModalDataValidation.negligence_pm && <small className="text-danger my-1">Negligence from project managers is required</small>}
                        <div className="my-2">
                            <p className="my-2"><strong>Project managers rating</strong></p>
                            <div className="d-flex justify-content-between align-items-center">
                             <FractionalRating 
                                value={resolveModalData.negligence_pm_rating}  
                                onChange={(value) => setResolveModalData({
                                    ...resolveModalData,
                                    negligence_pm_rating: value
                                })}
                             />
                             {resolveModalData?.negligence_pm_rating  && <small>{resolveModalData?.negligence_pm_rating} /10</small>}
                            </div>
                            {resolveModalDataValidation.negligence_pm_rating && <small className="text-danger my-1">Client Communication Rating is required</small>}
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
