import React from "react";
import style from "../../../../../styles/required-action-card.module.css";
import ActionsButton from "./lead-dev-components/ActionsButton";
import dayjs from "dayjs";

export default function RequiredActionsCard_LeadDev_Past({data}){
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
                            dangerouslySetInnerHTML={{ __html: data.message }}
                        />{" "}
                        {/* from */}
                    </p>

                    {/* card info */}
                    {/* <div className={style.info}>
                        <span>
                            Client :{" "}
                            <span className={style.highlight}>
                                {data.client}
                            </span>
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

                    {/* action authorized on */}
                    <div className={`${style.action_count_down} shadow-sm`}>
                        {/* <MdPendingActions
                            className={style.action_expire_time_icon}
                        /> */}
                        {/* <article> */}
                            <span className={style.highlight}>
                                Authorized on
                            </span>
                            <span>
                                {dayjs(data.authorized_at).format("DD-MM-YYYY")}
                                {" "}
                                {dayjs(data.authorized_at).format("h a")}
                            </span>
                        {/* </article> */}
                    </div>
                </aside>
            </div>

            <div className={style.authorized_info}>
                <span>
                    Authorized By :{" "}
                    <a href={`/account/employees/${data.authorized_by}`} target="_blank" className={style.highlight}>{data.authorize_by_name}</a>
                </span>
                <span className={style.authorized_time}>
                    at {dayjs(data.authorized_at).format("DD-MM-YYYY h:mm a")}
                </span>
            </div>

            {data.button && (
                <div className={style.action}>
                    <ActionsButton data={data} />
                </div>
            )}
        </div>
    );
};