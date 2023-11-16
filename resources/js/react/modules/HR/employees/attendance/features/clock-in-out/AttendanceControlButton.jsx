import React from "react";
import ReactDOM from "react-dom/client";
import Button from "../../../../../../global/Button";
import Switch from "../../../../../../global/Switch";
import ShowClock from "../../components/ShowClock";
import styles from "./AttendanceControlButton.module.css";
import { WorkStatusConfirmationModal } from "./WorkStatusConfirmationModal";

/**
 * * It's a headless features component
 * * It's Responsible for Employee check in & check out control
 */

export const AttendanceControlButton = () => {
    const [showAcknowledgementReminder, setShowAcknowledgementReminder] = React.useState(false);
    const [checkIn, setCheckIn] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [workStatusConfirmationModalIsOpen, setWorkStatusConfirmationModalIsOpen] = React.useState(false);

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

    // check is check in
    React.useEffect(() => {
        const clockInData  = JSON.parse(localStorage.getItem('clock_in'));
        if(clockInData){
            setCheckIn(clockInData.checkInStatus);
        }
    }, [])


    return (
        <>
            <Switch>
                <div className={styles.attendance_button_group}>
                    <ShowClock className={styles.clock} />
                    {/* check in control button */}
                    <Switch.Case condition={!checkIn}>
                        <Button
                            className={styles.check_button}
                        >
                            <i className="fa-solid fa-arrow-right-to-bracket" />
                            Clock In
                        </Button>
                    </Switch.Case>
                    {/* check out control button */}
                    <Switch.Case condition={true}>
                        <React.Fragment>
                            <Button isLoading={isLoading} loaderTitle="Processing..." onClick={onCheckOutButtonClick} className={styles.check_button}>
                                <i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180" />
                                Clock Out
                            </Button>

                            {/* check out confirmation modal */}
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
                    </Switch.Case>
                </div>
            </Switch>
        </>
    );
};


// append into container
const container = document.getElementById("employee-check-in-out-button");

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <AttendanceControlButton />
        </React.StrictMode>
    );
}
