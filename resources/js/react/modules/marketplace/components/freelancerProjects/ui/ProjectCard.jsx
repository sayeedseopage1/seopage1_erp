import React from 'react';

const ProjectCard = ({ item }) => {
    const { title, description, currency, budget_range, highest_bid_amount, bids_count, average_rating, reviews_count, skills, created_at } = item || {};
    return (
        <div className='project_card_wrapper'>
            <div className='project_card_header'>
                <h2 className='project_card_title'>{title}</h2>
                <div className='project_card_bids_wrapper'>
                    <p className='project_card_bids project_normal_text'>{bids_count} {bids_count > 1 ? 'bids' : 'bid'}</p>
                    <p className='project_card_price'>{highest_bid_amount} {currency}</p>
                </div>
            </div>
            <div className='project_card_body'>
                <p className='project_normal_text'>Budget {budget_range}</p>
                <p className='project_normal_text'>{description}</p>
                <div className='project_card_skills'>
                    {
                        skills.map((skill, index) => (
                            <span key={index} className='project_card_skill'>{skill}</span>
                        ))
                    }
                </div>
            </div>
            <div className='project_card_footer'>
                <div>ratings here...</div>
                <div>times here...</div>
            </div>
        </div>
    );
};

export default ProjectCard;