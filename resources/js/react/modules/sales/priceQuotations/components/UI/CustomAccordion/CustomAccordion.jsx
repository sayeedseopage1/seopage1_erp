import * as React from "react";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

// style
import "./CustomAccordion.css";

// Components - UI
import CustomLabel from "../CustomLabel/CustomLabel";

const CustomAccordion = ({
    label,
    value,
    isError,
    onChange,
    children,
    fieldName,
    errorText,
    isRequired,
    placeholder,
    headingClass,
    expendable = true,
    headingStyle,
    accordionData,
}) => {
    const [expend, setExpend] = React.useState(false);
    const [active, setActive] = React.useState(value);
    const toggle = () => {
        setExpend(!expend);
    };

    const init = expendable ? 0 : 230;

    const handleTernary = () => {
        if (!expendable) {
            return null;
        }

        if (expend) {
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
    };

    return (
        <div className="d-flex flex-column">
            <CustomLabel
                label={label}
                fieldName="fieldName"
                isRequired={isRequired}
                className="mb-3 d-inline"
            />
            <div
                id={fieldName}
                className="sp1_task_card customAccordionWrapper"
            >
                <button
                    className={`sp1_task_card--head customAccordionCardHead ${
                        expend ? "" : "customAccordionCardHeadInactive"
                    } ${headingClass}`}
                    onClick={() => (expendable ? toggle() : null)}
                    style={{
                        ...headingStyle,
                        cursor: expendable ? "pointer" : "default",
                    }}
                    onKeyDown={() => (expendable ? toggle() : null)}
                   
                >
                    <div
                        className={`d-flex justify-content-between align-items-center w-100 ${
                            expend ? "activeBorderHeading" : ""
                        }`}
                    >
                        {" "}
                        {!_.isEmpty(active) ? active?.name : placeholder}
                        {handleTernary()}
                    </div>
                </button>
                <AnimatePresence>
                    {expendable ? (
                        expend && (
                            <motion.div
                                initial={{ height: init }}
                                animate={{ height: "auto",  maxHeight: "230px" }}
                                exit={{ height: 0 }}
                                className="sp1_task_card--body customAccordionCardBody"
                            >
                                <ul className="customAccordionCardBodyUL">
                                    {accordionData.map((item, index) => (
                                        <li
                                            key={item.id}
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
                                            <button
                                                onClick={() => {
                                                    setActive(item);
                                                    onChange(item);
                                                    toggle();
                                                }}
                                            >
                                                {item.name}
                                            </button>
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
            {isError && 
                <span
                    style={{ color: "red", fontSize: "14px", marginTop: "8px" }}
                >
                    {errorText}
                </span>
            }
        </div>
    );
};

export default CustomAccordion;

CustomAccordion.propTypes = {
    label: PropTypes.string,
    value: PropTypes.object,
    isError: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node,
    expendable: PropTypes.bool,
    fieldName: PropTypes.string,
    errorText: PropTypes.string,
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    headingClass: PropTypes.string,
    headingStyle: PropTypes.object,
    accordionData: PropTypes.array,
};
