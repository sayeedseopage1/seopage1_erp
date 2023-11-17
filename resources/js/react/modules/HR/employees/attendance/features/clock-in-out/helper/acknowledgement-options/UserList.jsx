import { Listbox } from "@headlessui/react";
import axios from "axios";
import _ from "lodash";
import React, { useDeferredValue } from "react";
import { HiOutlineSelector } from "react-icons/hi";
import Avatar from "../../../../../../../../global/Avatar";
import Switch from "../../../../../../../../global/Switch";
import { Flex } from "../../../../../../../../global/styled-component/Flex";
import Search from "../../../../components/Search";

/**
 * * This component responsible for rendering User list
 * * for client list add props roles = [-1];
 */

const UserList = ({ value, onChange, roles = [] }) => {
    const [isLoading, setIsLoading] = React.useState(true);

    return (
        <React.Fragment>
            <div className="position-relative w-100 mb-3">
                <Listbox value={value} onChange={onChange}>
                    <Listbox.Button className="position-relative w-100 py-2 bg-transparent border rounded-sm pl-2 pr-1">
                        <Flex justifyContent="space-between" alignItem="center">
                            <span>{value?.name ?? "--"}</span>
                            <HiOutlineSelector />
                        </Flex>
                    </Listbox.Button>
                    <List
                        roles={roles}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                </Listbox>
            </div>
        </React.Fragment>
    );
};

const List = ({ isLoading, setIsLoading, roles }) => {
    const [users, setUsers] = React.useState([]);
    const [search, setSearch] = React.useState("");

    // fetch data
    const fetchData = async () => {
        try {
            await axios.get("/get-users/all").then((res) => {
                let _users = [];

                if (_.size(roles) === 0) {
                    _users = _.filter(
                        res.data,
                        (user) => user.role_id !== null
                    );
                } else {
                    _users = _.filter(res.data, (user) =>
                        _.includes(roles, Number(user.role_id))
                    );
                }

                if (_.includes(roles, -1)) {
                    _users = _users.concat(
                        _.filter(res.data, (user) => user.role_id === null)
                    );
                }
                setUsers([..._users]);
            });

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    // user search handler
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const query = useDeferredValue(search); // optimizing searching

    // filter user by search text
    const filterUserBySearchText = (users, query) => {
        const filteredData = _.filter(users, (user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );
        return filteredData;
    };

    return (
        <Listbox.Options
            className="position-absolute bg-white p-2 shadow w-100"
            style={{
                zIndex: 10,
            }}
        >
            <Switch>
                <Switch.Case condition={isLoading}>
                    <div className="task-selection-list-option">Loading...</div>
                </Switch.Case>

                <Switch.Case condition={!isLoading && _.size(users) === 0}>
                    <div className="task-selection-list-option">Empty</div>
                </Switch.Case>

                <Switch.Case condition={!isLoading && _.size(users) !== 0}>
                    <div>
                        {/* search box */}
                        <Search
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search person by name"
                            className="mb-3"
                        />
                        <div
                            style={{
                                maxHeight: "350px",
                                overflowY: "auto",
                            }}
                        >
                            {_.map(
                                filterUserBySearchText(users, query),
                                (user) => (
                                    <Listbox.Option
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
                                        {({ selected }) => (
                                            <Flex alignItem="center" gap="10px">
                                                <Avatar
                                                    type="circle"
                                                    src={user.image_url}
                                                    alt=""
                                                    width={24}
                                                    height={24}
                                                />
                                                <span className="w-100">
                                                    {user?.name}
                                                    <span className="badge badge-success ml-2">
                                                        {
                                                            user
                                                                ?.employee_detail
                                                                ?.designation
                                                                ?.name
                                                        }
                                                    </span>
                                                </span>

                                                {selected && (
                                                    <span className="ml-auto">
                                                        <i className="fa-solid fa-check text-white" />{" "}
                                                    </span>
                                                )}
                                            </Flex>
                                        )}
                                    </Listbox.Option>
                                )
                            )}
                        </div>
                    </div>
                </Switch.Case>
            </Switch>
        </Listbox.Options>
    );
};

export default UserList;
