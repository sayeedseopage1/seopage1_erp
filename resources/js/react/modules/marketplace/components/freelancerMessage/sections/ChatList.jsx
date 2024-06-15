import React from 'react';
import { CiSearch } from "react-icons/ci";

const ChatList = () => {
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
            <div className='sp1_marketplace_section_wrapper'>
                hi
            </div>
        </div>
    );
};

export default ChatList;