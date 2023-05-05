import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Label from '../ui/Label';
import Dropdown from '../ui/Dropdown';
import { closeDashboardModal, setDashboardModalData } from '../services/slices/dashboardModalSlice';
import { openSectionModal } from '../services/slices/sectionModalSlice';
import { useSections } from '../hooks/useSection';
import { useDashboards } from '../hooks/useDashboards';


const NewDashboardModal = () => {
    const dispatch = useDispatch();
    // const {dashboards} = useSelector((state) => state.dashboards);
    const {dashboards, addNewDashboard} = useDashboards();
    const { dashboardName, section: defaultSection } = useSelector(state => state.dashboardModal);
    const { getSectionsByType} = useSections(); 
    const [name , setName] = React.useState(dashboardName);
    const [section, setSection] = React.useState(defaultSection);
    const [isSaving, setIsSaving] = React.useState(false);

    React.useEffect(() => {
        dispatch(setDashboardModalData({ dashboardName: name, section }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, section])


    // close modal
    const close = () =>{
        dispatch(setDashboardModalData({ dashboardName: '', section }));
        dispatch(closeDashboardModal());
    }

    // open section modal
    const addSection = () => {
        dispatch(openSectionModal({
            type: "DASHBOARD_SECTION",
            from: 'DASHBOARD_MODAL'
        }));
        dispatch(closeDashboardModal());
    }


    // on save
    const onSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        const data = {name, root: 0, section, reports: [], goals: []};
        addNewDashboard(data, setIsSaving);
        
    }

    return (
        <Card className="cnx__ins__new_dashboard_modal">
            <Card.Header onClose={close} className="cnx__ins__new_dashboard_modal_header">
                <h4>Add New Dashboard</h4>
            </Card.Header>
            <Card.Body className="cnx__ins__new_dashboard_modal_body">
                <Label label="Dashboard Name">
                    <Input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Dashboard name' />
                </Label>

                <div className='cnx__ins__new_dashboard_modal_body__dd_wrapper'>
                    <span>Section</span>
                    <Dropdown className="cnx__ins__new_dashboard_modal_body__dd">
                        <Dropdown.Toggle className="cnx_select_box">
                            { !_.isEmpty(section) ? section.section_name : 'Select Section'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="cnx__ins__new_dashboard_modal_body__dd_menu">
                            {
                                getSectionsByType('DASHBOARD_SECTION')?.map((option => ( 
                                    <Dropdown.Item 
                                        key={option.id}
                                        onClick={() => setSection(option)}
                                        className={ `cnx_select_box_option ${!_.isEmpty(section) && option.id === section?.id ? 'active': ''}`}> 
                                            {option.section_name}
                                            { !_.isEmpty(section) && option.id === section?.id && <i className="fa-solid fa-check" />}
                                        </Dropdown.Item>
                                )))
                            }
                            <div className='cnx_divider'/>
                            <Dropdown.Item onClick={addSection} className="cnx_ins__sidebar_header_dd_item">
                                <i className="fa-solid fa-plus cnx_font_sm" />
                                <span>Section</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div> 
            </Card.Body>
            <Card.Footer className="cnx__ins__new_dashboard_modal_footer"> 
                    <div className='cnx_ins__new_dashboard__card_footer'>
                        <Button
                            onClick={close}
                            className='cnx_ins__goal_modal__card_footer_cancel'
                            variant='tertiary'
                        >Cancel</Button>
                        <Button
                            type="button"
                            disabled={!name || _.isEmpty(section) || isSaving}
                            onClick={onSubmit} 
                            variant='success'
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                
            </Card.Footer>
        </Card>
    );
};

export default NewDashboardModal;