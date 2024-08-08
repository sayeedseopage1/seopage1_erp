const isTimeOverlapping = (
    durationStart,
    durationEnd,
    trackedStart,
    trackedEnd
) => {
    const durationStart1 = durationStart;
    const durationEnd1 = durationEnd;
    const trackedStart1 = trackedStart;
    const trackedEnd1 = trackedEnd;

    const isStartWithinTracked =
        durationStart1 >= trackedStart1 && durationStart1 <= trackedEnd1;
    const isEndWithinTracked =
        durationEnd1 >= trackedStart1 && durationEnd1 <= trackedEnd1;
    const isTrackedWithinDuration =
        durationStart1 <= trackedStart1 && durationEnd1 >= trackedEnd1;

    return (
        isStartWithinTracked || isEndWithinTracked || isTrackedWithinDuration
    );
};
export default isTimeOverlapping;
