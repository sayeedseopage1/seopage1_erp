import ResolveActionBtn from "./ResolveActionBtn";
import Popover from "../../ui/Popover";
import dayjs from "dayjs";
import UserRender from "../../../react/TimeLogTable/components/UserRender";
import Button from "../../ui/Button";
import { User } from "../../utils/user-details";

const currentUser = new User(window.Laravel.user);

export const TaskReportDataTableColumn = [
    {
        id: "id",
        header: "Report No.",
        className: "",
        draggable: false,
        group: false,
        sorted: false,
        cell: ({ row: { original }, className }) => {
            return (
                <div className={`${className}`} style={{ minWidth: "4rem" }}>
                    TSKRPTP{original?.projectId}T{original?.taskId}R
                    {original?.id}
                </div>
            );
        },
    },
    {
        id: "report_date",
        header: "Report Date",
        className: "",
        draggable: true,
        group: false,
        sorted: false,
        sortAccessor: "report_date",
        cell: ({ row: { original }, className }) => {
            return (
                <div className={`${className}`} style={{ minWidth: "5rem" }}>
                    {dayjs(original?.report_date).format("DD-MMM-YYYY")}
                </div>
            );
        },
    },
    {
        id: "resolved_by",
        header: "Resolved By",
        className: "",
        sorted: false,
        draggable: true,
        group: false,
        cell: ({ row: { original }, className }) => {
            return (
                <div className={`${className}`} style={{ minWidth: "10rem" }}>
                    {original?.resolved_by_id ? (
                        <UserRender
                            name={original?.resolved_by_name}
                            profileUrl={`/account/employees/${original?.resolved_by_id}`}
                            image={original?.resolved_by_avatar}
                            role={original?.resolved_by_role_name}
                            roleLink={""}
                            id={original?.resolved_by_id}
                        />
                    ) : (
                        <span style={{ fontWeight: "bold", color: "gray" }}>
                            Not Resolved Yet
                        </span>
                    )}
                </div>
            );
        },
    },
    {
        id: "resolved_on",
        header: "Resolved On",
        className: "",
        draggable: true,
        group: false,
        sorted: false,
        sortAccessor: "resolved_on",
        cell: ({ row: { original }, className }) => {
            return (
                <div className={`${className}`} style={{ minWidth: "5rem" }}>
                    {original?.status === "pending" ? (
                        <span style={{ fontWeight: "bold", color: "gray" }}>
                            Not Resolved Yet
                        </span>
                    ) : (
                        dayjs(original?.resolved_on).format("DD-MMM-YYYY")
                    )}
                </div>
            );
        },
    },
    {
        id: "clientId",
        header: "Client",
        className: "",
        draggable: true,
        group: false,
        sorted: false,
        sortAccessor: "client",
        cell: ({ row: { original }, className }) => {
            return (
                <div className={`${className}`} style={{ minWidth: "10rem" }}>
                    {original?.clientId ? (
                        <UserRender
                            name={original?.client_name}
                            profileUrl={`/account/clients/${original?.clientId}`}
                            image={original?.client_avatar}
                            role="Client"
                            roleLink={""}
                            id={original?.clientId}
                        />
                    ) : (
                        <span>Not Available</span>
                    )}
                </div>
            );
        },
    },
    {
        id: "projectId",
        header: "Project",
        className: "",
        sorted: false,
        draggable: true,
        group: false,
        sortAccessor: "",
        cell: ({ row: { original }, className }) => {
            return original?.projectId ? (
                <div className={`${className}`} style={{ minWidth: "5rem" }}>
                    <Popover>
                        <Popover.Button>
                            <a
                                className="text-primary font-weight-bold singleline-ellipsis"
                                href={`/account/projects/${original?.projectId}`}
                                target="_blank"
                            >
                                {original?.project_name}
                            </a>
                        </Popover.Button>

                        <Popover.Panel>
                            <div className="revision_popover_panel">
                                <a
                                    className="text-primary font-weight-bold"
                                    href={`/account/projects/${original?.projectId}`}
                                    target="_blank"
                                >
                                    {original?.project_name}
                                </a>
                            </div>
                        </Popover.Panel>
                    </Popover>
                </div>
            ) : (
                <span>Not Available</span>
            );
        },
    },
    {
        id: "taskId",
        header: "Task",
        className: "",
        sorted: false,
        draggable: true,
        group: false,
        cell: ({ row: { original }, className }) => {
            return original?.taskId ? (
                <div className={`${className}`} style={{ minWidth: "5rem" }}>
                    <Popover>
                        <Popover.Button>
                            <a
                                className="text-primary font-weight-bold singleline-ellipsis"
                                href={`/account/tasks/${original?.taskId}`}
                                target="_blank"
                            >
                                {original?.task_heading}
                            </a>
                        </Popover.Button>

                        <Popover.Panel>
                            <div className="revision_popover_panel">
                                <a
                                    className="text-primary font-weight-bold"
                                    href={`/account/tasks/${original?.taskId}`}
                                    target="_blank"
                                >
                                    {original?.task_heading}
                                </a>
                            </div>
                        </Popover.Panel>
                    </Popover>
                </div>
            ) : (
                <span>Not Available</span>
            );
        },
    },
    {
        id: "report_issuer_id",
        header: "Report Issuer",
        className: "",
        sorted: false,
        draggable: true,
        group: false,
        cell: ({ row: { original }, className }) => {
            return (
                <div className={`${className}`} style={{ minWidth: "10rem" }}>
                    {original?.report_issuer_id ? (
                        <UserRender
                            name={original?.report_issuer_name}
                            profileUrl={`/account/employees/${original?.report_issuer_id}`}
                            image={original?.report_issuer_avatar}
                            role={original?.report_issuer_role_name}
                            roleLink={""}
                            id={original?.report_issuer_id}
                        />
                    ) : (
                        <span>Not Available</span>
                    )}
                </div>
            );
        },
    },
    {
        id: "accountable_name",
        header: "Accountable Individual",
        className: "",
        sorted: false,
        draggable: true,
        group: false,
        cell: ({ row: { original }, className }) => {
            return (
                <div className={`${className}`} style={{ minWidth: "10rem" }}>
                    {original?.accountable_id ? (
                        <UserRender
                            name={original?.accountable_name}
                            profileUrl={`/account/employees/${original?.accountable_id}`}
                            image={original?.accountable_avatar}
                            role={original?.accountable_role_name}
                            roleLink={""}
                            id={original?.accountable_name}
                        />
                    ) : (
                        <span>Not Available</span>
                    )}
                </div>
            );
        },
    },
    {
        id: "report_reason",
        header: "Report Reason",
        className: "",
        sorted: false,
        draggable: true,
        group: false,
        cell: ({ row: { original }, className }) => {
            return original?.report_reason ? (
                <div style={{ minWidth: "10rem" }}>
                    <Popover>
                        <Popover.Button>
                            <span className="font-weight-bold singleline-ellipsis">
                                {original?.report_reason}
                            </span>
                        </Popover.Button>

                        <Popover.Panel>
                            <div className="revision_popover_panel">
                                {original?.report_reason}
                            </div>
                        </Popover.Panel>
                    </Popover>
                </div>
            ) : (
                <span>Not Available</span>
            );
        },
    },
    {
        id: "report_reason_details",
        header: "Report Reason Details",
        className: "",
        sorted: false,
        draggable: true,
        group: false,
        cell: ({ row: { original }, className }) => {
            return original?.report_reason_details ? (
                <div style={{ minWidth: "10rem" }}>
                    <Popover>
                        <Popover.Button>
                            <span className="font-weight-bold singleline-ellipsis">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: original?.report_reason_details,
                                    }}
                                />
                            </span>
                        </Popover.Button>

                        <Popover.Panel>
                            <div className="revision_popover_panel">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: original?.report_reason_details,
                                    }}
                                />
                            </div>
                        </Popover.Panel>
                    </Popover>
                </div>
            ) : (
                <span>Not Available</span>
            );
        },
    },
    {
        id: "previousNotedIssue",
        header: "Previously Reported",
        className: "",
        sorted: false,
        draggable: true,
        group: false,
        cell: ({ row: { original }, className }) => {
            return original?.previousNotedIssue ? (
                <div
                    className={`${className} font-weight-bold`}
                    style={{ minWidth: "5rem", textTransform: "uppercase" }}
                >
                    {original?.previousNotedIssue}
                </div>
            ) : (
                <span>Not Available</span>
            );
        },
    },
    {
        id: "action",
        header: "Action",
        className: "",
        sorted: false,
        draggable: true,
        group: false,
        cell: ({ row: { original }, className }) => {
            return (
                <div className={`${className}`} style={{ minWidth: "5rem" }}>
                    {original?.status === "pending" &&
                        (currentUser?.roleId === 1 ||
                        currentUser?.roleId === 8 ? (
                            <ResolveActionBtn data={original} />
                        ) : (
                            <Button
                                variant="tertiary"
                                onClick={() => {}}
                                disabled={true}
                                className="d-flex align-items-center btn-outline-dark"
                            >
                                <span className="d-inline ml-1"> Pending </span>
                            </Button>
                        ))}
                    {original?.status === "approved" && (
                        <Button
                            variant="success"
                            onClick={() => {}}
                            className="d-flex align-items-center btn-outline-dark"
                        >
                            <span className="d-inline ml-1">
                                {" "}
                                Accepted & Resolved{" "}
                            </span>
                        </Button>
                    )}
                    {original?.status === "denied" && (
                        <Button
                            variant="danger"
                            onClick={() => {}}
                            className="d-flex align-items-center btn-outline-dark"
                        >
                            <span className="d-inline ml-1">
                                {" "}
                                Denied & Resolved{" "}
                            </span>
                        </Button>
                    )}
                </div>
            );
        },
    },
];
