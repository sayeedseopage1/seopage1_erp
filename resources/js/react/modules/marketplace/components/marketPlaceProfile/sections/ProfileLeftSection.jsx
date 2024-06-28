import React from 'react';
import LgDataCardWithHeader from '../ui/LgDataCardWithHeader';
import { GoDotFill } from "react-icons/go";

const ProfileLeftSection = ({ profileData }) => {
    const { id, user_id, profile_image_url, cover_image, name, user_name, bio, average_rating, reviews_count, earnings_score, top_rated_percentage, job_success: { jobs_completed, on_budget, on_time, repeat_hire_rate }, is_online, hourly_rate, location: { iso, country, city }, local_time, recommendations_count, member_since, general_description, user_verification: { identity_verified, payment_verified, deposit_made, email_verified, profile_completed, phone_verified, facebook_connected }, user_certification, top_skills, related_tags, recent_community_articles, portfolio, reviews, experiences, educations, qualifications, publications, is_verified } = profileData || {};

    return (
        <div className='marketplace_profile_left_side'>
            <div className='personal_info_wrapper'>
                <div className='personal_info_left'>
                    <img src={profile_image_url} alt={name} />
                    <div className='personal_info_left_content'>
                        <p><GoDotFill size={22} color={is_online ? "#058430" : "black"} /> <span className='sp1_marketplace_default_text'>{is_online ? "I'm online!" : "Offline"}</span></p>
                    </div>
                </div>
                <div className='personal_info_right'>Main details here</div>
            </div>
            <LgDataCardWithHeader title={"Portfolio"} actionCompo={
                <div>
                    <button className=''>Edit</button>
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
                <div>
                    <button className=''>Edit</button>
                </div>
            }>
                card body
            </LgDataCardWithHeader>
            <LgDataCardWithHeader title={"Education"} actionCompo={
                <div>
                    <button className=''>Edit</button>
                </div>
            }>
                card body
            </LgDataCardWithHeader>
            <LgDataCardWithHeader title={"Qualifications"} actionCompo={
                <div>
                    <button className=''>Edit</button>
                </div>
            }>
                card body
            </LgDataCardWithHeader>
            <LgDataCardWithHeader title={"Publications"} actionCompo={
                <div>
                    <button className=''>Edit</button>
                </div>
            }>
                card body
            </LgDataCardWithHeader>
        </div>
    );
};

export default ProfileLeftSection;