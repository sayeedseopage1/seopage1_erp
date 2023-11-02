import React, { useEffect, useState } from 'react';
import style from "../../../styles/required-actions.module.css";
import dayjs from 'dayjs';
import ReactDatePicker from 'react-datepicker';

const DateField = ({setDate,change}) => {
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');

  useEffect(()=>{
    if (startDate && endDate) {
      setDate({
        startDate:dayjs(startDate).format('DD-MM-YYYY'),
        endDate:dayjs(endDate).format('DD-MM-YYYY'),
      })
    }
  },[startDate,endDate])

  return (
    <div className={style.date_container}>
      <span className={style.date_text}>Date:</span>
      <ReactDatePicker
        className={`${style.date_field} ${change?style.white_bg:style.custom_bg}`}
        maxDate={endDate}
        selected={startDate}
        value={startDate?dayjs(startDate).format('DD-MM-YYYY'):''}
        onChange={(date) => setStartDate(date)}
        placeholderText="Start Date"
      />
        <span className={style.date_text}>To</span>
      <ReactDatePicker
        className={`${style.date_field} ${change?style.white_bg:style.custom_bg}`}
        minDate={startDate}
        selected={endDate}
        value={endDate?dayjs(endDate).format('DD-MM-YYYY'):''}
        onChange={(date) => setEndDate(date)}
        placeholderText="End Date"
      />
    </div>
  );
};

export default DateField;