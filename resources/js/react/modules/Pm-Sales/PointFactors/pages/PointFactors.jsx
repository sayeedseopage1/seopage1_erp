import React, { useState } from 'react';
import PointFactorsTable from '../components/table/PointFactorsTable';
import { PointFactorsColumns } from '../components/table/PointFactorsColumns';
import TopSection from '../components/sectionComponents/TopSection';
import { AddButton, AddNewSectionCointainer } from '../components/Styles/ui/ui';
import AddNewItemsModal from '../components/modal/AddNewItemsModal';

const PointFactors = () => {
    // top section states 
    const [tab, setTab] = useState("fixed");
    const [search, setSearch] = useState("");
    // modal open close state
    const [addNewItemModalOpen, setAddNewItemModalOpen] =
        React.useState(false);

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
        // resetFormState("all");
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


    return (

        <section>
            <TopSection tab={tab} setTab={setTab} search={search} setSearch={setSearch} />
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container mx-0 py-3">
                    {/* sales risk analysis table */}
                    <PointFactorsTable
                        tableColumns={PointFactorsColumns}
                        tableName="PointFactorsTable"
                        // tableData={salesRiskAnalysisRules}
                        // isLoading={isFetching}
                        // refetch={refetch}
                        onPageChange={onPageChange}
                    />

                    <AddNewSectionCointainer>
                        <p>Add more item ?</p>
                        <AddButton onClick={handleAddNewItemModal}>Add new items</AddButton>
                    </AddNewSectionCointainer>


                    {/* Add new Policy Modal */}
                    <AddNewItemsModal

                        // handleChange={handleChange}
                        open={addNewItemModalOpen}
                        // setNewPolicyData={setNewPolicyData}
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