import React, { useState } from 'react';
import PointFactorsTable from '../components/table/PointFactorsTable';
import { PointFactorsColumns } from '../components/table/PointFactorsColumns';
import TopSection from '../components/sectionComponents/TopSection';
import { AddButton, AddNewSectionCointainer } from '../components/Styles/ui/ui';
import AddNewItemsModal from '../components/modal/AddNewItemsModal';
import { useEffect } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import useActiveFactorFields from '../hooks/useActiveFactorFields';
import { validationFormator } from '../utils/validationFormator';
// import { filterNullValues } from '../utils/removeNull';
import { useCreatePmPointFactorMutation, useGetFactorsFieldsByCriteriaQuery, useGetPmPointFactorsQuery } from '../../../../services/api/Pm-Sales/pmSalesApiSlice';
import { auth } from '../../PmIncentive/constants';
// import { HourlyPointFactorsColumns } from '../components/table/HourlyPointFactorsColumns';

const PointFactors = () => {
    // top section states 
    const [tab, setTab] = useState(1);
    const [search, setSearch] = useState("");
    // modal open close state
    const [addNewItemModalOpen, setAddNewItemModalOpen] =
        React.useState(false);
    // modal state data
    const [newFactorData, setNewFactorData] = React.useState({
        criteria: {},
        title: "",
        project_type: "",
        lower_limit: "",
        upper_limit: "",
        infiniteValueDown: "",
        infiniteValueUp: "",
        limit_type: 1,
        limit_unit: {},
        point_type: "",
        points: "",
        status: "1"
    });
    const { activeFactorFields, setActiveCriteria } = useActiveFactorFields({ newFactorData })

    // modal state validation
    const [newFactorDataValidation, setNewFactorDataValidation] =
        React.useState({
            title: false,
            project_type: false,
            lower_limit: false,
            upper_limit: false,
            limit_type: false,
            limit_unit: false,
            point_type: false,
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
                project_type: tab
            })
        );

    // pm point factors data
    const pmPointFactorsData = data?.data;

    const [mainTableData, setMainTableData] = useState([]);

    // search functionality
    useEffect(() => {
        const filterData = (data) => {
            return data?.filter((item) => {
                // Check if the title in the parent object matches the search
                const isTitleMatch = item.title.toLowerCase().includes(search.toLowerCase());
                // Check if any title in factors array matches the search
                const isFactorTitleMatch = item.factors.some(factor =>
                    factor.title.toLowerCase().includes(search.toLowerCase())
                );
                return isTitleMatch || isFactorTitleMatch;
            });
        };
        let searchRes;
        searchRes = filterData(pmPointFactorsData)
        if (search) {
            setMainTableData(searchRes);
        } else {
            setMainTableData(pmPointFactorsData);
        }
    }, [search, pmPointFactorsData]);


    const resetFormState = () => {
        setNewFactorData({
            criteria: {},
            title: "",
            project_type: "",
            lower_limit: "",
            upper_limit: "",
            infiniteValueDown: "",
            infiniteValueUp: "",
            limit_type: 1,
            limit_unit: {},
            point_type: "",
            points: "",
            status: "1"
        })

        // reset validation 
        setNewFactorDataValidation({
            title: false,
            project_type: false,
            lower_limit: false,
            upper_limit: false,
            limit_type: false,
            limit_unit: false,
            point_type: false,
            points: false,
            isSubmitting: false,
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

            if (name === "criteria") {
                setNewFactorDataValidation({
                    title: false,
                    project_type: false,
                    lower_limit: false,
                    upper_limit: false,
                    // infiniteValueDown: false,
                    // infiniteValueUp: false,
                    limit_type: false,
                    limit_unit: false,
                    point_type: false,
                    points: false,
                    isSubmitting: false,
                })
            }
        }
    }

    useEffect(() => {
        setNewFactorData({
            ...newFactorData, lower_limit: "", upper_limit: "", infiniteValueDown: "",
            infiniteValueUp: ""
        })
        if (newFactorData?.limit_type == 2) {
            setNewFactorData({ ...newFactorData, lower_limit: 1, upper_limit: 1 })
        }
    }, [newFactorData?.limit_type])

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
        setActiveCriteria(1)
    };

    // add pm point factors mutation
    const [createPmPointFactor, { isLoading: isLoadingAddPmFactors }] = useCreatePmPointFactorMutation()

    const handleFactorsAdded = async () => {
        if (_.isEmpty(newFactorData?.criteria)) {
            toast.error("Please add a criteria first");
            return;
        }

        const validation = validationFormator(newFactorData, newFactorDataValidation)

        if (
            Object.entries(validation).some(
                ([key, value]) => key !== "isSubmitting" && value === true
            )
        ) {
            setNewFactorDataValidation({
                ...validation,
                isSubmitting: true,
            });
            return;
        }

        try {
            const lowerLimitCondition = newFactorData?.infiniteValueDown ? newFactorData?.infiniteValueDown : newFactorData?.limit_type == 2 ? "==" : "<"
            const upperLimitCondition = newFactorData?.infiniteValueUp ? newFactorData?.infiniteValueUp : newFactorData?.limit_type == 2 ? "==" : ">="

            const payload = {
                criteria_id: parseInt(newFactorData?.criteria?.name),
                title: newFactorData?.title ?? null,
                project_type: parseInt(newFactorData?.project_type) ?? null,
                lower_limit: parseInt(newFactorData?.lower_limit) ?? null,
                upper_limit: parseInt(newFactorData?.upper_limit) ?? null,
                limit_type: parseInt(newFactorData?.limit_type) ?? null,
                limit_unit: parseInt(newFactorData?.limit_unit?.name) ?? null,
                lower_limit_condition: lowerLimitCondition ?? null,
                upper_limit_condition: upperLimitCondition ?? null,
                point_type: parseInt(newFactorData?.point_type) ?? null,
                points: parseFloat(newFactorData?.points) ?? null,
                status: parseInt(newFactorData?.status) ?? 1,
            }
            // console.log("payload", payload)
            const response = await createPmPointFactor(payload).unwrap();

            if (response?.status == 200) {
                toast.success(response.message);
                handleAddNewItemModal();
                resetFormState();
            } else {
                toast.warning(response.message);
            }
        } catch (error) {
            toast.error("Failed to add new item");
        }
    };

    const [mainColumns, setMainColumns] = useState(PointFactorsColumns);

    useEffect(() => {
        if (tab === "2") {
            const hourlyColumns = PointFactorsColumns.filter(item => item.accessorKey !== 'title');
            setMainColumns(hourlyColumns);
        } else {
            setMainColumns(PointFactorsColumns);
        }
    }, [tab, PointFactorsColumns])

    // add new factor validation on change
    useEffect(() => {
        if (newFactorDataValidation?.isSubmitting) {
            const validation = validationFormator(newFactorData, newFactorDataValidation)
            setNewFactorDataValidation(validation);
        }
    }, [newFactorData]);



    // useEffect(() => {
    //     if (newFactorData?.infiniteValueDown) {
    //         if (newFactorData?.lower_limit && !newFactorData?.infiniteValueUp && !newFactorData?.upper_limit) {
    //             setNewFactorData(prev => ({ ...prev, lower_limit: newFactorData.lower_limit }));
    //         }
    //         if (newFactorData?.upper_limit && !newFactorData?.infiniteValueUp) {
    //             setNewFactorData(prev => ({ ...prev, lower_limit: newFactorData.upper_limit }));
    //         }
    //     }
    //     if (newFactorData?.infiniteValueUp && newFactorData?.lower_limit && !newFactorData?.infiniteValueDown) {
    //         setNewFactorData(prev => ({ ...prev, upper_limit: newFactorData.lower_limit }));
    //     }
    // }, [newFactorData?.infiniteValueUp, newFactorData?.infiniteValueDown, newFactorData?.lower_limit, newFactorData?.upper_limit]);

    return (
        <section>
            <TopSection tab={tab} setTab={setTab} search={search} setSearch={setSearch} />
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container mx-0 py-3">
                    {/* point factor table */}
                    <PointFactorsTable
                        tableColumns={mainColumns}
                        tableName="PointFactorsTable"
                        tableData={mainTableData}
                        isLoading={isFetching}
                        refetch={refetch}
                        onPageChange={onPageChange}
                    />

                    {
                        auth?.isHasRolePermission(1) && <AddNewSectionCointainer>
                            <p>Add more item ?</p>
                            <AddButton disabled onClick={handleAddNewItemModal}>Add new items</AddButton>
                        </AddNewSectionCointainer>
                    }




                    {/* Add new factor item Modal */}
                    <AddNewItemsModal
                        handleChange={handleChange}
                        open={addNewItemModalOpen}
                        newFactorData={newFactorData}
                        setNewFactorData={setNewFactorData}
                        closeModal={handleAddNewItemModal}
                        handleFactorsAdded={handleFactorsAdded}
                        // newPolicyInputData={newPolicyInputData}
                        newFactorDataValidation={newFactorDataValidation}
                        isLoadingAddPmFactors={
                            isLoadingAddPmFactors
                        }
                        activeFactorFields={activeFactorFields}
                    />
                </div>
            </div>
        </section>

    );
};

export default PointFactors;