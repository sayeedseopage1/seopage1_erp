import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Button from "../../../global/Button";
import { Flex } from "../table/ui";
import { IoClose } from "react-icons/io5";
import CKEditorComponent from "../../../ckeditor";
import {
    useCreateReviewExtendRequestMutation,
    useGetGoalDeadlineExtendDetailsQuery,
} from "../../../services/api/projectStatusApiSlice";
import ImageViewer from "./ImageViewer";
import { toast } from "react-toastify";
import {
    isStateAllHaveValue,
    markEmptyFieldsValidation,
} from "../../../utils/stateValidation";

import "../styles/reviewExtendModal.css";
import Switch from "../Switch";
import { Placeholder } from "../../../global/Placeholder";

const ReviewExtendRequestModal = ({
    projectDetails,
    isOpen,
    onClose,
    projectPmGoalId,
    refetchPmGoal,
    reviewExtendRequestData,
    projectExtendImages,
}) => {
    const [reviewExtendState, setReviewExtendState] = useState({
        extended_day: goalDeadlineExtendDetails?.data?.extended_day,
        comment: "",
        goal_id: reviewExtendRequestData?.id,
        goal_extension_auth_checkbox: "",
    });
    const [reviewExtendStateValidation, setReviewExtendStateValidation] =
        useState({
            extended_day: false,
            comment: false,
            isSubmitting: false,
            goal_extension_auth_checkbox: false,
        });
    const [actionType, setActionType] = useState("");
    // Submit data
    const [submitData, { isLoading }] = useCreateReviewExtendRequestMutation();

    const {
        data: goalDeadlineExtendDetails,
        isFetching: isFetchingGoalDeadlineExtendDetails,
        refetch: refetchGoalDeadlineExtendDetails,
        isLoading: isLoadingGoalDeadlineExtendDetails,
    } = useGetGoalDeadlineExtendDetailsQuery(reviewExtendRequestData?.goal_id, {
        refetchOnMountOrArgChange: true,
        skip: !reviewExtendRequestData?.goal_id,
    });

    const isGoalDetailsLoading =
        isLoadingGoalDeadlineExtendDetails ||
        isFetchingGoalDeadlineExtendDetails;

    useEffect(() => {
        if (goalDeadlineExtendDetails?.data && !isGoalDetailsLoading) {
            setReviewExtendState({
                ...reviewExtendState,
                extended_day: goalDeadlineExtendDetails?.data?.extended_day,
            });
        }
    }, [goalDeadlineExtendDetails?.data, isGoalDetailsLoading]);

    // Get image data
    const imageData = projectExtendImages?.data;

    // Reset form
    const handleResetForm = () => {
        setReviewExtendState({
            extended_day: null,
            comment: "",
            goal_extension_auth_checkbox: "",
        });
        setReviewExtendStateValidation({
            extended_day: false,
            comment: false,
            isSubmitting: false,
            goal_extension_auth_checkbox: false,
        });
    };

    // Accept request
    const handleAccept = async (e) => {
        e.preventDefault();
        // Check if fields are empty using state validation
        const isEmpty = isStateAllHaveValue(reviewExtendState);
        if (isEmpty) {
            // mark empty fields
            const validation = markEmptyFieldsValidation(reviewExtendState);
            setReviewExtendStateValidation({
                ...reviewExtendStateValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }
        const fd = new FormData();
        setActionType("accept");
        fd.append("extended_day", reviewExtendState?.extended_day ?? "");
        fd.append("is_any_negligence", reviewExtendState?.comment ?? "");
        fd.append(
            "goal_extension_auth_checkbox",
            reviewExtendState?.goal_extension_auth_checkbox ?? ""
        );
        fd.append("goal_id", reviewExtendState?.goal_id ?? "");
        fd.append("project_id", reviewExtendRequestData.project_id);
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
                setActionType("");
            })
            .catch((err) => {
                if (err?.status === 422) {
                    toast.error("Please fill up all required fields");
                } else {
                    toast.error("Submission was not successful");
                }
            });
    };

    // Reject request
    const handleReject = async (e) => {
        e.preventDefault();
        const isEmpty = isStateAllHaveValue(reviewExtendState);
        if (isEmpty) {
            // mark empty fields
            const validation = markEmptyFieldsValidation(reviewExtendState);
            setReviewExtendStateValidation({
                ...reviewExtendStateValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }
        const fd = new FormData();
        setActionType("reject");
        fd.append("extended_day", reviewExtendState.extended_day ?? "");
        fd.append("is_any_negligence", reviewExtendState.comment ?? "");
        fd.append(
            "goal_extension_auth_checkbox",
            reviewExtendState.goal_extension_auth_checkbox ?? ""
        );
        fd.append("goal_id", reviewExtendState.goal_id ?? "");
        fd.append("project_id", reviewExtendRequestData.project_id);
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
                setActionType("");
            })
            .catch((err) => {
                if (err?.status === 422) {
                    toast.error("Please fill up all required fields");
                }
            });
    };

    // Check if fields are empty
    useEffect(() => {
        if (reviewExtendStateValidation.isSubmitting) {
            const validation = markEmptyFieldsValidation(reviewExtendState);
            setReviewExtendStateValidation({
                ...reviewExtendStateValidation,
                ...validation,
            });
        }
    }, [reviewExtendState, reviewExtendStateValidation.isSubmitting]);

    // reset form when modal is closed
    useEffect(() => {
        if (!isOpen) {
            handleResetForm();
        }
    }, [isOpen]);

    // set review extend state
    useEffect(() => {
        setReviewExtendState({
            extended_day: goalDeadlineExtendDetails?.data?.extended_day,
            comment: "",
            goal_id: reviewExtendRequestData?.id,
            goal_extension_auth_checkbox: "",
        });
    }, [reviewExtendRequestData]);

    // disable keypress except 0-9, backspace, left and right arrow
    const handleOnkeypress = (e) => {
        const keyCode = e.keyCode || e.which;
        if (
            (keyCode < 48 || keyCode > 57) && // 0-9
            keyCode !== 8 && // Backspace
            keyCode !== 37 && // Left arrow
            keyCode !== 39 // Right arrow
        ) {
            e.preventDefault();
        }
    };

    return (
        <ReactModal
            style={customStyles}
            isOpen={isOpen}
            ariaHideApp={false}
            onRequestClose={onClose}
        >
            <div className="d-flex justify-content-between align-items-center mb-3">
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
                <div className="w-100 extendedReasonReview">
                    <div className="my-3 row">
                        <p className="col-12 col-md-4">
                            <strong>Project Name:</strong>{" "}
                        </p>
                        <p className="col-12 col-md-8">
                            {projectDetails?.project_name}
                        </p>
                    </div>
                    <div className="my-3 row">
                        <p className="col-12 col-md-4">
                            <strong>Client:</strong>{" "}
                        </p>
                        <p className="col-12 col-md-8">
                            {projectDetails?.clientName}
                        </p>
                    </div>
                    <div className="my-3 row">
                        <p className="col-12 col-md-4">
                            <strong>Project Manager:</strong>{" "}
                        </p>
                        <p className="col-12 col-md-8">
                            {projectDetails?.pmName}
                        </p>
                    </div>
                    <div className="my-3 row">
                        <p className="col-12 col-md-4">
                            <strong>Project Budget:</strong>{" "}
                        </p>
                        <p className="col-12 col-md-8">
                            {projectDetails?.currency_symbol}
                            {projectDetails?.project_budget}
                        </p>
                    </div>
                    <div className="my-3 row">
                        <p className="col-12 col-md-4">
                            <strong>Extended Days:</strong>{" "}
                        </p>
                        <div className="col-12 col-md-8">
                            <Switch>
                                <Switch.Case
                                    condition={
                                        isLoadingGoalDeadlineExtendDetails &&
                                        isFetchingGoalDeadlineExtendDetails
                                    }
                                >
                                    <Placeholder width="200px" height="30px" />
                                </Switch.Case>
                                <Switch.Case
                                    condition={
                                        !isLoadingGoalDeadlineExtendDetails ||
                                        !isFetchingGoalDeadlineExtendDetails
                                    }
                                >
                                    <input
                                        className="p-1 rounded"
                                        defaultValue={
                                            reviewExtendState?.extended_day
                                        }
                                        placeholder="Enter extended days"
                                        type="number"
                                        onKeyPress={handleOnkeypress}
                                        min={1}
                                        onChange={(e) =>
                                            setReviewExtendState({
                                                ...reviewExtendState,
                                                extended_day: e.target.value,
                                            })
                                        }
                                    />
                                </Switch.Case>
                            </Switch>
                            {reviewExtendStateValidation.extended_day && (
                                <p className="text-danger my-1">
                                    Extended days is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="my-3 row">
                        <p className="col-12 col-md-4">
                            <strong>Extended Reason:</strong>{" "}
                        </p>
                        <div className="col-12 col-md-8">
                            <Switch>
                                <Switch.Case
                                    condition={
                                        isLoadingGoalDeadlineExtendDetails &&
                                        isFetchingGoalDeadlineExtendDetails
                                    }
                                >
                                    <Placeholder width="200px" height="30px" />
                                </Switch.Case>
                                <Switch.Case
                                    condition={
                                        !isLoadingGoalDeadlineExtendDetails ||
                                        !isFetchingGoalDeadlineExtendDetails
                                    }
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: goalDeadlineExtendDetails
                                                ?.data?.extended_pm_reason,
                                        }}
                                    />
                                </Switch.Case>
                            </Switch>
                        </div>
                    </div>
                    <div className="row my-3">
                        <p className="col-12 col-md-4">
                            {" "}
                            <strong htmlFor="itemsPerPage">
                                Screenshots:
                            </strong>{" "}
                        </p>
                        <div className="col-12 col-md-8">
                            <Switch>
                                <Switch.Case condition={imageData?.length > 0}>
                                    <div className="d-flex flex-wrap">
                                        <ImageViewer imageData={imageData} />
                                    </div>
                                </Switch.Case>
                                <Switch.Case
                                    condition={imageData?.length === 0}
                                >
                                    <p>No screenshots uploaded</p>
                                </Switch.Case>
                            </Switch>
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
                            <CKEditorComponent
                                onChange={(e, editor) =>
                                    setReviewExtendState({
                                        ...reviewExtendState,
                                        comment: editor.getData(),
                                    })
                                }
                            />
                        </div>
                        {reviewExtendStateValidation.comment && (
                            <p className="text-danger my-1">
                                Comment is required
                            </p>
                        )}
                    </div>
                    <Flex
                        justifyContent="space-between"
                        align-items="center"
                        className="mt-2 flex-column flex-md-row"
                    >
                        <Flex className="align-items-start align-items-md-center flex-column flex-md-row">
                            <div className="d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    name="goal_extension_auth_checkbox"
                                    checked={
                                        reviewExtendState.goal_extension_auth_checkbox ===
                                        "Apply this extension to all goals"
                                    }
                                    onChange={(e) =>
                                        setReviewExtendState({
                                            ...reviewExtendState,
                                            goal_extension_auth_checkbox:
                                                "Apply this extension to all goals",
                                        })
                                    }
                                    id="applyThisExtensionToAllGoals"
                                />
                                <label className="ml-2 mb-0" htmlFor="yes">
                                    Apply this extension to all goals
                                </label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    name="goal_extension_auth_checkbox"
                                    id="OnlyAuthorizeForThisGoal"
                                    onChange={(e) =>
                                        setReviewExtendState({
                                            ...reviewExtendState,
                                            goal_extension_auth_checkbox:
                                                "Only authorize for this goal",
                                        })
                                    }
                                    checked={
                                        reviewExtendState.goal_extension_auth_checkbox ===
                                        "Only authorize for this goal"
                                    }
                                />
                                <label
                                    className="ml-2 mb-0"
                                    htmlFor="OnlyAuthorizeForThisGoal"
                                >
                                    Only authorize for this goal
                                </label>
                            </div>
                        </Flex>

                        <Flex>
                            <Button
                                variant="success"
                                style={styles.button}
                                onClick={handleAccept}
                                disabled={isLoading}
                                className="mt-0"
                            >
                                {isLoading && actionType === "accept"
                                    ? "Accepting..."
                                    : "Accept"}
                            </Button>
                            <Button
                                variant="danger"
                                style={styles.button}
                                onClick={handleReject}
                                disabled={isLoading}
                                className="mt-0"
                            >
                                {isLoading && actionType === "reject"
                                    ? "Rejecting..."
                                    : "Reject"}
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex justifyContent="flex-start">
                        {reviewExtendStateValidation?.goal_extension_auth_checkbox && (
                            <p className="text-danger mt-1">
                                Goal extension authorization is required
                            </p>
                        )}
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
        maxWidth: "700px",
        height: "fit-content",
        overflow: "auto",
        maxHeight: "85vh",
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
