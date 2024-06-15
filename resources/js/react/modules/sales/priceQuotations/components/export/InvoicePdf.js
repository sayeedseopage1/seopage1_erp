import { PDFViewer, Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import ViewPriceQuotationsInvoice from '../Modal/ModalContent/ViewPriceQuotationsInvoice';


function ExportInvoicePdf({ invoiceData }) {

  const styles = StyleSheet.create({

  })

  return (
    <>
      <Document>
        <Page size="A4" >
          <View>
            <ViewPriceQuotationsInvoice
              invoiceData={invoiceData}
            />
          </View>
        </Page>
      </Document>
    </>
  )
}



export default function ExportInvoicePDF({ invoiceData }) {

  return (
    <>
      <PDFDownloadLink document={<ExportInvoicePdf invoiceData={invoiceData} />} fileName="deal-table.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
      <PDFViewer width="100%" height="100%">
        <ExportInvoicePdf />
      </PDFViewer>
    </>
  )
}