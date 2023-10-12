import {Placeholder} from '../../../global/Placeholder';

const InnerCommentLoader = () => {
  return (
    <div className='sp1_task_comment_send_box sp1_task_comment_replied pl-2 pb-2' > 
        <div className='__send-box flex-column align-items-start' style={{maxWidth: '100%'}}>
            <div className='d-flex align-items-center'>
                <div className='mr-2'>
                    <div className='rounded-circle'>
                        <Placeholder
                            width="32px"
                            height="32px"
                            type='circle'
                            className='rounded-circle'
                        />
                    </div> 
                </div> 
                <div>
                    <Placeholder width='140px' />
                    <Placeholder width='80px' height="10px" className='mt-2' />
                </div>
            </div>

            <div className='__box __reply_text w-100 my-1 text-dark'>
                <Placeholder width="100%" className="mb-2" />
                <Placeholder width="100%" className="mb-2" />
                <Placeholder width="50%" className="mb-2" /> 
            </div>
        </div>
    </div>
  )
}

export default InnerCommentLoader;