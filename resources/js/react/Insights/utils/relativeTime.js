import dayjs from "dayjs";
import _ from "lodash";


export const relativeTime = (value, setFilterValue) => {
    if ( value === 'Today'){
            setFilterValue({
                start: dayjs().startOf('day').format(),
                end: dayjs().endOf('day').format(),
            });
        }else if ( value === 'Yesterday'){
            setFilterValue({
                start: dayjs().subtract(1, 'day').startOf('day').format(),
                end: dayjs().subtract(1, 'day').endOf('day').format(),
            });
        }else if ( value === 'This Week'){
            setFilterValue({
                start: dayjs().startOf('week').format(),
                end: dayjs().endOf('week').format(),
            });
        }else if ( value === 'Last Week'){
            setFilterValue({
                start: dayjs().subtract(1, 'week').startOf('week').format(),
                end: dayjs().subtract(1, 'week').endOf('week').format(),
            });
        }else if ( value === 'This Month'){
            setFilterValue({
                start: dayjs().startOf('month').format(),
                end: dayjs().endOf('month').format(),
            });
        } else if ( value === 'Last Month'){
            setFilterValue({
                start: dayjs().subtract(1, 'month').startOf('month').format(),
                end: dayjs().subtract(1, 'month').endOf('month').format(),
            });
        } else if ( value === 'This Quarter'){
            setFilterValue({
                start: dayjs().startOf('quarter').format(),
                end: dayjs().endOf('quarter').format(),
            });
        } else if ( value === 'Last Quarter'){
            setFilterValue({
                start: dayjs().subtract(1, 'quarter').startOf('quarter').format(),
                end: dayjs().subtract(1, 'quarter').endOf('quarter').format(),
            });
        } else if ( value === 'This Year'){
            setFilterValue({
                start: dayjs().startOf('year').format(),
                end: dayjs().endOf('year').format(),
            });
        } else if ( value === 'Last Year'){
            setFilterValue({
                start: dayjs().subtract(1, 'year').startOf('year').format(),
                end: dayjs().subtract(1, 'year').endOf('year').format(),
            });
        } else if (_.lowerCase(value) === "last 2 weeks"){
            setFilterValue({
                start: dayjs().subtract(2, 'week').startOf('week').format(),
                end: dayjs().subtract(1, 'week').endOf('week').format(),
            });
        } else if (value === "Last 3 Week"){
            setFilterValue({
                start: dayjs().subtract(3, 'week').startOf('week').format(),
                end: dayjs().subtract(1, 'week').endOf('week').format(),
            });
        } else if (value === "Last 4 Week"){
            setFilterValue({
                start: dayjs().subtract(4, 'week').startOf('week').format(),
                end: dayjs().subtract(1, 'week').endOf('week').format(),
            });
        } else if (_.lowerCase(value) === "last 2 months"){
            setFilterValue({
                start: dayjs().subtract(2, 'month').startOf('month').format(),
                end: dayjs().subtract(1, 'month').endOf('month').format(),
            });
        } else if (_.lowerCase(value) === "last 3 months"){
            setFilterValue({
                start: dayjs().subtract(3, 'month').startOf('month').format(),
                end: dayjs().subtract(1, 'month').endOf('month').format(),
            });
        } else if (_.lowerCase(value) === "last 6 months"){
            setFilterValue({
                start: dayjs().subtract(6, 'month').startOf('month').format(),
                end: dayjs().subtract(1, 'month').endOf('month').format(),
            });
        } else if (_.lowerCase(value) === "last 12 months"){
            setFilterValue({
                start: dayjs().subtract(12, 'month').startOf('month').format(),
                end: dayjs().subtract(1, 'month').endOf('month').format(),
            });
        }
}