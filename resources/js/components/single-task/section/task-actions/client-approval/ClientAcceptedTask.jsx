import React from 'react'
import Button from '../../../components/Button'

const ClientAcceptedTask = ({task}) => {
  return (
    <React.Fragment>
        <Button 
            variant='success'
            className='d-flex align-items-center mr-2 border-success'
        >
            <i className="fa-solid fa-check"></i>
            <span className="d-inline ml-1">Client Has Accepted This Task</span>
        </Button>
    </React.Fragment>
  )
}

export default ClientAcceptedTask