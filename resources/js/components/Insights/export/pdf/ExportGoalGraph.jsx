import * as React from 'react';
import ReactDOM from 'react-dom';
import {PDFViewer, Page, Text, View, Document, StyleSheet, PDFDownloadLink, Svg } from '@react-pdf/renderer';
import ExportDealTableDataHead from './ExportDealTableDataHead'; 
import { wonTableVisibleColumns } from '../../utils/constants'
import GoalStackedBarChart from '../../components/Graph/GoalStackedBarChart';
import Example from './ExportGoalGraphBarChart';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



// convert to unit
const numberToUnits = (value, decimal = 1) => {
    let c = convertNumberToUnits(value, decimal)
    return `${c}`
}
const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  


 function ExportGoalGraph ( ) {
    const svgString = ReactDOM
    .renderToStaticMarkup(<Example />)
    .replaceAll('px', 'pt');

    // const [component] = reactHtmlParser(svgString, { transform: convertToPdfSvg });
    // return component;

    return( 
        <>
            <Document>
                <Page size="A4" >
                    <View>
                    {svgString}
                    </View>
                </Page>
            </Document>
        </>
    )
}


export default function ExportGoalGraphPdf ( ){

    return(
        <> 

           <PDFDownloadLink document={<ExportGoalGraph  />} fileName="deal-table.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>
        </>
    )
}