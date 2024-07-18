import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Popover, Tooltip } from "antd";

// ui components
import CustomLabel from "../CustomLabel/CustomLabel";
import Dropdown from "../../Shared/Dropdown";
import SearchBox from "../../Shared/Searchbox";

// style
import "./customDropDown.css";
import Switch from "../../../../../../global/Switch";
import { Placeholder } from "../../../../../../global/Placeholder";

const CustomDropDown = ({
    data,
    selected,
    setSelected,
    sidebarItem = false,
    className,
    filedName,
    isSearchBoxUse = false,
    isDisableUse,
    label,
    isRequired,
    placeholder,
    isError,
    errorText,
    disabledTitle,
    isFullDropDownLoading = false,
    isMultiple = false,
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
        <div className="d-flex flex-column price_quotations_custom_dropdown">
            <CustomLabel
                label={label}
                fieldName="fieldName"
                isRequired={isRequired}
                className="mb-3 d-inline"
            />
            <Switch>
                <Switch.Case condition={isFullDropDownLoading}>
                    <Placeholder width="100%" height="48px" />
                </Switch.Case>
                <Switch.Case condition={!isFullDropDownLoading}>
                    <Popover title={disabledTitle}>
                        <div
                            className={`${
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
                                    }  ${
                                        isDisableUse
                                            ? "sp1_remove_toggle_icon"
                                            : ""
                                    }`}
                                    disabled={isDisableUse}
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
                                                          <span>
                                                              {item?.name}
                                                          </span>
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
                                    className="price_quotations_custom_dropdown_menu"
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
                                        {filteredOptions
                                            ?.slice(0, 100)
                                            ?.map((item) => (
                                                <Dropdown.Item
                                                    key={item.id}
                                                    className={`sp1__pp_filter_dd_item singleline-ellipsis text-left ${addActiveClass(
                                                        item
                                                    )}`}
                                                    onClick={() => {
                                                        handleAddOrRemove(
                                                            item,
                                                            isMultiple
                                                        );
                                                    }}
                                                    disabled={item?.disabled}
                                                >
                                                    {item?.name}{" "}
                                                    {isMultiple &&
                                                        selected?.some(
                                                            (selectedItem) =>
                                                                _.isEqual(
                                                                    selectedItem,
                                                                    item
                                                                )
                                                        ) && (
                                                            <i className="fa-solid fa-check mr-2" />
                                                        )}
                                                </Dropdown.Item>
                                            ))}
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Popover>
                </Switch.Case>
            </Switch>
            {isError && (
                <span
                    style={{ color: "red", fontSize: "14px", marginTop: "8px" }}
                >
                    {errorText}
                </span>
            )}
        </div>
    );
};

export default CustomDropDown;

CustomDropDown.propTypes = {
    data: PropTypes.array,
    selected: PropTypes.any,
    setSelected: PropTypes.func,
    sidebarItem: PropTypes.bool,
    className: PropTypes.string,
    filedName: PropTypes.string,
    isDisableUse: PropTypes.bool,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    isSearchBoxUse: PropTypes.bool,
    isError: PropTypes.bool,
    errorText: PropTypes.string,
    isMultiple: PropTypes.bool,
    disabledTitle: PropTypes.any,
};
