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
    refetch
  } = useGetSalesRiskAnalysisRulesQuery(null)

  // sales risk analysis rules data
  const salesRiskAnalysisRules = data
  const isLoading = true

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