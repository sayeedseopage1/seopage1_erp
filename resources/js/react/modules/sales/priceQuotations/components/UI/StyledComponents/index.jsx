import styled from "styled-components";

export const TableTdWrapper = styled.div`
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent || "center"};
    align-items: ${({ alignItems }) => alignItems || "center"};
    text-align: center;

    a {
        color: #007bff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    button {
        background-color: transparent;

        &.antd_custom_switch {
            .ant-switch {
                background-color: var(--lightgray);
            }
            .ant-switch-checked{
                background-color: var(--primarySuccess);
            }
            .ant-switch-checked:hover{
                background-color: var(--primarySuccess);
            }
        }
    }
`;

export const ModalContentContainer = styled.div`
    padding: ${(props) => props.padding || "16px 30px"};
    background: ${(props) => props.color || "#F3FAFF"};
    scrollbar-width: thin;
    scrollbar-color: #99bcd4 transparent;
    scroll-behavior: smooth !important;
    border-radius: 8px !important;
    -webkit-border-radius: 5px;

    &::-webkit-scrollbar {
        width: 10px !important;
        scroll-behavior: smooth !important;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ccc !important;
        border-radius: 10px !important;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent !important;
        border-radius: 10px !important;
    }

    .custom_check_box {
        margin-bottom: 19px !important;
        label {
            font-family: Poppins, sans-serif;
            font-size: 14px;
            font-weight: 400;
            color: var(--primaryDarkText);
            font-style: normal;
            line-height: normal;
        }
    }
`;

export const ContentWrapper = styled.div`
    min-width: 100%;
    align-items: ${({ alignItems }) => alignItems || "flex-start"};
    display: flex;
    gap: ${({ gap }) => gap || "20px"};

    & > div {
        width: 100%;
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
