import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

//  Components - UI- Custom
import CustomDropDown from "../UI/CustomDropDown/CustomDropDown";
import CustomInput from "../UI/CustomInput/CustomInput";

//  Components - Global
import Switch from "../../../../../global/Switch";

//  Constants
import { PriceQuotationsDataInputOptions } from "../../constant";
import _ from "lodash";

const ExtraWorksInputsContainer = ({
    extraHandler,
    handleInputChange,
    priceQuotationsInputs,
    extraInfoInputsValidation,
    setExtraInfoInputsValidation,
    priceQuotationsInputsValidation,
}) => {
    let errorData = {
        status: false,
        title: "",
    };
    const { subCategory } = PriceQuotationsDataInputOptions;
    const { other_works_data, other_works } = priceQuotationsInputs;
    const isExtraDataExist = (data, type) => {
        return data?.find((item) => item?.parent?.name?.toLowerCase() === type);
    };

    const removeSpeedOptimization = other_works?.filter(
        (item) => item.name !== "Speed Optimization"
    );

    const checkIsExtraDataAddedOrNot = React.useCallback(() => {
        if (removeSpeedOptimization?.length === other_works_data?.length) {
            return false;
        } else {
            errorData.status = true;
            errorData.title = generateErrorTitle();
            return true;
        }
    }, [priceQuotationsInputs]);

    const generateErrorTitle = () => {
        const notExist = removeSpeedOptimization?.filter(
            (item) =>
                !other_works_data?.find(
                    (data) => data.parent?.name === item.name
                )
        );
        const type = notExist[0]?.name?.toLowerCase();
        switch (type) {
            case "content writing":
                return "Please add number of words first, then add new other works";
            case "logo creation":
                return "Please add number of logo first, then add new other works";
            case "ui design":
                return "Please add number of pages first, then add new other works";
            case "other":
                return "Please add number of hours first, then add new other works";
            default:
                return "";
        }
    };

    // Extra Data Validation
    const extraDataValidation = (value, message) => {
        if (extraInfoInputsValidation.is_submitting) {
            if (value) {
                setExtraInfoInputsValidation((prev) => {
                    return {
                        ...prev,
                        isError: false,
                        errorText: "",
                    };
                });
            } else {
                setExtraInfoInputsValidation((prev) => {
                    return {
                        ...prev,
                        isError: true,
                        errorText: message,
                    };
                });
            }
        }
    };

    // Extra Handler
    const handleExtraHandler = (e, type, fieldName, data) => {
        extraHandler(
            e,
            type,
            fieldName,
            priceQuotationsInputs?.other_works[
                priceQuotationsInputs?.other_works?.length - 1
            ]
        );
    };

    // Check Last Work Without Extra Data
    const isLastWorkWithoutExtraData = (value) => {
        const lastWork = _.toLower(_.last(priceQuotationsInputs?.other_works)?.name) === value;
        const hasNoExtraData = !isExtraDataExist(
            priceQuotationsInputs?.other_works_data,
            value
        );
        return lastWork && hasNoExtraData;
    };

    return (
        <div className="d-flex flex-column">
            <Switch>
                <CustomDropDown
                    label="8. How many hours of other works needed ?"
                    placeholder="Select Works Needed"
                    data={subCategory}
                    isDisableUse={checkIsExtraDataAddedOrNot()}
                    filedName={"other_works"}
                    selected={priceQuotationsInputs?.other_works}
                    setSelected={handleInputChange}
                    isMultiple
                    errorText={"Please fill the required fields first"}
                    isError={priceQuotationsInputsValidation.is_submitting && priceQuotationsInputsValidation?.other_works}
                    disabledTitle={errorData?.title}
                />
                <Switch.Case
                    condition={isLastWorkWithoutExtraData("content writing")}
                >
                    <CustomInput
                        label="i. Number of words required"
                        fieldName="number_of_words"
                        isChild
                        type="extra"
                        onClick={(e) =>
                            handleExtraHandler(e, "words", "number_of_words")
                        }
                        onChange={(e) =>
                            extraDataValidation(
                                e.target.value,
                                "Number of words is required"
                            )
                        }
                        isError={extraInfoInputsValidation?.isError}
                        errorText={extraInfoInputsValidation?.errorText}
                    />
                </Switch.Case>
                <Switch.Case
                    condition={isLastWorkWithoutExtraData("logo creation")}
                >
                    <CustomInput
                        label="i. Number of  logo required"
                        fieldName="number_of_logo"
                        isChild
                        type="extra"
                        onClick={(e) =>
                            handleExtraHandler(e, "logo", "number_of_logo")
                        }
                        onChange={(e) =>
                            extraDataValidation(
                                e.target.value,
                                "Number of logo is required"
                            )
                        }
                        isError={extraInfoInputsValidation?.isError}
                        errorText={extraInfoInputsValidation?.errorText}
                    />
                </Switch.Case>
                <Switch.Case
                    condition={isLastWorkWithoutExtraData("ui design")}
                >
                    <CustomInput
                        label="i. Number of  pages required"
                        fieldName="number_of_pages"
                        isChild
                        type="extra"
                        onClick={(e) =>
                            handleExtraHandler(e, "pages", "number_of_pages")
                        }
                        onChange={(e) =>
                            extraDataValidation(
                                e.target.value,
                                "Number of pages is required"
                            )
                        }
                        isError={extraInfoInputsValidation?.isError}
                        errorText={extraInfoInputsValidation?.errorText}
                    />
                </Switch.Case>
                <Switch.Case condition={isLastWorkWithoutExtraData("other")}>
                    <CustomInput
                        label="i. Number of  hours required"
                        fieldName="number_of_hours"
                        isChild
                        type="extra"
                        onClick={(e) =>
                            handleExtraHandler(e, "hours", "number_of_hours")
                        }
                        onChange={(e) =>
                            extraDataValidation(
                                e.target.value,
                                "Number of hours is required"
                            )
                        }
                        isError={extraInfoInputsValidation?.isError}
                        errorText={extraInfoInputsValidation?.errorText}
                    />
                </Switch.Case>
                <Switch.Case
                    condition={priceQuotationsInputs?.other_works_data?.length}
                >
                    <ul className="extra_other_works_container mt-3">
                        {priceQuotationsInputs?.other_works_data?.map(
                            (data) => (
                                <li key={data.id}>
                                    <Checkbox checked={data.status} />{" "}
                                    <p>{data?.title}</p>
                                </li>
                            )
                        )}
                    </ul>
                </Switch.Case>
            </Switch>
        </div>
    );
};

export default ExtraWorksInputsContainer;

ExtraWorksInputsContainer.propTypes = {
    priceQuotationsInputs: PropTypes.object,
    handleInputChange: PropTypes.func,
    priceQuotationsInputsValidation: PropTypes.object,
    extraHandler: PropTypes.func,
    isError: PropTypes.bool,
    errorText: PropTypes.string,
    setExtraInfoInputsValidation: PropTypes.func,
    extraInfoInputsValidation: PropTypes.object,
};
