import * as React from "react";
import PropTypes from "prop-types";
import { Listbox } from "@headlessui/react";
import { filter, lowerCase, includes } from "lodash";

// style
import styles from "./SalesFilter.module.css";

// Components
import Avatar from "../../../global/Avatar";

export default function SalesFilter({ value, onChange, data }) {
    const [query, setQuery] = React.useState("");

    const formatFilter = (data) => {
        if (!data) return [];
        if (query) {
            return filter(data, (person) =>
                includes(lowerCase(person.name), lowerCase(query))
            );
        }
        return data;
    };

    const filteredData = formatFilter(data);
    return (
        <div className={styles.toggleWrapper}>
            <span>
                <strong>Sales:</strong>{" "}
            </span>

            <Listbox
                as="div"
                value={value}
                onChange={onChange}
                className={styles.dropdown}
            >
                <Listbox.Button className={styles.dropdownToggle}>
                    {value?.name.split(" ").slice(-1)[0] ?? "All"}
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

SalesFilter.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    data: PropTypes.array,
};