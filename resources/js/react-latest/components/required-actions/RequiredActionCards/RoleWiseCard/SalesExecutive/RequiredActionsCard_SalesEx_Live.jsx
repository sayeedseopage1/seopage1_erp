import React, { useCallback } from "react";
import style from "../../../../../styles/required-action-card.module.css";
import dayjs from "dayjs";
import useTimer from "../../../../../hooks/useTimer";
import ShowTimer from "./sales-executive/ShowTimer";
import ActionsButton from "./sales-executive/ActionsButton";

export default function RequiredActionsCard_PM_Live({data}) {
    const {time} = useTimer(dayjs(data.created_at).add(Number(data?.timeframe), "hours"),{
        stopOnExpire: true,
    })


    const handleMessageShow = useCallback((type)=>{
      if (type === "PDA" || type === "DTDA") {
        return `${data.message} ${time.h || 0} hour ${time.m || 0} minutes`;
      } else {
        return data.message;
      }
    },[time,data])


    return (
        <div className={style.card_container}>
            {/* card details */}
            <div className={style.details_aside}>
                {/* card body text */}
                <article className={style.article}>
                    {/* card title */}
                    <p className={style.title}>{data.heading}</p>

                    {/* card subtitle */}
                    <p className={style.subtitle}>
                        <span
                            dangerouslySetInnerHTML={{ __html: handleMessageShow(data?.code) }}
                        />{" "}
                        {/* from */}
                    </p>

                    {/* card info */}
                    {/* <div className={style.info}>
                        <span>
                            Client :{" "}
                            <a className={style.highlight} href={`http://127.0.0.1:8000/account/clients/${data.client_id}`}>
                                {data.client_name}
                            </a>
                        </span>
                        <span>needs to be authorized"</span>
                    </div> */}
                </article>

                {/* clipboard area */}
                <aside className={style.aside}>
                    {/* action expire time  */}
                    <div className={`${style.action_expire_time} shadow-sm`}>
                        {/* <MdPendingActions
                            className={style.action_expire_time_icon}
                        /> */}
                        {/* <article> */}
                            <span className={style.highlight}>
                                Generated on
                            </span>
                            <span>
                                {dayjs(data.created_at).format("DD-MM-YYYY")}
                                {" "}
                                {dayjs(data.created_at).format("h a")}
                            </span>
                        {/* </article> */}
                    </div>

                    {/* action count down */}
                    <ShowTimer
                        targetTime={dayjs(data.created_at).add(Number(data.timeframe), "hours")}
                    />
                </aside>
            </div>

            <div className={style.action}>
                <ActionsButton data={data} />
            </div>
        </div>
    );
}