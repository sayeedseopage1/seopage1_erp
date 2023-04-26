
import { Responsive, WidthProvider } from "react-grid-layout";
import ReactGridLayoutItem from './ReactGridLayoutItem';
import React from "react";


const ResponsiveGridLayout = WidthProvider(Responsive);


const Layout = [
    {i: 'a', x: 0, y: 0, w: 4, h: 8, minW: 3, minH: 8 , static: true},
    {i: 'b', x: 4, y: 0, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'c', x: 8, y: 0, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'd', x: 0, y: 2, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'e', x: 4, y: 2, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'f', x: 8, y: 2, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'g', x: 0, y: 4, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'h', x: 4, y: 4, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'i', x: 8, y: 4, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'j', x: 0, y: 6, w: 4, h: 8, minW: 3, minH: 8},
    {i: 'k', x: 4, y: 6, w: 4, h: 8, minW: 3, minH: 8},
    {i: "deleteOnDrop" , x: 4, y: 6, w: 4, h: 8, minW: 3, minH: 8}
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
                <ReactGridLayoutItem key="a" > 
                    gird Item a
                </ReactGridLayoutItem>
                <ReactGridLayoutItem key="b" > 
                    gird Item b
                </ReactGridLayoutItem>
                <ReactGridLayoutItem key="c"> 
                    gird Item c
                </ReactGridLayoutItem>

                <ReactGridLayoutItem key="d">
                    gird Item d
                </ReactGridLayoutItem>
                <ReactGridLayoutItem key="e">
                    gird Item e
                </ReactGridLayoutItem>
                <ReactGridLayoutItem key="f">
                    gird Item f
                </ReactGridLayoutItem>
                <ReactGridLayoutItem key="g">
                    gird Item g
                </ReactGridLayoutItem>
                
                <ReactGridLayoutItem key="h">
                    gird Item h
                </ReactGridLayoutItem>
                
                
                <ReactGridLayoutItem key="i">
                    gird Item i
                </ReactGridLayoutItem>

                
                <ReactGridLayoutItem key="j">
                    gird Item j
                </ReactGridLayoutItem>
                
                <ReactGridLayoutItem key="k" >
                    gird Item k
                </ReactGridLayoutItem>                
            </ResponsiveGridLayout>


            {/* <div className="cnx__delete_drop_zone active" id="delete_zone">
                Delete
            </div> */}
        </React.Fragment>
    )
}

export default ReactGridLayout;


