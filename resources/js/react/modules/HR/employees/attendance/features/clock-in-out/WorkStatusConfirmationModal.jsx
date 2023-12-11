import { Listbox } from '@headlessui/react';
import axios from 'axios';
import _ from 'lodash';
import React from 'react';
import { LuChevronsUpDown } from 'react-icons/lu';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '../../../../../../global/Button';
import Modal from '../../../../../../global/Modal';
import Switch from '../../../../../../global/Switch';
import { Flex } from '../../../../../../global/styled-component/Flex';
import { FormGroup, Label } from '../../../../../../global/styled-component/Form';
import { useAuth } from '../../../../../../hooks/useAuth';
import { convertTime } from '../../../../../../utils/converTime';
import { CompareDate } from '../../../../../../utils/dateController';
import ShowClock from '../../components/ShowClock';
import AcknowledgementReminderModal from './AcknowledgementReminderModal';
import DailyReportSubmissionEnforcer from './DailyReportSubmissionEnforcer';
import styles from './WorkStatusConfirmationModal.module.css';


/**
 * * Individual features component
 * * Responsible for displays a modal for confirming the status of work hours and daily reports.
 */

const dayjs = new CompareDate();

const DateFormat = (date) => {
    const d = {
        unFormatted: date,
        formatted: dayjs.dayjs(date).isSame(dayjs.dayjs(), 'day') ? 'Today' : dayjs.dayjs(date).format('MMM DD, YYYY')
    }

    return d;
};


export const WorkStatusConfirmationModal = ({
    showAcknowledgementReminder,
    setShowAcknowledgementReminder,
    workStatusConfirmationModalIsOpen,
    setWorkStatusConfirmationModalIsOpen,
    checkIn,
    showReminder,
    setShowReminder,
    setCheckIn,
    data,
    setData,
}) => {
  const [showDailySubmissionForm, setShowDailySubmissionForm] = React.useState(false);
  const auth = useAuth();

  // handle continue button
  const handleContinue = () => {
    window.location.reload();
    setWorkStatusConfirmationModalIsOpen(false);
  }

  // handle check in button
  const handleCheckInButton = (e) => {
    setCheckIn(true); // update state
    // toaster
    toast.success('You Clock In Successfully')

    localStorage.setItem('clock_in', JSON.stringify({
        checkInStatus: true,
        dailyTaskReport: true,
        hourLogStatus: true,
    }))

    // if not developer then avoid next step
    if(!_.includes([5, 9, 10], auth.getRoleId())){
        setWorkStatusConfirmationModalIsOpen(false);
        window.location.reload();
    }else{
        setShowReminder(true);
    }
  }

  const close = () => setWorkStatusConfirmationModalIsOpen(false);

  return (
    <Modal isOpen={workStatusConfirmationModalIsOpen}>
       <React.Fragment>
            <div style={styles.modal_container}>
                    <div className={styles.work_status_confirmation_modal}>
                        <div className='d-flex align-items-center justify-content-end'>
                            <Button onClick={close}>
                                <i className='fa-solid fa-xmark' />
                            </Button>
                        </div>
                        <Switch>

                            <Switch.Case condition={!checkIn && !showReminder}>
                                <React.Fragment>
                                    <div className='text-center'>
                                        <i className={`fa-solid fa-cloud-moon-rain ${styles.cloud}`}></i>
                                        <ShowClock className={styles.clock} />
                                    </div>
                                    {/* Check In Form */}
                                    <CheckInForm onCheckIn={handleCheckInButton} close={close}/>
                                </React.Fragment>
                            </Switch.Case>
                            <Switch.Case condition={showReminder && data}>
                                <Switch.Case
                                    condition={
                                        !data?.hours_log_report.hours_log_report_status ||
                                        !data?.daily_task_report.daily_submission_status
                                    }
                                >
                                    <div className={styles.work_status_modal_title}>
                                        <h4>Working Status Confirmation</h4>
                                    </div>

                                    <ul className={styles.work_status_list}>

                                        {/* Daily working hours report */}
                                        <li className={`alert ${data?.hours_log_report.hours_log_report_status ? 'alert-success d-none': 'alert-danger'}`}>
                                            <div>
                                                Your minimum tracked hours should have been <strong>{convertTime(data?.hours_log_report.data.target_minimum_log_hours)}</strong>,
                                                and it is <strong>{convertTime(data?.hours_log_report.data.incomplete_hours)}</strong> less on  <strong>{DateFormat(data?.hours_log_report.data.checking_date).formatted}</strong>
                                                <Switch.Case condition={!data?.hours_log_report.hours_log_report_status}>
                                                    <button
                                                        onClick={() => setShowAcknowledgementReminder(true)}
                                                        className={styles.submit_reason}
                                                    >
                                                        Submit Reason
                                                    </button>
                                                </Switch.Case>
                                            </div>
                                        </li>

                                        {/* Daily Task Progress report */}
                                        <li className={`alert ${data?.daily_task_report.daily_submission_status ? 'alert-success d-none': 'alert-danger'}`}>
                                            <div>
                                                You didn't submit the daily report on <strong>{DateFormat(data?.daily_task_report.data.checking_date).formatted}</strong>
                                                <Switch.Case condition={!data?.daily_task_report.daily_submission_status}>
                                                    <button
                                                        onClick={() => setShowDailySubmissionForm(true)}
                                                        className={styles.submit_reason}
                                                    >
                                                        Submit Reason
                                                    </button>
                                                </Switch.Case>
                                            </div>
                                        </li>
                                    </ul>
                                </Switch.Case>

                                <Switch.Case
                                    condition={
                                        data?.hours_log_report.hours_log_report_status &&
                                        data?.daily_task_report.daily_submission_status
                                    }
                                >
                                    <>

                                        <p className={styles.thank_you_message}><i className="fa-regular fa-circle-check"></i>Thanks for submitting the required details</p>
                                        {/* Continue button */}
                                        <Flex alignItem='center' justifyContent="center">
                                            <button
                                                disabled={
                                                    !data?.hours_log_report.hours_log_report_status ||
                                                    !data?.daily_task_report.daily_submission_status
                                                }
                                                onClick={handleContinue}
                                                className={styles.work_status_button}
                                            >
                                                Continue
                                            </button>
                                        </Flex>
                                    </>
                                </Switch.Case>
                            </Switch.Case>
                        </Switch>
                    </div>
            </div>


            {/* Acknowledgement Modal */}
            <Modal isOpen={showAcknowledgementReminder}>
                <AcknowledgementReminderModal
                    close={() => setShowAcknowledgementReminder(false)}
                    reminderType="Minimum tracked hours not met"
                    reminderDate={data?.hours_log_report.data.checking_date}
                    data={data?.hours_log_report}
                    onSubmit = {() => {
                        setData(prev => ({
                            ...prev,
                            hours_log_report: {
                                ...prev.hours_log_report,
                                hours_log_report_status: true,
                            }
                        }))
                    }}
                />
            </Modal>

            {/* Daily submission */}
            <Modal isOpen={showDailySubmissionForm}>
                <DailyReportSubmissionEnforcer
                    close={() => setShowDailySubmissionForm(false)}
                    reminderType="daily_report"
                    reminderDate={data?.daily_task_report?.data?.checking_date}
                    onSubmit={() => {
                        setData(prev => ({
                            ...prev,
                            daily_task_report: {
                                ...prev.daily_task_report,
                                daily_submission_status: true,
                            }
                        }))
                    }}
                />
            </Modal>
       </React.Fragment>
    </Modal>
  )
}



// user check-in form
const CheckInForm = ({onCheckIn, close}) => {
    const [location, setLocation] = React.useState("erp");
    const [workFrom, setWorkForm] = React.useState("office");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // handle user clock in form submit
    const onClockIn = async (e) => {

        const data = {
            clock_status: true,
            type: "CLOCK_IN",
            working_from: '',
            location: 1,
            work_from_type: workFrom,
            currentLatitude: '',
            currentLongitude: '',
            _token: document.querySelector("meta[name='csrf-token']").getAttribute('content')
        }

        const URL = '/account/attendances/store-clock-in';

        try {
            setIsSubmitting(true);
            // request to store
            await axios.post(URL, data)
            .then(res => {
                if(res.data.status === 'success'){
                    onCheckIn();
                }
            })

            setIsSubmitting(false);
        } catch (error) {
            if(error.response.status === 403){
                toast.error(error.response.data.error);
                setIsSubmitting(false);
            }
        }
    }

    // handle clock in button
    const handleClockInButton = () => {
        withReactContent(Swal).fire({
           icon: 'question',
           title: 'Are you sure!',
           showConfirmButton: true,
           confirmButtonText: 'Yes',
           showCancelButton: true,
           cancelButtonText: 'No',
           customClass: {
            confirmButton: 'btn btn-primary px-5',
            cancelButton: 'btn btn-danger px-5'
           }
        }).then(res => {
            if(res.isConfirmed){
                onClockIn();
            }
        })
    }

    // on Log out
    const handleLogOut = async () => {
        try {
           await axios.post('/logout', {
            _token: document.querySelector("meta[name='csrf-token']").getAttribute('content')
           }).then(() => {
            window.location = '/';
           })
        } catch (error) {
           console.log(error)
        }
    }

    return(
       <div className='w-100'>
            <Flex justifyContent="space-between" width="100%">
                <FormGroup className='w-100'>
                    <Label>Location <sup>*</sup></Label>
                    <Listbox value={location} onChange={setLocation}>
                        <div className={styles.list_container}>
                            <Listbox.Button className={styles.display_selected_list}>
                                <span>{_.upperFirst(location)}</span>
                                <LuChevronsUpDown style={{color: '#ccc'}}/>
                            </Listbox.Button>
                            <Listbox.Options className={styles.list_options}>
                                <Listbox.Option value="erp" className={styles.option}>Erp</Listbox.Option>
                            </Listbox.Options>
                        </div>
                    </Listbox>
                </FormGroup>

                {/* work from */}
                <FormGroup className='w-100'>
                    <Label>Work Form <sup>*</sup></Label>
                    <Listbox value={workFrom} onChange={setWorkForm}>
                        <div className={styles.list_container}>
                            <Listbox.Button className={styles.display_selected_list}>
                                <span>{_.upperFirst(workFrom)} </span>
                                <LuChevronsUpDown style={{color: '#ccc'}}/>
                            </Listbox.Button>
                            <Listbox.Options className={styles.list_options}>
                                <Listbox.Option value="office" className={styles.option}>Office</Listbox.Option>
                                <Listbox.Option value="home" className={styles.option}>Home</Listbox.Option>
                                <Listbox.Option value="other" className={styles.option}>Other</Listbox.Option>
                            </Listbox.Options>
                        </div>
                    </Listbox>
                </FormGroup>
            </Flex>

            <Flex className='mt-3' justifyContent="center">
                <Button
                    onClick={handleClockInButton}
                    isLoading={isSubmitting}
                    loaderTitle='Processing...'
                    className='mt-auto font-weight-normal height-44'
                >
                    <i className="fa-solid fa-arrow-right-to-bracket" /> Clock In
                </Button>

                <Button
                    onClick={close}
                    loaderTitle=''
                    variant='tertiary'
                    className='mt-auto font-weight-normal height-44 px-3 bg-info text-white'
                >
                   <span className='d-flex flex-column'>
                        <span>Browse</span>
                        <span>[No Clock In Required]</span>
                   </span>
                </Button>

                <Button
                    onClick={handleLogOut}
                    isLoading={isSubmitting}
                    loaderTitle=''
                    variant='danger'
                    className='mt-auto font-weight-normal height-44 px-3'
                >
                    <i className="fa-solid fa-power-off" /> Log Out
                </Button>
            </Flex>
       </div>
    )
}

// append into container
// const container = document.getElementById("react-features-container");

// if (container) {
//     ReactDOM.createRoot(container).render(
//         <React.StrictMode>
//             <>
//                 <Toaster/>
//                 <WorkStatusConfirmationModal />
//             </>
//         </React.StrictMode>
//     );
// }
