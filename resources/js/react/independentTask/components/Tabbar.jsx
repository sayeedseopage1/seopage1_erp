import _ from 'lodash';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User } from '../../utils/user-details';
import Switch from '../../global/Switch';

const Tabbar = () => {
  const auth = new User(window?.Laravel?.user);
  const isDev = _.includes([5], auth?.getRoleId());
  const isProjectManager = auth?.getRoleId() === 4;
  const navigate = useNavigate();

  //console.log(isProjectManager)

  useEffect(() => {
    if(isDev){
      navigate('/my-tasks', {replace: true})
    }
  }, [])

  return (
    <Switch>
      <div className='d-flex flex-wrap align-items-center px-3 mb-2' style={{gap: '10px'}}>
        <Switch.Case condition={!isDev}>
          <NavLink to='/tasks' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"} >
              Tasks
          </NavLink>
          <Switch.Case condition={!isProjectManager}>
            <NavLink to='/subtasks' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"}>
              Subtasks
            </NavLink>
          </Switch.Case>
        </Switch.Case>
         
        <Switch.Case condition={isDev}>
          <NavLink to='/my-tasks' className={({isActive})=> isActive ? "sp1_tlr_tab active": "sp1_tlr_tab"}>
            My Tasks
          </NavLink> 
        </Switch.Case> 
    </div>
    </Switch>
  )
}

export default Tabbar
