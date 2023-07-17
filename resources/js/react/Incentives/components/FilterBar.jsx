import React, {useState, useEffect, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useUsers } from '../../hooks/useUsers';
import { useGetAllFilterOptionQuery } from '../../services/api/FilterBarOptionsApiSlice';
import { setFilterState } from '../../services/features/pointPageFilterSlice';
import DatePicker from './DatePicker';
import FilterItem from '../../Points/components/FilterItem';
import { User } from '../../utils/user-details';
import ShiftFilterOption from '../../Points/components/ShiftFilterOption';
import EmployeeFilterOptions from '../../Points/components/EmployeeFilterOptions'; 
import Button from '../../Insights/ui/Button';
import dayjs from 'dayjs';

const FilterBar = ({ handleDataRequest }) => {
    
    // sidebar
    const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);
  const { departments, shift, employees } = useSelector(s => s.pointPageFilterOption);
  const { getUserById } = useUsers();
  // shift
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);

  // employees 
  const [employeeOptions,setEmployeeOptions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
 
  //filter
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  

  // dispatch
  const dispatch = useDispatch();
  // logged user
  const loggedUser = new User(window?.Laravel?.user);

  const {data, isFetching} = useGetAllFilterOptionQuery('');

  // fetch all filter options
  useEffect(() => {
    if(data && !isFetching){
        dispatch(setFilterState(data));
    }
  }, [isFetching]);

  

  // 
  const shiftOptions = () => {
    if(departments.length){
        const d = departments[0];
        let _shift = shift?.filter(s => s.department_id === d.id && s.id !== 1);
        setShifts(_shift);
        handleShiftSelection(_shift[0]);
    }
  }

  useEffect(() => { shiftOptions() }, [])
  useEffect(() => { shiftOptions() }, [departments])


//   get emplyees 
  const getEmployees = (shift) => {
    let users = [];

    if(shift.members){
        let members = shift?.members?.split(',')?.filter(d => d !== '');
        members?.map( m => {
            let user = getUserById(m);
            users.push({
                id: user?.id,
                name: user?.name,
                image_url: user?.image_url,
            });
        }); 
    }

    return users;
}

  // handle shift selection
  const handleShiftSelection = (d) => {
    const _employees = getEmployees(d);
    if(_employees){
        setEmployeeOptions(_employees);
        setSelectedEmployee(_employees[0]);
    }
    setSelectedShift(d);
  }
   
  // handle filter

  const _employeeMemo = useMemo(() => selectedEmployee, [selectedEmployee]); 
  const _startDate = useMemo(() => startDate, [startDate]);
  const _endDate = useMemo(() => endDate, [endDate]);


  useEffect(() => {
    let admin = loggedUser?.getRoleId() === 1;
    if(_startDate && _endDate && _employeeMemo && admin){
        handleDataRequest({
            _startDate,
            _endDate,
            employee_id: _employeeMemo?.id
        })
    }
  }, [_employeeMemo, _startDate, _endDate]);



  useEffect(() => {
    const admin = loggedUser?.getRoleId() !== 1;
    if(_startDate && _endDate && admin){
        handleDataRequest({
            _startDate,
            _endDate,
            employee_id: loggedUser?.getId()
        })
    }
  }, [_startDate, _endDate])
  


  return (
    <div className='sp1__pp_filter_bar'>
        <FilterItem> 
            <DatePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                subtract={1}
            />
        </FilterItem>
 
        {
            Number(loggedUser?.getRoleId()) === 1 ? (
                <>
                    <FilterItem className='hide'>
                        <ShiftFilterOption
                            data={shifts || []}
                            loading = {!shifts.length}
                            selected={selectedShift}
                            onSelect={handleShiftSelection}
                        />
                    </FilterItem>

                    <FilterItem className='hide'>
                        <EmployeeFilterOptions
                            selected={selectedEmployee}
                            setSelectedEmployee={setSelectedEmployee}
                            data={employeeOptions}
                            loading = {!employeeOptions.length}
                            onSelect={() => {}}
                        />
                    </FilterItem>
                </>
            ) :
            <FilterItem className='border-right-0'>
                Showing Data for: <span className='font-weight-bold'>{loggedUser?.getName()}</span>
            </FilterItem>
        }


         {/* sidebar */}
         <div className='sp1__pp_filter_sidebar_container'>
                <div
                    className='sp1__pp_filter_sidebar_toggle'
                    onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                    <i className="fa-solid fa-filter"></i>
                    <span>Filters</span>
                </div>

                {
                    Number(loggedUser?.getRoleId()) === 1 && sidebarIsOpen && (
                        <aside className='sp1__pp_filter_sidebar'>
                            <div className='sp1__pp_filter_sidebar_header'>
                                <span>Filters</span>

                                <Button
                                    aria-label="Close"
                                    variant='tertiary'
                                    onClick={() => setSidebarIsOpen(false)}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </Button>
                            </div>

                            <div className="sp1__pp_filter_sidebar_items">
                                <FilterItem className='w-100 border-right-0'>
                                    <ShiftFilterOption
                                        data={shifts || []}
                                        loading = {!shifts.length}
                                        selected={selectedShift}
                                        onSelect={handleShiftSelection}
                                        sidebarItem= {true}
                                    /> 
                                </FilterItem>

                                <FilterItem className='w-100 border-right-0'>
                                    <EmployeeFilterOptions
                                        selected={selectedEmployee}
                                        setSelectedEmployee={setSelectedEmployee}
                                        data={employeeOptions}
                                        loading = {!employeeOptions.length}
                                        onSelect={() => {}}
                                        sidebarItem= {true}
                                    /> 
                                </FilterItem>
                            </div>
                        </aside>
                    )
                }
            </div>

    </div>
  )
}

export default FilterBar