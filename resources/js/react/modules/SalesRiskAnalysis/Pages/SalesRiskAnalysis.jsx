import React from "react";
import { useDispatch, useSelector } from "react-redux";

// ui components
import RefreshButton from "../components/RefreshButton";
import { SalesRiskAnalysisContainer } from "../components/ui/Styles/ui";

// api
import {
    useGetSalesRiskAnalysisInputsQuery,
    useGetSalesRiskAnalysisRulesQuery,
} from "../../../services/api/salesRiskAnalysisSlice";
import { useGetAllFilterOptionQuery } from "../../../services/api/FilterBarOptionsApiSlice";

// table
import SalesRiskAnalysisTable from "../components/table/SalesRiskAnalysisTable";
import { SalesRiskAnalysisTableColumns } from "../components/table/SalesRiskAnalysisTableColumns";

// modal
import AddNewPolicyModal from "../components/modal/AddNewPolicyModal";
import {
    setFilterOptionsState,
    setFilterCountriesState,
} from "../../../services/features/filterOptionSlice";

const SalesRiskAnalysis = () => {
    const dispatch = useDispatch();
    const { departments, countries } = useSelector(
        (state) => state.filterOptions
    );
    const [dept, setDept] = React.useState(null);

    // modal open close state
    const [addNewPolicyModalOpen, setAddNewPolicyModalOpen] =
        React.useState(false);

    // modal state data
    const [newPolicyData, setNewPolicyData] = React.useState({
        policyName: "",
        department: {},
        policyType: {},
        title: "",
        rulesType: {},
        value: "",
        from: "",
        to: "",
        yes: "",
        no: "",
        countries: [],
        points: "",
    });

    // get sales risk analysis rules
    const { data, isFetching, isLoading, refetch } =
        useGetSalesRiskAnalysisRulesQuery(null);

    // fetch filter options
    const { data: filterOptions, isFetching: isFilterOptionsFetching } =
        useGetAllFilterOptionQuery("", {
            refetchOnMountOrArgChange: true,
            skip: departments?.length,
        });

    const { data: salesRiskInputs, isFetching: isSalesRiskInputsFetching } =
        useGetSalesRiskAnalysisInputsQuery("", {
            refetchOnMountOrArgChange: true,
            skip: countries?.length,
        });

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        // for testing
        if (name === "policyType") {
            setNewPolicyData({
                ...newPolicyData,
                [name]: value,
                rulesType: {},
            });
        } else {
            setNewPolicyData({ ...newPolicyData, [name]: value });
        }
    };

    // set filter options state
    React.useEffect(() => {
        if (filterOptions && !isFilterOptionsFetching) {
            setDept(filterOptions?.department);
            dispatch(setFilterOptionsState(filterOptions));
        }
    }, [filterOptions, isFilterOptionsFetching]);

    React.useEffect(() => {
        if (salesRiskInputs && !isSalesRiskInputsFetching) {
            dispatch(setFilterCountriesState(salesRiskInputs));
        }
    }, [salesRiskInputs, isSalesRiskInputsFetching]);

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
                        <i className="fa fa-plus mr-2" aria-hidden="true" />
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
                    countries={countries}
                    handleMultiSelectChange={setNewPolicyData}
                />
            </SalesRiskAnalysisContainer>
        </React.Fragment>
    );
};

export default SalesRiskAnalysis;
