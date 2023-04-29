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
    Text
} from 'recharts';





const DealsWonOverTimeGraph = ({data}) => {
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
                        dataKey="name" 
                        axisLine={false}  
                        tickLine={false}
                    />
                    <YAxis  
                        label={{
                            value: "Number of deals",
                            angle: -90, 
                            position: "insideBottomLeft", 
                            offset: 16
                        }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip />
                        <Bar dataKey="won" stackId="name" fill="#fe114c" label={{position: 'top'}} />
                        <Bar dataKey="open" stackId="name" fill="#fecf4c" label={{position: 'top'}} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className='cnx_divider' />

            <div className='cnx__graph_footer'>
                <div className='__legend'>
                    <span style={{background: '#fecf4c'}}></span>
                    <span>Open</span>
                </div>
                <div className='__legend'>
                    <span style={{background: '#fe114c'}}></span>
                    <span>Won</span>
                </div>
            </div>
        </div>
    )
}

export default DealsWonOverTimeGraph;
