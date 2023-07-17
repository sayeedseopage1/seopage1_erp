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

const data = [
  {
    name: 'Contact Made',
    value:  8,
  },
  {
    name: 'Qualified',
    value:  8,
  },
  {
    name: "Requirements Defined",
    value: 8
  },
  {
    name: "Proposal Made",
    value: 8
  },
  {
    name: "Negotiations Started",
    value: 6
  },
  {
    name: "Won",
    value: 5
  }
  
];



const ConversionGraph = () => {
    return(
        <div className='cnx__conversion_graph__wrapper'>
            <div className='cnx__conversion_header'>
                Win rate is 63%
            </div>
            <div className='cnx_divider'/>

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
                        label={{value: "Number of deals",angle: -90, position: "insideBottomLeft", offset: 16}}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#fecf4c" label={{position: 'top'}} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default ConversionGraph;
