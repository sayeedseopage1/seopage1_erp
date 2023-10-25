import dayjs from "dayjs";
import Popover from "../../global/Popover";
import PersonColumn from '../../global/PersonColumn'
import styles from './taskAuthorization.module.css'
import Button from "../../global/Button";
import TaskAuthorizationForm from "./TaskAuthorizationForm";


export const AuthorizationColumns = [
    {
        id: "date",
        header: 'Date',
        draggable: true,
        accessorKey: "created_at",
        cell: ({ row, table })=> dayjs(row.original?.created_at).format('MMM DD, YYYY')
    },
    {
        id: "project",
        header: 'Project',
        draggable: true,
        accessorKey: "project_name",
        cell: ({ row, table })=> (
            <Popover>
                <Popover.Button>
                    <a href={`/account/projects/${row.original?.project_id}`} className="singleline-ellipsis">
                        { row.original?.project_name }
                    </a>
                </Popover.Button>
                <Popover.Panel>
                    <div  className={styles.popover_panel}>
                        <a href={`/account/projects/${row.original?.project_id}`}>
                            { row.original?.project_name }
                        </a>
                    </div>
                </Popover.Panel>
            </Popover>
        )
    },
    {
        id: "client",
        header: 'Client',
        draggable: true,
        accessorKey: "client_name",
        cell: ({ row, table })=> (
           <PersonColumn
                name= {row.original.client_name}
                avatar = { row.original.client_avatar}
                profileLink={`/account/clients/${row.original.client_id}`}
                slug=""
           />
        )
    },
    {
        id: "task",
        header: 'Task',
        draggable: true,
        accessorKey: "heading",
        cell: ({ row, table })=> (
            <Popover>
                <Popover.Button>
                    { row.original?.heading }
                </Popover.Button>
                <Popover.Panel>
                    <div  className={styles.popover_panel}>
                        { row.original?.heading }
                    </div>
                </Popover.Panel>
            </Popover>
        )
    },

    {
        id: "assignee_by",
        header: 'Assignee By',
        draggable: true,
        accessorKey: "assignee_by_name",
        cell: ({ row, table })=> (
            <PersonColumn
                name= { row.original?.assignee_by_name}
                avatar={row.original?.assignee_by_avatar}
                slug=""
                profileLink={`/account/employees/${row.original?.assignee_by_id}`}
            />
        )
    },

    {
        id: "assignee_to",
        header: 'Assignee To',
        draggable: true,
        accessorKey: "assignee_to_name",
        cell: ({ row, table })=> (
            <PersonColumn
                name= { row.original?.assignee_to_name}
                avatar={row.original?.assignee_to_avatar}
                slug=""
                profileLink={`/account/employees/${row.original?.assignee_to_id}`}
            />
        )
    },
    {
        id: "acknowledgement",
        header: 'Acknowledgement',
        draggable: true,
        cell: ({ row, table })=> {
            const subAcknowledgement = row.original?.sub_acknowledgement;
            const acknowledgement = row.original?.acknowledgement;

            return(
                    <Popover>
                        <Popover.Button>
                            {acknowledgement + " "}
                            <strong>
                                {subAcknowledgement}
                            </strong>
                        </Popover.Button>
                        <Popover.Panel>
                            <div  className={styles.popover_panel} >
                                {acknowledgement + " "}
                                <strong>
                                    {subAcknowledgement}
                                </strong>
                            </div>
                        </Popover.Panel>
                    </Popover>
            )
        }
    },
    {
        id: "action",
        header: 'Actions',
        draggable: true,

        cell: ({ row, table })=> {

            return(
                <TaskAuthorizationForm data={row.original} table={table} />
            )
        }
    },

]