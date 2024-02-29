import { Placeholder } from "../../../global/Placeholder";

export default function GoalExtensionHistoryTableLoader({prevItemLength = 7, tableCol}){
    const updateItemLength = prevItemLength === 0 ? 7 : prevItemLength;
    return(
        _.times(updateItemLength , item => (
            <tr key={item} className="sp1_tasks_tr" > 
                <td className="sp1_tasks_td">
                    <Placeholder width="50px" height="13px" className="mb-1"/>
                </td> 
                {
                    tableCol.slice(0, tableCol?.length - 1).map((_, index) => {
                        return (
                            <td key={index} className="sp1_tasks_td">
                                <Placeholder width="80px" height="13px" className="mb-1"/>
                            </td>
                        )
                    })
                }
            </tr>
        ))
    )
}