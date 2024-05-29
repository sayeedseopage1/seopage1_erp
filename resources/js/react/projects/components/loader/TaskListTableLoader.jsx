import PropTypes from "prop-types";
import { Placeholder } from "../../../global/Placeholder";

export default function TaskListTableLoader({ prevItemLength = 7, tableCol }) {
    const updateItemLength = prevItemLength === 0 ? 7 : prevItemLength;
    return _.times(updateItemLength, (item) => (
        <tr key={item} className="sp1_tasks_tr">
            <td className="sp1_tasks_td pl-2">
                <Placeholder width="50px" height="13px" className="mb-1" />
            </td>
            {tableCol.slice(0, tableCol?.length - 1).map((placeholder) => {
                return (
                    <td key={placeholder} className="sp1_tasks_td">
                        <div className="d-flex align-items-center justify-content-center">
                            <Placeholder
                                width="80px"
                                height="13px"
                                className="mb-1"
                            />
                        </div>
                    </td>
                );
            })}
        </tr>
    ));
}

TaskListTableLoader.propTypes = {
    prevItemLength: PropTypes.number,
    tableCol: PropTypes.array,
};
