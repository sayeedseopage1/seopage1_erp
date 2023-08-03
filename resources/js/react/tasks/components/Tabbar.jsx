import { NavLink } from 'react-router-dom';

const Tabbar = () => {
  return (
    <div className='d-flex flex-wrap align-items-center px-3 mb-2' style={{gap: '10px'}}>
       <NavLink to='/' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"} > 
          Tasks
       </NavLink>
       <NavLink to='/subtasks' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"}> 
        Subtasks 
       </NavLink>  
    </div>
  )
}

export default Tabbar