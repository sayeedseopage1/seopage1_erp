import React from "react";
import PropTypes from "prop-types";

const PersonAvatar = ({ avatar, name, url }) => {
    return (
        <div className="d-flex align-items-center">
            <div className="">
                {avatar ? (
                    <div
                        style={{
                            borderRadius: "4px",
                        }}
                    >
                        <img
                            src={`/user-uploads/avatar/${avatar}`}
                            alt={name}
                            width="40px"
                            onError={(e) => {
                                e.target.src = "/img/avatar.png";
                                e.target.alt =
                                    name?.slice(0, 1).toUpperCase() || "A"; // 'A' is the default if name is undefined
                            }}
                        />
                    </div>
                ) : (
                    <div
                        className="sp1-item-center border"
                        style={{
                            borderRadius: "4px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                            }}
                        >
                            {name?.slice(0, 1).toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
            {url && (
                <a href={url} className="pl-2 ">
                    {name}
                </a>
            )}
        </div>
    );
};

export default PersonAvatar;

PersonAvatar.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
};
