import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { addAssigneeUsers } from "../services/assigneeSlice";
import axios from "axios";
import Search from "../../UI/form/Search";
import _ from "lodash";

const AssigneeForDropdown = ({ assigneeFor, setAssigneeFor, assigneeType }) => {
    const [search, setSearch] = useState("");
    const [defaultSelected, setDefaultSelected] = useState("");
    const { users, teams } = useSelector((s) => s.assignee);
    const dispatch = useDispatch();

    // initials state
    useEffect(() => {
        setAssigneeFor({
            id: 0,
            name: `Select ${assigneeType}`,
        });
    }, [assigneeType]);

    // initial state
    useEffect(() => {
        if (users.length > 0) {
            setDefaultSelected(users[0].name);
        } else if (teams.length > 0) setDefaultSelected(teams[0].name);
    }, [users, teams]);

    // fetch data
    useEffect(() => {
        if (assigneeType === "User" && users.length === 0) {
            const fetch = async () => {
                const res = await axios.get("/get-users");
                if (res) {
                    dispatch(addAssigneeUsers(res.data));
                }
            };

            fetch();
            return;
        }

        if (assigneeType === "Team" && teams.length === 0) {
            // teams fetching here....
            setDefaultSelected(res.data[0].name);
        }
    }, []);

    // handle selection
    const handleSelection = (value) => {
        setAssigneeFor && setAssigneeFor(value);
    };

    return (
        <div className="w-100">
            <Dropdown>
                <Dropdown.Toggle className="sp1__asf--toggle">
                    {assigneeFor.name}
                </Dropdown.Toggle>
                <Dropdown.Menu className="sp1__asf--menu">
                    <Search value={search} onChange={setSearch} />
                    <hr className="my-2" />
                    {assigneeType === "User" ? (
                        users.length > 0 ? (
                            users
                                .filter((u) =>
                                    _.toLower(u.name).includes(
                                        _.toLower(search)
                                    )
                                )
                                .map((u) => (
                                    <Dropdown.Item
                                        key={u.id}
                                        className={`sp1__asf--item ${
                                            defaultSelected === u.name
                                                ? "hover"
                                                : ""
                                        }`}
                                        onMouseOver={() =>
                                            setDefaultSelected(u.name)
                                        }
                                        onClick={() =>
                                            handleSelection({
                                                id: u.id,
                                                name: u.name,
                                            })
                                        }
                                    >
                                        <span>{u.name}</span>
                                        {u.name === assigneeFor.name && (
                                            <i className="fa-solid fa-check" />
                                        )}
                                    </Dropdown.Item>
                                ))
                        ) : (
                            <Dropdown.Item>loading...</Dropdown.Item>
                        )
                    ) : null}

                    {/* if teams */}
                    {assigneeType === "Team" ? (
                        teams.length > 0 ? (
                            teams
                                .filter((t) =>
                                    _.toLower(t.name).includes(
                                        _.toLower(search)
                                    )
                                )
                                .map((t) => (
                                    <Dropdown.Item
                                        key={t.id}
                                        className={`sp1__asf--item ${
                                            defaultSelected === t.name
                                                ? "hover"
                                                : ""
                                        }`}
                                        onMouseOver={() =>
                                            setDefaultSelected(t.name)
                                        }
                                        onClick={() =>
                                            handleSelection({
                                                id: t.id,
                                                name: t.name,
                                            })
                                        }
                                    >
                                        <span> {t.name}</span>
                                        {t.name === assigneeFor.name && (
                                            <i className="fa-solid fa-check" />
                                        )}
                                    </Dropdown.Item>
                                ))
                        ) : (
                            <Dropdown.Item>Loading...</Dropdown.Item>
                        )
                    ) : null}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default AssigneeForDropdown;
