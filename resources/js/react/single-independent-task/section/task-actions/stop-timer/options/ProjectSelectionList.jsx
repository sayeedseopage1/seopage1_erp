import React, { useState } from "react";
import _ from "lodash";
import { useGetAllProjectsOptionsQuery } from "../../../../../services/api/FilterBarOptionsApiSlice";
import { Combobox } from "@headlessui/react";
import { HiOutlineSelector } from "react-icons/hi";

const ProjectSelectionList = ({ project, setProject }) => {
    const [projectQuery, setProjectQuery] = useState("");

    // fetch projects
    const { data: projects, isFetching: projectFetching } =
        useGetAllProjectsOptionsQuery("");
  
    // project filter
    const filteredProject =
        projectQuery === ""
            ? projects
            : projects.filter((project) =>
                  _.lowerCase(project.project_name).includes(
                      _.lowerCase(projectQuery)
                  )
              );

    return (
        <div className="position-relative w-100 mb-3">
            <Combobox value={project} onChange={setProject}>
                <Combobox.Button className="position-relative w-100">
                    <Combobox.Input
                        className="w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between"
                        displayValue={(project) => project?.project_name}
                        onChange={(e) => setProjectQuery(e.target.value)}
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
                    {filteredProject ? (
                        filteredProject.map((project) => (
                            <Combobox.Option
                                key={project.id}
                                value={project}
                                tabIndex={-1}
                                className={({ selected, active }) =>
                                    selected
                                        ? "task-selection-list-option selected"
                                        : active
                                        ? "task-selection-list-option active"
                                        : "task-selection-list-option"
                                }
                            >
                                <span>{project.project_name} <span className="badge badge-success ml-2">{project.client_name}</span></span>
                            </Combobox.Option>
                        ))
                    ) : (
                        <div className="task-selection-list-option">
                            {projectFetching ? "Loading..." : "Nothing found."}
                        </div>
                    )}
                </Combobox.Options>
            </Combobox>
        </div>
    );
};

export default ProjectSelectionList;
