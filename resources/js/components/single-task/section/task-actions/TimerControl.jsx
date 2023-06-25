import React , {useState, useEffect}from 'react'
import Button from '../../components/Button';

const TimerControl = () => {
    const [timerStart, setTimerStart] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    let interval = null;
    if (timerStart) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        if (seconds === 60) {
          setMinutes((minutes) => minutes + 1);
          setSeconds(0);
        }
        if (minutes === 60) {
          setHours((hours) => hours + 1);
          setMinutes(0);
        }
        if (hours === 24) {
          setDays((days) => days + 1);
          setHours(0);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerStart]);

  const timer = () => {
    let sec = seconds < 10 ? `0${seconds}` : seconds;
    let min = minutes < 10 ? `0${minutes}` : minutes;
    let hr = hours < 10 ? `0${hours}` : hours;
    let dy = days < 10 ? `0${days}` : days;
    return `${hr}:${min}:${sec}`;
  };


  // start timer
  const startTimer = e => {
    e.preventDefault();
    setTimerStart(true);
  }

  // stop timer
    const stopTimer = (e) => {
        e.preventDefault();
        setTimerStart(false);
        setDays(0);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
    } 

  return (
    <>
        {
            !timerStart ? (
                <Button 
                    variant='tertiary'
                    onClick={startTimer}
                    className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                >
                    <i className="fa-solid fa-circle-play"></i>
                    Start Timer
                </Button>
            ): (
                <>
                    <Button 
                        variant='tertiary'
                        className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                    >
                        <i className="fa-solid fa-stopwatch"></i>
                        <span className="d-inline ml-1">{timer()}</span>
                    </Button>


                    <Button 
                        variant='tertiary'
                        onClick={stopTimer}
                        className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                    >
                        <i className="fa-solid fa-pause"></i>
                        <span className="d-inline ml-1">Stop Timer</span>
                    </Button>
                </>
            )
        }


        
    </>
  )
}

export default TimerControl