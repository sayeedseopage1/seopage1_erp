import React from 'react';
import FractionalRating from '../../commonComponents/FractionalRating';
import commentIcon from '../../../assets/freelancerProjects/comment-icon.svg'
import { AiFillDollarCircle } from "react-icons/ai";
import { GoCircle } from "react-icons/go";
import starIcon from '../../../assets/freelancerProjectDetails/Star1.svg'
import moment from 'moment';


// TODO: need to make pixel perfect font and size 
const ProposalCard = ({ item }) => {
    const { id, bid_amount, currency, bidding_time, proposal_title, proposal_message, balance, success_rate, freelancer_info } = item || {};
    const { profile_image_url, name, user_name, is_new_freelancer, location, average_rating, reviews_count } = freelancer_info || {};
    return (
        <div className='p_d_proposal_card'>
            <div className='p_d_proposal_card_top'>
                <div className='p_d_proposal_user_info'>
                    <img className='p_d_proposal_card_avatar' src={profile_image_url} alt={name} />
                    <div>
                        <p className='p_d_proposal_card_name'>{name} <span className='p_d_proposal_card_user_name'>@{user_name}</span></p>
                        <div className='project_card_rating_wrapper'>
                            {
                                !is_new_freelancer && <>
                                    <div className='project_card_rating'>
                                        <FractionalRating stop={5} value={average_rating} />
                                        <p>{average_rating}</p>
                                    </div>
                                    <div className='project_card_rating'>
                                        <img src={commentIcon} alt="commentIcon" />
                                        <p>{reviews_count}</p>
                                    </div>
                                    <div className='p_d_normal_flex'>
                                        <AiFillDollarCircle color='#058430' /> <span>{balance}</span>
                                    </div>
                                    <div className='p_d_normal_flex'>
                                        <GoCircle color='#058430' /> <span>{success_rate}%</span>
                                    </div>
                                </>
                            }
                            {
                                is_new_freelancer && <div className='p_d_normal_flex'>
                                    <img src={starIcon} alt="starIcon" />
                                    <p className=''>New Freelancer</p>
                                </div>
                            }
                            <div className='p_d_normal_flex'>
                                <img src={`/flags/4x3/${location?.iso}.svg`} className='info_with_icon_img' alt={location?.country} />
                                <p className='sp1_marketplace_default_text'>{location?.country}</p>
                            </div>
                        </div>
                        <p className='p_d_proposal_card_title'>{proposal_title}</p>
                    </div>
                </div>
                <div className='text-right'>
                    <h2 className='p_d_proposal_card_price'>{currency?.symbol}{bid_amount} {currency?.code}</h2>
                    <p className='sp1_marketplace_default_text'>{moment(bidding_time).fromNow()}</p>
                </div>
            </div>
            <div className='p_d_proposal_card_bottom'>
                <div className='p_d_proposal_message' dangerouslySetInnerHTML={{ __html: proposal_message }}></div>
                <div className='text-right'>
                    <p>Replies within a few minutes</p>
                    <button className='p_d_proposal_report_btn'>Report Bid</button>
                </div>
            </div>
        </div>
    );
};

export default ProposalCard;