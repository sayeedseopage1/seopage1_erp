import styled from "styled-components";

export const SectionWrapper = styled.div`
    padding: ${(props) => props.padding || "20px"};
    margin: ${(props) => props.margin || "0"};
    background-color: ${(props) =>
        props.backgroundColor || "var(--primaryLightBlue)"};
    border-radius: ${(props) => props.borderRadius || "var(--borderRadius)"};
    gap: ${(props) => props.gap || "0"};
    border: ${(props) => props.border || "none"};

    &.sp1_dashboard_header_section {
        display: flex;

        .sp1_dashboard_header_user_info{
            display: flex;
            flex: 1;
        }

        @media screen and (max-width: 768px) {
            flex-direction: column;
        }
    }

`;
