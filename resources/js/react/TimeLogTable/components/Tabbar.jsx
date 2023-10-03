import { NavLink } from 'react-router-dom';

const Tabbar = () => {
  return (
    <div className='d-flex flex-wrap align-items-center px-3 mb-2' style={{gap: '10px'}}>
       <NavLink to='/employee-wise' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"}>Employee Wise</NavLink>
       <NavLink to='/project-wise' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"} > Project Wise </NavLink>
       <NavLink to='/task-wise' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"}> Task Wise </NavLink> 
       <NavLink to='/time-log-history' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"}> Time Log History </NavLink> 
       <NavLink to='/daily-submission' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"}> Daily Submission </NavLink>
    </div>
  )
}

export default Tabbar