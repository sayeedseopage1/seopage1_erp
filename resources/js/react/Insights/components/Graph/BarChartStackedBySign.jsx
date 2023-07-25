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





const BarChartStackedBySign = ({data, leftSideLabel,  XAxisLabel, barDataKey=[], yAxisTickFormate,offset=5, labelListFormatter, xDomain, yDomain, referenceLine = false}) => {
    return(
        <div className='cnx__conversion_graph__wrapper'>
            <div className='cnx__conversion__graph'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={100}
                        height={100}
                        data={data}
                        stackOffset="sign"
                        style={{ stroke: '#fff', strokeWidth: 2 }}
                        margin={{
                            top: 30,
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
                        domain={xDomain}
                    />
                    <YAxis 
                        axisLine={false}
                        tickLine={false}
                        domain={yDomain}
                        tickFormatter={yAxisTickFormate}
                    >
                        <Label 
                            value={leftSideLabel} 
                            angle={-90} 
                            position="insideLeft" 
                            offset={offset} 
                            style={{textAnchor: 'middle'}}
                        />
                    </YAxis>
                    <Tooltip  cursor={{ fill: '#F1F5F9' }}/>
                    {referenceLine && <ReferenceLine y={0} stroke="#000" />}
                    {barDataKey.length > 0 && barDataKey.map((b, index) => (
                            <Bar 
                                key={b} 
                                dataKey={b} 
                                stackId={XAxisLabel} 
                                fill={bgColors[index]}
                            >
                                {barDataKey.length-1 === index && <LabelList  style={{stroke: '#000', strokeWidth: '0'}} position="top"  formatter={labelListFormatter} />} 
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

export default BarChartStackedBySign;
