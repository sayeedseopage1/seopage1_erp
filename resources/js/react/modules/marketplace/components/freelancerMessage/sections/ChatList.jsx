import React from 'react';
import { CiSearch } from "react-icons/ci";
import ChatListItem from '../ui/ChatListItem';
import ChatListLoader from '../../loader/ChatListLoader';

const ChatList = ({ isMessageLoading }) => {
    return (
        <div>
            <div className='chat_header_wrapper' style={{ borderTopLeftRadius: '8px' }}>
                <div className='chat_list_header'>
                    <div className='chat_list_search'>
                        <CiSearch color='#ffffff' size={20} />
                        <input className='chat_list_search_input' type="text" placeholder="Search" />
                    </div>
                </div>
            </div>
            <div className='chat_list_section_wrapper sp1_marketplace_section_wrapper'>
                <div className='chat_list_title_wrapper'>
                    <p className='chat_list_title'>Chats</p>
                    <p className='chat_request'>Request</p>
                </div>
                {
                    isMessageLoading ? <ChatListLoader /> : <div className='chat_list_wrapper'>
                        {
                            Array(5).fill(0).map((item, index) => (
                                <ChatListItem key={index} />
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default ChatList;