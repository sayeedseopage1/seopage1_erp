import { Placeholder } from "../../../global/Placeholder";
import { useAuth } from "../../../hooks/useAuth";

export default function PmGoalsTableLoader({ prevItemLength = 7 }) {
    const auth = useAuth();
    const updateItemLength = prevItemLength === 0 ? 7 : prevItemLength;
    return _.times(updateItemLength, (item) => (
        <tr key={item} className="sp1_tasks_tr">
            <td className="sp1_tasks_td">
                <Placeholder width="50px" height="13px" className="mb-1" />
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
            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>
            <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1" />
            </td>
            {[1, 4]?.includes(auth?.getRoleId()) && (
                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1" />
                </td>
            )}
        </tr>
    ));
}
