import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import _ from "lodash";

// Components - UI - Custom
import CustomModal from "../UI/CustomModal/CustomModal";
import CustomModalHeader from "../UI/CustomModalHeader/CustomModalHeader";
import CustomInput from "../UI/CustomInput/CustomInput";
import CustomDropDown from "../UI/CustomDropDown/CustomDropDown";
import Button from "../Shared/Button";
import Switch from "../../../../../global/Switch";

// Components - Shared - Styled Components
import { ContentWrapper, ModalContentContainer } from "../UI/StyledComponents";

// Constants
import { priceQuotationsState } from "../../pages/PriceQuotations";
import { PriceQuotationsDataInputOptions } from "../../constant";

// Context Store
import { PriceQuotationsContext } from "../../context/PriceQuotationsProvider";

// Components - Section
import ExtraWorksInputsContainer from "../Section/ExtraWorksInputsContainer";

// Helper Function
import { generateUniqueId } from "../../../../../utils";

import {
    isStateAllHaveValue,
    markEmptyFieldsValidation,
} from "../../../../../utils/stateValidation";

const PriceQuotationsGenerateModal = ({
    isModalOpen,
    closeModal,
    modalTitle,
    priceQuotationsInputs,
    setPriceQuotationsInputs,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [extraInfoInputsValidation, setExtraInfoInputsValidation] =
        React.useState({
            isError: false,
            errorText: "",
            is_submitting: false,
        });
    const { filterOptions } = useContext(PriceQuotationsContext);
    const { category, deadline } = PriceQuotationsDataInputOptions;
    const [
        priceQuotationsInputsValidation,
        setPriceQuotationsInputsValidation,
    ] = React.useState(priceQuotationsState.validation);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPriceQuotationsInputs((prev) => {
            const updatedInputs = { ...prev };
            if (name === "other_works") {
                const isExist = _.filter(
                    updatedInputs?.other_works,
                    (item) => item?.id === value?.id
                );
                if (isExist) {
                    updatedInputs.other_works =
                        updatedInputs.other_works.filter(
                            (item) => item?.id !== value?.id
                        );
                    updatedInputs.other_works_data =
                        updatedInputs.other_works_data.filter(
                            (item) => item?.parent?.id !== value?.id
                        );
                } else {
                    updatedInputs.other_works = [
                        ...updatedInputs.other_works,
                        value,
                    ];
                }
                setExtraInfoInputsValidation({
                    isError: false,
                    errorText: "",
                    is_submitting: false,
                });
            } else if (name === "client") {
                updatedInputs.deal = {};
                updatedInputs[name] = value;
            } else if (name === "major_works" || name === "risk_factors") {
                updatedInputs[name] = value;
                if (value === "NO") {
                    if (name === "major_works") {
                        updatedInputs.number_of_functionalities = null;
                    } else {
                        updatedInputs.risk_percentage = null;
                    }
                }
            } else {
                updatedInputs[name] = value;
            }
            return updatedInputs;
        });
    };

    // Extra Handler for generating title with the number of words or logo or pages etc
    const extraHandler = (e, type, fieldName, parent) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputValue = formData.get(fieldName);
        if (!inputValue) {
            setExtraInfoInputsValidation({
                isError: true,
                errorText: `Number of ${_.startCase(type)} is required`,
                is_submitting: true,
            });
            return;
        }
        setExtraInfoInputsValidation({
            isError: false,
            errorText: "",
            is_submitting: false,
        });
        const title = generateTitle(type, inputValue);
        const payload = {
            id: generateUniqueId(),
            title: title,
            value: inputValue,
            parent: parent,
            status: true,
        };
        setPriceQuotationsInputs({
            ...priceQuotationsInputs,
            other_works_data: [
                ...priceQuotationsInputs.other_works_data,
                payload,
            ],
        });
    };

    const generateTitle = (type, value) => {
        switch (type) {
            case "words":
                return `Content Writing ${value} words`;
            case "logo":
                return `Logo Creation ${value} logos`;
            case "pages":
                return `UI Design ${value} pages`;
            case "other":
                return `Others ${value} hours`;
        }
    };

    const validateOtherWorks = (priceQuotationsInputs) => {
        if (priceQuotationsInputs.other_works.length) {
            const filterSpeedOptimization =
                priceQuotationsInputs.other_works?.filter(
                    (item) => item?.name !== "Speed Optimization"
                );
            if (filterSpeedOptimization?.length > 0) {
                const isLengthSame =
                    filterSpeedOptimization?.length ===
                    priceQuotationsInputs.other_works_data?.length;
                if (isLengthSame) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const handleSubmitPriceQuotations = async () => {
        const {
            major_works,
            risk_factors,
            other_works,
            other_works_data,
            number_of_functionalities,
            risk_percentage,
            ...formData
        } = priceQuotationsInputs;

        const payload = {
            ...formData,
        };

        if (major_works === "Yes" && number_of_functionalities === null) {
            payload.number_of_functionalities = null;
        }
        if (risk_factors === "Yes" && risk_percentage === null) {
            payload.risk_percentage = null;
        }

        const isEmpty = isStateAllHaveValue(payload);
        if (isEmpty) {
            const validation = markEmptyFieldsValidation(payload);
            setPriceQuotationsInputsValidation({
                ...priceQuotationsInputsValidation,
                ...validation,
                other_works: validateOtherWorks(priceQuotationsInputs),
                is_submitting: true,
            });
            return;
        }
        try {
            console.log(priceQuotationsInputs);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (priceQuotationsInputsValidation.is_submitting) {
            const validation = markEmptyFieldsValidation(priceQuotationsInputs);
            setPriceQuotationsInputsValidation({
                ...priceQuotationsInputsValidation,
                ...validation,
                other_works: validateOtherWorks(priceQuotationsInputs),
                other_works_data: false,
                risk_percentage:
                    priceQuotationsInputs?.risk_factors === "Yes" &&
                    !priceQuotationsInputs?.risk_percentage,
                number_of_functionalities:
                    priceQuotationsInputs?.major_works === "Yes" &&
                    !priceQuotationsInputs?.number_of_functionalities,
                is_submitting: true,
            });
        }
    }, [
        priceQuotationsInputs,
        priceQuotationsInputsValidation.is_submitting,
        priceQuotationsInputsValidation.risk_percentage,
        priceQuotationsInputsValidation.number_of_functionalities,
    ]);

    return (
        <CustomModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            height="95vh"
            width="1100px"
            isCentered
        >
            <CustomModalHeader title={modalTitle} closeModal={closeModal} />
            <ModalContentContainer
                color="var(--primaryLightDarkBlue)"
                style={{
                    maxHeight: "calc(90vh - 50px)",
                    overflowY: "auto",
                }}
            >
                <ContentWrapper className="mb-3">
                    <CustomDropDown
                        isSearchBoxUse
                        isRequired={true}
                        filedName={"client"}
                        label="1. Client Name"
                        data={filterOptions?.clients}
                        setSelected={handleInputChange}
                        placeholder="Select Client Name"
                        errorText="Client Name is required"
                        selected={priceQuotationsInputs?.client}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.client
                        }
                    />
                    <CustomDropDown
                        isSearchBoxUse
                        isRequired={true}
                        filedName={"deal"}
                        label="2. Deal Name"
                        isDisableUse={!priceQuotationsInputs?.client?.user_name}
                        data={filterOptions?.deals.filter(
                            (deal) =>
                                deal?.client_username ===
                                priceQuotationsInputs?.client?.user_name
                        )}
                        placeholder="Select Deal Name"
                        setSelected={handleInputChange}
                        errorText="Deal Name is required"
                        selected={priceQuotationsInputs?.deal}
                        disabledTitle={
                            !priceQuotationsInputs?.client?.user_name &&
                            "Please select Client Name first"
                        }
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.deal
                        }
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <CustomDropDown
                        label="3. CMS"
                        isSearchBoxUse
                        filedName={"cms"}
                        isRequired={true}
                        placeholder="Select CMS"
                        data={filterOptions?.cms}
                        errorText="CMS is required"
                        setSelected={handleInputChange}
                        selected={priceQuotationsInputs?.cms}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.cms
                        }
                    />
                    <CustomDropDown
                        data={category}
                        isRequired={true}
                        label="4. Category"
                        filedName={"category"}
                        placeholder="Select Category"
                        errorText="Category is required"
                        setSelected={handleInputChange}
                        selected={priceQuotationsInputs?.category}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.category
                        }
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <CustomInput
                        isRequired
                        type="number"
                        fieldName="primary_page"
                        onChange={handleInputChange}
                        errorText="Primary pages is required"
                        label="5. Number of primary pages required"
                        value={priceQuotationsInputs?.primary_page}
                        placeholder="Enter Number of Primary Pages"
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation["primary_page"]
                        }
                    />
                    <CustomInput
                        isRequired
                        type="number"
                        fieldName="secondary_page"
                        onChange={handleInputChange}
                        errorText="Secondary pages is required"
                        label="6. Number of secondary pages required"
                        value={priceQuotationsInputs?.secondary_page}
                        placeholder="Enter Number of Secondary Pages"
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation["secondary_page"]
                        }
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <div className="d-flex flex-column">
                        <CustomInput
                            type="button"
                            fieldName="major_works"
                            onChange={handleInputChange}
                            value={priceQuotationsInputs?.major_works}
                            label="7. Any major functionalities required?"
                        />
                        <Switch>
                            <Switch.Case
                                condition={
                                    priceQuotationsInputs?.major_works === "Yes"
                                }
                            >
                                <CustomInput
                                    isChild
                                    type="number"
                                    isRequired
                                    onChange={handleInputChange}
                                    fieldName="number_of_functionalities"
                                    errorText="Number of Functionalities Required"
                                    label="i. Number of Functionalities Requirements"
                                    value={
                                        priceQuotationsInputs?.number_of_functionalities
                                    }
                                    placeholder="Enter Number of Functionalities"
                                    isError={
                                        priceQuotationsInputsValidation?.is_submitting &&
                                        priceQuotationsInputsValidation?.number_of_functionalities
                                    }
                                />
                            </Switch.Case>
                        </Switch>
                    </div>
                    <ExtraWorksInputsContainer
                        extraHandler={extraHandler}
                        handleInputChange={handleInputChange}
                        isError={extraInfoInputsValidation.isError}
                        priceQuotationsInputs={priceQuotationsInputs}
                        errorText={extraInfoInputsValidation.errorText}
                        extraInfoInputsValidation={extraInfoInputsValidation}
                        setExtraInfoInputsValidation={
                            setExtraInfoInputsValidation
                        }
                        priceQuotationsInputsValidation={
                            priceQuotationsInputsValidation
                        }
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <div className="d-flex flex-column">
                        <CustomInput
                            type="button"
                            fieldName="risk_factors"
                            onChange={handleInputChange}
                            value={priceQuotationsInputs?.risk_factors}
                            label="9. Is there any risk factors involved? "
                        />
                        <Switch>
                            <Switch.Case
                                condition={
                                    priceQuotationsInputs?.risk_factors ===
                                    "Yes"
                                }
                            >
                                <CustomInput
                                    isChild
                                    type="percentage"
                                    label="i. Risk Percentage"
                                    fieldName="risk_percentage"
                                    errorText="Risk Percentage is required"
                                    value={
                                        priceQuotationsInputs?.risk_percentage
                                    }
                                    onChange={handleInputChange}
                                    isError={
                                        priceQuotationsInputsValidation?.is_submitting &&
                                        priceQuotationsInputsValidation?.risk_percentage
                                    }
                                />
                            </Switch.Case>
                        </Switch>
                    </div>

                    <CustomDropDown
                        isRequired={true}
                        label="10. Clients Currency"
                        filedName={"client_currency"}
                        placeholder="Select a Currency"
                        setSelected={handleInputChange}
                        data={filterOptions?.currencies}
                        errorText="Client Currency is required"
                        selected={priceQuotationsInputs?.client_currency}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.client_currency
                        }
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <CustomDropDown
                        data={deadline}
                        isRequired={true}
                        filedName="deadline"
                        label="11. Deadline"
                        placeholder="Select Deadline"
                        setSelected={handleInputChange}
                        errorText="Deadline is required"
                        selected={priceQuotationsInputs?.deadline}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.deadline
                        }
                    />
                    <CustomDropDown
                        isRequired={true}
                        filedName="platform_account"
                        label="12. Freelancer account"
                        data={filterOptions?.accounts}
                        setSelected={handleInputChange}
                        placeholder="Select Freelancer Account"
                        errorText="Freelancer Account is required"
                        selected={priceQuotationsInputs?.platform_account}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.platform_account
                        }
                    />
                </ContentWrapper>
                <ContentWrapper className="justify-content-center pt-3">
                    <Button
                        className="mr-2 price_quotation_custom_button price_quotation_custom_button_primary"
                        isLoading={isLoading}
                        onClick={handleSubmitPriceQuotations}
                    >
                        Submit & View
                    </Button>
                    <Button
                        className="price_quotation_custom_button price_quotation_custom_button_danger"
                        isLoading={false}
                        onClick={closeModal}
                        size="md"
                    >
                        Close
                    </Button>
                </ContentWrapper>
            </ModalContentContainer>
        </CustomModal>
    );
};

export default PriceQuotationsGenerateModal;

PriceQuotationsGenerateModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalTitle: PropTypes.string,
    priceQuotationsInputs: PropTypes.object,
    setPriceQuotationsInputs: PropTypes.func,
};
