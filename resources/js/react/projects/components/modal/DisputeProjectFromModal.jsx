import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";

// UI Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";

// UI Components - Styled Components
import { ModalContentContainer } from "../ui/styledComponents";

// UI Components - Custom
import CustomInput from "../ui/CustomInput/CustomInput";
import SingleButton from "../ui/CustomButton/SingleButton";
import Loader from "../../../global/Loader";

// Helper
import {
    isStateAllHaveValue,
    markEmptyFieldsValidation,
} from "../../../utils/stateValidation";
import { useDisputeProjectMutation } from "../../../services/api/projectApiSlice";

const data = {
    description1: "",
    description2: "",
    description3: "",
    description4: "",
    description5: "",
    description6: "",
    description7: "",
    description8: "",
    description9: "",
    description10: "",
    description11: "",
    description12: "",
    description13: "",
    description14: "",
    description15: "",
    description16: "",
    description17: "",
    pm_name: "",
    pm_email: "",
};

const fontDataValidation = {
    description1: false,
    description2: false,
    description3: false,
    description4: false,
    description5: false,
    description6: false,
    description7: false,
    description8: false,
    // description9: false,  // This is not required
    description10: false,
    description11: false,
    description12: false,
    description13: false,
    description14: false,
    description15: false,
    description16: false,
    description17: false,
    pm_name: false,
    pm_email: false,
    isEmailInValid: false,
    isSubmitting: false,
};

/**
 *  DisputeProjectFromModal component
 *  @param {boolean} isModalOpen - Modal open state
 *  @param {function} closeModal - Close Modal Event Handler
 *  @param {object}  modalData - Modal Data Object
 *  @param {boolean} isLoading - Is Loading State
 *  @returns {JSX.Element}
 *  @description DisputeProjectFromModal component to render dispute project form modal
 *
 *  This modal will be used by Admin
 */

const DisputeProjectFromModal = ({
    isModalOpen,
    closeModal,
    modalData,
    isLoading,
}) => {
    const [formData, setFormData] = React.useState(data);
    const [formValidation, setFormValidation] =
        React.useState(fontDataValidation);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Handle Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [submitDisputeProject, { isLoading: isDisputeProjectLoading }] =
        useDisputeProjectMutation();

    // Handle Dispute Submit
    const handleDisputeSubmit = async () => {
        const { description9, ...rest } = formData;
        const isEmpty = isStateAllHaveValue(rest);
        if (isEmpty) {
            const validation = markEmptyFieldsValidation(rest);
            setFormValidation({
                ...formValidation,
                ...validation,
                isSubmitting: true,
            });
            toast.error("Please Complete the form properly");
            return;
        }

        if (!isEmail(formData.pm_email)) {
            setFormValidation({
                ...formValidation,
                isSubmitting: true,
                isEmailInValid: formData.pm_email
                    ? isEmailInvalid(formData.pm_email)
                    : false,
            });
            toast.error("Invalid Email");
            return;
        }

        try {
            const payload = {
                ...formData,
                client_username: modalData?.client?.user_name,
                project_value: modalData?.project_budget,
                project_id: modalData?.id,
            };
            const res = await submitDisputeProject(payload).unwrap();

            if(res.status === 200) {
                toast.success("Dispute Form Submitted Successfully");
                resetData();
                closeModal();
            
            }
        } catch (error) {
            toast.error("Something went wrong, Please try again");
        }
    };

    // Reset Data
    const resetData = () => {
        setFormData(data);
        setFormValidation(fontDataValidation);
    };

    // Helper Function to check if email is invalid
    function isEmailInvalid(email) {
        return !isEmail(email);
    }

    // UseEffect to check if form is submitting
    useEffect(() => {
        if (formValidation.isSubmitting) {
            const validation = markEmptyFieldsValidation(formData);
            setFormValidation({
                ...formValidation,
                ...validation,
                isEmailInValid: formData.pm_email
                    ? isEmailInvalid(formData.pm_email)
                    : false,
            });
        }
    }, [
        formData,
        formValidation.isSubmitting,
        formValidation.pm_email,
        formData.pm_email,
    ]);

    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            isCentered={true}
            width="1344px"
            height="86vh"
            parentClassName="disputeProjectModal"
        >
            <CustomModalHeader
                title="Dispute Project"
                closeModal={closeModal}
                className="customModalHeaderWithSticky"
            />
            <ModalContentContainer
                style={{
                    overflowY: "auto",
                    height: "calc(86vh - 70px)",
                    borderRadius: "0 0 8px 8px",
                }}
                
            >
                <div className="disputeProjectInfoHeader">
                    <h6>
                        Dispute/Project Cancelation/Milestone Cancelation/Client
                        Complaining To The Marketplace Information
                    </h6>
                    <p>
                        Please fill out the following fields carefully so our
                        top management can understand the reasons for the issues
                        in this particular project of yours!
                    </p>
                </div>
                <ModalContentContainer
                    color="#FFF"
                    padding="35px"
                    className="rounded projectModalContent"
                >
                    {/* Client username and Project Value */}
                    <div className="modalInputContainer mb-4">
                        <CustomInput
                            label="1. Clients username on freelancer.com"
                            placeholder="Enter text"
                            value={modalData?.client?.user_name}
                            fieldName="client_username"
                            isReadOnly
                            type="text"
                            isLoading={isLoading}
                        />
                        <CustomInput
                            label="2. Project value (Mention with currency)"
                            placeholder="Enter Amount with currency"
                            isRequired={true}
                            fieldName="project_value"
                            isReadOnly
                            value={`${modalData?.currency?.currency_symbol} ${modalData?.project_budget} ${modalData?.currency?.currency_code} `}
                            type="text"
                            isLoading={isLoading}
                        />
                    </div>

                    {/* Project About */}
                    <div className="mb-4">
                        <CustomInput
                            label="3. What was the project about (You can copy paste the instruction file here if you want)!"
                            placeholder="Enter text"
                            errorText="Project about is required"
                            isRequired={true}
                            value={formData?.description1}
                            isError={formValidation?.description1}
                            fieldName="description1"
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>

                    {/* Percentage of the amount */}
                    <div className=" mb-4">
                        <CustomInput
                            label="4. What percentage of the amount is in dispute? Also, write the amount in dispute separately."
                            placeholder="Enter percentage and amount"
                            errorText="Percentage of the amount is required"
                            isRequired={true}
                            infoText={"for example 60% and 300 USD"}
                            fieldName="description2"
                            value={formData?.description2}
                            isError={formValidation?.description2}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Release Amount */}
                    <div className=" mb-4">
                        <CustomInput
                            label="5. Did they release the amount that is not in dispute? Or did they release any amount at all?"
                            placeholder="Explain the situation"
                            errorText="Release amount is required"
                            isRequired={true}
                            value={formData?.description3}
                            isError={formValidation?.description3}
                            fieldName="description3"
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Phase Issue */}
                    <div className=" mb-4">
                        <CustomInput
                            label="6. Which phase we were at when this issue occurred?"
                            placeholder="Enter phase issue"
                            errorText="Phase issue is required"
                            isRequired={true}
                            infoText="Requirements define, Research/planning, execution (Mention the percentage of execution that was done), QC, Revisions and feedback"
                            fieldName="description4"
                            value={formData?.description4}
                            isError={formValidation?.description4}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Issue */}
                    <div className=" mb-4">
                        <CustomInput
                            label="7. What is the issue here?"
                            placeholder="Enter issue here"
                            errorText="Issue is required"
                            isRequired={true}
                            infoText="Dispute/Milestone cancelation/Project cancelation/Client complaining to freelancer.com"
                            fieldName="description5"
                            value={formData?.description5}
                            isError={formValidation?.description5}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Responsible Person */}
                    <div className=" mb-4">
                        <CustomInput
                            label="8. According to you, which of our team/individuals is responsible for this exactly?"
                            placeholder="Enter responsible person"
                            errorText="Responsible person is required"
                            isRequired={true}
                            infoText="You could not manage the project properly/the sales team brought the wrong project/the developers messed up or anything else. Write in detail"
                            fieldName="description6"
                            value={formData?.description6}
                            isError={formValidation?.description6}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Client Satisfaction */}
                    <div className=" mb-4">
                        <CustomInput
                            label="9. Was the work delivered fully to the clients satisfaction and as per the agreed job scope?"
                            placeholder="Enter client satisfaction"
                            errorText="Client satisfaction is required"
                            isRequired={true}
                            fieldName="description7"
                            value={formData?.description7}
                            isError={formValidation?.description7}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Deadline */}
                    <div className=" mb-4">
                        <CustomInput
                            label="10. What was the deadline and was the deadline met?"
                            placeholder="Enter deadline"
                            errorText="Deadline is required"
                            isRequired={true}
                            fieldName="description8"
                            value={formData?.description8}
                            isError={formValidation?.description8}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Work About */}
                    <div className=" mb-4">
                        <CustomInput
                            label="11. What was the work about (You can share the instruction file) (optional)"
                            placeholder="Enter text"
                            fieldName="description9"
                            value={formData?.description9}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Reason */}
                    <div className="mb-4">
                        <CustomInput
                            label="12. Describe the reason why we are here. In other words"
                            placeholder="Describe the reason"
                            errorText="Reason is required"
                            value={formData?.description10}
                            isError={formValidation?.description10}
                            isRequired={true}
                            infoText="Write down why the client is this much dissatisfied and thinks of such extreme steps."
                            fieldName="description10"
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Dissatisfied Time */}
                    <div className="mb-4">
                        <CustomInput
                            label="13. When did the client get dissatisfied the 1st time"
                            placeholder="Enter time"
                            errorText="Time is required"
                            isRequired={true}
                            infoText="Write down the date, the reason, what he demanded and what measures were taken from your side after that"
                            value={formData?.description11}
                            isError={formValidation?.description11}
                            fieldName="description11"
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Dissatisfied Time */}
                    <div className="mb-4">
                        <CustomInput
                            label="14. When did the client get dissatisfied the 2nd time?"
                            placeholder="Enter time"
                            errorText="Time is required"
                            isRequired={true}
                            infoText="Write down the date, the reason, what he demanded and what measures were taken after that"
                            fieldName="description12"
                            value={formData?.description12}
                            isError={formValidation?.description12}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Dissatisfied Time */}
                    <div className="mb-4">
                        <CustomInput
                            label="15. When did the client get dissatisfied the 3rd time? "
                            placeholder="Enter time"
                            errorText="Time is required"
                            isRequired={true}
                            infoText="Write down the date, the reason, what he demanded and what measures were taken from your side after that"
                            fieldName="description13"
                            value={formData?.description13}
                            isError={formValidation?.description13}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Weaknesses */}
                    <div className="mb-4">
                        <CustomInput
                            label="16. List down your weaknesses/shortcomings/lackings during this project"
                            placeholder="Enter the list of weaknesses/shortcomings/lackings"
                            errorText="List of weaknesses/shortcomings/lackings is required"
                            isRequired={true}
                            infoText="Please be honest and do not hide anything. That is in the best interest of you and the company!"
                            fieldName="description14"
                            value={formData?.description14}
                            isError={formValidation?.description14}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Percentage and Value */}
                    <div className="mb-4">
                        <CustomInput
                            label="17. If we have to win here, what is the percentage and value of the amount"
                            placeholder="Enter percentage and value"
                            errorText="Percentage and value is required"
                            isRequired={true}
                            infoText="we should realistically claim (According to you)?"
                            fieldName="description15"
                            value={formData?.description15}
                            isError={formValidation?.description15}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Anything not mentioned */}
                    <div className="mb-4">
                        <CustomInput
                            label="18. Write down anything that you did not specifically mention above."
                            placeholder="Enter something here"
                            errorText="Specific mention is required"
                            isRequired={true}
                            infoText="Remember, if we are not aware of anything and the client blindsides us during the arbitration, the case will become very weak and it will be close to impossible for us to win it!"
                            fieldName="description16"
                            value={formData?.description16}
                            isError={formValidation?.description16}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Confirmation */}
                    <div className="mb-4">
                        <CustomInput
                            label="19. Please confirm all the above details are correct & complete"
                            placeholder="Enter confirmation here"
                            errorText="Confirmation is required"
                            isRequired={true}
                            infoText="no information was hidden for the client to blindside us. Repetition of such things may lead to tougher actions from the company as in a showcause letter, cash penalty etc."
                            fieldName="description17"
                            isError={formValidation?.description17}
                            value={formData?.description17}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    {/* Disputer Name and Email */}
                    <div className="modalInputContainer mb-4">
                        <CustomInput
                            label="Your Name"
                            placeholder="Please Enter Your Name"
                            errorText="Name is required"
                            isError={formValidation?.pm_name}
                            value={formData?.pm_name}
                            isRequired={true}
                            fieldName="pm_name"
                            onChange={handleInputChange}
                        />
                        <CustomInput
                            label="Your Email"
                            placeholder="Please Enter Your Email"
                            errorText={
                                formValidation.isEmailInValid
                                    ? "Invalid Email"
                                    : "Email is required"
                            }
                            isRequired={true}
                            fieldName="pm_email"
                            value={formData?.pm_email}
                            isError={
                                formValidation?.pm_email ||
                                formValidation?.isEmailInValid
                            }
                            onChange={handleInputChange}
                            type="email"
                        />
                    </div>
                    {/* Buttons */}
                    <div className="modalButtonContainer ">
                        <SingleButton
                            label={
                                isDisputeProjectLoading ? (
                                    <Loader title="Submitting" />
                                ) : (
                                    "Submit"
                                )
                            }
                            onClick={handleDisputeSubmit}
                            type="primary"
                            isDisabled={isDisputeProjectLoading}
                        />
                        <SingleButton
                            label="Close"
                            className=""
                            onClick={closeModal}
                            type="secondary"
                            isDisabled={isDisputeProjectLoading}
                        />
                    </div>
                </ModalContentContainer>
            </ModalContentContainer>
        </CustomAntModal>
    );
};

export default DisputeProjectFromModal;

DisputeProjectFromModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.object,
};
