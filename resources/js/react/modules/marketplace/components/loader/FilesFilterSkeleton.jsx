import { Skeleton } from 'antd';
import React from 'react';

const FilesFilterSkeleton = () => {
    return (
        <div>
            {
                Array(4).fill(0).map((_, index) => (
                    <Skeleton.Button key={index} style={{ marginBottom: '10px' }} active={true} size={'small'} block={true} shape={'default'} />
                ))
            }
        </div>
    );
};

export default FilesFilterSkeleton;