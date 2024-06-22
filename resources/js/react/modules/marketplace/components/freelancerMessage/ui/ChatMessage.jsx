import React from 'react';
import checkIcon from '../../../assets/freelancerMessage/checkIcon.svg';
import checkIcon2 from '../../../assets/freelancerMessage/checkIcon-2.svg';
import moment from 'moment';
import activeIcon from '../../../assets/freelancerMessage/chat-active.svg'

const ChatMessage = ({ message: messageDetails, user, isRight }) => {
    // console.log(user);
    // console.log(isRight);

    const { message, time_created, is_read } = messageDetails || {};
    const { image_url: profileImage, name } = user || {};
    return (
        <div className={isRight ? 'chat_message_right' : 'chat_message_left'}>
            <div className='chat_user_avatar_wrapper'>
                <img className='message_user_avatar' style={isRight ? { marginTop: '24px' } : {}} src={profileImage} alt={name} />
                <img className='active_status' style={{ width: '11px', height: '11px', borderRadius: '50%', }} src={activeIcon} alt="activeIcon" />
            </div>
            <div>
                {
                    isRight && <div>
                        <p className='message_user'>{name} <span style={{ color: '#AAA' }}>{moment(time_created).format('MMM DD, YYYY')}</span></p>
                    </div>
                }
                <div className='chat_message_wrapper'>
                    <h4 className='chat_message'>{message}</h4>
                    <div className='message_time_and_read'>
                        <span className='message_time_created'>{moment(time_created).format('hh:mm A')}</span>
                        <img src={is_read ? checkIcon : checkIcon2} alt="checkIcon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;