import React, { useContext } from "react";
import PropTypes from "prop-types";

// Components - UI - Custom
import CustomInput from "../../UI/CustomInput/CustomInput";
import CustomDropDown from "../../UI/CustomDropDown/CustomDropDown";

// Components - UI - Styled Components
import { ContentWrapper } from "../../UI/StyledComponents";

// Context Data
import { PriceQuotationsContext } from "../../../context/PriceQuotationsProvider";

// Components - Shared
import Switch from "../../../../../../global/Switch";

// Extra Works Inputs Container
import ExtraWorksInputsContainer from "./ExtraWorksInputsContainer";

// Helper Function
import { generateUniqueId } from "../../../../../../utils";
import { PriceQuotationsDataInputOptions } from "../../../constant";

const SubmitPriceQuotation = ({
    handleInputChange,
    priceQuotationsInputs,
    setPriceQuotationsInputs,
    extraInfoInputsValidation,
    setExtraInfoInputsValidation,
    priceQuotationsInputsValidation,
}) => {
    const { filterOptions } = useContext(PriceQuotationsContext);
    const { category, deadline } = PriceQuotationsDataInputOptions;
    

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

    /**
     * Generate a title based on type and value.
     * @param {string} type - The type of the input.
     * @param {string} value - The value of the input.
     * @returns {string} The generated title.
     */
    const generateTitle = (type, value) => {
        const titles = {
            words: `Content Writing ${value} words`,
            logo: `Logo Creation ${value} logos`,
            pages: `UI Design ${value} pages`,
            other: `Others ${value} hours`,
        };
        return titles[type];
    };

    return (
        <React.Fragment>
            <ContentWrapper className="mb-3">
                <CustomDropDown
                    isRequired
                    isSearchBoxUse
                    filedName="client"
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
                    isRequired
                    isSearchBoxUse
                    filedName="deal"
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
                    isRequired
                    label="3. CMS"
                    isSearchBoxUse
                    filedName="cms"
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
                    isRequired
                    label="4. Category"
                    filedName="category"
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
                                isRequired
                                type="number"
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
                    setExtraInfoInputsValidation={setExtraInfoInputsValidation}
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
                                priceQuotationsInputs?.risk_factors === "Yes"
                            }
                        >
                            <CustomInput
                                isChild
                                type="percentage"
                                label="i. Risk Percentage"
                                fieldName="risk_percentage"
                                onChange={handleInputChange}
                                errorText="Risk Percentage is required"
                                value={priceQuotationsInputs?.risk_percentage}
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
        </React.Fragment>
    );
};

export default SubmitPriceQuotation;

SubmitPriceQuotation.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    priceQuotationsInputs: PropTypes.object.isRequired,
    setPriceQuotationsInputs: PropTypes.func.isRequired,
    extraInfoInputsValidation: PropTypes.object.isRequired,
    setExtraInfoInputsValidation: PropTypes.func.isRequired,
    priceQuotationsInputsValidation: PropTypes.object.isRequired,
};
