import React, { useState } from "react";
import FilterBar from "./FilterBar/FilterBar";
import _ from "lodash";
import getCardData from "../../__fake_data__/required-actions/data";
import RequiredActionsCard from "./RequiredActionCards/RequiredActionsCard";
import LiveRequiredAction from "./ActiveRequiredAction/LiveRequiredAction";
import ExpireRequiredAction from "./ActiveRequiredAction/ExpireRequiredAction";
import style from '../../styles/required-actions.module.css';

const ActiveRequiredActions = () => {
    const [action,setAction] = useState('live')

    const onFilter = (data) => {
        console.log(data, _.pickBy(data, Boolean));
    };

    return (
        <div>
            {/* <div style={{ backgroundColor: "white" }}>
                <FilterBar onFilter={onFilter} />
            </div> */}

            {/* actions => live , expired */}
            <section className={style.active_action_container}>
                <button
                    onClick={() => setAction("live")}
                    className={`${style.active_action_btn} ${
                        action === "live"
                            ? style.active_action_btn_active
                            : style.active_action_btn_inactive
                    }`}
                >
                    Live
                </button>
                <button
                    onClick={() => setAction("expired")}
                    className={`${style.active_action_btn} ${
                        action === "expired"
                            ? style.active_action_btn_active
                            : style.active_action_btn_inactive
                    }`}
                >
                    Expired ({5})
                </button>
            </section>

            <div className={style.active_outlet_container} style={{ backgroundColor: "#F7FAFF" }}>
                <FilterBar onFilter={onFilter} change={true} />
                {action === "live" && <LiveRequiredAction />}
                {action === "expired" && <ExpireRequiredAction />}
            </div>
        </div>
    );
};

export default ActiveRequiredActions;
