import * as React from 'react';
import Card from "../ui/Card"
import DataTable from '../ui/DataTable';
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { closeDataTableModal } from "../services/slices/dataTableModalSlice";
import { AddedTableColumns, DataTableColumns, WonTableData } from "./DataTableColumns";
import { addedTableVisibleColumns, processedTableVisibleColumns, wonTableVisibleColumns } from '../utils/constants';
import _, { set } from 'lodash';

export const ModalDataTable = () =>{
    const {data, entryType, title} = useSelector(state => state.dataTableModal);
    const [goal, setGoal] = React.useState(null);
    const [visibleColumns, setVisibleColumns] = React.useState([]);
    
    const getGoalDealsDate = (deals, goal) => {
        if(goal?.entryType === "Won" && goal?.team_id !== 1){
            return deals.filter(deal => Number(deal["team_total_amount"]) !== 0) || []
        }else{
            return deals || []
        }
    } 
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
            if(Number(goal?.team_id) === 1){
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


    const getHeaderText = (data) => {
        // console.log(data)
        if(data){
            const { goalData, goal, rowCount, dealAdded, totalDeal } = data;   
            if(_.lowerCase(goalData?.goal?.entryType) === 'added'){
               if(_.lowerCase(goalData?.goal?.trackingType) === 'value'){
                    return <>
                        <span>Goal: ${goal} </span> •
                        <span>Achieved: ${dealAdded} </span> •
                        <span>Contributed In: {rowCount} Deals </span> 
                    </>
               }else{
                    return <>
                        <span>Goal: {goal} Deals </span> •
                        <span>Achieved: {rowCount} Deals </span> 
                    </>
               } 
            }else if(_.lowerCase(goalData?.goal?.entryType) === 'won'){
                if(_.lowerCase(goalData?.goal?.trackingType) === 'value'){
                    return <>
                        <span>Goal: ${goal}  </span> •
                        <span>Achieved: ${dealAdded} </span> •
                        <span>No. of Deals: {rowCount} </span> 
                    </>
                     
                }else{
                    return <>
                        <span>Goal: {goal} Deals  </span> •
                        <span>Achieved: ${dealAdded} </span> •
                        <span>Contributed In: {data?.rowCount} Deals </span> 
                    </>
                }
            }
        }
    }


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
                            {getHeaderText(data)}       
                                {/* <span>${Number(data.dealAdded).toFixed(2)}</span> • 
                                <span>{Number(data.rowCount)} Deals</span> */}
                            {/* <span>Goal: {goal?.trackingType === "value"  ? "$" : ''} {Number(data.goal).toFixed(2)}</span>
                            |
                            <span>{goal?.trackingType === 'value' ? 'Achieved': "Total"} ${Number(data.dealAdded).toFixed(2)} </span>
                            | 
                            {goal?.trackingType === 'value' && <span>Total: ${Number(data.totalAmount).toFixed(2)}</span>}
                            |
                            <span>Contributed In: {Number(data.rowCount)} Deals</span> */}
                            </div>
                            
                        </div>
                        {/* table */}
                        
                         <div>
                            <DataTable 
                                data={[...getGoalDealsDate(data.deals, goal)]} 
                                defaultColumns={
                                    goal?.entryType === 'Won' ?
                                    WonTableData :
                                    goal?.entryType === 'Added'?
                                    AddedTableColumns : 
                                    DataTableColumns
                                }
                                goal={goal}
                                visibleColumns={ [...visibleColumns] }
                                isLoading={isLoading } 
                                isRowSelectedAble = {true}
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