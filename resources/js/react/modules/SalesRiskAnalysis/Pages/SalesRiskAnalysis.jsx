import React from 'react'
import RefreshButton from '../components/RefreshButton'

const SalesRiskAnalysis = () => {
 
  return (
    <React.Fragment>
      <section className='py-3'>
        {/* refresh button */}
        <div>
            <RefreshButton/>
        </div>
        <div className='sp1_tlr_container'>
            <div className="sp1_tlr_tbl_container">
              <h1>Sales Risk Analysis</h1>
            </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default SalesRiskAnalysis