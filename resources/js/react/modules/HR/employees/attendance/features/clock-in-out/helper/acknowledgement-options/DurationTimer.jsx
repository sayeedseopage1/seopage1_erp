import React, { useState, useEffect, useMemo } from "react";
import { TimePicker, Space } from "antd";

const DurationTime = ({
    durations,
    setDurations,
    id,
    startTime,
    endTime,
    onRemove,
}) => {
    const [start, setStart] = useState(startTime);
    const [end, setEnd] = useState(endTime);

    const _start = useMemo(() => start, [start]);
    const _end = useMemo(() => end, [end]);

    // time duration
    const handleSelectTimeDuration = (value, id) => {
        const arr = durations.map((d) => {
            return d.id === id ? { ...value, id } : d;
        });
        setDurations(arr);
    };

    useEffect(() => {
        handleSelectTimeDuration({ start: _start, end: _end }, id);
    }, [_start, _end]);

    return (
        <div className="position-relative row mt-2">
            <div className="col-5 input-group d-flex flex-column">
                <Space wrap>
                    <TimePicker
                        use12Hours
                        format="h:mm a"
                        defaultValue={start}
                        onChange={(time) => setStart(time)}
                        className="w-100 py-2"
                    />
                </Space>
            </div>

            <div className="col-5 input-group d-flex flex-column">
                <Space wrap>
                    <TimePicker
                        use12Hours
                        format="h:mm a"
                        defaultValue={end}
                        onChange={(time) => setEnd(time)}
                        className="w-100 py-2"
                    />
                </Space>
            </div>

            {durations?.length > 1 && (
                <div className="col-2">
                    <button
                        className="sp1_remove-time-duration px-2"
                        onClick={(e) => onRemove(e, id)}
                    >
                        <i className="fa-solid fa-trash-can" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default DurationTime;
