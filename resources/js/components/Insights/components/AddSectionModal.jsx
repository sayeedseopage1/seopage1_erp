import * as React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Label from '../ui/Label';
import { useDispatch, useSelector } from 'react-redux';
import { closeSectionModal } from '../services/slices/sectionModalSlice';
import { openDashboardModal, setDashboardModalData } from '../services/slices/dashboardModalSlice';

const AddSectionModal = () => {
    const {type, from} = useSelector((state) => state.sectionModal);
    const [section, setSection] = React.useState('');
    const dispatch = useDispatch();

    // back
    const back = () => {
        dispatch(closeSectionModal());
        dispatch(openDashboardModal());
    }
    // close
    const close = () => {
        dispatch(closeSectionModal());
    }

    // save
    const onSave = (e) => {
        e.preventDefault();

        // query to save section name to db

        if(type === 'DASHBOARD_SECTION' && from === 'DASHBOARD_MODAL'){
            dispatch(setDashboardModalData({ section }))
            dispatch(openDashboardModal());
        }else if(type === 'DASHBOARD_SECTION' && from === ''){
            dispatch(setDashboardModalData({ section }))
            dispatch(closeSectionModal());
        }else if(type === 'REPORT_SECTION' && from === 'REPORT_MODAL'){
            console.log('report section');
        }else if(type === 'REPORT_SECTION' && from === ''){
            console.log('report section');
        }
        dispatch(closeSectionModal());
    }

    return (
        <Card className="cnx__ins__new_dashboard_modal">
            <Card.Header onClose={close} className="cnx__ins__new_dashboard_modal_header">
                <h4>Add New section</h4>
            </Card.Header>
            <Card.Body className="cnx__ins__new_dashboard_modal_body">
                <form action="">
                    <Label label="Section Name">
                    <Input 
                        type='text' 
                        placeholder='Section name' 
                        value={section}
                        onChange={(e) => setSection(e.target.value)}    
                    />
                    </Label>
                </form>
            </Card.Body>
            <Card.Footer className="cnx__ins__new_dashboard_modal_footer"> 
                    <div className='cnx_ins__new_dashboard__card_footer'>
                        {from ? 
                        <Button
                            onClick={back}
                            className='cnx_ins__goal_modal__card_footer_cancel'
                            variant='tertiary'
                        >
                            <i className="fa-solid fa-arrow-left" />
                            Back
                        </Button>: 
                        <Button
                            onClick={close}
                            className='cnx_ins__goal_modal__card_footer_cancel'
                            variant='tertiary'
                        >
                            Close
                        </Button>}
                        <Button type="button" onClick={onSave} variant='success' disabled={!section}>Save</Button>
                    </div>
            </Card.Footer>
        </Card>
    );
};

export default AddSectionModal;