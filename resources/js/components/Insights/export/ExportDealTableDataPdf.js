import * as React from 'react';
import {Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ExportDealTableDataHead from './ExportDealTableDataHead';
import './export-deal-table-data.css';


export default function ExportDealTableDataPdf () {

    return(
        <div>
           <ExportDealTableDataHead /> 

           Export table
        </div>
    )
}