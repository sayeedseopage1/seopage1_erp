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
  const salesRiskAnalysisRules = data?.data

 
  return (
    <React.Fragment>
      <SalesRiskAnalysisContainer>
        {/* refresh button */}
        <div className='d-flex justify-content-between align-items-center'>
            <button className='btn btn-success'>
              <i className="fa fa-plus mr-2" aria-hidden="true"></i>
              Add New Policies
            </button>
            <RefreshButton
              onClick={() => {
                  refetch()
              }}
              isLoading={isFetching}
            />
        </div>
        <div className='sp1_tlr_container'>
            <div className="sp1_tlr_tbl_container mx-0 py-3">
                {/* sales risk analysis table */}
                <SalesRiskAnalysisTable
                  tableColumns={SalesRiskAnalysisTableColumns}
                  tableName="SalesRiskAnalysisTable"
                  tableData={salesRiskAnalysisRules}
                  isLoading={isFetching}
                />
            </div>
        </div>
      </SalesRiskAnalysisContainer>
    </React.Fragment>
  )
}

export default SalesRiskAnalysis