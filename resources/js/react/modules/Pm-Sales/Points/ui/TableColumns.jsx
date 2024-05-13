import dayjs from "dayjs";

export const TableColumns = [
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
        accessor: 'created_at',
        id: 'created_at',
        cell: (row) => {
            return <span>{dayjs(row['created_at']).format('MMMM-DD-YYYY')}</span>
        }
    },
    {
        header: 'Action',
        accessor: 'activity',
        id: 'activity',
        cell: (row) => {
            let data = row['activity'];
            if (data) {
                return <span dangerouslySetInnerHTML={{ __html: data }} />
            } else {
                return <span> N/A </span>
            }

        }
    },
    {
        header: "Points Earned",
        accessor: "total_points_earn",
        id: "total_points_earn",
        cell: (row) => {
            return <span>{Number(row['total_points_earn']).toFixed(2)}</span>
        }
    },
    {
        header: "Points Lost",
        accessor: "total_points_lost",
        id: "total_points_lost",
        cell: (row) => {
            return <span>{Number(row['total_points_lost']).toFixed(2)}</span>
        }
    },
    {
        header: "Balance Points",
        accessor: "cumulative_balance",
        id: "cumulative_balance",
        cell: (row) => {
            return <span>{Number(row['cumulative_balance']).toFixed(2)}</span>
        }
    },
]