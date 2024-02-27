import * as React from "react";
import Dropdown from './Dropdown';
import Search from './Searchbox';
import { filter, lowerCase, includes } from "lodash";

export default function TypeFilter({ value, onChange, data ,sidebarIsOpen, disabled, selectionBoxClassName}) {
    const [query, setQuery] = React.useState("");

    const filteredData = data
        ? query
            ? filter(data, (item) =>
                  includes(lowerCase(item.title), lowerCase(query))
              )
            : data
        : [];

    return (
        <div className={`sp1_task_filter_item d-flex ${sidebarIsOpen && "flex-column w-100"}`}>
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
