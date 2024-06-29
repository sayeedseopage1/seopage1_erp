import React, { useState } from 'react';
import LgDataCardWithHeader from '../ui/LgDataCardWithHeader';
import { GoDotFill } from "react-icons/go";
import InfoWithIconTitle from '../../freelancerProjectDetails/ui/InfoWithIconTitle';
import dollarSquare from '../../../assets/marketplaceProfile/dollar-square.svg';
import likeIcon from '../../../assets/marketplaceProfile/like.svg';
import clockIcon from '../../../assets/marketplaceProfile/clock.svg';
import { CiBookmarkCheck } from "react-icons/ci";
import verifiedIcon from '../../../assets/marketplaceProfile/verified.svg';
import shareIcon from '../../../assets/marketplaceProfile/share-icon.svg';
import handShakeIcon from '../../../assets/marketplaceProfile/hand-shake.svg';
import moment from 'moment';
import FractionalRating from '../../commonComponents/FractionalRating';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaBarcode } from "react-icons/fa";
import { Progress, Tabs } from 'antd';
import threeDotIcon from '../../../assets/marketplaceProfile/dot-three.svg';

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

const ProfileLeftSection = ({ profileData }) => {
    const { id, user_id, profile_image_url, cover_image, name, user_name, bio, average_rating, reviews_count, earnings_score, top_rated_percentage, job_success: { jobs_completed, on_budget, on_time, repeat_hire_rate }, is_online, hourly_rate, location: { iso, country, city }, local_time, recommendations_count, member_since, general_description, portfolio, reviews, experiences, educations, qualifications, publications, is_verified } = profileData || {};

    console.log(qualifications)

    const [activeKey, setActiveKey] = useState('general');

    const generalDescOnChange = (key) => {
        setActiveKey(key);
    }

    return (
        <div className='marketplace_profile_left_side'>
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
            <LgDataCardWithHeader title={"Portfolio"} actionCompo={
                <div className='personal_info_action_wrapper'>
                    <button className='list_of_milestones_btn_outline'>Edit Layout</button>
                    <button className='list_of_milestones_btn'>Manage</button>
                </div>
            }>
                card body
            </LgDataCardWithHeader>
            <LgDataCardWithHeader title={"Reviews"} actionCompo={
                <div>
                    <button className=''>Edit</button>
                </div>
            }>
                card body
            </LgDataCardWithHeader>
            <LgDataCardWithHeader title={"Experience"} actionCompo={
                <div className='personal_info_action_wrapper'>
                    <button className='list_of_milestones_btn'>Add Experience</button>
                </div>
            }>
                <div className='d-flex justify-content-end'>
                    <button className='bg-transparent'> <img src={threeDotIcon} alt="threeDotIcon" /></button>
                </div>
                {experiences?.map(({ id, designation, company_name, description, start_date, end_date }) => {
                    const startDate = moment(start_date);
                    const endDate = end_date ? moment(end_date).format("YYYY") : "Present";

                    return (
                        <div key={id}>
                            <div className='lg_data_card_flex_col'>
                                <p className='sp1_marketplace_default_text'>{designation}</p>
                                <p className='sp1_marketplace_default_text' style={{ fontWeight: "600" }}>{company_name}</p>
                                <p className='sp1_marketplace_default_text'>{`${startDate.format("YYYY")}-${endDate}`}</p>
                            </div>
                            <p className='sp1_marketplace_default_text mt-4'>{description}</p>
                        </div>
                    );
                })}
            </LgDataCardWithHeader>
            <LgDataCardWithHeader title={"Education"} actionCompo={
                <div className='personal_info_action_wrapper'>
                    <button className='list_of_milestones_btn'>Add Education</button>
                </div>
            }>
                <div className='d-flex justify-content-end'>
                    <button className='bg-transparent'> <img src={threeDotIcon} alt="threeDotIcon" /></button>
                </div>
                {educations?.map(({ id, degree, institution, start_date, end_date }) => {
                    const startDate = moment(start_date);
                    const endDate = moment(end_date);
                    const duration = endDate.diff(startDate, 'years');
                    const durationText = `${duration} ${duration > 1 ? 'years' : 'year'}`;

                    return (
                        <div className='lg_data_card_flex_col' key={id}>
                            <p className='sp1_marketplace_default_text' style={{ fontWeight: "600" }}>{degree}</p>
                            <p className='sp1_marketplace_default_text'>{institution}</p>
                            <p className='sp1_marketplace_default_text'>{`${startDate.format("YYYY")}-${endDate.format("YYYY")} (${durationText})`}</p>
                        </div>
                    );
                })}

            </LgDataCardWithHeader>
            <LgDataCardWithHeader title={"Qualifications"} actionCompo={
                <div className='personal_info_action_wrapper'>
                    <button className='list_of_milestones_btn'>Add Qualification</button>
                </div>
            }>
                {
                    qualifications?.map(({ id, name, institution, start_date }) => (
                        <div className='lg_data_card_flex_col' key={id}>
                            <p className='sp1_marketplace_default_text' style={{ fontWeight: "600" }}>{name}</p>
                            <p className='sp1_marketplace_default_text'>{institution}</p>
                            <p className='sp1_marketplace_default_text'>{moment(start_date).format("YYYY")}</p>
                        </div>
                    ))
                }
            </LgDataCardWithHeader>
            <LgDataCardWithHeader title={"Publications"} actionCompo={
                <div className='personal_info_action_wrapper'>
                    <button className='list_of_milestones_btn'>Add Publication</button>
                </div>
            }>
                <div className='d-flex justify-content-end'>
                    <button className='bg-transparent'> <img src={threeDotIcon} alt="threeDotIcon" /></button>
                </div>
                {
                    publications?.map(({ id, name, title, description }) => (
                        <div className='lg_data_card_flex_col' key={id}>
                            <p className='sp1_marketplace_default_text' style={{ fontWeight: "600" }}>{name}</p>
                            <p className='sp1_marketplace_default_text'>{title}</p>
                            <p className='sp1_marketplace_default_text'>{description}</p>
                        </div>
                    ))
                }
            </LgDataCardWithHeader>
        </div>
    );
};

export default ProfileLeftSection;