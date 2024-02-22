import * as React from "react";
import { Listbox } from "@headlessui/react";
import styles from "./SalesFilter.module.css";
import Avatar from "../../../../global/Avatar";
import { filter, lowerCase, includes } from "lodash";

export default function LeadSource({ value, onChange, data }) {
    const [query, setQuery] = React.useState("");

    const filteredData = data
        ? query
            ? filter(data, (item) =>
                  includes(lowerCase(item), lowerCase(query))
              )
            : data
        : [];
    return (
        <div className={styles.toggleWrapper}>
            <span>
                <strong>Lead Source:</strong>{" "}
            </span>

            <Listbox
                as="div"
                value={value}
                onChange={onChange}
                className={styles.dropdown}
            >
                <Listbox.Button className={styles.dropdownToggle}>
                    {value || "All Sources"}
                </Listbox.Button>
                <Listbox.Options className={styles.dropdownMenu}>
                    <div className={styles.searchBox}>
                        <i className="fa-solid fa-search" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className={styles.options}>
                        <Listbox.Option
                            className={({ active, selected }) =>
                                `${styles.dropdownItem} ${
                                    active && styles.dropdownItemActive
                                } ${selected && styles.dropdownItemSelected}`
                            }
                            value=""
                        >
                            Select All
                        </Listbox.Option>
                        {filteredData?.map((item, index) => (
                            <Listbox.Option
                                className={({ active, selected }) =>
                                    `${styles.dropdownItem} ${
                                        active && styles.dropdownItemActive
                                    } ${
                                        selected && styles.dropdownItemSelected
                                    }`
                                }
                                key={index}
                                value={item}
                            >
                                {item}
                            </Listbox.Option>
                        ))}
                    </div>
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
