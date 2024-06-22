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
                    <ChatList />
                    <ChatBox />
                    <ChatActionList />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default FreelancerMessage;