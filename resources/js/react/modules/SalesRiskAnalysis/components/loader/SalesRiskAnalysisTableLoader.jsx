import _ from "lodash";
import { Placeholder } from "../../../../global/Placeholder";


export default function SalesRiskAnalysisTableLoader({prevItemLength = 5,tableCol}){
    const updateItemLength = prevItemLength === 0 ? 5 : prevItemLength;
    return(
        _.times(updateItemLength, item => (
            <tr key={item} className="sp1_tasks_tr" > 
                <td className="sp1_tasks_td pl-2">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td">
                    <div className="d-flex justify-content-center align-items-center">
                     <Placeholder width="80px" height="13px" className="mb-1"/>
                    </div>
                </td> 
                <td className="sp1_tasks_td">
                    <div className="d-flex justify-content-center flex-column align-items-center">
                        <Placeholder width="80px" height="13px" className="my-3"/>
                        <Placeholder width="80px" height="13px" className="my-3"/>
                        <Placeholder width="80px" height="13px" className="my-3"/>
                    </div>
                </td>  
                <td className="sp1_tasks_td pr-3">
                    <div className="d-flex justify-content-end flex-column align-items-end">
                        <Placeholder width="80px" height="13px" className="my-3"/>
                        <Placeholder width="80px" height="13px" className="my-3"/>
                        <Placeholder width="80px" height="13px" className="my-3"/>
                    </div>
                </td>  
            </tr>
        ))
    )
}