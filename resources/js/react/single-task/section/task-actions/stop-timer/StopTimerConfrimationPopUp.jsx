import React from "react";
import OptionOne from "./options/OptionOne";
import OptionTwo from "./options/OptionTwo";
import OptionThree from "./options/OptionThree";
import OptionFour from "./options/OptionFour";
import OptionFive from "./options/OptionFive";
import Button from "../../../components/Button";
import { useGetUserTrackTimeQuery, useStoreStopTrackTimerMutation } from "../../../../services/api/SingleTaskPageApi";
import { User } from "../../../../utils/user-details";
import { useSelector } from "react-redux";
import { Placeholder } from "../../../../global/Placeholder";
import dayjs from "dayjs";
import OptionSix from "./options/OptionSix";
import { useNavigate } from "react-router-dom";

const StopTimerConfrimationPopUp = ({ handleTemporarilyStopTimer, close}) => {
    const { task, lessTrackModalFor, lessTrackDate } = useSelector(s => s.subTask)
    const [optionId, setOptionId] = React.useState(null);
    const [closingToday, setClosingToday] = React.useState(false); 
    const [trackHours, setTrackHours] = React.useState('');
    const [trackMinutes, setTrackMinutes] = React.useState('');
    const loggedUser = new User(window?.Laravel?.user); 

    const [ storeStopTrackTimer, {
        isLoading: isSubmitting
    }] = useStoreStopTrackTimerMutation();

    const {
        data: trackTime, 
        isFetching
    } = useGetUserTrackTimeQuery(`${loggedUser?.getId()}?date=${dayjs(lessTrackDate).format('YYYY-MM-DD')}`);

 

    const navigate = useNavigate();
     

    React.useEffect(() => {
        if(!isFetching && trackTime){
            let m = Math.abs(trackTime.target_time - trackTime?.tracked_times); 
            let h = Math.floor(m/60);
            m = m%60;

            setTrackHours(h);
            setTrackMinutes(m)
        }
    }, [trackTime, isFetching])

    const handleSubmitForm = (data) => {
        let date = lessTrackDate === 'Today' ? dayjs().format('YYYY-MM-DD') : dayjs(lessTrackDate).format(date);
        storeStopTrackTimer({...data, date, task_id: task?.id, user_id: loggedUser.id})
        .unwrap()
        .then(res => {
            handleTemporarilyStopTimer();
        })
        .catch(err => console.log(err))
        .finally(() => {
            navigate(`?modal=daily-submission&data_type=today`);
            close()
        })
    }

    return (
        <div
            className="sp1_single_task--modal-panel"
            style={{ transition: ".4s" }}   
        >
            <div className="border-bottom pb-2 px-3 d-flex align-items-center justify-content-between">
                <div className="font-weight-bold f-16">
                    {lessTrackModalFor === "STOP_TIMER" ? 'Stop Timer' : "Start Timer"}
                </div>
                <Button variant="tertiary" onClick={close} className="">
                    <i className="fa-solid fa-xmark" />
                </Button>
            </div>
            {!closingToday && lessTrackModalFor==="STOP_TIMER" && (
                <div className="py-2 px-4" > 
                    <h3 className="mb-3 text-center">
                        Are you closing for the day?
                    </h3>
                    <div
                        className="sp1_conf--button-group"
                        style={{ gap: "10px", height: "fit-content" }}
                    >
                        <button
                            onClick={() => setClosingToday(true)}
                            className=""
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleTemporarilyStopTimer}
                            className=""
                        >
                            No, I am temporarily <br /> stopping the tracker
                        </button>
                    </div>
                </div>
            )}

            { lessTrackModalFor=="START_TIMER" || (lessTrackModalFor==="STOP_TIMER" && closingToday) ? ( 
            
                <div className="sp1_single_task--modal-body sp1_single_task-modal-body-options p-3">
                    {/* show track time */}
                    <div className="alert alert-warning">
                        {isFetching ? <React.Fragment>
                            <Placeholder width="80%" height={14} className="mb-1" />
                            <Placeholder width="100%" height={14} className="mb-1" />
                            <Placeholder width="60%" height={14} />
                        </React.Fragment> :
                        <React.Fragment>
                            Your tracked time for <span className="font-weight-bold">{lessTrackDate}</span> is <span className="font-weight-bold">{ Math.floor(trackTime?.tracked_times / 60)} hours</span> and <span className="font-weight-bold">{Math.floor(trackTime?.tracked_times%60)} minutes.</span> <br/> Your minimum tracked hours should have been <span className="font-weight-bold"> {trackTime?.target_time/ 60} hours </span> and <span className="font-weight-bold"> {trackTime?.target_time % 60} minutes</span>, <br />and it is <span className="font-weight-bold text-danger"> {trackHours} hours </span> and <span className="font-weight-bold text-danger"> {trackMinutes} minutes </span> less. 
                        </React.Fragment> 
                        }
                    </div>

                    
                    {/* show track time   */}

                    <div className="sp1_stop-button-confirmation-option">
                        <h6>Why is that?</h6>
                        {isFetching ? <React.Fragment>
                            <div className="confirmation--options" style={{width: 350}}>
                                <Placeholder width="80%" height={14} className="mb-1" />
                                <Placeholder width="80%" height={14} className="mb-1" />
                                <Placeholder width="60%" height={14} className="mb-1" />
                                <Placeholder width="70%" height={14} className="mb-1" />
                                <Placeholder width="60%" height={14} />
                            </div>
                        </React.Fragment>:
                        <div className="confirmation--options">
                            {optionId ? (
                                <>
                                    {optionId === "option-1" && (
                                        <OptionOne
                                            id="option-1"
                                            onChecked={setOptionId}
                                            onSubmit={handleSubmitForm}
                                            isSubmitting = {isSubmitting}
                                            checked={optionId === "option-1"}
                                        />
                                    )}
                                    {optionId === "option-2" && (
                                        <OptionTwo
                                            id="option-2"
                                            onChecked={setOptionId}
                                            onSubmit={handleSubmitForm}
                                            isSubmitting = {isSubmitting}
                                            checked={optionId === "option-2"}
                                        />
                                    )}
                                    {optionId === "option-3" && (
                                        <OptionThree
                                            id="option-3"
                                            onSubmit={handleSubmitForm}
                                            isSubmitting = {isSubmitting}
                                            onChecked={setOptionId}
                                            checked={optionId === "option-3"}
                                        />
                                    )}
                                    {optionId === "option-4" && (
                                        <OptionFour
                                            id="option-4"
                                            onChecked={setOptionId}
                                            onSubmit={handleSubmitForm}
                                            isSubmitting = {isSubmitting}
                                            checked={optionId === "option-4"}
                                        />
                                    )}
                                    {optionId === "option-5" && (
                                        <OptionFive
                                            id="option-5"
                                            onChecked={setOptionId}
                                            onSubmit={handleSubmitForm}
                                            isSubmitting = {isSubmitting}
                                            checked={optionId === "option-5"}
                                        />
                                    )}
                                    {optionId === "option-6" && (
                                        <OptionSix
                                            id="option-6"
                                            onChecked={setOptionId}
                                            onSubmit={handleSubmitForm}
                                            isSubmitting = {isSubmitting}
                                            checked={optionId === "option-6"}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    <OptionOne
                                        id="option-1"
                                        onChecked={setOptionId}
                                        onSubmit={handleSubmitForm}
                                        isSubmitting = {isSubmitting}
                                        checked={optionId === "option-1"}
                                    />
                                    <OptionTwo
                                        id="option-2"
                                        onChecked={setOptionId}
                                        onSubmit={handleSubmitForm}
                                        isSubmitting = {isSubmitting}
                                        checked={optionId === "option-2"}
                                    />
                                    <OptionThree
                                        id="option-3"
                                        onChecked={setOptionId}
                                        onSubmit={handleSubmitForm}
                                        isSubmitting = {isSubmitting}
                                        checked={optionId === "option-3"}
                                    />
                                    <OptionFour
                                        id="option-4"
                                        onChecked={setOptionId}
                                        onSubmit={handleSubmitForm}
                                        isSubmitting = {isSubmitting}
                                        checked={optionId === "option-4"}
                                    />
                                    <OptionFive
                                        id="option-5"
                                        onChecked={setOptionId}
                                        onSubmit={handleSubmitForm}
                                        isSubmitting = {isSubmitting}
                                        checked={optionId === "option-5"}
                                    /> 
                                    
                                    <OptionSix
                                        id="option-6"
                                        onChecked={setOptionId}
                                        onSubmit={handleSubmitForm}
                                        isSubmitting = {isSubmitting}
                                        checked={optionId === "option-6"}
                                    /> 
                                </>
                            )}
                        </div>}

                        {!optionId && closingToday && (
                            <div className="mt-3 d-flex align-items-center">
                                <Button
                                    onClick={() => setClosingToday(false)}
                                    variant="tertiary"
                                    className="ml-auto"
                                >
                                    Back
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default StopTimerConfrimationPopUp;
