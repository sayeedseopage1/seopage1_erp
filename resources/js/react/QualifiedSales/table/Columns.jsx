// import dayjs from "dayjs";
import Dropdown from "../../Insights/ui/Dropdown";
import { CompareDate } from "../../Insights/utils/dateController";
import { useGetPointDistributionDetailsQuery } from "../../services/api/qualifiedSalesApiSlice";
const dayjs = new CompareDate();

const randomWidth = () => {
    return Math.floor(Math.random() * (100 - 50) + 50) + "%";
};

export const columns = [
    {
        id: "date",
        header: "Date",
        accessor: "date",
        priority: 0,
        cell: (row, loading) => {
            if (loading) {
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                );
            }

            return <span>{dayjs.dayjs(row?.date).format("MMM DD, YYYY")}</span>;
        },
    },

    {
        id: "project_name",
        header: "Project Name",
        accessor: "project_name",
        priority: 1,
        cell: (row, loading) => {
            if (loading) {
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        {" "}
                        loading...{" "}
                    </span>
                );
            }

            return (
                <a href={`/account/projects/${row?.project_id}`}>
                    {row?.project_name}
                </a>
            );
        },
    },

    {
        id: "client_name",
        header: "Client Name",
        accessor: "client_name",
        priority: 2,
        cell: (row, loading) => {
            if (loading) {
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        {" "}
                        loading...{" "}
                    </span>
                );
            }
            return (
                <a href={`/account/clients/${row?.client_id}`}>
                    {row?.client_name}
                </a>
            );
        },
    },

    {
        id: "project_budget",
        header: "Amount",
        accessor: "project_budget",
        priority: 3,
        cell: (row, loading) => {
            if (loading)
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                );
            return (
                <span className="font-weight-bold">
                    ${Number(row?.amount).toFixed(2)}
                </span>
            );
        },
    },

    {
        id: "closed_by",
        header: "Closed by",
        accessor: "closed_by",
        priority: 4,
        cell: (row, loading) => {
            if (loading)
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                );
            return (
                <a href={`/account/employees/${row?.closed_by}`}>
                    {row?.closed_by_name}
                </a>
            );
        },
    },

    {
        id: "pm_name",
        header: "Project Manager",
        accessor: "pm_name",
        priority: 4,
        cell: (row, loading) => {
            if (loading)
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                );
            return (
                <a href={`/account/employees/${row?.pm_id}`}>{row?.pm_name}</a>
            );
        },
    },

    {
        id: "contact_form",
        header: "Contact Form",
        priority: 5,
        cell: (row, loading) => {
            if (loading)
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                );
            return (
                <a
                    href={`/account/deal-url/${row?.deal_id}`}
                    style={{
                        wordBreak: "break-all",
                    }}
                >
                    {`https://seopage1.net/account/deal-url/${row?.deal_id}`}
                </a>
            );
        },
    },

    {
        id: "authorized_by_sales_lead",
        header: "Authorized By Sale's Lead",
        priority: 6,
        cell: (row, loading) => {
            let isApproved = Number(row?.authorized_by_sales_lead);
            let bgColor = isApproved ? "#00AA00" : "#1D82F5";

            if (loading)
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                );

            return (
                <span
                    style={{
                        background: bgColor,
                        color: "#fff",
                        padding: "0 6px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "bold",
                    }}
                >
                    {isApproved ? (
                        <span
                            data-toggle="tooltip"
                            data-placement="top"
                            title={row?.salesLead?.name}
                        >
                            Approved
                        </span>
                    ) : (
                        "Pending"
                    )}
                </span>
            );
        },
    },

    {
        id: "accepted_by_project_manager",
        header: "Accepted By Project Manager",
        priority: 7,
        cell: (row, loading) => {
            let isApproved = Number(row?.accepted_by_project_manager);
            let bgColor = isApproved ? "#00AA00" : "#1D82F5";

            if (loading)
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                );

            return (
                <span
                    style={{
                        background: bgColor,
                        color: "#fff",
                        padding: "0 6px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "bold",
                    }}
                >
                    {isApproved ? (
                        <span
                            data-toggle="tooltip"
                            data-placement="top"
                            title={row["pm_name"]}
                        >
                            Accepted
                        </span>
                    ) : (
                        "Pending"
                    )}
                </span>
            );
        },
    },

    {
        id: "authorized_by_top_management",
        header: "Authorized By Top Management",
        priority: 8,
        cell: (row, loading) => {
            let isApproved = Number(row?.authorized_by_admin);
            let bgColor = isApproved ? "#00AA00" : "#1D82F5";

            if (loading)
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                );
            return (
                <span
                    style={{
                        background: bgColor,
                        color: "#fff",
                        padding: "0 6px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "bold",
                    }}
                >
                    <span
                        style={{
                            background: bgColor,
                            color: "#fff",
                            padding: "0 6px",
                            borderRadius: "10px",
                            fontSize: "12px",
                            fontWeight: "bold",
                        }}
                    >
                        {isApproved ? (
                            <span
                                data-toggle="tooltip"
                                data-placement="top"
                                title={row?.admin?.name}
                            >
                                Approved
                            </span>
                        ) : (
                            "Pending"
                        )}
                    </span>
                </span>
            );
        },
    },

    {
        id: "status",
        header: "Status",
        cell: (row, loading) => {
            if (loading)
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                );
            return <Status row={row} />;
        },
    },

    {
        id: "notes",
        priority: 9,
        headClass: "p-0",
        header: () => <RenderGroupHeader />,
        cell: (row, loading) => {
            return <RenderRow row={row} loading={loading} />;
        },
    },

    {
        id: "points_earned",
        accessor: "total_points",
        priority: 10,
        header: "Points Earned",
        cell: (row, loading) => {
            const logged_user = window?.Laravel?.user;
            if (loading)
                return (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                );

            return (
                <Point
                    row={row}
                    isAuthorized={[1, 8].includes(Number(logged_user?.role_id))}
                />
            );
        },
    },
];

// Point
const Point = ({ row, isAuthorized }) => {
    if (isAuthorized) {
        return (
            <>
                <Dropdown>
                    <Dropdown.Toggle icon={false}>
                        <span style={{ color: "#000000", fontWeight: "bold" }}>
                            {Number(row?.total_points).toFixed(2)}
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <PointDetails row={row} />
                    </Dropdown.Menu>
                </Dropdown>
            </>
        );
    } else {
        return (
            <span style={{ color: "#00AA00", fontWeight: "bold" }}>
                {Number(row?.total_points).toFixed(2)}
            </span>
        );
    }
};

const PointDetails = ({ row }) => {
    const { data, isFetching } = useGetPointDistributionDetailsQuery(
        `${row["id"]}`
    );

    const Tbody = ({ data }) => {
        return (
            <tbody>
                {data?.map((d, i) => (
                    <tr key={i}>
                        <td>
                            {" "}
                            <a href={`/account/employees/${d?.user_id}`}>
                                {d?.name}
                            </a>
                        </td>
                        <td>{Number(d?.total_points).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        );
    };

    const LoadingState = () => {
        return (
            <tbody>
                {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                        <td>
                            <span
                                className="__loading animate-pulse"
                                style={{ width: randomWidth() }}
                            >
                                loading...
                            </span>
                        </td>
                        <td>
                            <span
                                className="__loading animate-pulse"
                                style={{ width: randomWidth() }}
                            >
                                loading...
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };

    const EmptyState = () => {
        return (
            <tbody>
                <tr key={i}>
                    <td style={{ height: "100px", textAlign: "center" }}>
                        {" "}
                        No Data Available
                    </td>
                </tr>
            </tbody>
        );
    };

    return (
        <div>
            <table className="table" style={{ minWidth: "350px" }}>
                {!isFetching && !data?.length ? null : (
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Point</th>
                        </tr>
                    </thead>
                )}
                {isFetching ? (
                    <LoadingState />
                ) : data?.length ? (
                    <Tbody data={data} />
                ) : (
                    <EmptyState />
                )}
            </table>
        </div>
    );
};

// render group header

const RenderGroupHeader = () => {
    return (
        <div className="d-flex flex-column h-100">
            <div className="w-100 py-1 border-bottom text-center sp1_qs_table_th_sub_head">
                Notes
            </div>

            <div className="sp1_qs_table_tr h-100">
                <div className="sp1_qs_table_td sp1_qs_table_th sp1_qs_table_th_sub sp1_qs_table_td_sub_needs_defined sp1_qs_table_th_sub_needs_defined h-100">
                    Needs Defined
                </div>

                <div className="sp1_qs_table_td sp1_qs_table_th sp1_qs_table_th_sub sp1_qs_table_td_sub_prices sp1_qs_table_th_sub_prices h-100">
                    Prices
                </div>

                <div className="sp1_qs_table_td sp1_qs_table_th sp1_qs_table_th_sub sp1_qs_table_td_sub_needs_deadline sp1_qs_table_th_sub_needs_deadline h-100">
                    Deadline
                </div>

                <div className="sp1_qs_table_td sp1_qs_table_th sp1_qs_table_th_sub sp1_qs_table_td_sub_needs_top_management sp1_qs_table_th_sub_needs_top_management h-100">
                    Top Management
                </div>
            </div>
        </div>
    );
};

// render row
const RenderRow = ({ row, loading }) => {
    let isPMAccepted = Number(row?.accepted_by_project_manager);
    let isTopMApproved = Number(row?.authorized_by_admin);
    let isSLApproved = Number(row?.authorized_by_sales_lead);

    const topManagementComment =
        row?.admin_authorization_comment ||
        (isTopMApproved
            ? `<span> 
    <a href="/account/employees/${row["admin_id"]}" class='font-weight-bold'>${row?.admin?.name}</a> has authorized the sale but left no comments.</span>`
            : "Top Management has not authorized the sale yet.");

    const leadComment = isSLApproved
        ? ""
        : "Sales Lead has not authorized the sale yet.";
    const pmComment = isPMAccepted
        ? ""
        : "Project Manager has not accepted the project yet.";

    return (
        <div className="sp1_qs_table_tr sp1_qs_table_sub_tr h-100">
            <div className="sp1_qs_table_td sp1_qs_table_sub_td sp1_qs_table_td_sub_needs_defined p-0">
                <div className="d-flex flex-column w-100">
                    <div className="border-bottom w-100 p-2">
                        {loading ? (
                            <span
                                className="__loading animate-pulse"
                                style={{ width: randomWidth() }}
                            >
                                loading...
                            </span>
                        ) : (
                            <Comment
                                question="Did the sales executive defined requirements for this project properly?"
                                commentBy="* Sales Lead's Comment"
                                text={
                                    row?.sales_lead_need_define || leadComment
                                }
                                author={row?.salesLead?.name}
                                isCommented={row?.sales_lead_need_define}
                            />
                        )}
                    </div>
                    <div className=" w-100 p-2">
                        {loading ? (
                            <span
                                className="__loading animate-pulse"
                                style={{ width: randomWidth() }}
                            >
                                loading...
                            </span>
                        ) : (
                            <Comment
                                question="Did the sales team defined requirements for this project properly?"
                                commentBy="* Project Manager's Comment"
                                text={
                                    row?.project_manager_needs_define ||
                                    pmComment
                                }
                                author={row?.pm_name}
                                isCommented={row?.project_manager_needs_define}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="sp1_qs_table_td sp1_qs_table_sub_td sp1_qs_table_td_sub_prices">
                {loading ? (
                    <span
                        className="__loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                ) : (
                    <Comment
                        question=" Did the sales executive set price for this project properly?"
                        commentBy="* Sales Lead's Comment"
                        text={
                            row?.sales_lead_price_authorization || leadComment
                        }
                        author={row?.salesLead?.name}
                        isCommented={row?.sales_lead_price_authorization}
                    />
                )}
            </div>

            <div className="sp1_qs_table_td sp1_qs_table_sub_td sp1_qs_table_td_sub_needs_deadline p-0">
                <div className="d-flex flex-column w-100">
                    <div className="border-bottom w-100 p-2">
                        {loading ? (
                            <span
                                className="sp1_qs_comment_view __loading animate-pulse"
                                style={{ width: randomWidth() }}
                            >
                                loading...
                            </span>
                        ) : (
                            <Comment
                                question="Did the sales executive set deadline for this project correctly?"
                                commentBy="* Sales Lead's Comment"
                                text={
                                    row?.sales_lead_deadline_comment ||
                                    leadComment
                                }
                                author={row?.salesLead?.name}
                                isCommented={row?.sales_lead_deadline_comment}
                            />
                        )}
                    </div>
                    <div className="w-100 p-2">
                        {loading ? (
                            <span
                                className="__loading animate-pulse"
                                style={{ width: randomWidth() }}
                            >
                                loading...
                            </span>
                        ) : (
                            <Comment
                                question="Did the sales team set deadline for this project correctly?"
                                commentBy="* Project Manager's Comment"
                                text={
                                    row?.project_manager_deadline_comment ||
                                    pmComment
                                }
                                author={row?.pm_name}
                                isCommented={
                                    row?.project_manager_deadline_comment
                                }
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="sp1_qs_table_td sp1_qs_table_sub_td sp1_qs_table_td_sub_needs_top_management">
                {loading ? (
                    <span
                        className="sp1_qs_comment_view __loading animate-pulse"
                        style={{ width: randomWidth() }}
                    >
                        loading...
                    </span>
                ) : (
                    <Comment
                        question="Was the sale authorized by the top management?"
                        commentBy="* Top Management's Comment"
                        text={topManagementComment}
                        author={row?.admin?.name}
                        isCommented={row?.admin_authorization_comment}
                    />
                )}
            </div>
        </div>
    );
};

const Status = ({ row }) => {
    let isPMAccepted = Number(row?.accepted_by_project_manager);

    let isTopMApproved = Number(row?.authorized_by_admin);
    let isSLApproved = Number(row?.authorized_by_sales_lead);
    let date = dayjs.dayjs(row?.date).format("YYYY-MM-DD");
    let curr = dayjs.dayjs().format("YYYY-MM-DD");
    let diff = dayjs.dayjs(curr).diff(date, "day") + 1;

    if (isPMAccepted && isTopMApproved && isSLApproved) {
        // all accept
        return (
            <span
                style={{
                    background: "#00AA00",
                    color: "#fff",
                    padding: "0 6px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                }}
            >
                {" "}
                Qualified{" "}
            </span>
        );
    } else if (!isPMAccepted || !isTopMApproved || !isSLApproved) {
        // any of two accept
        if (diff > 5) {
            return (
                <span
                    style={{
                        background: "#FCBD01",
                        color: "#fff",
                        padding: "0 6px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "bold",
                    }}
                >
                    {" "}
                    On Hold
                </span>
            );
        }

        return (
            <span
                style={{
                    background: "#1D82F5",
                    color: "#fff",
                    padding: "0 6px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                }}
            >
                {" "}
                In Progress{" "}
            </span>
        );
    }

    // no one approve
    // return <span
    //     style={{
    //             background: '#FF0000',
    //             color: '#fff',
    //             padding: '0 6px',
    //             borderRadius: '10px',
    //             fontSize: '12px',
    //             fontWeight: 'bold'
    //     }}
    // >
    //     Disqualified
    // </span>
};

const Comment = ({
    question = "",
    commentBy = "",
    text = "",
    author = "",
    isCommented,
}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle icon={false}>
                <>
                    {commentBy ? (
                        <span
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Click to show full comment"
                            className="sp1_qs_comment_view"
                        >
                            {commentBy}
                        </span>
                    ) : (
                        <span>--</span>
                    )}
                </>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <div className="p-2" style={{ maxWidth: "450px" }}>
                    {text ? (
                        <>
                            {isCommented && <h6>{question}</h6>}
                            <div
                                style={{
                                    background: "#f8f8f8",
                                    padding: "8px",
                                    borderRadius: "6px",
                                    marginTop: "10px",
                                }}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: text || "No comment",
                                    }}
                                />
                                {isCommented && (
                                    <div className="d-flex align-items-center justify-content-end">
                                        <span
                                            style={{ color: "rgba(0,0,0,.6)" }}
                                        >
                                            -- by{" "}
                                            <span
                                                className="font-weight-bold"
                                                dangerouslySetInnerHTML={{
                                                    __html: author,
                                                }}
                                            />
                                        </span>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        "No Comment available"
                    )}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};
