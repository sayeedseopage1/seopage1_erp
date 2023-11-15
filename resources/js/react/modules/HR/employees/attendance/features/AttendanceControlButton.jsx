import React from "react";
import ReactDOM from "react-dom/client";
import Button from "../../../../../global/Button";
import Switch from "../../../../../global/Switch";
import ShowClock from "../components/ShowClock";
import { useAttendanceControlButtonFeatures } from "../hooks/useAttendanceControlButtonFeatures";
import styles from "../styles/AttendanceControlButton.module.css";

/**
 * * It's a headless features component
 * * It's Responsible for Employee check in & check out control
 */

export const AttendanceControlButton = () => {
    const {showWorkConfirmation, onCheckIn, onCheckOut } = useAttendanceControlButtonFeatures();

    return (
        <>
            <Switch>
                <div className={styles.attendance_button_group}>
                    <ShowClock className={styles.clock} />

                    {/* check in control button */}
                    <Switch.Case condition={true}>
                        <Button
                            onClick={onCheckIn}
                            className={styles.check_button}
                        >
                            <i className="fa-solid fa-arrow-right-to-bracket" />
                            Clock In
                        </Button>
                    </Switch.Case>
                    {/* check out control button */}
                    <Switch.Case onClick={onCheckOut} condition={false}>
                        <Button className={styles.check_button}>
                            <i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180" />
                            Clock Out
                        </Button>
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
