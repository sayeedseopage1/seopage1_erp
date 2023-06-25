
import React from 'react'
import Button from '../../components/Button'
import InnerComment from './InnerComment'

const CommentPreview = ({isOpen, close}) => {
  return (
    <div className='sp1_st_comment_preview'>
        <div className='sp1_st_comment_panel'> 
            <div className='border-bottom pb-2 d-flex align-items-center'>
                
                <Button
                    aria-label="close-modal"
                    className='_close-modal'
                    onClick={close}
                >
                    <i className="fa-solid fa-xmark" />
                </Button>
            </div> 


            {/* comment */}
            <div className='_comment_list mt-3'>
                <InnerComment/>
            </div>

        </div>
    </div>
  )
}

export default CommentPreview