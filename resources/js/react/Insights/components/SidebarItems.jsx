
import { Responsive, WidthProvider } from "react-grid-layout";
import React from "react";
import GridLayout from "react-grid-layout";
import Tooltip from "../ui/Tooltip";
import TextHighlighter from "./TextHighlighter";
import { NavLink } from "react-router-dom";
import { Icon } from "../utils/Icon";

const Item = React.forwardRef(({goal,search, style, setIsDragging, isDragging ,className="", onMouseDown, onMouseUp, onTouchEnd,...props}, ref) => {
    return (
        <div 
            className={`cnx_ins__sidebar_item ${className}`}
            ref={ref} 
            style={style}
            {...props}
        >
            <Tooltip text={goal.title} disabled={isDragging} style={{width: '100%'}}>
                <div className="cnx__ins__sidebar_item">
                    <NavLink
                        to={`goals/${goal.id}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseUp={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                        }} 
                        className={({isActive}) => isActive ? 'cnx_ins__sidebar_item_link __goal_item active' : 'cnx_ins__sidebar_item_link __goal_item'}
                    >
                        <TextHighlighter
                            searchWords={search}
                            textToHighlight={goal.title}
                            totalChars={41}
                        />
                    
                    </NavLink>

                    <button 
                            onMouseDown={onMouseDown} 
                            onMouseUp={onMouseUp}
                            onTouchEnd={onTouchEnd}
                            aria-label='moveItem' 
                            className="cnx_ins__sidebar_item_move"
                            style={{
                                zIndex: 1
                            }}
                        >
                            <Icon type="Move" />
                    </button>
                </div>
                
            </Tooltip>
        </div>
    )
}); 


const ResponsiveSidebarItems = WidthProvider(Responsive);

 

const SidebarItems = ({goals, search}) => {
    const [expended, setExpended] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [visibleGoals, setVisibleGoals] = React.useState([...goals]);
    const [layout, setLayout] = React.useState([]);
    const length = expended ? goals.length : 12;
    
    React.useEffect(() => {
        let _goals = goals
            .sort((a, b) => b.id - a.id)
            .filter(goal => goal.title.toLowerCase().includes(search.toLowerCase()))
            .slice(0, length);

        
        setVisibleGoals([..._goals]);

    }, [goals, search, expended]);



    React.useEffect(() => {
        let _layout = localStorage.getItem(`sp1_gs_${window?.Laravel?.user?.id}`);
       
        if(_layout) {
            _layout = JSON.parse(_layout);
            setLayout([..._layout]);
        }else{
            let _layout = [];
            for(let i = 0; i < visibleGoals.length; i++){
                _layout.push({
                    i: visibleGoals[i].id.toString(),
                    x: 0,
                    y: i,
                    w: 1,
                    h: 1,
                    static: false
                })
            }
            setLayout([..._layout]);
        }


    }, [visibleGoals]);

    const onLayoutChange = (layout) => {
        setLayout([...layout]);
        localStorage.setItem(`sp1_gs_${window?.Laravel?.user?.id}`, JSON.stringify(layout));
    }

       

    if(visibleGoals.length === 0) return null;
    return(
        <>
            <GridLayout
            className="layout"
            cols={1}
            rowHeight={30}
            width={248}
            isResizable={false}
            layout={[...layout]}
            autoSize={true}
            isBounded={true}
            compactType="vertical"
            onDragStart={() => setIsDragging(true)}
            onDragStop={() => setIsDragging(false)}
            // store into local storage
            onLayoutChange={onLayoutChange}


        >
            {visibleGoals.map((goal) => {
                return <div
                    key={goal.id}
                >

                    <Item 
                        goal={goal} 
                        search={search} 
                        isDragging={isDragging}
                        setIsDragging= {setIsDragging}
                    />
                   
                </div>

            })}
        </GridLayout>

            {
                goals.length > 12 && 
                <div 
                    onClick={() => setExpended(!expended)}
                    className='cnx_ins__sidebar_item  cnx_ins__sidebar_item_see_more'
                >
                    {expended ? 'Hide' : 'See more'}
                </div>
                
            }        
        </>
    )


}

export default SidebarItems;


