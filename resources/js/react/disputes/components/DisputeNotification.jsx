import React from 'react'
import { usePopper } from 'react-popper';
import { User } from '../../utils/user-details';
import _ from 'lodash';


const DisputeNotification = ({row, table}) => {
    const [referenceElement, setReferenceElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(null);
    const [arrowElement, setArrowElement] = React.useState(null);

    const {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: 'top',
        modifiers:[
            {name:'offset', options: {offset: [10,0]}},
            {
                name: 'arrow', 
                options: {
                    element: arrowElement, 
                }
            }
        ]
    });  
    const data = row.original;

    const auth = new User(window?.Laravel?.user);

    const unsolvedQuestion = _.size(_.filter(data.conversations, conv => (!conv.replies && Number(conv?.question_for) === auth.getId()) ? true : false))
    const hasReplied = _.size(_.filter(data.conversations, conv => (conv.replies && !conv.replied_seen) ? true : false))


    const showNotification = unsolvedQuestion || hasReplied || (!data?.status && data?.need_authorization && auth?.getRoleId() === 1)

    return(
        <React.Fragment>
            <div ref={setReferenceElement}  style={{width:'fit-content'}}>
               {/* {data.id < 10 ? `0${data.id}`: data.id} */}
               T{data.task_id}D{data.id < 10 ? `0${data.id}`: data.id}
            </div>

            {/* tooltip */}

          {
            showNotification  ?
                <div 
                    className='dispute-tooltip'
                    ref={setPopperElement} 
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {/* tooltip content */}
                    <div className='dispute-tooltip-content'> 
                        {unsolvedQuestion ? `${unsolvedQuestion} Questions` : null}
                        {hasReplied ? 'New Update' : null}
                        {(data?.need_authorization && auth?.getRoleId() === 1) ? 'New Update': null}
                    </div>
                    <div 
                        ref={setArrowElement} 
                        style={styles.arrow} 
                        className='dispute-notif-arrow' 
                    />
                </div>
            : null
          } 

        </React.Fragment>
    )
}



export default DisputeNotification