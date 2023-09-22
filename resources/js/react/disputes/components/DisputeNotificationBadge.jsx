import React from 'react'
import { usePopper } from 'react-popper';
import { User } from '../../utils/user-details';
import _ from 'lodash';
import { useDispute } from '../context';


const DisputeNotificationBadge = ({row, table}) => {
    const {toggleModal} = useDispute();
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


    const showNotification = unsolvedQuestion || 
                            (hasReplied && _.includes([1, 8], auth?.getRoleId())) ||
                            (!data?.status && data?.need_authrization && auth?.getRoleId() === 1)

    const modalMode = () => {
        let mode = 'view';
        if(unsolvedQuestion) mode = 'QUESTION_AND_ANSWER';


        if(
            !data?.status && 
            !data?.need_authrization && 
            _.includes([1, 8], auth?.getRoleId()) && 
            !_.includes([
                data?.raised_by?.id, 
                data?.raised_against?.id
            ], auth?.getId())
        ) {
            mode = 'RESOLVE'
        }

        
        if(!data?.status && data?.need_authrization && auth?.getRoleId() === 1) mode = 'ATHORIZATION'
        if(data?.status) mode = 'view'

        return mode;
    }


    return(
        <React.Fragment>
            <div  
                onClick={() => toggleModal(data, modalMode())}
                ref={setReferenceElement} 
                style={{
                    width:'fit-content', 
                    color: data?.status ? '#28A745': '', 
                    fontWeight: '500'
                }}>
                <span className="d-flex position-relative align-items-center">
                    <i className={data?.status ? 'fa-solid fa-check' : 'fa-regular fa-circle'}  style={{
                        position: 'absoltue',
                        top: '0',
                        right: '100%'
                    }}/>

                    <span 
                        className='px-2 text-hover-underline'
                        style={{cursor: 'pointer'}}
                    >
                        T{data.task_id}D{data.id < 10 ? `0${data.id}`: data.id}
                    </span>
                </span>
            </div>

            {/* tooltip */}

          {
            showNotification  ?
                <div 
                    className='dispute-tooltip'
                    onClick={() => toggleModal(data, modalMode())}
                    ref={setPopperElement} 
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {/* tooltip content */}
                    <div className='dispute-tooltip-content'> 
                        {/* {unsolvedQuestion ? `${unsolvedQuestion} Questions` : null}
                        {hasReplied && !_.includes([data?.raised_against?.id, data?.raised_by?.id], auth?.getId()) ? 'New Update' : null}
                        {(data?.need_authorization && auth?.getRoleId() === 1) ? 'New Update': null} */}

                        <SwitchAction auth={auth} unsolvedQuestion={unsolvedQuestion} data={data} />
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
export default DisputeNotificationBadge


const SwitchAction = ({unsolvedQuestion, data, auth}) => { 
    if(_.includes([data?.raised_against?.id, data?.raised_by?.id], auth?.getId()) && unsolvedQuestion){
        return `${unsolvedQuestion} Questions`;
    }else{
        return `New Update`;
    } 
}