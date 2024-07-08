import React, { useEffect } from 'react';
import '../../styles/message/freelancerMessage.css'
import ChatList from '../../components/freelancerMessage/sections/ChatList';
import ChatBox from '../../components/freelancerMessage/sections/ChatBox';
import ChatActionList from '../../components/freelancerMessage/sections/ChatActionList';
import { ConfigProvider } from 'antd';

const FreelancerMessage = () => {
    //! TODO: this is used for development purpose only
    const [isMessageLoading, setIsMessageLoading] = React.useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsMessageLoading(false);
        }, 3000);
    }, []);

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
                        <ChatList isMessageLoading={isMessageLoading} />
                    </div>
                    <div className='chat_box_lg'>
                        <ChatBox isMessageLoading={isMessageLoading} />
                    </div>
                    <div className='chat_action_list_lg'>
                        <ChatActionList isMessageLoading={isMessageLoading} />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default FreelancerMessage;