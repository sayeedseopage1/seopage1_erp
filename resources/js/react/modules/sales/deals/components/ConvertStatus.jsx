import * as React from "react";
import { Listbox } from "@headlessui/react";
import styles from "./PersonFilter.module.css";
import Avatar from "../../../../global/Avatar";
import { filter, lowerCase, includes } from "lodash";

import { GoTriangleDown } from "react-icons/go"; 

export default function ConvertStatus({ value, onChange, data }) {
    const [query, setQuery] = React.useState("");

    const filteredData = data
        ? query
            ? filter(data, (item) =>
                  includes(lowerCase(item.name), lowerCase(query))
              )
            : data
        : [];
    return (
        <div className={styles.toggleWrapper}>
            <span>Status: </span>

            <Listbox
                as="div"
                value={value}
                onChange={onChange}
                className={styles.dropdown}
            >
                <Listbox.Button className={styles.dropdownToggle}>
                    <span
                        className={`${styles.dropdownToggleButtonText} singleline-ellipsis`}
                    >
                        {value?.title ?? <span>All</span>}
                    </span>
                    <GoTriangleDown className={styles.dropdownIcon} />
                </Listbox.Button>
                <Listbox.Options className={styles.dropdownMenu}>
                    <div className={styles.searchBox}>
                        <i className="fa-solid fa-search" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onKeyDown={e => e.stopPropagation()}
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
                            value={null}
                        >
                            Select All
                        </Listbox.Option>
                        {filteredData?.map((item) => (
                            <Listbox.Option
                                className={({ active, selected }) =>
                                    `${styles.dropdownItem} ${
                                        active && styles.dropdownItemActive
                                    } ${
                                        selected && styles.dropdownItemSelected
                                    }`
                                }
                                key={item.id}
                                value={item}
                            >
                                {item.title}
                            </Listbox.Option>
                        ))}
                    </div>
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
