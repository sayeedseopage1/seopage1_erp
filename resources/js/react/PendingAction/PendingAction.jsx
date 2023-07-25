import React from 'react'
import { Outlet } from 'react-router-dom'

const PendingAction = () => {
  return (
    <div className='p-4'>
        <div className='p-4 bg-white rounded'>
          <h2 className='mb-4'>Required Actions</h2>
          <Outlet />
        </div>
    </div>
  )
}

export default PendingAction