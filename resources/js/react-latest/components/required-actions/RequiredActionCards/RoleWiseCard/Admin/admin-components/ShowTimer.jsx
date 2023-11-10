import { useEffect } from "react";
import useTimer from "../../../../../../hooks/useTimer";
import style from "../../../../../../styles/required-action-card.module.css";
import dayjs from "dayjs";


// timer showing clipboard
export default function ShowTimer({ targetTime }){
  const { time } = useTimer(targetTime, {
      stopOnExpire: true,
  });

  useEffect(() => {
      console.log({
          targetTime: dayjs(targetTime).format("DD-MM-YYYY HH:mm:ss"),
      });
      // console.log(time);
  }, []);

  return (
      <div className={`${style.action_count_down} shadow-sm`}>
          <span className={style.highlight}>Time Left</span>
          <article>{`${time.h || 0} hrs ${time.m || 0} min ${
              time.s || 0
          } sec`}</article>
      </div>
  );
};