import React from "react";
import PropTypes from "prop-types";

// style
import style from "./profileAvatar.module.css";
import Switch from "../../../global/Switch";

/**
 *  Profile Avatar Component
 * @param {object} personInfo - person information
 * @returns {JSX.Element}
 *
 *  @example
 * <ProfileAvatar personInfo={personInfo} />
 *
 */

const ProfileAvatar = ({ personInfo }) => {
    const handleError = (e) => {
        e.target.src = "/img/avatar.png";
        e.target.alt = personInfo?.name?.slice(0, 1).toUpperCase() || "A";
    };

    const avatarSrc = personInfo?.avatar
        ? `/user-uploads/avatar/${personInfo?.avatar}`
        : "/img/avatar.png";
    const avatarAlt = personInfo?.name?.slice(0, 1).toUpperCase() || "A";

    return (
        <div className={`${style.sp1_profile_avatar_wrapper}`}>
            <Switch>
                <div className={`${style.sp1_profile_avatar}`}>
                    <Switch.Case condition={personInfo?.avatar}>
                        <img
                            src={avatarSrc}
                            alt={avatarAlt}
                            width="40px"
                            onError={handleError}
                        />
                    </Switch.Case>
                    <Switch.Case condition={!personInfo?.avatar}>
                        <div
                            className={`${style.sp1_profile_error_avatar_text}`}
                        >
                            {personInfo?.name?.slice(0, 1).toUpperCase()}
                        </div>
                    </Switch.Case>
                </div>
                <div className={`${style.sp1_profile_content}`}>
                    <h3 className={`${style.sp1_profile_content_name}`}>John Doe</h3>
                    <p className={`${style.sp1_profile_content_designation}`}>Sr. Executive</p>
                    <p className={`${style.sp1_profile_content_em_id}`}>E.Id : Seopage1/0131</p>
                </div>
            </Switch>
        </div>
    );
};

export default ProfileAvatar;

ProfileAvatar.propTypes = {
    personInfo: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
    }),
};
