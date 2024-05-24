import React from 'react';
import { quarterlyAndYearlyTableData, quarterlyAndYearlyTableHeaders } from '../../../constants/index';
// import {} from '../../../constants/index'

const QuarterlyAndYearlyTable = ({ period }) => {
    return (
        <div className='held_amount_table_wrapper'>
            <table className="held_amount_table">
                <thead>
                    <tr>
                        {
                            quarterlyAndYearlyTableHeaders?.map(item => <th key={item?.key}>
                                {item?.label}
                            </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        quarterlyAndYearlyTableData?.slice(0, period).map((item, ind) => <tr key={ind}>
                            <td>{item?.month}</td>
                            <td>
                                {item?.regularPoints}
                            </td>
                            <td>{item?.actualPoints}</td>
                            <td>{item?.upsaleCrossSalePoints}</td>
                            <td>{item?.bonusPoints}</td>
                            <td>{item?.incentiveAmount}</td>
                            <td>{item?.cumulativeIncentiveAmount}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default QuarterlyAndYearlyTable;