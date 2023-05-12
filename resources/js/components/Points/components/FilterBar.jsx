/* eslint-disable react/prop-types */
import * as React from 'react';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import Dropdown from '../../Insights/ui/Dropdown';
import _ from 'lodash';
import SearchBox from '../../Insights/ui/Searchbox';
import Button from '../../Insights/ui/Button';




const PointPageFilterBarItem = ({children, className=""}) => {
    return(
        <div className={`sp1__pp_filter_bar_item ${className}`}>
            {children}
        </div>
    )
}



const FilterDropdownItem = ({
    title,
    selected,
    items = [],
    onClick,
    miniScreen='hide',
    className,
}) => {
    const [search, setSearch] = React.useState("");
   
    
    return (
        <PointPageFilterBarItem className={miniScreen}>
            <span>{title}</span>
            <Dropdown>
                <Dropdown.Toggle className="sp1__pp_filter_dd_toggle">
                    {_.startCase(selected.name)}
                </Dropdown.Toggle>
                <Dropdown.Menu className="sp1__pp_filter_dd">
                    <div className="sp1__pp_filter_dd_search">
                        <SearchBox
                            value={search}
                            onChange={setSearch}
                        />
                    </div>

                    <div className='cnx_divider'/>

                    {
                        items.length > 0 && items
                        .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                        .map((item) => (
                            <Dropdown.Item 
                                key={item.id}
                                className={`sp1__pp_filter_dd_item ${selected?.id ===  item.id ? 'active': ""} ${className}`} 
                                onClick={() => onClick &&  onClick(item)}
                            >
                            {item.name} 
                            </Dropdown.Item>
                        ))
                    }
                    
                </Dropdown.Menu>
            </Dropdown>
        </PointPageFilterBarItem>
    )
}


const SidebarFilterDropdownItem = ({
    title,
    selected,
    items = [],
    onClick,
    className,
}) => {
    const [search, setSearch] = React.useState("");
   
    
    return (
        <div className='sp1__pp_sidebar_filter_item'>
            <span>{title}</span>
            <Dropdown>
                <Dropdown.Toggle className="sp1__pp_filter_dd_toggle sp1__pp_sidebar_filter_dd_toggle">
                    {_.startCase(selected.name)}
                </Dropdown.Toggle>
                <Dropdown.Menu className="sp1__pp_filter_dd">
                    <div className="sp1__pp_filter_dd_search">
                        <SearchBox
                            value={search}
                            onChange={setSearch}
                        />
                    </div>

                    <div className='cnx_divider'/>

                    {
                        items.length > 0 && items
                        .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                        .map((item) => (
                            <Dropdown.Item 
                                key={item.id}
                                className={`sp1__pp_filter_dd_item ${selected?.id ===  item.id ? 'active': ""} ${className}`} 
                                onClick={() => onClick &&  onClick(item)}
                            >
                            {item.name} 
                            </Dropdown.Item>
                        ))
                    }
                    
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}





const PointPageFilterBar = () => {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [shift, setShift] = React.useState({
        id: 'all',
        name: 'All'
    });



    // filter sidebar id
    const [isOpen, setIsOpen] = React.useState(false);

    return(
        <div className="sp1__pp_filter_bar">
            <PointPageFilterBarItem>
                <JqueryDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate} 
                /> 
            </PointPageFilterBarItem>

            {/* shift */}
            

            {/* credit/debit */}
            <FilterDropdownItem
                title="Select Shift" 
                selected={shift}
                items={[
                    { id: 'all', name: 'All' },
                    { id: 'morning', name: 'Morning' },
                    { id: 'evening', name: 'Evening' },
                    { id: 'night', name: 'Night'}
                ]}
                onClick={setShift}
            />


            {/* credit/debit */}
            <FilterDropdownItem
                title="Select Credit/Debit" 
                selected={shift}
                items={[
                    { id: 'all', name: 'All' },
                    { id: 'morning', name: 'Morning' },
                    { id: 'evening', name: 'Evening' },
                    { id: 'night', name: 'Night'}
                ]}
                onClick={setShift}
            />


            {/* credit/debit */}
            <FilterDropdownItem
                title="Points gained as" 
                selected={shift}
                items={[
                    { id: 'all', name: 'All' },
                    { id: 'morning', name: 'Morning' },
                    { id: 'evening', name: 'Evening' },
                    { id: 'night', name: 'Night'}
                ]}
                onClick={setShift}
            />


            {/* credit/debit */}
            <FilterDropdownItem
                title="Select Project" 
                selected={shift}
                items={[
                    { id: 'all', name: 'All' },
                    { id: 'morning', name: 'Morning' },
                    { id: 'evening', name: 'Evening' },
                    { id: 'night', name: 'Night'}
                ]}
                onClick={setShift}
            />


             <FilterDropdownItem
                title="Select Employee" 
                selected={shift}
                items={[
                    { id: 'all', name: 'All' },
                    { id: 'morning', name: 'Morning' },
                    { id: 'evening', name: 'Evening' },
                    { id: 'night', name: 'Night'}
                ]}
                onClick={setShift}
            />

            <FilterDropdownItem
                title="Select Department" 
                selected={shift} 
                id="department"
                items={[
                    { id: 'all', name: 'All' },
                    { id: 'morning', name: 'Morning' },
                    { id: 'evening', name: 'Evening' },
                    { id: 'night', name: 'Night'}
                ]}
                onClick={setShift}
            />


            <div className='sp1__pp_filter_sidebar_container'>
                <div className='sp1__pp_filter_sidebar_toggle' onClick={() => setIsOpen(true)}>
                    <i className="fa-solid fa-filter"></i>
                    <span>Filters</span>
                </div>


                {isOpen && (
                    <div className='sp1__pp_filter_sidebar'>
                    <div className='sp1__pp_filter_sidebar_header'>
                        <span>Filters</span>

                        <Button
                            aria-label="Close"
                            variant='tertiary' 
                            onClick={() => setIsOpen(false)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </Button>
                    </div>

                    <div className='sp1__pp_filter_sidebar_items'>
                        <SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />

                        <SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />



                        <SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />


<SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />



                        <SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />

                        <SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />



                        <SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />

                        <SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />


                        <SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />

                        <SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />

                        <SidebarFilterDropdownItem
                            title="Select Department" 
                            selected={shift}
                            id="department"
                            items={[
                                { id: 'all', name: 'All' },
                                { id: 'morning', name: 'Morning' },
                                { id: 'evening', name: 'Evening' },
                                { id: 'night', name: 'Night'}
                            ]}
                            onClick={setShift}
                        />
                    </div>
                </div>
                )}
            </div>

        </div>
    )
}


export default PointPageFilterBar;