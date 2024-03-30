import React, { useState } from 'react';
import PointFactorsTable from '../components/table/PointFactorsTable';
import { PointFactorsColumns } from '../components/table/PointFactorsColumns';
import TopSection from '../components/sectionComponents/TopSection';
import { AddButton, AddNewSectionCointainer } from '../components/Styles/ui/ui';
import AddNewItemsModal from '../components/modal/AddNewItemsModal';
import { useGetPmPointFactorsQuery } from '../../../../services/api/pmSalesApiSlice';
// import { HourlyPointFactorsColumns } from '../components/table/HourlyPointFactorsColumns';

const PointFactors = () => {
    // top section states 
    const [tab, setTab] = useState("fixed");
    const [search, setSearch] = useState("");
    // modal open close state
    const [addNewItemModalOpen, setAddNewItemModalOpen] =
        React.useState(false);
    // modal state data
    const [newFactorData, setNewFactorData] = React.useState({
        criteria: "", // input select
        title: "",  // input text
        projectType: "", // input checkbox
        lowerLimit: "", // input number
        upperLimit: "", // input number
        limitType: "", // input checkbox
        limitUnit: {}, // input //input select
        lowerLimitCondition: {}, //input select
        upperLimitCondition: {}, //input select
        pointType: "", // input checkbox
        points: "", // input number
        pointDependOnModel: "", //input string (optional)
        pointDependOnField: "", //input string (optional)
        status: "" //input number (optional)
    });

    // console.log(newFactorData)

    // modal state validation
    const [newPolicyDataValidation, setNewPolicyDataValidation] =
        React.useState({
            criteria: false,
            factors: false,
            categories: false,
            points: false,
        });

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // get sales risk analysis rules
    const { data, isFetching, isLoading, refetch } =
        useGetPmPointFactorsQuery(
            queryString({
                page: pageIndex + 1,
                limit: pageSize,

            })
        );
    // sales risk analysis rules data
    const pmPointFactorsData = data?.data;

    const resetFormState = () => {
        setNewFactorData({
            criteria: "",
            title: "",
            projectType: "",
            lowerLimit: "",
            upperLimit: "",
            limitType: "",
            limitUnit: {},
            lowerLimitCondition: {},
            upperLimitCondition: {},
            pointType: "",
            points: "",
            pointDependOnModel: "",
            pointDependOnField: "",
            status: ""
        })
    }

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (newFactorData[name] === value) {
            // If yes, clear the value from the state
            setNewFactorData({ ...newFactorData, [name]: "" });
        } else {
            // Otherwise, set the clicked checkbox's value in the state
            setNewFactorData({ ...newFactorData, [name]: value });
        }
        console.log(newFactorData)
        console.log(newFactorData[name] === value)

    }

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // main Table page change
    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    // handle modal open close
    const handleAddNewItemModal = () => {
        setAddNewItemModalOpen(!addNewItemModalOpen);
        resetFormState();
        // setNewPolicyInputData([]);
    };

    const handleFactorsAdded = async () => {
        // if (newPolicyInputData?.length === 0) {
        //     toast.error("Please add a policy first");
        //     return;
        // }
        // try {
        //     // prepare payload for api
        //     const payload = {
        //         title: newPolicyInputData[0]?.policyName,
        //         department: newPolicyInputData[0]?.department?.id,
        //         comment: newPolicyInputData[0]?.comment,
        //         ruleList: newPolicyInputData.map((item) => {
        //             const rule = {
        //                 policyType: item.policyType?.name,
        //                 title: item.title,
        //             };
        //             if (item.value) rule.value = item.value;
        //             if (!_.isEmpty(item.valueType))
        //                 rule.valueType = item.valueType.name;
        //             if (item.from) rule.from = item.from;
        //             if (item.to) rule.to = item.to;
        //             if (item.points) rule.points = item.points;
        //             if (item.yes && item.no) {
        //                 rule.value = {
        //                     yes: {
        //                         point: item.yes,
        //                         comment: item.yesComment,
        //                     },
        //                     no: {
        //                         point: item.no,
        //                         comment: item.noComment,
        //                     },
        //                 };
        //             }
        //             if (item.countries?.length > 0) {
        //                 rule.countries = item.countries.map((country) => ({
        //                     [country.iso]: country.niceName,
        //                 }));
        //             }
        //             if (item.ruleComment) rule.comment = item.ruleComment;
        //             return rule;
        //         }),
        //     };

        //     // console.log("payload", payload);
        //     const response = await submitData(payload);
        //     if (response?.data) {
        //         toast.success("New item added successfully");
        //         handleAddNewPolicyModal();
        //         setNewPolicyInputData([]);
        //     }
        // } catch (error) {
        //     if (error?.status === 403) {
        //         toast.error("You are not authorized to perform this action");
        //         return;
        //     } else {
        //         toast.error("Failed to add new item");
        //     }
        // }
    };

    // console.log(tab)


    const tableHeaderFilterByTab = PointFactorsColumns.filter(item => {
        if (tab === "hourly") {
            return item.accessorKey !== 'criteria';
        }
        return true
    });

    // console.log(tableHeaderFilterByTab)

    return (
        <section>
            <TopSection tab={tab} setTab={setTab} search={search} setSearch={setSearch} />
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container mx-0 py-3">
                    {/* point factor table */}
                    <PointFactorsTable
                        tableColumns={tableHeaderFilterByTab}
                        tableName="PointFactorsTable"
                        // tab={tab}
                        tableData={pmPointFactorsData}
                        isLoading={isFetching}
                        refetch={refetch}
                        onPageChange={onPageChange}
                    />

                    <AddNewSectionCointainer>
                        <p>Add more item ?</p>
                        <AddButton onClick={handleAddNewItemModal}>Add new items</AddButton>
                    </AddNewSectionCointainer>


                    {/* Add new factor item Modal */}
                    <AddNewItemsModal
                        handleChange={handleChange}
                        open={addNewItemModalOpen}
                        newFactorData={newFactorData}
                        setNewFactorData={setNewFactorData}
                        closeModal={handleAddNewItemModal}
                        handleFactorsAdded={handleFactorsAdded}
                        // newPolicyInputData={newPolicyInputData}
                        // newPolicyDataValidation={newPolicyDataValidation}
                        // TODO: loading will come from api 
                        isLoadingAddPointFactors={
                            false
                        }
                    />
                </div>
            </div>
        </section>

    );
};

export default PointFactors;