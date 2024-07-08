import { Skeleton } from 'antd';
import React from 'react';

const ChatListLoader = () => {
    return (
        <div className='chat_list_wrapper'>
            {
                Array(5).fill(0).map((_, index) => (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} key={index}>
                        <Skeleton.Avatar active={true} size={'default'} shape={'square'} />
                        <Skeleton.Button style={{ width: '100%', flex: 'auto' }} block active={true} size={'large'} />
                    </div>
                ))
            }
        </div>
    );
};

export default ChatListLoader;