import React from "react";
import PropTypes from "prop-types";

// ui components
import Dropdown from "./Dropdown";
import Tooltip from "./Tooltip";

const CustomDropDown = ({
    data,
    selected,
    setSelected,
    sidebarItem = false,
    className,
    filedName,
    isDisableUse,
}) => {
    // set selected value from data (because this dropdown reused in multiple places with different data)
    const _Options = data?.data;
    const startCase = _.startCase(selected?.label);



    return (
        <div
            className={`${
                sidebarItem
                    ? `d-flex flex-column w-100 mt-2`
                    : "d-flex align-items-center"
            } ${className}`}
        >
            <Dropdown register className="w-100">
                <Dropdown.Toggle
                    className={
                        sidebarItem
                            ? "sp1__pp_filter_dd_toggle py-2 px-2 border w-100"
                            : "sp1__pp_filter_dd_toggle w-100 mw-100 cnx_dropdown__dd__toggle"
                    }
                    disabled={isDisableUse}
                >
                    <Tooltip text={startCase} key="select-department-sal-risk">
                        <span
                            data-toggle={"tooltip"}
                            id="select-department-sal-risk"
                            className="multiline-ellipsis"
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
                <Dropdown.Menu id={`cnx_dropdown__menu_open--${data?.id}`}>
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
                                disabled={item?.disabled}
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

export default CustomDropDown;

CustomDropDown.propTypes = {
    data: PropTypes.object,
    selected: PropTypes.object,
    setSelected: PropTypes.func,
    sidebarItem: PropTypes.bool,
    className: PropTypes.string,
    filedName: PropTypes.string,
    isDisableUse: PropTypes.bool,
};
