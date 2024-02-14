import React, { useEffect, useState } from "react";
import axios from "axios";
// editor
import EditIcon from "../../_Data/editor.svg";
import InputIcon from "../../_Data/input.svg";
import UploadIcon from "../../_Data/upload.svg";
import "draft-js/dist/Draft.css";
import Editor from "@draft-js-plugins/editor";
import { EditorState } from "draft-js";
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    BlockquoteButton,
    CodeButton,
} from "@draft-js-plugins/buttons";

import Loader from "../../../../global/Loader";

// ui components
import {
    SendboxWrapper,
    EditorContainer,
    EmojiWrapper,
    EditorWrapper,
    ExpendEditor,
    FileUploadButton,
    SendButton,
    RightButtonGroup,
    EditorWrapperWithImageAndToolbar,
    FilesContainer,
    FileItem,
    FileItemInput,
    RemoveFile,
    ToolbarContainer,
    AnchorLinkButton,
    MentionComment,
    ProgressBarContainer,
    ProgressBar,
    ServerMessage,
} from "./ui";
import ServiceProvider, { useEditor } from "./service";
import HandleFileIcon from "../../utils/HandleFileIcon";
import { IoLinkSharp } from "react-icons/io5";
import { useGetAllUsersQuery } from "../../../../services/api/userSliceApi";
import MentionEntry from "./MentionEntry";
import { usePostCommentMutation } from "../../../../services/api/commentsApiSlice";
import { useAuth } from "../../../../hooks/useAuth";
import { useCommentContext } from "../../CommentsBody";
import MentionedComment from "./MentiondComment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const EditorComponent = ({ setScroll, taskId, setIsLoading, onSubmit }) => {
    const { task } = useSelector((s) => s.subTask);

    console.log("inside a single task", task);
    //progress bar
    const [isFetching, setIsFetching] = React.useState(false);
    // State to track overall upload progress
    const [overallProgress, setOverallProgress] = useState(0);

    // Axios instance with onUploadProgress callback
    const axiosInstance = axios.create();

    // Function to reset overall progress
    const resetProgress = () => {
        setOverallProgress(0);
    };

    // console.log("overall progress", overallProgress);
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );

    const [users, setUsers] = React.useState([]);
    const [isMentionBoxOpen, setIsMentionBoxOpen] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState([]);
    const { data: usersData, isLoading } = useGetAllUsersQuery();
    const [expend, setExpend] = useState(false);
    const [mentionedUser, setMentionedUser] = useState([]);

    console.log("users data in sendbox", usersData);
    // editor
    const {
        plugins,
        EmojiSuggestions,
        EmojiSelect,
        files,
        clearFiles,
        handleUploadImage,
        handleRemoveImage,
        customKeyBindingFn,
        handleLinkButton,
        MentionSuggestions,
        handlePastedFiles,
        renderToHtml,
        Toolbar,
    } = useEditor();

    const {
        mentionedComment,
        setMentionedComment,
        setContextHolder,
        setSecletedComments,
        setRefetchType,
    } = useCommentContext();

    const auth = useAuth();

    // const [postComment, { isLoading: commentPostingStatus }] =
    //     usePostCommentMutation();

    React.useEffect(() => {
        if (usersData?.length > 0) {
            setSuggestions(usersData);
            setUsers(usersData);
        }
    }, [usersData, isLoading]);

    // mention
    const onOpenChange = React.useCallback((_open) => {
        setIsMentionBoxOpen(_open);
    }, []);

    //mention people
    const onSearchChange = React.useCallback(
        ({ value }) => {
            let data =
                users?.filter(
                    (user) =>
                        user?.name
                            ?.toLowerCase()
                            ?.includes(value?.toLowerCase()) &&
                        user?.role_id !== null &&
                        (user?.role_id == 1 ||
                            user?.id == task?.added_by ||
                            user?.id == task?.users?.[0].id ||
                            user?.role_id == 8 ||
                            user?.role_id == 6)
                ) || [];
            setSuggestions(data);
        },
        [users]
    );

    // handle on mention
    const handleMention = (...arg) => {
        const user = arg[0];
        // console.log(arg);
        setMentionedUser((prev) => [...prev, user.id]);
        // here mention api goes to...
    };

    // handle post comment
    const handlePostComment = async () => {
        setIsFetching(true);
        resetProgress(); // Reset progress when starting a new upload
        setRefetchType("");
        const comment = renderToHtml(editorState) ?? "";

        if (!comment && !files?.length > 0) {
            toast.error("Please write a comment or upload a images");

            return;
        }

        // form data
        const formData = new FormData();

        formData.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );

        // convert link text to link

        formData.append("comment", comment);
        formData.append("user_id", auth?.getId() ?? "");
        formData.append("task_id", taskId);
        formData.append("added_by", auth?.getId() ?? "");
        formData.append("last_updated_by", auth?.getId() ?? "");
        formData.append("mention_id", mentionedComment?.id || null);
        [...mentionedUser].forEach((user) => {
            formData.append("mention_user_id", user);
        });
        if (files.length) {
            Array.from(files).forEach((file) => {
                formData.append(`file[]`, file);
            });
        }

        try {
            // Use axiosInstance for comment submission with cancelToken
            const response = await axiosInstance.post(
                `/account/task/${taskId}/json?mode=comment_store`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        );
                        setOverallProgress(progress);
                    },
                }
            );

            await onSubmit(formData);

            /// clear all state
            if (response.status == 200) {
                setIsFetching(false);
                resetProgress();
                clearFiles();
                setEditorState(() => EditorState.createEmpty());
                setMentionedComment(null);
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Comment not sent",
                showConfirmButton: true,
                confirmButtonColor: "red",
            });
        } finally {
            setIsFetching(false);
            resetProgress();
            clearFiles();
            setEditorState(() => EditorState.createEmpty());
            setMentionedComment(null);
        }
    };

    // handle custom key command
    const handleKeyCommand = (command) => {
        if (command === "send_comment") {
            handlePostComment();
        }
    };

    // handle key down
    const handleKeyDown = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            handlePostComment();
        }
    };

    const isExpended = files?.length > 0 || expend;

    return (
        <SendboxWrapper>
            <EditorWrapperWithImageAndToolbar>
                {mentionedComment && <MentionedComment />}

                {files?.length > 0 ? (
                    <FilesContainer>
                        {files?.map((file, index) => (
                            <FileItem key={index}>
                                {/* not clickble when loading */}
                                {isFetching ? (
                                    <div
                                        style={{
                                            pointerEvents: "none",
                                            opacity: 0.5,
                                        }}
                                    >
                                        <RemoveFile
                                            onClick={() =>
                                                handleRemoveImage(index)
                                            }
                                        >
                                            <i className="fa-solid fa-xmark" />
                                        </RemoveFile>
                                        <HandleFileIcon file={file} />
                                    </div>
                                ) : (
                                    <div>
                                        <RemoveFile
                                            onClick={() =>
                                                handleRemoveImage(index)
                                            }
                                        >
                                            <i className="fa-solid fa-xmark" />
                                        </RemoveFile>
                                        <HandleFileIcon file={file} />
                                    </div>
                                )}
                            </FileItem>
                        ))}

                        <FileItemInput>
                            <input
                                type="file"
                                multiple
                                onChange={handleUploadImage}
                            />
                            <i className="fa-regular fa-square-plus" />
                        </FileItemInput>

                        {/* progress bar show */}
                        {isFetching && (
                            <ProgressBarContainer>
                                <ProgressBar
                                    style={{
                                        width: `${overallProgress}%`,
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    {overallProgress == 100
                                        ? 99
                                        : overallProgress}
                                    %
                                </ProgressBar>
                                {overallProgress == 100 && (
                                    <ServerMessage>
                                        <div>Wait for server response</div>
                                        <div style={{ marginTop: "5px" }}>
                                            <Loader
                                                title=""
                                                borderRightColor="white"
                                                width="10px"
                                                height="10px"
                                                border="2px solid #3c3d3e"
                                            />
                                        </div>
                                    </ServerMessage>
                                )}
                            </ProgressBarContainer>
                        )}
                    </FilesContainer>
                ) : null}

                {/* toolbar container */}
                {expend ? (
                    <ToolbarContainer>
                        <Toolbar>
                            {(externalProps) => (
                                <div>
                                    <BoldButton {...externalProps} />
                                    <ItalicButton {...externalProps} />
                                    <UnderlineButton {...externalProps} />
                                    <CodeButton {...externalProps} />
                                    <BlockquoteButton {...externalProps} />
                                    <AnchorLinkButton
                                        onClick={() =>
                                            handleLinkButton(
                                                editorState,
                                                setEditorState
                                            )
                                        }
                                    >
                                        <IoLinkSharp />
                                    </AnchorLinkButton>
                                </div>
                            )}
                        </Toolbar>
                    </ToolbarContainer>
                ) : null}

                <MentionSuggestions
                    open={isMentionBoxOpen}
                    onOpenChange={onOpenChange}
                    suggestions={suggestions}
                    onSearchChange={onSearchChange}
                    entryComponent={MentionEntry}
                    mentionTir
                    onAddMention={handleMention}
                />

                <EditorContainer
                    isExpended={isExpended}
                    className="w-100 d-flex align-items-end editor_container"
                >
                    <EmojiWrapper>
                        <EmojiSuggestions />
                        <EmojiSelect closeOnEmojiSelect={true} />
                    </EmojiWrapper>
                    <EditorWrapper isExpended={isExpended}>
                        <Editor
                            editorState={editorState}
                            onChange={setEditorState}
                            plugins={plugins}
                            keyBindingFn={customKeyBindingFn}
                            handleKeyCommand={handleKeyCommand}
                            placeholder="Write here..."
                            handlePastedFiles={handlePastedFiles}
                        />
                    </EditorWrapper>

                    <ExpendEditor onClick={() => setExpend(!expend)}>
                        <img src={EditIcon} />
                    </ExpendEditor>
                </EditorContainer>
            </EditorWrapperWithImageAndToolbar>

            <RightButtonGroup isExpended={isExpended}>
                <FileUploadButton>
                    <input
                        type="file"
                        multiple
                        onChange={handleUploadImage}
                        onKeyDown={handleKeyDown}
                    />
                    <img src={InputIcon} width={40} />
                </FileUploadButton>
                {/* //commentPostingStatus  was used in position of isFetching */}
                <SendButton disabled={isFetching} onClick={handlePostComment}>
                    {isFetching ? (
                        <Loader
                            title=""
                            borderRightColor="white"
                            width="28px"
                            height="28px"
                            border="2px solid #3c3d3e"
                        />
                    ) : (
                        <img src={UploadIcon} />
                    )}
                </SendButton>
            </RightButtonGroup>
        </SendboxWrapper>
    );
};

// export component with service providers
export default function Sendbox({ setScroll, taskId, setIsLoading, onSubmit }) {
    return (
        <ServiceProvider>
            <EditorComponent
                onSubmit={onSubmit}
                taskId={taskId}
                setScroll={setScroll}
                setIsLoading={setIsLoading}
            />
        </ServiceProvider>
    );
}
