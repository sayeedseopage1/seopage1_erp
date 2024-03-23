import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CustomAccordion.css";
import _ from "lodash";
import { CustomInputsLabel } from "../Styles/ui";

const dummyData = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 4, name: "Alice" },
];

const CustomAccordion = ({
    expendable = true,
    children,
    label,
    accordionData,
    headingClass,
    headingStyle,
}) => {
    const [expend, setExpend] = React.useState(false);
    const [active, setActive] = React.useState({});
    const toggle = () => {
        setExpend(!expend);
    };

    const init = expendable ? 0 : 300;
    return (
        <div className="d-flex flex-column">
            <CustomInputsLabel className="mb-2">
                {label}
            </CustomInputsLabel>
            <div className="sp1_task_card mb-4 customAccordionWrapper">
                <div
                    className={`sp1_task_card--head customAccordionCardHead ${
                        expend
                            ? ""
                            : "customAccordionCardHeadInactive"
                    } ${headingClass}`}
                    onClick={() => (expendable ? toggle() : null)}
                    style={{
                        ...headingStyle,
                        cursor: expendable ? "pointer" : "default",
                    }}
                >
                    <div
                        className={`d-flex justify-content-between align-items-center w-100 ${
                            expend ? "activeBorderHeading" : ""
                        }`}
                    >
                        {" "}
                        {!_.isEmpty(active) ? active?.name : "Testing"}
                        {expendable ? (
                            expend ? (
                                <span className="__icon customAccordion__Icon">
                                    <i className="fa-solid fa-chevron-up"></i>
                                </span>
                            ) : (
                                <span className="__icon customAccordion__Icon">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </span>
                            )
                        ) : null}
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
                                                toggle();
                                            }}
                                            className={`${
                                                index !== accordionData.length - 1
                                                    ? "activeBorder"
                                                    : ""
                                            } ${
                                                item.id === active?.id
                                                    ? "activeItem"
                                                    : ""
                                            }`}
                                        >
                                            {item.name}
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
        </div>
    );
};

export default CustomAccordion;
