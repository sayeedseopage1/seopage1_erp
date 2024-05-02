import React from 'react';
import { heldAmountsData, heldAmountsDataTableHeaders } from '../../constants';

const HeldAmountsTable = () => {
    return (
        <div className='held_amount_table_wrapper'>
            <table className="held_amount_table">
                <thead>
                    <tr>
                        {
                            heldAmountsDataTableHeaders?.map(item => <th key={item?.key}>
                                {item?.label}
                                <div>{item?.description && `(${item?.description})`}</div>
                            </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        heldAmountsData?.map((item, ind) => <tr key={ind}>
                            <td>{item?.month}</td>
                            <td>
                                {item?.title}
                                <div>(For the month of {item?.month})</div>
                            </td>
                            <td>{item?.total_amount}</td>
                            <td>{item?.disbursed_amount}</td>
                            <td>{item?.held_amount}</td>
                            <td>{item?.held_amount_balance}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default HeldAmountsTable;

// table table-striped table-bordered table-hover 