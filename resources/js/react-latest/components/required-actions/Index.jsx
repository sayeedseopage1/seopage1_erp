import React, { createContext, useCallback, useContext } from "react";
import style from "../../styles/required-actions.module.css";
import { useState } from "react";
import ActiveRequiredActions from "./ActiveRequiredActions";
import PastRequiredActions from "./PastRequiredActions";
import Pagination, { PaginationContext } from "./Pagination";
import { ToastContainer } from "react-toastify";
import { User as USER } from "../../utils/user-details";
import User from "./FilterBar/User";

const RefreshContext = createContext({
    refresh: false,
    setRefresh: () => {},
    setLoading: () => {},
    user:{},
});
export function useRefresh() {
    const { refresh, handleRefresh, setLoading, user } = useContext(RefreshContext);
    return { refresh, handleRefresh, setLoading, user };
}

const currentUser = new USER(window.Laravel.user);

export default function Index() {
    // pagination related state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const [perPageItem, setPerPageItem] = useState(1);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const [action, setAction] = useState("active");

    const handleRefresh = useCallback(() => {
        setRefresh((prev) => !prev);
    }, [setRefresh]);

    return (
        <RefreshContext.Provider value={{ refresh, handleRefresh, setLoading, user }}>
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
                <div className="sp1_tlr_tbl_container">
                    {/* heading */}
                    {/* <h1 className={style.heading}>Required Actions</h1> */}

                    {/* actions => active , past */}
                    <section className={style.container}>
                        <div className={style.action_container}>
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
                        </div>

                        <div className={`${style.refresh_container}`}>
                            {(currentUser.getRoleId() === 1 ||
                                currentUser.getRoleId() === 8) && (
                                <User
                                    user={user}
                                    setUser={setUser}
                                    change={false}
                                />
                            )}
                            <button
                                onClick={handleRefresh}
                                className="btn btn-primary"
                                type="button"
                                disabled={loading}
                                style={{
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                }}
                            >
                                {loading && (
                                    <span
                                        className="spinner-border spinner-border-sm mr-1"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                )}
                                Refresh
                            </button>
                        </div>
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
                <ToastContainer />
            </PaginationContext.Provider>
        </RefreshContext.Provider>
    );
}
