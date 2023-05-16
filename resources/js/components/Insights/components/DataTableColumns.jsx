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
        header: "Value",
        id: "amount",
        accessor: 'amount',
        cell: (row) => {
            const amount = row['amount'];

            return  (amount === undefined && amount === null) ?
                    <span style={{fontWeight: '600'}}> ${amount.toFixed(2)} </span>
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
            const deal_created_date = row['deal_created_date'];

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
    
]





// owner cell
const OwnerCell = (row) => {
    const {users, getUserById} = useUsers(); 
    const user = getUserById(users, row['']);
    if(!user) return <span> - </span>
    return <span> {user.name} </span>
}


// stage cell 
const StageCell = (row) => {
    return <span> { stage[row['deal_stage']]} </span>
}