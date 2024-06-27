import * as React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import Dropdown from "./Dropdown";
import Tooltip from "./Tooltip";
import SearchBox from "./SearchBox";

const DepartmentSelect = ({
    data,
    onSelect,
    setSelectedDept,
    selected,
    loading,
    isDisabled,
    sidebarItem = false,
    className,
}) => {
    const [query, setQuery] = React.useState("");
    let _department;

    _department = _.filter(data, (dept) =>
        _.includes(_.lowerCase(dept.team_name), _.lowerCase(query))
    );

    React.useMemo(() => {
        if (!query) {
            _department = data;
        }
    }, [query]);

    return (
        <div
            className={`${
                sidebarItem
                    ? `d-flex flex-column w-100 mt-2`
                    : "d-flex align-items-center"
            } ${className}`}
        >
            <Dropdown className="w-100">
                <Dropdown.Toggle
                    className={`${
                        sidebarItem
                            ? "sp1__pp_filter_dd_toggle py-2 px-2 border w-100"
                            : "sp1__pp_filter_dd_toggle w-100 mw-100 cnx_dropdown__dd__toggle"
                    }  ${isDisabled ? "sp1_remove_toggle_icon" : ""}`}
                    disabled={isDisabled}
                >
                    <Tooltip
                        text={_.startCase(selected?.team_name)}
                        key="select-department-sal-risk"
                    >
                        <span
                            data-toggle={"tooltip"}
                            id="select-department-sal-risk"
                        >
                            {selected?.team_name ? (
                                <span>{_.startCase(selected?.team_name)}</span>
                            ) : (
                                "Select Department"
                            )}
                        </span>
                    </Tooltip>
                </Dropdown.Toggle>
                <Dropdown.Menu id="cnx_dropdown__menu_open--department">
                    <div>
                        <SearchBox
                            autoFocus={true}
                            value={query}
                            onChange={setQuery}
                        />
                    </div>
                    <div className="sp1_filter--users">
                        {_department?.map((dept) => (
                            <Dropdown.Item
                                key={dept.id}
                                className={
                                    Number(selected?.id) === dept.id
                                        ? "sp1__pp_filter_dd_item active"
                                        : "sp1__pp_filter_dd_item"
                                }
                                onClick={(e) => {
                                    setSelectedDept({
                                        target: {
                                            name: "department",
                                            value: dept,
                                        },
                                    });
                                }}
                            >
                                {dept.team_name}
                            </Dropdown.Item>
                        ))}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default DepartmentSelect;

DepartmentSelect.propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
    setSelectedDept: PropTypes.func,
    selected: PropTypes.object,
    loading: PropTypes.bool,
    sidebarItem: PropTypes.bool,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
};
