import _ from 'lodash';
import React from 'react'
import './Resolvebutton.css';
import Modal from '../../global/Modal';
import Button from '../../global/Button';
import Avatar from '../../global/Avatar';
import Dropdown from '../../global/Dropdown';
import SubmitButton from '../../global/SubmitButton';
import DebounceInput from '../../global/form/DebounceInput';
import { useAskDisputeQuestionMutation, useDisputeAnswerMakeAsReadMutation, useDisputeSubmitToAuthorizationMutation } from '../../services/api/SingleTaskPageApi';
import { useUsers } from '../../hooks/useUsers';
import dayjs from 'dayjs';
import { User } from '../../utils/user-details';
import Loader from '../../global/Loader';



const reducer = (state, action) => {

    const getRandomId = () => {
        return (Math.random() + 1).toString(36).substring(7)
    }

    switch (action.type) {
       case 'ADD_QUESTION':
            return [
                ...state,
                {
                    question: action.question,
                    answer: '',
                    user: action.user ?? '',
                    id: getRandomId()
                }
            ];

        case 'UPDATE_QUESTION':
            return _.map(state, question =>  question.id === action.id ? action.data : question);

        case 'UPDATE_USER':
            return _.map(state, question =>  question.id === action.id ? {...question, user: action.user} : question);

        case "REMOVE_QUESTION":
            return state.filter(question => question.id !== action.id);

        case 'CLEAR':
            return state = [];

        default:
            return state
    }
  };




const ResolveButton = ({row, table}) => {
  const [showModal, setShowModal] = React.useState(false);
  const {users, getUserById, usersIsFetching} = useUsers();
  const [conversations, setConversations] = React.useState([]);

//   form
  const [hasQuestion, setHasQuestion] = React.useState(false);
  const [finishedPartial, setFinishedPartial] = React.useState(false);
  const [winner, setWinner] = React.useState(null);
  const [raisedByPercent, setRaisedByPercent] = React.useState(50);
  const [raisedAgainstPercent, setRaisedAgainstPercent] = React.useState(50);
  const [questions, dispatch] = React.useReducer(reducer, []);
  const [questionFor, setQuestionFor] = React.useState(null);
  const [resolveComment, setResolveComment] = React.useState('');
  const [needAuthorization, setNeedAuthorization] = React.useState(false);
  const [edit, setEdit] = React.useState(true);

  const {updateDisputeConversation, updateDisputeById} = table.getState();


  const auth = new User(window?.Laravel?.user);
  const [disputeAnswerMakeAsRead, {isLoading}] = useDisputeAnswerMakeAsReadMutation();


// DEFAULT INITIAL
    React.useEffect(() => {
    setConversations(row?.conversations);
    if(row?.need_authrization){
        setFinishedPartial(true);
        setRaisedAgainstPercent(row?.raised_against_percent);
        setRaisedByPercent(row?.raised_by_percent);
        setNeedAuthorization(row?.need_authrization);
        setEdit(false);
    }
  }, [])


  const close = () => {
    setShowModal(false);
    setHasQuestion(false);
    setFinishedPartial(false);
  };

  // handle add question
  const addQuestion = () => {
    dispatch({ type: 'ADD_QUESTION', question: '', user: questionFor ?? '' })
  }

  // remove question
  const removeQuestion = (id) => {
    dispatch({type: 'REMOVE_QUESTION', id })
  }

  // update question
  const updateQuestion = ({id, data}) => {
    dispatch({type: 'UPDATE_QUESTION', id, data})
  }

  // clear question
  const clearQuestions = () => { dispatch({type: 'CLEAR'}) }

  // ask question
  const askQuestionTo = (user, question_id) => {
        setQuestionFor(user);
        dispatch({type: 'UPDATE_USER', user, id: question_id})
  }
  // submitQuestion
  const [askDisputeQuestion, {isLoading:questionSubmitting}] = useAskDisputeQuestionMutation();

  const handleQuestionSubmittion = async () => {
    const data = {
        questions: _.map(questions, q => ({
            question: q.question,
            question_for: q?.user?.id,
            raised_by: window?.Laravel?.user.id,
            dispute_id: row?.id
        })),
        raised_by: window?.Laravel?.user.id,
        dispute_id: row?.id
    }
    try{
        const res = await askDisputeQuestion(data).unwrap();
        updateDisputeConversation({disputeId:row?.id, conversations: res?.data});
        setConversations(res?.data);
        close();
    }catch(err){
        console.log(err)
    }
  }

//   UPDATE ANSWER READ STATUS
const answerStatus = async() => {
    if(row && _.size(row?.conversations) > 0){
        try{
            const res = await disputeAnswerMakeAsRead({
                questions: row?.conversations
            }).unwrap();

            updateDisputeConversation({disputeId:row?.id, conversations: res?.data});
            setConversations(res?.data);
        }catch(err){
            console.log(err)
        }
    }
}

  const resolvedBy = new User(getUserById(row?.resolved_by?.id));




  const [disputeSubmitToAuthorization, {isLoading: submittingToAuthorization}] = useDisputeSubmitToAuthorizationMutation();
  const handleSubmitForAuthorization = async () =>{
        if(finishedPartial && !row?.need_authrization){
            const data = {
                resolve_comment: resolveComment,
                need_authrization: needAuthorization,
                raised_by_percent: raisedByPercent,
                raised_against_percent: raisedAgainstPercent,
                resolve_by: window?.Laravel?.user?.id,
                dispute_id: row?.id,
                task_id: row?.task_id,
                authorized: false,
            }

            try{
                const res = await disputeSubmitToAuthorization(data).unwrap();
                console.log(res)
                updateDisputeById({
                    disputeId: row?.id,
                    data: _.head(res)
                });
            }catch(err){
                console.log(err)
            }
        }else{
            const data = {
                resolve_comment: row?.need_authrization ? row?.resolve_comment : resolveComment,
                need_authrization: needAuthorization,
                raised_by_percent: raisedByPercent,
                raised_against_percent: raisedAgainstPercent,
                resolve_by: row?.need_authrization ? row?.resolved_by?.id :window?.Laravel?.user?.id,
                dispute_id: row?.id,
                authorized: true,
                task_id: row?.task_id,
                authorized_by: row?.need_authrization ? window?.Laravel?.user?.id : null,
                winner: winner?.id ?? null,
                authorize_comment: row?.need_authrization ? resolveComment : null,
            }

            try{
                const res = await disputeSubmitToAuthorization(data).unwrap();
                updateDisputeById({
                    disputeId: row?.id,
                    data: _.head(res)
                });
            }catch(err){
                console.log(err)
            }
        }
  }


  const task = row?.task?.parent_task ?? row?.task;
  const resolved = row?.status;



  return (
   <React.Fragment>
        <button onClick={() => {
            answerStatus();
            setShowModal(true);
        }} className={`resolve-btn ${resolved ? 'solved': ''}`}>
            {resolved ? 'View': 'Resolve'}
        </button>

        <Modal isOpen={showModal}>
            <div className="sp1_modal-content-wrapper" >
                <div className="sp1_modal-panel sp1_task_create_modal_panel w-100">
                    {/* header */}
                    <div className="sp1_modal-head">
                        <div className="sp1_modal-title">
                            <strong>Dispute Resolve Form</strong>
                        </div>
                        <Button
                            onClick={close}
                            aria-label="ModalClose"
                            variant="tertiary"
                            className="sp1_modal-close"
                        >
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>
                    {/* end header */}

                    {/* body */}
                    <div
                        className="sp1_modal-body sp1_task_create_modal_body"
                        style={{maxHeight: 'calc(100vh - 110px)', overflowY: 'auto'}}
                    >
                        <div className="px-3">
                            <div className='alert alert-info'>
                                This dispute is between project manager <a href="#" className='badge badge-info'>Farhan Rahman</a> and lead developer <a href='#' className='badge badge-info'> Moniruzzaman </a> and was initiated on <a href='#' className='badge badge-info'>18th August 2023 03:55:54 PM</a>
                            </div>

                            {/* tab */}

                           <div className="sp1-item-center">
                                <ul className="nav" style={{gap: '10px'}}>
                                    <li className="nav-item">
                                        <a href={`/account/projects/${row.project_id}`} className="nav-link badge badge-secondary py-1 px-3">Project Dashboard</a>
                                    </li>

                                    <li className="nav-item">
                                        <a href={`/account/projects/${row.project_id}?tab=deliverables`} className="nav-link badge badge-secondary py-1 px-3">Deliverables</a>
                                    </li>

                                    <li className="nav-item">
                                        <a href={`/account/tasks/${task.id}`} className="nav-link badge badge-secondary py-1 px-3">Task</a>
                                    </li>

                                    {row?.task?.parent_task &&
                                        <li className="nav-item">
                                            <a href={`/account/tasks/${row?.task?.id}`} className="nav-link badge badge-secondary py-1 px-3">Subtasks</a>
                                        </li>
                                    }

                                    <li className="nav-item">
                                        <a href={`/account/projects/${row.project_id}?tab=tasks`} className="nav-link badge badge-secondary py-1 px-3">Task List</a>
                                    </li>
                                </ul>
                           </div>

                            {/* devider */}
                            <div className='mt-3 pb-2 py-2 position-relative'>
                                <hr/>
                                <span className='badge badge-secondary divider-text'>
                                        {row?.dispute_between === 'CPR'  && 'Clients'}
                                        {row?.dispute_between === 'SPR'  && 'Sales'}
                                        {row?.dispute_between === 'PLR' && 'Project Manager'}
                                        {row?.dispute_between === 'LDR' && 'Lead Developer'}
                                </span>
                            </div>

                            {/* Revision details */}
                            <table className='dispute-preview-table'>
                                <tbody>
                                    <tr>
                                        <td className='whitespace-nowrap py-2'>Revision Given By:</td>
                                        <td className='py-2 px-3'>
                                            <div className='d-flex align-items-center'>
                                                <Avatar
                                                    src={row?.raised_against?.image ? `/user-uploads/avatar/${row?.raised_against?.image}` : null}
                                                    alt={row?.raised_against?.name}
                                                    name={row?.raised_against?.name}
                                                    type='circle'
                                                    width={32}
                                                    height={32}
                                                    fontSize='1.2rem'
                                                />

                                                <div className='px-2'>
                                                    <span className="d-block">{row?.raised_against?.name}</span>
                                                    <span className='d-block f-10' style={{color: '#777', marginTop: '-0.30rem'}}>
                                                        {row?.raised_against?.designation}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                   {
                                        _.includes(['SPR', "CPR"], row?.dispute_between) ? null :
                                        <>
                                             <tr>
                                                <td className='py-2'>Reason:</td>
                                                <td className='px-3 py-2 '>
                                                    {row?.revision_acknowledgement}
                                                </td>
                                            </tr>


                                            <tr>
                                                <td className='py-2'>Explanation:</td>
                                                <td className='px-3 py-2'>
                                                    <div className='sp1_ck_content' dangerouslySetInnerHTML={{__html: row?.pm_comment ?? row?.lead_comment }} />
                                                </td>
                                            </tr>

                                            {_.size(_.filter(conversations, conv => conv.question_for === row?.raised_against?.id)) ?
                                                <tr>
                                                    <td className='py-2'>Submitted Answer:</td>
                                                    <td className='px-3 py-2'>
                                                        <div className='d-flex flex-column' style={{gap: '16px'}}>
                                                            {_.map([..._.filter(conversations, c => c.question_for === row?.raised_against?.id)], (conv, index) => {

                                                            const raised_by = new User(getUserById(conv?.raised_by));
                                                            const replied_by = new User(getUserById(conv?.replied_by));


                                                            return (
                                                                <div key={index} className='d-flex flex-column' style={{gap: 6}}>
                                                                    <div className="pl-3" >
                                                                        <span className='badge badge-primary'>Question 0{index+1}:</span>
                                                                        <span className='px-2 font-medium'>{conv?.question}</span>
                                                                        <span className='d-block text-right question-by f-12' > -by <a href={raised_by.getUserLink()}>{raised_by?.getName()}</a> on {dayjs(conv?.created_at).format('MMM DD, YYYY')} at {dayjs(conv?.created_at).format('hh:mm a')}</span>
                                                                    </div>

                                                                    <div className='p-3 position-relative' style={{background: '#f8f8f8'}}>
                                                                        <div className=''>
                                                                            <p className=''>
                                                                                <span className='badge badge-success d-inline mr-1'>Answer:</span>
                                                                                {conv?.replies ?? 'Not answered yet!'}
                                                                            </p>
                                                                            {
                                                                                conv?.replies &&
                                                                                <div>
                                                                                    <span className='question-by f-12'> - by <a href={replied_by.getUserLink()}>{replied_by?.getName()}</a> on {dayjs(conv?.replied_date).format('MMM DD, YYYY')} at {dayjs(conv?.replied_date).format('hh:mm a')}</span>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr> : null
                                            }
                                        </>
                                   }

                                </tbody>
                            </table>

                            {/* devider */}
                            <div className='mt-3 pb-2 py-2 position-relative'>
                                <hr/>
                                <span className='badge badge-secondary divider-text'>
                                    {row?.dispute_between === 'CPR'  && 'Project Manager'}
                                    {row?.dispute_between === 'SPR'  && 'Project Manager'}
                                    {row?.dispute_between === 'PLR' && 'Lead Developer'}
                                    {row?.dispute_between === 'LDR' && 'Developer'}
                                </span>
                            </div>

                            {/* Response details */}
                            <table className='dispute-preview-table'>
                                <tbody>
                                    <tr>
                                        <td className='whitespace-nowrap py-2'>Denied by:</td>
                                        <td className='py-2 px-3'>
                                            <div className='d-flex align-items-center'>
                                                <Avatar
                                                    src={row?.raised_by?.image ? `/user-uploads/avatar/${row?.raised_by?.image}` : null}
                                                    alt={row?.raised_by?.name}
                                                    name={row?.raised_by?.name}
                                                    type='circle'
                                                    width={32}
                                                    height={32}
                                                    fontSize='1.2rem'
                                                />


                                                <div className='px-2'>
                                                    <span className="d-block">{row?.raised_by?.name}</span>
                                                    <span className='d-block f-10' style={{color: '#777', marginTop: '-0.30rem'}}>Lead Developer</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='py-2'>Reason:</td>
                                        <td className='px-3 py-2'>
                                            {row?.deny_reason}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='py-2'>Explanation:</td>
                                        <td className='px-3 py-2'>
                                        <div className='sp1_ck_content' dangerouslySetInnerHTML={{__html: row?.dev_comment ?? row?.lead_comment }} />
                                        </td>
                                    </tr>

                                    {_.size(_.filter(conversations, conv => conv.question_for === row?.raised_by?.id)) ?
                                        <tr>
                                            <td className='py-2'>Submitted Answer:</td>
                                            <td className='px-3 py-2'>
                                                <div className='d-flex flex-column' style={{gap: '16px'}}>
                                                    {_.map(_.filter(conversations, conv => conv.question_for === row?.raised_by?.id), (conv, index) => {
                                                    const raised_by = new User(getUserById(conv?.raised_by));
                                                    const replied_by = new User(getUserById(conv?.replied_by));


                                                    return (
                                                        <div key={index} className='d-flex flex-column' style={{gap: 6}}>
                                                            <div className="pl-3" >
                                                                <span className='badge badge-primary'>Question 0{index+1}:</span>
                                                                <span className='px-2 font-medium'>{conv?.question}</span>
                                                                <span className='d-block text-right question-by f-12' > -by <a href={raised_by.getUserLink()}>{raised_by?.getName()}</a> on {dayjs(conv?.created_at).format('MMM DD, YYYY')} at {dayjs(conv?.created_at).format('hh:mm a')}</span>
                                                            </div>

                                                            <div className='p-3' style={{background: '#f8f8f8'}}>
                                                                <div className=''>
                                                                    <p>
                                                                        <span className='badge badge-success d-inline mr-1'>Answer:</span>
                                                                        {conv?.replies ?? 'Not answered yet!'}
                                                                    </p>

                                                                    {
                                                                        conv?.replies &&
                                                                        <div>
                                                                            <span className='question-by f-12'> - by <a href={replied_by.getUserLink()}>{replied_by?.getName()}</a> on {dayjs(conv?.replied_date).format('MMM DD, YYYY')} at {dayjs(conv?.replied_date).format('hh:mm a')}</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                        </tr> : null
                                    }
                                </tbody>
                            </table>

                            {/* devider */}
                            <div className='mt-3 pb-2 py-2 position-relative'>
                                <hr/>
                                <span className='badge badge-secondary divider-text'>Resolve</span>
                            </div>


                            {/* authorize details */}
                            {/* Response details */}

                            <table className='dispute-preview-table'>

                                {/* question */}
                               <tbody>
                                {(row?.need_authrization || row?.status) ?
                                    <React.Fragment>
                                         <tr>
                                            <td className='py-2'>
                                                <span className=' py-2 d-block'>Resolve By: </span>
                                            </td>

                                            <td className='px-3 py-2 w-100'>
                                                <div className='d-flex align-items-center'>
                                                    <Avatar
                                                        src={resolvedBy?.getAvatar()}
                                                        alt={resolvedBy?.getName()}
                                                        name={resolvedBy?.getName()}
                                                        type='circle'
                                                        width={32}
                                                        height={32}
                                                        fontSize='1.2rem'
                                                    />

                                                   <div className='px-2  py-2 '>
                                                        <span className="d-block">{resolvedBy?.getName()}</span>
                                                        <span className='d-block f-10' style={{color: '#777', marginTop: '-0.30rem'}}>
                                                            {resolvedBy?.getDesignationName()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className=' py-2 '>
                                                <span className='d-block'>The Winner: </span>
                                            </td>


                                            {row?.winner ?
                                                <div className='d-flex align-items-center'>
                                                    <div className='px-2  py-2 '>
                                                        <span className="d-block font-weight-bold">{row?.winner?.name}</span>
                                                    </div>
                                            </div> :

                                            <td className='px-3 w-100  py-2 '>
                                                <div className='position-relative w-100'>
                                                    <div>{row?.raised_by?.name} : {raisedByPercent}%</div>
                                                    <div>{row?.raised_against?.name} : {raisedAgainstPercent}%</div>

                                                    {!row?.status ?
                                                    <button onClick={() => setEdit(true)} className='dispute-edit-btn'>
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                </button> : null}
                                                </div>
                                            </td>
                                            }
                                        </tr>

                                        <tr>
                                            <td className='py-2'>
                                                <span className='d-block'>Comment: </span>
                                            </td>

                                            <td className='px-3 py-2'>
                                                {row?.resolve_comment}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                    :
                                    <tr>
                                        <td className='py-2'>
                                            Do you have any other questions?
                                        </td>
                                        <td className='px-3 py-2 vertical-center w-100' >
                                            <div className='d-flex align-items-center'>
                                                <div className='form-check form-check-inline'>
                                                    <input
                                                        type='radio'
                                                        name='authrize_question'
                                                        className='form-check-input'
                                                        value="yes"
                                                        onChange={() => {
                                                            addQuestion();
                                                            setHasQuestion(true);
                                                        }}
                                                    />
                                                    <label className='form-check-label'>
                                                        Yes
                                                    </label>
                                                </div>

                                                <div className='form-check form-check-inline'>
                                                    <input
                                                        type='radio'
                                                        name='authrize_question'
                                                        className='form-check-input'
                                                        value="no"
                                                        defaultChecked={true}
                                                        onChange={() => {
                                                            setHasQuestion(false);
                                                            clearQuestions();
                                                        }}
                                                    />
                                                    <label className='form-check-label'>
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                            {/* add question */}

                                            {hasQuestion &&
                                                <div>
                                                    {_.map(questions, (question, index) => (
                                                        <div key={question.id} className='mt-3 w-100'>
                                                            <div className='d-flex align-items-center' style={{gap: '10px'}}>
                                                                <Dropdown>
                                                                    <Dropdown.Toggle className="font-weight-bold py-2 px-3 border rounded-sm toggle-light">
                                                                        { question?.user?.name || questionFor?.name || 'Click to select user'}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={() => askQuestionTo(row?.raised_by, question.id)}>
                                                                            {row?.raised_by?.name}
                                                                            {question?.user?.id === row?.raised_by?.id ||
                                                                            questionFor?.id === row?.raised_by?.id ?
                                                                                <i className='fa-solid fa-check ml-2'/>
                                                                            : null}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => askQuestionTo(row?.raised_against, question.id)}>
                                                                            {row?.raised_against?.name}

                                                                            {question?.user?.id === row?.raised_against.id ||
                                                                            questionFor?.id === row?.raised_against.id ?
                                                                                <i className='fa-solid fa-check ml-2'/>
                                                                            : null}
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>

                                                            <div className="form-group w-100 py-2">
                                                                <label htmlFor="" className='d-flex align-items-center justify-content-between'>
                                                                    <span>Q{index + 1}: Write your question here </span>
                                                                    {
                                                                        _.size(questions) > 1 &&
                                                                        <button
                                                                            aria-label='removeQuestion'
                                                                            onClick={() => removeQuestion(question.id)}
                                                                            className='remove-question-btn'
                                                                        >
                                                                            <i className='fa-solid fa-trash'/>
                                                                        </button>
                                                                    }
                                                                </label>
                                                                    <DebounceInput
                                                                        defaultValue={question.question}
                                                                        className="form-control py-2 px-3 w-100"
                                                                        placeholder="Write your question"
                                                                        onChange={(v) => {
                                                                            updateQuestion({
                                                                                id: question.id,
                                                                                data: {...question, question: v}
                                                                            });
                                                                        }}
                                                                    />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            }

                                            { hasQuestion && <button onClick={addQuestion} className='bg-transparent'>+ New Question</button> }

                                            {/* end question adding */}
                                        </td>
                                    </tr>
                                }
                               </tbody>
                            </table>

                            {/* devider */}
                            {row?.need_authrization ? <div className='mt-3 pb-2 py-2 position-relative'>
                                <hr/>
                                <span className='badge badge-secondary divider-text'>Authorize</span>
                            </div>: null}



                            <table className='dispute-preview-table'>
                                <tbody>
                                    {row?.status ?
                                        row?.need_authrization ?
                                        <tr>
                                            <td className='py-2'>
                                                <span className='d-block'>Comment: </span>
                                            </td>

                                            <td className='px-3 py-2'>
                                                {row?.authorize_comment}
                                            </td>
                                        </tr> : null
                                    :!hasQuestion && (
                                        (row?.need_authrization)?
                                        _.includes([1], auth.getRoleId()) ?
                                            <React.Fragment>
                                                {/* winner */}
                                                    {
                                                        edit &&
                                                        <tr>
                                                        <td className='py-2'>
                                                            <span className='pt-2 d-block'>The Winner: </span>
                                                        </td>
                                                        <td className='px-3 py-2 w-100'>
                                                            <Dropdown>
                                                                <Dropdown.Toggle className="py-2 px-3 border rounded-sm toggle-light">
                                                                    {finishedPartial ? 'Partially Responsible': (winner?.name ?? '--')}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={() => {setWinner(row?.raised_by); setFinishedPartial(false)}}>
                                                                        {row?.raised_by?.name}
                                                                        {winner?.id === row?.raised_by?.id && <i className='fa-solid fa-check ml-2'/> }
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => {setWinner(row?.raised_against); setFinishedPartial(false)}}>
                                                                        {row?.raised_against?.name}
                                                                        {winner?.id === row?.raised_against?.id && <i className='fa-solid fa-check ml-2'/> }
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Item
                                                                        onClick={() => {
                                                                            setFinishedPartial(true);
                                                                            setNeedAuthorization(true);
                                                                            setWinner(false);
                                                                        }}
                                                                    >
                                                                        Partially Responsible
                                                                        {finishedPartial && <i className='fa-solid fa-check ml-2'/> }
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>

                                                        {
                                                            finishedPartial &&
                                                            <div className="d-flex align-items-center mt-3" style={{gap: '10px'}}>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text f-14">{row?.raised_by?.name}</span>
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder='50'
                                                                        min={0}
                                                                        max={100}
                                                                        value={raisedByPercent}
                                                                        style={{minWidth: '80px'}}
                                                                        onChange={e=>setRaisedByPercent(e.target.value)}
                                                                    />
                                                                    <div className="input-group-append">
                                                                        <span className="input-group-text">%</span>
                                                                    </div>
                                                                </div>

                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text f-14" >{row?.raised_against?.name}</span>
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder='50'
                                                                        min={0}
                                                                        max={100}
                                                                        value={raisedAgainstPercent}
                                                                        style={{minWidth: '80px'}}
                                                                        onChange={e=>setRaisedAgainstPercent(e.target.value)}
                                                                    />
                                                                    <div className="input-group-append">
                                                                        <span className="input-group-text">%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        </td>
                                                    </tr>
                                                    }

                                                    {/* Reason */}
                                                    <tr>
                                                        <td className='py-2'>
                                                            <span className='pt-2 d-block'>Reason: </span>
                                                        </td>
                                                        <td className='px-3 py-2 w-100'>
                                                            <textarea
                                                                rows={4}
                                                                className='form-control p-2 f-14'
                                                                value={resolveComment}
                                                                onChange={(e) => setResolveComment(e.target.value)}
                                                                placeholder='Explain why you select partial!'
                                                            />
                                                        </td>
                                                    </tr>
                                            </React.Fragment>
                                            :null
                                        :  <React.Fragment>
                                            {/* winner */}
                                                {
                                                    edit &&
                                                    <tr>
                                                    <td className='py-2'>
                                                        <span className='pt-2 d-block'>The Winner: </span>
                                                    </td>
                                                    <td className='px-3 py-2 w-100'>
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="py-2 px-3 border rounded-sm toggle-light">
                                                                {finishedPartial ? 'Partially Responsible': (winner?.name ?? '--')}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => {setWinner(row?.raised_by); setFinishedPartial(false)}}>
                                                                    {row?.raised_by?.name}
                                                                    {winner?.id === row?.raised_by?.id && <i className='fa-solid fa-check ml-2'/> }
                                                                </Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {setWinner(row?.raised_against); setFinishedPartial(false)}}>
                                                                    {row?.raised_against?.name}
                                                                    {winner?.id === row?.raised_against?.id && <i className='fa-solid fa-check ml-2'/> }
                                                                </Dropdown.Item>

                                                                <Dropdown.Item
                                                                    onClick={() => {
                                                                        setFinishedPartial(true);
                                                                        setNeedAuthorization(true);
                                                                        setWinner(false);
                                                                    }}
                                                                >
                                                                    Partially Responsible
                                                                    {finishedPartial && <i className='fa-solid fa-check ml-2'/> }
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>

                                                    {
                                                        finishedPartial &&
                                                        <div className="d-flex align-items-center mt-3" style={{gap: '10px'}}>
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text f-14">{row?.raised_by?.name}</span>
                                                                </div>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder='50'
                                                                    min={0}
                                                                    max={100}
                                                                    value={raisedByPercent}
                                                                    style={{minWidth: '80px'}}
                                                                    onChange={e=>{
                                                                        setRaisedByPercent(e.target.value);
                                                                        setRaisedAgainstPercent( 100 - Number(e.target.value))
                                                                    }}
                                                                />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>

                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text f-14" >{row?.raised_against?.name}</span>
                                                                </div>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder='50'
                                                                    min={0}
                                                                    max={100}
                                                                    value={raisedAgainstPercent}
                                                                    style={{minWidth: '80px'}}
                                                                    onChange={e=>{
                                                                        setRaisedAgainstPercent(e.target.value);
                                                                        setRaisedByPercent( 100 - Number(e.target.value))
                                                                    }}
                                                                />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    </td>
                                                </tr>
                                                }

                                                {row?.need_authrization ?
                                                    _.includes([1], auth?.getRoleId())?
                                                    <tr>
                                                        <td className='py-2'>
                                                            <span className='pt-2 d-block'>Reason: </span>
                                                        </td>
                                                        <td className='px-3 py-2 w-100'>
                                                            <textarea
                                                                rows={4}
                                                                className='form-control p-2 f-14'
                                                                value={resolveComment}
                                                                onChange={(e) => setResolveComment(e.target.value)}
                                                                placeholder='Explain why you select partial!'
                                                            />
                                                        </td>
                                                    </tr>
                                                : null
                                                :<tr>
                                                    <td className='py-2'>
                                                        <span className='pt-2 d-block'>Reason: </span>
                                                    </td>
                                                    <td className='px-3 py-2 w-100'>
                                                        <textarea
                                                            rows={4}
                                                            className='form-control p-2 f-14'
                                                            value={resolveComment}
                                                            onChange={(e) => setResolveComment(e.target.value)}
                                                            placeholder='Explain why you select partial!'
                                                        />
                                                    </td>
                                                </tr>
                                                }
                                        </React.Fragment>
                                    )
                                    }
                                </tbody>
                            </table>


                            {/* submition button */}
                            {(!row?.status && (!row?.need_authrization || (row?.need_authrization && auth?.getRoleId() === 1))) ?
                                <div className='d-flex w-100 '>
                                    <div className='ml-auto d-flex align-items-center justify-end pt-3 mb-4'>
                                        {hasQuestion ?
                                            <SubmitButton
                                                onClick={handleQuestionSubmittion}
                                                variant="success"
                                                title="Submit to ask question"
                                                className="ml-auto"
                                                isLoading={questionSubmitting}
                                            />
                                        :
                                            <SubmitButton
                                                variant="success"
                                                onClick={handleSubmitForAuthorization}
                                                title={(!finishedPartial || row?.need_authrization) ? 'Authorize & Resolve' : 'Send for Authorization'}
                                                className="ml-auto"
                                                isLoading={submittingToAuthorization}
                                            />

                                        }
                                        <Button onClick={close} className='mr-3 ml-2'> Close </Button>
                                    </div>
                            </div>
                            : null}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
   </React.Fragment>
  )
}

export default ResolveButton
