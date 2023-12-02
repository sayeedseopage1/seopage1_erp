import { CompareDate } from "../../../../../utils/dateController";
const dayjs = new CompareDate();

export const useDateFormat = () => {

    const date = (_date) => {
        const d = {
            unFormatted: _date,
            formatted: dayjs.dayjs(_date).isSame(dayjs.dayjs(), 'day') ? 'Today' : dayjs.dayjs(_date).format('MMM DD, YYYY')
        }

        return d;
    };

    return { date };
}
