import React, {useState, useEffect, useMemo, useId} from 'react';

// duration time
const DurationTime = ({durations,setDurations,id, startTime, endTime, onRemove }) => {
    const [start, setStart] = useState(startTime);
    const [end, setEnd] = useState(endTime);
    useEffect(() => {
        window
            .$(`#timepicker1${id}`)
            .timepicker("setTime", startTime)
            .on("changeTime.timepicker", function (e) {
                e.preventDefault();
                setStart(e.target.value);
            });

        window
            .$(`#timepicker5${id}`)
            .timepicker("setTime", endTime)
            .on("changeTime.timepicker", function (e) {
                e.preventDefault();
                setEnd(e.target.value);
            });
    }, []);

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
        handleSelectTimeDuration({ start: _start, end: _end}, id);
    }, [_start, _end]);

    return (
        <div className="position-relative row mt-2">
            <div className="col-5 input-group bootstrap-timepicker timepicker d-flex flex-column">
                <input
                    id={`timepicker1${id}`}
                    className="form-control w-100 py-2"
                    data-minute-step="1"
                    data-modal-backdrop="false"
                    type="text"
                />
            </div>

            <div className="col-5 input-group bootstrap-timepicker timepicker d-flex flex-column">
                <input
                    id={`timepicker5${id}`}
                    className="form-control w-100 py-2"
                    data-minute-step="1"
                    data-modal-backdrop="false"
                    type="text"
                />
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


export default DurationTime