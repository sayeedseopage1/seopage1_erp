import React from 'react';
import InfoCardWithHeader from '../ui/InfoCardWithHeader';

const ProfileRightSection = ({ profileData }) => {
    return (
        <div className='marketplace_profile_right_side'>
            <InfoCardWithHeader title="Verifications">
                Verifications
            </InfoCardWithHeader>
            <InfoCardWithHeader title="Certifications">
                Certifications
            </InfoCardWithHeader>
            <InfoCardWithHeader title="Top Skills">
                Top Skills
            </InfoCardWithHeader>
            <InfoCardWithHeader title="Browse Similar Freelancers">
                Browse Similar Freelancers
            </InfoCardWithHeader>
            <InfoCardWithHeader title="Recent Community Articles">
                Recent Community Articles
            </InfoCardWithHeader>
        </div>
    );
};

export default ProfileRightSection;