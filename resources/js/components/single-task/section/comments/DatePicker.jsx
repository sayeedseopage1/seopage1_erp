import * as React from 'react';
import DatePicker from 'react-datepicker';

const DatePickerComponent = ({date, setDate}) => {

  return ( 
        <DatePicker 
            selected={date}
            dateFormat='dd-MM-yyyy'
            onChange={(d) => setDate(d)} 
            className='w-100 border-0 py-2'
        />  
  )
}

export default DatePickerComponent;
