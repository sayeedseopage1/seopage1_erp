import React, { useState } from 'react';
import LgDataCardWithHeader from '../ui/LgDataCardWithHeader';
import moment from 'moment';
import { Pagination, Select } from 'antd';
import threeDotIcon from '../../../assets/marketplaceProfile/dot-three.svg';
import ReviewCard from '../ui/ReviewCard';
import ProfilePersonalInfoSection from './ProfilePersonalInfoSection';
import { antdPaginate } from '../../../utils/antdPaginate';


const ProfileLeftSection = ({ profileData }) => {
    const { reviews, experiences, educations, qualifications, publications } = profileData || {};

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;

    // Get the reviews for the current page
    const currentReviews = antdPaginate(reviews, currentPage, reviewsPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleReviewFilterChange = (value) => {
        console.log(`selected ${value}`);
    }
    return (
        <div className='marketplace_profile_left_side'>
            <ProfilePersonalInfoSection profileData={profileData} />
            <LgDataCardWithHeader title={"Portfolio"} actionCompo={
                <div className='personal_info_action_wrapper'>
                    <button className='list_of_milestones_btn_outline'>Edit Layout</button>
                    <button className='list_of_milestones_btn'>Manage</button>
                </div>
            }>
                portfolio
            </LgDataCardWithHeader>
            <LgDataCardWithHeader title={"Reviews"} actionCompo={
                <div>
                    <span className='profile_reviews_label'>Filter Reviews by:</span>
                    <Select
                        className='profile_reviews_select'
                        defaultValue="all"
                        style={{
                            width: 120,
                        }}
                        onChange={handleReviewFilterChange}
                        options={[
                            {
                                value: 'all',
                                label: 'View All',
                            },
                            {
                                value: 'latest',
                                label: 'Latest',
                            },
                            {
                                value: 'oldest',
                                label: 'Oldest',
                            },
                        ]}
                    />
                </div>
            }>
                <div className='profile_review_wrapper'>
                    <h2 className='filtered_reviews_result'>
                        Showing {(currentPage - 1) * reviewsPerPage + 1}-{Math.min(currentPage * reviewsPerPage, reviews?.length)} out of {reviews?.length} reviews
                    </h2>
                    {
                        currentReviews?.map((item, index) => {
                            const isLast = index === currentReviews?.length - 1;
                            return (
                                <ReviewCard item={item} isLast={isLast} key={item?.id} />
                            );
                        })
                    }
                    <div className='reviews_pagination'>
                        <Pagination
                            current={currentPage}
                            total={reviews?.length}
                            pageSize={reviewsPerPage}
                            onChange={handlePageChange}
                            responsive
                        />
                    </div>
                </div>
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