import React from 'react'
import CustomModal from '../../components/CustomModal'
import Button from '../../components/Button';
import { User } from '../../../utils/user-details';
import dayjs from 'dayjs';

const TimeLogTable = ({isOpen, close, toggle, data = []}) => {
  return (
    <CustomModal
        isOpen={isOpen}
        toggleRef={toggle} 
    >
        <div className='sp1-subtask-form --modal-panel'>
            {/* <div className='sp1-subtask-form --modal-panel-header'> 
                 <h6>Time Logs
                        {true && <div 
                            className="spinner-border text-dark ml-2" 
                            role="status"
                            style={{
                                width: '16px',
                                height: '16px',
                                border: '0.14em solid rgba(0, 0, 0, .25)',
                                borderRightColor: 'transparent' 
                            }}
                        />}
                  </h6> 
                <Button
                    aria-label="close-modal"
                    className='_close-modal'
                >
                    <i className="fa-solid fa-xmark" />
                </Button> 
            </div> */}

            <div className="sp1-subtask-form --modal-panel-body">
                <div className='mt-3'>
                    <table className='sp1_subtask_log-tbl'>
                        <thead className='__thead'>
                            <tr>
                                <th>Employee</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Memo</th>
                                <th>Hours Logged</th>
                            </tr>
                        </thead>

                        <tbody className='__tbody'>
                            {data? data.map(log => (
                                <TableRow key={log.id} log={log} /> 
                            )): null}
                        </tbody>
                    </table>
                </div>      
            </div>
        </div>
    </CustomModal>
  )
}

export default TimeLogTable


const TableRow = ({log}) => {
    const user = log?.user ? new User(log.user) : null;

     

    return(
        <tr className='__tbody_tr'>
            <td className='__tbody_td _tbody_td_employee'>
                <img src={user?.getAvatar()} alt={user?.getName()} />
            </td>
            
            <td className='__tbody_td _tbody_td_start_time'>
                {dayjs(log?.start_time).format('MMM DD, YYYY')} <br/>
                {dayjs(log?.start_time).format('hh:mm a')}
            </td>
            
            <td className='__tbody_td _tbody_td_start_time _tbody_td_start_end'>
                {dayjs(log?.end_time).format('MMM DD, YYYY')} <br/>
                {dayjs(log?.end_time).format('hh:mm a')}
            </td>

            <td className='__tbody_td _tbody_td_memo'>
                {log?.memo}
            </td>
            
            <td className='__tbody_td _tbody_td_hour_logged'>
                {log?.hours_logged}
            </td>
        </tr>
    )
}