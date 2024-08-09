import React from "react";
import PropTypes from "prop-types";
import { Popover } from "antd";

const PopoverLink = ({ url, label, className = "" }) => {
    return (
        <Popover content={label}>
            <a href={url} className={`text-primary ${className}`}>
                {label}
            </a>
        </Popover>
    );
};

export default PopoverLink;

PopoverLink.propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};
