import _ from 'lodash';
import React from 'react'
import './Resolvebutton.css';
import Modal from '../../global/Modal';
import Button from '../../global/Button';
import Avatar from '../../global/Avatar';
import Dropdown from '../../global/Dropdown';
import SubmitButton from '../../global/SubmitButton';
import DebounceInput from '../../global/form/DebounceInput';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../utils/user-details';
import Loader from '../../global/Loader';
import dayjs from 'dayjs';
import { useAnswerDisputeQuestionMutation } from '../../services/api/SingleTaskPageApi';


const reducer = (state=[], action) => {
    switch(action.type){
        case 'INIT_QUESTIONS':
            return state = action.data;

        case 'ANSWER_QUESTION':
            return _.map(state, q =>{
                if(q.id === action.id){
                    return {
                        ...q,
                        replies: action.answer,
                        replied_by: window?.Laravel?.user?.id
                    }
                } 
                return q;
            });
        default:
            return state;
    }
}

const AnsQuestion = ({row, table}) => {
  const {users, getUserById, usersIsFetching} = useUsers();
  const [conversations, setConversations] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);  
  const [questions, dispatch] = React.useReducer(reducer, []); 
  const auth = new User(window?.Laravel?.user);

  const close = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    setConversations(row?.conversations);
    dispatch({type:"INIT_QUESTIONS", data: _.filter(row?.conversations, d => d.replies ? false : true)});
  }, [row])


 // add Answer 
 const addAnswer = ({answer, id}) =>{
    dispatch({type: 'ANSWER_QUESTION', id, answer})
 }
  

  const [answerDisputeQuestion, {isLoading: answering}] = useAnswerDisputeQuestionMutation();
  
  const handleSubmitAnswer = async () => { 
    try{
        const res = await answerDisputeQuestion({questions: questions}).unwrap();
        setConversations(res?.data);
        dispatch({type:"INIT_QUESTIONS", data: _.filter(res?.data, d => d.replies ? false : true)});
    }catch(err){
        console.log(err);
    } 
  }
 
   
  const task = row?.task?.parent_task ?? row?.task; 
  return (
   <React.Fragment>
        <button onClick={() => setShowModal(true)} className='resolve-btn solved'> View </button>

        <Modal isOpen={showModal}>
            <div className="sp1_modal-content-wrapper" >
                <div className="sp1_modal-panel sp1_task_create_modal_panel w-100">
                    {/* header */}
                    <div className="sp1_modal-head">
                        <div className="sp1_modal-title">
                            <strong>Explaine the questions</strong>
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
                                <span className='badge badge-secondary divider-text'>Revision</span>
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

                                    {_.size(_.filter(conversations, conv => conv.question_for === row?.raised_against?.id && conv?.replies)) ? 
                                        <tr>
                                            <td className='py-2'>Submitted Answer:</td>
                                            <td className='px-3 py-2'> 
                                                <div className='d-flex flex-column' style={{gap: '16px'}}>
                                                    {_.map([..._.filter(conversations, c => c.question_for === auth?.getId() && c?.replies)], (conv, index) => {
                                                    
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
                                <span className='badge badge-secondary divider-text'>Response</span>
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

                                    {_.size(_.filter(conversations, conv => conv.question_for === row?.raised_by?.id && conv?.replies)) ? 
                                        <tr>
                                            <td className='py-2'>Submitted Answer:</td>
                                            <td className='px-3 py-2'> 
                                                <div className='d-flex flex-column' style={{gap: '16px'}}>
                                                    {_.map(
                                                        _.filter(
                                                            conversations, 
                                                            c => c.question_for === auth?.getId() && c?.replies), 
                                                        (conv, index) => {
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
                        </div>

                        
                            


                      {usersIsFetching ? <Loader title='loading...' /> : 
                        <>
                            <div className="d-flex flex-column py-3 px-5 " style={{gap: '16px'}}>
                                {_.size(_.filter(conversations, c => (c.replies || c.question_for !== auth?.getId()) ? false : true)) > 0 && 
                                <>
                                    {/* devider */}
                                    <div className='mt-3 pb-2 py-2 position-relative'>
                                        <hr/>
                                        <span className='badge badge-secondary divider-text'>New Questions & Answer</span>
                                    </div>
                                    {_.map(_.filter(conversations, c => (c.replies || c.question_for !== auth?.getId()) ? false : true), (question, i) => (
                                        <div className='form-group' key={i}>
                                            <label className="mb-2 d-flex">
                                                <span className='d-block mr-2 font-weight-bold text-primary'>Q{i+1}.</span>
                                                <span className='d-block'>
                                                    <span className='d-block f-16'> <strong>{question?.question}</strong> </span>
                                                    <span style={{color: '#999'}}><a href={`account/employees/${question?.raised_by}`} className='f-14' style={{color: '#999'}}> - {getUserById(question?.raised_by)?.name}</a> - {dayjs(question?.created_at).format('MMM DD, YYYY')} </span>
                                                </span>
                                            </label> 
                                            <div className='w-auto px-4 mx-1'>
                                                <DebounceInput
                                                    className="form-control py-2 px-3 w-100" 
                                                    placeholder="Explaine here..."
                                                    rows={3}
                                                    onChange={(v) => addAnswer({answer:v, id: question.id})} 
                                                />
                                            </div>
                                        </div>
                                    ))}
        
                                    <div className='w-100 d-flex align-items-center justify-end pt-3 pb-2'>
                                        <Button className='ml-auto mr-2' onClick={close}> Close </Button>
                                        <SubmitButton onClick={handleSubmitAnswer} variant="success" title="Submit" className="" isLoading={answering} />
                                    </div>
                                </>}
                            </div> 
                        </>
                      }
                      </div>  
                </div>
            </div>
        </Modal>
   </React.Fragment>
  )
}

export default AnsQuestion