import dayjs from "dayjs"
import Tooltip from '../ui/Tooltip';
import { useUsers } from "../hooks/useUsers";
import { stage } from "../utils/constants";







export const DataTableColumns = [
    // {
    //     header: 'ID',
    //     accessor: 'id',
    //     id: 'id',
    //     cell: (row) => {
    //         return <span>{row['id']}</span>
    //     }
    // },
     {
        header: 'Deal Name',
        accessor: 'project_name',
        id: 'project_name',
        cell: (row) => {
            let id = row['id'];
            let name = row['project_name'];

            return <span>
                {
                    id && name ?
                    <a href={`/account/deals/${id}`}>
                        {name}
                    </a>
                    : <span> - </span>
                }
                
            </span>
        }
    },
    {
        header: "Project Budget (USD)",
        id: "project_budget",
        accessor: 'project_budget',
        cell: (row) => {
            const amount = row['amount'];

            return (amount) ?
                <span style={{fontWeight: 'bold'}}>
                    {amount.toFixed(2)}
                </span>
                : <span> - </span>
        }
    },
    {
        header: "Currency",
        id: "currency",
        accessor: 'currency',
        cell: (row) => {
            return <span> USD </span> 
        }
    },
    
    {
        header: "Project Link",
        id: "project_link",
        accessor: 'project_link',
        cell: (row) => {
            const project_link = row['project_link'];

            return (project_link) ?
                <span>
                    <a href={project_link}>
                    {project_link}
                </a>
                </span>
                : <span> - </span>
        }
    },
    {
        header: "Client Username",
        id: "client_username",
        accessor: 'client_username',
        cell: (row) => {
            const client_username = row['client_username'];

            return (client_username) ? 
                <span> {client_username} </span>
                : <span> - </span>
        }
    },
    {
        header: 'Deal Created Date',
        id: 'deal_created_date',
        accessor: 'deal_created_date',
        cell: (row) => {
            const deal_created_date = row['created_at'];

            return (deal_created_date) ?
                <span> {dayjs(deal_created_date).format('MMM DD, YYYY')} </span>
                : <span> - </span>
        } 
    },
    {
        header: 'Pipeline',
        id: 'pipeline',
        accessor: 'pipeline',
        cell: (row) => {
            return <span> Pipeline </span>
        } 
    },
     {
        header: 'Deal Won By',
        id: 'deal_won_by',
        accessor: 'deal_won_by',
        cell: (row) => {
            const deal_won_by = row['won_by'];

            return (deal_won_by) ?
                <span> {deal_won_by} </span>
                : <span> - </span>
        } 
    },
    
    {
        header: 'Deal Converted By',
        id: "deal_converted_by",
        accessor: 'deal_converted_by',
        cell: (row) => <OwnerCell {...row} />
    },
    {
        header: 'Current Stage',
        id: "current_stage",
        accessor: 'current_stage',
        cell: (row) => <StageCell {...row} />
    },
    {
        header: 'Deal Status',
        id: "deal_status",
        accessor: 'deal_status',
        cell: (row) => {
            const deal_status = row['won_lost'];
            return (deal_status) ?
                deal_status === 'Yes' ?
                <span> Won </span>
                : <span> Lost </span>
                : <span> Open </span>
        }
    }
    
]





// owner cell
const OwnerCell = (row) => {
    const {users, getUserById} = useUsers(); 
    const user = getUserById(users, Number(row['converted_by']));
    if(!user) return <span> - </span>
    return <span> {user.name} </span>
}


// stage cell 
const StageCell = (row) => {
    return <span> { stage[row['deal_stage']]} </span>
}