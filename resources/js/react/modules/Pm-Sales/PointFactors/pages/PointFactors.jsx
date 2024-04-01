import React, { useState } from 'react';
import PointFactorsTable from '../components/table/PointFactorsTable';
import { PointFactorsColumns } from '../components/table/PointFactorsColumns';
import TopSection from '../components/sectionComponents/TopSection';
import { AddButton, AddNewSectionCointainer } from '../components/Styles/ui/ui';
import AddNewItemsModal from '../components/modal/AddNewItemsModal';
import { useCreatePmPointFactorMutation, useGetPmPointFactorsQuery } from '../../../../services/api/pmSalesApiSlice';
import { useEffect } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { number } from 'zod';
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
        criteria: {}, // input select
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

    // modal state validation
    const [newFactorDataValidation, setNewFactorDataValidation] =
        React.useState({
            criteria: false,
            title: false,
            projectType: false,
            lowerLimit: false,
            upperLimit: false,
            limitType: false,
            limitUnit: false,
            lowerLimitCondition: false,
            upperLimitCondition: false,
            pointType: false,
            points: false,
            isSubmitting: false,
        });

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // get pm point factors
    const { data, isFetching, isLoading, refetch } =
        useGetPmPointFactorsQuery(
            queryString({
                page: pageIndex + 1,
                limit: pageSize,

            })
        );
    // pm point factors data
    const pmPointFactorsData = data?.data;


    // filter by fixed and hourly 
    const [mainTableData, setMainTableData] = useState(pmPointFactorsData);
    useEffect(() => {
        if (tab === "fixed") {
            const fixedData = pmPointFactorsData?.map(item => {
                return {
                    ...item,
                    factors: item.factors.filter(d => d.project_type === 1)
                }
            })
            setMainTableData(fixedData)
        }
        else if (tab === "hourly") {
            const hourlyData = pmPointFactorsData?.map(item => {
                return {
                    ...item,
                    factors: item.factors.filter(d => d.project_type === 2)
                }
            })
            setMainTableData(hourlyData)
        } else {
            setMainTableData(pmPointFactorsData)
        }
    }, [pmPointFactorsData, tab])

    // search functionality
    useEffect(() => {
        setMainTableData(
            pmPointFactorsData?.filter((item) => {
                // Check if the title in the parent object matches the search
                const isTitleMatch = item.title.toLowerCase().includes(search.toLowerCase());

                // Check if any title in factors array matches the search
                const isFactorTitleMatch = item.factors.some(factor =>
                    factor.title.toLowerCase().includes(search.toLowerCase())
                );

                return isTitleMatch || isFactorTitleMatch;
            })
        );
    }, [search, pmPointFactorsData]);

    const resetFormState = () => {
        setNewFactorData({
            criteria: {},
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
    }
    useEffect(() => {
        // Update state with only the criteria property set and other properties empty
        setNewFactorData({
            ...newFactorData,
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
        });
    }, [newFactorData?.criteria]);



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

    // console.log("newFactorData", parseInt(newFactorData?.limitUnit?.name));

    // add pm point factors mutation
    const [createPmPointFactor, { isLoading: isLoadingAddPmFactors }] = useCreatePmPointFactorMutation()

    const handleFactorsAdded = async () => {
        if (_.isEmpty(newFactorData?.criteria)) {
            toast.error("Please add a criteria first");
            return;
        }
        try {
            const payload = {
                criteria_id: parseInt(newFactorData?.criteria?.name),
                title: newFactorData?.title ?? null,
                project_type: newFactorData?.projectType == "fixed" ? 1 : newFactorData?.projectType == "hourly" ? 2 : null ?? null,
                lower_limit: parseInt(newFactorData?.lowerLimit) ?? null,
                upper_limit: parseInt(newFactorData?.upperLimit) ?? null,
                limit_type: newFactorData?.limitType == "inclusive" ? 1 : newFactorData?.limitType == "exclusive" ? 2 : null ?? null,
                limit_unit: parseInt(newFactorData?.limitUnit?.name) ?? null,
                lower_limit_condition: newFactorData?.lowerLimitCondition?.name ?? null,
                upper_limit_condition: newFactorData?.upperLimitCondition?.name ?? null,
                point_type: newFactorData?.pointType == "fixed" ? 1 : newFactorData?.pointType == "percentage" ? 2 : null ?? null,
                points: parseFloat(newFactorData?.points) ?? null,
                point_depend_on_model: parseFloat(newFactorData?.pointDependOnModel) ?? null,
                point_depend_on_field: parseFloat(newFactorData?.pointDependOnField) ?? null,
                status: parseFloat(newFactorData?.status) ?? null,
            }
            const response = await createPmPointFactor(payload).unwrap();
            if (response?.status == 200) {
                toast.success(response.message);
                handleAddNewItemModal();
                resetFormState();
            }
        } catch (error) {
            toast.error("Failed to add new item");
        }

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

    const [mainColumns, setMainColumns] = useState(PointFactorsColumns);

    useEffect(() => {
        if (tab === "hourly") {
            const hourlyColumns = PointFactorsColumns.filter(item => item.accessorKey !== 'title');
            setMainColumns(hourlyColumns);
        } else {
            setMainColumns(PointFactorsColumns);
        }
    }, [tab, PointFactorsColumns])

    // console.log("columns", mainColumns)

    // const tableHeaderFilterByTab = PointFactorsColumns.filter(item => {
    //     if (tab === "hourly") {
    //         return item.accessorKey !== 'criteria';
    //     }
    //     return true
    // });

    // console.log(tableHeaderFilterByTab)

    return (
        <section>
            <TopSection tab={tab} setTab={setTab} search={search} setSearch={setSearch} />
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container mx-0 py-3">
                    {/* point factor table */}
                    <PointFactorsTable
                        tableColumns={mainColumns}
                        tableName="PointFactorsTable"
                        // tab={tab}
                        tableData={mainTableData}
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
                        isLoadingAddPointFactors={
                            isLoadingAddPmFactors
                        }
                    />
                </div>
            </div>
        </section>

    );
};

export default PointFactors;