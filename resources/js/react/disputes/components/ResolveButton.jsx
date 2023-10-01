import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import './Resolvebutton.css';
import { useDispute } from '../context';
import { User } from '../../utils/user-details';
import Modal from '../../global/Modal';
import Button from '../../global/Button';
import ResolveBtnPopupText from './Resolve-Btn/ResolveBtnPopupText';
import Loader from '../../global/Loader';

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
            <Modal isOpen={resolveBtnPopupModalIsOpen} className="sp1_mark-as--modal ">
                <div className="sp1_single_task--modal-panerl-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                        className="sp1_mark-as--modal-panel"
                        style={{ overflow: "visible", maxWidth: "50rem", width: '100%' }}
                    >
                        {/* heading bar */}
                        <div className="sp1_mark-as--modal-heading">
                            <h6 className="mb-0 ml-2" style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Please keep the following things in mind when resolving a dispute: </h6>

                            <Button
                                aria-label="closeModal"
                                onClick={close}
                                disabled={isDisable}
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                            >
                                {/* <i className="fa-solid fa-xmark" /> */}
                                {
                                    isDisable ?
                                        <Loader /> :
                                        <i className="fa-solid fa-xmark" />
                                }
                            </Button>
                        </div>

                        {/* body */}
                        <div
                            className="sp1_mark-as--modal-body px-3"
                            style={{ overflow: "visible" }}
                        >

                            <div style={{ maxHeight: '80vh', overflow: 'auto', padding: '0 20px 0 0' }}>
                                <ResolveBtnPopupText />
                            </div>

                            <div className="mt-3 d-flex align-items-center" style={{ justifyContent: 'end' }}>

                                <Button
                                    variant="tertiary"
                                    className="ml-auto mr-2"
                                    onClick={close}
                                    disabled={isDisable}
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30px', gap: '10px' }}
                                >
                                    {
                                        isDisable ?
                                            <Loader /> :
                                            'Close'
                                    }
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        </React.Fragment>
  )
}

export default ResolveButton