/* eslint-disable react/prop-types */
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    LabelList,
    Label,
    ReferenceLine
} from 'recharts';
import { bgColors } from '../../utils/constants';
import _ from 'lodash';

import { openDataTableModal } from '../../services/slices/dataTableModalSlice';
import { useDispatch } from 'react-redux';
import { Icon } from '../../utils/Icon';
import convertNumberToUnits from '../../utils/convertNumberToUnits';
import React, { useState } from 'react';
import { useCallback } from 'react';
import Button from '../../ui/Button';



const GoalStackedBarChart = ({
    data, 
    actualFillColor, 
    targetFillColor, 
    leftSideLabel,  
    XAxisLabel, 
    barDataKey=[],
     yAxisTickFormate,
     offset=5, 
     labelListFormatter, 
     xDomain,
      yDomain,
    referenceLine = false, 
    stackOffset="auto", 
    colors=[], 
    footer=true
}) => {
    const [graphData, setGraphData] = React.useState([])
    const [activePage, setActivePage] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const dispatch = useDispatch();

    const ref = React.useRef(null);

    const memoData = React.useMemo(() => {
        return data;
    }, [data])

    const handleGraphResponsivePagination = React.useCallback(() => {
        if(ref && ref.current){ 
            let width = ref.current.offsetWidth;
            let breakpoint = Math.floor( width / 100); 
            let _data = [];
            ref.current.style.overflowX = 'hidden';
            if(width > 450 && breakpoint > 1){
                _data = data?.reduce((acc, curr, index) => {
                    if(index%(breakpoint-1) === 0){
                     acc.push([curr]);
                    }else{
                     acc[acc.length - 1].push(curr) 
                    }
                    return acc;
                 }, [])
            }else{
                ref.current.style.overflowX = 'auto';
                _data = data?.reduce((acc, curr, index) => {
                    if(index % 3 === 0){
                     acc.push([curr]);
                    }else{
                     acc[acc.length - 1].push(curr) 
                    }
                    return acc;
                 }, [])
            }
            setGraphData([..._data])
            setIsLoading(false);
        }
    }, [ref, memoData])


    // handle responsive
    React.useEffect(() => {
        handleGraphResponsivePagination(data);
    }, [handleGraphResponsivePagination])

    // handle on resize page
    React.useEffect(() => { 
        if(window){
            window.addEventListener('resize', () => handleGraphResponsivePagination());
        }
        return () => window.removeEventListener('resize', () => handleGraphResponsivePagination())
    }, [ref, memoData])

     


    const handleBarClick = (data) => {
        if(!data) return;
        dispatch(openDataTableModal({
            data: data?.activePayload[0]?.payload, 
            title: 'Deals',
            entryType: data?.activePayload[0]?.payload?.goalData?.goal?.entryType
        }));
    }


    const nextPage = () => {
        if(activePage < graphData.length -1) {
           setActivePage(prev => prev + 1) 
        }
    }

    const prevPage = () => {
        if(activePage > 0) {
           setActivePage(prev => prev - 1) 
        }
    }
   

    return(
        <div className='cnx__conversion_graph__wrapper'>
            <div 
                className='cnx__conversion__graph' 
                ref={ref} 
            >
               <div style={{
                width: '100%',
                height: '100%',
                minWidth: '450px'
               }}>
                
                    {
                        !isLoading && 
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={100}
                                height={100}
                                onClick={handleBarClick}
                                data={graphData[activePage]}
                                stackOffset={stackOffset}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 30,
                                    bottom: 10,
                                }}
                                padding = {{
                                    top: 40,
                                }}
                            >
                            <CartesianGrid vertical={false} strokeDasharray="0 0 0" strokeWidth={0.5} stroke='#ddd' fillOpacity={0.2}/>
                            <XAxis 
                                dataKey= {XAxisLabel} 
                                axisLine={false}  
                                tickLine={false}
                                domain={xDomain}
                                interval={0}
                                tickFormatter={v => v.split('(')[0]}
                            />
                            <YAxis 
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={yAxisTickFormate}
                                dataKey="yAxis"
                                domain={[0, 'dataMax']}
                            >
                                <Label 
                                    value={leftSideLabel} 
                                    angle={-90} 
                                    position="insideLeft" 
                                    offset={offset} 
                                    style={{textAnchor: 'middle', stroke: '#000', strokeWidth: '0'}}
                                />
                            </YAxis>
                            <Tooltip
                                content={<CustomTooltip />} 
                                cursor={{ fill: '#f8f8f8' }} 
                            />
                                <Bar
                                    dataKey="value"
                                    stackId={XAxisLabel}
                                    shape={
                                        <CustomBar 
                                            targetFillColor={targetFillColor}
                                            actualFillColor={actualFillColor}
                                        />
                                    }
                                />

                                
                            </BarChart>
                        </ResponsiveContainer>
                    }
                </div> 
                
            </div>

            

            {!isLoading && graphData.length > 1 && 
                <>
                    <div className='cnx_divider' />
                    <div className='cnx__graph_footer'>
                        <div className='__legend ml-auto' >
                            <Button
                                onClick={prevPage}
                                variant='tertiary'
                            >Prev</Button>
                        </div>
                        <div className='__legend' >
                            <Button
                                onClick={nextPage}
                                variant='tertiary' 
                            >Next</Button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default GoalStackedBarChart;






const CustomTooltip = ({
    active,
    payload,
    label,
}) => {
    if(active && payload ) {
        let { goal, dealAdded, difference,targetType, totalDeal, title, goalProgress, goalData } = payload[0].payload;
        let { entry, entryType, label } = goalData?.goal
        return (
            <div className="cnx__tooltip">
                <div className='cnx__tooltip__header'>
                    {title}
                    <span className='__tooltip_goal_progress'>
                        {goalProgress}%
                    </span>
                </div>
                <div className='cnx__tooltip__body'>
                    <div className='__tooltip_item'>
                        <Icon type='Goal' />
                        <span>Goal</span>
                        <span>{_.lowerCase(targetType) === 'value'  ? 
                            `$${convertNumberToUnits(goal, 2)}` : 
                            entryType === 'Won' ? convertNumberToUnits(goal, 2) : 
                            convertNumberToUnits(goal, 0)}
                        </span> 
                            
                    </div>

                    <div className='__tooltip_item'>
                        <Icon type='Deal' />
                        <span>{entry} {entryType}</span>
                        <span>{
                            _.lowerCase(targetType) === 'value'  
                            ? `$${convertNumberToUnits(dealAdded, 2)}` :  
                            entryType === 'Won' ? convertNumberToUnits(totalDeal, 2) : 
                            convertNumberToUnits(totalDeal, 0)
                        }</span>
                    </div>

                    <div className='cnx_divider'></div>
                    <div className='__tooltip_item'>
                        <span>Difference</span>
                        <span
                            style={{
                                color: difference > 0 ? '#00b074' : '#fe114c'
                            }}
                        
                        >{
                            _.lowerCase(targetType) === 'value' ?
                            `${difference < 0 ? '-' : ""} $${convertNumberToUnits(difference, 2)}` :
                            difference
                        }</span>
                    </div>
                </div>
            </div>
        )
    }

    return null;
}



const CustomBar = (props) => {

        // show target value and actual value on one bar deference color
        const { x, y, width, height, fill, payload, targetFillColor, actualFillColor } = props;
        const { goal, dealAdded,targetType, totalDeal, goalData, } = payload;      
        const actual = _.lowerCase(targetType) === 'value'  ? dealAdded : totalDeal;
        const target = _.lowerCase(targetType) === 'value'  ? goal : goal;

         return(
            <>
                <g cursor="pointer">
                    <rect 
                        x={x} 
                        y={y}
                        width={width} 
                        height={height}
                        fill={targetFillColor || '#fecf4c'}
                    />
                    <rect 
                        x={x} 
                        y={y + height - (actual / target * height)}
                        width={width} 
                        height={ actual / target * height} 
                        fill={actualFillColor || '#fe114c'}
                    />


                    <foreignObject
                        x={x + width / 2 - 30}
                        y={y + height - (target / target * height) - 30}
                        width={80}
                        height={30}
                    >
                        <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: target > actual ? '#777' : '#fff',
                                gap: '8px',
                                fill:  target > actual ? '#777' : '#fff',
                                
                            }}
                        >

                            {_.lowerCase(targetType) === 'value'  ?
                                `$${convertNumberToUnits(target, 2)}` :
                                goalData?.goal?.entryType === 'Won' ? convertNumberToUnits(target, 2) : 
                                convertNumberToUnits(target, 0)
                            }
                            
                            <Icon type='Goal' className='cnx__goal_graph_labelList_icon' />
                        </div>

                    </foreignObject>




                    <foreignObject
                        x={x + width / 2 - 30}
                        y={y + height - (actual / target * height) - 30}

                        width={60}
                        height={30}
                    >
                        <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: "#777",
                                gap: '8px',
                                padding: '10px 0',
                            }}
                        >
                            
                            {_.lowerCase(targetType) === 'value'  ?
                                `$${convertNumberToUnits(actual, 2)}` :
                                goalData?.goal?.entryType === 'Won' ? convertNumberToUnits(actual, 2) :
                                convertNumberToUnits(actual, 0)}

                        </div>

                    </foreignObject>

                    {/* create a line for target  */}
                    <line 
                        x1={x  - 10}
                        y1={y + height - (target / target * height)}
                        x2={x + width + 10}
                        y2={y + height - (target / target * height) }
                        stroke="#000"
                        strokeWidth={1}
                    />

                    <circle 
                        cx={x - 10}
                        cy={y + height - (target / target * height)}
                        r={2}
                        fill="#000"
                    />

                    <circle
                        cx={x + width + 10}
                        cy={y + height - (target / target * height)}
                        r={2}
                        fill="#000"
                    />

                </g>
            </>
         )
    }




