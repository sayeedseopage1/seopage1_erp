import Card from "../ui/Card"
import  deals  from '../deals.json';
import DataTable from '../ui/DataTable';
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { closeDataTableModal } from "../services/slices/dataTableModalSlice";

export const ModalDataTable = () =>{
    const {data, title} = useSelector(state => state.dataTableModal);
    const dispatch = useDispatch();


    const closeModal = () => dispatch(closeDataTableModal());

    return(
        <div className="cnx_ins__goal_modal__container">
                <Card className="cnx_ins__goal_modal__card cnx__modal_table_card">
                    <Card.Header 
                        className="cnx_ins__goal_modal__card_header"
                        onClose={closeModal}
                    >
                        <div className='cnx_ins__goal_modal__card_header_title'>
                           {title}
                        </div>
                    </Card.Header>
                    {/* card body */}
                    <Card.Body className='cnx__data_table_card_body'>

                        {/* table */}
                         <div>
                            <DataTable data={deals} />
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