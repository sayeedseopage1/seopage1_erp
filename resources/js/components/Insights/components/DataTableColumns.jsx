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
        header: 'Deal created',
        id: 'deal_created',
        accessor: 'deal_created',
        cell: (row) => {
            return <span>{row['client_username']}</span>
        }
    } 
]