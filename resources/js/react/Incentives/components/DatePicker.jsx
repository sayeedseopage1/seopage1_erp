import React, { useEffect, useState } from 'react'
import Dropdown from '../../Insights/ui/Dropdown';
import dayjs from 'dayjs';

const DatePicker = ({startDate, endDate, setStartDate, setEndDate, subtract}) => {
    const [year,setYear] = useState(dayjs().format('YYYY'));
    const [start, setStart] = useState(dayjs().format('MMM DD, YYYY'));
    const [end, setEnd] = useState(dayjs().format('MMM DD, YYYY'));

    useEffect(()=> { 
        let s;
        let e;

        if(subtract){
            s = dayjs().subtract(subtract, 'month').startOf('month').format('MMM DD, YYYY');
            e = dayjs().subtract(subtract, 'month').endOf('month').format('MMM DD, YYYY');
            setEndDate(dayjs().subtract(subtract, 'month').endOf('month').format('YYYY-MM-DD'));
            setStartDate(dayjs().subtract(subtract, 'month').startOf('month').format('YYYY-MM-DD'));
        }else{
            s = dayjs().startOf('month').format('MMM DD, YYYY');
            e = dayjs().endOf('month').format('MMM DD, YYYY');
            setEndDate(dayjs().endOf('month').format('YYYY-MM-DD'));
            setStartDate(dayjs().startOf('month').format('YYYY-MM-DD'));
        }

        setStart(s);
        setEnd(e);  
    }, [])

    const handleDatePick = (start, end) => {
        const s = dayjs(start).format('MMM DD, YYYY');
        const e = dayjs(end).format('MMM DD, YYYY'); 
        setStart(s);
        setEnd(e);
        setEndDate(dayjs(end).format('YYYY-MM-DD'));
        setStartDate(dayjs(start).format('YYYY-MM-DD'));
    }

    const prevYear = () => {
        setYear(prev => Number(prev) - 1);
    }

    const nextYear = () => {
        setYear(prev => Number(prev) + 1);
    }
  return (
    <div>
        <Dropdown>
            <Dropdown.Toggle>
                {start} to {end}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <div className='position-relative'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <button aria-label='prev' className='btn btn-sm f-18' onClick={prevYear}>«</button>
                        <div className='font-weight-bold'>
                            {year}
                        </div>
                        <button aria-label='next' className='btn btn-sm f-18' onClick={nextYear}>»</button>
                    </div>
                    <ul className='sp1_inc_month_wrapper'>
                        {[...Array(12)].map((_, i) => {
                            let d = dayjs().year(year).month(i);
                            let m = dayjs().year(year).month(i).format('MMM');
                            return <Dropdown.Item 
                                        key={m}
                                        onClick={() => 
                                        handleDatePick(dayjs(d).startOf('month').format('YYYY-MM-DD'), 
                                        dayjs(d).endOf('month').format("YYYY-MM-DD"))} 
                                        className={`sp1_inc_month ${dayjs(startDate).format('MMM') === m ? 'active': ''}`}>
                                {m}
                            </Dropdown.Item>
                        })}
                    </ul>
                </div>
            </Dropdown.Menu>
        </Dropdown>
        
    </div>
  )
}

export default DatePicker
