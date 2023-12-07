import React from "react";
import ReactDOM from "react-dom/client";
import { toast } from "react-toastify";
import Button from "../../../../../../global/Button";
import Switch from "../../../../../../global/Switch";
import Toaster from "../../../../../../global/Toaster";
import { useAuth } from "../../../../../../hooks/useAuth";
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
    const [showReminder, setShowReminder] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [workStatusConfirmationModalIsOpen, setWorkStatusConfirmationModalIsOpen] = React.useState(false);
    const auth = useAuth();

    // handle checkout button
    const onCheckOutButtonClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put('/account/check-out-status', {})
                .then(response => {
                    // check clock in form already submitted
                    setCheckIn(false);
                    setData(response.data.data);

                    // store on local store
                    localStorage.removeItem('clock_in');

                    // toaster
                    toast.success('You Clock Out Successfully')

                    // if logged user is not developer
                    // reload page
                    if(_.includes([5, 9, 10], auth.getRoleId())){
                        setShowReminder(true);
                        setWorkStatusConfirmationModalIsOpen(true);
                    }else{
                        setWorkStatusConfirmationModalIsOpen(false);
                        window.location.reload();
                    }
                })
            setIsLoading(false);

        } catch (error) {
            console.log(error)
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
                    <Toaster />
                    <ShowClock className={styles.clock} />
                    {/* check in control button */}
                    <Switch.Case condition={!checkIn}>
                        <Button
                            onClick={() => window.location.reload()}
                            className={styles.check_button}
                        >
                            <i className="fa-solid fa-arrow-right-to-bracket" />
                            Clock In
                        </Button>
                    </Switch.Case>
                    {/* check out control button */}
                    <Switch.Case condition={checkIn}>
                        <React.Fragment>
                            <Button isLoading={isLoading} loaderTitle="Processing..." onClick={onCheckOutButtonClick} className={styles.check_button}>
                                <i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180" />
                                Clock Out
                            </Button>
                        </React.Fragment>
                    </Switch.Case>
                </div>

            </Switch>

            {/* check out confirmation modal */}
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
