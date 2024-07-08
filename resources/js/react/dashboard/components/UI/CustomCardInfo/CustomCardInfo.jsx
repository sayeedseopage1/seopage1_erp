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
        isColorChange: false,
        colors: {
            positive: "var(--primaryBlue)",
            negative: "var(--primaryDanger)",
        },
        info: {
            content: "",
            trigger: "hover",
        },
        isModalOpen: false,
        onClick: () => {},
        loadingValueWidth: "80%",
    },
};

const CustomCardInfo = ({
    cardData = defaultProps?.cardData,
    isLoading,
    className = "",
}) => {
    const {
        info,
        value,
        title,
        colors,
        onClick,
        subTitle,
        isModalOpen,
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
        >
            <Switch>
                <Switch.Case condition={title}>
                    <p className={`${style.sp1_dashboard_card_info_title}`}>
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
                <button
                    className={`${style.sp1_dashboard_card_info_value}`}
                    style={{
                        color: isChangeValueColor(),
                    }}
                    onClick={() => isModalOpen && onClick(cardData)}
                >
                    <Switch.Case condition={isLoading}>
                        <Placeholder width={loadingValueWidth} height={16} />
                    </Switch.Case>
                    <Switch.Case condition={!isLoading}>{value}</Switch.Case>
                </button>
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
