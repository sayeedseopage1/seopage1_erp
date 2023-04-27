import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Label from '../ui/Label';
import Dropdown from '../ui/Dropdown';
import { closeDashboardModal, setDashboardModalData } from '../services/slices/dashboardModalSlice';
import { openSectionModal } from '../services/slices/sectionModalSlice';


const NewDashboardModal = () => {
    const dispatch = useDispatch();
    const {dashboards} = useSelector((state) => state.dashboards);
    const { dashboardName, section: defaultSection } = useSelector(state => state.dashboardModal);

    const [name , setName] = React.useState(dashboardName);
    const [section, setSection] = React.useState(defaultSection);
    const [isSaving, setIsSaving] = React.useState(false);

    React.useEffect(() => {
        dispatch(setDashboardModalData({ dashboardName: name, section }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, section])

    
    const options = () =>  {
        const sections = dashboards.map(dashboard => dashboard.section);
        const uniqueSections = [...new Set(sections)];
        return uniqueSections;
    }

    // close modal
    const close = () =>{
        dispatch(setDashboardModalData({ dashboardName: '', section: '' }));
        dispatch(closeDashboardModal());
    }

    // open section modal
    const addSection = () => {
        dispatch(closeDashboardModal());
        dispatch(openSectionModal({
            type: "DASHBOARD_SECTION",
            from: 'DASHBOARD_MODAL'
        }));
    }


    // on save
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const data = {name, section, reports: [], goals: []};
        await axios.post('/account/insights/dashboards/add', data).then(res => {
            console.log(res.data);
            setIsSaving(false)
        })
    }

    return (
        <Card className="cnx__ins__new_dashboard_modal">
            <Card.Header onClose={close} className="cnx__ins__new_dashboard_modal_header">
                <h4>Add New Dashboard</h4>
            </Card.Header>
            <Card.Body className="cnx__ins__new_dashboard_modal_body">
                <form action="">
                    <Label label="Dashboard Name">
                    <Input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Dashboard name' />
                    </Label>

                    <div className='cnx__ins__new_dashboard_modal_body__dd_wrapper'>
                        <span>Section</span>
                        <Dropdown className="cnx__ins__new_dashboard_modal_body__dd">
                            <Dropdown.Toggle className="cnx_select_box">
                                {section || 'Select Section'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="cnx__ins__new_dashboard_modal_body__dd_menu">
                                {
                                    options()?.map((option => ( 
                                        <Dropdown.Item 
                                            key={`${option}-${Math.random()}`}
                                            onClick={() => setSection(option)}
                                            className={ `cnx_select_box_option ${section === option ? 'active': ''}`}> 
                                                {option}
                                                {section === option && <i className="fa-solid fa-check" />}
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
                </form>
            </Card.Body>
            <Card.Footer className="cnx__ins__new_dashboard_modal_footer"> 
                    <div className='cnx_ins__new_dashboard__card_footer'>
                        <Button
                            onClick={close}
                            className='cnx_ins__goal_modal__card_footer_cancel'
                            variant='tertiary'
                        >Cancel</Button>
                        <Button
                            disabled={!name || !section || isSaving}
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