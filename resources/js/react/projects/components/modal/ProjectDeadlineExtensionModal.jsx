import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DatePicker, Radio } from "antd";

// Components - Modal
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";

// Components - Styled Components
import { ModalContentContainer } from "../ui/styledComponents";

// Components - Global
import Loader from "../../../global/Loader";

// Components - Custom
import SingleButton from "../ui/CustomButton/SingleButton";
import CustomTextArea from "../ui/CustomTextArea/CustomTextArea";

// Helpers
import {
    isStateAllHaveValue,
    markEmptyFieldsValidation,
} from "../../../utils/stateValidation";

// Toast
import { toast } from "react-toastify";

const ProjectDeadlineExtensionModal = ({
    isModalOpen,
    closeModal,
    modalData,
}) => {
    const [deadlineExtensionData, setDeadlineExtensionData] = useState({
        newDeadline: null,
        reason: null,
        description: "",
    });
    const [
        deadLineExtensionDataValidation,
        setDeadLineExtensionDataValidation,
    ] = useState({
        newDeadline: false,
        reason: false,
        description: false,
        isSubmitting: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDeadlineExtension = async () => {
        const isEmpty = isStateAllHaveValue(deadlineExtensionData);
        if (isEmpty) {
            const validation = markEmptyFieldsValidation(deadlineExtensionData);
            setDeadLineExtensionDataValidation({
                ...deadLineExtensionDataValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }
        setIsSubmitting(true);
        try {
            // TODO: API Call Here
            setTimeout(() => {
                setIsSubmitting(false);
                closeModal();
                toast.success(
                    "Deadline Extension Request Submitted Successfully"
                );
                resetData();
            }, 2000);
        } catch (error) {
            setIsSubmitting(false);
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
            newDeadline: null,
            reason: null,
            description: "",
        });
        setDeadLineExtensionDataValidation({
            newDeadline: false,
            reason: false,
            description: false,
            isSubmitting: false,
        });
    };

    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            width="956px"
            height="auto"
            data_testid="project-deadline-extension-modal"
        >
            <CustomModalHeader
                title="Project Deadline Extension Form"
                closeModal={closeModal}
            />
            <ModalContentContainer
                style={{
                    borderRadius: "0 0 8px 8px",
                }}
            >
                <div className="deadlineInfo mb-1">
                    <div className="deadlineInfo__deadline mb-2">
                        <label htmlFor="oldDeadline">Current Deadline</label>
                        <input
                            disabled
                            type="text"
                            id="oldDeadline"
                            className="isDisabled"
                            value={modalData?.deadline}
                        />
                        <span
                            className="mt-1"
                            style={{
                                height: "20px",
                            }}
                        ></span>
                    </div>
                    <div className="deadlineInfo__deadline mb-2">
                        <label htmlFor="newDeadline">
                            New Deadline <sup>*</sup>{" "}
                        </label>
                        <DatePicker
                            type="date"
                            id="newDeadline"
                            name="newDeadline"
                            placeholder="mm/dd/yyyy"
                            value={deadlineExtensionData?.newDeadline}
                            onChange={(e) => {
                                setDeadlineExtensionData({
                                    ...deadlineExtensionData,
                                    newDeadline: e,
                                });
                            }}
                        />

                        <span
                            className="text-danger mt-1"
                            style={{
                                height: "20px",
                            }}
                        >
                            {deadLineExtensionDataValidation.newDeadline &&
                                "New Deadline is required"}
                        </span>
                    </div>
                </div>
                <div className="deadlineExtensionOptions">
                    <h6 className="mb-2">
                        Explain why you need more time to complete this project?{" "}
                        <sup>*</sup>
                    </h6>
                    <div>
                        <Radio.Group
                            onChange={(e) => {
                                setDeadlineExtensionData({
                                    ...deadlineExtensionData,
                                    reason: e.target.value,
                                });
                            }}
                            value={deadlineExtensionData?.reason}
                        >
                            <Radio value={1}>Client was unavailable</Radio>
                            <Radio value={2}>Couldn't complete on time</Radio>
                            <Radio value={3}>Upsale/Cross sale</Radio>
                            <Radio value={4}>Other</Radio>
                        </Radio.Group>
                    </div>
                    {deadLineExtensionDataValidation.reason && (
                        <p className="text-danger mt-1">Reason is required</p>
                    )}
                </div>
            </ModalContentContainer>
            {/* Admin Comment */}
            <ModalContentContainer>
                <CustomTextArea
                    label="Description"
                    placeholder={"Write Here"}
                    name="description"
                    value={deadlineExtensionData?.description}
                    rows={6}
                    cols={50}
                    isRequired={true}
                    className="mb-2"
                    isDangerHtml={false}
                    onChange={(e) => {
                        setDeadlineExtensionData({
                            ...deadlineExtensionData,
                            description: e.target.value,
                        });
                    }}
                />
                {deadLineExtensionDataValidation.description && (
                    <span className="text-danger">Description is required</span>
                )}
            </ModalContentContainer>
            {/* Buttons */}
            <ModalContentContainer className="pt-0">
                <div className="modalButtonContainer">
                    <SingleButton
                        label={
                            isSubmitting ? (
                                <Loader title="Submitting" />
                            ) : (
                                "Submit"
                            )
                        }
                        onClick={handleDeadlineExtension}
                        type="primary"
                    />
                </div>
            </ModalContentContainer>
        </CustomAntModal>
    );
};

export default ProjectDeadlineExtensionModal;

ProjectDeadlineExtensionModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalData: PropTypes.object,
    isLoading: PropTypes.bool,
};
