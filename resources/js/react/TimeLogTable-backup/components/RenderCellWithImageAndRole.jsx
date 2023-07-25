import styled from 'styled-components'

const RenderWithImageAndRole = ({ avatar, name, role, url, clientFrom }) => {
    return (
        <EmployeeProfile>
            <EmployeeProfileImage>
                {avatar ? (
                    <div style={{ minWidth: "35px", minHeight: "35px", }} >
                        <img src={`/user-uploads/avatar/${avatar}`} alt={name} />
                    </div>
                ) : (
                    <span>{name.slice(0, 1)}</span>
                )}
            </EmployeeProfileImage>
            <EmployeeProfileName>
                <span><a href={url} >{name}</a></span>
                {role ? <span>{role}</span> : null}
                {clientFrom ? <a href={clientFrom}>Freelancer.com</a> : null}
            </EmployeeProfileName>
        </EmployeeProfile>
    )
}

export default RenderWithImageAndRole;

// styles

const EmployeeProfile = styled.div`
    display: flex;
    align-items: center;
`;
const EmployeeProfileImage = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #e8e8e8;
    overflow: hidden;

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 20px;
        font-weight: bold;
    }
`;
const EmployeeProfileName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
    span {
        font-size: 12px;
        font-weight: 400;
        color: #000;
        white-space: nowrap;
        &:first-child {
            font-size: 14px;
            font-weight: 600;
            color: #1d82f5;
        }
    }
`;