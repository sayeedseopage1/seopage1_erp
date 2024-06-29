import React from 'react';
import InfoCardWithHeader from '../ui/InfoCardWithHeader';
import InfoWithIconTitle from '../../freelancerProjectDetails/ui/InfoWithIconTitle';
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { verificationIcons } from '../../../assets/marketplaceProfile/verificationIcons';
import boxTickIcon from '../../../assets/marketplaceProfile/box-tick.svg';
import moment from 'moment';
const { reputationIcon, userIcon1, userIcon2,
    paymentIcon1, paymentIcon2, callIcon1, callIcon2,
    emailIcon1, emailIcon2, facebookIcon1, facebookIcon2 } = verificationIcons;

const ProfileRightSection = ({ profileData }) => {

    const { user_verification: { identity_verified, payment_verified, email_verified, phone_verified, facebook_connected }, user_certification, top_skills, related_tags, recent_community_articles } = profileData || {};

    return (
        <div className='marketplace_profile_right_side'>
            <InfoCardWithHeader title="Verifications">
                <div className='marketplace_profile_flex_between'>
                    <InfoWithIconTitle img_url={reputationIcon} title={`Preferred Freelancer`} />
                    <span className='personal_info_mb' style={{ color: "#1492E6" }}>Join</span>
                </div>
                <div className='marketplace_profile_flex_between'>
                    <InfoWithIconTitle img_url={identity_verified ? userIcon1 : userIcon2} title={`Identity Verified`} />
                    <span className='personal_info_mb'>{
                        identity_verified ? <IoMdCheckmark size={20} color={"#058430"} /> : <RxCross2 size={20} color={"#ff0000"} />
                    }</span>
                </div>
                <div className='marketplace_profile_flex_between'>
                    <InfoWithIconTitle img_url={payment_verified ? paymentIcon1 : paymentIcon2} title={`Payment Verified`} />
                    <span className='personal_info_mb'>{
                        payment_verified ? <IoMdCheckmark size={20} color={"#058430"} /> : <RxCross2 size={20} color={"#ff0000"} />
                    }</span>
                </div>
                <div className='marketplace_profile_flex_between'>
                    <InfoWithIconTitle img_url={phone_verified ? callIcon1 : callIcon2} title={`Phone Verified`} />
                    <span className='personal_info_mb'>{
                        phone_verified ? <IoMdCheckmark size={20} color={"#058430"} /> : <RxCross2 size={20} color={"#ff0000"} />
                    }</span>
                </div>
                <div className='marketplace_profile_flex_between'>
                    <InfoWithIconTitle img_url={email_verified ? emailIcon1 : emailIcon2} title={`Email Verified`} />
                    <span className='personal_info_mb'>{
                        email_verified ? <IoMdCheckmark size={20} color={"#058430"} /> : <RxCross2 size={20} color={"#ff0000"} />
                    }</span>
                </div>
                <div className='marketplace_profile_flex_between'>
                    <InfoWithIconTitle img_url={facebook_connected ? facebookIcon1 : facebookIcon2} title={`Facebook Connected`} />
                    <span className='personal_info_mb'>{
                        facebook_connected ? <IoMdCheckmark size={20} color={"#058430"} /> : <RxCross2 size={20} color={"#ff0000"} />
                    }</span>
                </div>
            </InfoCardWithHeader>
            <InfoCardWithHeader title="Certifications">
                {
                    user_certification.map((item) => (
                        <div key={item?.id} className='marketplace_profile_flex_between'>
                            <InfoWithIconTitle img_url={item?.iso ? `/flags/4x3/${item?.iso}.svg` : boxTickIcon} title={item?.name} />
                            <span className='personal_info_mb sp1_marketplace_default_text'>{
                                item?.completed
                            }</span>
                        </div>
                    ))
                }
            </InfoCardWithHeader>
            <InfoCardWithHeader title="Top Skills">
                {
                    top_skills.map((item) => (
                        <div key={item?.id} className='marketplace_profile_flex_between'>
                            <p className='personal_info_mb sp1_marketplace_default_text'>{item?.name}</p>
                            <span className='personal_info_mb sp1_marketplace_default_text'>{
                                item?.projects
                            }</span>
                        </div>
                    ))
                }
            </InfoCardWithHeader>
            <InfoCardWithHeader title="Browse Similar Freelancers">
                <div className='similar_freelancer_tags_wrapper'>
                    {
                        related_tags?.map((item) => (
                            <div className='similar_freelancer_tag' key={item?.id}>{item?.name}</div>
                        ))
                    }
                </div>
            </InfoCardWithHeader>
            <InfoCardWithHeader title="Recent Community Articles">
                <div className='recent_community_articles_wrapper'>
                    {
                        recent_community_articles?.map((item) => (
                            <div key={item?.id} className=''>
                                <p className='personal_info_mb sp1_marketplace_default_text' style={{ fontWeight: 500 }}>{item?.title}</p>
                                <div className='marketplace_profile_flex_between' style={{ color: "#767676", fontSize: "14px" }}>
                                    <span>in {item?.category}</span>
                                    <span>{moment(item?.created_at).format('MMM DD, YYYY')}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </InfoCardWithHeader>
        </div>
    );
};

export default ProfileRightSection;