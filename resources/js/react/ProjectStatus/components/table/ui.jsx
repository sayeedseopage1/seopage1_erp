import styled from "styled-components";
// container
export const TableContainer = styled.div`
    width: 100%;
    overflow: auto;
    max-height: calc(100vh - 300px);
`;

export const Table = styled.table`
    min-width: 100%;
`;

export const TableHead = styled.thead`
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
`;
export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
    &:nth-child(odd) {
        background-color: rgb(0 0 0 / 3%);
    }

    &:hover {
        background-color: rgb(0 0 0 / 6%);
    }
`;
export const TableHeadItem = styled.th`
    padding: 10px 16px;
    white-space: nowrap;
    background-color: #fff;
`;
export const TableItem = styled.td`
    padding: 3px 16px;
    max-width: 256px;
    min-width: min-content;
    overflow: hidden;
`;

export const TableFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
`;

export const Flex = styled.div`
    display: flex;
    align-items: ${(props) => props.alignItems ?? "center"};
    justify-content: ${(props) => props.justifyContent ?? "center"};
    gap: ${(props) => props.gap ?? "10px"};
    margin: ${(props) => props.margin ?? "0px 0px 0px 0px"};
`;

// select
export const Select = styled.select`
    padding: 6px;
    border-radius: 4px;
    border-color: rgb(0 0 0 / 10%);
`;

// table data design
export const ProjectID = styled.div`
    width: 130px;
`;

export const ProjectBudget = styled.div`
    width: 100px;
`;
export const BidValue = styled.div`
    width: 80px;
`;
export const CreatedAt = styled.div`
    width: 90px;
`;
export const CreatedBy = styled.a`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 180px;
`;
export const BiddingDelayTime = styled.div``;
export const Status = styled.div``;
export const DealStatus = styled.div`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    padding: 0 10px;
    font-size: 10px;
    font-weight: 600;
    border-radius: 10px;
    width: 100px;
`;

export const Action = styled.div``;
