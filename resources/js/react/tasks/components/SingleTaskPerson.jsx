import React from 'react'

const SingleTaskPerson = ({ avatar, name }) => {
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

export default SingleTaskPerson