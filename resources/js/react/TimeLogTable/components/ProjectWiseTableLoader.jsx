import React from "react";
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

const ProjectWiseTimeLogTableLoader = ({}) => {
    return (
        <React.Fragment>
            <tr className="sp1_tlr_tr">
                <td className="sp1_tlr_td" rowSpan={3}> <Placeholder width="250px"/> </td>
                <td className="sp1_tlr_td" rowSpan={3}> <PersonLoader/> </td> 
                <td className="sp1_tlr_td" rowSpan={3}> <PersonLoader/> </td> 
                <td className="sp1_tlr_td" > <PersonLoader/> </td>
                <td className="sp1_tlr_td"> <Placeholder /> </td>
                <td className="sp1_tlr_td"> <Placeholder/> </td> 
            </tr>

            {_.times(2, index =>(
                <tr key={index} className="sp1_tlr_tr"> 
                    <td className="sp1_tlr_td" > <PersonLoader/> </td>
                    <td className="sp1_tlr_td"> <Placeholder /> </td>
                    <td className="sp1_tlr_td"> <Placeholder/> </td> 
                </tr>
            ))}

            {_.times(2, index =>(
                <tr key={index} className="sp1_tlr_tr">
                    <td className="sp1_tlr_td"> <Placeholder width="250px"/> </td>
                    <td className="sp1_tlr_td"> <PersonLoader/> </td> 
                    <td className="sp1_tlr_td"> <PersonLoader/> </td> 
                    <td className="sp1_tlr_td"> <PersonLoader/> </td>
                    <td className="sp1_tlr_td"> <Placeholder /> </td>
                    <td className="sp1_tlr_td"> <Placeholder/> </td> 
                </tr>
            ))}

            <tr className="sp1_tlr_tr">
                <td className="sp1_tlr_td" rowSpan={2}> <Placeholder width="250px"/> </td>
                <td className="sp1_tlr_td" rowSpan={2}> <PersonLoader/> </td> 
                <td className="sp1_tlr_td" rowSpan={2}> <PersonLoader/> </td> 
                <td className="sp1_tlr_td" > <PersonLoader/> </td>
                <td className="sp1_tlr_td"> <Placeholder /> </td>
                <td className="sp1_tlr_td"> <Placeholder/> </td> 
            </tr>

            {_.times(1, index =>(
                <tr key={index} className="sp1_tlr_tr"> 
                    <td className="sp1_tlr_td" > <PersonLoader/> </td>
                    <td className="sp1_tlr_td"> <Placeholder /> </td>
                    <td className="sp1_tlr_td"> <Placeholder/> </td> 
                </tr>
            ))}

            {_.times(3, index =>(
                <tr key={index} className="sp1_tlr_tr">
                    <td className="sp1_tlr_td"> <Placeholder width="250px"/> </td>
                    <td className="sp1_tlr_td"> <PersonLoader/> </td> 
                    <td className="sp1_tlr_td"> <PersonLoader/> </td> 
                    <td className="sp1_tlr_td"> <PersonLoader/> </td>
                    <td className="sp1_tlr_td"> <Placeholder /> </td>
                    <td className="sp1_tlr_td"> <Placeholder/> </td> 
                </tr>
            ))}
        </React.Fragment>
    );
};

export default ProjectWiseTimeLogTableLoader;
