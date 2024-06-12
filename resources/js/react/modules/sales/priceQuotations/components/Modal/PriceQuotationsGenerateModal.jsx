import React, { useContext } from "react";
import PropTypes from "prop-types";
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
import { generateUniqueId } from "../../../../../utils";
import { useDispatch } from "react-redux";

const PriceQuotationsGenerateModal = ({
    isModalOpen,
    closeModal,
    modalTitle,
    priceQuotationsInputs,
    setPriceQuotationsInputs,
}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(false);
    const [extraInfoInputsValidation, setExtraInfoInputsValidation] =
        React.useState({
            isError: false,
            errorText: "",
        });
    const { filterOptions } = useContext(PriceQuotationsContext);
    const { category, deadline } = PriceQuotationsDataInputOptions;
    const [
        priceQuotationsInputsValidation,
        setPriceQuotationsInputsValidation,
    ] = React.useState(priceQuotationsState.validation);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "other_works") {
            const isExist = _.filter(
                priceQuotationsInputs?.other_works,
                (item) => item?.id === value?.id
            );
            if (isExist?.length) {
                const updatedOtherWorks =
                    priceQuotationsInputs?.other_works?.filter(
                        (item) => item?.id !== value?.id
                    );
                const updatedOtherWorksData = priceQuotationsInputs?.other_works_data?.filter( item => item?.parent?.id !== value?.id);
                setPriceQuotationsInputs({
                    ...priceQuotationsInputs,
                    other_works: updatedOtherWorks,
                    other_works_data: updatedOtherWorksData
                });
            } else {
                setPriceQuotationsInputs({
                    ...priceQuotationsInputs,
                    other_works: [...priceQuotationsInputs.other_works, value],
                });
            }
        } else {
            setPriceQuotationsInputs({
                ...priceQuotationsInputs,
                [name]: value,
            });
        }
    };

    // Extra Handler for generating title with the number of words or logo or pages etc
    const extraHandler = (e, type, fieldName, parent) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputValue = formData.get(fieldName);
        if (!inputValue) {
            setExtraInfoInputsValidation({
                isError: true,
                errorText: `${_.startCase(type)} is required`,
            });
            return;
        }
        setExtraInfoInputsValidation({
            isError: false,
            errorText: "",
        });
        const title = generateTitle(type, inputValue);
        const payload = {
            id: generateUniqueId(),
            title: title,
            value: inputValue,
            parent: parent,
            status: true
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
                    maxHeight: "calc(85vh - 50px)",
                    overflowY: "auto",
                }}
            >
                <ContentWrapper className="mb-3">
                    <CustomDropDown
                        label="1. CMS"
                        isSearchBoxUse
                        isRequired={true}
                        filedName={"cms"}
                        placeholder="Select CMS"
                        data={filterOptions?.cms}
                        selected={priceQuotationsInputs?.cms}
                        setSelected={handleInputChange}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.cms
                        }
                        errorText="CMS is required"
                    />
                    <CustomDropDown
                        label="2. Category"
                        placeholder="Select Category"
                        data={category}
                        isRequired={true}
                        filedName={"category"}
                        selected={priceQuotationsInputs?.category}
                        setSelected={handleInputChange}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.category
                        }
                        errorText="Category is required"
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <CustomInput
                        label="3. Number of primary pages required"
                        fieldName="primary_page"
                        isRequired
                        type="number"
                        value={priceQuotationsInputs?.primary_page}
                        onChange={handleInputChange}
                        placeholder="Enter Number of Primary Pages"
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation["primary_page"]
                        }
                        errorText="Primary pages is required"
                    />
                    <CustomInput
                        label="4. Number of secondary pages required"
                        fieldName="secondary_page"
                        type="number"
                        isRequired
                        value={priceQuotationsInputs?.secondary_page}
                        onChange={handleInputChange}
                        placeholder="Enter Number of Secondary Pages"
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation["secondary_page"]
                        }
                        errorText="Secondary pages is required"
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <div className="d-flex flex-column">
                        <CustomInput
                            label="5. Any major functionalities required?"
                            fieldName="major_works"
                            isRequired
                            type="button"
                            value={priceQuotationsInputs?.major_works}
                            onChange={handleInputChange}
                            isError={
                                priceQuotationsInputsValidation?.is_submitting &&
                                priceQuotationsInputsValidation["major_works"]
                            }
                            errorText="Major works is required"
                        />
                        <Switch>
                            <Switch.Case
                                condition={
                                    priceQuotationsInputs?.major_works === "Yes"
                                }
                            >
                                <CustomInput
                                    label="i. Number of Functionalities Requirements"
                                    fieldName="number_of_functionalities"
                                    isChild
                                    type="number"
                                    value={
                                        priceQuotationsInputs?.number_of_functionalities
                                    }
                                    onChange={handleInputChange}
                                />
                            </Switch.Case>
                        </Switch>
                    </div>
                    <ExtraWorksInputsContainer
                        priceQuotationsInputs={priceQuotationsInputs}
                        handleInputChange={handleInputChange}
                        extraHandler={extraHandler}
                        priceQuotationsInputsValidation={
                            priceQuotationsInputsValidation
                        }
                        isError={extraInfoInputsValidation.isError}
                        errorText={extraInfoInputsValidation.errorText}
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <div className="d-flex flex-column">
                        <CustomInput
                            label="7. Is there any risk factors involved? "
                            fieldName="risk_factors"
                            isRequired
                            type="button"
                            value={priceQuotationsInputs?.risk_factors}
                            onChange={handleInputChange}
                            isError={
                                priceQuotationsInputsValidation?.is_submitting &&
                                priceQuotationsInputsValidation["risk_factors"]
                            }
                            errorText="Risk factors is required"
                        />
                        <Switch>
                            <Switch.Case
                                condition={
                                    priceQuotationsInputs?.risk_factors ===
                                    "Yes"
                                }
                            >
                                <CustomInput
                                    label="i. Risk Percentage"
                                    fieldName="risk_percentage"
                                    type="percentage"
                                    isChild
                                    value={
                                        priceQuotationsInputs?.risk_percentage
                                    }
                                    onChange={handleInputChange}
                                    isError={
                                        priceQuotationsInputsValidation?.is_submitting &&
                                        priceQuotationsInputsValidation[
                                            "risk_percentage"
                                        ]
                                    }
                                    errorText="Risk Percentage is required"
                                />
                            </Switch.Case>
                        </Switch>
                    </div>

                    <CustomDropDown
                        label="8. Clients Currency"
                        placeholder="Select a Currency"
                        data={filterOptions?.currencies}
                        isRequired={true}
                        filedName={"client_currency"}
                        selected={priceQuotationsInputs?.client_currency}
                        setSelected={handleInputChange}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.client_currency
                        }
                        errorText="Client Currency is required"
                    />
                </ContentWrapper>
                <ContentWrapper className="mb-3">
                    <CustomDropDown
                        label="9. Deadline"
                        placeholder="Select Deadline"
                        data={deadline}
                        isRequired={true}
                        filedName="deadline"
                        selected={priceQuotationsInputs?.deadline}
                        setSelected={handleInputChange}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.deadline
                        }
                        errorText="Deadline is required"
                    />
                    <CustomDropDown
                        label="10. Freelancer account"
                        placeholder="Select Freelancer Account"
                        data={filterOptions?.accounts}
                        isRequired={true}
                        filedName="platform_account"
                        selected={priceQuotationsInputs?.platform_account}
                        setSelected={handleInputChange}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.platform_account
                        }
                        errorText="Freelancer Account is required"
                    />
                </ContentWrapper>
                <ContentWrapper className="justify-content-center pt-3">
                    <Button
                        className="mr-2 price_quotation_custom_button price_quotation_custom_button_primary"
                        isLoading={isLoading}
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
};
