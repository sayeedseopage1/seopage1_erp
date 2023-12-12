import { toast } from 'react-toastify';
import { CompareDate } from "../../../../utils/dateController";

const d = new CompareDate();

export const calenderOpen = (
    minDate,
    maxDate
) => {

    const today = d.dayjs();
    const isBefore = d.dayjs(maxDate).isBefore(today, 'day');
    const isEqual = d.dayjs(maxDate).isSame(today, 'day');
    const isMaxDateGreaterThenMinDate = d.dayjs(maxDate).isBefore(minDate, 'day');

    // if min > max date
    if(isMaxDateGreaterThenMinDate){
        toast.error("Minimum date must be less then maximum date");
    }

    if(isEqual){
        toast.warn('Task deadline today! Parent task running out of time. No alternative date chosen.')
    }

    if(!isBefore && !isEqual){
        toast.error('Parent task running out of time.')
    }

}
