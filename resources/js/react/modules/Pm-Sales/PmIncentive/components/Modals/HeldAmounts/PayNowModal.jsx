import React, { useState } from 'react';
import { Modal, Select, Table } from 'antd';
import { ButtonComponent } from '../../../../PointFactors/components/Styles/ui/ui';
import amountIcon from '../../../assets/amount.svg';
import Swal from 'sweetalert2';

const { Option } = Select;  // Ensure to import Option from antd

const payNowData = [
    {
        _id: '1',
        month: 'January',
        year: '2022',
        held_amount: '4000',
        status: 'Pending',
    },
    {
        _id: '2',
        month: 'February',
        year: '2022',
        held_amount: '4000',
        status: 'Pending',
    },
    {
        _id: '3',
        month: 'March',
        year: '2022',
        held_amount: '4000',
        status: 'Pending',
    },
    {
        _id: '4',
        month: 'April',
        year: '2022',
        held_amount: '4000',
        status: 'Pending',
    },
    {
        _id: '5',
        month: 'May',
        year: '2022',
        held_amount: '4000',
        status: 'Pending',
    },
    {
        _id: '6',
        month: 'June',
        year: '2022',
        held_amount: '4000',
        status: 'Pending',
    },
    {
        _id: '7',
        month: 'July',
        year: '2022',
        held_amount: '4000',
        status: 'Pending',
    },
    {
        _id: '8',
        month: 'January',
        year: '2023',
        held_amount: '1600',
        status: 'paid',
    },
    {
        _id: '9',
        month: 'February',
        year: '2023',
        held_amount: '900',
        status: 'Pending',
    },
    {
        _id: '10',
        month: 'January',
        year: '2024',
        held_amount: '1900',
        status: 'paid',
    },
]

const held_years = [
    {
        _id: '1',
        year: '2022',
        isCleared: 'Paid',
    },
    {
        _id: '2',
        year: '2023',
        status: 'Pending',
    },
    {
        _id: '3',
        year: '2024',
        status: 'Paid',
    },
]


const PayNowModal = ({ antdModalOpen, showPayNowModal }) => {
    const initialYear = held_years.find(item => item.status === 'Pending')?.year || held_years[0]?.year;
    const [defaultHeldYear, setDefaultHeldYear] = useState(initialYear);
    const [modifiedData, setModifiedData] = useState([...payNowData].filter(item => item.year === initialYear));
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [totalHeldAmount, setTotalHeldAmount] = useState(0);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setTotalHeldAmount(selectedRows.reduce((prev, curr) => prev + Number(curr.held_amount), 0));
        },
    };

    const handleHeldYearChange = (value) => {
        setDefaultHeldYear(value);
        const newModifiedData = [...payNowData].filter(item => item.year === value);
        setModifiedData(newModifiedData);
        // Reset selections
        setSelectedRowKeys([]);
        setTotalHeldAmount(0);
    }

    const columns = [
        Table.SELECTION_COLUMN,
        {
            title: (
                <div className='held_years_header'>
                    <span>Year</span>
                    <Select
                        onChange={handleHeldYearChange}
                        className='held_years_select'
                        value={defaultHeldYear}
                        style={{ width: 120 }}>
                        {held_years?.map(item => (
                            <Option value={item.year} key={item._id}>{item.year}</Option>
                        ))}
                    </Select>
                </div>
            ),
            dataIndex: "month",
            key: "month",
            render: (text) => <p className='held_amount_table_data'>{text}</p>,
        },
        {
            title: (
                <div className='held_years_header' style={{ textAlign: 'center' }}>
                    <span>Held Amount</span>
                </div>
            ),
            dataIndex: "held_amount",
            key: "held_amount",
            render: (text) => <p className='held_amount_table_data' style={{ textAlign: 'center' }}>{text}</p>,
        },
    ];

    const handlePay = () => {
        Swal.fire({
            html: `
            ${selectedRowKeys.length < modifiedData.length ? `                
                    <p class="incentive_swal_confirm">Confirmation</p>
                    <p class="incentive_swal_desc">You've selected ${selectedRowKeys.length} ${selectedRowKeys?.length === 1 ? 'month' : 'months'} out of ${modifiedData?.length} ${modifiedData?.length === 1 ? 'month' : 'months'}. <br>
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
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Successfully Paid!",
                    text: "Held incentives have been disbursed.",
                    icon: "success"
                });
            }
        });
    }


    const handleCancel = () => {
        // Reset selections and call the function to close the modal
        setSelectedRowKeys([]);
        setTotalHeldAmount(0);
        showPayNowModal();  // Assuming this function toggles the modal's visibility
    }

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
                    dataSource={modifiedData}
                    rowKey="_id"
                    pagination={false}
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
