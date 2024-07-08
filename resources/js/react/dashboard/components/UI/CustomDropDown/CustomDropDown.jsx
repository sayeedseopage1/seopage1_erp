import _ from "lodash";
import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Popover, Tooltip } from "antd";

// Components - UI - Shared
import Dropdown from "../../../../global/Dropdown";
import Switch from "../../../../global/Switch";

import "./customDropDown.css";

const CustomDropDown = ({
    data,
    selected,
    setSelected,
    filedName,
    isMultiple = false,
    placeholder = "Select Item",
    isDisabled,
    isSearchBoxUse = false,
    className = "",
    sidebarItem = false,
}) => {
    const [query, setQuery] = React.useState("");
    const startCase = _.startCase(selected?.name);

    const debouncedSetQuery = useCallback(
        _.debounce((value) => {
            setQuery(value);
        }, 300),
        []
    );

    const handleSearchChange = (value) => {
        setQuery(value); // Immediate update for instant feedback
        debouncedSetQuery(value);
    };

    const filteredOptions = useMemo(() => {
        if (!query && !isSearchBoxUse) {
            return data;
        }
        return _.filter(
            data,
            (item) =>
                _.includes(_.lowerCase(item?.name), _.lowerCase(query)) ||
                _.includes(_.lowerCase(item?.user_name), _.lowerCase(query))
        );
    }, [query, data, isSearchBoxUse]);

    // handle add or remove item
    const handleAddOrRemove = (value, isMultiple) => {
        const payload = {
            target: {
                name: filedName,
                value: value,
                isMultiple: !!isMultiple,
            },
        };

        setSelected(payload);
    };

    // add active class
    const addActiveClass = (item) => {
        if (isMultiple) {
            return selected?.some((selectedItem) =>
                _.isEqual(selectedItem, item)
            )
                ? "active d-flex justify-content-between align-items-center"
                : "";
        } else {
            return selected?.id === item.id ? "active" : "";
        }
    };

    return (
        <Switch>
            <div
                className={`sp1_dashboard_custom_dropdown ${
                    sidebarItem
                        ? `d-flex flex-column w-100 mt-2`
                        : "d-flex align-items-center"
                } ${className} sp1__pp_filter_dd_wrapper`}
            >
                <Dropdown register className="w-100">
                    <Dropdown.Toggle
                        className={` ${
                            sidebarItem
                                ? "sp1__pp_filter_dd_toggle py-2 px-2 border w-100"
                                : "sp1__pp_filter_dd_toggle w-100 mw-100 cnx_dropdown__dd__toggle"
                        }  ${isDisabled ? "sp1_remove_toggle_icon" : ""}`}
                        disabled={isDisabled}
                    >
                        <Switch.Case condition={isMultiple}>
                            <div
                                className="flex-wrap d-flex"
                                style={{
                                    gap: "5px",
                                }}
                            >
                                {selected?.length
                                    ? selected?.map((item) => (
                                          <div
                                              key={`${
                                                  item?.name
                                              }-${Math?.random()}`}
                                              className="cnx_select_box_tag"
                                          >
                                              <button
                                                  aria-label="removeTag"
                                                  onClick={() =>
                                                      handleAddOrRemove(
                                                          item,
                                                          isMultiple
                                                      )
                                                  }
                                              >
                                                  <i className="fa-solid fa-xmark" />
                                              </button>
                                              <span>{item?.name}</span>
                                          </div>
                                      ))
                                    : placeholder}
                            </div>
                        </Switch.Case>
                        <Switch.Case condition={!isMultiple}>
                            <Tooltip title={startCase}>
                                <span
                                    data-toggle={"tooltip"}
                                    id="select-department-sal-risk"
                                    className="singleline-ellipsis text-left"
                                >
                                    {selected?.name ? (
                                        <span>{startCase}</span>
                                    ) : (
                                        placeholder
                                    )}
                                </span>
                            </Tooltip>
                        </Switch.Case>
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                        id={`cnx_dropdown__menu_open--${data?.id}`}
                        className="sp1_dashboard_custom_dropdown_menu"
                    >
                        {isSearchBoxUse && (
                            <div>
                                <SearchBox
                                    autoFocus={true}
                                    value={query}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        )}
                        <div className="sp1_filter--users">
                            {filteredOptions?.slice(0, 100)?.map((item) => (
                                <Dropdown.Item
                                    key={item.id}
                                    className={`sp1__pp_filter_dd_item singleline-ellipsis text-left ${addActiveClass(
                                        item
                                    )}`}
                                    onClick={() => {
                                        handleAddOrRemove(item, isMultiple);
                                    }}
                                    disabled={item?.disabled}
                                >
                                    {item?.name}{" "}
                                    {isMultiple &&
                                        selected?.some((selectedItem) =>
                                            _.isEqual(selectedItem, item)
                                        ) && (
                                            <i className="fa-solid fa-check mr-2" />
                                        )}
                                </Dropdown.Item>
                            ))}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </Switch>
    );
};

export default CustomDropDown;

CustomDropDown.propTypes = {
    data: PropTypes.array || null,
    selected: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        user_name: PropTypes.string,
    }),
    setSelected: PropTypes.func,
    filedName: PropTypes.string,
    isMultiple: PropTypes.bool,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    isSearchBoxUse: PropTypes.bool,
    className: PropTypes.string,
    sidebarItem: PropTypes.bool,
};
