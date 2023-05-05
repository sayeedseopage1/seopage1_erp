import * as React from 'react';
import DataTable from '../ui/DataTable';
import { getPeriod } from '../utils/getPeriod';
import _ from 'lodash';
import { useGoals } from '../hooks/useGoals';
import { useDealsState } from '../hooks/useDealsState';



const GoalSummaryTable = ({deals, goal}) => {
    const { getTargetPeriod } = useGoals();
    const { getSummary } = useDealsState();
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [period, setPeriod] = React.useState([]);


    // get goals
     const getEndDate = (goal) => {
        const frequency = _.toLower(goal.frequency)

        if(frequency === 'monthly'){
            return dayjs(goal.startDate).add(1, 'month').format('YYYY-MM-DD');
        }

        if(frequency === 'weekly'){
            return dayjs(goal.startDate).add(1, 'week').format('YYYY-MM-DD');
        } 
        
        if(frequency === 'yearly'){
            return dayjs(goal.startDate).add(1, 'year').format('YYYY-MM-DD');
        }
        if(frequency === 'quarterly'){
            return dayjs(goal.startDate).add(1, 'quarter').format('YYYY-MM-DD');
        }
    }



    React.useEffect (() => {
        setIsLoading(true);
        if(deals && deals.length > 0 && goal){
            let sum = getSummary(deals, goal);
            if(sum) {
                setData([...sum]);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        }
    }, [])


    React.useEffect (() => {
        setIsLoading(true);
        if(deals && deals.length > 0 && goal){
            let sum = getSummary(deals, goal);
            if(sum) {
                setData([...sum]);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        }

    }, [deals, goal])

    



    return(
        <div>
            <div>Summary</div>

            <DataTable 
                data={data}
                isLoading={isLoading}
                defaultColumns={GoalSummaryTableColumns}
            />
        </div>
    )
};

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
           return <span style={{fontWeight: '600'}}>${row['goal'].toFixed(2)}</span>
        }
    },

    {
        header: 'Result',
        accessor: 'dealAdded',
        id: 'dealAdded',
        cell: (row) => {
           return <span style={{fontWeight: '600'}}>${row['dealAdded'].toFixed(2)}</span>
        }
    },

    {
        header: 'Difference',
        accessor: 'difference',
        id: 'difference',
        cell: (row) => {
            const diff = row['difference'];
            const color = diff < 0 ? 'red' : 'green';
            const text = diff < 0 ? `- $${Math.abs(diff).toFixed(2)}` : `+ $${Math.abs(diff).toFixed(2)}`
           return <span style={{fontWeight: '600', color: color}}>{text}</span>
        }
    },

    // {
    //     header: 'Result',
    //     accessor: 'dealAdded',
    //     id: 'dealAdded',
    //     cell: (row) => {
    //        return <span style={{fontWeight: '600'}}>${row['dealAdded'].toFixed(2)}</span>
    //     }
    // },
]