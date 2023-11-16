import React from 'react';
import Button from '../../../../../../../global/Button';
import Switch from '../../../../../../../global/Switch';
import DidNotWorkForFewHours from './DidNotWorkForFewHours';
import LateExplanationOption from './LateExplanationOption';
import LeaveExplanationOption from './LeaveExplanationOption';
import LeavingEarlyExplanation from './LeavingEarlyExplanation';

const Option3 = ({
    checked,
    index,
    onChange,
    onSubmit,
    isLoading,
    onBack
}) => {
  const [step, setStep] = React.useState(0);
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
                I was present less hours at work Nov 09, 2023
            </div>


            <Switch>
               <Switch.Case condition={checked}>
                   <div className="d-flex flex-column pl-4 mt-2" style={{gap: '10px'}}>
                        {/* leave explanation option */}
                        <Switch.Case condition={!step || step === 1}>
                            <LeaveExplanationOption
                                checked={step===1}
                                index={1}
                                onChange={e => setStep(Number(e.target.value))}
                                onSubmit={d => console.log(d)}
                                onBack={() => setStep(0)}
                                lessTrackDate="today"
                                parentReason="I was present less hours at work Nov 09, 2023"
                                isLoading={false}
                            />
                        </Switch.Case>

                        {/* late explanation option */}
                        <Switch.Case condition={!step || step === 2}>
                            <LateExplanationOption
                                checked={step===2}
                                index={2}
                                onChange={e => setStep(Number(e.target.value))}
                                onSubmit={d => console.log(d)}
                                onBack={() => setStep(0)}
                                lessTrackDate="today"
                                parentReason="I was present less hours at work Nov 09, 2023"
                                isLoading={false}
                            />
                        </Switch.Case>

                        {/* leaving early explanation option */}
                        <Switch.Case condition={!step || step === 3}>
                            <LeavingEarlyExplanation
                                checked={step===3}
                                index={3}
                                onChange={e => setStep(Number(e.target.value))}
                                onSubmit={d => console.log(d)}
                                onBack={() => setStep(0)}
                                lessTrackDate="today"
                                parentReason="I was present less hours at work Nov 09, 2023"
                                isLoading={false}
                            />
                        </Switch.Case>

                        {/* did not work few hours  */}
                        <Switch.Case condition={!step || step === 4}>
                            <DidNotWorkForFewHours
                                checked={step===4}
                                index={4}
                                onChange={e => setStep(Number(e.target.value))}
                                onSubmit={d => console.log(d)}
                                onBack={() => setStep(0)}
                                lessTrackDate="today"
                                parentReason="I was present less hours at work Nov 09, 2023"
                                isLoading={false}
                            />
                        </Switch.Case>



                        <Switch.Case condition={!step}>
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
                            </div>
                        </Switch.Case>
                   </div>
               </Switch.Case>
            </Switch>
        </div>
    </React.Fragment>
  )
}

export default Option3
