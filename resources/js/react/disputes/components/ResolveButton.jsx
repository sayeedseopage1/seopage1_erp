import _ from 'lodash';
import React from 'react'
import './Resolvebutton.css';
import Modal from '../../global/Modal';
import Button from '../../global/Button';
import Avatar from '../../global/Avatar';
import Dropdown from '../../global/Dropdown';
import SubmitButton from '../../global/SubmitButton';
import DebounceInput from '../../global/form/DebounceInput';



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
  
 


const ResolveButton = () => {
  const [showModal, setShowModal] = React.useState(false); 

//   form
  const [hasQuestion, setHasQuestion] = React.useState(false);
  const [finishedPartial, setFinishedPartial] = React.useState(false);
  const [winner, setWinner] = React.useState(null);
  const [questions, dispatch] = React.useReducer(reducer, []);
  const [questionFor, setQuestionFor] = React.useState(null);

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
        dispatch({type: 'UPDATE_USER', user, id: question_id})
  } 

  return (
   <React.Fragment>
        <button onClick={() => setShowModal(true)} className='resolve-btn solved'>
            Resolved
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
                    <div className="sp1_modal-body sp1_task_create_modal_body">
                        <div className="px-3">
                            <div className='alert alert-info'>
                                This dispute is between project manager <a href="#" className='badge badge-info'>Farhan Rahman</a> and lead developer <a href='#' className='badge badge-info'> Moniruzzaman </a> and was initiated on <a href='#' className='badge badge-info'>18th August 2023 03:55:54 PM</a>
                            </div>

                            {/* tab */}

                           <div className="sp1-item-center">
                                <ul className="nav" style={{gap: '10px'}}>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link badge badge-secondary py-1 px-3">Project Dashboard</a>
                                    </li>

                                    <li className="nav-item">
                                        <a href="#" className="nav-link badge badge-secondary py-1 px-3">Deliverables</a>
                                    </li>

                                    <li className="nav-item">
                                        <a href="#" className="nav-link badge badge-secondary py-1 px-3">Task</a>
                                    </li>

                                    <li className="nav-item">
                                        <a href="#" className="nav-link badge badge-secondary py-1 px-3">Subtasks</a>
                                    </li>

                                    <li className="nav-item">
                                        <a href="#" className="nav-link badge badge-secondary py-1 px-3">Task List</a>
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
                                                    src=""
                                                    alt=""
                                                    name="Farhan Rahman"
                                                    type='circle'
                                                    width={32}
                                                    height={32}
                                                    fontSize='1.2rem'
                                                />

                                                <div className='px-2'>
                                                    <span className="d-block">Farhan Rahman</span>
                                                    <span className='d-block f-10' style={{color: '#777', marginTop: '-0.30rem'}}>Project Manager</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='py-2'>Reason:</td>
                                        <td className='px-3 py-2'>
                                            The team lead/project coordinator’s delivered work doesn’t match my shared requirement
                                        </td>
                                    </tr>
    

                                    <tr>
                                        <td className='py-2'>Explanation:</td>
                                        <td className='px-3 py-2'>
                                            Tincidunt fusce per velit odio semper viverra sapien nam interdum, risus praesent commodo ut quis sollicitudin laoreet nulla euismod mollis, mattis enim augue imperdiet sagittis rhoncus mi placerat. Gravida feugiat aenean tempus metus mus fusce sollicitudin.
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='py-2'>Submitted Answer:</td>
                                        <td className='px-3 py-2'> 
                                            <div className='d-flex flex-column' style={{gap: '16px'}}>
                                                {_.times(3, index => (
                                                    <div key={index} className='d-flex flex-column' style={{gap: 6}}>
                                                        <div className="pl-3" > 
                                                            <span className='badge badge-primary'>Question 0{index+1}:</span> 
                                                            <span className='px-2 font-weight-bold'>Convallis cursus tellus felis quis aliquet odio tempor quam ornare?</span> 
                                                            <span className='d-block ml-auto question-by f-12' > - Mohammad Sayeed Ullah on 14 August 2023 03:43:43 PM</span>
                                                        </div>

                                                        <div className='p-3' style={{background: '#f8f8f8'}}>
                                                            <span className='badge badge-success '>Answer:</span> 
                                                            <span className='px-2'> Hac dapibus congue sociosqu tincidunt cum tempus tristique eget, sociis curae viverra ac nulla lobortis justo a ultrices, tempor iaculis et massa risus sed sagittis. Ultricies maecenas diam suspendisse suscipit nullam integer rhoncus cursus.</span> 
                                                        </div>
                                                    </div> 
                                                ))} 
                                            </div>
                                        </td>
                                    </tr>
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
                                                    src=""
                                                    alt=""
                                                    name="Moniruzzaman"
                                                    type='circle'
                                                    width={32}
                                                    height={32}
                                                    fontSize='1.2rem'
                                                />

                                                <div className='px-2'>
                                                    <span className="d-block">Moniruzzaman</span>
                                                    <span className='d-block f-10' style={{color: '#777', marginTop: '-0.30rem'}}>Lead Developer</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>  

                                    <tr>
                                        <td className='py-2'>Reason:</td>
                                        <td className='px-3 py-2'>
                                            The team lead/project coordinator’s delivered work doesn’t match my shared requirement
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='py-2'>Explanation:</td>
                                        <td className='px-3 py-2'>
                                            Tincidunt fusce per velit odio semper viverra sapien nam interdum, risus praesent commodo ut quis sollicitudin laoreet nulla euismod mollis, mattis enim augue imperdiet sagittis rhoncus mi placerat. Gravida feugiat aenean tempus metus mus fusce sollicitudin.
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='py-2'>Submitted Answer:</td>
                                        <td className='px-3 py-2'> 
                                            <div className='d-flex flex-column' style={{gap: '16px'}}>
                                                {_.times(3, index => (
                                                    <div key={index} className='d-flex flex-column' style={{gap: 6}}>
                                                        <div className="pl-3"> 
                                                            <span className='badge badge-primary'>Question 0{index+1}:</span> 
                                                            <span className='px-2 font-weight-bold'>Convallis cursus tellus felis quis aliquet odio tempor quam ornare?</span> 
                                                            <span className='d-block ml-auto question-by f-12' > - Mohammad Sayeed Ullah on 14 August 2023 03:43:43 PM</span>
                                                        </div>

                                                        <div className='p-3' style={{background: '#f8f8f8'}}>
                                                            <span className='badge badge-success '>Answer:</span> 
                                                            <span className='px-2'> Hac dapibus congue sociosqu tincidunt cum tempus tristique eget, sociis curae viverra ac nulla lobortis justo a ultrices, tempor iaculis et massa risus sed sagittis. Ultricies maecenas diam suspendisse suscipit nullam integer rhoncus cursus.</span> 
                                                        </div>
                                                    </div>  
                                                ))} 
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> 

                            {/* devider */}
                            <div className='mt-3 pb-2 py-2 position-relative'>
                                <hr/>
                                <span className='badge badge-secondary divider-text'>Authorize</span>
                            </div>

                            {/* authorize details */}
                            {/* Response details */}
                            <table className='dispute-preview-table'> 

                                {/* question */}
                               <tbody>
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
                                                                    <Dropdown.Toggle className="font-weight-bold py-2 px-3 border rounded-sm toggle-light"> { question.user || questionFor || 'Click to select user'} </Dropdown.Toggle> 
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={() => askQuestionTo('Farhan Rahman', question.id)}>
                                                                            Farhan Rahman
                                                                            {/* <i className='fa-solid fa-check ml-2'/> */}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => askQuestionTo('Moniruzzaman', question.id)}>
                                                                            Moniruzzaman
                                                                            {/* <i className='fa-solid fa-check ml-2'/> */}
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
                                                                            console.log({questions})
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


                                {!hasQuestion && 
                                        <React.Fragment>
                                            {/* winner */}
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
                                                                <Dropdown.Item>
                                                                    Farhan Rahman
                                                                    {/* <i className='fa-solid fa-check ml-2'/> */}
                                                                </Dropdown.Item>
                                                                <Dropdown.Item>
                                                                    Moniruzzaman
                                                                    {/* <i className='fa-solid fa-check ml-2'/> */}
                                                                </Dropdown.Item>
                                                                <Dropdown.Item 
                                                                    onClick={() => setFinishedPartial(true)}
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
                                                                    <span className="input-group-text f-14">Farhan Rahman</span>
                                                                </div>
                                                                <input 
                                                                    type="number" 
                                                                    className="form-control"
                                                                    placeholder='50'
                                                                    min={0}
                                                                    max={100}
                                                                    style={{minWidth: '80px'}}
                                                                />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>

                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text f-14" >Moniruzzaman</span>
                                                                </div>
                                                                <input 
                                                                    type="number" 
                                                                    className="form-control" 
                                                                    placeholder='50' 
                                                                    min={0}
                                                                    max={100}
                                                                    style={{minWidth: '80px'}}
                                                                />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    </td>
                                                </tr>
                                                
                                                {/* Reason */}
                                                <tr>
                                                    <td className='py-2'>
                                                    <span className='pt-2 d-block'>Reason: </span> 
                                                    </td>
                                                    <td className='px-3 py-2'>
                                                        <textarea 
                                                            rows={4} 
                                                            className='form-control p-2 f-14'
                                                            placeholder='Explain why you select partial!'
                                                        />
                                                    </td>
                                                </tr>
                                        </React.Fragment>
                                }

                               </tbody>
                            </table> 
                    

                            {/* submition button */}
                            
                            <div className='w-100 d-flex align-items-center justify-end pt-3 mb-4'>
                                <SubmitButton variant="success" title="Resolve" className="mr-2 ml-auto" />
                                <Button className='mr-3'> Close </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
   </React.Fragment>
  )
}

export default ResolveButton