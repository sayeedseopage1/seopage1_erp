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
import { useClickAway } from 'react-use'

const StopTimerConfrimationPopUp = ({ handleTemporarilyStopTimer, close}) => {
    const { task } = useSelector(s => s.subTask)
    const [optionId, setOptionId] = React.useState(null);
    const [closingToday, setClosingToday] = React.useState(false);
    const ref = React.useRef(null);
    const [trackHours, setTrackHours] = React.useState('');
    const [trackMinutes, setTrackMinutes] = React.useState('');
    
    const loggedUser = new User(window?.Laravel?.user);

    const [ storeStopTrackTimer, {
        isLoading: isSubmitting
    }] = useStoreStopTrackTimerMutation();

    const {data: trackTime, isFetching} = useGetUserTrackTimeQuery(loggedUser?.getId());

    React.useEffect(() => {
        if(!isFetching && trackTime){
            let m = Math.abs(435 - trackTime); 
            let h = Math.floor(m/60);
            m = m%60;

            setTrackHours(h);
            setTrackMinutes(m)
        }
    }, [trackTime, isFetching])

    const handleSubmitForm = (data) => {
        console.log(data)
        storeStopTrackTimer({...data, task_id: task?.id, user_id: loggedUser.id})
        .unwrap()
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    useClickAway(ref, close);

    return (
        <div
            className="sp1_single_task--modal-panel"
            style={{ transition: ".4s" }}
            ref={ref}
        >
            {/* 1st stap */}
            {!closingToday && (
                <div className="py-2 px-4">
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

            {/* if yes */}
            {closingToday ? (
                <div className="sp1_single_task--modal-body p-3">
                    {/* show track time */}
                    <div className="alert alert-warning">
                        Your tracked time for today is <span className="font-weight-bold">{ Math.floor(trackTime / 60)} hours</span> and <span className="font-weight-bold">{Math.floor(trackTime%60)} minutes.</span> <br/> Your minimum tracked hours should have been <span className="font-weight-bold"> 7 hours </span> and <span className="font-weight-bold"> 15 minutes</span>, <br />and it is <span className="font-weight-bold text-danger"> {trackHours} hours </span> and <span className="font-weight-bold text-danger"> {trackMinutes} minutes </span>
                        less. 
                    </div>

                    
                    {/* show track time   */}

                    <div className="sp1_stop-button-confirmation-option">
                        <h6>Why is that?</h6>
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
                                </>
                            )}
                        </div>

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
