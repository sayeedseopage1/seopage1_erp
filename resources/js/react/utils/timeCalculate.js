import dayjs from "dayjs";

export const timeCalculate = (date) => {
    const providedDate = dayjs(date);
    const currentDate = dayjs();
    const diff = currentDate.diff(providedDate, 'minute');
    if (diff < 1) {
        return 'Just now';
    } else if (diff < 60) {
        return `${diff} minute${diff > 1 ? 's' : ''} ago`;
    } else if (diff < 1440) { // Less than 24 hours
        const hours = Math.floor(diff / 60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diff < 10080) { // Less than 7 days
        const days = Math.floor(diff / 1440);
        return `${days} day${days > 1 ? 's' : ''} ago`
    } else {
        return providedDate.format('MMM DD, YYYY [at] h:mm A');
    }
}
