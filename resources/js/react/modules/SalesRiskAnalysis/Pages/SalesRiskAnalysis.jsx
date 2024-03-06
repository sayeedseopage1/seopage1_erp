import React from 'react'

// ui components  
import RefreshButton from '../components/RefreshButton'
import { SalesRiskAnalysisContainer } from '../components/ui/Styles/ui'

// api
import { useGetSalesRiskAnalysisRulesQuery } from '../../../services/api/salesRiskAnalysisSlice'

// table
import SalesRiskAnalysisTable from '../components/table/SalesRiskAnalysisTable'
import { SalesRiskAnalysisTableColumns } from '../components/table/SalesRiskAnalysisTableColumns'


const SalesRiskAnalysis = () => {

  // get sales risk analysis rules
  const {
    data,
    isFetching,
    isLoading,
    refetch
  } = useGetSalesRiskAnalysisRulesQuery(null)

  // sales risk analysis rules data
  const salesRiskAnalysisRules = data

  console.log('salesRiskAnalysisRules', salesRiskAnalysisRules)
 
  return (
    <React.Fragment>
      <SalesRiskAnalysisContainer>
        {/* refresh button */}
        <div className='d-flex justify-content-end'>
            <RefreshButton
              onClick={() => {
                  refetch()
              }}
            />
            <button className=''>
              <i className="fa fa-plus" aria-hidden="true"></i>
              Add New Policies
            </button>
        </div>
        <div className='sp1_tlr_container'>
            <div className="sp1_tlr_tbl_container mx-0">
                <SalesRiskAnalysisTable
                  tableColumns={SalesRiskAnalysisTableColumns}
                  tableName="SalesRiskAnalysisTable"
                  tableData={salesRiskAnalysisRules}
                  isFetching={isFetching}
                  isLoading={isLoading}
                />
            </div>
        </div>
      </SalesRiskAnalysisContainer>
    </React.Fragment>
  )
}

export default SalesRiskAnalysis