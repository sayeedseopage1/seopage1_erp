import React, { useEffect } from "react";
import PropTypes from "prop-types";

// ui components
import Dropdown from "./Dropdown";
import Tooltip from "./Tooltip";

// style
import style from "./listDropDown.module.css";

const ListDropDown = ({
    data,
    selected,
    setSelected,
    sidebarItem = false,
    className,
    filedName,
    register,
}) => {
    const [open, setOpen] = React.useState(false);
    // set selected value from data (because this dropdown reused in multiple places with different data)
    const _Options = data?.data;
    const startCase = _.startCase(selected?.label);

    useEffect(() => {
        // Check if dropdown is open
        if (open) {
            const element = document.getElementById(
                "cnx_dropdown__menu_open--questionList"
            );

            if (element) {
                
                const transformValue = element.style.transform;

                const translateRegex = /translate\((.*?)\)/;

                if (translateRegex.test(transformValue)) {
                    const matches = transformValue.match(translateRegex);
                    if (matches && matches.length > 1) {
                        const translateValues = matches[1].split(",");
                        if (translateValues.length >= 2) {
                            const translateY =
                                parseFloat(translateValues[1]) + 30;

                            const newTransformValue = transformValue.replace(
                                translateRegex,
                                `translate(${translateValues[0]}, ${translateY}px)`
                            );

                            console.log("newTransformValue", newTransformValue);
                            element.style.transform = newTransformValue;
                        }
                    }
                }
            }
        }
    }, [open]);

    return (
        <div
            className={`${style.listDropdownContainer} ${
                sidebarItem
                    ? `d-flex flex-column w-100 mt-2`
                    : "d-flex align-items-center"
            } ${className}`}
        >
            <Dropdown register className={`w-100 ${style?.listDropdown}`}>
                <div
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    <Dropdown.Toggle
                        className={
                            sidebarItem
                                ? "sp1__pp_filter_dd_toggle py-2 px-2 border w-100"
                                : "sp1__pp_filter_dd_toggle w-100 mw-100 cnx_dropdown__dd__toggle"
                        }
                    >
                        <Tooltip
                            text={startCase}
                            key="select-department-sal-risk"
                        >
                            <span
                                data-toggle={"tooltip"}
                                id="select-department-sal-risk"
                            >
                                {selected?.label ? (
                                    <span>
                                        {startCase?.replace(
                                            /\b(Yes No)\b/g,
                                            "Yes/No"
                                        )}
                                    </span>
                                ) : (
                                    data?.emptyOptionsLabel
                                )}
                            </span>
                        </Tooltip>
                    </Dropdown.Toggle>
                </div>
                <Dropdown.Menu
                    className={style?.listDropdownMenu}
                    id="cnx_dropdown__menu_open--questionList"
                >
                    <div className="sp1_filter--users">
                        {_Options?.map((item) => (
                            <Dropdown.Item
                                key={item.id}
                                className={
                                    selected?.id === item.id
                                        ? "sp1__pp_filter_dd_item active"
                                        : "sp1__pp_filter_dd_item"
                                }
                                onClick={(e) => {
                                    setSelected({
                                        target: {
                                            name: filedName,
                                            value: item,
                                        },
                                    });
                                }}
                            >
                                {item?.label}
                            </Dropdown.Item>
                        ))}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default ListDropDown;

ListDropDown.propTypes = {
    data: PropTypes.object,
    selected: PropTypes.object,
    setSelected: PropTypes.func,
    sidebarItem: PropTypes.bool,
    className: PropTypes.string,
    filedName: PropTypes.string,
    register: PropTypes.bool,
};
