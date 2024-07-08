import { Skeleton } from 'antd';
import React from 'react';

const InnerChatLoader = () => {
    const skeletonItems = Array.from({ length: 5 }).map((_, index) => {
        const isLeft = index % 2 === 0;
        return (
            <div
                key={index}
                style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexDirection: isLeft ? 'row' : 'row-reverse',
                    }}
                >
                    <Skeleton.Avatar active size="large" shape="circle" style={{ margin: isLeft ? '0 8px 0 0' : '0 0 0 8px' }} />
                    <div style={{ textAlign: isLeft ? 'left' : 'right' }}>
                        <Skeleton.Button block size='small' active style={{ maxWidth: "100px", width: "100%", margin: isLeft ? '0 8px 3px 0' : '0 0 3px 8px' }} />
                        <Skeleton.Button block active style={{ maxWidth: "350px", width: "100%", margin: isLeft ? '0 8px 3px 0' : '0 0 3px 8px' }} />
                        <Skeleton.Button block active style={{ maxWidth: "350px", width: "100%", margin: isLeft ? '0 8px 0 0' : '0 0 0 8px' }} />
                    </div>
                </div>
            </div>
        );
    });

    return <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>{skeletonItems}</div>;
};

export default InnerChatLoader;