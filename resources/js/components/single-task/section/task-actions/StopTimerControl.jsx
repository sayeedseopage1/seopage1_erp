import React from 'react'
import Button from '../../components/Button'
import { CompareDate } from '../../../utils/dateController';
import Modal from '../../components/Modal';
import StopTimerConfrimationPopUp from './stop-timer/StopTimerConfrimationPopUp';
const dayjs = new CompareDate(); 

const StopTimerControl = ({stopTimer}) => { 
    const [
        openStopButtonConfirmationButton, 
        setOpenStopButtonConfirmationButton
    ] = React.useState(true);

    // control stop timer button click
    const handleStopButtonOnClick = (e) => {
        e.preventDefault(); 
        const currentTime = dayjs.dayjs(); // current time
        const targetTime = dayjs.dayjs().hour(16).minute(30); // 4:30 
        const isOverTime = dayjs.dayjs(currentTime).isSameOrAfter(targetTime); // over 4:30 PM

        // stopTimer()
        // if(isOverTime){
            // if over 4:30 pm check if developer meet their daily target time
            setOpenStopButtonConfirmationButton(true);
        // }else{
        //     stopTimer();
        // }    
    }


    return (
        <React.Fragment>
            {
                true ? <Button 
                    variant='tertiary'
                    onClick={handleStopButtonOnClick}
                    className='d-flex align-items-center btn-outline-dark mr-2 text-dark'
                >
                    <i className="fa-solid fa-pause" />
                    <span className="d-inline ml-1">Stop Timer</span>
                </Button> :
                <Button className='cursor-processing mr-2'>
                    <div className="spinner-border text-white" role="status" style={{ width: '18px',height: '18px'}}></div>
                    Stopping...
                </Button>
            }  


            <div>
            <Modal isOpen={openStopButtonConfirmationButton} className="sp1_single_task--modal">
               <div className='sp1_single_task--modal-panerl-wrapper'>
                    <div>
                        <StopTimerConfrimationPopUp />
                    </div>
               </div> 
            </Modal>
            </div>
        </React.Fragment>
    )
}

export default StopTimerControl