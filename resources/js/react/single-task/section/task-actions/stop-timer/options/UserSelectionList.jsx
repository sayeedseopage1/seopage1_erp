import React, { useState } from "react";
import { useUsers } from "../../../../../hooks/useUsers";
import { User } from "../../../../../utils/user-details";
import { Combobox } from "@headlessui/react";
import _ from "lodash";
import { HiOutlineSelector } from "react-icons/hi";

const UserSelectionList = ({ person, setPerson }) => {
    const { users, usersIsFetching } = useUsers();
    const [search, setSearch] = useState("");

    let filteredUsers =
        search === ""
            ? users
            : users?.filter((user) =>
                  _.lowerCase(user.name).includes(_.lowerCase(search))
              );

    return (
        <div className="position-relative w-100 mb-3">
            <Combobox value={person} onChange={setPerson}>
                <Combobox.Button className="position-relative w-100">
                    <Combobox.Input
                        className="w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between"
                        displayValue={(person) => person?.name}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="--"
                    />

                    {/* Selection box icon */}
                    <span
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "5px",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <HiOutlineSelector />
                    </span>
                </Combobox.Button>

                <Combobox.Options
                    className="position-absolute bg-white p-2 shadow w-100"
                    style={{
                        zIndex: "1",
                        maxHeight: "350px",
                        overflowY: "auto",
                    }}
                >
                    {filteredUsers && filteredUsers.length ? (
                        filteredUsers.map((user) => (
                            <UserList key={user.id} user={user} />
                        ))
                    ) : (
                        <div className="task-selection-list-option">
                            {usersIsFetching ? "Loading..." : "Nothing found."}
                        </div>
                    )}
                </Combobox.Options>
            </Combobox>
        </div>
    );
};

export default UserSelectionList;

const UserList = (props) => {
    const user = new User(props.user);

    if (!user?.getRoleId()) return null;
    return (
        <Combobox.Option
            value={user}
            className={({ selected, active }) =>
                selected
                    ? "task-selection-list-option selected"
                    : active
                    ? "task-selection-list-option active"
                    : "task-selection-list-option"
            }
        >
            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                <img
                    src={user?.getAvatar()}
                    alt={user?.name}
                    width={32}
                    height={32}
                    className="rounded-circle"
                />
                <span>{user?.name}</span>
            </div>
        </Combobox.Option>
    );
};
