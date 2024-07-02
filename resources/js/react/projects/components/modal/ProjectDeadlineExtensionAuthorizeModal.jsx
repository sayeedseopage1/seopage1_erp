import dayjs from "dayjs";
import { DatePicker } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";

// UI Components - Modal
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";

// Helpers
import {
    isStateAllHaveValue,
    markEmptyFieldsValidation,
} from "../../../utils/stateValidation";

// Components - Styled Components
import { ModalContentContainer } from "../ui/styledComponents";

// Components - Global
import Loader from "../../../global/Loader";
import { Placeholder } from "../../../global/Placeholder";

// Components - Custom
import SingleButton from "../ui/CustomButton/SingleButton";
import CustomTextArea from "../ui/CustomTextArea/CustomTextArea";

// Services - API
import { useAuthorizeDeadlineExtensionFormMutation } from "../../../services/api/projectApiSlice";

import Switch from "../../../global/Switch";

// Helper
import { htmlTagRegex } from "../../helper";

// Hooks
import { useAuth } from "../../../hooks/useAuth";

// Context
import { ProjectDashboardContext } from "../../context/ProjectDashboardProvider";

const ProjectDeadlineExtensionAuthorizeModal = ({
    isModalOpen,
    closeModal,
    modalData,
    isLoading,
}) => {
    const user = useAuth();
    const [actionType, setActionType] = useState("");
    const [deadlineExtensionData, setDeadlineExtensionData] = useState(
        modalData?.projectPendingDeadlineExtensionData
    );
    const { isProjectDetailsLoading } = useContext(ProjectDashboardContext);
    const [
        deadLineExtensionDataValidation,
        setDeadLineExtensionDataValidation,
    ] = useState({
        new_deadline: false,
        isSubmitting: false,
    });

    const [
        authorizeDeadlineExtension,
        { isLoading: isDeadlineExtensionLoading },
    ] = useAuthorizeDeadlineExtensionFormMutation();

    // Handle Deadline Extension Authorize
    const handleDeadlineExtensionAuthorize = async (type) => {
        const { new_deadline } = deadlineExtensionData;
        const isEmpty = isStateAllHaveValue({ new_deadline });
        if (isEmpty) {
            const validation = markEmptyFieldsValidation({ new_deadline });
            setDeadLineExtensionDataValidation({
                ...deadLineExtensionDataValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }
        setActionType(type);

        try {
            const payload = {
                type: type,
                project_id: deadlineExtensionData?.project_id,
                new_deadline: dayjs(deadlineExtensionData?.new_deadline).format(
                    "YYYY-MM-DD"
                ),
                admin_comment: deadlineExtensionData?.admin_comment,
                old_deadline: deadlineExtensionData?.old_deadline,
                pde_id: deadlineExtensionData?.id,
            };
            const res = await authorizeDeadlineExtension(payload).unwrap();
            if (res.status === 200) {
                if (type === "accept") {
                    toast.success(
                        "Deadline Extension Request Accepted Successfully"
                    );
                } else {
                    toast.success(
                        "Deadline Extension Request Denied Successfully"
                    );
                }
                setActionType("");
                resetData();
                closeModal();
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later");
        }
    };

    // Validation on Submit
    useEffect(() => {
        if (deadLineExtensionDataValidation.isSubmitting) {
            const validation = markEmptyFieldsValidation(deadlineExtensionData);
            setDeadLineExtensionDataValidation({
                ...deadLineExtensionDataValidation,
                ...validation,
            });
        }
    }, [deadlineExtensionData, deadLineExtensionDataValidation.isSubmitting]);

    // Reset Data
    const resetData = () => {
        setDeadlineExtensionData({
            ...modalData?.projectPendingDeadlineExtensionData,
        });
        setDeadLineExtensionDataValidation({
            new_deadline: false,
            isSubmitting: false,
        });
    };

    useEffect(() => {
        if (!isLoading && modalData?.projectPendingDeadlineExtensionData) {
            setDeadlineExtensionData({
                ...modalData?.projectPendingDeadlineExtensionData,
            });
        }
    }, [isLoading, modalData?.projectPendingDeadlineExtensionData]);

    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            width="956px"
            height="auto"
            data_testid="project-deadline-extension-modal"
        >
            <CustomModalHeader
                title="Project Deadline Extension Form Authorize"
                closeModal={closeModal}
            />
            <ModalContentContainer
                style={{
                    borderRadius: "0 0 8px 8px",
                }}
            >
                <div className="deadlineInfo mb-1">
                    {/* Current Deadline */}
                    <div className="deadlineInfo__deadline mb-2">
                        <label htmlFor="old_deadline">Current Deadline</label>
                        <input
                            disabled
                            type="text"
                            id="old_deadline"
                            className="isDisabled"
                            value={dayjs(
                                deadlineExtensionData?.old_deadline
                            )?.format("YYYY-MM-DD")}
                        />
                        <span
                            className="mt-1"
                            style={{
                                height: "20px",
                            }}
                        ></span>
                    </div>
                    {/* New Deadline  - Input - Required*/}
                    <div className="deadlineInfo__deadline mb-2">
                        <label htmlFor="new_deadline">
                            New Deadline <sup>*</sup>{" "}
                        </label>
                        <DatePicker
                            type="date"
                            id="new_deadline"
                            name="new_deadline"
                            placeholder="mm/dd/yyyy"
                            minDate={dayjs(deadlineExtensionData?.old_deadline)?.add(1, "day")}
                            value={dayjs(deadlineExtensionData?.new_deadline)}
                            onChange={(e) => {
                                setDeadlineExtensionData({
                                    ...deadlineExtensionData,
                                    new_deadline: e,
                                });
                            }}
                        />

                        {
                            <span
                                className="text-danger mt-1"
                                style={{
                                    height: "20px",
                                }}
                            >
                                {deadLineExtensionDataValidation.new_deadline &&
                                    "New Deadline is required"}
                            </span>
                        }
                    </div>
                </div>
                {/* Reason */}
                <div className="deadlineExtensionOptions">
                    <Switch>
                        <h6 className="mb-2 d-flex flex-wrap">
                            Explanation why{" "}
                            <Switch.Case
                                condition={
                                    modalData?.pm?.name &&
                                    !isProjectDetailsLoading
                                }
                            >
                                <span className="text-warning mx-1">
                                    {modalData?.pm?.name}
                                </span>{" "}
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    !modalData?.pm?.name &&
                                    isProjectDetailsLoading
                                }
                            >
                                <Placeholder
                                    width="20%"
                                    height="25px"
                                    className="inline-block mx-1"
                                />
                            </Switch.Case>
                            need more time to complete this project?
                        </h6>
                        <div>
                            <Switch.Case
                                condition={
                                    htmlTagRegex.test(
                                        deadlineExtensionData?.description
                                    ) && !isLoading
                                }
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: deadlineExtensionData?.description,
                                    }}
                                />
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    !htmlTagRegex.test(
                                        deadlineExtensionData?.description
                                    ) && !isLoading
                                }
                            >
                                {deadlineExtensionData?.description}
                            </Switch.Case>
                            <Switch.Case
                                condition={
                                    !deadlineExtensionData?.description &&
                                    isLoading
                                }
                            >
                                <Placeholder width="50%" height="18px" />
                            </Switch.Case>
                        </div>
                    </Switch>
                </div>
            </ModalContentContainer>
            {/* Admin Comment */}
            <ModalContentContainer>
                <CustomTextArea
                    label={`Comment on Authorization from <span class="text-warning">${user?.name}<span>`}
                    isLabelDangerHtml={true}
                    placeholder={"Write Here"}
                    name="admin_comment"
                    value={deadlineExtensionData?.admin_comment}
                    rows={6}
                    cols={50}
                    className="mb-2"
                    isDangerHtml={false}
                    onChange={(e) => {
                        setDeadlineExtensionData({
                            ...deadlineExtensionData,
                            admin_comment: e.target.value,
                        });
                    }}
                />
            </ModalContentContainer>

            {/* Buttons */}
            <ModalContentContainer className="pt-0">
                <div className="modalButtonContainer">
                    <SingleButton
                        label={
                            isDeadlineExtensionLoading &&
                            actionType === "accept" ? (
                                <Loader title="Authorizing" />
                            ) : (
                                "Authorize"
                            )
                        }
                        onClick={() =>
                            handleDeadlineExtensionAuthorize("accept")
                        }
                        type="primary"
                        isDisabled={
                            isDeadlineExtensionLoading ||
                            isLoading ||
                            isProjectDetailsLoading
                        }
                    />
                    <SingleButton
                        label={
                            isDeadlineExtensionLoading &&
                            actionType === "deny" ? (
                                <Loader title="Denying" />
                            ) : (
                                "Deny"
                            )
                        }
                        onClick={() => handleDeadlineExtensionAuthorize("deny")}
                        type="secondary"
                        isDisabled={
                            isDeadlineExtensionLoading ||
                            isLoading ||
                            isProjectDetailsLoading
                        }
                    />
                </div>
            </ModalContentContainer>
        </CustomAntModal>
    );
};

export default ProjectDeadlineExtensionAuthorizeModal;

ProjectDeadlineExtensionAuthorizeModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalData: PropTypes.object,
};
