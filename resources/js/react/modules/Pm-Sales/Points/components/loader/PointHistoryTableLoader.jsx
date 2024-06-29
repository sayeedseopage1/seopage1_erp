import _ from "lodash";
import PropTypes from "prop-types";
import { Placeholder } from "../../../../../global/Placeholder";


export default function PointHistoryTableLoader({ prevItemLength = 10, tableCol }) {
    const updateItemLength = prevItemLength === 0 ? 3 : prevItemLength;
    return (
        _.times(updateItemLength, item => (
            <tr key={item} className="sp1_tasks_tr" >
                {
                    Array(tableCol).fill(0).map((item, index) => (
                        <td key={index} className="sp1_tasks_td py-3">
                            <Placeholder width="80px" height="13px" className="mb-1" />
                        </td>
                    ))
                }
            </tr>
        ))
    )
}

PointHistoryTableLoader.propTypes = {
    prevItemLength: PropTypes.number,
    tableCol: PropTypes.number
}