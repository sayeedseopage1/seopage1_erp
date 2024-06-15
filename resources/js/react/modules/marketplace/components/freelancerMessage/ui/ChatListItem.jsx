import React from 'react';
import userProfile from '../../../assets/freelancerMessage/user_avatar_2.png'
import chatActiveIcon from '../../../assets/freelancerMessage/chat-active.svg'

const ChatListItem = () => {
    return (
        <div>
            {/* TODO: active status position fix */}
            <div className='chat_user_avatar_wrapper'>
                <img src={userProfile} alt="userProfile" className='chat_list_user_avatar' />
                <img src={chatActiveIcon} alt="chatActiveIcon" className='active_status' />
            </div>
            <div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default ChatListItem;