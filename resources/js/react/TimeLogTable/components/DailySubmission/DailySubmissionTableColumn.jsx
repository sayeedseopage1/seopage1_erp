import dayjs from "dayjs";
import { convertTime } from "../../../utils/converTime";
import Popover from "../../../../react-latest/ui/Popover";
import "../data-table.css";
import UserRender from "../UserRender";
import Person from "../../../tasks/components/Person";
import DailySubmissionType from "./table_components/DailySubmissionType";

export const DailySubmissionTableColumn = [
    {
        id: "employee_name",
        header: "Employee",
        className: "",
        group: true,
        sorted: false,
        sortAccessor: "employee_name",
        cell: ({ row, col, rowSpan }) => {
            return (
                <td
                    className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${
                        col?.id
                    } sp1_tlr_td_marged ${
                        rowSpan ? "sp1_tlr_td_hover-disable" : ""
                    }`}
                    rowSpan={rowSpan}
                >
                    <Person
                        url={`/account/employees/${row?.employee_id}`}
                        name={row?.employee_name}
                        avatar={row?.employee_image}
                    />
                    {/* <UserRender
                        name={row?.employee_name}
                        profileUrl={`/account/employees/${row?.employee_id}`}
                        image={row?.employee_image}
                        role=""
                        roleLink={""}
                        id={row?.employee_id}
                    /> */}
                </td>
            );
        },
    },
    {
        id: "report_date",
        header: "Report Date",
        className: "",
        group: true,
        sorted: false,
        sortAccessor: "report_date",
        cell: ({ row, col, rowSpan }) => {
            return (
                <td
                    className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${
                        col?.id
                    } sp1_tlr_td_marged ${
                        rowSpan ? "sp1_tlr_td_hover-disable" : ""
                    }`}
                    rowSpan={rowSpan}
                >
                    {row?.report_date
                        ? dayjs(row?.report_date).format(
                              "DD-MMM-YYYY"
                              //   "DD-MMM-YYYY h:mm:ss A"
                          )
                        : dayjs(row?.report_submission_date).format(
                              "DD-MMM-YYYY"
                          )}
                </td>
            );
        },
    },
    {
        id: "client_name",
        header: "Client",
        className: "",
        group: false,
        sorted: false,
        sortAccessor: "client_name",
        cell: ({ row, col, rowSpan, className }) => {
            return (
                <td className={`${className} sp1_tlr_td_border`}>
                    <Person
                        avatar={row?.client_image}
                        url={`/account/clients/${row?.client_id}`}
                        name={row?.client_name}
                    />
                    {/* <UserRender
                        name={row?.client_name}
                        profileUrl={`/account/clients/${row?.client_id}`}
                        image={row?.client_image}
                        role="Client"
                        roleLink={""}
                        id={row?.client_id}
                    /> */}
                </td>
            );
        },
    },
    {
        id: "pm_name",
        header: "Project Manager",
        className: "",
        sorted: true,
        group: false,
        sortAccessor: "pm_name",
        cell: ({ row, col, className, rowSpan }) => {
            return (
                <td className={`${className} sp1_tlr_td_border`}>
                    {row?.pm_name ? (
                        <Person
                            avatar={row?.pm_image}
                            url={`/account/employees/${row?.pm_id}`}
                            name={row?.pm_name}
                        />
                    ) : (
                        // <UserRender
                        //     name={row?.pm_name}
                        //     profileUrl={`/account/employees/${row?.pm_id}`}
                        //     image={row?.pm_image}
                        //     role="Project Manager"
                        //     roleLink={""}
                        //     id={row?.pm_id}
                        // />
                        "--"
                    )}
                </td>
            );
        },
    },
    {
        id: "ld_name",
        header: "Lead Developer",
        className: "",
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return (
                <td className={`${className} sp1_tlr_td_ld_border`}>
                    {row?.ld_name ? (
                        <Person
                            avatar={row?.ld_image}
                            url={`/account/employees/${row?.ld_id}`}
                            name={row?.ld_name}
                        />
                    ) : (
                        // <UserRender
                        //     name={row?.ld_name}
                        //     profileUrl={`/account/employees/${row?.ld_id}`}
                        //     image={row?.ld_image}
                        //     role="Lead Developer"
                        //     roleLink={""}
                        //     id={row?.ld_id}
                        // />
                        "--"
                    )}
                </td>
            );
        },
    },

    {
        id: "task_name",
        header: "Task",
        className: "",
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return (
                <td className={`${className} sp1_tlr_td_task_border`}>
                    <a
                        className="text-primary font-weight-bold"
                        href={`/account/tasks/${row?.task_id}`}
                        target="_blank"
                    >
                        {row?.task_name}
                    </a>
                </td>
            );
        },
    },
    {
        id: "page_url",
        header: "Page URL",
        className: "",
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>N/A</td>;
        },
    },

    {
        id: "daily_submission_type",
        header: "Daily Submission Type",
        className: "",
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            const data = row.original;
            return (
                <td className={`${className} sp1_tlr_td_border`}>
                    <DailySubmissionType
                        data={data}
                        sectionName={"section building"}
                    />
                </td>
            );
        },
    },

    {
        id: "total_time_spend",
        header: "Total time spend",
        className: "",
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return (
                <td className={`${className} sp1_tlr_td_border`}>
                    3 Hours 30 Minutes
                </td>
            );
        },
    },
    {
        id: "frontend_password",
        header: "Frontend Password",
        className: "",
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return (
                <td className={`${className} sp1_tlr_td_border`}>12345678</td>
            );
        },
    },

    {
        id: "report_submission_date",
        header: "Report Submission Date",
        className: "",
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return (
                <td className={`${className} sp1_tlr_td_border`}>01-01-2024</td>
            );
        },
    },
    {
        id: "task_status",
        header: "Task Status",
        className: "",
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>To Do</td>;
        },
    },
];

// {
//     id: "page_link",
//     header: "Page Link",
//     className: "",
//     sorted: false,
//     group: false,
//     cell: ({ row, className }) => {
//         return (
//             <td className={`${className} sp1_tlr_td_border`}>
//                 {row?.page_link ? (
//                     <a
//                         className="text-primary font-weight-bold"
//                         href={row?.page_link}
//                         target="_blank"
//                     >
//                         View Link
//                     </a>
//                 ) : (
//                     <span className="text-danger font-weight-bold">
//                         N/A
//                     </span>
//                 )}
//             </td>
//         );
//     },
// },
// {
//     id: "section",
//     header: "Sections",
//     className: "",
//     sorted: false,
//     group: false,
//     cell: ({ row, className }) => {
//         return (
//             <td className={`${className} sp1_tlr_td_border`}>
//                 {row?.section}
//             </td>
//         );
//     },
// },
// {
//     id: "comment",
//     header: "Comment",
//     className: "",
//     sorted: false,
//     group: false,
//     cell: ({ row, className }) => {
//         return (
//             <td className={`${className} sp1_tlr_td_border`}>
//                 <Popover>
//                     <Popover.Button>
//                         <span
//                             className="font-weight-bold singleline-ellipsis"
//                             dangerouslySetInnerHTML={{
//                                 __html: row?.comment,
//                             }}
//                         />
//                     </Popover.Button>

//                     <Popover.Panel>
//                         <div
//                             className="revision_popover_panel"
//                             dangerouslySetInnerHTML={{
//                                 __html: row?.comment,
//                             }}
//                         />
//                     </Popover.Panel>
//                 </Popover>
//             </td>
//         );
//     },
// },
// {
//     id: "total_time_spent",
//     header: "Total Time Spent",
//     className: "",
//     sorted: false,
//     group: false,
//     cell: ({ row, className }) => {
//         return (
//             <td className={`${className} sp1_tlr_td_border`}>
//                 {convertTime(row?.total_time_spent)}
//             </td>
//         );
//     },
// },
// {
//     id: "attachments",
//     header: "Screenshots/Screen records of the sections",
//     className: "",
//     sorted: false,
//     group: false,
//     cell: ({ row, className }) => {
//         return (
//             <td className={`${className} sp1_tlr_td_border`}>
//                 {row?.attachments ? (
//                     <a
//                         className="text-primary font-weight-bold"
//                         href={row?.attachments}
//                         target="_blank"
//                     >
//                         View Link
//                     </a>
//                 ) : (
//                     <span className="text-danger font-weight-bold">
//                         No Attachments
//                     </span>
//                 )}
//             </td>
//         );
//     },
// },
// {
//     id: "site_url",
//     header: `Working/Staging Site's URL`,
//     className: "",
//     sorted: false,
//     group: false,
//     cell: ({ row, className }) => {
//         return (
//             <td className={`${className} sp1_tlr_td_border`}>
//                 {row?.site_url ? (
//                     <a
//                         className="text-primary font-weight-bold"
//                         href={row?.site_url}
//                         target="_blank"
//                     >
//                         View Link
//                     </a>
//                 ) : (
//                     <span className="text-danger font-weight-bold">
//                         N/A
//                     </span>
//                 )}
//             </td>
//         );
//     },
// },
// {
//     id: "frontend_password",
//     header: "Frontend Password",
//     className: "",
//     sorted: false,
//     group: false,
//     cell: ({ row, className }) => {
//         return (
//             <td className={`${className} sp1_tlr_td_border`}>
//                 {row?.frontend_password || (
//                     <span className="text-danger font-weight-bold">
//                         Not Provided
//                     </span>
//                 )}
//             </td>
//         );
//     },
// },
// {
//     id: "report_submission_date",
//     header: "Report Submission Date",
//     className: "",
//     sorted: false,
//     group: false,
//     cell: ({ row, className }) => {
//         return (
//             <td className={`${className} sp1_tlr_td_border`}>
//                 {dayjs(row?.report_submission_date).format(
//                     "DD-MMM-YYYY h:mm:ss A"
//                 )}
//             </td>
//         );
//     },
// },
// {
//     id: "project_name",
//     header: "Project",
//     className: "",
//     sorted: false,
//     group: false,
//     cell: ({ row, col, className, rowSpan }) => {
//         return (
//             <td className={`${className} sp1_tlr_td_border`}>
//                 <a
//                     className="text-primary font-weight-bold"
//                     href={`/account/projects/${row?.project_id}`}
//                     target="_blank"
//                 >
//                     {row?.project_name}
//                 </a>
//             </td>
//         );
//     },
// },
// {
//     id: "status_name",
//     header: "Status",
//     className: "",
//     sorted: false,
//     group: false,
//     cell: ({ row, className }) => {
//         return (
//             <td className={`${className} sp1_tlr_td_border`}>
//                 <span
//                     className="badge"
//                     style={{
//                         backgroundColor: row?.status_color,
//                         color: "white",
//                     }}
//                 >
//                     {row?.status_name}
//                 </span>
//             </td>
//         );
//     },
// },
