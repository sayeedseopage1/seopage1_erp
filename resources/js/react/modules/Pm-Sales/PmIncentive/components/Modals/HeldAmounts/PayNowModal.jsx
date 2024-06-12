import React, { useEffect, useState } from 'react';
import { DatePicker, Modal, Select, Table } from 'antd';
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import amountIcon from '../../../assets/amount.svg';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types'
import { useGetIncentiveHeldAmountQuery, usePayIncentiveHeldAmountMutation } from '../../../../../../services/api/Pm-Sales/PmIncentiveApiSlice';
import dayjs from 'dayjs';
import moment from 'moment/moment';
import { FaAngleDown } from "react-icons/fa6";
import { auth } from '../../../constants';


const PayNowModal = ({ antdModalOpen, showPayNowModal, queryForIncentiveHeldAmounts, queryStringForIncentiveHeldAmounts, tab }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const user_id = queryForIncentiveHeldAmounts?.user_id

    useEffect(() => {
        const thisYear = new Date().getFullYear();
        setStartDate(`${thisYear}-01-01`);
        setEndDate(`${thisYear}-12-31`);
    }, [])

    const onChange = (_date, dateString) => {
        setStartDate(`${dateString}-01-01`);
        setEndDate(`${dateString}-12-31`);
    };


    const { data: incentiveHeldAmounts, isLoading: incentiveHeldAmountsLoading, isFetching: incentiveHeldAmountsIsFetching } = useGetIncentiveHeldAmountQuery(
        queryStringForIncentiveHeldAmounts({
            ...queryForIncentiveHeldAmounts,
            start_date: startDate,
            end_date: endDate,
        }),
        { skip: tab != "held_amount" || !startDate || !endDate }
    )

    const [payIncentiveHeldAmount, { isLoading: isPayIncentiveHeldAmountLoading }] = usePayIncentiveHeldAmountMutation()

    const incentiveHeldAmountData = incentiveHeldAmounts && [...incentiveHeldAmounts?.data].reverse()

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [totalHeldAmount, setTotalHeldAmount] = useState(0);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setTotalHeldAmount(selectedRows.reduce((prev, curr) => prev + Number(curr?.held_amount), 0));
        },
        getCheckboxProps: (record) => ({
            disabled: record?.status == 2, // Disable row selection if status is 2
        }),
    };

    const rowClassName = (record) => {
        return record.status === 2 ? 'disabled-row' : '';
    };

    const columns = [
        Table.SELECTION_COLUMN,
        {
            title: (
                <div className='held_years_header'>
                    <span style={{ marginRight: '5px' }}>Year</span>
                    <DatePicker
                        className='held_years_select'
                        variant="borderless"
                        defaultValue={dayjs()}
                        onChange={onChange}
                        picker="year"
                        suffixIcon={<FaAngleDown />}
                        allowClear={false}
                    />
                </div>
            ),
            dataIndex: "date",
            key: "date",
            render: (text) => <p className='held_amount_table_data'>{moment(text).format("MMMM")}</p>,
        },
        {
            title: (
                <div className='held_years_header' style={{ textAlign: 'center' }}>
                    <span>Held Amount</span>
                </div>
            ),
            dataIndex: "held_amount",
            key: "held_amount",
            render: (text) => <p className='held_amount_table_data' style={{ textAlign: 'center' }}>{parseFloat(text)}</p>,
        },
        // {
        //     title: (
        //         <div className='held_years_header' style={{ textAlign: 'center' }}>
        //             <span>Status</span>
        //         </div>
        //     ),
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (_, record) => (
        //         <div>
        //             {
        //                 record?.status === 2 ? <button className='incentive_success_btn'>Paid</button> : <button className='incentive_danger_btn'>Pending</button>
        //             }
        //         </div>
        //     ),
        //     width: '230px',
        //     align: 'center',
        //     hidden: auth?.isHasRolePermission(1) ? false : true
        // }
    ];

    // const handlePay = () => {
    //     Swal.fire({
    //         html: `
    //         ${selectedRowKeys.length < incentiveHeldAmountData?.length ? `                
    //                 <p class="incentive_swal_confirm">Confirmation</p>
    //                 <p class="incentive_swal_desc">You've selected ${selectedRowKeys.length} ${selectedRowKeys?.length === 1 ? 'month' : 'months'} out of ${incentiveHeldAmountData?.length} ${incentiveHeldAmountData?.length === 1 ? 'month' : 'months'}. <br>
    //                 Do you still want to proceed?
    //                 </p>` :

    //                 `<p class="incentive_swal_confirm">Confirmation</p>
    //                 <p class="incentive_swal_desc">Do you want to proceed?</p>

    //             `
    //             }
    //         `,
    //         showCancelButton: true,
    //         confirmButtonText: "Confirm",
    //         cancelButtonText: "Do it later",
    //         customClass: {
    //             confirmButton: 'swal2-confirm-custom',
    //             cancelButton: 'swal2-cancel-custom'
    //         }
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             payIncentiveHeldAmount({ incentive_payment_ids: selectedRowKeys, user_id })
    //             // Swal.fire({
    //             //     title: "Successfully Paid!",
    //             //     text: "Held incentives have been disbursed.",
    //             //     icon: "success"
    //             // });
    //         }
    //     });
    // }

    const handlePay = async () => {
        try {
            const result = await Swal.fire({
                html: `
                ${selectedRowKeys.length < incentiveHeldAmountData?.filter(data => data?.status !== 2)?.length ? `                
                        <p class="incentive_swal_confirm">Confirmation</p>
                        <p class="incentive_swal_desc">You've selected ${selectedRowKeys.length} ${selectedRowKeys?.length === 1 ? 'month' : 'months'} out of ${incentiveHeldAmountData?.filter(data => data?.status !== 2)?.length} ${incentiveHeldAmountData?.filter(data => data?.status !== 2)?.length === 1 ? 'month' : 'months'}. <br>
                        Do you still want to proceed?
                        </p>` :

                        `<p class="incentive_swal_confirm">Confirmation</p>
                        <p class="incentive_swal_desc">Do you want to proceed?</p>
                   
                    `
                    }
                `,
                showCancelButton: true,
                confirmButtonText: "Confirm",
                cancelButtonText: "Do it later",
                customClass: {
                    confirmButton: 'swal2-confirm-custom',
                    cancelButton: 'swal2-cancel-custom'
                }
            });

            if (result.isConfirmed) {
                const response = await payIncentiveHeldAmount({ incentive_payment_ids: selectedRowKeys, user_id }).unwrap();
                if (response?.status === 200) {
                    showPayNowModal()
                    await Swal.fire({
                        title: "Successfully Paid!",
                        text: response?.data || "Held incentives have been disbursed.",
                        icon: "success"
                    });
                } else {
                    await Swal.fire({
                        title: "Failed!",
                        text: response?.data || "Something went wrong. Please try again later.",
                        icon: "warning"
                    });
                }

            }
        } catch (error) {
            console.error("Error paying incentives:", error);
            await Swal.fire({
                title: "Error",
                text: error?.message || "There was an error processing your request. Please try again later.",
                icon: "error"
            });
        }
    };



    const handleCancel = () => {
        // Reset selections and call the function to close the modal
        setSelectedRowKeys([]);
        setTotalHeldAmount(0);
        showPayNowModal();  // Assuming this function toggles the modal's visibility
    }

    // if (incentiveHeldAmountsLoading || incentiveHeldAmountsIsFetching) {
    //     return <p>Loading...</p>
    // }

    return (
        <Modal className='pay_now_modal'
            closable={false}
            maskClosable={false}
            title={
                <div className='pay_now_modal_header'>
                    <p className='pay_now_title'>Held Incentives Disbursement</p>
                    <div className='pay_now_balance_wrapper'>
                        <div className='pay_now_balance_title'>
                            <img src={amountIcon} alt="Amount Icon" />
                            <span>Amount :</span>
                        </div>
                        <p>{totalHeldAmount} taka</p>
                    </div>
                </div>
            }
            open={antdModalOpen}
            width={675}
            footer={null}
        >
            <div className='pay_now_modal_body'>
                <Table
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={incentiveHeldAmountData}
                    rowKey="id"
                    pagination={false}
                    rowClassName={rowClassName}
                />
            </div>
            <div className='pay_now_modal_footer'>
                <ButtonComponent disabled={selectedRowKeys.length < 1} onClick={handlePay} color='#1492E6' textColor='#fff' font='18px'>Pay</ButtonComponent>
                <ButtonComponent onClick={handleCancel} font='18px'>Cancel</ButtonComponent>
            </div>
        </Modal>
    );
};

export default PayNowModal;

PayNowModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    showPayNowModal: PropTypes.func
};
