import dayjs from "dayjs"
import Tooltip from '../ui/Tooltip';


export const DataTableColumns = [
    {
        header: 'ID',
        accessor: 'id',
        id: 'id',
        cell: (row) => {
            return <span>{row['id']}</span>
        }
    },
     {
        header: 'Title',
        accessor: 'project_name',
        id: 'project_name',
        cell: (row) => {
            return <span>
                {/* <a href={`/account/projects/${row['project_id']}`}> */}
                 {/* <a href="#" > */}
                    {row['project_name']}
                {/* </a> */}
            </span>
        }
    },
    {
        header: "Value",
        id: "amount",
        accessor: 'amount',
        cell: (row) => {
            return <span style={{fontWeight: '600', float:"right"}}> ${row['amount'].toFixed(2)} </span>
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
        cell: (row) => <span> {dayjs(row['created_at']).format('YYYY-MM-DD')}  </span> 
    }
]