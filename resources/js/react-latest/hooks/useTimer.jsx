import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

export default function useTimer(
  targetTime,
  { stopOnExpire } = { stopOnExpire: true }
) {
  const intervalRef = useRef();
  const [refresh, setRefresh] = useState(false);
  const [time, setTime] = useState({});

  // getTime(targetTime);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(() => {
        const time = convertTime(getTime(targetTime).diff(dayjs()));
        if (stopOnExpire) {
          if (time[2] < 0) {
            clearInterval(intervalRef.current);
            return [0, 0, 0];
          } else {
            return time;
          }
        } else {
          return time;
        }
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [refresh, targetTime, stopOnExpire]);

  const convertTime = (millisecond) => {
    // const ms = millisecond%1000;
    let second = Math.trunc(millisecond / 1000);
    let minute = Math.trunc(second / 60);
    second = second % 60;
    let hour = Math.trunc(minute / 60);
    minute = minute % 60;

    return [hour, minute, second];
  };

  return {
    stopTimer: () => clearInterval(intervalRef.current),
    startTimer: () => setRefresh((prev) => !prev),
    time: {
      h: Math.abs(time[0]),
      m: Math.abs(time[1]),
      s: Math.abs(time[2]),
      expired: time[2] < 0
    }
  };
}

function getTime(time) {
  if (time) {
    return dayjs(time);
  } else {
    return dayjs();
  }
}
