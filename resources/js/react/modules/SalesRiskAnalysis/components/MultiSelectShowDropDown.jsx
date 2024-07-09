import React from "react";
import PropTypes from "prop-types";

// ui components
import Dropdown from "./Dropdown";
import Tooltip from "./Tooltip";

// style
import "./questionsSelect.css";

const MultiSelectShowDropDown = ({
    data,
    sidebarItem = false,
    className,
    handleEditCountryList,
    isShow,
    classNameForMenu
}) => {
    const _Options = data;
    return (
        <div
            className={`${
                sidebarItem
                    ? `d-flex flex-column w-100 mt-2`
                    : "d-flex align-items-center"
            } ${className}`}
        >
            <Dropdown register className="w-100 cnx_dropdown_show_items_sales">
                <Dropdown.Toggle
                    className={
                        sidebarItem
                            ? "sp1__pp_filter_dd_toggle py-2 px-2 border w-100"
                            : "sp1__pp_filter_dd_toggle w-100 mw-100 cnx_dropdown__dd__toggle"
                    }
                >
                    <Tooltip
                        text={_Options?.length}
                        key="select-department-sal-risk"
                    >
                        <p
                            data-toggle={"tooltip"}
                            id="select-department-sal-risk"
                        >
                            {_Options?.length}
                        </p>
                    </Tooltip>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className={`cnx_dropdown__menu_open--multiselectShow  ${classNameForMenu}`}
                    id={`cnx_dropdown__menu_open--${_Options?.id}`}
                >
                    <div className="d-flex justify-content-between countryDropdownHeader">
                        <p>Country list ({_Options?.length})</p>
                        {isShow && (
                            <button
                                onClick={handleEditCountryList}
                                className="d-flex align-items-center"
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: "transparent",
                                }}
                                onKeyDown={handleEditCountryList}
                            >
                                <i className="fa-solid fa-plus mr-2 text-primary"></i>{" "}
                                Add More
                            </button>
                        )}
                    </div>
                    {_Options.map((item) => (
                        <Dropdown.Item
                            key={item?.name}
                            className={`cnx_select_box_option`}
                            isCloseSingle={true}
                        >
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <p>
                                    <img
                                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${
                                            item.iso || "BD"
                                        }.svg`}
                                        height="25px"
                                        width="25px"
                                        className="mr-2"
                                        alt={item.name}
                                    />
                                    {item.name}
                                </p>
                            </div>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default MultiSelectShowDropDown;

MultiSelectShowDropDown.propTypes = {
    data: PropTypes.array,
    sidebarItem: PropTypes.bool,
    className: PropTypes.string,
    handleEditCountryList: PropTypes.func,
    isShow: PropTypes.bool,
};
