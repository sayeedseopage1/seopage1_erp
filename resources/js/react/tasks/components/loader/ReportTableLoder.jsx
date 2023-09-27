import _ from "lodash";
import { Placeholder } from "../../../global/Placeholder";

export default function ReportTableLoder(){
    return(
        _.times(5, item => (
            <tr key={item} className="sp1_tasks_tr" > 
                <td className="sp1_tasks_td">
                    <Placeholder width="50px" height="14px" className="mb-1"/> 
                </td>

                <td className="sp1_tasks_td d-flex align-items-center">
                    <Placeholder width="24px" height="24px" type="circle" className="mb-1 mr-2"/>
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 

                <td className="sp1_tasks_td d-flex align-items-center">
                    <Placeholder width="24px" height="24px" type="circle" className="mb-1 mr-2"/>
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td>  
                  
                <td className="sp1_tasks_td">
                    <Placeholder width="100%" height="13px" className="mb-1"/>
                    <Placeholder width="60%" height="13px" className="mb-1"/>
                </td> 

                <td className="sp1_tasks_td">
                    <Placeholder width="100%" height="13px" className="mb-1"/>
                    <Placeholder width="100%" height="13px" className="mb-1"/>
                    <Placeholder width="40%" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1"/> 
                </td>  

                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="20px" className="mb-1"/> 
                </td>
                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="20px" className="mb-1"/> 
                </td>
            </tr>
        ))
    )
}