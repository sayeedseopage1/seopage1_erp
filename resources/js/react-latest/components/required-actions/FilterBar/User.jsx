import React from "react";
import style from "../../../styles/required-actions.module.css";
import { useUsers } from "../../../hooks/useUsers";
import { useEffect } from "react";
import { useCallback } from "react";

const User = ({ user:userState, setUser, change }) => {
    const { users, usersIsFetching: isFetching } = useUsers();
    // console.log({ users });

    useEffect(() => {
        setUser(window.Laravel.user);
    }, []);

    const showUser = useCallback(() => {
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
        return filteredUser;
    }, [users]);

    return (
        <div className={style.user_container}>
            <span className={style.user_label}>Employee:</span>
            <select
                value={userState?.id}
                onChange={(e) =>{
                  setUser(()=>{
                      if (window.Laravel.user.id === Number(e.target.value)) {
                        return window.Laravel.user;
                      } else {
                        return showUser().find((user) => user.id === Number(e.target.value));
                      } 
                  })
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
            </select>
        </div>
    );
};

export default User;
