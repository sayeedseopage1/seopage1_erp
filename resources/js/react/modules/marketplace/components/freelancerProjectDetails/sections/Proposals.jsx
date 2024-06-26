import React from 'react';
import ProposalCard from '../ui/ProposalCard';
import { project_proposals } from '../../../constants/projects';

const Proposals = () => {
    return (
        <div>
            {
                project_proposals?.map((item) => <ProposalCard key={item?.id} item={item} />)
            }
        </div>
    );
};

export default Proposals;