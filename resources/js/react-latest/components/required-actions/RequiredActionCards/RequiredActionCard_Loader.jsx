import React from "react";
import { Placeholder } from "../../../ui/Placeholder";
import style from "../../../styles/required-action-card.module.css";

const RequiredActionCard_Loader = () => {
    return (
        <div className={style.card_container}>
            {/* card details */}
            <div className={style.details_aside}>
                {/* card body text */}
                <article className={style.article}>
                    {/* card title */}
                    <div className={style.title}>
                        <Placeholder />
                    </div>

                    {/* card subtitle */}
                    <div className={style.subtitle}>
                        <Placeholder />
                        {/* <Placeholder /> */}
                    </div>

                    {/* card info */}
                    {/* <div className={style.info}>
                        <span>
                            <Placeholder width="200px" />
                        </span>
                    </div> */}

                    {/* <Placeholder width="500px" /> */}
                    {/* <Placeholder width="500px" /> */}
                </article>

                {/* clipboard area */}
                <aside className={style.aside}>
                    {/* action expire time  */}
                    <div className={`${style.action_expire_time} shadow-sm`}>
                        <Placeholder width="50px" />
                        <Placeholder width="100px" />
                    </div>

                    {/* action count down */}
                    <div className={`${style.action_count_down} shadow-sm`}>
                        <Placeholder width="50px" />
                        <Placeholder width="100px" />
                    </div>
                </aside>
            </div>

            <div className={style.action}>
                <Placeholder width="100px" height="30px" />
                <Placeholder width="100px" height="30px" />
                <Placeholder width="100px" height="30px" />
                <Placeholder width="100px" height="30px" />
            </div>
        </div>
    );
};

export default RequiredActionCard_Loader;
