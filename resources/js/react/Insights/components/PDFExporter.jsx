import * as React from 'react';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const PDFExporter = ({children, toggleRef, filename}) => {
    const exportToPDF = () => {
        const element = (
          <Document>
            <Page>
              <Text>
                react pdf
              </Text>
            </Page>
          </Document>
        );

         const pdfBlob = PDFViewer.renderAsBlob(element);
            saveAs(pdfBlob, "exported.pdf");
    }



    React.useEffect(() => {
        // console.log({toggleRef})
        if(toggleRef && toggleRef.current){
            toggleRef.current.addEventListener('click', exportToPDF)
        }

    }, [toggleRef])


    return (
        <>
            {children}            
        </>
    )


}


export default PDFExporter;