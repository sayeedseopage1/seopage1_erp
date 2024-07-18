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

// Constants
import { PriceQuotationsDataInputOptions } from "../../../constant";

// hooks
import usePriceQuotations from "../../../hooks/usePriceQuotations";

const SubmitPriceQuotation = ({
    handleInputChange,
    isDealStagePage,
    priceQuotationsInputs,
    setPriceQuotationsInputs,
    extraInfoInputsValidation,
    setExtraInfoInputsValidation,
    priceQuotationsInputsValidation,
}) => {
    const { cmsData, isCMSLoading, currenciesData, isCurrenciesLoading } =
        useContext(PriceQuotationsContext);
    const { deadline } = PriceQuotationsDataInputOptions;
    const {
        clientsData,
        dealsData,
        projectNichesData,
        isClientsLoading,
        isDealLoading,
        isProjectNichesLoading,
        accountsData,
        isAccountsLoading,
    } = usePriceQuotations(priceQuotationsInputs);

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
            parent_value: parent?.value,
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
            hours: `Others ${value} hours`,
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
                    data={clientsData}
                    isDisableUse={isDealStagePage}
                    setSelected={handleInputChange}
                    placeholder="Select Client Name"
                    errorText="Client Name is required"
                    isFullDropDownLoading={isClientsLoading}
                    selected={priceQuotationsInputs?.client}
                    isError={
                        priceQuotationsInputsValidation?.is_submitting &&
                        priceQuotationsInputsValidation?.client
                    }
                />
                <CustomDropDown
                    isRequired
                    isSearchBoxUse
                    filedName="deal_stage_id"
                    label="2. Deal Name"
                    isDisableUse={
                        !priceQuotationsInputs?.client?.name || isDealStagePage
                    }
                    data={dealsData}
                    placeholder="Select Deal Name"
                    isFullDropDownLoading={isDealLoading}
                    setSelected={handleInputChange}
                    errorText="Deal Name is required"
                    selected={priceQuotationsInputs?.deal_stage_id}
                    disabledTitle={
                        !priceQuotationsInputs?.client?.name &&
                        "Please select Client Name first"
                    }
                    isError={
                        priceQuotationsInputsValidation?.is_submitting &&
                        priceQuotationsInputsValidation?.deal_stage_id
                    }
                />
            </ContentWrapper>
            <ContentWrapper className="mb-3">
                <CustomDropDown
                    isRequired
                    label="3. CMS"
                    isSearchBoxUse
                    filedName="project_cms_id"
                    placeholder="Select CMS"
                    data={cmsData}
                    errorText="CMS is required"
                    isFullDropDownLoading={isCMSLoading}
                    setSelected={handleInputChange}
                    selected={priceQuotationsInputs?.project_cms_id}
                    isError={
                        priceQuotationsInputsValidation?.is_submitting &&
                        priceQuotationsInputsValidation?.project_cms_id
                    }
                />
                <CustomDropDown
                    data={projectNichesData}
                    isRequired
                    label="4. Category"
                    filedName="project_niche_id"
                    placeholder="Select Category"
                    errorText="Category is required"
                    isSearchBoxUse
                    setSelected={handleInputChange}
                    isFullDropDownLoading={isProjectNichesLoading}
                    selected={priceQuotationsInputs?.project_niche_id}
                    isError={
                        priceQuotationsInputsValidation?.is_submitting &&
                        priceQuotationsInputsValidation?.project_niche_id
                    }
                />
            </ContentWrapper>
            <ContentWrapper className="mb-3">
                <CustomInput
                    isRequired
                    type="number"
                    fieldName="no_of_primary_pages"
                    onChange={handleInputChange}
                    errorText="Primary pages is required"
                    label="5. Number of primary pages required"
                    value={priceQuotationsInputs?.no_of_primary_pages}
                    placeholder="Enter Number of Primary Pages"
                    isError={
                        priceQuotationsInputsValidation?.is_submitting &&
                        priceQuotationsInputsValidation["no_of_primary_pages"]
                    }
                />
                <CustomInput
                    isRequired
                    type="number"
                    fieldName="no_of_secondary_pages"
                    onChange={handleInputChange}
                    errorText="Secondary pages is required"
                    label="6. Number of secondary pages required"
                    value={priceQuotationsInputs?.no_of_secondary_pages}
                    placeholder="Enter Number of Secondary Pages"
                    isError={
                        priceQuotationsInputsValidation?.is_submitting &&
                        priceQuotationsInputsValidation["no_of_secondary_pages"]
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
                                fieldName="no_of_major_functionalities"
                                errorText="Number of Functionalities Required"
                                label="i. Number of Functionalities Requirements"
                                value={
                                    priceQuotationsInputs?.no_of_major_functionalities
                                }
                                placeholder="Enter Number of Functionalities"
                                isError={
                                    priceQuotationsInputsValidation?.is_submitting &&
                                    priceQuotationsInputsValidation?.no_of_major_functionalities
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
                        fieldName="risk_factor"
                        onChange={handleInputChange}
                        value={priceQuotationsInputs?.risk_factor}
                        label="9. Is there any risk factors involved? "
                    />
                    <Switch>
                        <Switch.Case
                            condition={
                                priceQuotationsInputs?.risk_factor === "Yes"
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
                    filedName={"currency_id"}
                    placeholder="Select a Currency"
                    setSelected={handleInputChange}
                    data={currenciesData}
                    isSearchBoxUse
                    errorText="Client Currency is required"
                    isFullDropDownLoading={isCurrenciesLoading}
                    selected={priceQuotationsInputs?.currency_id}
                    isError={
                        priceQuotationsInputsValidation?.is_submitting &&
                        priceQuotationsInputsValidation?.currency_id
                    }
                />
            </ContentWrapper>
            <ContentWrapper className="mb-3">
                <div className="d-flex flex-column">
                    <CustomDropDown
                        data={deadline}
                        isRequired={true}
                        filedName="deadline_type"
                        label="11. Deadline"
                        placeholder="Select Deadline"
                        setSelected={handleInputChange}
                        errorText="Deadline is required"
                        selected={priceQuotationsInputs?.deadline_type}
                        isError={
                            priceQuotationsInputsValidation?.is_submitting &&
                            priceQuotationsInputsValidation?.deadline_type
                        }
                    />
                    <Switch>
                        <Switch.Case
                            condition={
                                priceQuotationsInputs?.deadline_type?.value ===
                                "fixed"
                            }
                        >
                            <CustomInput
                                isChild
                                type="number"
                                label="i. Number of days required"
                                fieldName="no_of_days"
                                onChange={handleInputChange}
                                errorText="Number of days required"
                                value={priceQuotationsInputs?.no_of_days}
                                isError={
                                    priceQuotationsInputsValidation?.is_submitting &&
                                    priceQuotationsInputsValidation?.no_of_days
                                }
                            />
                        </Switch.Case>
                    </Switch>
                </div>
                <CustomDropDown
                    isRequired={true}
                    filedName="platform_account_id"
                    label="12. Freelancer account"
                    data={accountsData?.filter(
                        (account) => account?.status === 1
                    )}
                    setSelected={handleInputChange}
                    placeholder="Select Freelancer Account"
                    errorText="Freelancer Account is required"
                    isFullDropDownLoading={isAccountsLoading}
                    selected={priceQuotationsInputs?.platform_account_id}
                    isError={
                        priceQuotationsInputsValidation?.is_submitting &&
                        priceQuotationsInputsValidation?.platform_account_id
                    }
                />
            </ContentWrapper>
        </React.Fragment>
    );
};

export default SubmitPriceQuotation;

SubmitPriceQuotation.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    isDealStagePage: PropTypes.bool.isRequired,
    priceQuotationsInputs: PropTypes.object.isRequired,
    setPriceQuotationsInputs: PropTypes.func.isRequired,
    extraInfoInputsValidation: PropTypes.object.isRequired,
    setExtraInfoInputsValidation: PropTypes.func.isRequired,
    priceQuotationsInputsValidation: PropTypes.object.isRequired,
};
