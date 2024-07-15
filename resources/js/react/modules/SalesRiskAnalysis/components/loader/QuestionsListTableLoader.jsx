import _ from "lodash";
import PropTypes from "prop-types";
import { Placeholder } from "../../../../global/Placeholder";

export default function QuestionsListTableLoader({
    prevItemLength = 5,
    tableCol,
}) {
    const updateItemLength = prevItemLength === 0 ? 10 : prevItemLength;
    return _.times(updateItemLength, (item) => (
        <tr key={item} className="sp1_tasks_tr">
            <td className="sp1_tasks_td pl-2">
                <Placeholder width="50px" height="15px" className="mb-1" />
            </td>
            <td className="sp1_tasks_td pl-2">
                <Placeholder width="80px" height="15px" className="mb-1" />
            </td>
            <td className="sp1_tasks_td pl-2">
                <Placeholder width="80px" height="15px" className="mb-1" />
            </td>
            <td className="sp1_tasks_td pl-2">
                <Placeholder width="80px" height="15px" className="mb-1" />
            </td>
            <td className="sp1_tasks_td pl-2">
                <Placeholder width="80px" height="15px" className="mb-1" />
            </td>
            <td className="sp1_tasks_td pl-2">
                <div className="d-flex justify-content-end flex-column align-items-end">
                    <Placeholder width="80px" height="15px" className="mb-1" />
                </div>
            </td>
        </tr>
    ));
}

QuestionsListTableLoader.propTypes = {
    prevItemLength: PropTypes.number,
    tableCol: PropTypes.number,
};
