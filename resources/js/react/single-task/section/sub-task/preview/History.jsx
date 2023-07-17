import React, {lazy, Suspense} from 'react'
import Loader from '../../../components/Loader' 
import HistoryLoader from '../../../components/HistoryLoader';
const InnerHistoryItem = lazy(()=> import('../../history/InnerHistoryItem'));

const History = ({histories, isLoading}) => { 
  return (
    <React.Fragment>
        <h6 className='font-weight-bold'> Histories </h6> 
        <div className='mt-3 px-2'>  
          {histories.length > 0 ? histories.map(d => (
             <React.Fragment key={d.id}>
               <Suspense fallback={<HistoryLoader />}>
                  <InnerHistoryItem history={d} />
              </Suspense>
             </React.Fragment> 
          )):null} 
          {isLoading && <Loader />}
        </div> 
    </React.Fragment>
  )
}

export default History



// history loader