import React from "react";

const StopWatch = ({ time=0, className = "", run = false, ...props }) => {
    const [seconds, setSeconds] = React.useState(time);

    React.useEffect(() => {
        let interval = null;
        //   interval for timer
        if(run){
            interval = setInterval(() => {
                setSeconds((s) => s + 1);
            }, 1000);
        }else {
            clearInterval(interval);
            setSeconds(0)
        }
        return () => clearInterval(interval); // clear interval
    }, [run]);

    // render time
    const renderTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const s = Math.floor((seconds % 3600) % 60);

        // format
        let sec = s < 10 ? `0${s}` : s;
        let min = minutes < 10 ? `0${minutes}` : minutes;
        let hr = hours < 10 ? `0${hours}` : hours;
        return `${hr}:${min}:${sec}`;
    };

    return (
        <div className={`d-flex align-items-center ${className}`} {...props}>
            {renderTime(seconds)}
        </div>
    );
};

export default StopWatch;
