import React from 'react'
import { User } from '../../../utils/user-details';
import dayjs from 'dayjs';

const InnerHistoryItem = ({history}) => {
  const user = history ? new User(history.user) : null;
  let details = history?.lang;
  let _lang = details;

 // add user link
  if(details && user){
    const name = user.getName();
    const nameLength = name.length
    let userIndexStart = details.indexOf(name);

    let part1 = details.slice(0, userIndexStart);
    let userName = details.slice(userIndexStart, userIndexStart+nameLength);
    let lastPart = details.slice(userIndexStart+nameLength, details.length-1);

    userName = `<a class="hover-underline" style="color: var(--header_color)!important" href="${user.getUserLink()}">${userName}</a>`

    _lang = `${part1}${userName}${lastPart}`; 
  }

  return (
    <div className="d-flex align-items-center sp1_tark_right_item py-2">
        <div className=''>
            <img  
              src={user?.getAvatar()}
              alt={user?.getName()}
              width={48}
              height={48}
              style={{borderRadius: '4px'}}
            />
        </div>
        <div className='px-3'>
            <div dangerouslySetInnerHTML={{__html: _lang}} />
            <div>
              {history?.board_column && (
                <span 
                  className='mr-2' 
                  style={{
                      background: history?.board_column?.label_color,
                      color:  history?.board_column?.label_color === '#FFE700' ? '#000000' : '#FFFFFF',
                      width: 'fit-content',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '14px'
                  }}>
                    {history?.board_column?.column_name}
                </span>
              )} 
              <span className='' style={{color: '#868892'}}>{dayjs(history?.formatted_created_at).format('MMM DD, YYYY hh:mm a')}</span>
            </div>
        </div>
    </div>
)
}

export default InnerHistoryItem 