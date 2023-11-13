
import dayjs from 'dayjs';
import React from 'react';

/**
 *
 * * This component responsible for showing the current time and day name
 */


const ShowClock = ({className}) => {
  const [date, setDate] = React.useState() ;
  React.useEffect(() => {
    let interval = setInterval(() => {
        const currentTime = dayjs();
        setDate(currentTime);
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [])


  return(
    <div className={className}>
        <div className='display-time'>
            {dayjs(date).format('hh:mm A')}
        </div>
        <div className='display-day'>
            {dayjs(date).format('dddd')}
        </div>
    </div>
  )
}

export default ShowClock



