import React from 'react';
import '../../styles/message/freelancerMessage.css'
import ChatList from '../../components/freelancerMessage/sections/ChatList';
import ChatBox from '../../components/freelancerMessage/sections/ChatBox';
import ChatActionList from '../../components/freelancerMessage/sections/ChatActionList';
import { ConfigProvider } from 'antd';

const FreelancerMessage = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Switch: {
                        colorPrimary: '#34C759',
                        trackMinWidth: '36px',
                    },
                },
            }}
        >
            <div className='sp1_marketplace_page_wrapper'>
                <div className='marketplace_message_wrapper'>
                    <div className='chat_list_lg'>
                        <ChatList />
                    </div>
                    <div className='chat_box_lg'>
                        <ChatBox />
                    </div>
                    <div className='chat_action_list_lg'>
                        <ChatActionList />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default FreelancerMessage;