import React from 'react'
import Button from '../../../components/Button'
import { AcceptAndContinueButton } from './RevisionAcceptAndContinue'

const RevisionVeiw = ({onAccept, onDeny}) => {
  return (
    <React.Fragment>
        <div>
            <p>
                <span className='font-weight-bold text-danger f-16'>Reason: </span>
                Task Has Revision Because Project Manager Made Some Changes Outside Instructions.
            </p>
        </div>

        <div className='st_revision_comment'>
            <div className='sp1_ck_content'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat totam minima deleniti, unde cupiditate ea, officia qui harum quia veniam fuga non nulla ullam in architecto quasi nostrum suscipit omnis!
            </div>
        </div> 
        <div className="mt-4 mb-2 d-flex align-items-center">
            <Button onClick={onDeny} variant="tertiary" className="ml-auto mr-2">
                Deny & Continue
            </Button>

            <AcceptAndContinueButton
                onClick={onAccept} 
                isLoading={false}
            />
        </div>
    </React.Fragment>
  )
}

export default RevisionVeiw