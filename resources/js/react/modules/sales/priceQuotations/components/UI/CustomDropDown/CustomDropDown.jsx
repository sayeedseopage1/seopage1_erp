import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// ui components
import CustomLabel from "../CustomLabel/CustomLabel";
import Dropdown from "../../Shared/Dropdown";
import Tooltip from "../../Shared/Tooltip";
import SearchBox from "../../Shared/Searchbox";

// style
import "./customDropDown.css";
import Switch from "../../../../../../global/Switch";

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
    isMultiple = false,
}) => {
    const [query, setQuery] = React.useState("");

    let _Options = data;
    const startCase = _.startCase(selected?.name);

    _Options = _.filter(data, (item) =>
        _.includes(_.lowerCase(item?.name), _.lowerCase(query))
    );

    React.useMemo(() => {
        if (!query && !isSearchBoxUse) {
            _Options = data;
        }
    }, [query, isSearchBoxUse]);

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

    console.log(filedName, isDisableUse && disabledTitle);

    return (
        <div className="d-flex flex-column price_quotations_custom_dropdown">
            <CustomLabel
                label={label}
                fieldName="fieldName"
                isRequired={isRequired}
                className="mb-3 d-inline"
            />
            <Switch>
                <div
                    className={`${
                        sidebarItem
                            ? `d-flex flex-column w-100 mt-2`
                            : "d-flex align-items-center"
                    } ${className}`}
                >
                    <Dropdown register className="w-100">
                        <Dropdown.Toggle
                            className={`${
                                sidebarItem
                                    ? "sp1__pp_filter_dd_toggle py-2 px-2 border w-100"
                                    : "sp1__pp_filter_dd_toggle w-100 mw-100 cnx_dropdown__dd__toggle"
                            }  ${isDisableUse ? "sp1_remove_toggle_icon" : ""}`}
                            disabled={isDisableUse}
                        >
                            <Switch.Case condition={isMultiple}>
                                <div
                                    className="flex-wrap d-flex"
                                    style={{
                                        gap: "5px",
                                    }}
                                    title={disabledTitle}
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
                                <Tooltip
                                    text={startCase}
                                    key="select-department-sal-risk"
                                >
                                    <span
                                        data-toggle={"tooltip"}
                                        id="select-department-sal-risk"
                                        className="multiline-ellipsis"
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
                                        onChange={setQuery}
                                    />
                                </div>
                            )}
                            <div className="sp1_filter--users">
                                {_Options?.map((item) => (
                                    <Dropdown.Item
                                        key={item.id}
                                        className={`sp1__pp_filter_dd_item  ${addActiveClass(
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
            {isDisableUse && disabledTitle &&
                <small
                    style={{ color: "red", fontSize: "14px", marginTop: "4px" }}
                >
                    {disabledTitle}
                </small>
            }
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
    data: PropTypes.object,
    selected: PropTypes.object || PropTypes.array,
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
    disabledTitle: PropTypes.string,
};
