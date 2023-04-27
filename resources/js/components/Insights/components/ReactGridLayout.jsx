
import { Responsive, WidthProvider } from "react-grid-layout";
import ReactGridLayoutItem from './ReactGridLayoutItem';
import React from "react";
import ConversionGraph from "./Graph/Conversion";
import StackedBarChart from "./Graph/StackedBarChart";
import convertNumberToUnits from "../utils/convertNumberToUnits";
import VerticalGraph from "./Graph/VerticalGraph";
import ScoreCardGraph from "./Graph/ScorecardGraph";


const ResponsiveGridLayout = WidthProvider(Responsive);


const Layout = [
    {i: 'conversion_graph', x: 0, y: 0, w: 6, h: 10, minW: 3, minH: 8},
    {i: 'b', x: 6, y: 0, w: 6, h: 10, minW: 3, minH: 8},
    {i: 'c', x: 0, y: 0, w: 4, h: 10, minW: 3, minH: 8},
    {i: 'd', x: 4, y: 2, w: 4, h: 10, minW: 3, minH: 8},
    {i: 'e', x: 8, y: 2, w: 4, h: 10, minW: 3, minH: 8},
    {i: 'f', x: 0, y: 3, w: 6, h: 10, minW: 3, minH: 8},
    {i: 'g', x: 6, y: 4, w: 3, h: 10, minW: 3, minH: 8},
    {i: 'h', x: 10, y: 4, w: 3, h: 10, minW: 3, minH: 8},
]


// convert to unit
const numberToUnits = (value,decimal= 1) => {
    let c = convertNumberToUnits(value, decimal)
    return `$${c}`
}



// change dropover to blue

const ReactGridLayout = () => {
    // const [isDragging, setIsDragging] = React.useState(false);



    return(
        <React.Fragment>
            <ResponsiveGridLayout 
                className="layout" 
                layouts={{  lg: Layout,  }} 
                useCSSTransforms={true}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                rowHeight={30}
                compactType= "vertical" 
                autoSize={true}
                isDraggable={true}
                // onDrag={(layout, oldItem, newItem, placeholder, e, element) => {
                //    // if item drop on delete_zone
                //     const dom = document.getElementById("delete_zone");
                //     const rect = dom.getBoundingClientRect();
                //     const x = e.clientX;
                //     const y = e.clientY;
                //     if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
                //        newItem.minH = 1;
                //        newItem.maxH = 3;
                //        newItem.h= newItem.h /2;
                //     }
                // }} 
                resizeHandle = {
                    <span className="react-resizable-handle react-resizable-handle-se" /> 
                }
            >
                <ReactGridLayoutItem 
                    key="conversion_graph"
                    title="Deal Conversion"  
                > 
                    <ConversionGraph />
                </ReactGridLayoutItem>

                <ReactGridLayoutItem 
                    key="b" 
                    title="New deal performance report" 
                > 
                    <StackedBarChart
                        XAxisLabel="name"
                        leftSideLabel="Number of deals"
                        barDataKey={["open", "won"]}
                        data = {[ 
                            { name: 'Apr 2023', open: 250, won: 50},
                            { name: 'Mar 2023', open: 139, won: 21 },
                            { name: 'Mar 2023', open: 119, won: 21 },
                        ]} 
                    />
                </ReactGridLayoutItem>
                <ReactGridLayoutItem key="c" title="Deals won over time">
                    <StackedBarChart
                         XAxisLabel="name"
                        leftSideLabel="Deal Value"
                        barDataKey={["development_night"]}
                        offset={-5}
                        labelListFormatter={value => numberToUnits(value, 1)}
                        yAxisTickFormate={value => numberToUnits(value, 1)}
                        data = {[ 
                            { name: 'Apr 2023', 'development_night': 7900},
                        ]} 
                    />
                </ReactGridLayoutItem>

                <ReactGridLayoutItem key="d" title="Deal progress">
                    <StackedBarChart
                        XAxisLabel="name"
                        leftSideLabel="Number of deals"
                        barDataKey={["contact_made", "qualified", "requirements_defined", 'proposal_made', 'negotiations_start']}
                        data = {[ 
                            { name: 'Apr 2023', 'contact_made': 50, 'qualified': 30, 'requirements_defined': 80, 'proposal_made': 240, 'negotiations_start': 180},
                        ]} 
                    />
                </ReactGridLayoutItem>
                <ReactGridLayoutItem key="e" title="Leads created by users">
                    <VerticalGraph
                        XAxisLabel="name"
                        leftSideLabel="Number of leads"
                        barDataKey={["manually_created"]}
                        offset={-7}
                        data = {[ 
                            { name: 'Billba Mergu', 'manually_created': 2},
                            { name: 'Abu Sayeed', "manually_created": 1 },
                        ]} 
                    />
                </ReactGridLayoutItem>
            
                <ReactGridLayoutItem key="f" title="New deal performance report">
                    <StackedBarChart
                        XAxisLabel="name"
                        leftSideLabel="Number of deals"
                        barDataKey={["open", "won"]}
                        offset={-5}
                        labelListFormatter={value => numberToUnits(value, 0)}
                        yAxisTickFormate={value => numberToUnits(value, 0)}
                        data = {[ 
                            { name: 'Jan', open: 0, won: 0},
                            { name: 'Feb', open: 0, won: 0 },
                            { name: 'Mar', open: 0, won: 0 },
                            { name: 'Apr', open: 119, won: 100 },
                            { name: 'May', open: 119, won: 100 },
                            { name: 'Jun', open: 119, won: 100 },
                            { name: 'Jul', open: 119, won: 100 },
                            { name: 'Aug', open: 119, won: 100 },
                            { name: 'Sep', open: 119, won: 100 },
                            { name: 'Oct', open: 119, won: 100 },
                            { name: 'Nov', open: 119, won: 100 },
                            { name: 'Dec', open: 119, won: 100 },
                        ]} 
                    />
                </ReactGridLayoutItem>
                
                <ReactGridLayoutItem key="g" title="New deal performance report">
                    <ScoreCardGraph value={350} profit={50} profitStatus="up" label="Average deal value" />
                </ReactGridLayoutItem>
                
                 
                <ReactGridLayoutItem key="h" title="New overall conversion report">
                    <StackedBarChart
                        XAxisLabel="name"
                        stackOffset="sign"
                        leftSideLabel="Number of deals"
                        barDataKey={[ "won", "loss"]}
                        colors={["#01A003", "#F02A02"]}
                        offset={-5}
                        yDomain={[-100, 100]}
                        labelListFormatter={value => `${value}%`}
                        data = {[ 
                            { name: 'Apr 2023', won: 80, loss: -30},
                        ]} 
                    />
                </ReactGridLayoutItem>
            </ResponsiveGridLayout>


            {/* <div className="cnx__delete_drop_zone active" id="delete_zone">
                Delete
            </div> */}
        </React.Fragment>
    )
}

export default ReactGridLayout;


