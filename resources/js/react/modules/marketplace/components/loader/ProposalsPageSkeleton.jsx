import { Skeleton } from 'antd';
import React from 'react';

const ProposalsPageSkeleton = () => {
    return (
        <div>
            {
                Array(4).fill(0).map((_, index) => (
                    <div key={index} className='p_d_proposal_card'>
                        <div className='p_d_proposal_card_bottom'>
                            <Skeleton.Button style={{ height: '80px', maxWidth: '80px', width: '100%' }} active={true} size={'default'} block={true} shape={'default'} />
                            <div className='text-right'>
                                <Skeleton.Button style={{ maxWidth: '250px', width: '100%', marginBottom: '10px' }} active={true} size={'default'} block={true} shape={'default'} />
                                <Skeleton.Button style={{ maxWidth: '100px', width: '100%' }} active={true} size={'small'} block={true} shape={'default'} />
                            </div>
                        </div>
                        <div className='p_d_proposal_card_bottom'>
                            <Skeleton active={true} size={'small'} paragraph={{ rows: 2 }} shape={'default'} />
                            <div className='text-right'>
                                <Skeleton.Button style={{ maxWidth: '250px', width: '100%', marginBottom: '10px' }} active={true} size={'default'} block={true} shape={'default'} />
                                <Skeleton.Button style={{ maxWidth: '100px', width: '100%' }} active={true} size={'small'} block={true} shape={'default'} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ProposalsPageSkeleton;