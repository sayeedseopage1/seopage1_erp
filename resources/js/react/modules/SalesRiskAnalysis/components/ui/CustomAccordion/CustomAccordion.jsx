import * as React from "react";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

// style
import "./CustomAccordion.css";

// local styled ui components
import { CustomInputsLabel } from "../Styles/ui";

// ui components
import Tooltip from "../../Tooltip";

const CustomAccordion = ({
    expendable = true,
    children,
    label,
    accordionData,
    headingClass,
    headingStyle,
    isChild,
    onChange,
    value,
    isSubmitting,
    comment,
    placeholder
}) => {
    const [expend, setExpend] = React.useState(false);
    const [active, setActive] = React.useState({});
    const toggle = () => {
        setExpend(!expend);
    };

    const init = expendable ? 0 : 300;

    const getAlphabeticIndex = (index) => {
        return String.fromCharCode(65 + index); // Convert index to alphabetic character
    };


    const handleTernary = () => {

        if(!expendable) { 
            return null;
        }

        if(expend) {
            return (
                <span className="__icon customAccordion__Icon">
                    <i className="fa-solid fa-chevron-up"></i>
                </span>
            );
        } else {
            return (
                <span className="__icon customAccordion__Icon">
                    <i className="fa-solid fa-chevron-down"></i>
                </span>
            );
        }
    }

    return (
        <div className="d-flex flex-column">
            <CustomInputsLabel
                className="mb-2"
                color={isChild ? "#b1b1b1" : "#000000"}
            >
                {label}{" "}
                {comment && (
                    <span className="ml-2">
                        <Tooltip text={comment}>
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
            <div className="sp1_task_card customAccordionWrapper mb-3">
                <div
                    className={`sp1_task_card--head customAccordionCardHead ${
                        expend ? "" : "customAccordionCardHeadInactive"
                    } ${headingClass}`}
                    onClick={() => (expendable ? toggle() : null)}
                    style={{
                        ...headingStyle,
                        cursor: expendable ? "pointer" : "default",
                    }}
                    onKeyDown={() => (expendable ? toggle() : null)}
                    role="button"
                    tabIndex={0}
                    
                >
                    <div
                        className={`d-flex justify-content-between align-items-center w-100 ${
                            expend ? "activeBorderHeading" : ""
                        }`}
                    >
                        {" "}
                        {!_.isEmpty(active) ? active?.title : placeholder}
                        {handleTernary()}
                    </div>
                </div>

                <AnimatePresence>
                    {expendable ? (
                        expend && (
                            <motion.div
                                initial={{ height: init }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                className="sp1_task_card--body customAccordionCardBody"
                            >
                                <ul className="customAccordionCardBodyUL">
                                    {accordionData.map((item, index) => (
                                        <li
                                            key={item.id}
                                            onClick={() => {
                                                setActive(item);
                                                onChange(item);
                                                toggle();
                                            }}
                                            className={`${
                                                index !==
                                                accordionData.length - 1
                                                    ? "activeBorder"
                                                    : ""
                                            } ${
                                                item.id === active?.id
                                                    ? "activeItem"
                                                    : ""
                                            }`}
                                        >
                                            {`${getAlphabeticIndex(index)}. ${
                                                item.title
                                            }`}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )
                    ) : (
                        <div className="sp1_task_card--body">{children}</div>
                    )}
                </AnimatePresence>
            </div>
            {isSubmitting && !value && (
                <span
                    style={{ color: "red", fontSize: "14px", marginTop: "8px" }}
                >
                    Please select an option
                </span>
            )}
        </div>
    );
};

export default CustomAccordion;



CustomAccordion.propTypes = {
    expendable: PropTypes.bool,
    children: PropTypes.node,
    label: PropTypes.string,
    accordionData: PropTypes.array,
    headingClass: PropTypes.string,
    headingStyle: PropTypes.object,
    isChild: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    isSubmitting: PropTypes.bool,
    comment: PropTypes.string,
    placeholder: PropTypes.string

}