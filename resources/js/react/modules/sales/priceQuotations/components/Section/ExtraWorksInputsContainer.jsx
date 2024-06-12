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
import { useDispatch, useSelector } from "react-redux";
import { updateOtherWorkError } from "../../../../../services/features/priceQuotationsSlice";

const ExtraWorksInputsContainer = ({
    priceQuotationsInputs,
    handleInputChange,
    priceQuotationsInputsValidation,
    extraHandler,
    isError,
    errorText,
}) => {
    const { subCategory } = PriceQuotationsDataInputOptions;
    const isExtraDataExist = (data, type) => {
        return data?.find((item) => item?.parent?.name?.toLowerCase() === type);
    };
    const { other_works_data, other_works } = priceQuotationsInputs;
    const removeSpeedOptimization = other_works?.filter(
        (item) => item.name !== "Speed Optimization"
    );

    const checkIsExtraDataAddedOrNot = React.useCallback(() => {
       
        if (removeSpeedOptimization?.length === other_works_data?.length) {
            return false;
        } else {
            return  true;
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

    return (
        <div className="d-flex flex-column">
            <Switch>
                <CustomDropDown
                    label="6. How many hours of other works needed ?"
                    placeholder="Select Works Needed"
                    data={subCategory}
                    isRequired
                    isDisableUse={checkIsExtraDataAddedOrNot()}
                    filedName={"other_works"}
                    selected={priceQuotationsInputs?.other_works}
                    setSelected={handleInputChange}
                    isError={
                        priceQuotationsInputsValidation?.is_submitting &&
                        priceQuotationsInputsValidation?.other_works
                    }
                    errorText="Other works needed is required"
                    isMultiple
                    disabledTitle={checkIsExtraDataAddedOrNot() && generateErrorTitle()}
                />
                <Switch.Case
                    condition={
                        priceQuotationsInputs?.other_works[
                            priceQuotationsInputs?.other_works?.length - 1
                        ]?.name
                            ?.toLowerCase()
                            .includes("content writing") &&
                        !isExtraDataExist(
                            priceQuotationsInputs?.other_works_data,
                            "content writing"
                        )
                    }
                >
                    <CustomInput
                        label="i. Number of words required"
                        fieldName="number_of_words"
                        isChild
                        type="extra"
                        onClick={(e) =>
                            extraHandler(
                                e,
                                "words",
                                "number_of_words",
                                priceQuotationsInputs?.other_works[
                                    priceQuotationsInputs?.other_works?.length -
                                        1
                                ]
                            )
                        }
                        isError={isError}
                        errorText={errorText}
                    />
                </Switch.Case>
                <Switch.Case
                    condition={
                        priceQuotationsInputs?.other_works[
                            priceQuotationsInputs?.other_works?.length - 1
                        ]?.name
                            ?.toLowerCase()
                            .includes("logo creation") &&
                        !isExtraDataExist(
                            priceQuotationsInputs?.other_works_data,
                            "logo creation"
                        )
                    }
                >
                    <CustomInput
                        label="i. Number of  logo required"
                        fieldName="number_of_logo"
                        isChild
                        type="extra"
                        onClick={(e) =>
                            extraHandler(
                                e,
                                "logo",
                                "number_of_logo",
                                priceQuotationsInputs?.other_works[
                                    priceQuotationsInputs?.other_works?.length -
                                        1
                                ]
                            )
                        }
                        isError={isError}
                        errorText={errorText}
                    />
                </Switch.Case>
                <Switch.Case
                    condition={
                        priceQuotationsInputs?.other_works[
                            priceQuotationsInputs?.other_works?.length - 1
                        ]?.value === "ui_design" &&
                        !isExtraDataExist(
                            priceQuotationsInputs?.other_works_data,
                            "ui design"
                        )
                    }
                >
                    <CustomInput
                        label="i. Number of  pages required"
                        fieldName="number_of_pages"
                        isChild
                        type="extra"
                        onClick={(e) =>
                            extraHandler(
                                e,
                                "pages",
                                "number_of_pages",
                                priceQuotationsInputs?.other_works[
                                    priceQuotationsInputs?.other_works?.length -
                                        1
                                ]
                            )
                        }
                        isError={isError}
                        errorText={errorText}
                    />
                </Switch.Case>
                <Switch.Case
                    condition={
                        priceQuotationsInputs?.other_works[
                            priceQuotationsInputs?.other_works?.length - 1
                        ]?.value === "other" &&
                        !isExtraDataExist(
                            priceQuotationsInputs?.other_works_data,
                            "other"
                        )
                    }
                >
                    <CustomInput
                        label="i. Number of  hours required"
                        fieldName="number_of_hours"
                        isChild
                        type="extra"
                        onClick={(e) =>
                            extraHandler(
                                e,
                                "other",
                                "number_of_hours",
                                priceQuotationsInputs?.other_works[
                                    priceQuotationsInputs?.other_works?.length -
                                        1
                                ]
                            )
                        }
                        isError={isError}
                        errorText={errorText}
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
};
