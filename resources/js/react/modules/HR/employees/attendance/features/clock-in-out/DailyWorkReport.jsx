import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Loader from '../../../../../../global/Loader';
import Modal from '../../../../../../global/Modal';
import { WorkStatusConfirmationModal } from './WorkStatusConfirmationModal';
import styles from './WorkStatusConfirmationModal.module.css';

export const DailyWorkReport = () => {
    const [showAcknowledgementReminder, setShowAcknowledgementReminder] = React.useState(false);
    const [checkIn, setCheckIn] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [isUILoading, setIsUILoading] = React.useState(true);
    const [workStatusConfirmationModalIsOpen, setWorkStatusConfirmationModalIsOpen] = React.useState(false);

    // first check user clock in status
    const fetchClockInData = async () => {
        try {
        await axios.get('/account/check-in-status')
            .then(response => {
                // check clock in form already submitted
                if(response.data.data.check_in_check_out.check_in_status){
                    setCheckIn(true);
                }
                setData(response.data.data);

                const cookData = {
                    checkInStatus: response.data.data.check_in_check_out.check_in_status,
                    dailyTaskReport: response.data.data.daily_task_report.daily_submission_status,
                    hourLogStatus: response.data.data.hours_log_report.hours_log_report_status,
                }

                // store on local store
                localStorage.setItem('clock_in', JSON.stringify(cookData))

                // check all submitted
                if(cookData.checkInStatus && cookData.dailyTaskReport && cookData.hourLogStatus){
                    setWorkStatusConfirmationModalIsOpen(false);
                }else{
                    setWorkStatusConfirmationModalIsOpen(true);
                }
            })
            .catch(err => console.log(err));

            setIsUILoading(false);
        } catch (error) {
        console.log(error)
        }
    }


    // layout effect
    React.useEffect(() => {
        fetchClockInData();
    }, [])


    // ui loading
    if(isUILoading){
        return (
            <Modal isOpen={isUILoading}>
                <div className={styles.global_loader}>
                    <div className={styles.loader}>
                        <Loader title='Loading...' />
                    </div>
                </div>
            </Modal>
        )
    }


    return (
        <React.Fragment>
            <WorkStatusConfirmationModal
               showAcknowledgementReminder={showAcknowledgementReminder}
               setShowAcknowledgementReminder={setShowAcknowledgementReminder}
               checkIn={checkIn}
               setCheckIn={setCheckIn}
               data={data}
               setData={setData}
               workStatusConfirmationModalIsOpen={workStatusConfirmationModalIsOpen}
               setWorkStatusConfirmationModalIsOpen={setWorkStatusConfirmationModalIsOpen}
            />
        </React.Fragment>
    )
}


// append into container
const container = document.getElementById("react-features-container");

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <>
                <DailyWorkReport />
            </>
        </React.StrictMode>
    );
}

