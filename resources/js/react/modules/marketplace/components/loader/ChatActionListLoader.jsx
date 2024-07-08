import React from 'react';
import { Skeleton } from 'antd';

const ChatActionListLoader = () => {
    return (
        <div className='chat_action_section_wrapper sp1_marketplace_section_wrapper'>
            <div style={{ textAlign: 'center' }}>
                <Skeleton.Avatar style={{ width: '100px', height: '100px', marginBottom: '10px' }} active={true} size={'large'} shape={'circle'} />
                <Skeleton.Button style={{ maxWidth: '250px', width: '100%', marginBottom: '10px' }} active={true} size={'default'} block={true} shape={'default'} />
                <Skeleton.Button style={{ maxWidth: '150px', width: '100%' }} active={true} size={'small'} block={true} shape={'default'} />
            </div>
            <div className='chat_actions_wrapper'>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Skeleton.Avatar active={true} size={'default'} shape={'square'} />
                    <Skeleton.Button style={{ width: '100%', flex: 'auto' }} block active={true} size={'default'} />
                </div>
                <hr className='chat_action_divider' />
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Skeleton.Avatar active={true} size={'default'} shape={'square'} />
                    <Skeleton.Button style={{ width: '100%', flex: 'auto' }} block active={true} size={'default'} />
                </div>
                <hr className='chat_action_divider' />
                <div className='chat_action_items'>
                    {
                        Array(2).fill(0).map((_, index) => (
                            <div key={index}>
                                <Skeleton.Button style={{ maxWidth: '150px', width: '100%', marginBottom: '10px' }} block active={true} size={'small'} />
                                <Skeleton.Button style={{ width: '100%' }} block active={true} size={'default'} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ChatActionListLoader;