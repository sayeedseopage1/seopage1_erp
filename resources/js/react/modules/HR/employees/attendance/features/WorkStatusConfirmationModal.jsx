import { Listbox } from '@headlessui/react';
import axios from 'axios';
import _ from 'lodash';
import React from 'react';
import ReactDOM from "react-dom/client";
import { LuChevronsUpDown } from 'react-icons/lu';
import Button from '../../../../../global/Button';
import Loader from '../../../../../global/Loader';
import Modal from '../../../../../global/Modal';
import Switch from '../../../../../global/Switch';
import { Flex } from '../../../../../global/styled-component/Flex';
import { FormGroup, Label } from '../../../../../global/styled-component/Form';
import { convertTime } from '../../../../../utils/converTime';
import ShowClock from '../components/ShowClock';
import styles from '../styles/WorkStatusConfirmationModal.module.css';
import AcknowledgementReminderModal from './AcknowledgementReminderModal';
import DailyReportSubmissionEnforcer from './DailyReportSubmissionEnforcer';
/**
 * * Individual features component
 * * Responsible for displays a modal for confirming the status of work hours and daily reports.
 */

export const WorkStatusConfirmationModal = () => {
  const [showAcknowledgementReminder, setShowAcknowledgementReminder] = React.useState(false);
  const [showDailySubmissionForm, setShowDailySubmissionForm] = React.useState(false);
  const [checkIn, setCheckIn] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [isUILoading, setIsUILoading] = React.useState(true);
  const [workStatusConfirmationModalIsOpen, setWorkStatusConfirmationModalIsOpen] = React.useState(false);

  // first check user clock in status
  const fetchClockInData = async () => {
    try {
       await axios.get('/account/check-in-check-out-status')
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

  // handle continue button
  const handleContinue = (event) => {
    console.log(event);
  }


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
    <Modal isOpen={workStatusConfirmationModalIsOpen}>
       <React.Fragment>
            <div style={styles.modal_container}>
                    <div className={styles.work_status_confirmation_modal}>
                        <Switch>
                            <Switch.Case condition={!checkIn}>
                                <div>
                                    <div className='text-center'>
                                        <i className={`fa-solid fa-cloud-moon-rain ${styles.cloud}`}></i>
                                        <ShowClock className={styles.clock} />
                                    </div>
                                    <Switch.Case condition={true}>
                                        <CheckInForm onCheckIn={() => setCheckIn(true)}/>
                                    </Switch.Case>
                                    <Switch.Case condition={false}>
                                        <Button className='mt-3 mx-auto font-weight-normal'>
                                            <i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180" /> Clock Out
                                        </Button>
                                    </Switch.Case>
                                </div>
                            </Switch.Case>
                            <Switch.Case condition={checkIn && data}>
                                <div className={styles.work_status_modal_title}>
                                    <h4>Working Status Confirmation</h4>
                                </div>
                                <ul className={styles.work_status_list}>
                                    <li className={`alert ${data.hours_log_report.hours_log_report_status ? 'alert-success': 'alert-danger'}`}>
                                        <div>
                                            Your minimum tracked hours should have been <strong>{convertTime(data.hours_log_report.data.target_minimum_log_hours)}</strong>,
                                            and it is <strong>{convertTime(data.hours_log_report.data.incomplete_hours)}</strong> less.
                                            <Switch.Case condition={!data.hours_log_report.hours_log_report_status}>
                                                <button
                                                    onClick={() => setShowAcknowledgementReminder(true)}
                                                    className={styles.submit_reason}
                                                >
                                                    Submit reason
                                                </button>
                                            </Switch.Case>
                                        </div>
                                    </li>
                                    <li className={`alert ${data.daily_task_report.daily_submission_status ? 'alert-success': 'alert-danger'}`}>
                                        <div>
                                            Your Didn't submit last date daily report
                                            <Switch.Case condition={!data.daily_task_report.daily_submission_status}>
                                                <button
                                                    onClick={() => setShowDailySubmissionForm(true)}
                                                    className={styles.submit_reason}
                                                >
                                                    Submit reason
                                                </button>
                                            </Switch.Case>
                                        </div>
                                    </li>
                                </ul>

                                <button
                                    disabled={
                                        !data.hours_log_report.hours_log_report_status ||
                                        !data.daily_task_report.daily_submission_status
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
                    reminderDate="2021-09-01"
                />
            </Modal>

            {/* Daily submission */}
            <Modal isOpen={showDailySubmissionForm}>
                <DailyReportSubmissionEnforcer
                    close={() => setShowDailySubmissionForm(false)}
                    reminderType="daily_report"
                    reminderDate="2021-09-01"
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
const container = document.getElementById("react-features-container");

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <WorkStatusConfirmationModal />
        </React.StrictMode>
    );
}
