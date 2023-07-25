import DataTable from '../ui/DataTable';

const NonCashPointHistory = () => {
    const data = []

    return(
        <div>
             <DataTable
                data={data}
                isLoading={false}
                defaultColumns={[
                    // {
                    //     header: 'ID',
                    //     accessor: 'id',
                    //     id: 'id',
                    //     cell: (row) => {
                    //         return <span>{row['id']}</span>
                    //     } 
                    // },
                    {
                        header: 'Date',
                        accessor: 'date',
                        id: 'date',
                        cell: (row) => {
                            return <span>{row['date']}</span>
                        } 
                    },
                    {
                        header: 'Action',
                        accessor: 'action',
                        id: 'action',
                        cell: (row) => {
                            return <span>{row['action']}</span>
                        } 
                    },
                    {
                        header: 'Gained as a',
                        accessor: 'gained_as_a',
                        id: 'gained_as',
                        cell: (row) => {
                            return <span>{row['action']}</span>
                        } 
                    },
                    {
                        header: "Point Earned",
                        accessor: "pointsEarned",
                        id: "pointsEarned",
                        cell: (row) => {
                            return <span>{row['pointsEarned']}</span>
                        }
                    },
                    {
                        header: "Point Lost",
                        accessor: "pointsLost",
                        id: "pointsLost",
                        cell: (row) => {
                            return <span>{row['pointsLost']}</span>
                        }
                    },
                    {
                        header: "Balance Point",
                        accessor: "balancePoints",
                        id: "balancePoints",
                        cell: (row) => {
                            return <span>{row['balancePoints']}</span>
                        }
                    }
                ]}
            />
        </div>
    )
}


export default NonCashPointHistory;