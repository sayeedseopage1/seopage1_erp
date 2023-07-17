import React, { useEffect, useState } from 'react';
import Dropdown from '../../Insights/ui/Dropdown';
import { CompareDate } from '../../utils/dateController';

const DatePicker = ({ startDate, endDate, setStartDate, setEndDate, subtract, type = 'monthly' }) => {
  const dayjs = new CompareDate();

  const [year, setYear] = useState(dayjs.dayjs().format('YYYY'));
  const [start, setStart] = useState(dayjs.dayjs().format('MMM DD, YYYY'));
  const [end, setEnd] = useState(dayjs.dayjs().format('MMM DD, YYYY'));

  useEffect(() => {
    let s;
    let e;

    if (subtract) {
      s = dayjs.dayjs().subtract(subtract, 'month').startOf('month').format('MMM DD, YYYY');
      e = dayjs.dayjs().subtract(subtract, 'month').endOf('month').format('MMM DD, YYYY');
      setEndDate(dayjs.dayjs().subtract(subtract, 'month').endOf('month').format('YYYY-MM-DD'));
      setStartDate(dayjs.dayjs().subtract(subtract, 'month').startOf('month').format('YYYY-MM-DD'));
    } else {
      s = dayjs.dayjs().startOf('month').format('MMM DD, YYYY');
      e = dayjs.dayjs().endOf('month').format('MMM DD, YYYY');
      setEndDate(dayjs.dayjs().endOf('month').format('YYYY-MM-DD'));
      setStartDate(dayjs.dayjs().startOf('month').format('YYYY-MM-DD'));
    }

    setStart(s);
    setEnd(e);
  }, [subtract]);


useEffect(() => {
    let s;
    let e;
    if(type === 'monthly'){
      s = dayjs.dayjs().startOf('month').format('MMM DD, YYYY');
      e = dayjs.dayjs().endOf('month').format('MMM DD, YYYY');
      setEndDate(dayjs.dayjs().endOf('month').format('YYYY-MM-DD'));
      setStartDate(dayjs.dayjs().startOf('month').format('YYYY-MM-DD'));
    }else if(type === 'quarterly'){
      s = dayjs.dayjs().startOf('quarter').format('MMM DD, YYYY');
      e = dayjs.dayjs().endOf('quarter').format('MMM DD, YYYY');
      setEndDate(dayjs.dayjs().endOf('quarter').format('YYYY-MM-DD'));
      setStartDate(dayjs.dayjs().startOf('quarter').format('YYYY-MM-DD'));
    }else if(type === 'yearly'){
        s = dayjs.dayjs().startOf('year').format('MMM DD, YYYY');
        e = dayjs.dayjs().endOf('year').format('MMM DD, YYYY');
        setEndDate(dayjs.dayjs().endOf('year').format('YYYY-MM-DD'));
        setStartDate(dayjs.dayjs().startOf('year').format('YYYY-MM-DD'));
    }
 
    setStart(s);
    setEnd(e);
}, [type])

  const handleDatePick = (start, end) => {
    const s = dayjs.dayjs(start).format('MMM DD, YYYY');
    const e = dayjs.dayjs(end).format('MMM DD, YYYY');
    setStart(s);
    setEnd(e);
    setEndDate(dayjs.dayjs(end).format('YYYY-MM-DD'));
    setStartDate(dayjs.dayjs(start).format('YYYY-MM-DD'));
  };

  const prevYear = () => {
    setYear((prev) => Number(prev) - 1);
  };

  const nextYear = () => {
    setYear((prev) => Number(prev) + 1);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle>
          {start} to {end}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className='position-relative'>
            <div className='d-flex align-items-center justify-content-between'>
              <button aria-label='prev' className='btn btn-sm f-18' onClick={prevYear}>
                «
              </button>
              <div className='font-weight-bold'>{year}</div>
              <button aria-label='next' className='btn btn-sm f-18' onClick={nextYear}>
                »
              </button>
            </div>
            <ul className='sp1_inc_month_wrapper'>
              {type === 'monthly' &&
                [...Array(12)].map((_, i) => {
                  const d = dayjs.dayjs().year(year).month(i);
                  const m = dayjs.dayjs().year(year).month(i).format('MMM');
                  return (
                    <Dropdown.Item
                      key={m}
                      onClick={() =>
                        handleDatePick(
                          dayjs.dayjs(d).startOf('month').format('YYYY-MM-DD'),
                          dayjs.dayjs(d).endOf('month').format('YYYY-MM-DD')
                        )
                      }
                      className={`sp1_inc_month ${
                        dayjs.dayjs(startDate).format('MMM') === m ? 'active' : ''
                      }`}
                    >
                      {m}
                    </Dropdown.Item>
                  );
                })}

              {type === 'quarterly' &&
                [...Array(4)].map((_, i) => {
                  const startMonth = i * 3;
                  const endMonth = startMonth + 2;
                  const start = dayjs.dayjs().year(year).month(startMonth).startOf('month').format('MMM');
                  const end = dayjs.dayjs().year(year).month(endMonth).endOf('month').format('MMM');

                  return (
                    <Dropdown.Item
                      key={`${start}-${end}`}
                      onClick={() =>
                        handleDatePick(
                          dayjs.dayjs().year(year).month(startMonth).startOf('month').format('YYYY-MM-DD'),
                          dayjs.dayjs().year(year).month(endMonth).endOf('month').format('YYYY-MM-DD')
                        )
                      }
                      className={`sp1_inc_month ${
                        dayjs.dayjs(startDate).format('MMM') === start ? 'active' : ''
                      }`}
                    >
                      Q{i + 1}
                    </Dropdown.Item>
                  );
                })}

              {type === 'yearly' && (
                <Dropdown.Item
                  key={`full-year`}
                  onClick={() =>
                    handleDatePick(
                      dayjs.dayjs().year(year).startOf('year').format('YYYY-MM-DD'),
                      dayjs.dayjs().year(year).endOf('year').format('YYYY-MM-DD')
                    )
                  }
                  className={`sp1_inc_month w-100 ${
                    dayjs.dayjs(startDate).format('MMM') === 'Jan' ? 'active' : ''
                  }`}
                >
                  Full Year
                </Dropdown.Item>
              )}
            </ul>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DatePicker