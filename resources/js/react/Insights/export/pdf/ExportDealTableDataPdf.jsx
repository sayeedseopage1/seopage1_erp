import * as React from 'react';
import {PDFViewer, Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import ExportDealTableDataHead from './ExportDealTableDataHead';

import { wonTableVisibleColumns } from '../../utils/constants'
 function ExportDealTableDataPdf () {

    const styles = StyleSheet.create({
        
    })

    return( 
        <>
            <Document>
                <Page size="A4" >
                    <View>
                        <ExportDealTableDataHead columns={wonTableVisibleColumns}/>
                    </View>
                </Page>
            </Document>
        </>
    )
}


export default function PDF (){

    return(
        <>
            <PDFDownloadLink document={<ExportDealTableDataPdf />} fileName="deal-table.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>
           <PDFViewer width="100%" height="100%">
             <ExportDealTableDataPdf />
           </PDFViewer> 
        </>
    )
}