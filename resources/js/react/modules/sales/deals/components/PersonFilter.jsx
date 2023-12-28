import * as React from "react";
import { Listbox } from "@headlessui/react";
import styles from "./PersonFilter.module.css";
import Avatar from "../../../../global/Avatar";
import { filter, lowerCase, includes } from "lodash";
import { LuChevronsUpDown } from "react-icons/lu";

export default function PersonFilter({ value, onChange, data, title }) {
    const [query, setQuery] = React.useState("");

    const filteredData = data
        ? query
            ? filter(data, (person) =>
                  includes(lowerCase(person.name), lowerCase(query))
              )
            : data
        : [];
    return (
        <div className={styles.toggleWrapper}>
            <span>{title}:</span>

            <Listbox
                as="div"
                value={value}
                onChange={onChange}
                className={styles.dropdown}
            >
                <Listbox.Button className={`${styles.dropdownToggle} `}>
                    <span
                        className={`${styles.dropdownToggleButtonText} singleline-ellipsis`}
                    >
                        {value?.name ?? <span>All</span>}
                    </span>
                    <LuChevronsUpDown className={styles.dropdownIcon} />
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
                            value={null}
                        >
                            Select All
                        </Listbox.Option>
                        {filteredData?.map((person) => (
                            <Listbox.Option
                                className={({ active, selected }) =>
                                    `${styles.dropdownItem} ${
                                        active && styles.dropdownItemActive
                                    } ${
                                        selected && styles.dropdownItemSelected
                                    }`
                                }
                                key={person.id}
                                value={person}
                            >
                                <Avatar
                                    src={person?.image_url ?? null}
                                    name={person.name}
                                    width={28}
                                    height={28}
                                    type="circle"
                                />
                                {person.name}
                            </Listbox.Option>
                        ))}
                    </div>
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
