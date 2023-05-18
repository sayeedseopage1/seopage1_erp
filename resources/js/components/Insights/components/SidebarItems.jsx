
import { Responsive, WidthProvider } from "react-grid-layout";
import ReactGridLayoutItem from './ReactGridLayoutItem';
import React from "react";
import ConversionGraph from "./Graph/Conversion";
import convertNumberToUnits from "../utils/convertNumberToUnits";

import GridLayout from "react-grid-layout";
import Tooltip from "../ui/Tooltip";
import TextHighlighter from "./TextHighlighter";
import { NavLink } from "react-router-dom";
import { Icon } from "../utils/Icon";

const Item = React.forwardRef(({goal,search, style, isDragging ,className="", onMouseDown, onMouseUp, onTouchEnd,...props}, ref) => {
    return (
        <div 
            className={`cnx_ins__sidebar_item ${className}`}
            ref={ref}    
            style={style}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            {...props}
        >
            <Tooltip text={goal.title} style={{width: '100%'}}>
                <NavLink
                    to={`goals/${goal.id}`}
                    className={({isActive}) => isActive ? 'cnx_ins__sidebar_item_link __goal_item active' : 'cnx_ins__sidebar_item_link __goal_item'}
                >
                    <TextHighlighter
                        searchWords={search}
                        textToHighlight={goal.title}
                        totalChars={41}
                    />
                    <button 
                        onMouseDown={onMouseDown} 
                        aria-label='moveItem' className="cnx_ins__sidebar_item_move"
                    >
                        <Icon type="Move" />
                    </button>
                </NavLink>
            </Tooltip>
        </div>
    )
}); 


const ResponsiveSidebarItems = WidthProvider(Responsive);

 

const SidebarItems = ({goals, search}) => {
    const [expended, setExpended] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [visibleGoals, setVisibleGoals] = React.useState([...goals]);
    const length = expended ? goals.length : 12;
    
    React.useEffect(() => {
        let _goals = goals
            .filter(goal => goal.title.toLowerCase().includes(search.toLowerCase()))
            .slice(0, length);

        setVisibleGoals([..._goals]);

    }, [goals, search, expended]);

    console.log(isDragging)

    return(
        <GridLayout
            className="layout"
            cols={1}
            rowHeight={30}
            width={250}
            isResizable={false}
            autoSize={true}
            isBounded={true}
            compactType="vertical"
            onDragStart={() => setIsDragging(true)}
            onDragStop={() => setIsDragging(false)}
        >
            {visibleGoals.map((goal, index) => {
                return <div
                    key={goal.id}
                    data-grid={{x: 0, y: index, w: 1, h: 1}}
                >

                    <Item 
                        goal={goal} 
                        search={search} 
                        isDragging={isDragging}
                    />
                   
                </div>

            })}
        </GridLayout>
    )


}

export default SidebarItems;


