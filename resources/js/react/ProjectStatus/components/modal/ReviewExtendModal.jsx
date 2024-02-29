import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
import { Flex } from "../table/ui";
import { IoClose } from "react-icons/io5";
import CKEditorComponent from "../../../ckeditor";
import {
    useCreateReviewExtendRequestMutation,
    useGetProjectExtendImagesQuery,
} from "../../../services/api/projectStatusApiSlice";
import ImageViewer from "./ImageViewer";
import RefreshButton from "../RefreshButton";
import { toast } from "react-toastify";
import { isStateAllHaveValue, markEmptyFieldsValidation } from "../../../utils/stateValidation";
const ReviewExtendRequestModal = ({ 
    projectDetails, 
    isOpen, 
    onClose, 
    projectPmGoalId, 
    refetchPmGoal, 
    reviewExtendRequestData 
}) => {
    const [reviewExtendState, setReviewExtendState] = useState({
        extended_day: reviewExtendRequestData?.extended_day,
        comment: "",
        goal_id: reviewExtendRequestData?.id,
    });
    const [reviewExtendStateValidation, setReviewExtendStateValidation] = useState({
        extended_day: false,
        comment: false,
        isSubmitting: false,
    })
    const { data, isFetching, refetch } = useGetProjectExtendImagesQuery(
        reviewExtendRequestData?.id
    );
    const [submitData, { isLoading }] = useCreateReviewExtendRequestMutation();

    const imageData = data?.data;

    const handleResetForm = () => {
        setReviewExtendState({
            extended_day: null,
            comment: "",
        });
        setReviewExtendStateValidation({
            extended_day: false,
            comment: false,
            isSubmitting: false,
        });
    };

    const handleAccept = async (e) => {
        e.preventDefault();
        const isEmpty = isStateAllHaveValue(reviewExtendState);
        if (isEmpty) {
            const validation = markEmptyFieldsValidation(reviewExtendState);
            setReviewExtendStateValidation({
                ...reviewExtendStateValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }
        const fd = new FormData();
        fd.append("extended_day", reviewExtendState.extended_day ?? "");
        fd.append("is_any_negligence", reviewExtendState.comment ?? "");
        fd.append("goal_id", reviewExtendState.goal_id ?? "");
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
                refetchPmGoal();
                toast.success("Submission was successful");
                handleResetForm();
            })
            .catch((err) => {
                if (err?.status === 422) {
                    toast.error("Please fill up all required fields");
                } else {
                    toast.error("Submission was not successful");
                }
            });
    };

    const handleReject = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("extended_day", reviewExtendState.extended_day ?? "");
        fd.append("is_any_negligence", reviewExtendState.comment ?? "");
        fd.append("goal_id", reviewExtendState.goal_id ?? "");
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
                refetchPmGoal();
            })
            .catch((err) => {
                if (err?.status === 422) {
                    toast.error("Please fill up all required fields");
                }
            });
    };



    useEffect(() => {
        if(reviewExtendStateValidation.isSubmitting){
            const validation = markEmptyFieldsValidation(reviewExtendState);
            setReviewExtendStateValidation({
                ...reviewExtendStateValidation,
                ...validation
            });
        }
    }, [reviewExtendState, reviewExtendStateValidation.isSubmitting]);


    useEffect(() => {
        if(!isOpen){
            handleResetForm()
        }
    }, [isOpen]);


    useEffect(() => {
            setReviewExtendState({
                extended_day: reviewExtendRequestData?.extended_day,
                comment: "",
                goal_id: reviewExtendRequestData?.id,
            });
        
    }, [reviewExtendRequestData]);

    

    return (
        <ReactModal
            style={customStyles}
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            <div
                className="d-flex justify-content-between align-items-center mb-3"
            >
                <h6
                    style={{
                        fontSize: "25px",
                    }}
                >
                    Review Extend Time
                </h6>
                <button
                    onClick={onClose}
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                        backgroundColor: "gray",
                        padding: "2px 4px 2px 4px",
                        color: "white",
                        width: "24px",
                        height: "24px",
                    }}
                >
                    <IoClose />
                </button>    
                {/* <RefreshButton onClick={refetch} isLoading={isFetching} /> */}
            </div>

            <section style={styles.container}>
                <div className="w-100">
                    <div className="my-2 row">
                        <p className="col-4"><strong>Project Name:</strong>{" "}</p>
                        <p className="col-8">{projectDetails.project_name}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Client:</strong>{" "}</p>
                        <p className="col-8">{projectDetails.clientName}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Project Manager:</strong>{" "}</p>
                        <p className="col-8">{projectDetails.pmName}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Project Budget:</strong>{" "}</p>
                        <p className="col-8">{projectDetails?.currency_symbol}{projectDetails.project_budget}</p>
                    </div>
                    <div className="my-2 row">
                        <p className="col-4"><strong>Extended Days:</strong>{" "}</p>
                        <div className="col-8">
                        <input 
                            className="p-1 rounded"
                            defaultValue={reviewExtendState?.extended_day}
                            placeholder="Enter extended days"
                            type="number"
                            min={1}
                            onChange={(e) => setReviewExtendState({
                                ...reviewExtendState,
                                extended_day: e.target.value
                            })}
                        ></input>
                        {reviewExtendStateValidation.extended_day && <p className="text-danger my-1">Extended days is required</p>}
                        </div>
                    </div>
                    <div className="row my-2">
                        <p className="col-4"> <strong htmlFor="itemsPerPage">Screenshots:</strong>{" "}</p>
                        <div className="col-8">
                        <ImageViewer imageData={imageData} />  
                        </div>
                    </div>


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
                            <CKEditorComponent onChange={(e, editor) => setReviewExtendState({
                                ...reviewExtendState,
                                comment: editor.getData()
                            })} />
                        </div>
                        {
                            reviewExtendStateValidation.comment && <p className="text-danger my-1">Comment is required</p>
                        }    
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
        height: "fit-content",
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
