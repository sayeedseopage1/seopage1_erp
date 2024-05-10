import React from "react";
import PropTypes from "prop-types";
import { BsInfoCircle } from "react-icons/bs";

// Components - custom
import { CardTitle } from "../styledComponents";
import Switch from "../../../../global/Switch";
import Popover from "../../Popover";

import style from "../../popover.module.css";

const DashboardCardTitle = ({
    title,
    isBorderUse = false,
    borderType = "solid",
    isInfoIconUse = false,
    infoText,
    rightText,
    rightTextColor,
    className
}) => {

    return (
        <CardTitle
            border={isBorderUse ? `1px ${borderType} #D8D8D8` : "none"}
            className={`d-flex justify-content-between align-items-center ${className}`}
        >
            <p>
                {title}{" "}
                <Switch>
                    <Switch.Case condition={isInfoIconUse}>
                        <Popover className="d-inline">
                            <Popover.Button className="infoPopoverButton d-inline">
                                <div className="d-inline">
                                    <BsInfoCircle />
                                </div>
                            </Popover.Button>
                            <Popover.Panel placement="bottom-start">
                                <div className={`${style.infoPopoverPanel}`}>
                                    <p>{infoText}</p>
                                </div>
                            </Popover.Panel>
                        </Popover>
                    </Switch.Case>
                </Switch>
            </p>

            {rightText && (
                <span
                    style={{
                        color: rightTextColor,
                    }}
                >
                    {rightText}
                </span>
            )}
        </CardTitle>
    );
};

export default DashboardCardTitle;

DashboardCardTitle.propTypes = {
    title: PropTypes.string.isRequired,
    isBorderUse: PropTypes.bool,
    rightText: PropTypes.string,
    rightTextColor: PropTypes.string,
    isInfoIconUse: PropTypes.bool,
    infoText: PropTypes.string,
    className: PropTypes.string,
};
