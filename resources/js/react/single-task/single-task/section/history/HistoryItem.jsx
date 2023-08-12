import React from 'react'
import { User } from '../../../utils/user-details';

const HistoryItem = ({history}) => {
  const user = history ? new User(history.user) : null;
  let details = history?.lang;
  let _lang = details;

 // add user link
  if(details && user){
    const name = user.getName();
    // const sub = 'sub task';
    // const task = 'Task';
    const nameLength = name.length
    let userIndexStart = details.indexOf(name);
    

    let part1 = details.slice(0, userIndexStart);
    let userName = details.slice(userIndexStart, userIndexStart+nameLength);
    let lastPart = details.slice(userIndexStart+nameLength, details.length-1);

    userName = `<a class="hover-underline" style="color: var(--header_color)!important" href="${user.getUserLink()}">${userName}</a>`

    _lang = `${part1}${userName}${lastPart}`; 

    // let taskIndex = _lang.toLowerCase().indexOf(task);
    // let taskLen = task.length;

    // // find sub task
    // if(history?.sub_task_id){ 
    //   let subTaskIndex = _lang.toLowerCase().indexOf(sub);
    //   let subTaskLen = sub.length;

    //   let part1 = details.slice(0, userIndexStart);
    //   let userName = details.slice(userIndexStart, userIndexStart+nameLength);
    //   let lastPart = details.slice(userIndexStart+nameLength, details.length-1);

    // }
  }

  return (
    <div className="d-flex align-items-center justify-content-between sp1_tark_right_item py-2">
        <div dangerouslySetInnerHTML={{__html: _lang}} />
    </div>
)
}

export default HistoryItem