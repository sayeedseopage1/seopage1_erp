import Pdf from 'react-to-pdf';
import Button from './Button';


const ExportPDFButton = ({target, filename}) => {


    return (
        <Pdf
            targetRef={target} 
            filename={filename}
        >
            {({toPdf})=>{
                <div 
                    onClick={toPdf} 
                    className=''
                >
                    PDF
                </div>
            }}
        </Pdf>
    )
}

export default ExportPDFButton