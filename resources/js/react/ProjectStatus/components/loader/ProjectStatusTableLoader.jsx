import _ from "lodash";
import { Placeholder } from "../../../global/Placeholder";

export default function ProjectStatusTableLoader(){
    return(
        _.times(10, item => (
            <tr key={item} className="sp1_tasks_tr" > 
                 <td className="sp1_tasks_td">
                    <Placeholder width="50px" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td">
                    <div className="d-flex align-items-center">
                        <Placeholder width="24px" height="24px" type="circle" className="mb-0"/>
                        <Placeholder width="80px" height="13px" className="ml-1"/>
                    </div>
                </td>
                <td className="sp1_tasks_td">
                    <div className="d-flex align-items-center">
                        <Placeholder width="24px" height="24px" type="circle" className="mb-0"/>
                        <Placeholder width="80px" height="13px" className=" ml-1"/>
                    </div> 
                </td>

                <td className="sp1_tasks_td">
                <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 

                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 

                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
            </tr>
        ))
    )
}