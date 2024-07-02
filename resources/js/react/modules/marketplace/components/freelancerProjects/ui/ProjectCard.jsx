import React, { useState } from 'react';
import archiveIcon from '../../../assets/freelancerProjects/archive-tick.svg';
import commentIcon from '../../../assets/freelancerProjects/comment-icon.svg';
import moment from 'moment';
import FractionalRating from '../../commonComponents/FractionalRating';

const ProjectCard = ({ item }) => {
    const { title, description, details, currency, budget_range, average_bid_amount, bids_count, average_rating, reviews_count, skills, created_at } = item || {};
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className='project_card_wrapper'>
            <div className='project_card_header'>
                <h2 className='project_card_title'>{title}</h2>
                <div className='project_card_bids_wrapper'>
                    <p className='project_card_bids project_normal_text'>{bids_count} {bids_count > 1 ? 'bids' : 'bid'}</p>
                    <p className='project_card_price'>{currency?.symbol}{average_bid_amount} {currency?.code}</p>
                </div>
            </div>
            <div className='project_card_body'>
                <p className='project_normal_text'>Budget {budget_range} {currency?.code}</p>
                <div className='project_normal_text project_card_description'>
                    <span dangerouslySetInnerHTML={{ __html: details }} className={isExpanded ? 'expanded' : 'truncated'}>
                        {/* {description} */}
                    </span>
                    {!isExpanded && (
                        <span className='more-btn' onClick={toggleDescription}> more</span>
                    )}
                    {/* {isExpanded && (
                        <span className='less-btn' onClick={toggleDescription}> less</span>
                    )} */}
                </div>
                <div className='project_card_skills'>
                    {
                        skills.map((skill, index) => (
                            <span key={index} className='project_card_skill'>{skill}</span>
                        ))
                    }
                </div>
            </div>
            <div className='project_card_footer'>
                <div className='project_card_rating_wrapper'>
                    <div className='project_card_rating'>
                        <FractionalRating stop={5} value={average_rating} />
                        <p>{average_rating}</p>
                    </div>
                    <div className='project_card_rating'>
                        <img src={commentIcon} alt="commentIcon" />
                        <p>{reviews_count}</p>
                    </div>
                </div>
                <div className='project_card_date'>
                    <img src={archiveIcon} alt="archiveIcon" />
                    <p>{moment(created_at).fromNow()}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;