const checkOverlapRange = (lastClockOutTime, durations) => {
    const startOfDay = "07:45:00"; // 7:45 AM

    // Adjust lastClockOutTime to not exceed 11 PM
    console.log("last clock out time", lastClockOutTime);

    // Convert time string to seconds since start of the day
    const timeToSeconds = (time) => {
        const [hours, minutes, seconds] = time.split(":").map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    // Convert startOfDay and endOfDay to seconds
    const startOfDaySeconds = timeToSeconds(startOfDay);

    const lastClockOutTimeSeconds = timeToSeconds(lastClockOutTime);

    for (const duration of durations) {
        const durationStart = duration.start;
        const durationEnd = duration.end;

        // Convert duration start and end times to seconds
        const durationStartSeconds = timeToSeconds(durationStart);
        const durationEndSeconds = timeToSeconds(durationEnd);

        // Check if durationStart or durationEnd is outside the valid time range
        if (
            durationStartSeconds < startOfDaySeconds ||
            durationEndSeconds < startOfDaySeconds ||
            durationStartSeconds > lastClockOutTimeSeconds ||
            durationEndSeconds > lastClockOutTimeSeconds
        ) {
            return true;
        }
    }
    return false;
};

export default checkOverlapRange;
