import React from "react";
import PropTypes from "prop-types";

// ui components
import Dropdown from "./Dropdown";
import Tooltip from "./Tooltip";
import SearchBox from "./SearchBox";

// style
import "./questionsSelect.css";

const QuestionsSelect = ({
    data,
    selected,
    setSelected,
    filedName,
    sidebarItem = false,
    className,
}) => {
    const [query, setQuery] = React.useState('');
    let _Options;

    const textLength = sidebarItem ? 33 : 11;
    const splitLength = sidebarItem ? 32 : 10;

    _department = _.filter(data?.data, (item) => _.includes(_.lowerCase(dept.title), _.lowerCase(query)));

    React.useMemo(() => {
        if (!query) {
            _department = data?.data;
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
            <Dropdown register className="w-100">
                <Dropdown.Toggle
                    className={
                        sidebarItem
                            ? "sp1__pp_filter_dd_toggle py-2 px-2 border w-100"
                            : "sp1__pp_filter_dd_toggle w-100 mw-100 cnx_dropdown__dd__toggle"
                    }
                >
                    <Tooltip
                        text={selected?.title}
                        key="select-department-sal-risk"
                    >
                        <span
                            data-toggle={"tooltip"}
                            id="select-department-sal-risk"
                        >
                            {selected?.title ? (
                                <span>{selected?.title}</span>
                            ) : (
                                data?.emptyOptionsLabel
                            )}
                        </span>
                    </Tooltip>
                </Dropdown.Toggle>
                <Dropdown.Menu id="cnx_dropdown__menu_open__parentQuestion">
                    <div>
                        <SearchBox
                            autoFocus={true}
                            value={query}
                            onChange={setQuery}
                        />
                    </div>
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
                                {item?.title}
                            </Dropdown.Item>
                        ))}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default QuestionsSelect;

QuestionsSelect.propTypes = {
    data: PropTypes.object,
    selected: PropTypes.object,
    setSelected: PropTypes.func,
    filedName: PropTypes.string,
    sidebarItem: PropTypes.bool,
    className: PropTypes.string,
};
