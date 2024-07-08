import { Skeleton } from 'antd';
import React from 'react';

const ChatBoxHeaderAvatarLoader = () => {
    return (
        <div style={{ textAlign: 'left', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Skeleton.Avatar style={{ width: '52px', height: '52px', marginBottom: '10px' }} active={true} size={'default'} shape={'circle'} />
            <div>
                <Skeleton.Button style={{ width: '250px', marginBottom: '10px' }} active={true} size={'small'} block={true} shape={'default'} />
                <Skeleton.Button style={{ width: '150px' }} active={true} size={'small'} block={true} shape={'small'} />
            </div>
        </div>
    );
};

export default ChatBoxHeaderAvatarLoader;