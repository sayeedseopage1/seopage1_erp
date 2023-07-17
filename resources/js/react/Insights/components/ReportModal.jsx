import * as React from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Icon } from '../utils/Icon';
import { reports } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { closeReportModal } from  '../services/slices/reportModalSlice';

const ReportModal = () => {
    const [selectedEntry, setSelectedEntry] = React.useState("Deal");
    const [selectedReport, setSelectedReport] = React.useState(null);

    const dispatch = useDispatch();

    const getEntries = () => {
        return reports?.map((item) => ({
            id: item.id,
            title: item.title,
        }));
    }

    const getTypes = (type) => {
        const reportTypes = reports?.find((item) => item.title === type);
        return reportTypes?.types;
    }

    const close = () => dispatch(closeReportModal());

    return(
        <div className="cnx_ins__goal_modal__container">
            <Card className="cnx_ins__goal_modal__card">
                <Card.Header 
                    className="cnx_ins__goal_modal__card_header"
                    onClose={close}
                >
                    <div className='cnx_ins__goal_modal__card_header_title'>
                        Add new report
                    </div>
                </Card.Header>
                {/* card body */}
                <Card.Body className='cnx_ins__goal_modal'>
                        <div className='cnx_ins__goal_modal_entry hr'>
                            <div className='cnx_ins__goal_modal_entry_title'>CHOOSE ENTITY</div>
                            <div className='cnx_ins__goal_modal_entry_list'>
                                {
                                    getEntries().map((item) => (
                                        <div 
                                            key={item.id} 
                                            onClick={() => setSelectedEntry(item.title)}
                                            className={`cnx_ins__goal_modal_entry_list_item ${selectedEntry === item.title ? 'active' :''}`
                                        }>
                                            <Icon type={item.title} /> 
                                            <span>{item.title}</span>
                                            {selectedEntry === item.title && <i className="fa-solid fa-chevron-right"></i>}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className='cnx_ins__goal_modal_entry'>
                            <div className='cnx_ins__goal_modal_entry_choose'>
                                <div className='cnx_ins__goal_modal_entry_title'>CHOOSE GOAL</div>
                                <div className='cnx_ins__goal_modal_entry_list'>
                                    {
                                        getTypes(selectedEntry)?.map((item) => (
                                            <div 
                                                key={item.id} 
                                                onClick={() => setSelectedReport(item.title)}
                                                className={`cnx_ins__goal_modal_entry_list_item ${selectedReport === item.title ? 'active' :''}`
                                            }>
                                                {Icon(item.title)}
                                                    <div>
                                                        <span>{item.title}</span>
                                                        <article>
                                                            {item.subtitle}
                                                        </article>
                                                    </div>
                                                {selectedReport === item.title && <i className="fa-solid fa-check"></i>}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                </Card.Body>
                {/* end card body */}
                <Card.Footer>
                    <div className='cnx_ins__goal_modal__card_footer'>
                        <Button
                            onClick={close}
                            className='cnx_ins__goal_modal__card_footer_cancel'
                            variant='tertiary'
                        >Cancel</Button>
                        <Button variant='success'>Continue</Button>
                    </div>
                </Card.Footer>
            </Card>
        </div> 
    )
}


export default ReportModal;



