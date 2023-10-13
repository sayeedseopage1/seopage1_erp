import * as React from 'react';
import DatePicker from 'react-datepicker';

const DatePickerComponent = ({date, selected, setDate, minDate, maxDate, placeholderText}) => {

  return (
        <DatePicker
            selected={date}
            dateFormat='dd-MM-yyyy'
            onChange={(d) => setDate(d)}
            className='w-100 border-0 py-2'
            minDate={minDate}
            maxDate={maxDate}
            placeholderText={placeholderText}
        />
  )
}

export default DatePickerComponent;
