import React from "react";
import FormatTime from "../../../../../../../../utils/FormatTime";

const TrackedTimeTable = ({ trackedTimeHistory }) => {
    return (
        <React.Fragment>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Total Tracked Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {trackedTimeHistory?.map((history, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{FormatTime(history.start_time)}</td>
                            <td>{FormatTime(history.end_time)}</td>
                            <td>{history.hours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default TrackedTimeTable;
