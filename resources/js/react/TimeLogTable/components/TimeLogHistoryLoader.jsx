import React from 'react'
import { Placeholder } from "../../global/Placeholder";
import _ from "lodash";

const PersonLoader = () => {
    return(
        <div
            className="d-flex align-items-center"
            style={{ gap: "10px" }}
        >
            <Placeholder
                className="sp1-item-center border rounded-circle"
                width="36px"
                height="36px"
            />

            <div className="">
                <h6 className="mb-2 f-14">
                    <Placeholder width="130px" />
                </h6>
                <span className="f-12 text-hover-underline">
                    <Placeholder height="10px" width="80px" />
                </span>
            </div>
        </div>
    )
}


const TimeLogHistoryLoader = () => {
  return (
    <React.Fragment>
        {_.times(10, i =>(
            <tr key={i} className="sp1_tlr_tr">
            <td className="sp1_tlr_td"> <PersonLoader width="180px"/> </td> 
            <td className="sp1_tlr_td"> <Placeholder width='180px' /> </td>
            <td className="sp1_tlr_td"> <Placeholder width='180px'/> </td> 
            <td className="sp1_tlr_td"> <Placeholder width='180px'/> </td> 
            <td className="sp1_tlr_td"> <Placeholder width='50px'/> </td> 
        </tr>
        ))}
    </React.Fragment>
  )
}


export default TimeLogHistoryLoader;
