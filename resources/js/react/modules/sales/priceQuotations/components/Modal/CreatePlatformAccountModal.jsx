import PropTypes from "prop-types";
import { Checkbox } from "antd";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

// Components - Shared - UI
import Button from "../Shared/Button";
import CustomInput from "../UI/CustomInput/CustomInput";
import CustomModal from "../UI/CustomModal/CustomModal";
import CustomDropDown from "../UI/CustomDropDown/CustomDropDown";
import CustomModalHeader from "../UI/CustomModalHeader/CustomModalHeader";
// Components - Local - Styled Components
import { ContentWrapper, ModalContentContainer } from "../UI/StyledComponents";

// Constants
import {
    AccountListDummyData,
    PlatformOptions,
    ProfileTypeOptions,
} from "../../constant";

// Utils
import {
    isStateAllHaveValue,
    markEmptyFieldsValidation,
} from "../../../../../utils/stateValidation";
import {
    useCreatePlatformAccountMutation,
    useUpdatePlatformAccountMutation,
} from "../../../../../services/api/platformAccountApiSlice";

const platformAccountState = {
    validation: {
        type: false,
        username: false,
        name: false,
        user_url: false,
        email: false,
        profile_type: false,
        generated_on: false,
        multiplying_factor: false,
        is_submitting: false,
        isEmailInValid: false,
    },
    inputs: {
        type: {},
        username: "",
        name: "",
        user_url: "",
        email: "",
        profile_type: {},
        generated_on: null,
        multiplying_factor: "",
        confirmation_of_data_accuracy: false,
    },
};

const CreatePlatformAccountModal = ({
    isModalOpen,
    closeModal,
    platformAccountInputs,
    setPlatformAccountInputs,
    modalTitle,
    isPlatformAccountUpdate,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [platformAccountValidation, setPlatformAccountValidation] = useState(
        platformAccountState.validation
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlatformAccountInputs({
            ...platformAccountInputs,
            [name]: value,
        });
    };

    const [createPlatformAccount, { isLoading: isCreatingPlatformAccount }] =
        useCreatePlatformAccountMutation();

    const [updatePlatformAccount, { isLoading: isUpdatingPlatformAccount }] =
        useUpdatePlatformAccountMutation();

    const handleSubmit = async () => {
        const { confirmation_of_data_accuracy, ...formData } =
            platformAccountInputs;
        const isEmpty = isStateAllHaveValue(formData);
        if (isEmpty) {
            const validation = markEmptyFieldsValidation(formData);
            setPlatformAccountValidation({
                ...platformAccountValidation,
                ...validation,
                is_submitting: true,
            });

            toast.error("Please Complete the form properly");
            return;
        }
        // Email Validation
        if (!isEmail(platformAccountInputs.email)) {
            setPlatformAccountValidation({
                ...platformAccountValidation,
                is_submitting: true,
                isEmailInValid: platformAccountInputs.email
                    ? isEmailInvalid(platformAccountInputs.email)
                    : false,
            });
            toast.error("Invalid Email");
            return;
        }

        // API Call
        try {
            const apiCall = isPlatformAccountUpdate
                ? updatePlatformAccount
                : createPlatformAccount;

            const payload = {
                ...platformAccountInputs,
                type: platformAccountInputs.type.id,
                confirmation_of_data_accuracy: 1, // Always true
                profile_type: platformAccountInputs.profile_type.id,
                status: 1, // Active (1) - Inactive (0) but default is active
                multiplying_factor: Number(
                    platformAccountInputs.multiplying_factor
                ),
            };

            const res = await apiCall(payload).unwrap();
            if (res.status === 200) {
                toast.success(res.message);
                closeModal();
            }
        } catch (error) {
            console.log("Error", error);
            toast.error("Something went wrong");
        }
    };

    // Helper Function to check if email is invalid
    function isEmailInvalid(email) {
        return !isEmail(email);
    }

    // UseEffect to check if form is submitting
    useEffect(() => {
        if (platformAccountValidation.is_submitting) {
            const validation = markEmptyFieldsValidation(platformAccountInputs);
            setPlatformAccountValidation({
                ...platformAccountValidation,
                ...validation,
                isEmailInValid: platformAccountInputs.email
                    ? isEmailInvalid(platformAccountInputs.email)
                    : false,
            });
        }
    }, [
        platformAccountInputs,
        platformAccountValidation.is_submitting,
        platformAccountValidation.email,
    ]);

    return (
        <CustomModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            height="70vh"
            width="1100px"
            isCentered
        >
            <CustomModalHeader title={modalTitle} closeModal={closeModal} />
            <ModalContentContainer
                color="var(--primaryLightDarkBlue)"
                style={{
                    maxHeight: "calc(70vh - 50px)",
                    overflowY: "auto",
                }}
            >
                <ContentWrapper className="mb-3">
                    <CustomDropDown
                        label="1. Platform"
                        placeholder="Select Platform"
                        data={PlatformOptions}
                        isRequired
                        filedName="type"
                        selected={platformAccountInputs?.type}
                        setSelected={handleInputChange}
                        isError={
                            platformAccountValidation?.is_submitting &&
                            platformAccountValidation?.type
                        }
                        errorText="Platform is required"
                    />
                    <CustomInput
                        label="2. Name"
                        fieldName="name"
                        isRequired
                        value={platformAccountInputs?.name}
                        onChange={handleInputChange}
                        errorText="Name is required"
                        isError={
                            platformAccountValidation?.is_submitting &&
                            platformAccountValidation?.name
                        }
                        placeholder="Enter Name"
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <CustomInput
                        label="3. User Name"
                        fieldName="username"
                        isRequired
                        value={platformAccountInputs?.username}
                        onChange={handleInputChange}
                        errorText="User Name is required"
                        isError={
                            platformAccountValidation?.is_submitting &&
                            platformAccountValidation?.username
                        }
                        placeholder="Enter User Name"
                    />
                    <CustomInput
                        label="4. User Url"
                        fieldName="user_url"
                        isRequired
                        value={platformAccountInputs?.user_url}
                        onChange={handleInputChange}
                        placeholder="Enter User Name"
                        isError={
                            platformAccountValidation?.is_submitting &&
                            platformAccountValidation["user_url"]
                        }
                        errorText="User Url is required"
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <CustomInput
                        label="5. Account Email"
                        fieldName="email"
                        type="email"
                        isRequired
                        value={platformAccountInputs?.email}
                        onChange={handleInputChange}
                        placeholder="Enter Account Email"
                        isError={
                            platformAccountValidation?.is_submitting &&
                            (platformAccountValidation?.email ||
                                platformAccountValidation.isEmailInValid)
                        }
                        errorText={
                            platformAccountValidation.isEmailInValid
                                ? "Invalid Email"
                                : "Account Email is required"
                        }
                    />
                    <CustomDropDown
                        label="6. Profile Type"
                        placeholder="Select Profile Type"
                        data={ProfileTypeOptions}
                        isRequired
                        filedName="profile_type"
                        selected={platformAccountInputs?.profile_type}
                        setSelected={handleInputChange}
                        isError={
                            platformAccountValidation?.is_submitting &&
                            platformAccountValidation?.profile_type
                        }
                        errorText="Profile Type is required"
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-2">
                    <CustomInput
                        label="7. Generated On"
                        fieldName="generated_on"
                        isRequired
                        value={platformAccountInputs?.generated_on}
                        placeholder="Enter Generated On"
                        type="date"
                        onChange={handleInputChange}
                        isError={
                            platformAccountValidation?.is_submitting &&
                            platformAccountValidation?.generated_on
                        }
                        errorText="Generated On is required"
                    />
                    <CustomInput
                        label="8. Multiplying Factor"
                        fieldName="multiplying_factor"
                        isRequired
                        type="number"
                        value={platformAccountInputs?.multiplying_factor}
                        placeholder="Enter Multiplying Factor"
                        isError={
                            platformAccountValidation?.is_submitting &&
                            platformAccountValidation?.multiplying_factor
                        }
                        errorText="Multiplying Factor is required"
                        onChange={handleInputChange}
                    />
                </ContentWrapper>
                <ContentWrapper className="my-2">
                    <div className="d-flex flex-column">
                        <div className="mb-3 custom_check_box">
                            <Checkbox
                                checked={
                                    platformAccountInputs?.confirmation_of_data_accuracy
                                }
                                onChange={(e) => {
                                    handleInputChange({
                                        target: {
                                            name: "confirmation_of_data_accuracy",
                                            value: e.target.checked,
                                        },
                                    });
                                }}
                            >
                                I hereby confirm that all provided information
                                is accurate.
                            </Checkbox>
                        </div>
                        <div className="d-flex">
                            <Button
                                className="mr-2 price_quotation_custom_button price_quotation_custom_button_primary"
                                isLoading={
                                    isCreatingPlatformAccount ||
                                    isUpdatingPlatformAccount
                                }
                                disabled={
                                    platformAccountInputs.confirmation_of_data_accuracy ===
                                        false ||
                                    isCreatingPlatformAccount ||
                                    isUpdatingPlatformAccount
                                }
                                loaderTitle={
                                    isPlatformAccountUpdate
                                        ? "Updating"
                                        : "Creating"
                                }
                                size="md"
                                onClick={handleSubmit}
                            >
                                {isPlatformAccountUpdate ? "Update" : "Create"}
                            </Button>
                            <Button
                                className="price_quotation_custom_button price_quotation_custom_button_danger"
                                isLoading={false}
                                onClick={closeModal}
                                size="md"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </ContentWrapper>
            </ModalContentContainer>
        </CustomModal>
    );
};

export default CreatePlatformAccountModal;

CreatePlatformAccountModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalData: PropTypes.object,
    modalTitle: PropTypes.string,
    setPlatformAccountInputs: PropTypes.func,
    platformAccountInputs: PropTypes.object,
    isPlatformAccountUpdate: PropTypes.bool,
};
