import dayjs from "dayjs";
import _ from "lodash";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import CKEditorComponent from "../../ckeditor";
import Button from "../../global/Button";
import Card from "../../global/Card";
import Spinner from "../../global/Loader";
import Modal from "../../global/Modal";
import { Placeholder } from "../../global/Placeholder";
import Table from "../../global/table/DataTable";
import {
    useGetTaskTypeDataQuery,
    useUpdateTasktypeAuthStatusMutation,
} from "../../services/api/tasksApiSlice";
import styles from "./PrimaryPageAuthorization.module.css";

const PrimaryPageAuthorizationTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const isOpen = searchParams.get("modal") === "primary_task_authorization";
    const close = () => {
        searchParams.delete("modal");
        searchParams.delete("show");
        setSearchParams(searchParams);
    };
    const { data, isLoading } = useGetTaskTypeDataQuery("", { skip: !isOpen });

    const tasksType = data ? data.data : [];

    // filter data
    const getData = (type) => {
        let _data = _.orderBy(tasksType, "authorization_status", "asc");
        switch (type) {
            case "all":
                return _data;
            case "pending":
                return _.filter(_data, (d) => !d.authorization_status);
            case "denied":
                return _.filter(_data, (d) => d.authorization_status === 2);
            case "authorized":
                return _.filter(_data, (d) => d.authorization_status === 1);
            default:
                return _data;
        }
    };

    const _data = {
        all: getData("all"),
        pending: getData("pending"),
        denied: getData("denied"),
        authorized: getData("authorized"),
    };

    const tableData = (type) => {
        if (type) {
            return _.orderBy(
                _data[type],
                ["authorization_status", "updated_at"],
                ["asc", "desc"]
            );
        } else return [];
    };

    return (
        <Modal isOpen={isOpen}>
            <Card className={styles.card}>
                <Card.Head onClose={close} className={styles.card_head}>
                    Primary Page Authorization
                </Card.Head>

                <Card.Body className={styles.card_body}>
                    <Tabs data={_data} />

                    <Table
                        tableData={tableData(searchParams.get("show"))}
                        tableColumns={Columns}
                        tableName="primary_page_authorization_table"
                        isLoading={isLoading}
                        loader={<Loader columns={Columns} />}
                    />
                </Card.Body>
            </Card>
        </Modal>
    );
};

export default PrimaryPageAuthorizationTable;

// tabs
const Tabs = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const data = props.data;
    const handleRouteChange = (e, params) => {
        e.preventDefault();
        for (const [key, value] of Object.entries(params)) {
            searchParams.set(key, value);
        }
        setSearchParams(searchParams);
    };

    const badge = (type) => {
        return _.size(data[type]);
    };
    return (
        <ul className={styles.tabs}>
            <li>
                <Link
                    to="#"
                    data-type="all"
                    onClick={(e) => handleRouteChange(e, { show: "all" })}
                    data-active={searchParams.get("show") === "all"}
                >
                    All{" "}
                    <span className="badge badge-light">{badge("all")}</span>
                </Link>
            </li>

            <li>
                <Link
                    to="#"
                    data-type="pending"
                    onClick={(e) => handleRouteChange(e, { show: "pending" })}
                    data-active={searchParams.get("show") === "pending"}
                >
                    Pending{" "}
                    <span className="badge badge-light">
                        {badge("pending")}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="#"
                    data-type="authorized"
                    onClick={(e) =>
                        handleRouteChange(e, { show: "authorized" })
                    }
                    data-active={searchParams.get("show") === "authorized"}
                >
                    Authorized{" "}
                    <span className="badge badge-light">
                        {badge("authorized")}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="#"
                    data-type="denied"
                    onClick={(e) => handleRouteChange(e, { show: "denied" })}
                    data-active={searchParams.get("show") === "denied"}
                >
                    Denied{" "}
                    <span className="badge badge-light">{badge("denied")}</span>
                </Link>
            </li>
        </ul>
    );
};

// table loading state row
const Loader = ({ columns }) => {
    return _.times(10, (item) => (
        <tr key={item} className="sp1-data-table-tr">
            {_.map(columns, (col) => (
                <td key={col.id} className="sp1-data-table-td">
                    <Placeholder />
                </td>
            ))}
        </tr>
    ));
};

// table columns
export const Columns = [
    {
        id: "id",
        header: "#",
        cell: ({ row }) => {
            const data = row.original;
            // return `P${data?.project_id}T${data?.task_id}S${data?.sub_task_id}O${data?.id}`;
            return (
                <span className="d-block" style={{ width: "120px" }}>
                    {dayjs(data.updated_at).format("MMM DD, YYYY [at] hh:mm A")}
                </span>
            );
        },
    },
    {
        id: "page_name",
        header: "Page Name",
        accessorKey: "page_name",
        draggable: true,
        cell: ({ row }) => {
            return row.original?.page_name;
        },
    },
    {
        id: "page_url",
        header: "Page URL",
        accessorKey: "page_url",
        draggable: true,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <abbr title={data?.page_url}>
                    {" "}
                    (
                    <a
                        href={data?.page_url}
                        style={{ color: "#4285F4 !important" }}
                    >
                        <span className="text-primary px-1">View</span>
                    </a>
                    )
                </abbr>
            );
        },
    },
    {
        id: "task",
        header: "Sub Task",
        accessorKey: "task",
        draggable: true,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <abbr title={data?.task}>
                    <a
                        href={`/account/tasks/${data?.task_id}`}
                        className="multiline-ellipsis"
                    >
                        {data?.task}
                    </a>
                </abbr>
            );
        },
    },
    // {
    //     id: "sub_task",
    //     header: "SubTask",
    //     accessorKey: 'sub_task',
    //     draggable: true,
    //     cell: ({ row }) => {
    //         const data = row.original;
    //         return (
    //             <abbr title={data?.sub_task}>
    //                 <a
    //                     href={`/account/tasks/${data?.sub_task_id}`}
    //                     className="multiline-ellipsis"
    //                 >
    //                     {data?.sub_task}
    //                 </a>
    //             </abbr>
    //         );
    //     },
    // },

    {
        id: "assigned_by",
        header: "Assigned By",
        accessorKey: "added_by_name",
        draggable: true,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <abbr title={data?.added_by_name}>
                    <a
                        href={`/account/employees/${data?.added_by_id}`}
                        className="multiline-ellipsis"
                    >
                        {data?.added_by_name}
                    </a>
                </abbr>
            );
        },
    },
    {
        id: "assigned_to",
        header: "Assigned To",
        accessorKey: "assigned_to_name",
        draggable: true,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <abbr title={data?.assigned_to_name}>
                    <a
                        href={`/account/employees/${data?.assigned_to_id}`}
                        className="multiline-ellipsis"
                    >
                        {data?.assigned_to_name}
                    </a>
                </abbr>
            );
        },
    },
    {
        id: "project",
        header: "Project",
        accessorKey: "project_name",
        draggable: true,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <abbr title={data?.project_name}>
                    <a
                        href={`/account/tasks/${data?.project_id}`}
                        className="multiline-ellipsis"
                    >
                        {data?.project_name}
                    </a>
                </abbr>
            );
        },
    },

    {
        id: "client",
        header: "Client",
        accessorKey: "client_name",
        draggable: true,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <abbr title={data?.client_name}>
                    <a
                        href={`/account/employees/${data?.client_id}`}
                        className="multiline-ellipsis"
                    >
                        {data?.client_name}
                    </a>
                </abbr>
            );
        },
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row, table }) => {
            return <ActionButton row={row.original} table={table} />;
        },
    },
];

// Action button
const ActionButton = ({ ...props }) => {
    const { row, table } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDeny, setIsDeny] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const [error, setError] = React.useState(null);

    const open = () => setIsOpen(true);
    const close = () => {
        setIsOpen(false);
        setComment("");
        setIsDeny(false);
    };

    const authorization_status = row?.authorization_status;

    // update data
    const [updateTasktypeAuthStatus, { isLoading }] =
        useUpdateTasktypeAuthStatusMutation();

    const handleSubmission = async (type) => {
        if (type === denied && !comment) {
            setError({ comment: "You have to write a comment" });
            return;
        }

        // submit form
        await updateTasktypeAuthStatus({
            status: type,
            task_type_id: row.id,
            comment,
        })
            .then(() => toast.success("Action taken successfully"))
            .catch((err) => console.log(err))
            .finally(() => {
                close();
            });
    };

    const approve = (e) => {
        e.preventDefault;
        handleSubmission("approved");
    };

    const denied = (e) => {
        e.preventDefault;
        handleSubmission("denied");
    };

    return (
        <React.Fragment>
            {authorization_status ? (
                <span
                    className={`badge badge-${
                        authorization_status === 1 ? "success" : "danger"
                    }`}
                >
                    {authorization_status === 1 ? "Approved" : "Denied"}
                </span>
            ) : (
                <Button onClick={open} className={styles.approval_button}>
                    Approve / Deny
                </Button>
            )}

            <Modal isOpen={isOpen}>
                <Card className={`${styles.card} ${styles.card_auth_form}`}>
                    <Card.Head onClose={close} className={styles.card.head}>
                        Primary Page Development
                    </Card.Head>
                    <Card.Body className={`${styles.card_body} pt-3 px-4`}>
                        <div className={styles.items}>
                            <div className={styles.item}>
                                <div data-type="label">Page Name: </div>
                                <div data-type="data"> {row?.page_name} </div>
                            </div>

                            <div className={styles.item}>
                                <div data-type="label">Page URL </div>
                                <div data-type="data">
                                    <a href={row?.page_url}>{row?.page_url}</a>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div data-type="label">Task </div>
                                <div data-type="data">
                                    <a href={row?.parent_task_id}>
                                        {row?.task}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div data-type="label">Subtask </div>
                                <div data-type="data">
                                    <a href={row?.sub_task_id}>
                                        {row?.sub_task}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div data-type="label">
                                    Assign date and time{" "}
                                </div>
                                <div data-type="data">
                                    {dayjs(row?.created_at).format(
                                        "DD-MM-YYYY; h:mm a"
                                    )}
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div data-type="label">Assigned By </div>
                                <div data-type="data">
                                    <a href={row?.task_id}>
                                        {row?.added_by_name}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div data-type="label">Assigned To </div>
                                <div data-type="data">
                                    <a href={row?.task_id}>
                                        {row?.assigned_to_name}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div data-type="label">Project Name </div>
                                <div data-type="data">
                                    <a href={row?.task_id}>
                                        {row?.project_name}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div data-type="label">Client Name </div>
                                <div data-type="data">
                                    <a href={row?.task_id}>
                                        {row?.client_name}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div data-type="label">Task description </div>
                                {/* <div data-type="data"></div> */}
                            </div>
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{
                                    __html: row?.description,
                                }}
                            />
                        </div>
                    </Card.Body>

                    <Card.Footer>
                        {isLoading ? (
                            <div className="badge badge-dark f-14 py-2 px-3 font-weight-normal">
                                <Spinner
                                    title="Processing..."
                                    borderRightColor="white"
                                />
                            </div>
                        ) : (
                            <>
                                <Button
                                    variant="danger"
                                    onClick={() => setIsDeny(true)}
                                >
                                    Deny
                                </Button>
                                <Button variant="success" onClick={approve}>
                                    Approve
                                </Button>
                            </>
                        )}
                    </Card.Footer>

                    {/* deny reason form */}
                    <DenyReasonExplanationForm
                        comment={comment}
                        setComment={setComment}
                        isOpen={isDeny}
                        close={() => setIsDeny(false)}
                        error={error}
                        isLoading={isLoading}
                        onSubmit={denied}
                    />
                </Card>
            </Modal>
        </React.Fragment>
    );
};

const DenyReasonExplanationForm = ({
    comment,
    setComment,
    isOpen,
    close,
    error,
    isLoading,
    onSubmit,
}) => {
    return (
        <Modal isOpen={isOpen}>
            <Card className={`${styles.card} ${styles.card_auth_form}`}>
                <Card.Body className={`${styles.card_body} pt-3 px-4`}>
                    <div className="form-group pt-4">
                        <label className="font-weight-bold f-16 mb-2">
                            Please explain why you decided to deny this:{" "}
                            <sup>*</sup>
                        </label>
                        <div className="ck-editor-holder stop-timer-options primary_page_auth_deny_reason_rich_editor">
                            <CKEditorComponent
                                data={comment}
                                onChange={(e, editor) => {
                                    const d = editor.getData();
                                    setComment(d);
                                }}
                            />
                        </div>
                        {error && error.comment ? (
                            <div className="text-danger mt-1">
                                {error.comment}
                            </div>
                        ) : null}
                    </div>
                </Card.Body>

                <Card.Footer>
                    {isLoading ? (
                        <div className="badge badge-dark f-14 py-2 px-3 font-weight-normal">
                            <Spinner
                                title="Processing..."
                                borderRightColor="white"
                            />
                        </div>
                    ) : (
                        <>
                            <Button variant="tertiary" onClick={close}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={onSubmit}>
                                Submit
                            </Button>
                        </>
                    )}
                </Card.Footer>

                {/* deny reason form */}
            </Card>
        </Modal>
    );
};
