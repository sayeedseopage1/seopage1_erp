import React, { useState } from 'react';
import callIcon from '../../../assets/freelancerMessage/call-calling.svg';
import refreshIcon from '../../../assets/freelancerMessage/refresh-2.svg';
import callIconBlack from '../../../assets/freelancerMessage/call-outline.svg';
import userProfile from '../../../assets/freelancerMessage/user_avatar_2.png';
import chatActiveIcon from '../../../assets/freelancerMessage/chat-active.svg';
import bagIcon from '../../../assets/freelancerMessage/bag-2.svg';
import ToggleActionItem from '../ui/ToggleActionItem';
import ChatActionListLoader from '../../loader/ChatActionListLoader';

const ChatActionList = ({ isMessageLoading }) => {
    const [isArchived, setIsArchived] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    const toggleItems = [
        { id: 1, title: 'Archive', description: 'Hide chat from your active list.', state: isArchived, setState: setIsArchived },
        { id: 2, title: 'Mute', description: 'Turn off this chat\'s notifications', state: isMuted, setState: setIsMuted },
        { id: 3, title: 'Block', description: 'Restrict messages for this chat', state: isBlocked, setState: setIsBlocked }
    ];

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
            {
                isMessageLoading ? <ChatActionListLoader /> : <div className='chat_action_section_wrapper sp1_marketplace_section_wrapper'>
                    <div className='chat_action_avatar_wrapper'>
                        <div className='chat_user_avatar_wrapper'>
                            <img src={userProfile} alt="profile picture" className='chat_action_avatar' />
                            <img src={chatActiveIcon} alt="chatActiveIcon" className='active_status' />
                        </div>
                        <div className='chat_header_name_wrapper'>
                            <h4 className='chat_header_name'>Ahmad12issa</h4>
                            <p className='chat_header_user_name' style={{ color: '#9E9E9E' }}>@Ahmad12Issa</p>
                        </div>
                        <p className='chat_header_user_name'>Active now</p>
                    </div>
                    <div className='chat_actions_wrapper'>
                        <div className='chat_action_calling'>
                            <img src={callIconBlack} alt="callIconBlack" />
                            <p>Calling is disabled</p>
                        </div>
                        <hr className='chat_action_divider' />
                        <div className='chat_action_project_details'>
                            <img src={bagIcon} alt="bagIcon" />
                            <div>
                                <p className='chat_action_project_name'>Sky FLY UI UX Deigner</p>
                                <span className='chat_action_project_date'>Posted 7 days ago</span>
                            </div>
                        </div>
                        <hr className='chat_action_divider' />
                        <div className='chat_action_items'>
                            {toggleItems.map((item) => (
                                <ToggleActionItem
                                    key={item?.id}
                                    title={item?.title}
                                    description={item?.description}
                                    state={item?.state}
                                    setState={item?.setState}
                                />
                            ))}
                        </div>
                        <hr className='chat_action_divider' />
                        <div className='chat_action_items'>
                            <div className='chat_action_toggle_item'>
                                <div>
                                    <h4 className='chat_action_item_title'>Report</h4>
                                    <span className='chat_action_item_description'>There's something wrong with this chat</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default ChatActionList;
