import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';



const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 35,
    border: '1px solid #ccc',
    boxShadow: '0px 0px 33px 0px rgba(0, 0, 0, 0.05)',
    padding: 25,
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    
    fontSize: 28,
    fontWeight: 500,
    color: '#333',
    padding: 10,
    borderLeft: '4px solid #1c7ed6',
    minWidth: 308,
    marginBottom: 0,
  },
  provider: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  providerLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  providerLeftTitle: {
    padding: 10,
    backgroundColor: '#0b5394',
    color: '#1c7ed6',
    
    fontSize: 20,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  providerLeftContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
  },
  providerLeftContentText: {
    color: '#333',
    
    fontSize: 24,
    fontWeight: 600,
  },
  providerRight: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 308,
    backgroundColor: '#0b5394',
  },
  providerRightTable: {
    border: '1px solid #ccc',
  },
  providerRightTableCell: {
    padding: 10,
    
    fontSize: 18,
    fontWeight: 500,
    borderBottom: '1px solid #ccc',
    borderRight: '1px solid #ccc',
  },
  deadline: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 308,
  },
  deadlineTitle: {
    padding: 10,
    backgroundColor: '#f5b7b1',
    color: '#e74c3c',
    
    fontSize: 18,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  deadlineText: {
    paddingLeft: 10,
    
    fontSize: 18,
    fontWeight: 500,
  },
  tableWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#1c7ed6',
    color: '#fff',
  },
  tableHeaderCell: {
    padding: 20,
    
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    borderRight: '1px solid #0b5394',
  },
  tableCell: {
    borderBottom: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    padding: 15,
    
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
  },
  footerTop: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#a0c4ff',
    padding: 15,
    marginBottom: 40,
  },
  footerTopText: {
    width: '50%',
    color: '#333',
    
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
    borderRight: '3px solid #0b5394',
  },
  footerBottom: {
    display: 'flex',
    flexDirection: 'column',
  },
  footerBottomText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
  },
  footerBottomNote: {
    color: '#333',
    
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
  },
});

const ViewPriceQuotationsInvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Price Quotation</Text>
      </View>
      <View style={styles.provider}>
        <View style={styles.providerLeft}>
          <Text style={styles.providerLeftTitle}>Service Provider:</Text>
          <View style={styles.providerLeftContent}>
            <Text style={styles.providerLeftContentText}>Seopage1</Text>
            <Text style={styles.providerLeftContentText}>Rajat Chakraborty</Text>
            <Text style={styles.providerLeftContentText}>User Id: Rajat C.</Text>
          </View>
        </View>
        <View style={styles.providerRight}>
          <View style={styles.providerRightTable}>
            <Text style={styles.providerRightTableCell}>Serial No: SEOPAGE1-P.I-24-031</Text>
            <Text style={styles.providerRightTableCell}>Date: {dayjs(new Date()).format('DD.MM.YYYY')}</Text>
          </View>
        </View>
      </View>
      <View style={styles.provider}>
        <View style={styles.providerLeft}>
          <Text style={styles.providerLeftTitle}>Client/Bill to:</Text>
          <View style={styles.providerLeftContent}>
            <Text style={styles.providerLeftContentText}>{invoiceData.client.name}</Text>
            <Text style={styles.providerLeftContentText}>User Id: {invoiceData.client.user_id}</Text>
            <Text style={styles.providerLeftContentText}>Message Thread: {invoiceData.client.message_thread}</Text>
          </View>
        </View>
        <View style={styles.deadline}>
          <Text style={styles.deadlineTitle}>Deadline:</Text>
          <Text style={styles.deadlineText}>{invoiceData.deadline}</Text>
        </View>
      </View>
      <View style={styles.tableWrapper}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableHeaderCell}>SL</Text>
          <Text style={styles.tableHeaderCell}>Items</Text>
          <Text style={styles.tableHeaderCell}>Quantity</Text>
          <Text style={styles.tableHeaderCell}>Descriptions</Text>
          <Text style={styles.tableHeaderCell}>Total Hours</Text>
        </View>
        {invoiceData.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={styles.tableCell}>{item.items}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>{item.descriptions}</Text>
            <Text style={styles.tableCell}>{item.total_hours}</Text>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <Text style={styles.footerTopText}>Total hours needed: {invoiceData.total_hours} hours</Text>
          <Text style={styles.footerTopText}>Total price: System suggested price plus 10%</Text>
        </View>
        <View style={styles.footerBottom}>
          <Text style={styles.footerBottomText}>Note: This quotation is valid for the next 24 hours.</Text>
          <Text style={styles.footerBottomNote}>
            If you have any questions concerning this quotation, please feel free to contact.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

ViewPriceQuotationsInvoicePDF.propTypes = {
  invoiceData: PropTypes.object.isRequired,
};

export default ViewPriceQuotationsInvoicePDF;
