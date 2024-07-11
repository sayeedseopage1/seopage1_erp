import React from "react";
import PropTypes from "prop-types";

// style
import style from "./profileAvatar.module.css";
import Switch from "../../../global/Switch";
import { Placeholder } from "../../../global/Placeholder";

/**
 *  Profile Avatar Component
 * @param {object} personInfo - person information
 * @returns {JSX.Element}
 *
 *  @example
 * <ProfileAvatar personInfo={personInfo} />
 *
 */

const ProfileAvatar = ({ personInfo, isLoading }) => {
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
                    <Switch.Case condition={personInfo?.avatar && !isLoading}>
                        <img
                            src={avatarSrc}
                            alt={avatarAlt}
                            width="40px"
                            onError={handleError}
                        />
                    </Switch.Case>
                    <Switch.Case condition={!personInfo?.avatar && !isLoading}>
                        <div
                            className={`${style.sp1_profile_error_avatar_text}`}
                        >
                            {personInfo?.name?.slice(0, 1).toUpperCase()}
                        </div>
                    </Switch.Case>
                    <Switch.Case condition={isLoading}>
                        <Placeholder height="85px" width="85px" />
                    </Switch.Case>
                </div>
                <Switch.Case condition={isLoading}>
                    <div className={`${style.sp1_profile_content}`}>
                        <Placeholder height="27px" width="120px" />
                        <Placeholder height="21px" width="80px" />
                        <Placeholder height="21px" width="120px" />
                    </div>
                </Switch.Case>
                <Switch.Case condition={!isLoading}>
                    <div className={`${style.sp1_profile_content}`}>
                        <h3 className={`${style.sp1_profile_content_name}`}>
                            John Doe
                        </h3>
                        <p
                            className={`${style.sp1_profile_content_designation}`}
                        >
                            Sr. Executive
                        </p>
                        <p className={`${style.sp1_profile_content_em_id}`}>
                            E.Id : Seopage1/0131
                        </p>
                    </div>
                </Switch.Case>
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
