import React from "react";
import PropTypes from "prop-types";

//style
import style from "./customCardInfo.module.css";

// Components - Logic - Global
import Switch from "../../../../global/Switch";

// Components - UI - Global
import { Placeholder } from "../../../../global/Placeholder";

// Components - UI - Custom
import CustomInfoIcon from "../CustomInfoIcon/CustomInfoIcon";

const defaultProps = {
    cardData: {
        title: "",
        subTitle: "",
        value: "",
        valueTypeAfter: "",
        valueTypeBefore: "",
        isColorChange: false,
        colors: {
            positive: "var(--primaryBlue)",
            negative: "var(--primaryDanger)",
        },
        info: {
            content: "",
            trigger: "hover",
        },
        hasPermissionForModal: false,
        onClick: () => {},
        loadingValueWidth: "80%",
    },
};

const CustomCardInfo = ({
    cardData = defaultProps?.cardData,
    isLoading,
    className = "",
    ...props
}) => {
    const {
        info,
        value,
        valueTypeBefore,
        valueTypeAfter,
        title,
        onClick,
        subTitle,
        hasPermissionForModal,
        isColorChange,
        loadingValueWidth,
    } = cardData;

    const isChangeValueColor = () => {
        if (value > 0 && isColorChange) {
            return "var(--primaryBlue)";
        } else if (value < 0 && isColorChange) {
            return "var(--primaryDanger)";
        } else {
            return "var(--primaryBlue)";
        }
    };

    return (
        <div
            className={`${style.sp1_dashboard_card_info_wrapper} ${className}`}
            {...props}
        >
            <Switch>
                <Switch.Case condition={title}>
                    <p
                        className={`${style.sp1_dashboard_card_info_title} mt-2`}
                    >
                        {title}
                        <Switch.Case condition={subTitle}>
                            <span
                                className={`${style.sp1_dashboard_card_info_title_text} mx-1`}
                            >
                                {subTitle}
                            </span>
                        </Switch.Case>
                        <Switch.Case condition={info?.content}>
                            <CustomInfoIcon
                                info={{
                                    ...info,
                                    title,
                                }}
                                className={`${subTitle ? "" : "ml-1"}`}
                            />
                        </Switch.Case>
                    </p>
                </Switch.Case>

                <Switch.Case condition={isLoading}>
                    <Placeholder
                        width={loadingValueWidth}
                        height={25}
                        className="mt-2"
                    />
                </Switch.Case>
                <Switch.Case condition={!isLoading}>
                    <button
                        className={`${style.sp1_dashboard_card_info_value}`}
                        style={{
                            color: isChangeValueColor(),
                        }}
                        onClick={() =>
                            hasPermissionForModal && onClick(cardData)
                        }
                    >
                        {valueTypeBefore}
                        {value}{"  "}
                        {valueTypeAfter}
                    </button>
                </Switch.Case>
            </Switch>
        </div>
    );
};

export default CustomCardInfo;

CustomCardInfo.propTypes = {
    cardData: PropTypes.shape({
        title: PropTypes.string,
        subTitle: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isColorChange: PropTypes.bool,
        colors: PropTypes.shape({
            positive: PropTypes.string,
            negative: PropTypes.string,
        }),
        info: PropTypes.shape({
            infoIcon: PropTypes.elementType,
            content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
            trigger: PropTypes.string,
        }),
        isModalOpen: PropTypes.bool,
        onClick: PropTypes.func,
        loadingValueWidth: PropTypes.string,
    }),
    isLoading: PropTypes.bool,
    className: PropTypes.string,
};
