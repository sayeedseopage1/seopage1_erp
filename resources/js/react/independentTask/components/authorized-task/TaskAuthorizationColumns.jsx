import dayjs from "dayjs";
import { CompareDate } from "../../../utils/dateController";
import Person from "../Person";
import IndependentTaskId from "./IndependentTaskid";
import TaskAuthorizationForm from "./TaskAuthorizationForm";

const compareDate = new CompareDate();

export const authorizationColumns = (refreshing) => {
    return [
        {
            id: "u_id",
            header: "IndependentTaskId",
            accessorFn: (row) => `${row.u_id}}`,
            cell: ({ row }) => {
                const data = row?.original;
                return (
                   <IndependentTaskId data={data} />
                );
            },
        },

        {
            id: "task",
            header: "Task",
            accessorFn: (row) => `${row.id}${row.heading}`,
            cell: ({ row }) => {
                const data = row?.original;
                return (
                    <abbr
                        title={data?.heading}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className="d-flex align-items-center"
                            style={{ gap: "10px" }}
                        >
                            <a
                                href="#"
                                className="hover-underline multine-ellipsis"
                            >
                                {data?.heading}
                            </a>
                        </div>
                    </abbr>
                );
            },
        },

        {
            id: "creation_date",
            header: "Creation Date",
            accessorKey: "creation_date",
            cell: ({ row }) => {
                const data = row?.original;
                return <span>{data?.creation_date}</span>;
            },
        },

        {
            id: "start_date",
            header: "Started Date",
            accessorFn: (row) =>
                row?.start_date
                    ? dayjs(row?.start_date).format("DD-MM-YYYY")
                    : "--",
            cell: ({ row }) => {
                const data = row?.original;
                return (
                    <strong>
                        {data?.start_date ? (
                            <>
                                {dayjs(data?.start_date).format("DD-MM-YYYY")}{" "}
                                <br />
                            </>
                        ) : (
                            "--"
                        )}
                    </strong>
                );
            },
        },

        {
            id: "due_date",
            header: "Due Date",
            accessorFn: (row) =>
                row?.due_date
                    ? dayjs(row?.due_date).format("DD-MM-YYYY")
                    : "--",
            cell: ({ row }) => {
                const data = row?.original;
                let date = data?.due_date;
                const currentDate = compareDate.dayjs();
                let color = "";

                if (compareDate.isSame(currentDate, date)) {
                    date = "Today";
                    color = "red";
                } else if (compareDate.isAfter(currentDate, date)) {
                    color = "red";
                }

                if (Number(data?.board_column_id) === 4) color = "#0F9D58";

                date =
                    date === "Today" ? date : dayjs(date).format("DD-MM-YYYY");
                return (
                    <span style={{ color: color }}>
                        <strong>{date ?? "--"}</strong>
                    </span>
                );
            },
        },

        // assigned by
        {
            id: "assign_by_id",
            header: "Assigned By",
            accessorKey: "added_by_name",
            cell: ({ row }) => {
                const data = row?.original;

                return (
                    <Person
                        url={`/account/employees/${data?.assign_by_id}`}
                        avatar={data?.assign_by_avator}
                        name={data?.assign_by_name}
                    />
                );
            },
        },

        // assigned to
        {
            id: "assign_to_id",
            header: "Assigned To",
            accessorKey: "assigned_to_name",
            cell: ({ row }) => {
                const data = row?.original;
                // console.log(data);
                return (
                    <Person
                        url={`/account/employees/${data?.assign_to_id}`}
                        avatar={data?.assign_to_avator}
                        name={data?.assign_to_name}
                    />
                );
            },
        },

        {
            id: "action",
            header: "Actions",
            draggable: true,

            cell: ({ row, table }) => {
                return (
                    <TaskAuthorizationForm
                        data={row.original}
                        table={table}
                        // refreshing={refreshing}
                    />
                );
            },
        },
    ];
};

