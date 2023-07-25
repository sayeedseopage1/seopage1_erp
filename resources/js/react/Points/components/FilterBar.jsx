// /* eslint-disable react/prop-types */
// import * as React from 'react';
// import JqueryDateRangePicker from './JqueryDateRangePicker';
// import Dropdown from '../../Insights/ui/Dropdown';
// import _ from 'lodash';
// import SearchBox from '../../Insights/ui/Searchbox';
// import Button from '../../Insights/ui/Button';
// import {
//     useGetDepartmentOptionsMutation,
//     useGetEmployeeOptionsMutation,
//     useGetProjectsOptionsMutation,
//     useGetShiftOptionsMutation,
// } from '../../services/api/FilterBarOptionsApiSlice';
// import { usePointTableDataMutation } from '../../services/api/PointTableDataApiSlice';
// import Tooltip from '../../Insights/ui/Tooltip';


// const PointPageFilterBarItem = ({ children, id = "", className = "" }) => {
//     return (
//         <div id={id} className={`sp1__pp_filter_bar_item ${className}`}>
//             {children}
//         </div>
//     )
// }



// const FilterDropdownItem = ({
//     title,
//     selected,
//     items = [],
//     isLoading,
//     onClick,
//     avatar = false,
//     miniScreen = 'hide',
//     className = "",
//     id,
//     inVisible,
//     setInVisible
// }) => {
//     const [search, setSearch] = React.useState("");
//     const [maxHeight, setMaxHeight] = React.useState(720);


//     const menuHeight = React.useMemo(() => maxHeight, [maxHeight])

//     // set max height
//     React.useEffect(() => {
//         if (window) {
//             if (window.innerHeight < 720) {
//                 setMaxHeight(window.innerHeight - 150);
//             }
//         }
//     }, [menuHeight])


//     const handleClick = (e, value) => {
//         e.preventDefault();
//         if (onClick) {

//             onClick(value)
//         }
//     }

//     return (
//         <div >
//             <PointPageFilterBarItem id={id} className={miniScreen}>
//                 <span>{title}</span>
//                 <Dropdown >
//                     <Dropdown.Toggle className="sp1__pp_filter_dd_toggle">
//                         <Tooltip
//                             text={_.startCase(selected.name)}
//                         >
//                             <>
//                                 {
//                                     selected?.name ?
//                                         selected.name?.length > 11 ?
//                                             _.startCase(selected?.name?.slice(0, 10)) + '...'
//                                             : selected.name
//                                         : ''
//                                 }
//                             </>
//                         </Tooltip>
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu placement='bottom-end' className="sp1__pp_filter_dd">
//                         {
//                             items?.length > 20 &&
//                             <>
//                                 <div className="sp1__pp_filter_dd_search">
//                                     <SearchBox
//                                         value={search}
//                                         onChange={setSearch}
//                                     />
//                                 </div>
//                                 <div className='cnx_divider' />
//                             </>
//                         }



//                         <div className="sp1__pp_menu_items" style={{ maxHeight }}>

//                             {!isLoading && items.length === 0 && <>
//                                 <Dropdown.Item
//                                     className={`sp1__pp_filter_dd_item`}
//                                 >
//                                     Data not found
//                                 </Dropdown.Item>
//                             </>}

//                             {
//                                 isLoading ? (
//                                     <div className=''>
//                                         Loading...
//                                     </div>
//                                 ) : items.length > 0 && <>

//                                     {search.length === 0 && items.length > 1 &&
//                                         <Dropdown.Item
//                                             className={`sp1__pp_filter_dd_item ${selected?.id === 'all' ? 'active' : ""} ${className}`}
//                                             onClick={(e) => handleClick(e, { id: 'all', name: 'All' })}
//                                         >
//                                             All
//                                         </Dropdown.Item>}
//                                     {
//                                         items?.length > 0 && items
//                                             .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
//                                             .map((item) => (
//                                                 <Dropdown.Item
//                                                     key={item.id}
//                                                     className={`sp1__pp_filter_dd_item ${selected?.id === item.id ? 'active' : ""} ${className}`}
//                                                     onClick={(e) => handleClick(e, item)}
//                                                 >
//                                                     {avatar ?
//                                                         item[avatar] ? (
//                                                             <img
//                                                                 src={`/user-uploads/avatar/${item[avatar]}`}
//                                                                 alt={item.name}
//                                                                 style={{
//                                                                     width: 26,
//                                                                     height: 26,
//                                                                     borderRadius: '50%'

//                                                                 }}
//                                                             />

//                                                         ) : <img
//                                                             src={`https://gravatar.com/avatar/${Math.random()}.png?s=200&d=mp`}
//                                                             alt={item.name}
//                                                             style={{
//                                                                 width: 26,
//                                                                 height: 26,
//                                                                 borderRadius: '50%'

//                                                             }}
//                                                         /> : null}
//                                                     {item.name}
//                                                 </Dropdown.Item>
//                                             ))
//                                     }


//                                 </>
//                             }
//                         </div>
//                     </Dropdown.Menu>
//                 </Dropdown>
//             </PointPageFilterBarItem>
//         </div>
//     )
// }


// const SidebarFilterDropdownItem = ({
//     title,
//     selected,
//     items = [],
//     isLoading,
//     onClick,
//     avatar = false,
//     miniScreen = 'hide',
//     className = "",
//     id,
//     inVisible,
//     setInVisible
// }) => {
//     const [search, setSearch] = React.useState("");
//     const [maxHeight, setMaxHeight] = React.useState(720);


//     const menuHeight = React.useMemo(() => maxHeight, [maxHeight])

//     // set max height
//     React.useEffect(() => {
//         if (window) {
//             if (window.innerHeight < 720) {
//                 setMaxHeight(window.innerHeight - 150);
//             }
//         }
//     }, [menuHeight])


//     const handleClick = (e, value) => {
//         e.preventDefault();
//         if (onClick) {
//             onClick(value)
//         }
//     }

//     return (
//         <PointPageFilterBarItem id={id} className="sp1__pp_sidebar_filter_item">
//             <span className='sp1__pp_sidebar_filter_label'>{title}</span>
//             <Dropdown>
//                 <Dropdown.Toggle className="sp1__pp_filter_dd_toggle sp1__pp_sidebar_filter_dd_toggle">
//                     <Tooltip
//                         text={_.startCase(selected.name)}
//                     >
//                         <>
//                             {
//                                 selected?.name ?
//                                     selected.name?.length > 30 ?
//                                         _.startCase(selected?.name?.slice(0, 29)) + '...'
//                                         : selected.name
//                                     : ''
//                             }
//                         </>
//                     </Tooltip>
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu className="sp1__pp_filter_dd">
//                     {
//                         items?.length > 20 &&
//                         <>
//                             <div className="sp1__pp_filter_dd_search">
//                                 <SearchBox
//                                     value={search}
//                                     onChange={setSearch}
//                                 />
//                             </div>
//                             <div className='cnx_divider' />
//                         </>
//                     }



//                     <div className="sp1__pp_menu_items" style={{ maxHeight }}>

//                         {!isLoading && items.length === 0 && <>
//                             <Dropdown.Item
//                                 className={`sp1__pp_filter_dd_item`}
//                             >
//                                 Data not found
//                             </Dropdown.Item>
//                         </>}

//                         {
//                             isLoading ? (
//                                 <div className=''>
//                                     Loading...
//                                 </div>
//                             ) : items.length > 0 && <>

//                                 {search.length === 0 && items.length > 1 &&
//                                     <Dropdown.Item
//                                         className={`sp1__pp_filter_dd_item ${selected?.id === 'all' ? 'active' : ""} ${className}`}
//                                         onClick={(e) => handleClick(e, { id: 'all', name: 'All' })}
//                                     >
//                                         All
//                                     </Dropdown.Item>}
//                                 {
//                                     items?.length > 0 && items
//                                         .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
//                                         .map((item) => (
//                                             <Dropdown.Item
//                                                 key={item.id}
//                                                 className={`sp1__pp_filter_dd_item ${selected?.id === item.id ? 'active' : ""} ${className}`}
//                                                 onClick={(e) => handleClick(e, item)}
//                                             >
//                                                 {avatar ?
//                                                     item[avatar] ? (
//                                                         <img
//                                                             src={`/user-uploads/avatar/${item[avatar]}`}
//                                                             alt={item.name}
//                                                             style={{
//                                                                 width: 26,
//                                                                 height: 26,
//                                                                 borderRadius: '50%'

//                                                             }}
//                                                         />

//                                                     ) : <img
//                                                         src={`https://gravatar.com/avatar/${Math.random()}.png?s=200&d=mp`}
//                                                         alt={item.name}
//                                                         style={{
//                                                             width: 26,
//                                                             height: 26,
//                                                             borderRadius: '50%'

//                                                         }}
//                                                     /> : null}
//                                                 {item.name}
//                                             </Dropdown.Item>
//                                         ))
//                                 }


//                             </>
//                         }
//                     </div>
//                 </Dropdown.Menu>
//             </Dropdown>
//         </PointPageFilterBarItem>
//     )
// }





// const PointPageFilterBar = ({ setData, setPointTableDataIsLoading }) => {
//     const [departments, setDepartments] = React.useState([]);
//     const [shifts, setShifts] = React.useState([]);
//     const [employee, setEmployee] = React.useState([]);
//     const [projects, setProjects] = React.useState([]);


//     const [startDate, setStartDate] = React.useState(null);
//     const [endDate, setEndDate] = React.useState(null);

//     const [inVisible, setInVisible] = React.useState([]);


//     const [shift, setShift] = React.useState({
//         department_id: 1,
//         id: 2,
//         name: "Development morning shift sales"

//     });

//     const [creditOrDebit, setCreditOrDebit] = React.useState(
//         { id: 'earn', name: 'Point Earned' }
//     );

//     const [pointGainedAs, setPointGainedAs] = React.useState({
//         id: 'individual',
//         name: 'Individual'
//     });

//     const [selectedProject, setSelectedProject] = React.useState({
//         id: 'all',
//         name: 'All'
//     });

//     const [selectedEmployee, setSelectedEmployee] = React.useState(
//         {
//             "id": 208,
//             "name": "Mohammad Sayeed Ullah",
//             "image": null
//         }
//     );

//     const [selectedDepartment, setSelectedDepartment] = React.useState({
//         id: 1,
//         name: 'Web Development'
//     });

//     // shifts
//     const [
//         getShiftOptions,
//         {
//             data: shiftsData,
//             isLoading: shiftDataIsLoading
//         }
//     ] = useGetShiftOptionsMutation();


//     // projects
//     const [
//         getProjectsOptions,
//         {
//             data: projectsFilterOptionsData,
//             isLoading: projectsDataIsLoading
//         }
//     ] = useGetProjectsOptionsMutation();

//     // employee 
//     const [
//         getEmployeeOptions,
//         {
//             data: employeeData,
//             isLoading: employeeDataIsLoading
//         }
//     ] = useGetEmployeeOptionsMutation();

//     // department 
//     const [
//         getDepartmentOptions,
//         {
//             data: departmentData,
//             isLoading: departmentDataIsLoading
//         }
//     ] = useGetDepartmentOptionsMutation();


//     const [
//         pointTableData,
//         {
//             data: tableData,
//             isLoading: dataFetchingStateIsLoading
//         }
//     ] = usePointTableDataMutation();

//     const departmentDataMemo = React.useMemo(() => departmentData, [departmentData])
//     const shiftsDataMemo = React.useMemo(() => shiftsData, [shiftsData])
//     const projectsFilterOptionsDataMemo = React.useMemo(() => projectsFilterOptionsData, [projectsFilterOptionsData])
//     const employeeDataMemo = React.useMemo(() => employeeData, [employeeData])


//     // fetch data
//     React.useEffect(() => {
//         getEmployeeOptions(`?department_id=${selectedDepartment.id}&shift_id=${shift.id}`);
//         getProjectsOptions();
//         getDepartmentOptions(``);
//         getShiftOptions(`/${selectedDepartment.id}`);
//     }, []);

//     // initials state
//     React.useEffect(() => {
//         if (employeeData) {
//             setEmployee([...employeeData])
//         }

//         if (projectsFilterOptionsData) {
//             setProjects([...projectsFilterOptionsData])
//         }

//         if (shiftsData) {
//             setShifts([...shiftsData])
//         }

//         if (departmentData) {
//             setDepartments([...departmentData])
//         }

//     }, [employeeDataMemo, projectsFilterOptionsDataMemo, shiftsDataMemo, departmentDataMemo])



//     // React.useEffect(()=> {
//     //     console.log({startDate, endDate})
//     //     pointTableData({
//     //         start_data: startDate,
//     //         end_date: endDate
//     //     })
//     // }, [startDate, endDate])



//     // 
//     React.useEffect(() => {
//         if (startDate && endDate) {
//             pointTableData({
//                 department_id: selectedDepartment.id !== 'all' ? selectedDepartment.id : '',
//                 team_id: shift.id !== 'all' ? shift.id : '',
//                 user_id: selectedEmployee.id !== 'all' ? selectedEmployee.id : '',
//                 start_date: startDate,
//                 end_date: endDate
//             });
//         }
//     }, [startDate, endDate])


//     React.useEffect(() => {

//         setPointTableDataIsLoading(dataFetchingStateIsLoading)
//         if (tableData !== undefined && tableData !== null) {
//             setData([...tableData]);
//         }
//     }, [tableData, dataFetchingStateIsLoading])


//     // const {data: shifts, isLoading: shiftDataIsLoading} = useGetShiftOptionsQuery();
//     // const {data: projects, isLoading: projectDataIsLoading}  = useGetProjectsOptionsQuery();
//     // const {data: employee, isLoading: employeeDataIsLoading} = useGetEmployeeOptionsQuery();
//     // const {data: department, isLoading: departmentDataIsLoading} = useGetDepartmentOptionsQuery();

//     // filter sidebar id
//     const [isOpen, setIsOpen] = React.useState(false);



//     // shift clicked
//     const handleShiftFilter = (value) => {
//         setShift(value);
//         setSelectedEmployee({ id: 'all', name: 'All' });
//         if (value.id !== 'all') {
//             if (selectedDepartment.id !== 'all') {
//                 getEmployeeOptions(`?department_id=${selectedDepartment.id}&shift_id=${value.id}`);
//                 pointTableData({
//                     department_id: selectedDepartment.id,
//                     team_id: value.id,
//                     start_data: startDate,
//                     end_date: endDate
//                 })
//             } else {
//                 getEmployeeOptions(`?shift_id=${value.id}`);
//                 pointTableData({
//                     team_id: value.id,
//                     start_data: startDate,
//                     end_date: endDate
//                 })
//             }
//         } else {
//             if (selectedDepartment.id !== 'all') {
//                 getEmployeeOptions(`?department_id=${selectedDepartment.id}`);
//                 pointTableData({
//                     department_id: selectedDepartment.id,
//                     start_data: startDate,
//                     end_date: endDate
//                 })
//             } else {
//                 getEmployeeOptions(`/`);
//                 pointTableData({
//                     // start_data: startDate,
//                     // end_date: endDate 
//                 })
//             }
//         }

//     }

//     // department select
//     const handleDepartmentFilter = (value) => {
//         setSelectedDepartment(value);
//         setShift({ id: 'all', name: 'All' });
//         setSelectedEmployee({ id: 'all', name: 'All' });

//         if (value.id !== 'all') {
//             getShiftOptions(`/${value.id}`);
//             getEmployeeOptions(`?department_id=${value.id}`);
//             pointTableData({
//                 department_id: value.id,
//                 // start_data: startDate,
//                 // end_date: endDate
//             })
//         } else {
//             getShiftOptions(`/`);
//             getEmployeeOptions(`/`);
//             pointTableData({})
//         }
//     }


//     // department select
//     const handleEmployeeFilter = (value) => {
//         setSelectedEmployee(value);
//         if (value.id !== 'all') {
//             if (
//                 selectedDepartment.id !== 'all' &&
//                 shift.id !== 'all'
//             ) {
//                 pointTableData({
//                     department_id: selectedDepartment.id,
//                     team_id: shift.id,
//                     user_id: value.id,
//                     // start_data: startDate,
//                     // end_date: endDate
//                 })
//             } else if (
//                 shift.id !== 'all'
//             ) {
//                 pointTableData({
//                     team_id: shift.id,
//                     user_id: value.id,
//                     start_data: startDate,
//                     end_date: endDate
//                 })
//             } else {
//                 pointTableData({ user_id: value.id })
//             }
//         } else {
//             if (
//                 selectedDepartment.id !== 'all' &&
//                 shift.id !== 'all'
//             ) {
//                 pointTableData({
//                     department_id: selectedDepartment.id,
//                     team_id: shift.id,
//                     start_data: startDate,
//                     end_date: endDate
//                 })
//             } else if (
//                 shift.id !== 'all'
//             ) {
//                 pointTableData({
//                     team_id: shift.id,
//                     start_data: startDate,
//                     end_date: endDate
//                 })
//             }
//         }

//     }

//    // projects
//    const handleProjectFilter = (value) => {
    
//    }


//     // create responsive item 



//     return (
//         <div className="sp1__pp_filter_bar">
//             <PointPageFilterBarItem>
//                 <JqueryDateRangePicker
//                     startDate={startDate}
//                     endDate={endDate}
//                     setStartDate={setStartDate}
//                     setEndDate={setEndDate}
//                 />
//             </PointPageFilterBarItem>

//             {
//                 Number(window?.Laravel?.user?.role_id) === 1 ? (
//                     <>
//                         {/* shift */}

//                         <FilterDropdownItem
//                             title="Select Department"
//                             selected={selectedDepartment}
//                             isLoading={departmentDataIsLoading}
//                             id="department"
//                             items={departments}
//                             inVisible={inVisible}
//                             setInVisible={setInVisible}
//                             onClick={handleDepartmentFilter}
//                         />


//                         {/* credit/debit */}
//                         <FilterDropdownItem
//                             title="Select Shift"
//                             selected={shift}
//                             isLoading={shiftDataIsLoading}
//                             items={shifts}
//                             id="shift"
//                             inVisible={inVisible}
//                             setInVisible={setInVisible}
//                             onClick={handleShiftFilter}
//                         />


//                         {/* credit/debit */}
//                         <FilterDropdownItem
//                             title="Select Credit/Debit"
//                             selected={creditOrDebit}
//                             items={[
//                                 { id: 'earn', name: 'Point Earned' },
//                                 // { id: 'lost', name: 'Point Lost' }
//                             ]}
//                             id="creditOrDebit"
//                             inVisible={inVisible}
//                             setInVisible={setInVisible}
//                             onClick={setCreditOrDebit}
//                         />


//                         {/* credit/debit */}
//                         <FilterDropdownItem
//                             title="Points gained as"
//                             selected={pointGainedAs}
//                             id="pointGainedAs"
//                             inVisible={inVisible}
//                             setInVisible={setInVisible}
//                             items={[
//                                 {
//                                     id: 'individual',
//                                     name: 'Individual'
//                                 }
//                             ]}
//                             onClick={setPointGainedAs}
//                         />


//                         {/* projects */}
//                         <FilterDropdownItem
//                             title="Select Project"
//                             id="project"
//                             selected={selectedProject}
//                             isLoading={projectsDataIsLoading}
//                             inVisible={inVisible}
//                             setInVisible={setInVisible}
//                             items={projects ? projects.map(project => ({ id: project.id, name: project.project_name })) : []}
//                             onClick={setSelectedProject}
//                         />


//                         <FilterDropdownItem
//                             title="Select Employee"
//                             id="employee"
//                             selected={selectedEmployee}
//                             isLoading={employeeDataIsLoading}
//                             items={employee}
//                             inVisible={inVisible}
//                             setInVisible={setInVisible}
//                             avatar='image'
//                             onClick={handleEmployeeFilter}
//                         />

//                     </>
//                 ) : (
//                     <PointPageFilterBarItem className='border-right-0'>
//                         Showing Data for: <span className='font-weight-bold'>{window?.Laravel?.user?.name}</span>
//                     </PointPageFilterBarItem>
//                 )
//             }


//             <div className='sp1__pp_filter_sidebar_container'>
//                 <div className='sp1__pp_filter_sidebar_toggle' onClick={() => setIsOpen(true)}>
//                     <i className="fa-solid fa-filter"></i>
//                     <span>Filters</span>
//                 </div>


//                 {Number(window?.Laravel?.user?.role_id) === 1 && isOpen && (
//                     <div className='sp1__pp_filter_sidebar'>
//                         <div className='sp1__pp_filter_sidebar_header'>
//                             <span>Filters</span>

//                             <Button
//                                 aria-label="Close"
//                                 variant='tertiary'
//                                 onClick={() => setIsOpen(false)}
//                             >
//                                 <i className="fa-solid fa-xmark"></i>
//                             </Button>
//                         </div>

//                         <div className='sp1__pp_filter_sidebar_items'>
//                             <SidebarFilterDropdownItem
//                                 title="Select Department"
//                                 miniScreen='visible'
//                                 selected={selectedDepartment}
//                                 isLoading={departmentDataIsLoading}
//                                 id="department"
//                                 items={departments}
//                                 inVisible={inVisible}
//                                 setInVisible={setInVisible}
//                                 onClick={handleDepartmentFilter}
//                             />


//                             {/* credit/debit */}
//                             <SidebarFilterDropdownItem
//                                 title="Select Shift"
//                                 miniScreen='visible'
//                                 selected={shift}
//                                 isLoading={shiftDataIsLoading}
//                                 items={shifts}
//                                 id="shift"
//                                 inVisible={inVisible}
//                                 setInVisible={setInVisible}
//                                 onClick={handleShiftFilter}
//                             />


//                             {/* credit/debit */}
//                             <SidebarFilterDropdownItem
//                                 title="Select Credit/Debit"
//                                 miniScreen='visible'
//                                 selected={creditOrDebit}
//                                 items={[
//                                     { id: 'earn', name: 'Point Earned' },
//                                     // { id: 'lost', name: 'Point Lost' }
//                                 ]}
//                                 id="creditOrDebit"
//                                 inVisible={inVisible}
//                                 setInVisible={setInVisible}
//                                 onClick={setCreditOrDebit}
//                             />


//                             {/* credit/debit */}
//                             <SidebarFilterDropdownItem
//                                 title="Points gained as"
//                                 miniScreen='visible'
//                                 selected={pointGainedAs}
//                                 id="pointGainedAs"
//                                 inVisible={inVisible}
//                                 setInVisible={setInVisible}
//                                 items={[
//                                     {
//                                         id: 'individual',
//                                         name: 'Individual'
//                                     }
//                                 ]}
//                                 onClick={setPointGainedAs}
//                             />


//                             {/* projects */}
//                             <SidebarFilterDropdownItem
//                                 title="Select Project"
//                                 miniScreen='visible'
//                                 id="project"
//                                 selected={selectedProject}
//                                 isLoading={projectsDataIsLoading}
//                                 inVisible={inVisible}
//                                 setInVisible={setInVisible}
//                                 items={projects?.map(project => ({ id: project.id, name: project.project_name }))}
//                                 onClick={setSelectedProject}
//                             />


//                             <SidebarFilterDropdownItem
//                                 title="Select Employee"
//                                 miniScreen='visible'
//                                 id="employee"
//                                 selected={selectedEmployee}
//                                 isLoading={employeeDataIsLoading}
//                                 items={employee}
//                                 inVisible={inVisible}
//                                 setInVisible={setInVisible}
//                                 avatar='image'
//                                 onClick={handleEmployeeFilter}
//                             />
//                         </div>
//                     </div>
//                 )}
//             </div>

//         </div>
//     )
// }


// export default PointPageFilterBar;


import React from 'react'

const FilterBar = () => {
    return null;
  return (
    <div>FilterBar</div>
  )
}

export default FilterBar