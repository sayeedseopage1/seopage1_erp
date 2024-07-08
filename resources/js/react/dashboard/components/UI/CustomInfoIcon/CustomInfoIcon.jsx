import React from "react";
import PropTypes from "prop-types";
import { Popover } from "antd";


//style
import style from "./customInfoIcon.module.css";

// icons
import { HiOutlineInformationCircle } from "react-icons/hi2";


const defaultInfo = {
    infoIcon: HiOutlineInformationCircle,
    content: "",
    trigger: "hover", // hover, click, focus, contextMenu
};

const CustomInfoIcon = ({ info = defaultInfo, className="" }) => {
    // info icon
    const InfoIcon = info?.infoIcon || defaultInfo.infoIcon;
    return (
        <Popover content={info.content} trigger={info.trigger}>
            <span className={`${style.sp1_dashboard_info_icon_wrapper} ${className}`}>
                <InfoIcon />
            </span>
        </Popover>
    );
};

export default CustomInfoIcon;

CustomInfoIcon.propTypes = {
    info: PropTypes.shape({
        title: PropTypes.string,
        infoIcon: PropTypes.elementType,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        trigger: PropTypes.string,
    }),
    className: PropTypes.string,
};
