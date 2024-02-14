import React, { useState } from "react";
import axios from "axios";

// ...

const EditorComponent = ({ setScroll, taskId, setIsLoading, onSubmit }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );
    // ... (other states)

    const handlePostComment = async () => {
        setIsLoading(true); // Set loading to true when starting the upload
        setRefetchType("");

        try {
            // ... (other code)

            const response = await axios.post(`/your-api-endpoint`, formData, {
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.lengthComputable) {
                        const percentage = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );

                        setProgressMap((prevProgressMap) => {
                            const newProgressMap = new Map(prevProgressMap);
                            files.forEach((file) => {
                                newProgressMap.set(file.name, percentage);
                            });
                            return newProgressMap;
                        });

                        console.log("Updated Progress Map:", progressMap);
                    }
                },
            });

            // Handle the response as needed
            console.log("Response:", response.data);

            // Additional logic...
        } catch (error) {
            console.error("Error:", error);

            // Additional error handling...
        } finally {
            setIsLoading(false); // Set loading to false when the upload is complete
        }
    };

    return (
        <div>
            {/* Your existing JSX */}
            {isLoading && <div>Loading...</div>}
        </div>
    );
};

export default EditorComponent;
