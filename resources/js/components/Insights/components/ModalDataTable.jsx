import * as React from 'react';
import Card from "../ui/Card"
import DataTable from '../ui/DataTable';
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { closeDataTableModal } from "../services/slices/dataTableModalSlice";
import { AddedTableColumns, DataTableColumns, WonTableData } from "./DataTableColumns";
import { addedTableVisibleColumns, processedTableVisibleColumns, wonTableVisibleColumns } from '../utils/constants';
import { set } from 'lodash';

export const ModalDataTable = () =>{
    const {data, entryType, title} = useSelector(state => state.dataTableModal);
    const [goal, setGoal] = React.useState(null);
    const [visibleColumns, setVisibleColumns] = React.useState([]);
    
    
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);

    const closeModal = () => dispatch(closeDataTableModal());

    React.useEffect(() => {
        
        const timer = setTimeout(() => {
            setIsLoading(false);
        },1000);

        return () => clearTimeout(timer);
    }, [data])


    React.useEffect(() => {
        const goalDetails = JSON.parse(localStorage.getItem(`goal_${window?.Laravel?.user?.id}`)); 
        
        if(goalDetails){
            setGoal(goalDetails);
        }
    }, [])


    const getWonTableColumns = React.useCallback((goal) => {
        
        if(goal?.entryType === 'Won'){
            if(goal?.general_checkbox === "1"){
                let t = wonTableVisibleColumns.filter(
                    column => column.accessor !== 'team_total_amount'
                )

                setVisibleColumns([...t]);
            }else{
                setVisibleColumns([...wonTableVisibleColumns]);
            }
        }else if(goal?.entryType === 'Added'){
            setVisibleColumns([...addedTableVisibleColumns]);
        }else{
            setVisibleColumns([...processedTableVisibleColumns]);
        }
    }, [goal])


    React.useEffect(() => {
        getWonTableColumns(goal);
    }, [goal, getWonTableColumns])



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
                                <span>${Number(data.dealAdded).toFixed(2)}</span> • 
                                <span>{Number(data.rowCount)} Deals</span>
                            </div>
                            
                        </div>
                        {/* table */}
                        
                         <div>
                            <DataTable 
                                data={data.deals} 
                                defaultColumns={
                                    goal?.entryType === 'Won' ?
                                    WonTableData :
                                    goal?.entryType === 'Added'?
                                    AddedTableColumns : 
                                    DataTableColumns
                                }

                                visibleColumns={ [...visibleColumns] }
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