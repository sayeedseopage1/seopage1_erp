import React from 'react';
import userProfile from '../../../assets/freelancerMessage/user_avatar_2.png'
import chatActiveIcon from '../../../assets/freelancerMessage/chat-active.svg'

const ChatListItem = () => {
    return (
        <div className='chat_list_item_wrapper'>
            {/* TODO: active status position fix */}
            <div className='chat_user_avatar_wrapper'>
                <img src={userProfile} alt="userProfile" className='chat_list_user_avatar' />
                <img src={chatActiveIcon} alt="chatActiveIcon" className='active_status' />
            </div>
            <div className='chat_list_item_content'>
                <div className='chat_list_item_header'>
                    <div className='chat_list_item_names_wrapper'>
                        <h4 className='chat_list_item_name'>Ahmad12issa</h4>
                        <p className='chat_list_item_user_name'>@Ahmad12Issa</p>
                    </div>
                    <span className='chat_list_item_date'>Just now</span>
                </div>
                <div className='chat_list_item_message'>
                    <p className='chat_list_item_text'>Hi, how are you? Furthermore about the appointment with you.</p>
                    <div className='chat_list_item_unread_count'>2</div>
                </div>
            </div>
        </div>
    );
};

export default ChatListItem;