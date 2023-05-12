
import DataTable from '../../Insights/ui/DataTable';

const CashPoints = () => {
    const data = []


    return(
        // <PointPageContainer>
            <div className="" style={{padding: '16px'}}> 
            <DataTable
                data={data}
                isLoading={false}
                defaultColumns={[
                    {
                        header: 'ID',
                        accessor: 'id',
                        id: 'id',
                        cell: (row) => {
                            return <span>{row['id']}</span>
                        } 
                    },
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
        // </PointPageContainer>
    )
}

export default CashPoints;