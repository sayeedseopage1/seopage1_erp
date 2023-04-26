
import { Responsive, WidthProvider } from "react-grid-layout";
import ReactGridLayoutItem from './ReactGridLayoutItem';
import React from "react";
import ConversionGraph from "./Graph/Conversion";
import StackedBarChart from "./Graph/StackedBarChart";


const ResponsiveGridLayout = WidthProvider(Responsive);


const Layout = [
    {i: 'conversion_graph', x: 0, y: 0, w: 6, h: 8, minW: 3, minH: 8},
    {i: 'b', x: 6, y: 0, w: 6, h: 8, minW: 3, minH: 8},
    {i: 'c', x: 0, y: 0, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'd', x: 0, y: 2, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'e', x: 4, y: 2, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'f', x: 8, y: 2, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'g', x: 0, y: 4, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'h', x: 4, y: 4, w: 4, h: 8, minW: 3, minH: 8},
]


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
                        data = {[ 
                            { name: 'Apr 2023', 'development_night': 8},
                        ]} 
                    />
                </ReactGridLayoutItem>

                {/* <ReactGridLayoutItem key="d" title="Deals won over time">
                    <StackedBarChart
                        XAxisLabel="name"
                        leftSideLabel="Deal Value"
                        barDataKey={["development_night"]}
                        data = {[ 
                            { name: 'Apr 2023', 'development_night': '$8.0K'},
                        ]} 
                    />
                </ReactGridLayoutItem>
               <ReactGridLayoutItem key="e" title="New deal performance report">
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

                <ReactGridLayoutItem key="f" title="New deal performance report">
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

                <ReactGridLayoutItem key="g" title="New deal performance report">
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
                
                 
                <ReactGridLayoutItem key="h" title="New deal performance report">
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
                </ReactGridLayoutItem> */}
            </ResponsiveGridLayout>


            {/* <div className="cnx__delete_drop_zone active" id="delete_zone">
                Delete
            </div> */}
        </React.Fragment>
    )
}

export default ReactGridLayout;


