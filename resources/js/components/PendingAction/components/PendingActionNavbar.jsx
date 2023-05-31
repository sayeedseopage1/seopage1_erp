import React from 'react'
import { NavLink } from 'react-router-dom'

const PendingActionNavbar = () => {
  return (
    <div className='d-flex align-items-center gap-2'>
        <ul className="nav">
          <li className="nav-item">
            <NavLink 
              to="/active"
              className={({isActive}) => isActive ? 'nav-link sp1_pa_nav_link active' : 'nav-link sp1_pa_nav_link'}
            >
              Active
            </NavLink>
          </li>


          <li className="nav-item">
            <NavLink 
              to="/past"
              className={({isActive}) => isActive ? 'nav-link sp1_pa_nav_link active' : 'nav-link sp1_pa_nav_link'}
            >
              Past
            </NavLink>
          </li>
        </ul>
    </div>
  )
}

export default PendingActionNavbar