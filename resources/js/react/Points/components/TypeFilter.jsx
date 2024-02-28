import * as React from "react";
import Dropdown from './Dropdown';
import Search from './Searchbox';
import { filter, lowerCase, includes } from "lodash";
import { useAuth } from "../../hooks/useAuth";
import _ from "lodash";

export default function TypeFilter({ value, onChange, data ,sidebarIsOpen, disabled, selectionBoxClassName}) {
    const auth = useAuth();
    const [query, setQuery] = React.useState("");

    
    /**
     * Filters data based on user role.
     * If the user role ID is 7, filters out items with ID "Authorization".
     * @param {Array} data - The array to be filtered.
     * @returns {Array} - The filtered array.
     */
    const filterByUserRole = _.filter(data, item => {
        return auth.getRoleId() !== 7 || item.id !== "Authorization";
    });

    const filteredData = filterByUserRole
        ? query
            ? filter(filterByUserRole, (item) =>
                  includes(lowerCase(item.title), lowerCase(query))
              )
            : filterByUserRole
        : [];

    return (
        <div className={`sp1_task_filter_item d-flex  ${sidebarIsOpen ? "flex-column w-100" : "align-items-center"}`}>
            <span className='mr-2 f-13 d-flex flex-nowrap'>Type: </span>
            <Dropdown>
                <Dropdown.Toggle disabled={disabled} className={`sp1_filter_toggle ${selectionBoxClassName ?? ''} ${sidebarIsOpen && "py-2"} `}>
                    <span
                        data-toggle={name ? 'tooltip' : ''}
                        title={value?.title ?? ''}
                    >
                            <strong>{value?.title ?? 'All'}</strong>
                    </span>
                </Dropdown.Toggle>
            
                <Dropdown.Menu >
                        <div>
                            <Search autoFocus={true} value={query} onChange={setQuery} />
                        </div>
                        <div className="sp1_filter--users">
                            <Dropdown.Item onClick={() => onChange(null)} className={value === null ? 'sp1_filter--user active' : 'sp1_filter--user'}>
                                    All
                            </Dropdown.Item>
                            {_.map(filteredData, item => {
                                return <Dropdown.Item key={item.id} onClick={() => onChange(item)} className={value?.id === item.id ? 'sp1_filter--user active' : 'sp1_filter--user'}>
                                    
                                    {item?.title}
                                </Dropdown.Item>
                            })}
                        </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
