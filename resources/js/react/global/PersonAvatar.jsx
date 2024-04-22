import React from 'react'

const PersonAvatar = ({ avatar, name }) => {
    return (
        <div className='' style={{ width: '32px' }}>
            {avatar ?
                <div
                    style={{
                        width: "32px",
                        height: "32px",
                    }}
                >
                    <img
                        src={`/user-uploads/avatar/${avatar}`}
                        alt={name}
                        width="32px"
                        height="32px"
                        className="rounded-circle"
                        onError={(e) => {
                            e.target.src = "/img/avatar.png";
                            e.target.alt = name?.slice(0, 1).toUpperCase() || 'A'; // 'A' is the default if name is undefined
                        }}
                    />
                </div>
                : <div
                    className="sp1-item-center border rounded-circle"
                    style={{
                        width: "32px",
                        height: "32px",
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
            }
        </div>
    )
}

export default PersonAvatar