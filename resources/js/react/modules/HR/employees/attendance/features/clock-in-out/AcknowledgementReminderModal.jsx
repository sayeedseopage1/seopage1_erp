import axios from "axios";
import React from "react";
import Button from "../../../../../../global/Button";
import Switch from "../../../../../../global/Switch";
import { convertTime } from "../../../../../../utils/converTime";
import { CompareDate } from "../../../../../../utils/dateController";
import Option1 from "./helper/acknowledgement-options/Option1";
import Option2 from "./helper/acknowledgement-options/Option2";
import Option3 from "./helper/acknowledgement-options/Option3";
import Option4 from "./helper/acknowledgement-options/Option4";
import Option5 from "./helper/acknowledgement-options/Option5";
import Option6 from "./helper/acknowledgement-options/Option6";

/**
 * * This components responsible for showing daily working report to developer
 */

const dayjs = new CompareDate();

const DateFormat = (date) => {
    const d = {
        unFormatted: date,
        formatted: dayjs.dayjs(date).isSame(dayjs.dayjs(), 'day') ? 'Today' : dayjs.dayjs(date).format('MMM DD, YYYY')
    }

    return d;
};

const AcknowledgementReminderModal = ({ close, title = "Stop timer", reminderDate, reminderType, data, onSubmit }) => {
    const [step, setStep] = React.useState(0);
    const [isSubmitting, setIsSubmitting] = React.useState(false);


    // handle form submission
    const handleSubmitForm = async (data, submissionType, cb) => {
        setIsSubmitting(true);

        try{
            await axios.post('/account/developer/daily-minimum-track-hours-log/acknowledgement', {
                ...data,
                date: dayjs.dayjs(reminderDate).format('YYYY-MM-DD'),
                _token: document.querySelector("meta[name='csrf-token']").getAttribute('content')
            }).then(res => {
                if(submissionType !== 'CONTINUE'){
                    onSubmit();
                    close();
                }

                cb();
            })

            setIsSubmitting(false);
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <div
                    className="sp1_single_task--modal-panel"
                    style={{ transition: ".4s" }}
                >
                    {/* modal header */}
                    <div className="border-bottom pb-2 px-3 d-flex align-items-center justify-content-between">
                        <div className="font-weight-bold f-16">{reminderType} on <span style={{color: 'red'}}>{DateFormat(reminderDate).formatted}</span></div>
                        <Button variant="tertiary" onClick={close}>
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>

                    {/* modal body */}
                    <div className="sp1_single_task--modal-body sp1_single_task-modal-body-options p-3">
                        <div className="alert alert-warning">
                            Your tracked time for <strong>{DateFormat(reminderDate).formatted}</strong> is <strong>{convertTime(data?.data?.complete_hours)}</strong>. Your minimum tracked hours should have been <strong>{convertTime(data?.data?.target_minimum_log_hours)}</strong>, and it is <strong>{convertTime(data?.data?.incomplete_hours)}</strong> less.
                        </div>


                        {/* options */}
                        <div className="sp1_stop-button-confirmation-option">
                            <h6>Why is that?</h6>
                            <div className="confirmation--options">
                                <Switch>
                                    {/* option: I did not have enough work to do. */}
                                    <Switch.Case condition={!step || step === 1}>
                                        <Option1
                                            checked={step === 1}
                                            index={1}
                                            onChange={e => setStep(Number(e.target.value))}
                                            onSubmit={handleSubmitForm}
                                            onBack={() => setStep(0)}
                                            isLoading={isSubmitting}
                                        />
                                    </Switch.Case>

                                    {/* option: During transition from one task to another, I had to wait for a while. */}
                                    <Switch.Case condition={!step || step === 2}>
                                        <Option2
                                            checked={step === 2}
                                            index={2}
                                            onChange={e => setStep(Number(e.target.value))}
                                            onSubmit={handleSubmitForm}
                                            onBack={() => setStep(0)}
                                            isLoading={isSubmitting}
                                        />
                                    </Switch.Case>

                                    {/* option3: I was present less hours at work today or last day  */}
                                    <Switch.Case condition={!step || step === 3}>
                                        <Option3
                                            checked={step === 3}
                                            index={3}
                                            onChange={e => setStep(Number(e.target.value))}
                                            onSubmit={handleSubmitForm}
                                            onBack={() => setStep(0)}
                                            checkInTime={DateFormat(reminderDate).formatted}
                                            isLoading={isSubmitting}
                                        />
                                    </Switch.Case>

                                    {/* option4: I was present less hours at work today or last day  */}
                                    <Switch.Case condition={!step || step === 4}>
                                        <Option4
                                            checked={step === 4}
                                            index={4}
                                            onChange={e => setStep(Number(e.target.value))}
                                            onSubmit={handleSubmitForm}
                                            onBack={() => setStep(0)}
                                            isLoading={isSubmitting}
                                        />
                                    </Switch.Case>

                                    {/* option5: I forgot to track hours. */}
                                    <Switch.Case condition={!step || step === 5}>
                                        <Option5
                                            checked={step === 5}
                                            index={5}
                                            onChange={e => setStep(Number(e.target.value))}
                                            onSubmit={handleSubmitForm}
                                            onBack={() => setStep(0)}
                                            isLoading={isSubmitting}
                                        />
                                    </Switch.Case>

                                    {/* option6: In the morning, I had to wait for work before I could start.. */}
                                    <Switch.Case condition={!step || step === 6}>
                                        <Option6
                                            checked={step === 6}
                                            index={6}
                                            onChange={e => setStep(Number(e.target.value))}
                                            onSubmit={handleSubmitForm}
                                            onBack={() => setStep(0)}
                                            isLoading={isSubmitting}
                                        />
                                    </Switch.Case>

                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcknowledgementReminderModal;
