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


const platformAccountState = {
    validation: {
        platform: false,
        user_name: false,
        user_url: false,
        account_email: false,
        profile_type: false,
        generated_on: false,
        multiplying_factor: false,
        is_submitting: false,
        isEmailInValid: false,
    },
    inputs: {
        platform: {},
        user_name: "",
        user_url: "",
        account_email: "",
        profile_type: {},
        generated_on: null,
        multiplying_factor: "",
        is_information_accurate: false,
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

    const dummyUpdateData = () => {
        AccountListDummyData.map((item) => {
            if (item.id === platformAccountInputs.id) {
                return {
                    ...item,
                    ...platformAccountInputs,
                };
            }
            return item;
        });
    };

    const handleSubmit = () => {
        const { is_information_accurate, ...formData } = platformAccountInputs;
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
        if (!isEmail(platformAccountInputs.account_email)) {
            setPlatformAccountValidation({
                ...platformAccountValidation,
                is_submitting: true,
                isEmailInValid: platformAccountInputs.account_email
                    ? isEmailInvalid(platformAccountInputs.account_email)
                    : false,
            });
            toast.error("Invalid Email");
            return;
        }

        // API Call
        try {
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
                closeModal();
                if (isPlatformAccountUpdate) {
                    dummyUpdateData();
                }
                toast.success(
                    isPlatformAccountUpdate
                        ? "Platform Account Updated Successfully"
                        : "Platform Account Created Successfully"
                );
            }, 3000);
        } catch (error) {
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
                isEmailInValid: platformAccountInputs.account_email
                    ? isEmailInvalid(platformAccountInputs.account_email)
                    : false,
            });
        }
    }, [
        platformAccountInputs,
        platformAccountValidation.is_submitting,
        platformAccountValidation.account_email,
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
                        filedName="platform"
                        selected={platformAccountInputs?.platform}
                        setSelected={handleInputChange}
                        isError={
                            platformAccountValidation?.is_submitting &&
                            platformAccountValidation?.platform
                        }
                        errorText="Platform is required"
                    />
                    <CustomInput
                        label="2. User Name"
                        fieldName="user_name"
                        isRequired
                        value={platformAccountInputs?.user_name}
                        onChange={handleInputChange}
                        errorText="User Name is required"
                        isError={
                            platformAccountValidation?.is_submitting &&
                            platformAccountValidation?.user_name
                        }
                        placeholder="Enter User Name"
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <CustomInput
                        label="3. User Url"
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
                    <CustomInput
                        label="4. Account Email"
                        fieldName="account_email"
                        type="email"
                        isRequired
                        value={platformAccountInputs?.account_email}
                        onChange={handleInputChange}
                        placeholder="Enter Account Email"
                        isError={
                            platformAccountValidation?.is_submitting &&
                            (platformAccountValidation?.account_email ||
                                platformAccountValidation.isEmailInValid)
                        }
                        errorText={
                            platformAccountValidation.isEmailInValid
                                ? "Invalid Email"
                                : "Account Email is required"
                        }
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <CustomDropDown
                        label="5. Profile Type"
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
                    <CustomInput
                        label="6. Generated On"
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
                </ContentWrapper>
                <ContentWrapper className="mb-2">
                    <CustomInput
                        label="7. Multiplying Factor"
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
                    <div className="d-flex flex-column">
                        <div className="mb-3 custom_check_box">
                            <Checkbox
                                checked={
                                    platformAccountInputs?.is_information_accurate
                                }
                                onChange={(e) => {
                                    handleInputChange({
                                        target: {
                                            name: "is_information_accurate",
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
                                isLoading={isLoading}
                                disabled={
                                    platformAccountInputs.is_information_accurate ===
                                    false
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
