import React, { useState } from "react";
import style from "../../../styles/required-actions.module.css";
import { useUsers } from "../../../hooks/useUsers";
import { useEffect } from "react";
import { useCallback } from "react";
import { FaAngleDown } from "react-icons/fa";

const User = ({ user: userState, setUser, change }) => {
    const { users, usersIsFetching: isFetching } = useUsers();
    const [allUser, setAllUser] = useState([]);
    const [filteredUser, setFilteredUser] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    // console.log({ users });

    useEffect(() => {
        setUser(window.Laravel.user);
    }, []);

    useEffect(() => {
        const filteredUser = [...users].filter((user) => {
            if (
                user.role_id === 1 ||
                user.role_id === 2 ||
                user.role_id === 3 ||
                user.role_id === 8 ||
                !user.role_id
            ) {
                return false;
            } else {
                return true;
            }
        });
        // console.log(filteredUser);
        setAllUser(filteredUser);
    }, [users]);

    useEffect(() => {
        if (searchUser) {
            const filter = [...allUser].filter((user) => {
                // console.log(user.name.toLowerCase(), searchUser.toLowerCase());
                return user.name.toLowerCase().includes(searchUser.toLowerCase());
            });
            setFilteredUser(filter);
        } else {
            setFilteredUser(allUser);
        }
    }, [allUser, searchUser]);

    return (
        <div className={`${style.user_container}`}>
            <span className={style.user_label}>Employee:</span>
            {/* <select
                value={userState?.id}
                onChange={(e) => {
                    setUser(() => {
                        if (window.Laravel.user.id === Number(e.target.value)) {
                            return window.Laravel.user;
                        } else {
                            return showUser().find(
                                (user) => user.id === Number(e.target.value)
                            );
                        }
                    });
                }}
                className={`${style.user_field} ${
                    change ? style.white_bg : style.custom_bg
                }`}
                // defaultValue={"Admin"}
            >
                <option value={window.Laravel.user.id}>Admin</option>
                {!isFetching &&
                    showUser().map((user) => {
                        return (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        );
                    })}
            </select> */}

            {/* drop down */}
            <div className={`dropdown `}>
                <div
                    className={`dropdown-toggle ${style.user_field} ${
                        change ? style.white_bg : style.custom_bg
                    }`}
                    // type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                >
                    {userState?.id === window.Laravel.user.id
                        ? "Admin"
                        : userState?.name}
                    <FaAngleDown className={`${style.user_field_down_arrow}`} />
                </div>
                <div
                    className={`dropdown-menu ${style.user_field_dropdown_container}`}
                >
                    <input
                        type="text"
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        className={`${style.user_field_dropdown_container_search}`}
                        placeholder="Search user..."
                    />
                    {/* <button
                        className={`dropdown-item ${style.user_field_dropdown_container_btn}`}
                    >
                        Action
                    </button>
                    <button
                        className={`dropdown-item ${style.user_field_dropdown_container_btn}`}
                    >
                        Another action
                    </button> */}
                    <section
                        className={`${style.user_field_dropdown_container_btn_group}`}
                    >
                        <button
                            onClick={() => {
                                setSearchUser("");
                                setUser(window.Laravel.user);
                            }}
                            className={`dropdown-item ${style.user_field_dropdown_container_btn}`}
                        >
                            Admin
                        </button>
                        {!isFetching &&
                            [...filteredUser].map((user) => {
                                return (
                                    // <option key={user.id} value={user.id}>
                                    //     {user.name}
                                    // </option>
                                    <button
                                        key={user.id}
                                        onClick={() => {
                                            setSearchUser("");
                                            setUser(user);
                                        }}
                                        className={`dropdown-item ${style.user_field_dropdown_container_btn}`}
                                    >
                                        {user.name}
                                    </button>
                                );
                            })}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default User;
