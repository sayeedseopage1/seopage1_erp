import _ from "lodash";
import PropTypes from "prop-types";
import { Placeholder } from "../../../../global/Placeholder";


export default function QuestionsModalTableLoader({prevItemLength = 5,tableCol}){
    const updateItemLength = prevItemLength === 0 ? 5 : prevItemLength;
    return(
        _.times(updateItemLength, item => (
            <tr key={item} className="sp1_tasks_tr" > 
                <td className="sp1_tasks_td pl-2">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td pl-2">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td>  
                <td className="sp1_tasks_td pl-2">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td pl-2">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td pl-2">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
                <td className="sp1_tasks_td pl-2">
                    <Placeholder width="80px" height="13px" className="mb-1"/>
                </td> 
            </tr>
        ))
    )
}

QuestionsModalTableLoader.propTypes = {
    prevItemLength: PropTypes.number,
    tableCol: PropTypes.number
}