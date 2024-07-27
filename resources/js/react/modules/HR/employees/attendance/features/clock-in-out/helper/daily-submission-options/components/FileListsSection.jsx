import React from "react";
import styled from "styled-components";
import FileLists from "./FileLists";

const Section = styled.div`
    text-align: center;
`;

const NA = styled.div`
    margin-top: 5px;
    color: "gray";
`;
const FileIcon = styled.div`
    margin-top: 5px;
    max-width: 100px;
    overflow-x: auto;
`;

export const FileListSection = ({ title, links }) => (
    <Section>
        <div>{title}</div>
        {links?.length > 0 ? (
            <FileIcon>
                <FileLists links={links} />
            </FileIcon>
        ) : (
            <NA>N/A</NA>
        )}
    </Section>
);
