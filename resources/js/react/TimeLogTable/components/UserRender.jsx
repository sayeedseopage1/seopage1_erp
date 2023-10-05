import React from "react";

const UserRender = ({ image, name, role, id, profileUrl, roleLink }) => {
    return (
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
            {image ? (
                <img
                    src={`/user-uploads/avatar/${image}`}
                    alt={''}
                    className="rounded-circle "
                    style={{ width: 32, height: 32 }}
                />
            ) : (
                <div
                    className="sp1-item-center border rounded-circle"
                    style={{
                        width: "36px",
                        height: "36px",
                    }}
                >
                    <span
                        style={{
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                        }}
                    >
                        {name?.slice(0, 1).toUpperCase()}
                    </span>
                </div>
            )}

            <div className="">
                <h6 className="mb-0 f-14">
                    <a href={profileUrl} className="text-hover-underline">{name}</a>
                </h6>
                <span className="f-12">
                    {roleLink ? <a href={roleLink} className="text-dark text-hover-underline">{role}</a> : role}
                </span>
            </div>
        </div>
    );
};

export default UserRender;
