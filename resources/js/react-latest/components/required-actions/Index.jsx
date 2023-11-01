import React from "react";
import style from "../../styles/required-actions.module.css";
import { useState } from "react";
import ActiveRequiredActions from "./ActiveRequiredActions";
import PastRequiredActions from "./PastRequiredActions";

const Index = () => {
    const [action, setAction] = useState("active");

    return (
        <div
            className="sp1_tlr_tbl_container"
            style={{
                minHeight: "50vh",
            }}
        >
            {/* heading */}
            <h1>Required Actions</h1>

            {/* actions => active , past */}
            <section className={style.action_container}>
                <button
                    onClick={() => setAction("active")}
                    className={`${style.btn} ${
                        action === "active"
                            ? style.btn_active
                            : style.btn_inactive
                    }`}
                >
                    Active
                </button>
                <button
                    onClick={() => setAction("past")}
                    className={`${style.btn} ${
                        action === "past"
                            ? style.btn_active
                            : style.btn_inactive
                    }`}
                >
                    Past
                </button>
            </section>

            <div className={style.outlet_container}>
                {action === "active" && <ActiveRequiredActions />}
                {action === "past" && <PastRequiredActions />}
            </div>
        </div>
    );
};

export default Index;
