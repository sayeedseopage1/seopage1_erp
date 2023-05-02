export const DataTableColumns = [
    {
        header: 'ID',
        id: 'id',
        cell: (row) => {
            return <span>{row['id']}</span>
        }
    },
    {
        header: 'Deal created',
        id: 'deal_created',
        cell: (row) => {
            return <span>{row['client_username']}</span>
        }
    } 
]