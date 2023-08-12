import React from "react";
import { TimeLog } from "../../../../utils/single-task"; 
import Loader from "../../../components/Loader"; 

const TimeLogContainer = ({ task, timeLog, isLoading }) => {

    
    return (
        <div className="sp1_modal_timelog_view">
            <div><h6> Session Logs </h6> </div>
            <div>
                <table className="sp1_subtask_log-tbl">
                        <thead className="__thead">
                            <tr>
                                <th>Employee</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Memo</th>
                                <th>Hours Logged</th>
                            </tr>
                        </thead>

                </table>
                <div className="sp1_modal_timelog_view-tbl-contanier">  
                    <table className="sp1_subtask_log-tbl"> 
                        <tbody className="__tbody"> 
                            {timeLog
                                ? timeLog.map((log) => (
                                    <TableRow key={log.id} log={log} />
                                ))
                                : null}

                            {isLoading && <tr><td className="py-2 text-center" colSpan={5}><Loader /></td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TimeLogContainer;

const TableRow = ({ log }) => {
    const timeLog = new TimeLog(log);
    const user = timeLog?.user;


    return (
        <tr className="__tbody_tr">
            <td className="__tbody_td _tbody_td_employee">
                <img src={user?.getAvatar()} alt={user?.getName()} />
                <span className="px-2">{user?.getName()}</span>
            </td> 
            <td className='__tbody_td _tbody_td_start_time'>
                {timeLog?.getStartTime()} <br/>
                {timeLog?.getStartTime('hh:mm a')}
            </td>
            
            <td className='__tbody_td _tbody_td_start_time _tbody_td_start_end'>
                {!timeLog?.endTime ? <span className="text-success font-weight-bold">Active</span> :
                    <>
                        {timeLog?.getEndTime()} <br/>
                        {timeLog?.getEndTime('hh:mm a')}
                    </>
                }

            </td> 
            <td className="__tbody_td _tbody_td_memo">{timeLog?.memo}</td> 
            <td className="__tbody_td _tbody_td_hour_logged">{timeLog?.hoursLogged}</td>
        </tr>
    );
};
