import * as React from 'react'
import CKEditorComponent from '../../../ckeditor';
import Button from '../../components/Button';
import EmojiPicker, {Emoji, EmojiStyle} from 'emoji-picker-react';
import Dropdown from '../../components/Dropdown';


const data = [
    {
        replies: [
            {replies: []},
            {replies: [
                {replies: []}
            ]},
        ]
    },
    {
        replies: [
            {replies: []},
            {replies: []},
            {replies: [
                { replies: [{replies: []}]}
            ]},
        ]
    }
]



const InnerComment = ({replies=data}) => {
    const [showReplies, setShowReplies] = React.useState(false);
    const [replyMode, setReplyMode] = React.useState(false);
    const [selectedEmoji, setSelectedEmoji] = React.useState('');


    const handleReplyButtonClick = (e) => {
        e.preventDefault();
        setReplyMode(true);
    }


    // emoji selection control
    const handleEmojiSelect = (emojiData, event) => {
        setSelectedEmoji(emojiData.unified)
    }


  return (
    <div className='sp1_task_comment_send_box sp1_task_comment_replied pl-2 pb-2' > 
        <div className='__send-box flex-column align-items-start' style={{maxWidth: '100%'}}>
            <div className='d-flex align-items-center'>
                <div className='mr-2'>
                    <div className='rounded-circle'>
                        <img 
                            src="/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png"
                            alt='sender_name'
                            width="32px"
                            height="32px"
                            className='rounded-circle'
                        />
                    </div> 
                </div>
                <div>
                    <span className="font-weight-bold d-block mr-2">Md Abu Sayeed (Laravel Developer)</span>
                    <span className='' style={{fontSize: '13px', color: '#888'}}>Sep 30, 2022 at 4:14PM</span>
                </div>
            </div>

            <div className='__box __reply_text w-100 my-1 text-dark'>
                <div className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure numquam voluptatem illo, voluptates voluptatum qui incidunt. Maiores suscipit tempore iste consequatur atque nobis laudantium beatae iure animi. Explicabo, recusandae. Iusto!
                </div> 
            </div> 

            <div className="sp1_task_comment_actions">
                <Dropdown>
                    <Dropdown.Toggle icon={false}>
                        <i className="fa-regular fa-face-smile"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu> 
                        <EmojiPicker /> 
                    </Dropdown.Menu>
                </Dropdown>
                
                <span>•</span>
                <a href="#" onClick={handleReplyButtonClick}>Reply</a>
                <span>•</span>
                <a href="#">Delete</a>
                <span>•</span>
                <a href="#"><i className="fa-solid fa-paperclip"></i></a>

                
               <div className='replies_count' onClick={() => setShowReplies(true)}>
                       <div className='reply_auth_avatar'>
                            <div>
                                <img 
                                    src="/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png"
                                    alt='sender_name'
                                    width="20px"
                                    height="20px"
                                    className='rounded-circle'
                                />
                            </div>

                            <div>
                                <img 
                                    src="/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png"
                                    alt='sender_name'
                                    width="20px"
                                    height="20px"
                                    className='rounded-circle ml-2'
                                />
                            </div>

                            <div>
                                <img 
                                    src="/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png"
                                    alt='sender_name'
                                    width="20px"
                                    height="20px"
                                    className='rounded-circle ml-3'
                                />
                            </div>
                       </div>
                       <div className='ml-2'>
                            3 replies
                       </div>
               </div>
            </div>


 
            {/* reply box */} 
            {
                replyMode && 
                <div className="mt-3 pl-3 w-100">
                    <div className='w-100'>
                        <div className='ck-editor-holder'>
                            <CKEditorComponent />
                        </div> 
                        <div className='mt-3 d-flex align-items-center'>
                            <Button className='mr-2'>Reply</Button>
                            <Button 
                            variant='secondary' 
                            onClick={() => setReplyMode(false)}
                            >Close</Button>
                        </div>
                    </div>
                </div>
            }  
            {/* reply box */}


            <div className='sp1_task_replies_comment_list w-100'> 
                {showReplies && replies ? replies.map((r, i) => (
                    <div className='pl-3 border-left mt-3 w-100'>
                        <InnerComment replies={r.replies} />
                    </div>
                )) : null}
            </div>
        </div>
    </div>
  )
}

export default InnerComment;