import styled from "styled-components";

export const RefreshButton = styled.button`
    background: #1D82F5;
    padding: 0.4rem 1rem;
    color: #fff;
    border-radius: 6px;
    border: 1px solid #1D82F5;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px; 

    &:hover {
        background: #1D82F5;
        color: #fff;
    }

    & > i{
        animation: ${props => props.isLoading ? 'rotate 2s linear infinite' : 'none'};
    }
/* add rotate animation for this button on load */
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    & > i {
        animation: rotate 2s linear infinite;
    }
`;