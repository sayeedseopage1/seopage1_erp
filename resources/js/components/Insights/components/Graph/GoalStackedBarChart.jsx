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
import { useState } from 'react';
import { useCallback } from 'react';



const GoalStackedBarChart = ({data, 
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


    const dispatch = useDispatch();


    const handleBarClick = (data) => {
        if(!data) return;
        console.log(data)
        dispatch(openDataTableModal({
            data: data?.activePayload[0]?.payload, 
            title: 'Deals'
        }));
    }


    

    return(
        <div className='cnx__conversion_graph__wrapper'>
            <div className='cnx__conversion__graph'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={100}
                        height={100}
                        onClick={handleBarClick}
                        data={data}
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
            </div>

            

            {footer && 
                <>
                    <div className='cnx_divider' />
                    <div className='cnx__graph_footer'>
                    {
                            barDataKey.length > 0 && barDataKey.map((b, index) => (
                                <div className='__legend'  key={b}>
                                    <span style={{background: colors.length > 0 ? colors[index] : bgColors[index]}}></span>
                                    <span>
                                        {_.startCase(b.replace(/_/g, ' '))}
                                    </span>
                                </div>
                            ))
                        }
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
        let { entry, entryType, label } = goalData;
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
                            convertNumberToUnits(goal, 2)}
                        </span> 
                            
                    </div>

                    <div className='__tooltip_item'>
                        <Icon type='Deal' />
                        <span>{entry} {entryType}</span>
                        <span>{
                            _.lowerCase(targetType) === 'value'  
                            ? `$${convertNumberToUnits(dealAdded, 2)}` : totalDeal
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
                            convertNumberToUnits(difference, 2)
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
        const { goal, dealAdded,targetType, totalDeal, goalData } = payload;      
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
                        width={60}
                        height={20}
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
                                convertNumberToUnits(target, 2)}
                            
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
                                convertNumberToUnits(actual, 2)}

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




