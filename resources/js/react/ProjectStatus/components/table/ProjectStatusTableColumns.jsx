import Avatar from "../../../global/Avatar";
import { getColor } from "../../../utils/getColor";
import Popover from "../ui/Popover";
import { CreatedBy } from "./ui";
import style from '../ui/popover.module.css'


export const ProjectStatusTableColumns = [
    {
        id: "id",
        header: "#",
        accessorKey: "id",
        cell: ({ row,cell }) => {
            const data = row.original;
            return (
                <span>{cell?.row?.index + 1}</span>
            );
        }
    },
    {
        id: "clientName",
        header: "Client Name",
        accessorKey: "clientName",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <CreatedBy
                    href={`/account/clients/${data.clientId}`}
                >
                    <Avatar
                        type="circle"
                        name={data?.clientName}
                        src={data?.clientImage ? `/user-uploads/avatar/${data?.clientImage}` : null}
                    />
                    <span>{data?.clientName}</span>
                </CreatedBy>
            );
        }
    },
    {
        id: "project_name",
        header: "Project Name",
        accessorKey: "project_name",
        cell: ({ row, table  }) => {
            const data = row.original;
            const handler = table.options.meta
            return (
                <p
                onClick={() => handler.onClickHandler(data)}
                    role="button"
                    className="multiline-ellipsis text-hover-underline-color pr-2 text-primary"
                >
                    {data?.project_name}
                </p>
            );
        },
    },
    {
        id: "project_budget",
        header: "Project Budget",
        accessorKey: "project_budget",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span>
                    {data?.project_budget} {data?.currency_symbol}
                </span>
            );
        }
    },
    {
        id: "pmName",
        header: "Project Manager",
        accessorKey: "pmName",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <CreatedBy
                    href={`/account/employees/${data.pmId}`}
                >
                    <Avatar
                        type="circle"
                        name={data?.pmName}
                        src={data?.pmImage ? `/user-uploads/avatar/${data?.pmImage}` : null}
                    />

                    <span>{data?.pmName}</span>
                </CreatedBy>
            );
        }
    },
    {
        id: "project_category",
        header: "Project Category",
        accessorKey: "project_category",
    },
    {
        id: "goal_start_date",
        header: "Start Date",
        accessorKey: "goal_start_date",
    },
    {
        id: "percentage_of_goals_met",
        header: "Percentage of Goals Met",
        cell: ({ row, table }) => {
            const data = row.original;
            const handler = table.options.meta
            return (
                <div className="progress" style={{
                    height: "15px",
                }}>
                    <Popover>
                        <Popover.Button>
                            <div
                                onClick={() => handler.onPercentOfGoalMet(data)}
                                className={`${style.projectStatus_percent_popover_button}`}
                            >
                                <div
                                    className="progress-bar f-12"
                                    role="progressbar"
                                    style={{
                                        width: `${data?.goal_percentage ?? 0}%`,
                                        backgroundColor: getColor(data?.goal_percentage ?? 0),
                                        height: "15px"}}
                                    aria-valuenow={data?.goal_percentage ?? 0}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {percentage}%
                                </div>
                            </div>
                        </Popover.Button>
                        <Popover.Panel>
                            <div className={`${style.projectStatus_popover_panel}`}>
                                <div
                                    className="d-flex flex-column justify-content-start align-items-start"
                                >
                                    <p>Total goals: {data?.total_goal}</p>
                                    <p>Goals deadline expired so far: {data?.goal_expire}</p>
                                    <p>Goals met: {data?.goal_meet}</p>
                                    <p>Percentage of goals met: {data?.goal_percentage ?? 0}%</p>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Popover>
                </div>
            );

        }
    },
    {
        id: "next_goal_date",
        header: "Next Goal Date",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Popover>
                    <Popover.Button>
                            <div className={`${style.projectStatus_popover_button}`}>
                                {
                                    data.upcoming_goal_day === 0 ?
                                    <p>Today</p> :
                                    data.upcoming_goal_day ?
                                     <p>In {data.upcoming_goal_day} Days</p> :
                                         <p>No upcoming goals!</p>}
                            </div>
                    </Popover.Button>
                    <Popover.Panel>
                        <div className={`${style.projectStatus_popover_panel}`}>
                             <div
                                className="d-flex flex-column justify-content-start align-items-start"
                            >
                                {
                                    data.next_goal_date ?
                                        <p>Next Goal Date : {data.next_goal_date}</p> :
                                            <p>All goals are completed!</p>
                                }
                            </div>
                        </div>
                    </Popover.Panel>
                </Popover>

            );

        }
    },
    {
        id: "next_goal_details",
        header: "Next Goal Details",
        cell: ({ row, table }) => {
                 const data = row.original;
                const handler = table.options.meta;
                return (
                    <button onClick={() => handler.onNextGoalDetails(data)} className="btn btn-success">View Details</button>
                );

        }
    }
];
