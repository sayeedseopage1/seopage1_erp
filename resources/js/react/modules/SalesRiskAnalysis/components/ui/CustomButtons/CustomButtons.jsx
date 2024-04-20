import PropTypes from "prop-types";

// ui components
import Tooltip from "../../Tooltip";
import { CustomInputsLabel } from "../Styles/ui";
import style from "./customButtons.module.css";

const CustomButtons = ({
    label,
    value,
    onChange,
    error,
    type,
    placeholder,
    name,
    disabled,
    readOnly,
    isChild,
    required,
    className,
    id,
    isSubmitting,
    isCurrencyHave,
    ...props
}) => {
    const { currency } = isCurrencyHave;
    const getCurrencySymbol = () => {
        if (currency?.length) {
            return `${currency[2]} ${currency[0]}`;
        }
    };
    return (
        <div className="d-flex flex-column mb-4">
            {label && (
                <CustomInputsLabel color={isChild ? "#b1b1b1" : "#000000"}>
                    {label}{" "}
                    {isCurrencyHave.status && (
                        <span
                            className="ml-2"
                            style={{
                                color: "#000000",
                                backgroundColor: "#c4de95",
                                padding: "2px 12px",
                                borderRadius: "4px",
                                fontSize: "14px",
                                alignItems: "center",
                                display: "flex",
                            }}
                        >
                            Currency in {getCurrencySymbol()}
                        </span>
                    )}
                    {props?.comment && (
                        <span className="ml-2">
                            <Tooltip text={props?.comment}>
                                {" "}
                                <i
                                    className="fa-solid fa-circle-info "
                                    style={{
                                        color: "#8F8F8F",
                                    }}
                                ></i>
                            </Tooltip>
                        </span>
                    )}
                </CustomInputsLabel>
            )}
            <div className="d-flex">
                <button
                    className={`btn mr-3 ${style.customBtn_outline} ${
                        value === "yes"
                            ? style.customBtn_primary_active
                            : style.customBtn_primary
                    } `}
                    onClick={() => onChange("yes")}
                    value={value}
                >
                    Yes
                </button>
                <button
                    className={`btn ${style.customBtn_outline} ${
                        value === "no"
                            ? style.customBtn_secondary_active
                            : style.customBtn_secondary
                    } `}
                    onClick={() => onChange("no")}
                    value={value}
                >
                    No
                </button>
            </div>
            {isSubmitting && !value && (
                <span
                    style={{ color: "red", fontSize: "14px", marginTop: "8px" }}
                >
                    This field is required
                </span>
            )}
        </div>
    );
};

export default CustomButtons;

CustomButtons.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    isChild: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    props: PropTypes.object,
    isSubmitting: PropTypes.bool,
    comment: PropTypes.string,
    isCurrencyHave: PropTypes.object,
};
