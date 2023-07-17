import * as React from 'react';
import DataTable from '../ui/DataTable';
import _ from 'lodash';




const GoalSummaryTable = React.forwardRef(({data, isLoading, goal}, ref) => {
    // const { getSummary } = useDealsState();
    // const [data, setData] = React.useState([]);
    // const [isLoading, setIsLoading] = React.useState(false);
   
    // React.useEffect (() => {
    //     setIsLoading(true);
    //     if(deals && deals.length > 0 && goal){
    //         let sum = getSummary(deals, goal);
    //         if(sum) {
    //             setData([...sum]);
    //             setIsLoading(false);
    //         } else {
    //             setIsLoading(false);
    //         }
    //     }
    // }, [])


    // React.useEffect (() => {
    //     setIsLoading(true);
    //     if(deals && deals.length > 0 && goal){
    //         let sum = getSummary(deals, goal);
    //         if(sum) {
    //             setData([...sum]);
    //             setIsLoading(false);
    //         } else {
    //             setIsLoading(false);
    //         }
    //     }

    // }, [deals, goal])

    



    return(
        <div>
            <DataTable  
                ref={ref} 
                data={data}
                isLoading={isLoading}
                defaultColumns={GoalSummaryTableColumns}
                goal={goal}
            />
        </div>
    )
})

export default GoalSummaryTable;




// columns

const GoalSummaryTableColumns =   [
    {
        header: 'Deal Created',
        accessor: 'deal_created',
        id: 'deal_created',
        cell: (row) => {
            return <span>{row['title']}</span>
        }
    },
    {
        header: 'Goal',
        accessor: 'goal',
        id: 'goal',
        cell: (row) => {
           return <span>{row['goal']}</span>
        }
    },

    {
        header: 'Result',
        accessor: 'result',
        id: 'result',
        cell: (row) => {
           return <span>{row['result']}</span>
        }
    },

    {
        header: 'Difference',
        accessor: 'difference',
        id: 'difference',
        cell: (row) => {
            const diff = row['difference'];
            const color = diff < 0 ? 'red' : 'green';
           return <span style={{fontWeight: '600', color: color}}>{diff}</span>
        }
    },

    {
        header: 'Goal Progress',
        accessor: 'goalProgress',
        id: 'goalProgress',
        cell: (row) => {
           return <span>
                {row['goalProgress']}%
           </span>
        }
    },
]