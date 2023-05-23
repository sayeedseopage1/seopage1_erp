import * as React from 'react';
import ReactDOM from 'react-dom';
import JqueryDateRangePicker from './JqueryDateRangePicker';
import PersonFilter from './PersonFilter';



export default function TimeLogTableFilterBar (){
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    let content = null;
    
    return null;

    content =  <div className='d-flex bg-white p-1'>
        <div className='border-right pr-1'>
            <JqueryDateRangePicker 
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
        </div>

        <PersonFilter
            title="Employee"
        />






    </div>

    if(!content) {
        return null;
    }

    return ReactDOM.createPortal(
        content,
        document.getElementById('timeLogTableFilterBar')
    )
}