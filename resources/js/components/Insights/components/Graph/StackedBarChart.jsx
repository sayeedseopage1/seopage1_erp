/* eslint-disable react/prop-types */
import * as React from 'react';
import { 
    BarChart, 
    Bar, 
    Cell, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer, 
    Text,
    LabelList
} from 'recharts';
import { bgColors } from '../../utils/constants';
import _ from 'lodash';





const StackedBarChart = ({data, leftSideLabel,  XAxisLabel, barDataKey=[]}) => {
    return(
        <div className='cnx__conversion_graph__wrapper'>
            <div className='cnx__conversion__graph'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={100}
                        height={100}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 10,
                        }}
                    >
                    <CartesianGrid vertical={false} strokeDasharray="0 0 0" strokeWidth={0.5} stroke='#ddd' fillOpacity={0.2}/>
                    <XAxis 
                        dataKey= {XAxisLabel} 
                        axisLine={false}  
                        tickLine={false}
                    />
                    <YAxis 
                        label={{
                            value: leftSideLabel,
                            angle: -90, 
                            position: "insideBottomLeft", 
                            offset: 16
                        }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip />
                    {barDataKey.length > 0 && barDataKey.map((b, index) => (
                            <Bar 
                                key={b} 
                                dataKey={b} 
                                stackId={XAxisLabel} 
                                fill={bgColors[index]} 
                                >
                                   {barDataKey.length-1 === index && <LabelList  position="top" />} 
                                </Bar>
                        ))}
                        {/* <Bar dataKey="open" stackId={XAxisLabel} fill="#fecf4c" label={{position: 'top'}} /> */}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className='cnx_divider' />

            <div className='cnx__graph_footer'>
               {
                    barDataKey.length > 0 && barDataKey.map((b, index) => (
                        <div className='__legend'  key={b}>
                            <span style={{background: bgColors[index]}}></span>
                            <span>
                                {_.startCase(b.replace(/_/g, ' '))}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default StackedBarChart;
