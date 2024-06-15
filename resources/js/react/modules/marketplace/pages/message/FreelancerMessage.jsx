import React from 'react';
import '../../styles/message/freelancerMessage.css'
import ChatList from '../../components/freelancerMessage/sections/ChatList';
import ChatBox from '../../components/freelancerMessage/sections/ChatBox';
import ChatActionList from '../../components/freelancerMessage/sections/ChatActionList';

const FreelancerMessage = () => {
    return (
        <div className='sp1_marketplace_page_wrapper'>
            <div className='marketplace_message_wrapper'>
                <ChatList />
                <ChatBox />
                <ChatActionList />
            </div>
        </div>
    );
};

export default FreelancerMessage;