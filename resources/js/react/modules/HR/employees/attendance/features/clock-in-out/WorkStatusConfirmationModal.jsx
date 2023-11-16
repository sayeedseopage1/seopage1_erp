import { Listbox } from '@headlessui/react';
import axios from 'axios';
import _ from 'lodash';
import React from 'react';
import { LuChevronsUpDown } from 'react-icons/lu';
import Button from '../../../../../../global/Button';
import Modal from '../../../../../../global/Modal';
import Switch from '../../../../../../global/Switch';
import Toaster from '../../../../../../global/Toaster';
import { Flex } from '../../../../../../global/styled-component/Flex';
import { FormGroup, Label } from '../../../../../../global/styled-component/Form';
import { convertTime } from '../../../../../../utils/converTime';
import ShowClock from '../../components/ShowClock';
import AcknowledgementReminderModal from './AcknowledgementReminderModal';
import DailyReportSubmissionEnforcer from './DailyReportSubmissionEnforcer';
import styles from './WorkStatusConfirmationModal.module.css';
/**
 * * Individual features component
 * * Responsible for displays a modal for confirming the status of work hours and daily reports.
 */

export const WorkStatusConfirmationModal = ({
    showAcknowledgementReminder,
    setShowAcknowledgementReminder,
    workStatusConfirmationModalIsOpen,
    setWorkStatusConfirmationModalIsOpen,
    checkIn,
    setCheckIn,
    data,
    setData,
}) => {
  const [showDailySubmissionForm, setShowDailySubmissionForm] = React.useState(false);
  const [isUILoading, setIsUILoading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  // handle checkout button
  const onCheckOutButtonClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await axios.put('/account/check-out-status', {})
            .then(response => {
                // check clock in form already submitted
                setCheckIn(true);
                setData(response.data.data);

                const cookData = {
                    dailyTaskReport: response.data.data.daily_task_report.daily_submission_status,
                    hourLogStatus: response.data.data.hours_log_report.hours_log_report_status,
                }

                // store on local store
                localStorage.removeItem('clock_in');

                // check all submitted
                if(cookData.dailyTaskReport && cookData.hourLogStatus){
                    setWorkStatusConfirmationModalIsOpen(false);
                }else{
                    setWorkStatusConfirmationModalIsOpen(true);
                }
            })
            .catch(err => console.log(err));
        setIsLoading(false);

    } catch (error) {
       console.log(error)
    } finally{
        setIsLoading(false);
    }

  }

  // handle continue button
  const handleContinue = () => {
    setWorkStatusConfirmationModalIsOpen(false);
  }

  return (
    <Modal isOpen={workStatusConfirmationModalIsOpen}>
       <React.Fragment>
            <div style={styles.modal_container}>
                    <div className={styles.work_status_confirmation_modal}>
                        <Toaster />
                        <Switch>
                            <Switch.Case condition={!checkIn}>
                                <React.Fragment>
                                    <div className='text-center'>
                                        <i className={`fa-solid fa-cloud-moon-rain ${styles.cloud}`}></i>
                                        <ShowClock className={styles.clock} />
                                    </div>
                                    {/* Check In Form */}
                                    <CheckInForm onCheckIn={() => setCheckIn(true)}/>
                                </React.Fragment>
                            </Switch.Case>
                            <Switch.Case condition={checkIn && data}>
                                <div className={styles.work_status_modal_title}>
                                    <h4>Working Status Confirmation</h4>
                                </div>
                                <ul className={styles.work_status_list}>

                                    {/* Daily working hours report */}
                                    <li className={`alert ${data?.hours_log_report.hours_log_report_status ? 'alert-success': 'alert-danger'}`}>
                                        <div>
                                            Your minimum tracked hours should have been <strong>{convertTime(data?.hours_log_report.data.target_minimum_log_hours)}</strong>,
                                            and it is <strong>{convertTime(data?.hours_log_report.data.incomplete_hours)}</strong> less.
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
                                    <li className={`alert ${data?.daily_task_report.daily_submission_status ? 'alert-success': 'alert-danger'}`}>
                                        <div>
                                            Your Didn't submit last date daily report
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

                                {/* Continue button */}
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
                    reminderDate={data?.daily_task_report.daily_submission_status}
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
const CheckInForm = ({onCheckIn}) => {
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
            .catch(err => {
                console.log(err)
            })

            setIsSubmitting(false);
        } catch (error) {
            console.log(error);
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

                <Button
                    onClick={onClockIn}
                    isLoading={isSubmitting}
                    loaderTitle='Processing...'
                    className='mt-auto font-weight-normal height-40'
                >
                    <i className="fa-solid fa-arrow-right-to-bracket" /> Clock In
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
