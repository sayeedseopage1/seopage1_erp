import React, { useState } from "react";
import _ from "lodash"; 
import { Combobox } from "@headlessui/react";
import { HiOutlineSelector } from "react-icons/hi";
import { User } from "../../../../../utils/user-details";
import { useGetDeveloperTasksQuery } from "../../../../../services/api/SingleTaskPageApi";

const DevloperTaskSelectionMenu = ({ task, setTask }) => {
    const [searchQuery, setSearchQuery] = useState("");
 
    const user = new User(window?.Laravel?.user);

    //  Fetch user wise tasks list 
    const {
        data: developerTasks,
        isFetching
    } = useGetDeveloperTasksQuery(user?.getId());


    // project filter
    const filteredDeveloperTask =
    searchQuery === ""
            ? developerTasks
            : developerTasks?.filter((task) =>
                  _.lowerCase(task.heading).includes(
                      _.lowerCase(searchQuery)
                  )
              );

    return (
        <div className="position-relative w-100 mb-3">
            <Combobox value={task} onChange={setTask}>
                <Combobox.Button className="position-relative w-100">
                    <Combobox.Input
                        className="w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between"
                        displayValue={(task) => task?.heading}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                    {(filteredDeveloperTask && filteredDeveloperTask.length) ? (
                        filteredDeveloperTask?.map((task) => (
                            <Combobox.Option
                                key={task.id}
                                value={task}
                                tabIndex={-1}
                                className={({ selected, active }) =>
                                    selected
                                        ? "task-selection-list-option selected"
                                        : active
                                        ? "task-selection-list-option active"
                                        : "task-selection-list-option"
                                }
                            >
                                <span>{task?.heading} <span className="badge badge-success">{task?.client_name}</span></span>
                            </Combobox.Option>
                        ))
                    ) : (
                        <div className="task-selection-list-option">
                            {isFetching ? "Loading..." : "Nothing found."}
                        </div>
                    )}
                </Combobox.Options>
            </Combobox>
        </div>
    );
};

export default DevloperTaskSelectionMenu;
