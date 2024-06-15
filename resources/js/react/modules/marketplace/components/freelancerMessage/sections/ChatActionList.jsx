import React from 'react';
import callIcon from '../../../assets/freelancerMessage/call-calling.svg';
import refreshIcon from '../../../assets/freelancerMessage/refresh-2.svg'

const ChatActionList = () => {
    return (
        <div>
            <div className='chat_header_wrapper' style={{ borderTopRightRadius: '8px' }}>
                <div className='chat_action_header'>
                    <div className='chat_action_header_icons'>
                        <div className='chat_action_header_icon'>
                            <img src={refreshIcon} alt="refreshIcon" style={{ width: '24px', height: '24px' }} />
                        </div>
                        <div className='chat_action_header_icon'>
                            <img src={callIcon} alt="callIcon" style={{ width: '24px', height: '24px' }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='sp1_marketplace_section_wrapper'>
                hi
            </div>
        </div>
    );
};

export default ChatActionList;