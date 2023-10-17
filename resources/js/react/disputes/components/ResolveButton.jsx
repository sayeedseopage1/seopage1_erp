import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import './Resolvebutton.css';
import { useDispute } from '../context';
import { User } from '../../utils/user-details';

const ResolveButton = ({row, table}) => {
  const resolved = row?.status;
  const {toggleModal} = useDispute();
  const auth = new User(window?.Laravel?.user);
  const [resolveBtnPopupModalIsOpen, setResolveBtnPopupModalIsOpen] = useState(false);
const [isDisable, setIsDisable] = useState(true);

    useEffect(()=>{
        if (resolveBtnPopupModalIsOpen) {
            setTimeout(() => {
                setIsDisable(false);
            }, 5000);
        }else{
            setIsDisable(true);
        }
    }, [resolveBtnPopupModalIsOpen])

    const open = () => setResolveBtnPopupModalIsOpen(true);
    const close = () => setResolveBtnPopupModalIsOpen(false);

  const unsolvedQuestion = _.size(_.filter(row.conversations, conv => (!conv.replies && Number(conv?.question_for) === auth.getId()) ? true : false))
  const modalMode = () => {
    let mode = 'view';
    if(unsolvedQuestion) mode = 'QUESTION_AND_ANSWER';


    if(
        !row?.status &&
        !row?.need_authrization &&
        _.includes([1, 8], auth?.getRoleId()) &&
        !_.includes([
            row?.raised_by?.id,
            row?.raised_against?.id
        ], auth?.getId())
    ) {
        mode = 'RESOLVE'
    }


    if(!row?.status && row?.need_authrization && auth?.getRoleId() === 1) mode = 'ATHORIZATION'
    if(row?.status) mode = 'view'

    return mode;
}


// render text of button
const renderText = () => {
    let text = 'Resolve';



    if(row?.status || _.includes([row?.raised_by?.id, row?.raised_against?.id], auth?.getId())){
        text = "View";
    }

    if(auth?.getRoleId() === 1 && !row?.status && row?.need_authrization){
        text = "Authorize";
    }

    if(!row?.status && auth?.getRoleId() === 8 && row?.need_authrization){
        text = "Awaiting Authorization";
    }

    if(!row?.status && unsolvedQuestion && _.includes([row?.raised_by?.id, row?.raised_against?.id], auth?.getId())){
        text = "Answer the Question";
    }

    return text;
}

  return (
   <React.Fragment>
            <button
                onClick={() => {
                    toggleModal(row, modalMode());
                    open();
                }}
                className={`resolve-btn ${resolved ? 'solved' : ''}`}
                style={{
                    whiteSpace: 'nowrap'
                }}
            >
                {renderText()}
            </button>

            {/* modal */}
        </React.Fragment>
  )
}

export default ResolveButton
