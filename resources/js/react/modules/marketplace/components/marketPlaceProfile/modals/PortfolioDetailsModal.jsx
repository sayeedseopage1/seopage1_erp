import { Modal } from 'antd';
import React from 'react';
import { IoMdClose } from "react-icons/io";
import InfoWithIconTitle from '../../freelancerProjectDetails/ui/InfoWithIconTitle';
import chatActiveIcon from '../../../assets/freelancerMessage/chat-active.svg';
import FractionalRating from '../../commonComponents/FractionalRating';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaBarcode } from 'react-icons/fa';

const PortfolioDetailsModal = ({ item, isOpen, setIsOpen, profileData }) => {
    const { thumbnails, skills, category } = item || {};
    const { hourly_rate, earnings_score, reviews_count, average_rating, name, profile_image_url, location } = profileData || {};
    return (
        <Modal className='portfolio_modal'
            closable={false}
            maskClosable={false}
            open={isOpen}
            width={975}
            footer={null}
        >
            <div className='portfolio_modal_header'>
                <h3 className='portfolio_modal_title'>{category}</h3>
                <button className='portfolio_modal_close' onClick={() => setIsOpen(false)}>{<IoMdClose />}</button>
            </div>
            <div className='portfolio_modal_wrapper'>
                <div className='portfolio_modal_content_left'>
                    <div className='d-flex flex-column'>
                        {
                            thumbnails?.map((thumb) => <img key={thumb?.id} src={thumb?.url} alt={`${category} thumbnail ${thumb?.id}`} className='w-100 mb-2' />)
                        }
                    </div>
                </div>
                <div className='portfolio_modal_content_right'>
                    <div className='portfolio_personal_info'>
                        <div className='d-flex align-items-start'>
                            <div className='portfolio_modal_avatar_wrapper'>
                                <img src={profile_image_url} alt="profile picture" className='portfolio_modal_avatar' />
                                <img src={chatActiveIcon} alt="chatActiveIcon" className='portfolio_modal_active_status' />
                            </div>
                            <InfoWithIconTitle img_url={`/flags/4x3/${location?.iso}.svg`} title={name} />
                        </div>
                        <div className='profile_rating'>
                            <FractionalRating stop={5} value={average_rating} />
                            <p>{average_rating}({reviews_count})</p>
                        </div>
                        <div className='p_d_normal_flex'>
                            <AiFillDollarCircle size={25} color='#058430' /> <FaBarcode size={25} color='#058430' /> <span>{earnings_score}</span>
                        </div>
                        <p className='portfolio_modal_sub_title'>{`$${hourly_rate} USD/hour`}</p>
                    </div>
                    <div>
                        <div className='mb-3'>
                            <h4 className='portfolio_modal_sub_title'>About the project</h4>
                            <p>{category}</p>
                        </div>

                        <h4 className='portfolio_modal_sub_title'>Skills</h4>
                        <div className='similar_freelancer_tags_wrapper'>
                            {
                                skills?.map((item) => (
                                    <div className='similar_freelancer_tag' key={item?.id}>{item?.name}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PortfolioDetailsModal;