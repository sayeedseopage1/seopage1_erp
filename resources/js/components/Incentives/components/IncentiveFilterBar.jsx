/* eslint-disable react/prop-types */
import * as React from 'react';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import Dropdown from '../../Insights/ui/Dropdown';
import _ from 'lodash';
import SearchBox from '../../Insights/ui/Searchbox';
import Button from '../../Insights/ui/Button';
import { 
    useGetEmployeeOptionsMutation,  
    useGetShiftOptionsMutation, 
} from '../../services/api/FilterBarOptionsApiSlice';
import { useIncentiveCurrentDataMutation } from '../../services/api/IncentiveApiSlice';
import Tooltip from '../../Insights/ui/Tooltip';


const IncentiveFilterBarItem = ({children, id="", className=""}) => {
    return(
        <div id={id} className={`sp1__pp_filter_bar_item ${className}`}>
            {children}
        </div>
    )
}



const FilterDropdownItem = ({
    title,
    selected,
    items = [],
    isLoading,
    onClick,
    avatar = '',
    miniScreen='hide',
    className= "",
    id,
    inVisible,
    setInVisible
}) => {
    const [search, setSearch] = React.useState("");
    const [maxHeight, setMaxHeight] = React.useState(720);
   
    
    const menuHeight = React.useMemo(() => maxHeight, [maxHeight])

    // set max height
    React.useEffect(() => {
        if(window){
            if(window.innerHeight < 720){
                 setMaxHeight(window.innerHeight - 150);
            } 
         }
    }, [menuHeight])


    const handleClick = (e, value) => {
        e.preventDefault();
        if(onClick){
            
            onClick(value)
        }
    }

    return (
        <div >
            <IncentiveFilterBarItem id={id} className={miniScreen}>
                <span>{title}</span>
                <Dropdown>
                    <Dropdown.Toggle className="sp1__pp_filter_dd_toggle">
                        <Tooltip
                            text={_.startCase(selected.name)}
                        >
                            <>
                            {
                                selected?.name ?
                                selected.name?.length > 11 ? 
                                _.startCase(selected?.name?.slice(0, 10)) + '...'
                                : selected.name
                                : ''
                            }
                            </>
                        </Tooltip>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="sp1__pp_filter_dd">
                            {
                                items?.length > 20 && 
                                <>
                                    <div className="sp1__pp_filter_dd_search">
                                        <SearchBox
                                            value={search}
                                            onChange={setSearch}
                                        />
                                    </div>
                                    <div className='cnx_divider'/>
                                </>
                            }

                            

                            <div className="sp1__pp_menu_items" style={{maxHeight}}>

                                {!isLoading && items.length === 0 && <>
                                    <Dropdown.Item 
                                        className={`sp1__pp_filter_dd_item`} 
                                    >
                                            Data not found
                                    </Dropdown.Item>
                                </>}
                                
                                {
                                    isLoading ? (
                                        <div className=''>
                                            Loading...
                                        </div> 
                                    ):  items.length > 0 && <>

                                        {search.length === 0 && items.length > 1 &&  
                                        <Dropdown.Item 
                                                className={`sp1__pp_filter_dd_item ${selected?.id === 'all' ? 'active': ""} ${className}`} 
                                                onClick={(e) => handleClick(e, {id: 'all', name: 'All'})}
                                        >
                                            All
                                        </Dropdown.Item>}
                                        {
                                            items?.length > 0 && items
                                            .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                                            .map((item) => (
                                                <Dropdown.Item 
                                                    key={item.id}
                                                    className={`sp1__pp_filter_dd_item ${selected?.id ===  item.id ? 'active': ""} ${className}`} 
                                                    onClick={(e) => handleClick(e, item)}
                                                >
                                                    
                                                    {avatar ? 
                                                         item[avatar] ?(
                                                        <img 
                                                            src={`/user-uploads/avatar/${item[avatar]}`}
                                                            alt={item.name}
                                                            style={{
                                                                width: 26,
                                                                height: 26,
                                                                borderRadius: '50%'
                                                                
                                                            }}
                                                        />

                                                    ) : <img 
                                                        src={`https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp`}
                                                        alt={item.name}
                                                        style={{
                                                            width: 26,
                                                            height: 26,
                                                            borderRadius: '50%'
                                                            
                                                        }}
                                                    /> : null}
                                                    {item.name}
                                                </Dropdown.Item>
                                            ))
                                        }
                                    
                                    
                                    </>
                                }
                            </div>                
                    </Dropdown.Menu>
                </Dropdown>
            </IncentiveFilterBarItem>
        </div>
    )
}


const SidebarFilterDropdownItem = ({
    title,
    selected,
    items = [],
    isLoading,
    onClick,
    avatar = '',
    miniScreen='hide',
    className= "",
    id,
    inVisible,
    setInVisible
}) => {
    const [search, setSearch] = React.useState("");
    const [maxHeight, setMaxHeight] = React.useState(720);
   
    
    const menuHeight = React.useMemo(() => maxHeight, [maxHeight])

    // set max height
    React.useEffect(() => {
        if(window){
            if(window.innerHeight < 720){
                 setMaxHeight(window.innerHeight - 150);
            } 
         }
    }, [menuHeight])


    const handleClick = (e, value) => {
        e.preventDefault();
        if(onClick){
            onClick(value)
        }
    }

    return (
            <IncentiveFilterBarItem id={id} className="sp1__pp_sidebar_filter_item">
                <span className='sp1__pp_sidebar_filter_label'>{title}</span>
                <Dropdown>
                    <Dropdown.Toggle className="sp1__pp_filter_dd_toggle sp1__pp_sidebar_filter_dd_toggle">
                        <Tooltip
                            text={_.startCase(selected.name)}
                        >
                            <>
                            {
                                selected?.name ?
                                selected.name?.length > 30 ? 
                                _.startCase(selected?.name?.slice(0, 29)) + '...'
                                : selected.name
                                : ''
                            }
                            </>
                        </Tooltip>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="sp1__pp_filter_dd">
                            {
                                items?.length > 20 && 
                                <>
                                    <div className="sp1__pp_filter_dd_search">
                                        <SearchBox
                                            value={search}
                                            onChange={setSearch}
                                        />
                                    </div>
                                    <div className='cnx_divider'/>
                                </>
                            }

                            

                            <div className="sp1__pp_menu_items" style={{maxHeight}}>

                                {!isLoading && items.length === 0 && <>
                                    <Dropdown.Item 
                                        className={`sp1__pp_filter_dd_item`} 
                                    >
                                            Data not found
                                    </Dropdown.Item>
                                </>}
                                
                                {
                                    isLoading ? (
                                        <div className=''>
                                            Loading...
                                        </div> 
                                    ):  items.length > 0 && <>

                                        {search.length === 0 && items.length > 1 &&  
                                        <Dropdown.Item 
                                                className={`sp1__pp_filter_dd_item ${selected?.id === 'all' ? 'active': ""} ${className}`} 
                                                onClick={(e) => handleClick(e, {id: 'all', name: 'All'})}
                                        >
                                            All
                                        </Dropdown.Item>}
                                        {
                                            items?.length > 0 && items
                                            .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                                            .map((item) => (
                                                <Dropdown.Item 
                                                    key={item.id}
                                                    className={`sp1__pp_filter_dd_item ${selected?.id ===  item.id ? 'active': ""} ${className}`} 
                                                    onClick={(e) => handleClick(e, item)}
                                                >
                                                    
                                                    {avatar ? 
                                                        (item['image_url'] || item[avatar])  ?(
                                                        <img 
                                                            src={`${item['image_url'] || '/user-uploads/avatar/${item[avatar]}' }`}
                                                            alt={item.name}
                                                            style={{
                                                                width: 26,
                                                                height: 26,
                                                                borderRadius: '50%'
                                                                
                                                            }}
                                                        />

                                                    ) : <img 
                                                        src={`https://gravatar.com/avatar/${Math.random()}.png?s=200&d=mp`}
                                                        alt={item.name}
                                                        style={{
                                                            width: 26,
                                                            height: 26,
                                                            borderRadius: '50%'
                                                            
                                                        }}
                                                    /> : null}
                                                    {item.name}
                                                </Dropdown.Item>
                                            ))
                                        }
                                    
                                    
                                    </>
                                }
                            </div>                
                    </Dropdown.Menu>
                </Dropdown>
            </IncentiveFilterBarItem>
        )
}


const IncentiveFilterBar = ({setData, setTableDataIsFetching, defaultSelectedDate="monthly"}) => {
    const [shifts, setShifts] = React.useState([]);
    const [employee, setEmployee] = React.useState([]);


    const [startDate, setStartDate] = React.useState(null); 
    const [endDate, setEndDate] = React.useState(null);

    const [inVisible, setInVisible] = React.useState([]);


    const [shift, setShift] = React.useState({ 
        id:2,
        name:"Development morning shift sales"
        
    });

    
    const [selectedEmployee, setSelectedEmployee] = React.useState(
        {
            "id": 208,
            "name": "Mohammad Sayeed Ullah",
            "image": null
        }
    );

   

    // shifts
    const [
        getShiftOptions,
        {
            data: shiftsData,
            isLoading: shiftDataIsLoading
        }
    ] = useGetShiftOptionsMutation();
 

    // employee 
    const [
        getEmployeeOptions,
        {
            data: employeeData,
            isLoading: employeeDataIsLoading 
        }
    ] = useGetEmployeeOptionsMutation();

 
 

    const [
        incentiveCurrentData,
        {
            isLoading: dataFetchingStateIsLoading,
        }
    ] =  useIncentiveCurrentDataMutation();


    React.useEffect(() => {
        setTableDataIsFetching(dataFetchingStateIsLoading); 
    }, [dataFetchingStateIsLoading])


    const getCurrentData = async (query) => {

        try{
            let res = await incentiveCurrentData({
                ...query,
                period: defaultSelectedDate
            }).unwrap(); 
            setData(res);
        }catch(err){
            console.log(err)
        }finally{
            setTableDataIsFetching(dataFetchingStateIsLoading)
        }
    }

   
    const shiftsDataMemo = React.useMemo(() => shiftsData, [shiftsData])
    const employeeDataMemo = React.useMemo(() => employeeData, [employeeData])


    // fetch data
    React.useEffect(()=> {
        getShiftOptions('/');
        getEmployeeOptions(`?shift_id=${shift.id}`); 
    }, []);

    // initials state
    React.useEffect(() => {
        if(employeeData){
            setEmployee([...employeeData])
        }

        if(shiftsData){
            setShifts([...shiftsData])
        }

    }, [employeeDataMemo, shiftsDataMemo ])



    // React.useEffect(()=> {
    //     console.log({startDate, endDate})
    //     pointTableData({
    //         start_data: startDate,
    //         end_date: endDate
    //     })
    // }, [startDate, endDate])

    const startDateMemo = React.useMemo(() => startDate, [startDate]) 
    const endDateMemo = React.useMemo(() => endDate, [endDate]) 


    // 
    React.useEffect(()=> {
       if(startDate && endDate){
            getCurrentData({ 
                team_id: shift.id,
                user_id: selectedEmployee.id,
                start_date: startDate,
                end_date: endDate,
            });
       } 
    }, [startDateMemo,endDateMemo])

    //  // 
    //  React.useEffect(()=> {
    //     getCurrentData({ 
    //         team_id: shift.id !== 'all' ? shift.id : '',
    //         user_id: selectedEmployee.id !== 'all' ? selectedEmployee.id : '',
    //         start_date: startDate,
    //         end_date: endDate
    //     });
    // }, [startDate, endDate])
    


    // React.useEffect(()=> {
        
    //     setTableDataIsFetching(dataFetchingStateIsLoading)
    //     if(tableData!== undefined && tableData !== null){
    //         setData(tableData);
    //     }
    // },[tableData, dataFetchingStateIsLoading])



    // filter sidebar id
    const [isOpen, setIsOpen] = React.useState(false);



    // shift clicked
    const handleShiftFilter = (value) => {
        setShift(value);
        if(value.id !== 'all'){
             
            getEmployeeOptions(`?shift_id=${value.id}`);
            getCurrentData({ 
                team_id: value.id,
                start_data: startDate,
                end_date: endDate 
            })
        
        }else{
            getEmployeeOptions(`/`);
            getCurrentData({ 
                start_data: startDate,
                end_date: endDate 
            })
        }
        
    }
 


    // department select
    const handleEmployeeFilter = (value) =>{
        setSelectedEmployee(value);
        if(value.id !== 'all'){
             if(
                shift.id !== 'all'
            ){
                getCurrentData({
                    team_id: shift.id,
                    user_id: value.id,
                    start_data: startDate,
                    end_date: endDate
                })
            }else {
                getCurrentData({ user_id: value.id})
            }   
        }else{
             if(
                shift.id !== 'all'
            ){
                getCurrentData({
                    team_id: shift.id,
                    start_data: startDate,
                    end_date: endDate
                })
            }
        }

    }


   // create responsive item 
    
   

    return(
        <div className="sp1__pp_filter_bar">
            <IncentiveFilterBarItem>
                <JqueryDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate} 
                    defaultSelectedType={defaultSelectedDate}
                /> 
            </IncentiveFilterBarItem>

            
        
            {/* credit/debit */}
            <FilterDropdownItem
                title="Select Shift" 
                selected={shift}
                isLoading = {shiftDataIsLoading}
                items={shifts}
                id="shift"
                inVisible={inVisible}
                setInVisible={setInVisible}
                onClick={handleShiftFilter}
            />

            <FilterDropdownItem
                title="Select Employee"
                id="employee"
                selected={selectedEmployee}
                isLoading={employeeDataIsLoading}
                items={employee}
                inVisible={inVisible}
                setInVisible={setInVisible}
                avatar='image'
                onClick={handleEmployeeFilter}
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
                        
                        

                        {/* credit/debit */}
                        <SidebarFilterDropdownItem
                            title="Select Shift" 
                            miniScreen='visible'
                            selected={shift}
                            isLoading = {shiftDataIsLoading}
                            items={shifts}
                            id="shift"
                            inVisible={inVisible}
                            setInVisible={setInVisible}
                            onClick={handleShiftFilter}
                        />


                        <SidebarFilterDropdownItem
                            title="Select Employee" 
                            miniScreen='visible'
                            id="employee"
                            selected={selectedEmployee}
                            isLoading={employeeDataIsLoading}
                            items={employee}
                            inVisible={inVisible}
                            setInVisible={setInVisible}
                            avatar='image'
                            onClick={handleEmployeeFilter}
                        />
                    </div>
                </div>
                )}
            </div>

        </div>
    )
}


export default IncentiveFilterBar;