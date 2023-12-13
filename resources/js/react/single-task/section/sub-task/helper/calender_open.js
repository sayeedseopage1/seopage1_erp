import { toast } from 'react-toastify';
import { CompareDate } from "../../../../utils/dateController";

const d = new CompareDate();

export const calenderOpen = (
    maxDate
) => {

    const today = d.dayjs().toDate();
    const isBefore = d.dayjs(maxDate).isBefore(today, 'day');
    const isEqual = d.dayjs(maxDate).isSame(today, 'day');


    if(isEqual){
        toast.warn('Task deadline today! Parent task running out of time. No alternative date chosen.')
    }

    if(isBefore){
        toast.error('The parent task deadline has already been exceeded.')
    }
}
