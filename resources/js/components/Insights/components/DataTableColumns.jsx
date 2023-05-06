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
        header: 'Title',
        accessor: 'project_name',
        id: 'project_name',
        cell: (row) => {
            return <span>
                <a href={`/account/deals/${row['id']}`}>
                 {/* <a href="#" > */}
                    {row['project_name']}
                </a>
            </span>
        }
    },
    {
        header: "Value",
        id: "amount",
        accessor: 'amount',
        cell: (row) => {
            return <span style={{fontWeight: '600'}}> ${row['amount'].toFixed(2)} </span>
        }
    },
    {
        header: "Client",
        id: "client",
        accessor: 'client',
        cell: (row) => {
            return <span >
                    {/* <a href={`/account/clients/${row['client_id']}`} > */}
                        {row['client_name'] || row['client_username']}
                    {/* </a> */}
            </span>
        }
    },
    {
        header: 'Deal created at',
        id: 'created_at',
        accessor: 'created_at',
        cell: (row) => {
            return <span> {dayjs(row['created_at']).format('MMM DD, YYYY')} </span>
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
        header: 'Owner',
        id: "owner",
        accessor: 'added_by',
        cell: (row) => <OwnerCell {...row} />
    },
    {
        header: 'Stage',
        id: "deal_stage",
        accessor: 'deal_stage',
        cell: (row) => <StageCell {...row} />
    },
    
]





// owner cell
const OwnerCell = (row) => {
    const {users, getUserById} = useUsers(); 
    const user = getUserById(users, row['added_by']);
    if(!user) return <span> - </span>
    return <span> {user.name} </span>
}


// stage cell 
const StageCell = (row) => {
    return <span> {stage[row['deal_stage']]} </span>
}