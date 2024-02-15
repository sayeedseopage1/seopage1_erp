// ... (your existing imports)

const EditorComponent = ({ setScroll, taskId, setIsLoading, onSubmit }) => {
    // ... (your existing code)

    // State to track overall upload progress
    const [overallProgress, setOverallProgress] = useState(0);

    // Axios instance with onUploadProgress callback and cancelToken
    const axiosInstance = axios.create();

    // Function to reset overall progress
    const resetProgress = () => {
        setOverallProgress(0);
    };

    // handle post comment
    const handlePostComment = async () => {
        resetProgress(); // Reset progress when starting a new upload
        setRefetchType("");
        const comment = renderToHtml(editorState) ?? "";
        console.log({ comment });

        if (!comment && !files?.length > 0) {
            toast.error("Please write a comment or upload images");
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
            const cancelSource = axios.CancelToken.source();

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
                    cancelToken: cancelSource.token,
                }
            );

            console.log("comment submission response", response);
            console.log("overall progress after submit", overallProgress);

            await onSubmit(formData);

            /// clear all state
            if (response.status === 200) {
                clearFiles();
                setEditorState(() => EditorState.createEmpty());
                setMentionedComment(null);
            }
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Upload canceled");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Comment not sent",
                    showConfirmButton: true,
                    confirmButtonColor: "red",
                });
            }
        }
    };

    // ... (your existing code)

    return <SendboxWrapper>{/* ... (your existing code) */}</SendboxWrapper>;
};

export default function Sendbox({ setScroll, taskId, setIsLoading, onSubmit }) {
    // ... (your existing code)
}
