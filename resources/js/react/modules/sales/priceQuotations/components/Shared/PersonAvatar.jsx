import React from "react";
import PropTypes from "prop-types";

const PersonAvatar = ({ avatar, name, url, imageClass = "", imageParentClass = "" }) => {
    return (
        <div className="d-flex align-items-center">
            <div className="">
                {avatar ? (
                    <div
                        className={`${imageParentClass}`}
                        style={{
                            borderRadius: "4px",
                        }}
                    >
                        <img
                            src={`/user-uploads/avatar/${avatar}`}
                            alt={name}
                            width="40px"
                            className={`${imageClass}`}
                            onError={(e) => {
                                e.target.src = "/img/avatar.png";
                                e.target.alt =
                                    name?.slice(0, 1).toUpperCase() || "A"; 
                            }}
                        />
                    </div>
                ) : (
                    <div
                        className="sp1-item-center border"
                        style={{
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#f3f4f6",

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
    imageClass: PropTypes.string,
    imageParentClass: PropTypes.string,
};