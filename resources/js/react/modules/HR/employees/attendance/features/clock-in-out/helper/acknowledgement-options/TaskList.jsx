import { Listbox } from "@headlessui/react";
import axios from "axios";
import _ from "lodash";
import React from "react";
import { HiOutlineSelector } from "react-icons/hi";
import Switch from "../../../../../../../../global/Switch";
import { Flex } from "../../../../../../../../global/styled-component/Flex";
import { useAuth } from "../../../../../../../../hooks/useAuth";
import Search from "../../../../components/Search";

const TaskList = ({ task, onSelect }) => {
    return (
        <div className="position-relative w-100 mb-3">
            <Listbox value={task} onChange={onSelect}>
                <Listbox.Button className="position-relative w-100 py-2 bg-transparent border rounded-sm pl-2 pr-1">
                    <Flex justifyContent="space-between" alignItem="center">
                        <span className="singleline-ellipsis mr-3">
                            {task?.heading ?? "--"}
                        </span>
                        <HiOutlineSelector />
                    </Flex>
                </Listbox.Button>

                {/* list options */}
                <List />
            </Listbox>
        </div>
    );
};

const List = () => {
    const [tasks, setTasks] = React.useState([]);
    const [searchText, setSearchText] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const auth = useAuth();

    // fetch project data
    const fetchProjectData = async () => {
        try {
            await axios
                .get(`/account/tasks/get-developer-tasks/${auth.getId()}`)
                .then((res) => {
                    setTasks(res.data);
                });
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        fetchProjectData();
        return () => fetchProjectData();
    }, []);

    // handle filter search query
    const filterProjectBySearchQuery = (tasks, query) => {
        if (_.size(tasks) === 0) return [];
        return _.filter(tasks, (task) =>
            task.client_name.toLowerCase().includes(query.toLowerCase())
        );
    };

    const query = React.useDeferredValue(searchText);
    const filteredData = filterProjectBySearchQuery(tasks, query);

    return (
        <Listbox.Options
            className="position-absolute bg-white p-2 shadow w-100"
            style={{ zIndex: 10 }}
        >
            <Switch>
                <Switch.Case condition={isLoading}>
                    <div className="task-selection-list-option">Loading...</div>
                </Switch.Case>

                <Switch.Case condition={!isLoading && _.size(tasks) === 0}>
                    <div className="task-selection-list-option">
                        Data not found
                    </div>
                </Switch.Case>
                <Switch.Case condition={!isLoading && _.size(tasks) !== 0}>
                    <Search
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search project by name"
                    />

                    <Switch.Case
                        condition={
                            !isLoading && query && _.size(filteredData) === 0
                        }
                    >
                        <div className="task-selection-list-option">
                            <div
                                className="task-selection-list-option"
                                style={{ color: "gray" }}
                            >
                                <span>
                                    Task not found by this name:{" "}
                                    <strong>{query}</strong>
                                </span>
                            </div>
                        </div>
                    </Switch.Case>

                    <Switch.Case condition={_.size(filteredData) !== 0}>
                        <div
                            className="mt-3"
                            style={{ maxHeight: "350px", overflowY: "auto" }}
                        >
                            {_.map(filteredData, (task) => (
                                <Listbox.Option
                                    key={task.id}
                                    value={task}
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
                                            <span>
                                                {task.heading}{" "}
                                                <span className="badge badge-success ml-2">
                                                    {task.client_name}
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
                            ))}
                        </div>
                    </Switch.Case>
                </Switch.Case>
            </Switch>
        </Listbox.Options>
    );
};

export default TaskList;
