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
    LabelList,
    Label,
    ComposedChart
} from 'recharts';
import { bgColors } from '../../utils/constants';
import _ from 'lodash';





const VerticalGraph = ({data, leftSideLabel,  XAxisLabel, barDataKey=[], yAxisTickFormate,offset=5, labelListFormatter}) => {
    return(
        <div className='cnx__conversion_graph__wrapper'>
            <div className='cnx__conversion__graph'>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        layout='vertical'
                        width={100}
                        height={100}
                        data={data}
                        margin={{
                            top: 30,
                            right: 30,
                            left: 20,
                            bottom: 10,
                        }}
                    >
                    <CartesianGrid horizontal={false} strokeDasharray="0 0 0"  strokeWidth={0.5} stroke='#ddd' fillOpacity={0.2}/>
                    <XAxis 
                        axisLine={false}  
                        tickLine={false}
                        type='number'
                        domain={['auto', 'dataMax + 2']}
                        // tickFormatter={yAxisTickFormate}
                    >
                        <Label value={leftSideLabel} position="insideBottom" offset={offset} style={{textAnchor: 'middle'}}/>
                    </XAxis>
                    <YAxis 
                        axisLine={false}
                        tickLine={false}
                        dataKey="name"
                        type='category'
                        width={100}
                    />
                    <Tooltip  cursor={{ stroke: '#F1F5F9', strokeWidth: 50 }}/>
                    {barDataKey.length > 0 && barDataKey.map((b, index) => (
                            <Bar 
                                key={b} 
                                dataKey={b} 
                                stackId={XAxisLabel} 
                                fill={bgColors[index]} 
                                
                            >
                                {barDataKey.length-1 === index && <LabelList  position="right" formatter={labelListFormatter} />} 
                            </Bar>
                        ))}
                        {/* <Bar dataKey="open" stackId={XAxisLabel} fill="#fecf4c" label={{position: 'top'}} /> */}
                    </ComposedChart>
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

export default VerticalGraph;
