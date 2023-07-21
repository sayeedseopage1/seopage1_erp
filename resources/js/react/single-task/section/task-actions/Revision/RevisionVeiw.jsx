import React from 'react'
import Button from '../../../components/Button'
import { AcceptAndContinueButton } from './RevisionAcceptAndContinue'
import { Placeholder } from '../../../../global/Placeholder'

const RevisionVeiw = ({revision, isLoading, onAccept, onDeny}) => {
  return (
    <React.Fragment>
        <div>
            {!isLoading ? (
                <p>
                    <span className='font-weight-bold text-danger f-16'>Reason: </span>
                    { revision?.revision_acknowledgement ?? revision?.revision_reason }
                </p>
            ): <div>
                <Placeholder width='450px' className='mb-2' />
                <Placeholder width='100px' className='mb-3' />
            </div>}
        </div>

        <div className='st_revision_comment'>
            {!isLoading && <div className='sp1_ck_content' dangerouslySetInnerHTML={{__html:revision?.comment}} />}
            
            {isLoading &&
                <div>
                    <Placeholder width='100%' className='mb-2' />
                    <Placeholder width='100%' className='mb-2' />
                    <Placeholder width='30%' className='mb-2' />
                </div>
            }
        </div> 
        <div className="mt-4 mb-2 d-flex align-items-center">
           {!isLoading && (
            <React.Fragment>
                <Button onClick={onDeny} variant="tertiary" className="ml-auto mr-2">
                    Deny & Continue
                </Button>

                <AcceptAndContinueButton
                    onClick={onAccept} 
                    isLoading={false}
                />
            </React.Fragment>
           )}
        </div>
    </React.Fragment>
  )
}

export default RevisionVeiw