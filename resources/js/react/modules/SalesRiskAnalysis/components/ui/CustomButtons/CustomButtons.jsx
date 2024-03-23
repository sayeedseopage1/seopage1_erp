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
    required,
    className,
    id,
    ...props
}) => {
    return (
        <div className="d-flex flex-column mb-4">
            {label && <CustomInputsLabel>{label}</CustomInputsLabel>}
            <div className="d-flex">
                <button
                    className={`btn mr-3 ${style.customBtn_outline} ${style.customBtn_primary} `}
                >
                    Yes
                </button>
                <button
                    className={`btn ${style.customBtn_outline} ${style.customBtn_secondary} `}
                >
                    No
                </button>
            </div>
        </div>
    );
};

export default CustomButtons;
