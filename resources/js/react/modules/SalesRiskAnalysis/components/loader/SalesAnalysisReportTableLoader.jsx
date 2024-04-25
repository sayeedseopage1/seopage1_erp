import _ from "lodash";
import { Placeholder } from "../../../../global/Placeholder";
import { useAuth } from "../../../../hooks/useAuth";

export default function SalesAnalysisReportTableLoader({ prevItemLength = 7 }) {
    const auth = useAuth();
    const updateItemLength = prevItemLength === 0 ? 7 : prevItemLength;
    return _.times(updateItemLength, (item) => (
        <tr key={item} className="sp1_tasks_tr">
            <td className="sp1_tasks_td">
                <Placeholder width="50px" height="13px" className="mb-1" />
            </td>
            <td className="sp1_tasks_td">
                <div className="d-flex align-items-center">
                    <Placeholder
                        width="30px"
                        height="30px"
                        type="circle"
                        className="mb-0"
                    />
                    <Placeholder width="80px" height="13px" className="ml-1" />
                </div>
            </td>
            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>

            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>

            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>

            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>
            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>

            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>
            {auth.getRoleId() === 1 && (
                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1" />
                </td>
            )}
            <td className="sp1_tasks_td">
                <div className="d-flex align-items-center">
                    <Placeholder
                        width="30px"
                        height="30px"
                        type="circle"
                        className="mb-0"
                    />
                    <Placeholder width="80px" height="13px" className="ml-1" />
                </div>
            </td>
            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>
            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>
            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>
        </tr>
    ));
}
