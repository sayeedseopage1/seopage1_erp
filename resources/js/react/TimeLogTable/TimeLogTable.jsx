import * as React from 'react'
import { Outlet } from 'react-router-dom'

const TimeLogTable = () => {
  return (
    <React.Fragment>
        <Outlet />
    </React.Fragment>
  )
}

export default TimeLogTable