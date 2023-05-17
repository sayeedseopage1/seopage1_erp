import * as React from 'react';
import Card from "../ui/Card"
import DataTable from '../ui/DataTable';
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { closeDataTableModal } from "../services/slices/dataTableModalSlice";
import { DataTableColumns } from "./DataTableColumns";

export const ModalDataTable = () =>{
    const {data, title} = useSelector(state => state.dataTableModal);
    
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);

    const closeModal = () => dispatch(closeDataTableModal());

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        },1000);

        return () => clearTimeout(timer);
    }, [data])

    return(
        <div className="cnx_ins__goal_modal__container">
                <Card className="cnx_ins__goal_modal__card cnx__modal_table_card">
                    <Card.Header 
                        className="cnx_ins__goal_modal__card_header"
                        onClose={closeModal}
                    >
                        <div className='cnx_ins__goal_modal__card_header_title'>
                           {data.title} - deals
                        </div>
                    </Card.Header>
                    {/* card body */}
                    <Card.Body className='cnx__data_table_card_body'>
                        <div className='d-flex align-items-center justify-content-center position-relative py-3'>
                            <div className='cnx__data_table_card_body___title filter_options_line position-relative'>
                                <span>${data.dealAdded.toFixed(2)}</span> • 
                                <span>{data.totalDeal} Deals</span>
                            </div>
                            
                        </div>
                        {/* table */}
                         <div>
                            <DataTable 
                                data={data.deals} 
                                    defaultColumns={
                                        data?.entryType === 'Won' ?
                                        WonTableData :
                                        data?.entryType === 'Added'?
                                        AddedTableColumns : 
                                        DataTableColumns
                                    }
                                isLoading={isLoading } 
                            />
                         </div> 
                    </Card.Body>
                    {/* end card body */}
                    <Card.Footer>
                        <div className='cnx_ins__goal_modal__card_footer'>
                            <Button
                                onClick={closeModal}
                                className='cnx_ins__goal_modal__card_footer_cancel'
                                variant='tertiary'
                            >Cancel</Button>
                        </div>
                    </Card.Footer>
               
                </Card>
           </div> 
    )
}