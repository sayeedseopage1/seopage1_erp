import _ from 'lodash';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User } from '../../utils/user-details';

const Tabbar = () => {
  const auth = new User(window?.Laravel?.user);
  const isDev = _.includes([5], auth?.getRoleId());
  const navigate = useNavigate();

  useEffect(() => {
    if(isDev){
      navigate('/my-tasks', {replace: true})
    }
  }, [])

  return (
    <div className='d-flex flex-wrap align-items-center px-3 mb-2' style={{gap: '10px'}}>
        {!isDev && <NavLink to='/' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"} > 
          Tasks
       </NavLink>} 
       {
        isDev ?
          <NavLink to='/my-tasks' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"}> 
            My Tasks
          </NavLink> :
          <NavLink to='/subtasks' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"}> 
            Subtasks
         </NavLink> 
       }  
    </div>
  )
}

export default Tabbar