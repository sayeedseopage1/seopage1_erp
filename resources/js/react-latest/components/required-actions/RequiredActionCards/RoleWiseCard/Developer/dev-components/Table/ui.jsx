import styled from "styled-components";

export const EvalTableTitle = styled.div`
    padding: 20px;
    width: 100%;
    height: 70px;
    padding-bottom: 10px;
    box-shadow: 0px 0px 16.5px -15px rgba(0, 0, 0, 0.035),
        0px 0px 80px -15px rgba(0, 0, 0, 0.07);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 24px;
    padding-bottom: 10px;
    background-color: #1d82f5;
    color: #ffffff;
`;
export const FooterButtons = styled.div`
    display: flex;
    justify-content: right;
    margin-top: 20px;
    margin-right: 50px;
    gap: 20px;
    align-items: center;
`;
export const ColumnContent = styled.div`
    position: relative;
    padding: 10px;
    min-width: 200px;
    min-height: 60px;
`;

// container
export const TableContainer = styled.div`
    width: 100%;
    overflow: auto;
    max-height: calc(100vh - 300px);

    padding-bottom: 10px;
    box-shadow: 0px 0px 16.5px -15px rgba(0, 0, 0, 0.035),
        0px 0px 80px -15px rgba(0, 0, 0, 0.07);
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
    padding-inline: 20px;
    &:nth-child(odd) {
        background-color: rgb(0 0 0 / 3%);
    }

    &:hover {
        background-color: rgb(0 0 0 / 6%);
    }
`;
export const TableHeadItem = styled.th`
    padding: 10px 16px;
    font-weight: 400;
    background-color: #fff;
    color: #99a5b5;
    white-space: nowrap;
    box-shadow: 0 1px 0 0 #f1f1f3;

    cursor: -moz-grab;
    cursor: -webkit-grab;
    cursor: grab;

    &.dragging {
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
        cursor: grabbing;
    }
    &.dropArea {
        background-color: #f7f7f7;
    }

    &.project_name {
        width: 256px;
        /* min-width: 256px; */
    }

    &.actual_amount {
        white-space: pre-wrap;
        width: 150px;
        min-width: 150px;
    }
`;
export const TableItem = styled.td`
    padding: 3px 16px;
    max-width: 200px;
    min-width: min-content;
    overflow: hidden;

    & a {
        color: #28313c;
    }
`;

export const TableFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px;
`;

export const Flex = styled.div`
    display: flex;
    align-items: ${(props) => props.alignItems ?? "center"};
    justify-content: ${(props) => props.justifyContent ?? "center"};
    gap: ${(props) => props.gap ?? "10px"};
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
    text-align: right;
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

export const Status = styled.div`
    background-color: ${({ bgColor }) =>
        bgColor.toUpperCase() === "#FFFF00" ? "#e6e600" : bgColor};
    color: ${({ bgColor }) =>
        bgColor.toUpperCase() === "#FFFF00" ? "#111" : "#fff"};
    border-radius: 10px;
    font-size: 11px;
    padding: 0;
    width: fit-content;
    font-weight: bold;
    padding: 0 8px;
    line-height: 16px;
    white-space: nowrap;
`;

export const DealStatus = styled.div`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    padding: 3px 4px;
    font-size: 8px;
    font-weight: 500;
    border-radius: 0.5rem;
    width: 100px;
`;

export const Action = styled.div``;

export const EmptySpace = styled.span`
    color: #ccc;
`;
