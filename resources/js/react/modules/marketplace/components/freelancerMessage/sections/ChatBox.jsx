import React from 'react';
import userProfile from '../../../assets/freelancerMessage/user_avatar_2.png'
import chatActiveIcon from '../../../assets/freelancerMessage/chat-active.svg'
import fileUploadIcon from '../../../assets/freelancerMessage/folder-add.svg'
import sendIcon from '../../../assets/freelancerMessage/send-2.svg'
import emojiIcon from '../../../assets/freelancerMessage/grammerly.svg'
import TextArea from 'antd/es/input/TextArea';
import ChatContents from '../ui/ChatContents';
// import ChatMessage from '../ui/ChatMessage';
// import { dummy_messages } from '../../../constants/message';

const ChatBox = () => {

    const handleFileChange = (event) => {
        const files = event.target.files;
    };

    return (
        <div>
            <div className='chat_header_wrapper'>
                <div className='chat_box_header'>
                    <div className='chat_box_header_content'>
                        <div className='chat_user_avatar_wrapper'>
                            <img src={userProfile} alt="" className='chat_user_avatar' />
                            <img src={chatActiveIcon} alt="chatActiveIcon" className='active_status' />
                        </div>
                        <div>
                            <div className='chat_header_name_wrapper'>
                                <h4 className='chat_header_name'>Ahmad12issa</h4>
                                <p className='chat_header_user_name'>@Ahmad12Issa</p>
                            </div>
                            <p className='chat_header_designation'>Sky FLY UI UX Deigner</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='chat_box_wrapper'>
                <div className='chat_box_content_wrapper'>
                    {/* <ChatMessage messages={messages} users={users} currentUserId={currentUserId} /> */}
                    <ChatContents />
                </div>
                {/* message send actions */}
                <div className='message_send_actions_wrapper'>
                    <form>
                        <div className='message_send_actions'>
                            <div className='message_input_wrapper'>
                                <button className='bg-transparent'>
                                    <img src={emojiIcon} alt="Emoji Icon" />
                                </button>
                                {/* <input className='message_input' type="text" placeholder="Type a message" /> */}
                                <TextArea
                                    className='message_input'
                                    placeholder="Type a message"
                                    autoSize={{
                                        minRows: 1,
                                        maxRows: 6,
                                    }}
                                    variant='borderless'
                                />
                            </div>
                            <div className='file_upload_and_send'>
                                <label className='file_upload'>
                                    <img
                                        src={fileUploadIcon}
                                        alt="Upload Icon"
                                    />
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple
                                        style={{ display: "none" }}
                                    />
                                </label>
                                <button type="submit" className='message_send_btn'><img src={sendIcon} alt="Send Icon" /></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;