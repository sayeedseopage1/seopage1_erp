import { User } from "../../../utils/user-details";
import dayjs from 'dayjs';

const TableRow = ({log}) => {
    const user = log?.user ? new User(log.user) : null;
    return(
        <tr className='__tbody_tr'>
            <td className='__tbody_td _tbody_td_employee'>
                <img src={user?.getAvatar()} alt={user?.getName()} />
                <span className='px-2'>{user?.getName()}</span>
            </td>

            <td className='__tbody_td _tbody_td_start_time'>
                {dayjs(log?.start_time).format('MMM DD, YYYY')} <br/>
                {dayjs(log?.start_time).format('hh:mm a')}
            </td>

            <td className='__tbody_td _tbody_td_start_time _tbody_td_start_end'>
                {log?.end_time ? <>
                    {dayjs(log?.end_time).format('MMM DD, YYYY')} <br/>
                    {dayjs(log?.end_time).format('hh:mm a')}
                </> : <span className='text-success font-weight-bold'>Active</span>}
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

export default TableRow
