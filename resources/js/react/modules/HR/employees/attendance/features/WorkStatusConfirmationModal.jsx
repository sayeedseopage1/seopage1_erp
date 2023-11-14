import { Listbox } from '@headlessui/react';
import _ from 'lodash';
import React from 'react';
import ReactDOM from "react-dom/client";
import { LuChevronsUpDown } from 'react-icons/lu';
import Button from '../../../../../global/Button';
import Modal from '../../../../../global/Modal';
import Switch from '../../../../../global/Switch';
import { Flex } from '../../../../../global/styled-component/Flex';
import { FormGroup, Label } from '../../../../../global/styled-component/Form';
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

  return (
    <Modal isOpen={false}>
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
                            <Switch.Case condition={checkIn}>
                                <div className={styles.work_status_modal_title}>
                                    <h4>Working Status Confirmation</h4>
                                </div>
                                <ul className={styles.work_status_list}>
                                    <li data-completed={true}>
                                        <div className={styles.list_icon} data-completed={true}> 🗸 </div>
                                        <div>
                                            Your minimum tracked hours should have been 4.5 hours and 30 minutes,
                                            and it is 4 hours and 12 minutes less.
                                            <button onClick={() => setShowAcknowledgementReminder(true)} className={styles.submit_reason}>Submit reason</button>
                                        </div>
                                    </li>
                                    <li data-completed={false}>
                                        <div className={styles.list_icon} data-completed={false}>  🗸  </div>
                                        <div>
                                            Your Didn't submit last date daily report
                                            <button onClick={() => setShowDailySubmissionForm(true)} className={styles.submit_reason}>Submit reason</button>
                                        </div>
                                    </li>
                                </ul>

                                <button className={styles.work_status_button}> Continue </button>
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

    // handle user clock in form submit
    const onClockIn = (e) => {
        const data = {
            location,
            workFrom,
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
                    onClick={onCheckIn}
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
