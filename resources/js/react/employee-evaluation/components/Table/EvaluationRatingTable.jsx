import React from "react";
import Popover from "../../../../react-latest/ui/Popover";
import { convertTime } from "../../../utils/converTime";
import styles from "../modal/EvaluationRating.module.css";
const EvaluationRatingTable = ({ data, averageRating }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Task name</th>
                        <th>Assign date</th>
                        <th>Task Status</th>
                        <th>Submission date</th>
                        <th>Total hours tracked</th>
                        <th>Completed work URL</th>
                        <th>Revisions needed</th>
                        <th>Average rating</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {data?.task_name ? (
                                <div style={{ minWidth: "10rem" }}>
                                    <Popover>
                                        <Popover.Button>
                                            <span className=" singleline-ellipsis link_color">
                                                <span className="link_color">
                                                    {data?.task_name}
                                                </span>
                                            </span>
                                        </Popover.Button>

                                        <Popover.Panel>
                                            <div className="revision_popover_panel">
                                                <a
                                                    href={`/account/tasks/${data.task_id}`}
                                                    target="_blank"
                                                    className="hover-underline"
                                                >
                                                    <span className="link_color">
                                                        {data?.task_name}
                                                    </span>
                                                </a>
                                            </div>
                                        </Popover.Panel>
                                    </Popover>
                                </div>
                            ) : (
                                <span>Not Available</span>
                            )}
                        </td>
                        <td>{data?.assign_date}</td>
                        <td>
                            <span
                                className="badge text-white"
                                style={{
                                    background:
                                        data?.task_board_column_color ?? "",
                                }}
                            >
                                {data?.task_board_column_name ?? ""}
                            </span>
                        </td>
                        <td>{data.submission_date}</td>
                        <td>{convertTime(data?.total_min)}</td>
                        <td>
                            {data?.completed_work ? (
                                <div style={{ minWidth: "10rem" }}>
                                    <Popover>
                                        <Popover.Button>
                                            <span className=" singleline-ellipsis link_color hover-underline">
                                                {JSON.parse(
                                                    data?.completed_work
                                                ).map((data) => (
                                                    <div>
                                                        <a
                                                            className="link_color"
                                                            href={data}
                                                        >
                                                            {data}
                                                        </a>
                                                        <br />
                                                    </div>
                                                ))}
                                            </span>
                                        </Popover.Button>

                                        <Popover.Panel>
                                            <div className="revision_popover_panel">
                                                {JSON.parse(
                                                    data?.completed_work
                                                ).map((data, index) => (
                                                    <div>
                                                        <span>
                                                            {index + 1}.
                                                        </span>
                                                        <a
                                                            className="link_color hover-underline mb-2"
                                                            target="_blank"
                                                            href={data}
                                                        >
                                                            {data}
                                                        </a>
                                                        <br />
                                                    </div>
                                                ))}
                                            </div>
                                        </Popover.Panel>
                                    </Popover>
                                </div>
                            ) : (
                                <span>Not Available</span>
                            )}
                        </td>
                        <td>{data.revision_number}</td>

                        <td>{averageRating ?? "N/A"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EvaluationRatingTable;
