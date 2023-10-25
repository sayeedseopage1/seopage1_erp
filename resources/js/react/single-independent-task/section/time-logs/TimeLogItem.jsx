import React from 'react'
import { User } from '../../../utils/user-details';
import dayjs from 'dayjs';

const TimeLogItem = ({log}) => {
  const user = log?.user ? new User(log.user) : null;

  const time = log?.hours_logged.split(' ');
  const h = time[0] + ' ' + time[1]
  const m = time[2] + ' ' + time[3]

  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item py-2" style={{gap: '10px'}}>
        <div className='d-flex align-items-center'>
            <img
              src={user?.getAvatar()}
              alt={user?.getName()}
              width="24px"
              height="24px"
              className="rounded-circle mr-2"
            />
            <span
              className='sp1_time_log_emplyee_name'
            >{user?.getName()}</span>
        </div>

        <div>
          {dayjs(log?.start_time).format('MMM DD, YYYY')} <br />
          {dayjs(log?.start_time).format('hh:mm a')}
        </div>
        <div>
          {log?.end_time ? <>
          {dayjs(log?.end_time).format('MMM DD, YYYY')} <br/>
          {dayjs(log?.end_time).format('hh:mm a')}
          </> : <span className='text-success font-weight-bold'>Active</span>}
          </div>

        <div>{h} <br/> {m}</div>
    </div>
  )
}

export default TimeLogItem
