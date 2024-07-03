import { Progress, Tabs } from 'antd';
import React, { useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import InfoWithIconTitle from '../../freelancerProjectDetails/ui/InfoWithIconTitle';
import moment from 'moment';
import FractionalRating from '../../commonComponents/FractionalRating';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaBarcode } from 'react-icons/fa';
import { CiBookmarkCheck } from "react-icons/ci";
import { profileIcons } from '../../../assets/marketplaceProfile/profileIcons';

const { dollarSquare, likeIcon, clockIcon, shareIcon, verifiedIcon, handShakeIcon } = profileIcons;

const generalDescItems = [
    {
        label: 'Add',
        key: 'add',
        disabled: true,
    },
    {
        label: 'General',
        key: 'general',

    },
]

const ProfilePersonalInfoSection = ({ profileData }) => {
    const { profile_image_url, name, user_name, bio, average_rating, reviews_count, earnings_score, top_rated_percentage, job_success: { jobs_completed, on_budget, on_time, repeat_hire_rate }, is_online, hourly_rate, location: { iso, country, city }, recommendations_count, member_since, general_description, is_verified } = profileData || {};

    const [activeKey, setActiveKey] = useState('general');

    const generalDescOnChange = (key) => {
        setActiveKey(key);
    }

    return (
        <div className='personal_info_wrapper'>
            <div className='personal_info_left'>
                <img className='user_profile_image' src={profile_image_url} alt={name} />
                <div className='personal_info_left_content'>
                    <InfoWithIconTitle icon={<GoDotFill size={22} color={is_online ? "#058430" : "#000"} />} title={is_online ? "I'm online!" : "Offline"} />
                    <InfoWithIconTitle img_url={dollarSquare} title={`$${hourly_rate} USD/hour`} />
                    <InfoWithIconTitle img_url={`/flags/4x3/${iso}.svg`} title={`${city}, ${country}`} />
                    <InfoWithIconTitle img_url={clockIcon} title={`It's currently ${moment(new Date()).format('hh:mm A')} here`} />
                    <InfoWithIconTitle icon={<CiBookmarkCheck size={24} color={"#058430"} />} title={`Joined ${moment(member_since).format('MMMM DD, YYYY')}`} />
                    <InfoWithIconTitle img_url={likeIcon} title={`${recommendations_count} Recommendations`} />
                </div>
            </div>
            <div className='personal_info_right'>
                <div>

                    <div className='d-flex align-items-start justify-content-between'>
                        <div className='mr-2'>
                            <h4 className='freelancer_name'>{name} <span className='freelancer_user_name'>@{user_name}</span> {is_verified && <img src={verifiedIcon} alt="verifiedIcon" />}</h4>
                            <p className='freelancer_bio'>{bio}</p>
                        </div>
                        <div className='personal_info_action_wrapper'>
                            <button className='share_btn'><img src={shareIcon} alt="shareIcon" /></button>
                            <button className='list_of_milestones_btn'>Edit Profile</button>
                        </div>
                    </div>
                    <div className='profile_stats'>
                        <div className='profile_rating'>
                            <FractionalRating stop={5} value={average_rating} />
                            <p>{average_rating}({reviews_count})</p>
                        </div>
                        <div className='p_d_normal_flex'>
                            <AiFillDollarCircle size={25} color='#058430' /> <FaBarcode size={25} color='#058430' /> <span>{earnings_score}</span>
                        </div>
                        <div className='p_d_normal_flex'>
                            <img src={handShakeIcon} alt="handShakeIcon" />
                            <Progress
                                percent={top_rated_percentage * 10}
                                showInfo={false}
                                strokeLinecap="square"
                                trailColor="#CFECFF"
                                strokeColor={'##1492E6'}
                                size={[95, 13]}
                            />
                            <span>{top_rated_percentage}%</span>
                        </div>
                    </div>
                    <div className='profile_job_success'>
                        <div><span className={`${jobs_completed > 60 ? 'job_success_rate' : ''}`}>{jobs_completed}%</span> Jobs Completed</div>
                        <div><span className={`${jobs_completed > 60 ? 'job_success_rate' : ''}`}>{on_budget}%</span> On Budget</div>
                        <div><span className={`${jobs_completed > 60 ? 'job_success_rate' : ''}`}>{on_time}%</span> On Time</div>
                        <div><span className={`${jobs_completed > 60 ? 'job_success_rate' : ''}`}>{repeat_hire_rate}%</span> Repeat Hire Rate</div>
                    </div>
                </div>
                <div className='profile_general_description'>
                    <Tabs
                        items={generalDescItems}
                        defaultActiveKey={activeKey}
                        onChange={generalDescOnChange}
                    />
                    <div>
                        {
                            activeKey == 'general' ? <div className='sp1_marketplace_default_text' style={{ maxWidth: "733px" }}>{general_description}</div> : <div>add form</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePersonalInfoSection;