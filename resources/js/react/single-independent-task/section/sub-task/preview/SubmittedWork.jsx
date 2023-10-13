import React, { Suspense, lazy } from 'react'
import Loader from '../../../components/Loader'
const SubmittedWorkItem = lazy(() => import('./SubmittedWorkItem'))

const SubmittedWork = ({task, submittedWork, loading}) => { 
  return (
    <React.Fragment>
        <h6 className='font-weight-bold'>Submitted Work</h6>
        <div className='d-flex flex-column h-100' style={{gap:'10px'}}>

            {loading && <div className='mt-3'><Loader /></div>}  
            {submittedWork.length > 0 ? submittedWork.map((s) => (
                <React.Fragment key={s?.task_id}>
                    <Suspense fallback={<div className='mt-3'><Loader /></div>}>
                        <SubmittedWorkItem data={s} task={task} />
                    </Suspense>
                </React.Fragment> 
            )): null}
        </div>
    </React.Fragment>
  )
}

export default SubmittedWork