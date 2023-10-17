import _ from "lodash";
import { Placeholder } from "../../../global/Placeholder";

export default function TaskTableLoader(){
    return(
        _.times(10, item => (
            <tr key={item} className="sp1_tasks_tr" > 
                <td className="sp1_tasks_td">
                    <Placeholder width="50px" height="14px" className="mb-1"/> 
                </td>

                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                    <Placeholder width="50px" height="13px" className="mb-1"/>
                </td>

                <td className="sp1_tasks_td">
                    <Placeholder width="24px" height="24px" type="circle" className="mb-2"/>
                </td> 

                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                    <Placeholder width="50px" height="13px" className="mb-1"/>
                </td> 

                <td className="sp1_tasks_td">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                    <Placeholder width="50px" height="13px" className="mb-1"/>
                </td> 

                <td className="sp1_tasks_td">
                    <Placeholder width="130px" height="13px" className="mb-1"/>
                    <Placeholder width="100px" height="13px" className="mb-1"/>
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
                    <Placeholder width="50px" height="13px" className="mb-1"/>
                    <Placeholder width="50px" height="13px" className="mb-1"/>
                </td> 

                <td className="sp1_tasks_td">
                    <Placeholder width="50px" height="13px" className="mb-1"/>
                    <Placeholder width="50px" height="13px" className="mb-1"/>
                </td>  

                <td className="sp1_tasks_td">
                    <Placeholder width="100px" height="13px" className="mb-1"/>
                    <Placeholder width="70px" height="13px" className="mb-1"/>
                </td>  

                <td className="sp1_tasks_td">
                    <Placeholder width="100px" height="13px" className="mb-1"/>
                    <Placeholder width="70px" height="13px" className="mb-1"/>
                </td> 
                
                <td className="sp1_tasks_td">
                    <Placeholder width="60px" height="13px" className="mb-1"/> 
                </td> 
                
                <td className="sp1_tasks_td">
                    <Placeholder width="100px" height="13px" className="mb-1"/> 
                </td> 
                
                <td className="sp1_tasks_td">
                    <Placeholder width="60px" height="13px" className="mb-1"/> 
                </td>
                
                <td className="sp1_tasks_td">
                    <Placeholder width="50px" height="13px" className="mb-1"/> 
                </td>
            </tr>
        ))
    )
}