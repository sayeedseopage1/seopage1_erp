
import React from 'react'
import Button from '../../components/Button'
import InnerComment from './InnerComment'

const CommentPreview = () => {
  return (
    <div className='sp1_st_comment_preview'>
        <div className='sp1_st_comment_panel'> 
            <Button
                aria-label="close-modal"
                className='_close-modal'
            >
                <i className="fa-solid fa-xmark" />
            </Button> 


            {/* comment */}
            <div className='_comment_list'>
                <InnerComment/>
            </div>

        </div>
    </div>
  )
}

export default CommentPreview