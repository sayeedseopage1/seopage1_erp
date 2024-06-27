import React from "react";
import PropTypes from "prop-types";
import { isURL } from "validator";
import { is } from "immutable";

const PersonAvatar = ({ avatar, name, url, imageClass = "", imageParentClass = "" }) => {

    const isImageUrlValid = (avatar) => {
        // check is avatar is a url or not
        if(isURL(avatar, { protocols: ["http", "https"] })){
            return avatar;
        } else {
            return `/user-uploads/avatar/${avatar}`;
        }
    }
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
                            src={isImageUrlValid(avatar)}
                            alt={name}
                            width="40px"
                            className={`${imageClass}`}
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
    imageClass: PropTypes.string,
    imageParentClass: PropTypes.string,
};
