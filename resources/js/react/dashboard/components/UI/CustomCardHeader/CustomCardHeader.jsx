import React from "react";
import PropTypes from "prop-types";


// Components - Logic - Global
import Switch from "../../../../global/Switch";

// Components - UI - Custom
import CustomInfoIcon from "../CustomInfoIcon/CustomInfoIcon";

//style 
import style from "./customCardHeader.module.css";

const CustomCardHeader = ({
    title,
    info,
    border = false,
    borderStyle = "0.1px solid var(--primaryLightBorder)",
}) => {
    return (
        <div className={`${style.sp1_dashboard_card_header_wrapper}`}>
            <Switch>
                <h6 className={`${style.sp1_dashboard_card_header}`}>
                    {title}
                    <Switch.Case condition={info?.content}>
                        <CustomInfoIcon
                            info={{
                                ...info,
                                title,
                            }}
                        />
                    </Switch.Case>
                </h6>
                <Switch.Case condition={border}>
                    <div style={{ border: borderStyle }} />
                </Switch.Case>
            </Switch>
        </div>
    );
};

export default CustomCardHeader;

CustomCardHeader.propTypes = {
    title: PropTypes.string,
    info: PropTypes.shape({
        infoIcon: PropTypes.elementType,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        trigger: PropTypes.string,
    }),
    border: PropTypes.bool,
    borderStyle: PropTypes.string,
};
