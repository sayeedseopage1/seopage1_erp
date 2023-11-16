import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGoalModal } from '../services/slices/goalModalSlice';
import { closeGoalFormModal } from '../services/slices/goalFormModalSlice';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Dropdown from '../ui/Dropdown';
import SearchBox from '../ui/Searchbox';
import PropsTypes from 'prop-types';
import RangeDatePicker from '../ui/RangeDatePicker';
import Tooltip from '../ui/Tooltip';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import WeekOfYear from "dayjs/plugin/weekOfYear";
import axios from 'axios';
import _, { set } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { getPeriod } from '../utils/getPeriod';
import { useGetUsersQuery } from '../services/api/userSliceApi';
import { useGetTeamsQuery } from '../services/api/teamSliceApi';
import { addGoal, addRecurring, setGoals } from '../services/slices/goalSlice';


// assignee for 

const AssigneeFor = ({assigneeFor, setAssigneeFor, assigneeType}) => {
    const [search, setSearch] = React.useState('');
    // const [users, setUsers] = React.useState([]);
    // const [teams,setTeams] = React.useState([]);

    const {
        data: users,
        isFetching: usersIsFetching,
    } = useGetUsersQuery(`/`);

      const {
        data: teams,
        isFetching: teamsIsFetching,
    } = useGetTeamsQuery(`/`);

    return(
        <React.Fragment>
            <Dropdown className="cnx_select_box_dd">
                <Dropdown.Toggle className="cnx_select_box">
                    {assigneeFor.name || `Select ${assigneeType}`}
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options">
                    <div className='cnx_select_box_search'>
                        <SearchBox autoFocus={true} value={search} onChange={setSearch} />
                    </div>
                    {/* {
                        options().length > 0 && options().filter(f => f.name.includes(search)).map((option => ( 
                            assigneeType === "User" ? 
                                <Dropdown.Item>

                                </Dropdown.Item>
                            : 
                            <Dropdown.Item 
                                key={option.id}
                                onClick={() => setAssigneeFor({id: option.id, name: option.name})}
                                className={ `cnx_select_box_option ${assigneeFor.name === option.name ? 'active': ''}`}> 
                                    {option.name}
                                    {assigneeFor.name === option.name && <i className="fa-solid fa-check" />}
                            </Dropdown.Item>
                        )))
                    } */}

                    {
                        assigneeType === "User" ?  (!users && usersIsFetching) ? 
                                <Dropdown.Item>
                                    Loading...
                                </Dropdown.Item>
                            : 
                            users ? users.filter(f => f.name.includes(search)).map(user => (
                                <Dropdown.Item 
                                    key={user.id}
                                    onClick={() => setAssigneeFor({id: user.id, name: user.name})}
                                    className={ `cnx_select_box_option ${assigneeFor.name === user.name ? 'active': ''}`}> 
                                        {user.name}
                                        {assigneeFor.name === user.name && <i className="fa-solid fa-check" />}
                                </Dropdown.Item>
                            )): <Dropdown.Item>Users not found</Dropdown.Item>
                        : assigneeType === "Team" ? (!teams && teamsIsFetching) ? 
                                 <Dropdown.Item>
                                    Loading...
                                </Dropdown.Item>
                            : 
                            teams ? teams.filter(f => f.team_name.includes(search)).map(team => (
                                <Dropdown.Item 
                                    key={team.id}
                                    onClick={() => setAssigneeFor({id: team.id, name: team.team_name})}
                                    className={ `cnx_select_box_option ${assigneeFor.name === team.team_name ? 'active': ''}`}> 
                                        {team.team_name}
                                        {assigneeFor.name === team.team_name && <i className="fa-solid fa-check" />}
                                </Dropdown.Item>
                                )) 
                            : <Dropdown.Item> Teams not found </Dropdown.Item>
                        : null
                    }
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}
// pipeline 
const PipelineSelect = ({ pipeline, setPipeline, multiple }) => {
    const [search, setSearch] = React.useState('');

    const onSelected = (option) => {
        if(multiple){
            if(pipeline.includes(option)){
                setPipeline(pipeline.filter(p => p !== option));
            }else{
                setPipeline([...pipeline, option]);
            }
        }else{
            setPipeline([option]);
        }
    }

    // remove tag
    const remove = (option) => {
        setPipeline(pipeline.filter(p => p !== option));
    }

    // remove all tags
    const removeAll = () => {
        if(multiple){
            setPipeline([]);
        }else setPipeline(['Select Pipeline']);
    }

    const options = () => ([
        'Pipeline',
        'Pipeline 1',
    ])

    return(
        <React.Fragment>
            <Dropdown className="cnx_select_box_dd">
                <Dropdown.Toggle className="cnx_select_box">
                    <div>
                        {multiple ? pipeline.length > 0 && pipeline.map(p => (
                            <div key={`${p}-${Math.random()}`} className="cnx_select_box_tag">
                                <button aria-label='removeTag' onMouseDown={() => remove(p)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                                <span>{p}</span> 
                            </div>
                        )) : pipeline[0]}
                    </div>

                    <button aria-label='close' onMouseDown={() => removeAll()}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options pipeline">
                    <div className='cnx_select_box_search'>
                        <SearchBox autoFocus={true} value={search} onChange={setSearch}  className="cnx_select_box_search_input" />
                    </div>

                    {
                        multiple && (
                            <>
                                <Dropdown.Item
                                onClick={() => setPipeline([...options()])}
                                className={`cnx_select_box_option all`}> All Pipeline </Dropdown.Item>
                                <div className="hr" />
                            </>
                        )
                    }
                    {options()?.filter(f => f.includes(search)).map(option => (
                        <Dropdown.Item key={`${option}-${Math.random()}`} 
                        onClick={() => onSelected(option)}
                        className={`cnx_select_box_option ${multiple ? pipeline.includes(option) &&'active' : pipeline===option ? 'active' : '' }`}> {option} 
                        {pipeline.includes(option) && 
                        <i className="fa-solid fa-check" />   }
                        </Dropdown.Item>

                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}

// Qualified
const Qualified = ({ qualified, setQualified }) => {
    const options = () => ([
        "Contact Mode",
        "Qualified",
        "Requirements Defined",
        "Proposal Made",
        "Negotiations Started",
    ])

    return(
        <React.Fragment>
            <Dropdown className="cnx_select_box_dd">
                <Dropdown.Toggle className="cnx_select_box">
                    {qualified}
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options">
                    {
                        options()?.map(option => (
                            <Dropdown.Item key={`${option}-${Math.random()}`} 
                            onClick={() => setQualified(option)}
                            className={`cnx_select_box_option ${qualified === option ? 'active' : ''}`}> {option} 
                            {qualified === option && <i className="fa-solid fa-check" />}
                            </Dropdown.Item>

                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}

// Frequency
const Frequency = ({ frequency, setFrequency , setEdit}) => {

    const options = () => ([
        'Weekly',
        'Monthly',
        'Quarterly',
        'Yearly',
    ])

    return(
        <React.Fragment>
            <Dropdown className="cnx_select_box_dd">
                <Dropdown.Toggle className="cnx_select_box">
                    {frequency || 'Select Frequency'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options">
                    {
                        options()?.map(option => (
                            <Dropdown.Item key={`${option}-${Math.random()}`} 
                            onClick={() => {
                                setFrequency(option);
                                setEdit(true);
                            }}
                            className={`cnx_select_box_option ${frequency === option ? 'active' : ''}`}> {option} 
                            {frequency === option && <i className="fa-solid fa-check" />}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}


// DealType
const DealType = ({ dealType, setDealType }) => {

    const options = () => ([
        'New Client',
        'All Clients',
        'Existing Client'
    ])

    return(
        <React.Fragment>
            <Dropdown className="cnx_select_box_dd">
                <Dropdown.Toggle className="cnx_select_box">
                    {dealType || 'Deal Type'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options">
                    {
                        options()?.map(option => (
                            <Dropdown.Item key={`${option}-${Math.random()}`} 
                            onClick={() => setDealType(option)}
                            className={`cnx_select_box_option ${dealType === option ? 'active' : ''}`}> {option} 
                            {dealType === option && <i className="fa-solid fa-check" />}
                            </Dropdown.Item>

                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}

// goal Type
const GoalType = ({ goalType, setGoalType }) => {

    const options = () => ([
        'Minimum',
        'Milestone'
    ])

    return(
        <React.Fragment>
            <Dropdown className="cnx_select_box_dd">
                <Dropdown.Toggle className="cnx_select_box">
                    {goalType || 'Goal Type'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options">
                    {
                        options()?.map(option => (
                            <Dropdown.Item key={`${option}-${Math.random()}`} 
                            onClick={() => setGoalType(option)}
                            className={`cnx_select_box_option ${goalType === option ? 'active' : ''}`}> {option} 
                            {goalType === option && <i className="fa-solid fa-check" />}
                            </Dropdown.Item>

                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}



// period
const Period = ({ period, recurringValue, defaultValue, setRecurringValue, trackingType }) => {
    const [value, setValue] = React.useState(period.value);
    // console.log(period)

    React.useEffect(() => {
        setValue(period.value);
    }, [period]);

    const handleChange = e => {
        const index = recurringValue.findIndex(f => f?.title === period?.title);
        if(index !== -1){
            if(!e.target.value){
                const newValue = recurringValue.filter(f => f?.title !== period?.title);
                setValue(e.target.value);
                setRecurringValue(newValue);
                return;
            }

            const newValue = recurringValue.map((m, i) => {
                if(i === index){
                    return {...m, ...{value: e.target.value}}
                }
                return m;
            })
            setValue(e.target.value);
            setRecurringValue(newValue);
            return;
        }

        if(e.target.value){
            setValue(e.target.value);
            setRecurringValue([ ...recurringValue, {value: e.target.value, ...period}]);
        }

        
    }


    return(
        <div className='cnx_time_period__item'>
            <div className="cnx_select_box cnx_time_periods__title">
                {period?.title}
            </div>
            <div className='cnx_time_periods__input'>
                <input 
                    type='number' 
                    value={value} 
                    onChange={handleChange} 
                    placeholder={`Insert ${trackingType}`} 
                    min={0} className='cnx_select_box' 
                />
            </div>
        </div>
    )
}

// tracking Value
const TrackingInput = ({ 
    trackingType, 
    startDate, 
    endDate, 
    trackingValue, 
    setTrackingValue,
    recurring,
    setRecurring, 
    frequency,
    goalType,
    edit,
    setGoalType
}) => {
    const [checked, setChecked] = React.useState(false);
    const [period, setPeriod] = React.useState(recurring);
    const [error, setError] = React.useState(recurring);
    const [applyAll, setApplyAll] = React.useState(false);

    React.useEffect(()=> {
        if(!endDate){
            setChecked(false);
        }
    }, [endDate])


    // apply to all
    React.useEffect(() => {
        if(recurring.length > 0){
            setChecked(true);
            setPeriod([...recurring]);
        }
    }, [recurring])

    React.useEffect(() => {
        const doc = document.querySelector('.cnx_ins__goal_form_modal');
        if(checked){
            if(doc.offsetHeight > 720){
                doc.style.height = window.innerHeight - 100 + 'px';
                doc.style.maxHeight = 720 + "px";
                doc.style.overflowY = 'auto';
            } else {
                doc.style.height = 'auto';
                doc.style.overflowY = 'unset';
            }
        }else {
                doc.style.height = 'auto';
                doc.style.overflowY = 'unset';
            }
        

    }, [period, endDate, startDate, frequency, checked])
    


    // period control
    React.useEffect(() => {
        dayjs.extend(utc);
        dayjs.extend(quarterOfYear);
        dayjs.extend(isSameOrBefore);
        dayjs.extend(WeekOfYear);

        edit && getPeriod({setPeriod, startDate, endDate, frequency});       
    }, [endDate, frequency, setRecurring, startDate]);
    // end time period control



    // apply to all
    const applyToAll = () => {
        let newPeriod = [...period]; 
        newPeriod = period.map(p => ({
            ...p,
            value: trackingValue 
        }));
        setRecurring(newPeriod);
        setPeriod(newPeriod);
    }




    return(
        <div className='cnx_ins_tracking'>
            <div className="cnx_ins__goal_modal__tracking_input">
                <input 
                    type='number' 
                    defaultChecked={checked}
                    value = {trackingValue}
                    onChange={e => setTrackingValue(e.target.value)}
                    placeholder={`Insert ${trackingType}`} 
                    min={0} 
                    className='cnx_select_box'
                    style={{width: 'auto'}}
                />
                {checked ? 
                    <Button size='sm' onClick={applyToAll}>
                       Apply all
                    </Button>
                : <Tooltip text='Recurring'>
                    <i className="fa-solid fa-repeat"></i>
                </Tooltip>}

                <GoalType goalType={goalType} setGoalType={setGoalType} />

            </div>
            {endDate ?  <div className="cnx_ins__goal_modal__tracking_input">
                <input type='checkbox' id="recurring" onChange={e =>setChecked(e.target.checked)}  />
                <label htmlFor='recurring'>Specify individual period goals</label>
            </div> :
                <Tooltip text='Select a duration end date to enable this option'>
                    <div className="cnx_ins__goal_modal__tracking_input">
                        <input type='checkbox' id="recurring" disabled />
                        <label htmlFor='recurring' className='disabled'>Specify individual period goals</label>
                    </div>
                </Tooltip>
            }


            {checked && <div className='cnx_time_period'>
                <div className='cnx_time_period__header'>
                    <div className="cnx_time_periods__title">
                        Period
                    </div>
                    <div className='cnx_time_periods__input' style={{marginLeft: '10px'}}>
                        {trackingType === 'value' ? 'Value (USD)' : 'Count'}
                    </div>
                </div>
                {recurring.length > 0 ? 
                     recurring.map(p => (
                        <Period  
                            key={`${p.title}`} 
                            period={p}
                            recurringValue={recurring}
                            trackingType={trackingType}
                            setRecurringValue={setRecurring}
                        />
                    ))
                : period.map(p => (
                    <Period  
                        key={`${p.title}`} 
                        period={p}
                        recurringValue={recurring}
                        trackingType={trackingType}
                        setRecurringValue={setRecurring}
                    />
                ))}
            </div>}
        </div>
    )
}


// goal modal
const GoalEditModal = () => {
    const {data, mode, entry, entryType } = useSelector(state => state.goalFormModal);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = React.useState(false);
    const [formStatus, setFormStatus] = React.useState('idle');

    // form data
    const [assigneeType, setAssigneeType] = React.useState('User');
    const [assigneeFor, setAssigneeFor] = React.useState({});
    const [pipeline, setPipeline] = React.useState(["Pipeline"]);
    const [frequency, setFrequency] = React.useState('Monthly');
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(null);
    const [trackingType, setTrackingType] = React.useState('value');
    const [trackingValue, setTrackingValue] = React.useState('');
    const [recurring, setRecurring] = React.useState([]);
    // const [applyRecurring, setApplyRecurring] = React.useState(false);
    const [qualified, setQualified] = React.useState('Contact Mode');
    const [dealType, setDealType] = React.useState('');
    const [goalType, setGoalType] = React.useState('');
    const [achievablePoints, setAchievablePoints] = React.useState('0');

    // React.useEffect(() => {
    //     if(recurring.length === 0){
    //         setApplyRecurring(false);
    //     }
    // }, [recurring])


    // if form mode is edit
    React.useEffect(() => {
        if(_.lowerCase(mode) === 'edit' && data){
            setAssigneeType(data.assigneeType);
            // assignee for
            if(data.assigneeType === 'Company'){
                setAssigneeFor({});
            } else if(data.assigneeType === 'User'){
                setAssigneeFor({id: data.user_id, name: data.name});
            } else setAssigneeFor({id: data.team_id, name: data.team_name});

            // frequency
            setFrequency(data.frequency);
            // start date
            setStartDate(new Date(data.startDate));
            // end date
            data.endDate ? setEndDate(new Date(data.endDate)) : setEndDate(null);
            // tracking type
            setTrackingType(data.trackingType);
            // tracking value
            setTrackingValue(data.trackingValue);
            
            // recurring
            setRecurring(data.recurring || []);
            // qualified
            setQualified(data.qualified || 'Contact Mode');
            // deal type
            setDealType(data.dealType || '');
            // goal type
            setGoalType(data.goalType || '');
            // achievable points
            setAchievablePoints(data.achievablePoints || '0');

        }
    }, [])


    React.useEffect(() => {
        if(formStatus === 'saved'){
            close();
        }
    }, [formStatus])

    // close modal
    const previous = () => {
        if(mode === 'add'){
            dispatch(openGoalModal({
                entry,
                entryType,
            }))
            dispatch(closeGoalFormModal());
        }
    }

    // close modal
    const close = () => {
        dispatch(closeGoalFormModal());
    }


    // validation 
    const isFormDataValid = () => {
        if(assigneeType !== 'Company'){
            if(_.isEmpty(assigneeFor)) {
                return false;
            }
        }

        if(pipeline.length === 0) return false;
        if(!Number(trackingValue)) return false;
        if(!dealType) return false;
        if(!goalType) return false;
         return true;
    }

    // handle on submit 
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setFormStatus('saving');


        const data = {
            entry, 
            entryType, 
            assigneeType, 
            assigneeFor, 
            pipeline, 
            frequency, 
            startDate, 
            endDate, 
            trackingType, 
            trackingValue, 
            recurring, 
            qualified, 
            dealType, 
            goalType, 
            achievablePoints: Number(achievablePoints)
        };

        

        await axios.post("/account/insights/goals/add", data).then((res) => {
            setFormStatus('saved');
            setIsSaving(false);
            navigate(`goals/${res.data?.goal.id}`);
            dispatch(addGoal(res.data));
            dispatch(addRecurring(res.data));
        });
    }


    return(
        <div className="cnx_ins__goal_modal__container">
            <Card className="cnx_ins__goal_modal__card">
                <Card.Header 
                    className="cnx_ins__goal_modal__card_header"
                    onClose={close}
                >
                    <div className='cnx_ins__goal_modal__card_header_title'>
                        Add Goal 2/2 - {entry} {entryType}
                    </div>
                </Card.Header>
                {/* card body */}
                <Card.Body className={`cnx_ins__goal_modal cnx_ins__goal_form_modal`}>
                {/* assignee  */}
                <div className='cnx_ins__goal_modal__card_body'>
                    <div className='cnx_ins__goal_modal__card_body_label'>
                        Assignee
                    </div>
                    {/* assignee type */}
                    <div className='cnx_select_box_wrapper'>
                        <Dropdown className="cnx_select_box_dd">
                            <Dropdown.Toggle className="cnx_select_box">
                                {assigneeType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="cnx_select_box_options">
                                <Dropdown.Item onClick={() => setAssigneeType("Company")} className={`cnx_select_box_option ${assigneeType === 'Company'? 'active' : ''}`}> Company (everyone) 
                                    {assigneeType === 'Company' && <i className="fa-solid fa-check" />}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setAssigneeType("Team")} className={`cnx_select_box_option ${assigneeType === 'Team'? 'active' : ''}`}> Team
                                {assigneeType === 'Team' && <i className="fa-solid fa-check" />}</Dropdown.Item>
                                <Dropdown.Item onClick={() => setAssigneeType("User")} className={`cnx_select_box_option ${assigneeType === 'User'? 'active' : ''}`}> User {assigneeType === 'User' && <i className="fa-solid fa-check" />}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    {/* end assignee type */} 
                    {assigneeType === 'Company' ? null :  
                    <AssigneeFor 
                        assigneeFor={assigneeFor} 
                        setAssigneeFor={setAssigneeFor}
                        assigneeType={assigneeType}    
                    />}
                    </div>
                </div>
                {/* end assignee */}

                {/* pipeline */}
                <div className='cnx_ins__goal_modal__card_body'>
                    <div className='cnx_ins__goal_modal__card_body_label'>
                        Pipeline
                    </div>

                    <div className='cnx_select_box_wrapper'>
                        <PipelineSelect 
                            pipeline={pipeline}
                            setPipeline={setPipeline}
                            multiple={entryType !== 'Progressed'}
                        />

                        {entryType==='Progressed' &&
                            <Qualified qualified={qualified} setQualified={setQualified} />
                        }
                    </div>
                </div>
                {/* end pipeline */}



                {/* Frequency */}
                <div className='cnx_ins__goal_modal__card_body'>
                    <div className='cnx_ins__goal_modal__card_body_label'>
                        Frequency
                    </div>

                    <div className='cnx_select_box_wrapper'>
                        <Frequency frequency={frequency} setFrequency={setFrequency} setEdit={setEdit} />
                        <DealType dealType={dealType} setDealType={setDealType} />
                    </div>
                </div>
                {/* end Frequency */}

                {/* Duration */}
                <div className='cnx_ins__goal_modal__card_body'>
                    <div className='cnx_ins__goal_modal__card_body_label'>
                    Duration 
                    </div>

                    <div className='cnx_select_box_wrapper'>
                        <RangeDatePicker 
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                        />
                    </div>
                </div>
                {/* end Duration */}


                {/* Frequency */}
                <div className='cnx_ins__goal_modal__card_body'>
                    <div className='cnx_ins__goal_modal__card_body_label'>
                        Achievable Points
                    </div>

                    <div className='cnx_select_box_wrapper'>
                        <input 
                            type='number' 
                            value = {achievablePoints}
                            onChange={e => setAchievablePoints(e.target.value)}
                            placeholder="Achievable Pointes" 
                            min={0} 
                            className='cnx_select_box'
                        />
                    </div>
                </div>

                


                {/* Tracking metric */}
                <div className='cnx_ins__goal_modal__card_body'>
                    <div className='cnx_ins__goal_modal__card_body_label'>
                        Tracking metric
                    </div>

                    <div className='cnx_select_box_wrapper'>
                        <label className='' htmlFor='metric_value'>
                            <input id="metric_value" type="radio" name="metric" value="value" onChange={e => setTrackingType(e.target.value)} defaultChecked={true} />
                            Value
                        </label>

                        <label className='' htmlFor='metric_count'>
                            <input type="radio" id="metric_count" name="metric" value="count" onChange={e => setTrackingType(e.target.value)} />
                            Count
                        </label>
                    </div>
                </div>
                {/* end Tracking metric */}


                {/* Tracking metric */}
                <div className='cnx_ins__goal_modal__card_body' style={{alignItems: 'flex-start'}}>
                    <div className='cnx_ins__goal_modal__card_body_label' style={{marginTop: '6px'}}>
                        {trackingType === 'value' ? 'Value (USD)' : 'Count'}
                    </div>

                    <div className='cnx_select_box_wrapper'>
                        <TrackingInput 
                            trackingType={trackingType} 
                            startDate={startDate}
                            endDate={endDate} 
                            recurring={recurring}
                            setRecurring={setRecurring}
                            trackingValue={trackingValue}
                            setTrackingValue={setTrackingValue}
                            frequency={frequency}
                            // applyRecurring={applyRecurring}
                            goalType={goalType}
                            setGoalType ={setGoalType}
                        />
                    </div>
                </div>
                {/* end Tracking metric */}

                </Card.Body>
                {/* end card body */}
                <Card.Footer>
                        <Button
                            onClick={previous}
                            className='cnx_ins__goal_modal__card_footer_cancel'
                            variant='tertiary'
                        >
                            <i className="fa-solid fa-chevron-left" />
                            Previous
                        </Button>

                    <div className='cnx_ins__goal_modal__card_footer'>
                        <Button
                            onClick={close}
                            className='cnx_ins__goal_modal__card_footer_cancel'
                            variant='tertiary'
                        >Cancel</Button>


                        {
                            formStatus === 'idle' ? (
                                <Button 
                                    onClick={handleOnSubmit}
                                    disabled={ !isFormDataValid() }  
                                    variant='success'
                                >
                                    Save
                                </Button>
                            ): formStatus === 'saving' ? (
                                <Button 
                                    disabled={ !trackingValue }  
                                    variant='success'
                                >
                                    Saving...
                                </Button>
                            ) : formStatus === 'saved' ? (
                                <Button 
                                    disabled={ !trackingValue }  
                                    variant='success'
                                >
                                    Saved
                                </Button>
                            ) : null
                        }
                    </div>
                </Card.Footer>
            </Card>
        </div> 
    )
}


export default GoalEditModal;






// props types 

// AssigneeFor.propTypes = {
//     assigneeFor: PropsTypes.object.isRequired,
//     setAssigneeFor: PropsTypes.func.isRequired,
//     assigneeType: PropsTypes.string.isRequired,
// }


// PipelineSelect.propTypes = {
//     pipeline: PropsTypes.array.isRequired,
//     setPipeline: PropsTypes.func.isRequired,
//     multiple: PropsTypes.bool.isRequired,
// }

// Frequency.propTypes = {
//     frequency: PropsTypes.string.isRequired,
//     setFrequency: PropsTypes.func.isRequired,
// }

// DealType.propTypes = {
//     dealType: PropsTypes.string.isRequired,
//     setDealType: PropsTypes.func.isRequired,
// }


// GoalType.propTypes = {
//     goalType: PropsTypes.string.isRequired,
//     setGoalType: PropsTypes.func.isRequired,
// }



// TrackingInput.propTypes = {
//     endDate: PropsTypes.any,
//     startDate: PropsTypes.instanceOf(Date).isRequired,
//     trackingType: PropsTypes.string.isRequired,
//     recurring: PropsTypes.array.isRequired,
//     setRecurring: PropsTypes.func.isRequired,
//     trackingValue: PropsTypes.string.isRequired,
//     setTrackingValue: PropsTypes.func.isRequired,
//     frequency: PropsTypes.string.isRequired,
//     goalType: PropsTypes.string.isRequired,
//     setGoalType: PropsTypes.func.isRequired,
// }

// Period.propTypes = {
//     period: PropsTypes.object.isRequired,
//     recurringValue: PropsTypes.array.isRequired,
//     setRecurringValue: PropsTypes.func.isRequired,
//     trackingType: PropsTypes.string.isRequired,
// }

// Qualified.propTypes = {
//     qualified: PropsTypes.string.isRequired,
//     setQualified: PropsTypes.func.isRequired,
// }