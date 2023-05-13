/* eslint-disable react/prop-types */
import * as React from 'react';
import JqueryDateRangePicker from '../../Points/components/JqueryDateRangePicker';
import Dropdown from '../../Insights/ui/Dropdown';
import _ from 'lodash';
import SearchBox from '../../Insights/ui/Searchbox';
import Button from '../../Insights/ui/Button';
import { 
    useGetDepartmentOptionsMutation,  
    useGetEmployeeOptionsMutation,  
    useGetProjectsOptionsMutation,  
    useGetShiftOptionsMutation, 
} from '../../services/api/FilterBarOptionsApiSlice';
import { usePointTableDataMutation } from '../../services/api/PointTableDataApiSlice';


const IncentivesFilterBarItem = ({children, className=""}) => {
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
    isLoading,
    onClick,
    avatar = false,
    miniScreen='hide',
    className= "",
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
            console.log(value)
            onClick(value)
        }
    }
  

    

    return (
        <IncentivesFilterBarItem className={miniScreen}>
            <span>{title}</span>
            <Dropdown>
                <Dropdown.Toggle className="sp1__pp_filter_dd_toggle">
                    {
                        selected?.name ?
                        selected.name?.length > 11 ? 
                        _.startCase(selected?.name?.slice(0, 10)) + '...'
                        : selected.name
                        : ''
                    }
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
                                                {(avatar && item[avatar]) ?(
                                                    <img 
                                                        src={item[avatar]}
                                                        alt={item.name}
                                                        style={{
                                                            width: 26,
                                                            height: 26,
                                                            borderRadius: '50%'
                                                            
                                                        }}
                                                    />

                                                ) : null}
                                                {item.name}
                                            </Dropdown.Item>
                                        ))
                                    }
                                
                                
                                </>
                            }
                        </div>                
                </Dropdown.Menu>
            </Dropdown>
        </IncentivesFilterBarItem>
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





const IncentivesFilterBar = ({setData, setPointTableDataIsLoading}) => {
    const [departments, setDepartments] = React.useState([]);
    const [shifts, setShifts] = React.useState([]);
    const [employee, setEmployee] = React.useState([]);
    const [projects, setProjects] = React.useState([]);


    const [startDate, setStartDate] = React.useState(null); 
    const [endDate, setEndDate] = React.useState(null);




    const [shift, setShift] = React.useState({
        id: 'all',
        name: 'All'
    });

    const [creditOrDebit, setCreditOrDebit] = React.useState(
        { id: 'earn', name: 'Point Earned' }
    );

    const [pointGainedAs, setPointGainedAs] = React.useState({
        id: 'individual',
        name: 'Individual'
    });

    const [selectedProject, setSelectedProject] = React.useState({
        id: 'all',
        name: 'All'
    });

    const [selectedEmployee, setSelectedEmployee] = React.useState({
        id: 'all',
        name: 'All'
    });

    const [selectedDepartment, setSelectedDepartment] = React.useState({
        id: 'all',
        name: 'All'
    });


    // shifts
    const [
        getShiftOptions,
        {
            data: shiftsData,
            isLoading: shiftDataIsLoading
        }
    ] = useGetShiftOptionsMutation();


    // projects
    const [
        getProjectsOptions,
        {
            data: projectsFilterOptionsData,
            isLoading: projectsDataIsLoading
        }
    ] = useGetProjectsOptionsMutation();

    // employee 
    const [
        getEmployeeOptions,
        {
            data: employeeData,
            isLoading: employeeDataIsLoading 
        }
    ] = useGetEmployeeOptionsMutation();

     // department 
     const [
        getDepartmentOptions,
        {
            data: departmentData,
            isLoading: departmentDataIsLoading 
        }
    ] = useGetDepartmentOptionsMutation();


    const [
        pointTableData,
        {
            data: tableData,
            isLoading: dataFetchingStateIsLoading
        }
    ] = usePointTableDataMutation();

    const departmentDataMemo = React.useMemo(() => departmentData, [departmentData])
    const shiftsDataMemo = React.useMemo(() => shiftsData, [shiftsData])
    const projectsFilterOptionsDataMemo = React.useMemo(() => projectsFilterOptionsData, [projectsFilterOptionsData])
    const employeeDataMemo = React.useMemo(() => employeeData, [employeeData])


    // fetch data
    React.useEffect(()=> {
        getEmployeeOptions(``);
        getProjectsOptions('');
        getDepartmentOptions('');
        getShiftOptions('');
    }, []);

    // initials state
    React.useEffect(() => {
        if(employeeData){
            setEmployee([...employeeData])
        }

        if(projectsFilterOptionsData){
            setProjects([...projectsFilterOptionsData])
        }

        if(shiftsData){
            setShifts([...shiftsData])
        }

        if(departmentData){
            setDepartments([...departmentData])
        }

    }, [employeeDataMemo, projectsFilterOptionsDataMemo, shiftsDataMemo, departmentDataMemo])



    // React.useEffect(()=> {
    //     console.log({startDate, endDate})
    //     pointTableData({
    //         start_data: startDate,
    //         end_date: endDate
    //     })
    // }, [startDate, endDate])



    // 
    React.useEffect(()=> {
        pointTableData({});
    }, [])


    React.useEffect(()=> {
        
        setPointTableDataIsLoading(dataFetchingStateIsLoading)
        if(tableData!== undefined && tableData !== null){
            setData([...tableData]);
        }
    },[tableData, dataFetchingStateIsLoading])


    // const {data: shifts, isLoading: shiftDataIsLoading} = useGetShiftOptionsQuery();
    // const {data: projects, isLoading: projectDataIsLoading}  = useGetProjectsOptionsQuery();
    // const {data: employee, isLoading: employeeDataIsLoading} = useGetEmployeeOptionsQuery();
    // const {data: department, isLoading: departmentDataIsLoading} = useGetDepartmentOptionsQuery();

    // filter sidebar id
    const [isOpen, setIsOpen] = React.useState(false);



    // shift clicked
    const handleShiftFilter = (value) => {
        setShift(value);
        if(value.id !== 'all'){
            if(selectedDepartment.id !== 'all'){
                getEmployeeOptions(`/${selectedDepartment.id}/${value.id}`);
                pointTableData({
                    department_id: selectedDepartment.id,
                    team_id: value.id ,
                    // start_data: startDate,
                    // end_date: endDate
                })
            }else {
                getEmployeeOptions(`/null/${value.id}`);
                pointTableData({ 
                    team_id: value.id,
                    // start_data: startDate,
                    // end_date: endDate 
                })
            }
        }else{
            if(selectedDepartment.id !== 'all'){
                getEmployeeOptions(`/${selectedDepartment.id}/`);
                pointTableData({
                    department_id: selectedDepartment.id,
                    // start_data: startDate,
                    // end_date: endDate
                })
            }else {
                getEmployeeOptions(`/`);
                pointTableData({ 
                    // start_data: startDate,
                    // end_date: endDate 
                })
            }
        }
        
    }

    // department select
    const handleDepartmentFilter = (value) =>{
        setSelectedDepartment(value);
        if(value.id !== 'all'){
            getShiftOptions(`/${value.id}`);
            getEmployeeOptions(`/${value.id}`);
            pointTableData({
                department_id: value.id,
                // start_data: startDate,
                // end_date: endDate
            })
        } else {
            getShiftOptions(`/`);
            getEmployeeOptions(`/`);
            pointTableData({})
        }
    }


    // department select
    const handleEmployeeFilter = (value) =>{
        setSelectedEmployee(value);
        if(value.id !== 'all'){
            if(
                selectedDepartment.id !== 'all' && 
                shift.id !== 'all'
            ){
                pointTableData({
                    department_id: selectedDepartment.id ,
                    team_id: shift.id,
                    user_id: value.id,
                    // start_data: startDate,
                    // end_date: endDate
                })
            }else if(
                shift.id !== 'all'
            ){
                pointTableData({
                    team_id: shift.id,
                    user_id: value.id,
                    // start_data: startDate,
                    // end_date: endDate
                })
            }else {
                pointTableData({ user_id: value.id})
            }   
        }else{
            if(
                selectedDepartment.id !== 'all' && 
                shift.id !== 'all'
            ){
                pointTableData({
                    department_id: selectedDepartment.id ,
                    team_id: shift.id,
                    // start_data: startDate,
                    // end_date: endDate
                })
            }else if(
                shift.id !== 'all'
            ){
                pointTableData({
                    team_id: shift.id,
                    // start_data: startDate,
                    // end_date: endDate
                })
            }
        }

    }


    

   

    return(
        <div className="sp1__pp_filter_bar">
            <IncentivesFilterBarItem>
                <JqueryDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate} 
                /> 
            </IncentivesFilterBarItem>

            {/* shift */}
            
            <FilterDropdownItem
                title="Select Department" 
                selected={selectedDepartment} 
                isLoading={departmentDataIsLoading}
                id="department"
                items={departments}
                onClick={handleDepartmentFilter}
            />
            

            {/* credit/debit */}
            <FilterDropdownItem
                title="Select Shift" 
                selected={shift}
                isLoading = {shiftDataIsLoading}
                items={shifts}
                onClick={handleShiftFilter}
            />


            {/* credit/debit */}
            <FilterDropdownItem
                title="Select Credit/Debit" 
                selected={creditOrDebit}
                items={[
                    { id: 'earn', name: 'Point Earned' },
                    // { id: 'lost', name: 'Point Lost' }
                ]}
                onClick={setCreditOrDebit}
            />


            {/* credit/debit */}
            <FilterDropdownItem
                title="Points gained as" 
                selected={pointGainedAs}
                items={[
                    { id: 'individual',
                    name: 'Individual'}
                ]}
                onClick={setPointGainedAs}
            />


            {/* projects */}
            <FilterDropdownItem
                title="Select Project" 
                selected={selectedProject}
                isLoading={projectsDataIsLoading}
                items={projects?.map(project => ({id: project.id, name: project.project_name}))}
                onClick={setSelectedProject}
            />


             <FilterDropdownItem
                title="Select Employee" 
                selected={selectedEmployee}
                isLoading={employeeDataIsLoading}
                items={employee}
                avatar='image_url'
                onClick={handleEmployeeFilter}
            />

            

            {/* <div className='sp1__pp_filter_sidebar_container'>
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
            </div> */}

        </div>
    )
}


export default IncentivesFilterBar;