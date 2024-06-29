import React from 'react';
import { BsDot } from 'react-icons/bs';
import FractionalRating from '../../commonComponents/FractionalRating';
import moment from 'moment';
import shareIcon from '../../../assets/marketplaceProfile/share-icon.svg';

const ReviewCard = ({ item, isLast }) => {
    const { rating, comment, project, client_info, created_at } = item || {};
    return (
        <div className={`profile_review_card ${isLast ? 'profile_review_card_last' : ''}`}>
            <div className='review_card_top_section'>
                <div>
                    <div className='profile_rating review_rating'>
                        <FractionalRating stop={5} value={rating} />
                        <p>{rating}</p>
                    </div>
                    <h3 className='reviewed_project_title'>{project?.title}</h3>
                </div>
                <div className='review_card_top_section_right'>
                    <h3 className='reviewed_project_amount'>{project?.currency?.symbol}{project?.amount} {project?.currency?.code}</h3>
                    <button className='review_share_btn'>
                        <img src={shareIcon} alt="shareIcon" />
                        <span>Share</span>
                    </button>

                </div>
            </div>
            <div className='review_card_body'>
                <p className='review_comment'>{comment}</p>
                <div className='review_tags_wrapper'>
                    {
                        project?.tags?.map((tag, index) => <p key={index} className='review_tag'>
                            <BsDot size={20} />
                            <span>{tag?.name}</span>
                        </p>)
                    }
                </div>
                <div className='p_d_normal_flex reviewed_client_info'>
                    <img className='review_client_flag' src={`/flags/4x3/${client_info?.location?.iso}.svg`} alt={client_info?.location?.iso} />
                    <p className='review_client_name'>{client_info?.name} <span className='review_client_user_name'>@{client_info?.user_name}</span> <span className='review_date'>{moment(created_at).fromNow()}</span></p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;