import React from 'react';
import CKEditorComponent from '../../../../../../../../ckeditor';
import Button from '../../../../../../../../global/Button';
import Switch from '../../../../../../../../global/Switch';
import { Flex } from '../../../../../../../../global/styled-component/Flex';

const LeaveExplanationOption = ({
    checked,
    index,
    onChange,
    onSubmit,
    isLoading,
    parentReason,
    lessTrackDate,
    onBack
}) => {
    const [leavePeriod, setLeavePeriod] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [error, setError] = React.useState(null);
    const [durationStart, setDurationStart] = React.useState("08:00 AM");
    const [durationEnd, setDurationEnd] = React.useState("05:00 PM");
    const [sType, setSType] = React.useState(''); // submission type

    // setup time field
    React.useEffect(() => {
        // start time
        window
            .$("#timepicker1")
            .timepicker("setTime", durationStart)
            .on("changeTime.timepicker", function (e) {
                setDurationStart(e.target.value);
            });

        // end time
        window
            .$("#timepicker2")
            .timepicker("setTime", durationEnd)
            .on("changeTime.timepicker", function (e) {
                setDurationEnd(e.target.value);
                // console.log(e.timeStamp)
            });
    }, [checked]);

    // validate form
    const isValid = () => {
        let errCount = 0;
        let err = new Object();

        if(leavePeriod === ''){
            errCount++;
            err.leavePeriod = "Select the approximate time!"
        }

        if(comment === ''){
            errCount++;
            err.comment = 'Please explain the reason of your leave!';
        }


        setError(err);
        return !errCount;
    }
    // editor data change
    const handleEditorChange = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    }
      // handle form submit
   const handleSubmission = (e, submissionType) => {
        e.preventDefault();
        const data = {
            reason_for_less_tracked_hours_a_day_task: parentReason,
            child_reason: `I had half day of leave ${lessTrackDate}`,
            durations: JSON.stringify([{id: 'de2sew', start: durationStart, end: durationEnd}]),
            comment,
            leave_period: leavePeriod,
        };

        setSType(submissionType)
        if(isValid()){
            onSubmit(data, submissionType, onBack);
        }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fill up the all required fields!",
                showConfirmButton: true,
            });
        }
    }



  return (
    <React.Fragment>
        <div className="--option-item">
            {/* acknowledgement option */}
            <div className="d-flex align-items-center" style={{gap: '10px'}}>
                <input
                    type='checkbox'
                    style={{cursor: 'pointer'}}
                    checked={checked}
                    value={index.toString()}
                    onChange={onChange}
                />
                I had half day of leave today
            </div>

            <Switch>
                <Switch.Case condition={checked}>
                    <div className='pl-3 my-3 bg-white'>
                        <label className="font-weight-bold">Select an approximate time here <sup>*</sup></label>

                        {/* time period */}
                        <Flex alignItem="center">
                            <label htmlFor="">
                                <input
                                    type='radio'
                                    name="period"
                                    value="First Half"
                                    style={{cursor: 'pointer'}}
                                    onChange={e => setLeavePeriod(e.target.value)}
                                /> First Half
                            </label>

                            <label htmlFor="">
                                <input
                                    type='radio'
                                    name="period"
                                    value="Second Half"
                                    style={{cursor: 'pointer'}}
                                    onChange={e => setLeavePeriod(e.target.value)}
                                /> Second Half
                            </label>
                        </Flex>

                        {/* error */}
                        <Switch.Case condition={error?.leavePeriod}>
                            <div className='f-14' style={{color: 'red'}}>{error?.leavePeriod}</div>
                        </Switch.Case>


                        {/* time selection */}
                        <div className="row">
                            <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                <label htmlFor="" className="d-block">
                                    From:
                                </label>
                                <input
                                    id="timepicker1"
                                    className="form-control w-100 py-2"
                                    data-minute-step="1"
                                    data-modal-backdrop="false"
                                    type="text"
                                />
                            </div>

                            <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                <label htmlFor="" className="d-block">
                                    To
                                </label>
                                <input
                                    id="timepicker2"
                                    className="form-control w-100 py-2"
                                    data-minute-step="1"
                                    data-modal-backdrop="false"
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* comment field */}
                        <div className="mt-3">
                            <h6>Write your comments here: </h6>
                            <div className="ck-editor-holder stop-timer-options">
                                <CKEditorComponent data={comment} onChange={handleEditorChange} />
                            </div>
                            <Switch.Case condition={error?.comment}>
                                <div className='f-14 text-danger'>{error?.comment}</div>
                            </Switch.Case>
                        </div>

                        {/* footer section */}
                        <div className='mt-3 w-100 d-flex align-items-center'>
                            {/* back button */}
                            <Button
                                variant='tertiary'
                                onClick={() => onBack(null)}
                                className='ml-auto mr-2'
                            >
                                Back
                            </Button>

                            <Button
                                onClick={e => handleSubmission(e, '')}
                                isLoading={sType !== 'CONTINUE' && isLoading}
                                loaderTitle='Processing...'
                            >
                                Submit
                            </Button>


                            <Button
                                variant='success'
                                className='ml-2'
                                onClick={e => handleSubmission(e, 'CONTINUE')}
                                isLoading={sType === 'CONTINUE' && isLoading}
                                loaderTitle='Processing...'
                            >
                                Submit and add more
                            </Button>
                        </div>
                    </div>
                </Switch.Case>
            </Switch>
        </div>
    </React.Fragment>
  )
}

export default LeaveExplanationOption
