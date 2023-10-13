import dayjs from "dayjs";
import styles from './taskAuthorization.module.css'
import TaskAuthorizationForm from "./TaskAuthorizationForm";
import Popover from "../../../../ui/Popover";
import PersonColumn from "../../../../ui/PersonColumn";


export const AuthorizationColumns = [
    {
        id: "date",
        header: 'Date',
        draggable: true,
        cell: ({ row, table })=> dayjs(row.original?.created_at).format('MMM DD, YYYY')
    },
    {
        id: "project",
        header: 'Project',
        draggable: true,

        cell: ({ row, table })=> (
            <Popover>
                <Popover.Button>
                    <a href={`/account/projects/${row.original?.project_id}`} className="singleline-ellipsis">
                        { row.original?.project_name }
                    </a>
                </Popover.Button>
                <Popover.Panel>
                    <div  className={styles.popover_panel}>
                        <a href={`/account/projects/${row.original?.project_id}`} className="singleline-ellipsis">
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

