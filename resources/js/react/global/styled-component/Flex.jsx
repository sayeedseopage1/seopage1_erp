import styled from "styled-components";

export const Flex = styled.div`
    display: flex;
    width: ${props => props.width ? props.width : '100%'};
    align-items: ${props => props.alignItem ? props.alignItem : 'top'};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
    gap: ${props => props.gap ? props.gap : '10px'}
`;
