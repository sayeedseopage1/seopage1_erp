import * as React from "react";
import { Listbox } from "@headlessui/react";
import styles from "./PersonFilter.module.css";
import { filter, lowerCase, includes } from "lodash";
import { GoTriangleDown } from "react-icons/go"; 
import Dropdown from './Dropdown';
import Search from './Searchbox';

export default function TypeFilter({ value, onChange, data ,sidebarIsOpen, selectionBoxClassName, disabled }) {
    const [query, setQuery] = React.useState("");

    const filteredData = data
        ? query
            ? filter(data, (item) =>
                  includes(lowerCase(item.name), lowerCase(query))
              )
            : data
        : [];
    return (
        <>
            {/* <div className={`${styles.toggleWrapper} ${sidebarIsOpen && "w-100"}`}>
                <span>Type: </span>

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
                                All
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
            </div> */}
            <div className={`sp1_task_filter_item d-flex ${sidebarIsOpen && "flex-column w-100"}`}>
            <span className='mr-2 f-13 d-flex flex-nowrap'>Type: :</span>
            <Dropdown>
                <Dropdown.Toggle disabled={disabled} className={`sp1_filter_toggle ${selectionBoxClassName ?? ''} ${sidebarIsOpen && "py-2"}`} >
                    <span
                        data-toggle={name ? 'tooltip' : ''}
                        title={value?.title ?? ''}
                    >
                        <strong>{name ?? 'All'}</strong>
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <div>
                        <Search autoFocus={true} value={query} onChange={setQuery} />
                    </div>
                    <div className="sp1_filter--users">
                        {value?.title &&
                            <Dropdown.Item onClick={() => onChange(null)} className={value?.title === null ? 'sp1_filter--user active' : 'sp1_filter--user'}>
                               {value?.title ?? <span>All</span>}
                            </Dropdown.Item>}
                         {filteredData?.map((item) => (
                                <Dropdown.Item key={value?.id} onClick={() => onChange(item)} className={value?.id === item.id ? 'sp1_filter--user active' : 'sp1_filter--user'}
                                >
                                    {item.title}
                                </Dropdown.Item>
                        ))}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            </div>
        </>
    );
}
