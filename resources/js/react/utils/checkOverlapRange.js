import dayjs from "dayjs";
const checkOverlapRange = (lastClockOutTime, durations) => {
    const timeFormat = "HH:mm:ss";
    const endOfDay = "23:00:00"; // 11 PM
    const startOfDay = "07:45:00"; // 7:45 AM

    // Adjust lastClockOutTime to not exceed 11 PM
    // if (!lastClockOutTime || lastClockOutTime > endOfDay) {
    if (
        !lastClockOutTime ||
        lastClockOutTime < startOfDay ||
        lastClockOutTime > endOfDay
    ) {
        lastClockOutTime = endOfDay;
    }
    console.log("last clock out time", lastClockOutTime);
    for (const duration of durations) {
        const durationStart = dayjs(duration.start, timeFormat).format(
            timeFormat
        );
        const durationEnd = dayjs(duration.end, timeFormat).format(timeFormat);

        // Check if durationStart or durationEnd is outside the valid time range
        if (
            dayjs(durationStart, timeFormat).isBefore(
                dayjs(startOfDay, timeFormat)
            ) ||
            dayjs(durationEnd, timeFormat).isBefore(
                dayjs(startOfDay, timeFormat)
            ) ||
            dayjs(durationStart, timeFormat).isAfter(
                dayjs(lastClockOutTime, timeFormat)
            ) ||
            dayjs(durationEnd, timeFormat).isAfter(
                dayjs(lastClockOutTime, timeFormat)
            )
        ) {
            return true;
        }
    }
    return false;
};

export default checkOverlapRange;
