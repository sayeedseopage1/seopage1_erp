import extractTime from "./extractTime";
import isTimeOverlapping from "./isTimeOverlapping";
import dayjs from "dayjs";
const checkOverlap = (newOverlappingTimes, durations, trackedTimeHistory) => {
    for (const duration of durations) {
        const durationStart = duration.start;
        const durationEnd = duration.end;

        for (const tracked of trackedTimeHistory) {
            const trackedStart = extractTime(tracked.start_time);
            const trackedEnd = extractTime(tracked.end_time);

            if (
                isTimeOverlapping(
                    durationStart,
                    durationEnd,
                    trackedStart,
                    trackedEnd
                )
            ) {
                if (newOverlappingTimes?.length < 1) {
                    newOverlappingTimes.push({ trackedStart, trackedEnd });
                }
                return true;
            }
        }
    }

    return false;
};

export default checkOverlap;
