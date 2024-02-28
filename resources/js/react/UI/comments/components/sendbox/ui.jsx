import styled, { keyframes } from "styled-components";

// styled components
export const SendboxWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-end;
    gap: 1rem;
`;

export const EditorContainer = styled.div`
    display: flex;
    border-top: ${({ isExpended }) => (isExpended ? "2px solid #fff" : "none")};
    background: #daedf8;
    border-radius: ${({ isExpended }) =>
        isExpended ? "0 0 10px 10px" : "30px"};
`;

export const ExpendEditor = styled.button`
    width: 36px;
    height: 36px;
    padding: 0;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    color: #888;
    line-height: 1;
    background-color: transparent;
    margin-bottom: 4px;
    margin-right: 8px;
    & > svg {
        width: 24px;
        height: 19px;
    }
    &:hover {
        background-color: transparent;
        color: #272829;
    }
`;

export const EditorWrapper = styled.div`
    width: 100%;
    max-height: 150px;
    overflow-x: hidden;
    overflow-y: auto;

    & > .DraftEditor-root {
        border-radius: 6px;
        flex-grow: 1;
        height: 100%;

        & > .public-DraftEditorPlaceholder-root {
            position: absolute;
            top: 14px;
            left: 10px;
        }

        & > .DraftEditor-editorContainer {
            height: 100%;

            & > .public-DraftEditor-content {
                padding: 14px 10px;
                height: 100%;
                cursor: text;
            }
        }
    }
`;

export const EmojiWrapper = styled.div`
    /* emoji */
    & > div > button {
        width: 36px;
        height: 36px;
        padding: 0;
        font-size: 2.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: none;
        line-height: 1;
        padding-bottom: 8px;
        background-color: transparent;
        margin-bottom: 5px;
        margin-left: 8px;
    }
    & > div > button:hover {
        background-color: transparent;
        color: #ffa200;
    }
`;

export const FileUploadButton = styled.button`
    border-radius: 6px;
    padding: 8px 14px;
    background: #daedf8;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    & > input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }

    & > svg {
        width: 28px;
        height: 32px;
        fill: #daedf8;
        margin-left: 0.25rem;
    }

    &:hover {
        background: rgb(0 0 0 / 10%);
        svg {
            fill: #272829;
        }
    }
`;

export const SendButton = styled(FileUploadButton)`
    background: #009cec;
    padding: 10px 16px;
    height: 48px;

    & > svg {
        width: 28px;
        height: 28px;
        fill: #fff;
    }

    &:hover {
        background: rgb(15, 120, 239);

        svg {
            fill: #fff;
        }
    }
`;

export const RightButtonGroup = styled.div`
    display: flex;
    flex-direction: ${({ isExpended }) => (isExpended ? "column" : "row")};
    align-items: center;
    gap: ${({ isExpended }) => (isExpended ? "8px" : "16px")};
`;

export const EditorWrapperWithImageAndToolbar = styled.div`
    width: 100%;
    max-width: 80%;
`;

export const FilesContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    background-color: #daedf8;
    padding: 1rem;
    border-radius: 10px 10px 0 0;
`;

export const FileItem = styled.div`
    width: 69px;
    height: 72px;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
`;

export const FileItemInput = styled(FileItem)`
    width: 69px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #ccc;
    position: relative;
    overflow: hidden;

    & > input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 2;
        cursor: pointer;
    }

    &:hover {
        cursor: pointer;
        background-color: #f8f8f8;
    }
`;

export const RemoveFile = styled.button`
    position: absolute;
    top: 2px;
    right: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 0 3px rgb(0 0 0 / 10%);
`;

export const ToolbarContainer = styled.div``;

export const AnchorLinkButton = styled.button`
    font-size: 24px;
    border: 0;
    padding-top: 5px;
    vertical-align: bottom;
    width: 36px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    color: #777;
    background-color: transparent;

    &:hover {
        color: #f75f19;
    }
`;

// mention Comment
export const MentionComment = styled.div``;

export const ProgressBarContainer = styled.div`
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
    margin: 10px 0;
`;

export const ProgressBar = styled.div`
    height: 25px;
    background-color: #4caf50;
    width: 0;
    padding: 4px;
    border-radius: 5px;
    transition: width 0.3s ease;
    text-align: "center";
`;

export const ServerMessage = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    justify-content: center;
    background-color: #daedf8;
    padding-top: 10px;
`;
