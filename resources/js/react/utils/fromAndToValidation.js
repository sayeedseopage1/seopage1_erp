export const fromAndToValidation = (durations) => {
    for (const duration of durations) {
        const durationStart = duration.start;
        const durationEnd = duration.end;

        if (durationStart > durationEnd) {
            return true;
        }
    }

    return false;
};
