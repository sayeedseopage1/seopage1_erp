import axios from 'axios';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Loader from '../../../../../../global/Loader';
import Modal from '../../../../../../global/Modal';
import Toaster from '../../../../../../global/Toaster';
import { useAuth } from '../../../../../../hooks/useAuth';
import { WorkStatusConfirmationModal } from './WorkStatusConfirmationModal';
import styles from './WorkStatusConfirmationModal.module.css';

export const DailyWorkReport = () => {
    const [showAcknowledgementReminder, setShowAcknowledgementReminder] = React.useState(false);
    const [checkIn, setCheckIn] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [isUILoading, setIsUILoading] = React.useState(true);
    const [showReminder, setShowReminder] = React.useState(false);
    const [workStatusConfirmationModalIsOpen, setWorkStatusConfirmationModalIsOpen] = React.useState(false);
    const auth = useAuth();

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


                if(cookData.checkInStatus){
                    if(_.includes([5, 9, 10], auth.getRoleId())){

                        if(cookData.dailyTaskReport && cookData.hourLogStatus){
                            setWorkStatusConfirmationModalIsOpen(false);
                        }else{
                            setShowReminder(true);
                            setWorkStatusConfirmationModalIsOpen(true);
                        }
                    }else{
                        setWorkStatusConfirmationModalIsOpen(false);
                    }
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
            <Toaster />
            <WorkStatusConfirmationModal
               showAcknowledgementReminder={showAcknowledgementReminder}
               setShowAcknowledgementReminder={setShowAcknowledgementReminder}
               checkIn={checkIn}
               setCheckIn={setCheckIn}
               data={data}
               setData={setData}
               showReminder={showReminder}
               setShowReminder={setShowReminder}
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

