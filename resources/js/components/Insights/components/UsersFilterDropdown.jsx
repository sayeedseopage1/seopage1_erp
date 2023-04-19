import React, { useState, useEffect } from "react";
import { usePopper } from "react-popper";
import "./period-filter.css";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../UI/form/Search";
import { addAssigneeUsers, addAssigneeTeams } from "../services/assigneeSlice";
import CustomScrollbar from "../../UI/CustomScrollbar";
import _ from "lodash";

const UsersFilterDropdown = ({ filteredUser, setFilteredUser }) => {
    const { users, teams } = useSelector((s) => s.assignee);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("User");
    const [search, setSearch] = useState("");
    const [refElement, setRefElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [closeButton, setCloseButton] = useState(false);

    const [defaultHover, setDefaultHover] = useState("");
    const [fetching, setFetching] = useState(true);

    // popper
    const { styles, attributes } = usePopper(refElement, popperElement, {
        placement: "bottom-start",
        modifiers: [
            { name: "flip", options: ["right", "top", "left", "bottom"] },
            { name: "offset", options: { offset: [0, 3] } },
        ],
    });

    // get user
    useEffect(() => {
        if (users.length === 0) {
            setFetching(true);
            const fetchUser = async () => {
                const res = await axios.get("/get-users");
                if (res) {
                    dispatch(addAssigneeUsers(res.data));
                    setFetching(false);
                }
            };

            fetchUser();
        }

        if (teams.length === 0) {
            // teams fetching here....
            const fetchTeam = async () => {
                setFetching(true);
                const res = await axios.get("/get-teams");
                if (res) {
                    dispatch(addAssigneeTeams(res.data));
                    setFetching(false);
                }
            };

            fetchTeam();
        }
    }, []);

    // close outside click
    useEffect(() => {
        let timer;

        const outsideClick = (e) => {
            if (popperElement && !popperElement.contains(e.target)) {
                setIsOpen(false);
                window.removeEventListener("click", outsideClick);
                clearTimeout(timer);
            }
        };

        if (isOpen && popperElement) {
            timer = setTimeout(
                () => window.addEventListener("click", outsideClick),
                100
            );
        }

        return () => {
            window.removeEventListener("click", outsideClick);
            clearTimeout(timer);
        };
    }, [popperElement]);

    // clear state
    const clearState = () => {
        setTitle("Users");
        setCloseButton(false);
    };

    // handle time selection
    const handleTimePeriodSelect = (v) => {
        setTitle(v);
        setFilteredUser(v);
        setCloseButton(true);
    };

    return (
        <div className="sp1_period--container">
            <div className="sp1_period--toggle-wrapper">
                <div
                    ref={setRefElement}
                    onClick={() => setIsOpen(!isOpen)}
                    className="sp1_period--toggle"
                >
                    <i className="fa-solid fa-user"></i>
                    {title}
                    <i className="fa-solid fa-caret-down ml-2" />
                </div>
                {closeButton && (
                    <button aria-label="close" onClick={clearState}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}
            </div>

            {isOpen && (
                <div
                    ref={setPopperElement}
                    className="sp1_period--menu"
                    style={styles.popper}
                    {...attributes}
                >
                    <React.Fragment>
                        <Search value={search} onChange={setSearch} />
                        <CustomScrollbar minH={0} maxH={450}>
                            <div className="mb-3 mr-2">
                                {fetching ? (
                                    <>Loading...</>
                                ) : (
                                    <>
                                        <ul className="sp1_user_filter--list mt-3">
                                            <li
                                                className={`sp1__asf--item sp1_user_filter--item ${
                                                    defaultHover === "Everyone"
                                                        ? "hover"
                                                        : ""
                                                } `}
                                                onMouseOver={() =>
                                                    setDefaultHover("Everyone")
                                                }
                                                onClick={() =>
                                                    handleTimePeriodSelect(
                                                        "Everyone"
                                                    )
                                                }
                                            >
                                                <span>Everyone</span>
                                                {filteredUser ===
                                                    "Everyone" && (
                                                    <i className="fa-solid fa-check" />
                                                )}
                                            </li>
                                        </ul>
                                        <hr className="my-2" />
                                        <ul className="sp1_user_filter--list">
                                            {users.length > 0
                                                ? users
                                                      .filter((u) =>
                                                          _.lowerCase(
                                                              u.name
                                                          ).includes(
                                                              _.lowerCase(
                                                                  search
                                                              )
                                                          )
                                                      )
                                                      .map((u) => (
                                                          <li
                                                              key={u.id}
                                                              className={`sp1__asf--item sp1_user_filter--item ${
                                                                  defaultHover ===
                                                                  u.name
                                                                      ? "hover"
                                                                      : ""
                                                              } `}
                                                              onMouseOver={() =>
                                                                  setDefaultHover(
                                                                      u.name
                                                                  )
                                                              }
                                                              onClick={() =>
                                                                  handleTimePeriodSelect(
                                                                      u.name
                                                                  )
                                                              }
                                                          >
                                                              <span>
                                                                  {" "}
                                                                  {u.name}
                                                              </span>
                                                              {u.name ===
                                                                  filteredUser && (
                                                                  <i className="fa-solid fa-check" />
                                                              )}
                                                          </li>
                                                      ))
                                                : null}
                                        </ul>
                                        <hr className="my-2" />
                                        <ul className="sp1_user_filter--list">
                                            {teams.length > 0
                                                ? teams
                                                      .filter((t) =>
                                                          _.lowerCase(
                                                              t.team_name
                                                          ).includes(
                                                              _.lowerCase(
                                                                  search
                                                              )
                                                          )
                                                      )
                                                      .map((t) => (
                                                          <li
                                                              key={`team-${t.id}`}
                                                              className={`sp1__asf--item sp1_user_filter--item ${
                                                                  defaultHover ===
                                                                  t.team_name
                                                                      ? "hover"
                                                                      : ""
                                                              } `}
                                                              onClick={() =>
                                                                  handleTimePeriodSelect(
                                                                      t.team_name
                                                                  )
                                                              }
                                                              onMouseOver={() =>
                                                                  setDefaultHover(
                                                                      t.team_name
                                                                  )
                                                              }
                                                          >
                                                              <span>
                                                                  {t.team_name}
                                                              </span>
                                                              {t.team_name ===
                                                                  filteredUser && (
                                                                  <i className="fa-solid fa-check" />
                                                              )}
                                                          </li>
                                                      ))
                                                : null}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </CustomScrollbar>
                    </React.Fragment>
                </div>
            )}
        </div>
    );
};

export default UsersFilterDropdown;
