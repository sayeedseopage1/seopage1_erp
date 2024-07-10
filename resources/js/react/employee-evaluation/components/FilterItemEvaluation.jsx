import * as React from "react";

import _ from "lodash";
import Dropdown from "../../Insights/ui/Dropdown";

export default function FilterItemEvaluation({
    items = [],
    title,
    selected,
    onSelect,
    isLoading = true,
}) {
    const [search, setSearch] = React.useState("");
    const [maxHeight, setMaxHeight] = React.useState(720);

    // set max height
    React.useEffect(() => {
        if (window) {
            if (window.innerHeight < 720) {
                setMaxHeight(window.innerHeight - 150);
            }
        }
    }, [maxHeight]);

    return (
        <div className="d-flex align-items-center px-3 py-2 border-right">
            <span className="mr-2">{title}</span>
            <Dropdown>
                <Dropdown.Toggle className="sp1__pp_filter_dd_toggle">
                    {!selected ? "All" : _.startCase(selected)}
                </Dropdown.Toggle>
                <Dropdown.Menu className="sp1__pp_filter_dd">
                    {isLoading ? (
                        <React.Fragment>
                            <div className={`mt-2`}>
                                <div
                                    className="spinner-border"
                                    role="status"
                                    style={{
                                        width: "1rem",
                                        height: "1rem",
                                        borderWidth: "0.15rem",
                                        borderColor: "#777",
                                        borderRightColor: "transparent",
                                    }}
                                ></div>
                                <span
                                    className="d-inline ml-2"
                                    style={{ color: "#777" }}
                                >
                                    Loading...
                                </span>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* data */}
                            <div
                                className="sp1__pp_menu_items"
                                style={{ maxHeight }}
                            >
                                {/* item */}
                                {items
                                    ?.filter((item) =>
                                        _.lowerCase(item?.name).includes(
                                            _.lowerCase(search)
                                        )
                                    )
                                    .map((item) => (
                                        <Dropdown.Item
                                            key={item}
                                            onClick={(e) => onSelect(item)}
                                            className={`sp1__pp_filter_dd_item mb-1 ${
                                                selected === item
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >
                                            {_.startCase(item)}
                                        </Dropdown.Item>
                                    ))}
                            </div>
                        </React.Fragment>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
