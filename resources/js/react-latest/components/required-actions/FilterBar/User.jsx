import React, { useState } from "react";
import style from "../../../styles/required-actions.module.css";
import { useUsers } from "../../../hooks/useUsers";
import { useEffect } from "react";
import { useCallback } from "react";
import { FaAngleDown } from "react-icons/fa";
import { User as USER } from "../../../utils/user-details";
import Person from "../utils/Person";
import _ from "lodash";

const currentUser = new USER(window.Laravel.user);

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
        const filteredUser = _.orderBy(
            _.uniqBy([...users], "name"),
            ["name"],
            ["asc"]
        ).filter((user) => {
            if (
                // user.role_id === 1 ||
                user.role_id === 2 ||
                user.role_id === 3 ||
                // user.role_id === 8 ||
                user.id === currentUser.id ||
                !user.role_id
            ) {
                return false;
            } else {
                return true;
            }
        });
        // console.log(filteredUser);
        setAllUser([window.Laravel.user, ...filteredUser]);
    }, [users]);

    useEffect(() => {
        if (searchUser) {
            const filter = [...allUser].filter((user) => {
                // console.log(user.name.toLowerCase(), searchUser.toLowerCase());
                return user.name
                    .toLowerCase()
                    .includes(searchUser.toLowerCase());
            });
            setFilteredUser(filter);
        } else {
            setFilteredUser(allUser);
        }
    }, [allUser, searchUser]);

    return (
        <div className={`${style.user_container}`}>
            <span className={style.user_label}>Employee:</span>

            {/* drop down */}
            <div className={`dropdown`}>
                <div
                    className={`dropdown-toggle ${style.user_field} ${
                        change ? style.white_bg : style.custom_bg
                    }`}
                    // type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                >
                    {/* {userState?.id === window.Laravel.user.id
                        ? "Admin"
                        : userState?.name} */}
                    {userState?.name}
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
                    <section
                        className={`${style.user_field_dropdown_container_btn_group}`}
                    >
                        {/* <button
                            onClick={() => {
                                setSearchUser("");
                                setUser(window.Laravel.user);
                            }}
                            className={`dropdown-item ${style.user_field_dropdown_container_btn}`}
                        >
                            <Person name={"current user"} avatar={'http://127.0.0.1:8000/user-uploads/avatar/avatar_blank.png'}/>
                        </button> */}
                        {!isFetching && [...filteredUser].length ? (
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
                                        {/* {user.name} */}
                                        <Person
                                            name={user.name}
                                            avatar={user.image_url}
                                        />
                                        {user?.id === currentUser?.id ? (
                                            <div
                                                className={`${style.user_field_dropdown_container_current_user_indicator}`}
                                            >
                                                It's you
                                            </div>
                                        ) : user?.role_id === 1 ||
                                          user?.role_id === 8 ||
                                          user?.role_id === 11 ? (
                                            <div
                                                className={`${style.user_field_dropdown_container_current_user_indicator}`}
                                            >
                                                Admin
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </button>
                                );
                            })
                        ) : (
                            <button
                                className={`dropdown-item ${style.user_field_dropdown_container_btn}`}
                            >
                                <span>No user found</span>
                            </button>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default User;
