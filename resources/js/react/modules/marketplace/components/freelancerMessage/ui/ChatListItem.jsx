import React from 'react';
import userProfile from '../../../assets/freelancerMessage/user_avatar_2.png'

const ChatListItem = () => {
    return (
        <div>
            <div>
                <img src={userProfile} alt="userProfile" />
            </div>
            <div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default ChatListItem;