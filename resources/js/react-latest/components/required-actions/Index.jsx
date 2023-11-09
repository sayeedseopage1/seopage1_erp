import React, { createContext, useContext } from "react";
import style from "../../styles/required-actions.module.css";
import { useState } from "react";
import ActiveRequiredActions from "./ActiveRequiredActions";
import PastRequiredActions from "./PastRequiredActions";
import Pagination, { PaginationContext } from "./Pagination";

const RefreshContext = createContext({
    refresh: false,
    setRefresh: () => true,
});
export function useRefresh() {
    const { refresh, setRefresh } = useContext(RefreshContext);
    return { refresh, setRefresh };
}

export default function Index() {
    // pagination related state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const [perPageItem, setPerPageItem] = useState(1);
    const [refresh, setRefresh] = useState(false);

    const [action, setAction] = useState("active");

    return (
        <RefreshContext.Provider value={{refresh,setRefresh}}>
            <PaginationContext.Provider
                value={{
                    currentPage,
                    setCurrentPage,
                    totalItem,
                    setTotalItem,
                    perPageItem,
                    setPerPageItem,
                }}
            >
                <div
                    className="sp1_tlr_tbl_container"
                    style={{
                        minHeight: "50vh",
                    }}
                >
                    {/* heading */}
                    <h1 className={style.heading}>Required Actions</h1>

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

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "right",
                            padding: "20px 0 30px",
                        }}
                    >
                        <Pagination />
                    </div>
                </div>
            </PaginationContext.Provider>
        </RefreshContext.Provider>
    );
}
