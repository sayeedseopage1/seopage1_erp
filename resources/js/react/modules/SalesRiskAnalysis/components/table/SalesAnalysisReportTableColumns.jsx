// ui components
import { CreatedBy } from "../../../../ProjectStatus/components/table/ui";
import Avatar from "../../../../global/Avatar";
import Switch from "../Switch";
import Tooltip from "../Tooltip";

// styles
import { GrView } from "react-icons/gr";

export const SalesAnalysisReportTableColumns = [
    {
        id: "id",
        header: "#",
        accessorKey: "id",
        cell: ({ row }) => {
            return <p className="multiline-ellipsis">{row.index + 1}</p>;
        },
    },
    {
        id: "client",
        header: "Client",
        accessorKey: "client",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <CreatedBy href={`/account/clients/${data.client_id}`}>
                    <Avatar
                        type="circle"
                        name={data?.client_name}
                        src={
                            data?.client_image
                                ? `/user-uploads/avatar/${data?.clientImage}`
                                : null
                        }
                    />
                    <span>{data?.client_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "project",
        header: "Project",
        accessorKey: "project",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    <Tooltip text={data?.project_name} key="title-tooltip">
                        {data?.project_name}
                    </Tooltip>
                </p>
            );
        },
    },
    {
        id: "deal",
        header: "Deal",
        accessorKey: "deal",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <>
                    {data?.deal_name ? (
                        <a
                            href={`/account/contracts/${data?.deal_id}`}
                            className={`multine-ellipsis btn btn-info`}
                            style={viewBtnStyle}
                            ref={(node) =>
                                node?.style.setProperty(
                                    "color",
                                    "white",
                                    "important"
                                )
                            }
                        >
                            View Deal
                        </a>
                    ) : (
                        <p className="multiline-ellipsis">Not Available Yet</p>
                    )}
                </>
            );
        },
    },
    {
        id: "lead",
        header: "Lead",
        accessorKey: "lead",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <a
                    href={`/account/leads/${data?.lead_id}`}
                    className={`multine-ellipsis btn btn-info`}
                    style={viewBtnStyle}
                    ref={(node) => {
                        if (node) {
                            node.style.setProperty(
                                "color",
                                "white",
                                "important"
                            );
                            node.style.setProperty(
                                "background-color",
                                "#1492d2",
                                "important"
                            );
                        }
                    }}
                >
                    View Lead
                </a>
            );
        },
    },
    {
        id: "project_budget",
        header: "Project Budget",
        accessorKey: "project_budget",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    {data?.project_budget ?? "Not Available Yet"}
                </p>
            );
        },
    },
    {
        id: "country",
        header: "Country",
        accessorKey: "country",
        cell: ({ row }) => {
            const data = row?.original;

            const getCountry = (country) => {
                if (
                    country === "" ||
                    country === null ||
                    country === undefined
                ) {
                    return "N/A";
                } else {
                    return country;
                }
            };
            return (
                <p className="multiline-ellipsis">
                    {getCountry(data?.country)}
                </p>
            );
        },
    },
    {
        id: "award_time",
        header: "Award Time",
        accessorKey: "award_time",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <p className="multiline-ellipsis">
                    {data?.award_time ?? "Not Available Yet"}
                </p>
            );
        },
    },
    {
        id: "submitted_by",
        header: "Submitted By",
        accessorKey: "submitted_by",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <CreatedBy href={`/account/employees/${data?.submitted_by}`}>
                    <Avatar
                        type="circle"
                        name={data?.submitted_by_name}
                        src={
                            data?.submitted_by_image
                                ? `/user-uploads/avatar/${data?.submitted_by_image}`
                                : null
                        }
                    />
                    <span>{data?.submitted_by_name}</span>
                </CreatedBy>
            );
        },
    },
    {
        id: "gained_points",
        header: "Gained Points",
        accessorKey: "gained_points",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <Switch>
                    <Switch.Case
                        condition={
                            data?.points !== null && data?.points !== undefined
                        }
                    >
                        <p className="multiline-ellipsis">{data?.points}</p>
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            data?.points === null || data?.points === undefined
                        }
                    >
                        {["previous-won", "previous-denied"].includes(
                            data?.status?.toLowerCase()
                        ) ? (
                            <p style={{ ...customStyle.previousAuthorized }}>
                                Previous Report
                            </p>
                        ) : (
                            <p className="multiline-ellipsis">
                                Not Available Yet
                            </p>
                        )}
                    </Switch.Case>
                </Switch>
            );
        },
    },
    {
        id: "authorized_by",
        header: "Authorized By",
        accessorKey: "authorized_by",
        cell: ({ row }) => {
            let statusData = {};
            // pending', 'analysis', 'authorized', 'auto-authorized', 'denied
            const {
                authorize_by_name,k
                authorize_by_id,
                authorize_by_photo,
                status,
            } = row?.original ?? {};
            const dealStatusByAdmin = ["authorized", "Denied", "denied"];
            const dealStatusBySystem = ["auto-authorized"];
            const oldSystemStatus = ["previous-won", "previous-denied"];

            if (!oldSystemStatus.includes(status.toLowerCase())) {
                if (
                    authorize_by_id &&
                    dealStatusByAdmin.includes(status.toLowerCase())
                ) {
                    statusData = {
                        isSystemTakeAction: false,
                        isAuthorizedOrDenied: true,
                        isOldSystemStatus: false,
                    };
                } else if (
                    !authorize_by_id &&
                    dealStatusBySystem.includes(status.toLowerCase())
                ) {
                    statusData = {
                        isSystemTakeAction: true,
                        isAuthorizedOrDenied: true,
                        isOldSystemStatus: false,
                    };
                } else {
                    statusData = {
                        isSystemTakeAction: false,
                        isAuthorizedOrDenied: false,
                        isOldSystemStatus: false,
                    };
                }
            } else {
                statusData = {
                    isSystemTakeAction: false,
                    isAuthorizedOrDenied: true,
                    isOldSystemStatus: true,
                };
            }

            return (
                <Switch>
                    <Switch.Case
                        condition={
                            statusData.isAuthorizedOrDenied &&
                            !statusData.isSystemTakeAction &&
                            !statusData.isOldSystemStatus
                        }
                    >
                        <CreatedBy
                            href={`/account/employees/${authorize_by_id}`}
                        >
                            <Avatar
                                type="circle"
                                name={authorize_by_name}
                                src={
                                    authorize_by_photo
                                        ? `/user-uploads/avatar/${authorize_by_photo}`
                                        : null
                                }
                            />
                            <span>{authorize_by_name}</span>
                        </CreatedBy>
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            statusData.isAuthorizedOrDenied &&
                            statusData.isSystemTakeAction &&
                            !statusData.isOldSystemStatus
                        }
                    >
                        <p
                            style={{
                                ...customStyle.authorizeBySystem,
                            }}
                        >
                            Authorized by System
                        </p>
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            !statusData.isAuthorizedOrDenied &&
                            !statusData.isSystemTakeAction &&
                            !statusData.isOldSystemStatus
                        }
                    >
                        <p
                            style={{
                                ...customStyle.notAuthorizeYet,
                            }}
                        >
                            Not Available Yet
                        </p>
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            statusData.isAuthorizedOrDenied &&
                            !statusData.isSystemTakeAction &&
                            statusData.isOldSystemStatus
                        }
                    >
                        <p
                            style={{
                                ...customStyle.previousAuthorized,
                            }}
                        >
                            Previous Report
                        </p>
                    </Switch.Case>
                </Switch>
            );
        },
    },
    {
        id: "authorize_on",
        header: "Authorized On",
        accessorKey: "authorize_on",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <Switch>
                    <Switch.Case condition={data?.authorize_on}>
                        <p className="multiline-ellipsis">
                            {data?.authorize_on}
                        </p>
                    </Switch.Case>
                    <Switch.Case condition={!data?.authorize_on}>
                        {["previous-won", "previous-denied"].includes(
                            data?.status.toLowerCase()
                        ) ? (
                            <p
                                style={{
                                    ...customStyle.previousAuthorized,
                                }}
                            >
                                Previous Report
                            </p>
                        ) : (
                            <p className="multiline-ellipsis">
                                Not Available Yet
                            </p>
                        )}
                    </Switch.Case>
                </Switch>
            );
        },
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const data = row?.original;
            const formattedStatus = _.capitalize(
                data?.status?.replaceAll("-", " ")
            );
            return (
                <Switch>
                    <Switch.Case
                        condition={formattedStatus.toLowerCase() === "analysis"}
                    >
                        <div className="d-flex justify-content-start align-items-center">
                            <div
                                style={{
                                    ...customStyle.statusDot,
                                    backgroundColor: "#00b5ff",
                                }}
                            />
                            <p className="multiline-ellipsis">
                                In {formattedStatus}
                            </p>
                        </div>
                    </Switch.Case>
                    <Switch.Case
                        // here we are checking if the status is auto authorized or authorized (case insensitive and with space)
                        condition={[
                            "auto authorized",
                            "authorized",
                            "previous won",
                        ].includes(formattedStatus.toLowerCase())}
                    >
                        <div className="d-flex justify-content-start align-items-center">
                            <div
                                style={{
                                    ...customStyle.statusDot,
                                    backgroundColor: "rgb(24 239 24)",
                                }}
                            />
                            <p className="multiline-ellipsis">
                                {formattedStatus}
                            </p>
                        </div>
                    </Switch.Case>
                    <Switch.Case
                        condition={["denied", "previous denied"].includes(
                            formattedStatus.toLowerCase()
                        )}
                    >
                        <div className="d-flex justify-content-start align-items-center">
                            <div
                                style={{
                                    ...customStyle.statusDot,
                                    backgroundColor: "#FF0000",
                                }}
                            />
                            <p className="multiline-ellipsis">
                                {formattedStatus}
                            </p>
                        </div>
                    </Switch.Case>
                    <Switch.Case
                        // here we are checking if the status is not denied, auto authorized, analysis, authorized (case insensitive and with space)
                        condition={
                            ![
                                "denied",
                                "auto authorized",
                                "analysis",
                                "authorized",
                                "previous won",
                                "previous denied",
                            ].includes(formattedStatus.toLowerCase())
                        }
                    >
                        <div className="d-flex justify-content-start align-items-center">
                            <div
                                style={{
                                    ...customStyle.statusDot,
                                    backgroundColor: "#3277f7",
                                }}
                            />
                            <p className="multiline-ellipsis">
                                {formattedStatus}
                            </p>
                        </div>
                    </Switch.Case>
                </Switch>
            );
        },
    },
    {
        id: "action",
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <a
                    href={`/account/sales-analysis-report/${data.deal_id}`}
                    className={`multine-ellipsis btn btn-sm btn-primary`}
                    style={viewBtnStyle}
                    ref={(node) => {
                        if (node) {
                            node.style.setProperty(
                                "color",
                                "white",
                                "important"
                            );
                        }
                    }}
                    target="_blank"
                >
                    <GrView />
                    <span className="ml-2">View Report</span>
                </a>
            );
        },
    },
];

const viewBtnStyle = {
    padding: "4px 11px",
    width: "fit-content",
    fontSize: "13px",
    color: "#fff !important",
};

const customStyle = {
    authorizeBySystem: {
        padding: "2px 12px",
        backgroundColor: "#4df14da8",
        borderRadius: "12px",
        width: "fit-content",
    },
    notAuthorizeYet: {
        padding: "2px 12px",
        backgroundColor: "#FCBD01",
        borderRadius: "12px",
        width: "fit-content",
    },
    statusDot: {
        padding: "5px 5px",
        borderRadius: "12px",
        width: "10px",
        height: "10px",
        marginRight: "5px",
    },
    previousAuthorized: {
        padding: "2px 6px",
        backgroundColor: "#6cf7b2c5",
        borderRadius: "12px",
        width: "fit-content",
        fontSize: "12px",
    },
};
