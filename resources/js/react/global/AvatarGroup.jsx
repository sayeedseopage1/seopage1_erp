import React from "react";
import styles from "./AvatarGroup.module.css";
import _ from "lodash";

const AvatarGroup = ({ users = [], className = "", show=2 }) => {

    const len = _.size(users);

    const avatars = len > show ? users.splice(0, show) : users;

    return (
        <div className={styles.avatar_group}>


            {len > show && (
                <div  className={`${styles.avatar} ${className} ${styles.empty_avatar}`} >
                    <span> +{len}</span>
                </div>
            )}
            {_.map(avatars, (user, i) => (
                <div key={i} className={`${styles.avatar} ${className}`}>
                    <img
                        src={user.src}
                        alt=""
                        className={styles.avatar_image}
                    />
                </div>
            ))}
        </div>
    );
};

export default AvatarGroup;
