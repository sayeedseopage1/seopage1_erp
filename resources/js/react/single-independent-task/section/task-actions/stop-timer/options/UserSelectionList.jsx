import React, { useState } from "react";
import { useUsers } from "../../../../../hooks/useUsers";
import { User } from "../../../../../utils/user-details";
import { Combobox } from "@headlessui/react";
import _ from "lodash";
import { HiOutlineSelector } from "react-icons/hi";

const UserSelectionList = ({ person, setPerson, filter, roles=[] }) => {
    const { users, usersIsFetching } = useUsers();
    const [search, setSearch] = useState("");

    let _user = _.filter(users, (user) => !_.isNull(user.role_id));

    if(roles && _.size(roles) > 0){
        _user = _.filter(users, (user) => _.includes(roles, Number(user.role_id))); 
    }else if(filter){
        switch (filter) {
            case 'client':
                _user = _.filter(users, (user) => _.isNull(user.role_id)); 
                break;
            case 'developer': 
                _user = _.filter(users, (user) => _.includes([5, 8, 10], Number(user.role_id))); 
                break;
            default:
                break;
        }
    }

    let filteredUsers =
        search === ""
            ? _user
            : _user?.filter((user) =>
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
                        zIndex: 10,
                        maxHeight: "350px",
                        overflowY: "auto",
                    }}
                >
                    {filteredUsers && filteredUsers.length ? (
                        filteredUsers.map((user) => (
                            <Combobox.Option
                                key={user.id}
                                value={user}
                                className={({ selected, active }) =>
                                selected
                                    ? "task-selection-list-option selected"
                                    : active
                                    ? "task-selection-list-option active"
                                    : "task-selection-list-option"
                            }
                            >
                                {({selected}) => (
                                    <div className="d-flex align-items-center bg-transparent f-14" style={{ gap: "10px" }}>
                                        <img
                                            src={user?.image_url}
                                            alt={user?.name}
                                            width={24}
                                            height={24}
                                            className="rounded-circle"
                                        />
                                        
                                        {selected}
                                        <span className="w-100">{user?.name} <span className="badge badge-success">{user?.employee_detail?.designation?.name}</span></span>

                                        {selected && <span className="ml-auto"> <i className="fa-solid fa-check text-white" /> </span> }
                                    </div>
                                )}
                            </Combobox.Option>
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

// const UserList = (props) => {
//     const user = new User(props.user);

//     if (!user?.getRoleId()) return null;
//     return (
        
//     );
// };
