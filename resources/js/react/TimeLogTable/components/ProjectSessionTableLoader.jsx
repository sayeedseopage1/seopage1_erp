import React from "react";
import { Placeholder } from "../../global/Placeholder";
import _ from "lodash";




const ProjectWiseTimeLogTableSessionLoader = ({}) => {
    return (
        <React.Fragment>
            <tr className="sp1_tlr_tr">
                <td className="sp1_tlr_td" rowSpan={3}> 
                    <Placeholder width="250px" className="mb-2"/>
                    <Placeholder width="150px" />
                </td>
                <td className="sp1_tlr_td" rowSpan={3}> 
                    <Placeholder width="100%" className="mb-2"/>
                    <Placeholder width="100%" className="mb-2"/>
                    <Placeholder width="50%" />
                </td> 
                <td className="sp1_tlr_td" > <Placeholder width="150px"/> </td>
                <td className="sp1_tlr_td" > 
                    <Placeholder width="150px" className="mb-2"/> 
                    <Placeholder width="100px"/>
                </td>
                
                <td className="sp1_tlr_td" > 
                    <Placeholder width="150px" className="mb-2"/> 
                    <Placeholder width="100px"/>
                </td>

                <td className="sp1_tlr_td" > <Placeholder width="100px"/> </td>
            </tr>

            {_.times(2, index =>(
                <tr key={index} className="sp1_tlr_tr"> 
                <td className="sp1_tlr_td" > <Placeholder width="150px"/> </td>
                <td className="sp1_tlr_td" > 
                    <Placeholder width="150px" className="mb-2"/> 
                    <Placeholder width="100px"/>
                </td>
                
                <td className="sp1_tlr_td" > 
                    <Placeholder width="150px" className="mb-2"/> 
                    <Placeholder width="100px"/>
                </td>

                <td className="sp1_tlr_td" > <Placeholder width="100px"/> </td>
                </tr>
            ))}

            {_.times(2, index =>(
                <tr key={index} className="sp1_tlr_tr">
                    <td className="sp1_tlr_td"> 
                            <Placeholder width="250px" className="mb-2"/>
                            <Placeholder width="150px" />
                        </td>
                        <td className="sp1_tlr_td"> 
                            <Placeholder width="100%" className="mb-2"/>
                            <Placeholder width="100%" className="mb-2"/>
                            <Placeholder width="50%" />
                        </td> 
                        <td className="sp1_tlr_td" > <Placeholder width="150px"/> </td>
                        <td className="sp1_tlr_td" > 
                            <Placeholder width="150px" className="mb-2"/> 
                            <Placeholder width="100px"/>
                        </td>
                        
                        <td className="sp1_tlr_td" > 
                            <Placeholder width="150px" className="mb-2"/> 
                            <Placeholder width="100px"/>
                        </td>

                        <td className="sp1_tlr_td" > <Placeholder width="100px"/> </td>
                </tr>
            ))}

            <tr className="sp1_tlr_tr">
                <td className="sp1_tlr_td" rowSpan={2}> 
                    <Placeholder width="250px" className="mb-2"/>
                    <Placeholder width="150px" />
                </td>
                <td className="sp1_tlr_td" rowSpan={2}> 
                    <Placeholder width="100%" className="mb-2"/>
                    <Placeholder width="100%" className="mb-2"/>
                    <Placeholder width="50%" />
                </td> 
                <td className="sp1_tlr_td" > <Placeholder width="150px"/> </td>
                <td className="sp1_tlr_td" > 
                    <Placeholder width="150px" className="mb-2"/> 
                    <Placeholder width="100px"/>
                </td>
                
                <td className="sp1_tlr_td" > 
                    <Placeholder width="150px" className="mb-2"/> 
                    <Placeholder width="100px"/>
                </td>

                <td className="sp1_tlr_td" > <Placeholder width="100px"/> </td>
            </tr>

            {_.times(1, index =>(
                <tr key={index} className="sp1_tlr_tr"> 
                <td className="sp1_tlr_td" > <Placeholder width="150px"/> </td>
                <td className="sp1_tlr_td" > 
                    <Placeholder width="150px" className="mb-2"/> 
                    <Placeholder width="100px"/>
                </td>
                
                <td className="sp1_tlr_td" > 
                    <Placeholder width="150px" className="mb-2"/> 
                    <Placeholder width="100px"/>
                </td>

                <td className="sp1_tlr_td" > <Placeholder width="100px"/> </td>
                </tr>
            ))}

            {_.times(3, index =>(
                <tr key={index} className="sp1_tlr_tr">
                     <td className="sp1_tlr_td"> 
                            <Placeholder width="250px" className="mb-2"/>
                            <Placeholder width="150px" />
                        </td>
                        <td className="sp1_tlr_td"> 
                            <Placeholder width="100%" className="mb-2"/>
                            <Placeholder width="100%" className="mb-2"/>
                            <Placeholder width="50%" />
                        </td> 
                        <td className="sp1_tlr_td" > <Placeholder width="150px"/> </td>
                        <td className="sp1_tlr_td" > 
                            <Placeholder width="150px" className="mb-2"/> 
                            <Placeholder width="100px"/>
                        </td>
                        
                        <td className="sp1_tlr_td" > 
                            <Placeholder width="150px" className="mb-2"/> 
                            <Placeholder width="100px"/>
                        </td>

                        <td className="sp1_tlr_td" > <Placeholder width="100px"/> </td>
                </tr>
            ))}
        </React.Fragment>
    );
};

export default ProjectWiseTimeLogTableSessionLoader;
