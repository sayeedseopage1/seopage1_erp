import React from 'react';
import userProfile from '../../../assets/freelancerMessage/user_avatar_2.png'
import chatActiveIcon from '../../../assets/freelancerMessage/chat-active.svg'

const ChatBox = () => {
    return (
        <div>
            <div className='chat_header_wrapper'>
                <div className='chat_box_header'>
                    <div className='chat_box_header_content'>
                        <div className='chat_user_avatar_wrapper'>
                            <img src={userProfile} alt="" className='chat_user_avatar' />
                            <img src={chatActiveIcon} alt="chatActiveIcon" className='active_status' />
                        </div>
                        <div>
                            <div className='chat_header_name_wrapper'>
                                <h4 className='chat_header_name'>Ahmad12issa</h4>
                                <p className='chat_header_user_name'>@Ahmad12Issa</p>
                            </div>
                            <p className='chat_header_designation'>Sky FLY UI UX Deigner</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;