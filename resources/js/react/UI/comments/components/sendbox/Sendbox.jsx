import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// editor
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

// react-icons
import { LuPencilLine } from "react-icons/lu";
import { FiSend } from "react-icons/fi";

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

//mitul import
import { useCommentStore } from "../../zustand/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditIcon from "../../_Data/editor.svg";
import InputIcon from "../../_Data/input.svg";
import UploadIcon from "../../_Data/upload.svg";

const EditorComponent = ({ setScroll, taskId, setIsLoading, onSubmit }) => {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );
    const [users, setUsers] = React.useState([]);
    const [isMentionBoxOpen, setIsMentionBoxOpen] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState([]);
    const { data: usersData, isLoading } = useGetAllUsersQuery();
    const [expend, setExpend] = useState(false);
    const [mentionedUser, setMentionedUser] = useState([]);
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
        inputKey,
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

    //mitul

    const { setCommentState } = useCommentStore();
    const { task } = useSelector((s) => s.subTask);
    const param = useParams();

    const [isFetching, setIsFetching] = React.useState(false);
    // State to track overall upload progress
    const [overallProgress, setOverallProgress] = useState(0);

    // Axios instance with onUploadProgress callback
    const axiosInstance = axios.create();

    // Function to reset overall progress
    const resetProgress = () => {
        setOverallProgress(0);
    };

    //mitul

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

    //mitul
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
                        user?.employee_detail.department_id !== 8 &&
                        user?.employee_detail.department_id !== 2 &&
                        // user?.name !== "Md. Abu Sayeed" &&
                        // user?.name !== "Mehedi Hasan Hridoy" &&
                        // user?.name !== "Hasan Hafizul Islam" &&
                        user?.name !== "Moniruzzaman" &&
                        (user?.role_id === 1 ||
                            user?.id === task?.added_by ||
                            (user?.id === task?.project_manager_id &&
                                task.subtask_id === null) ||
                            user?.id === task?.users?.[0].id ||
                            user?.role_id === 8 ||
                            user?.role_id === 6)
                ) || [];
            setSuggestions(data);
        },
        [users]
    );

    // console.log("suggestion data", suggestions);

    // handle on mention
    const handleMention = (...arg) => {
        const user = arg[0];
        // console.log(arg);
        setMentionedUser((prev) => [...prev, user.id]);
        // here mention api goes to...
    };

    // useEffect(()=>{
    //   console.log(mentionedUser);
    // },[mentionedUser])

    // handle post comment

    const comment = renderToHtml(editorState) ?? "";

    const handlePostComment = async () => {
        setIsFetching(true);
        resetProgress();
        setRefetchType("");

        if (!comment && !files?.length > 0) {
            // Swal.fire({
            //     icon: "error",
            //     title: "Please write a comment or upload a images",
            //     showConfirmButton: true,
            //     confirmButtonColor: "red",
            // });
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

            if (response.status === 200) {
                setCommentState();
                setRefetchType("");
                setIsFetching(false);
                resetProgress();
                clearFiles();
                setEditorState(() => EditorState.createEmpty());
                setMentionedComment(null);
            }

            clearFiles();
            setEditorState(() => EditorState.createEmpty());
            setMentionedComment(null);
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

                {/* mitul progressbar add */}

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
                                key={inputKey} // Use the dynamic key for the input
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
                                        <div>Waiting for server response</div>
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
                {/* mitul progressbar add */}

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
                        {/* <img src={EditIcon} /> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21.831"
                            height="14.845"
                            viewBox="0 0 21.831 14.845"
                        >
                            <g transform="translate(-42)">
                                <g
                                    id="Group_3601"
                                    data-name="Group 3601"
                                    transform="translate(42)"
                                >
                                    <path
                                        id="Path_1"
                                        d="M17.924,7.735,14.665,4.474,7.59,11.551l-1.9,5.726,5.671-1.951,7.074-7.076-.512-.515Zm-11.11,8.4,1.047-3.345,2.266,2.266Z"
                                        transform="translate(1.351 -2.431)"
                                        fill="#6f6f6f"
                                    />
                                    <path
                                        id="Path_2"
                                        d="M18.572,6.285,15.2,2.906a.279.279,0,0,0-.4,0L13.456,4.251a.281.281,0,0,0,0,.4l3.378,3.378a.281.281,0,0,0,.393,0l1.345-1.346A.273.273,0,0,0,18.572,6.285Z"
                                        transform="translate(3.175 -2.823)"
                                        fill="#6f6f6f"
                                    />
                                    <path
                                        id="Path_3"
                                        d="M0,15.111H6.225l.552-1.52H0Z"
                                        transform="translate(0 -0.267)"
                                        fill="#6f6f6f"
                                    />
                                </g>
                            </g>
                        </svg>
                    </ExpendEditor>
                </EditorContainer>
            </EditorWrapperWithImageAndToolbar>

            <RightButtonGroup isExpended={isExpended}>
                <FileUploadButton>
                    <input
                        key={inputKey}
                        type="file"
                        multiple
                        onChange={handleUploadImage}
                        onKeyDown={handleKeyDown}
                    />
                    {/* <img src={InputIcon} width={40} /> */}
                    <svg
                        width="20"
                        height="22"
                        viewBox="0 0 20 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.346 9.112V5.129C14.3416 5.01688 14.2965 4.91021 14.219 4.829L9.75304 0.136C9.71156 0.0930133 9.66185 0.058818 9.60687 0.0354527C9.5519 0.0120873 9.49278 3.02006e-05 9.43304 0L2.35104 0C2.04075 0.00104683 1.7337 0.0633012 1.44751 0.183197C1.16131 0.303093 0.901574 0.478275 0.683185 0.698708C0.464796 0.919141 0.292041 1.18049 0.174815 1.4678C0.0575902 1.7551 -0.00180167 2.06271 4.16266e-05 2.373V15.763C-0.00154383 16.0724 0.0581477 16.3791 0.175673 16.6653C0.293198 16.9515 0.466232 17.2117 0.684793 17.4307C0.903354 17.6497 1.16312 17.8233 1.4491 17.9415C1.73508 18.0596 2.04162 18.1199 2.35104 18.119H7.94104C8.45624 18.9789 9.17759 19.6969 10.0399 20.208C10.9022 20.7192 11.8783 21.0074 12.88 21.0467C13.8816 21.086 14.8773 20.875 15.7769 20.4329C16.6766 19.9908 17.452 19.3315 18.0329 18.5146C18.6138 17.6977 18.982 16.7489 19.1043 15.7539C19.2265 14.759 19.0989 13.7492 18.7329 12.816C18.367 11.8827 17.7743 11.0554 17.0083 10.4087C16.2424 9.76199 15.3274 9.31634 14.346 9.112ZM9.87104 1.54L12.871 4.694H10.924C10.6446 4.69216 10.3773 4.58008 10.1801 4.38213C9.98289 4.18419 9.87183 3.9164 9.87104 3.637V1.54ZM2.35104 17.24C2.15716 17.2404 1.96511 17.2024 1.78595 17.1283C1.6068 17.0542 1.44408 16.9453 1.30717 16.808C1.17026 16.6708 1.06186 16.5077 0.988207 16.3284C0.914558 16.149 0.877118 15.9569 0.878042 15.763V2.373C0.876328 2.17804 0.913098 1.98467 0.986245 1.80395C1.05939 1.62323 1.16748 1.45871 1.30431 1.31984C1.44115 1.18096 1.60404 1.07045 1.78365 0.994627C1.96327 0.918809 2.15608 0.879176 2.35104 0.878H8.99404V3.638C8.99378 4.15041 9.19687 4.64198 9.55873 5.00478C9.92059 5.36758 10.4116 5.57194 10.924 5.573H13.469V9C13.337 9 13.232 8.983 13.118 8.983C11.6467 8.98898 10.2267 9.52466 9.11804 10.492H3.54504C3.4857 10.4892 3.42639 10.4984 3.37072 10.5192C3.31505 10.5399 3.26417 10.5718 3.22117 10.6128C3.17817 10.6538 3.14394 10.7031 3.12055 10.7577C3.09716 10.8123 3.0851 10.8711 3.0851 10.9305C3.0851 10.9899 3.09716 11.0487 3.12055 11.1033C3.14394 11.1579 3.17817 11.2072 3.22117 11.2482C3.26417 11.2892 3.31505 11.3211 3.37072 11.3418C3.42639 11.3626 3.4857 11.3718 3.54504 11.369H8.30004C7.99258 11.792 7.73362 12.2482 7.52804 12.729H3.54504C3.42861 12.729 3.31695 12.7753 3.23462 12.8576C3.15229 12.9399 3.10604 13.0516 3.10604 13.168C3.10604 13.2844 3.15229 13.3961 3.23462 13.4784C3.31695 13.5607 3.42861 13.607 3.54504 13.607H7.24504C6.95381 14.8186 7.0457 16.0908 7.50804 17.248H2.35104V17.24ZM13.113 20.175C12.0935 20.175 11.0968 19.8727 10.2491 19.3062C9.40134 18.7398 8.74061 17.9347 8.35044 16.9927C7.96027 16.0508 7.85819 15.0143 8.05709 14.0143C8.256 13.0143 8.74697 12.0958 9.46791 11.3749C10.1888 10.6539 11.1074 10.163 12.1074 9.96405C13.1073 9.76515 14.1438 9.86723 15.0858 10.2574C16.0277 10.6476 16.8328 11.3083 17.3993 12.156C17.9657 13.0038 18.268 14.0004 18.268 15.02C18.2672 16.3871 17.7239 17.6981 16.7574 18.665C15.7909 19.6319 14.4802 20.1757 13.113 20.177V20.175Z"
                            fill="black"
                        />
                        <path
                            d="M3.54501 9.16805H7.98901C8.10544 9.16805 8.21711 9.12179 8.29944 9.03946C8.38177 8.95713 8.42802 8.84546 8.42802 8.72903C8.42802 8.6126 8.38177 8.50095 8.29944 8.41862C8.21711 8.3363 8.10544 8.29004 7.98901 8.29004H3.54501C3.42858 8.29004 3.31692 8.3363 3.2346 8.41862C3.15227 8.50095 3.10602 8.6126 3.10602 8.72903C3.10602 8.84546 3.15227 8.95713 3.2346 9.03946C3.31692 9.12179 3.42858 9.16805 3.54501 9.16805Z"
                            fill="black"
                        />
                        <path
                            d="M14.899 14.609H13.557V13.245C13.557 13.1874 13.5457 13.1303 13.5236 13.077C13.5016 13.0238 13.4692 12.9754 13.4285 12.9346C13.3877 12.8938 13.3393 12.8615 13.286 12.8394C13.2328 12.8174 13.1757 12.806 13.118 12.806C13.0604 12.806 13.0033 12.8174 12.95 12.8394C12.8968 12.8615 12.8484 12.8938 12.8076 12.9346C12.7669 12.9754 12.7345 13.0238 12.7125 13.077C12.6904 13.1303 12.679 13.1874 12.679 13.245V14.609H11.315C11.1986 14.609 11.0869 14.6553 11.0046 14.7376C10.9223 14.8199 10.876 14.9316 10.876 15.048C10.876 15.1645 10.9223 15.2761 11.0046 15.3584C11.0869 15.4408 11.1986 15.487 11.315 15.487H12.679V16.829C12.679 16.8867 12.6904 16.9437 12.7125 16.997C12.7345 17.0503 12.7669 17.0987 12.8076 17.1394C12.8484 17.1802 12.8968 17.2126 12.95 17.2346C13.0033 17.2567 13.0604 17.268 13.118 17.268C13.1757 17.268 13.2328 17.2567 13.286 17.2346C13.3393 17.2126 13.3877 17.1802 13.4285 17.1394C13.4692 17.0987 13.5016 17.0503 13.5236 16.997C13.5457 16.9437 13.557 16.8867 13.557 16.829V15.487H14.899C15.0155 15.487 15.1271 15.4408 15.2094 15.3584C15.2918 15.2761 15.338 15.1645 15.338 15.048C15.338 14.9316 15.2918 14.8199 15.2094 14.7376C15.1271 14.6553 15.0155 14.609 14.899 14.609Z"
                            fill="black"
                        />
                    </svg>
                </FileUploadButton>

                <SendButton
                    disabled={
                        isFetching ||
                        (comment.length === 0 && files.length === 0)
                    }
                    onClick={handlePostComment}
                >
                    {isFetching ? (
                        <Loader
                            title=""
                            borderRightColor="white"
                            width="28px"
                            height="28px"
                            border="2px solid #3c3d3e"
                        />
                    ) : (
                        // <img src={UploadIcon} width={40} />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23.351"
                            height="23.938"
                            viewBox="0 0 23.351 23.938"
                        >
                            <g transform="translate(-4.961 0)">
                                <path
                                    id="Path_14859"
                                    d="M4.995,22.845c-.2.9.5,1.286,1.141,1L27.9,12.683h0a.828.828,0,0,0,0-1.43h0L6.136.094c-.644-.289-1.338.094-1.141,1,.013.061,1.3,5.792,2,8.909l11.361,1.967L6.994,13.936c-.7,3.117-1.986,8.848-2,8.909Z"
                                    transform="translate(0 0)"
                                    fill="#fff"
                                />
                            </g>
                        </svg>
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
