import React, { useEffect, useState } from "react";
import style from "../../../styles/required-actions.module.css";
import Search from "./Search";
import Show from "./Show";
import DateField from "./DateField";
import View from "./View";
import { usePagination } from "../Pagination";
import { User as USER } from "../../../utils/user-details";
import User from "./User";

const currentUser = new USER(window.Laravel.user);

const FilterBar = ({ onFilter, change = false }) => {
    const { setPerPageItem, setCurrentPage } = usePagination();

    // ------- filter state (start) -------
    const [search, setSearch] = useState("");
    const [date, setDate] = useState({});
    const [show, setShow] = useState(0);
    const [view, setView] = useState("all");
    // const [user, setUser] = useState(null);
    // ------- filter state (end) -------

    useEffect(() => {
        // console.log({search});
        onFilter({
            search,
            date,
            view,
            // user
        });
    }, [
        search,
        date,
        view, 
        //user
    ]);

    useEffect(() => {
        if (search) {
            setView("all");
        }
    }, [search]);

    useEffect(() => {
        setSearch("");
        setView("all");
    }, [date]);

    useEffect(() => {
        setSearch("");
    }, [view]);

    // useEffect(() => {
    //     setSearch("");
    //     console.log({user});
    // }, [user]);

    useEffect(() => {
        setPerPageItem(show);
        setCurrentPage(1);
    }, [show]);

    return (
        <div className={style.filterbar_container}>
            <Search search={search} setSearch={setSearch} change={change} />
            <DateField setDate={setDate} change={change} />
            <Show show={show} setShow={setShow} change={change} />
            {/* <View view={view} setView={setView} change={change} /> */}
            {/* {(currentUser.getRoleId() === 1 ||
                currentUser.getRoleId() === 8) && (
                <User user={user} setUser={setUser} change={change} />
            )} */}
        </div>
    );
};

export default FilterBar;
