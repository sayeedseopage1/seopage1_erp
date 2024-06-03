import styled from "styled-components";

export const TableTdWrapper = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  text-align: center;

`