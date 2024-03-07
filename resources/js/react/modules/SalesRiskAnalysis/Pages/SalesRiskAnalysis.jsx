import React from "react";
import { useDispatch, useSelector } from "react-redux";

// ui components
import RefreshButton from "../components/RefreshButton";
import { SalesRiskAnalysisContainer } from "../components/ui/Styles/ui";

// api
import { useGetSalesRiskAnalysisRulesQuery } from "../../../services/api/salesRiskAnalysisSlice";
import { useGetAllFilterOptionQuery } from "../../../services/api/FilterBarOptionsApiSlice";

// table
import SalesRiskAnalysisTable from "../components/table/SalesRiskAnalysisTable";
import { SalesRiskAnalysisTableColumns } from "../components/table/SalesRiskAnalysisTableColumns";

// modal
import AddNewPolicyModal from "../components/modal/AddNewPolicyModal";
import { setFilterOptionsState } from "../../../services/features/filterOptionSlice";

const SalesRiskAnalysis = () => {
    const dispatch = useDispatch();
    const { departments } =  useSelector(state => state.filterOptions);

    // modal open close state
    const [addNewPolicyModalOpen, setAddNewPolicyModalOpen] =
        React.useState(false);

    // modal state data
    const [newPolicyData, setNewPolicyData] = React.useState({
        policyName: "",
        department: {},
        policyType: {}
    });
    const [dept, setDept] = React.useState(null);

    // get sales risk analysis rules
    const { data, isFetching, isLoading, refetch } =
        useGetSalesRiskAnalysisRulesQuery(null);

    // fetch filter options
    const {
        data: filterOptions,
        isFetching: isFilterOptionsFetching,
    } = useGetAllFilterOptionQuery('', {
        refetchOnMountOrArgChange: true,
        skip: departments.length
    });

    // handle input change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewPolicyData({...newPolicyData, [name]: value});
    }


    // set filter options state
    React.useEffect(() => {
        if(filterOptions && !isFilterOptionsFetching){
            setDept(filterOptions?.department);
            dispatch(
                setFilterOptionsState(filterOptions)
            )
        }
    }, [filterOptions, isFilterOptionsFetching])


    // sales risk analysis rules data
    const salesRiskAnalysisRules = data?.data;

    // handle modal open close
    const handleAddNewPolicyModal = () => {
        setAddNewPolicyModalOpen(!addNewPolicyModalOpen);
    };

    console.log(newPolicyData);

    return (
        <React.Fragment>
            <SalesRiskAnalysisContainer>
                {/* refresh button */}
                <div className="d-flex justify-content-between align-items-center">
                    <button
                        onClick={handleAddNewPolicyModal}
                        className="btn btn-primary"
                    >
                        <i className="fa fa-plus mr-2" aria-hidden="true"/>
                        Add New Policy
                    </button>
                    <RefreshButton
                        onClick={() => {
                            refetch();
                        }}
                        className="py-2"
                        isLoading={isFetching}
                    />
                </div>
                <div className="sp1_tlr_container">
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
                
                {/* Add new Policy Modal */}

                <AddNewPolicyModal
                    open={addNewPolicyModalOpen}
                    closeModal={handleAddNewPolicyModal}
                    departments={dept}
                    newPolicyData={newPolicyData}
                    handleChange={handleChange}
                />

            </SalesRiskAnalysisContainer>
        </React.Fragment>
    );
};

export default SalesRiskAnalysis;


