import React from "react";
import style from "../../../../../styles/required-action-card.module.css";
import { MdPendingActions } from "react-icons/md";

export default function RequiredActionsCard_SalesLead_Past({data}){
    return (
        <div className={style.card_container}>
            {/* card details */}
            <div className={style.details_aside}>
                {/* card body text */}
                <article className={style.article}>
                    {/* card title */}
                    <p className={style.title}>"{data.title}"</p>

                    {/* card subtitle */}
                    <p className={style.subtitle}>
                        "
                        <span className={style.highlight}>
                            {data.deliverables}
                        </span>{" "}
                        for project{" "}
                        <span className={style.highlight}>{data.task}</span>{" "}
                        (PM: <span className={style.highlight}>{data.pm}</span>)
                        from
                    </p>

                    {/* card info */}
                    <div className={style.info}>
                        <span>
                            Client :{" "}
                            <span className={style.highlight}>
                                {data.client}
                            </span>
                        </span>
                        <span>needs to be authorized"</span>
                    </div>
                </article>

                {/* clipboard area */}
                <aside className={style.aside}>
                    {/* action expire time  */}
                    <div className={`${style.action_expire_time} shadow-sm`}>
                        <MdPendingActions
                            className={style.action_expire_time_icon}
                        />
                        <article>
                            <span>{`${5}:${10} pm`}</span>
                            <br />
                            <span>{`${15}-${3}-${2023}`}</span>
                        </article>
                    </div>

                    {/* action count down */}
                    <div className={`${style.action_count_down} shadow-sm`}>
                        <span className={style.highlight}>Time Left</span>
                        <article>{`${3} hrs ${2} min ${5} sec`}</article>
                    </div>
                </aside>
            </div>

            <div className={style.authorized_info}>
                <span>
                    Authorized By :{" "}
                    <span className={style.highlight}>Rajat Chakraborty</span>
                </span>
                <span className={style.authorized_time}>
                    At 20-12-2022 10:20 Pm
                </span>
            </div>
        </div>
    );
};