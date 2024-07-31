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
import { useDeadlineExtensionRequestMutation } from "../../../services/api/projectApiSlice";
import dayjs from "dayjs";

/**
 *  Project Deadline Extension Modal
 * @param {boolean} isModalOpen - Is Modal Open
 * @param {function} closeModal - Close Modal
 * @param {object} modalData - Modal Data
 * @returns {JSX.Element}
 * @description - Project Deadline Extension Modal Component For Extend Deadline on Project , this modal will be used by Admin
 * 
 *  This modal will be used by Admin to extend the deadline of the project
 
 */



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


    const [
        deadlineExtensionRequest,
        {
            isLoading: isDeadlineExtensionRequestLoading,
        }
    ] = useDeadlineExtensionRequestMutation()

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
        try {
            const payload = {
                new_deadline: dayjs(deadlineExtensionData.newDeadline).format("YYYY-MM-DD"),
                extension: deadlineExtensionData.reason,
                description: deadlineExtensionData.description,
                old_deadline: dayjs(modalData?.deadline).format("YYYY-MM-DD"),
                project_id: modalData?.id,
            };
            const res = await deadlineExtensionRequest(payload).unwrap()
            if(res.status === 200) {
                closeModal();
                toast.success(
                    "Deadline Extension Request Submitted Successfully"
                );
                resetData();
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
                    {/* Current Deadline */}
                    <div className="deadlineInfo__deadline mb-2">
                        <label htmlFor="oldDeadline">Current Deadline</label>
                        <input
                            disabled
                            type="text"
                            id="oldDeadline"
                            className="isDisabled"
                            value={dayjs(modalData?.deadline).format("MM/DD/YYYY")}
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
                        <label htmlFor="newDeadline">
                            New Deadline <sup>*</sup>{" "}
                        </label>
                        <DatePicker
                            type="date"
                            id="newDeadline"
                            name="newDeadline"
                            minDate={dayjs(modalData?.deadline).add(1, 'day')}
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
                {/* Reason */}
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
                            <Radio value={"Client was unavailable"}>Client was unavailable</Radio>
                            <Radio value={"Couldn't Complete On Time"}>Couldn't complete on time</Radio>
                            <Radio value={"Upsale/Cross sale"}>Upsale/Cross sale</Radio>
                            <Radio value={"Others"}>Other</Radio>
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
                            isDeadlineExtensionRequestLoading ? (
                                <Loader title="Submitting" />
                            ) : (
                                "Submit"
                            )
                        }
                        onClick={handleDeadlineExtension}
                        type="primary"
                        isDisabled={isDeadlineExtensionRequestLoading}
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
