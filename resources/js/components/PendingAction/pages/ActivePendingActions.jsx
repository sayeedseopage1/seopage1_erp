import * as React from 'react'
import PendingActionNavbar from '../components/PendingActionNavbar';
import JqueryDateRangePicker from '../components/JqueryDateRangePicker';

const ActivePendingActions = () => {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);


  return (
    <React.Fragment>
       <div className='d-flex align-items-center'>
            <PendingActionNavbar />
             <JqueryDateRangePicker
                
             />
       </div>
    </React.Fragment> 
  )
}

export default ActivePendingActions