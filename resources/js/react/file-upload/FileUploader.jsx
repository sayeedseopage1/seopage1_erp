import * as React from "react";
import Button from "./Button";
import "./file-upload.css";

const FileUploaderContext = React.createContext();

// render icon
const RenderIcon = ({ filename, size }) => {
    // get ext
    if(!filename) return null;
    let arr = filename.split(".");
    let ext = arr[arr.length - 1];
    let _filename =
        filename?.slice(0, 2) +
        ".." +
        filename?.slice(filename.length - (ext.length + 2), filename?.length);

    return (
        <div
            className="uploaded-file-preview"
            data-toggle="tooltip"
            data-placement="top"
            title={filename}
        >
            <div className="__icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                </svg>

                <span className={`uploaded-file-ext uploaded-file-ext-${size}`}>
                    {ext?.slice(0, 3)}
                </span>
            </div>
            <span
                className={`d-block uploaded-file-name uploaded-file-name-${size}`}
            >
                {_filename}
            </span>
        </div>
    );
};

// file input
const FileInput = ({ className = "" }) => {
    const { setFiles, previews, setPreviews } = React.useContext(FileUploaderContext);

    const handleFileUpload = (e) => {
        const uploadedFiles = e.target.files;
        setFiles((prev) => [...prev, ...uploadedFiles]);

        const filePreviews = [];

        for (let i = 0; i < uploadedFiles.length; i++) {
            const reader = new FileReader();
            const file = uploadedFiles[i];

            reader.onload = (event) => {
                const arr = file.name.split(".");
                const ext = arr[arr.length - 1];

                filePreviews.push({
                    name: file.name,
                    type: file.type,
                    preview: event.target.result,
                    ext,
                });

                if (filePreviews.length === uploadedFiles.length) {
                    setPreviews([...previews, ...filePreviews]);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={`sp1_file_upload--input-wrapper ${className}`}>
            <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="sp1_file_upload--input"
            />
            <i className="fa-solid fa-cloud-arrow-up"></i>
            <span className="mt-2">Upload Files</span>
        </div>
    );
};

// previews
const FilePreview = ({
    id,
    deleteAble = true,
    onRemove,
    downloadAble = true,
    downloadUrl = "#",
    fileType = "",
    fileName = "",
    previewUrl = "",
    ext = "",
    classname = "",
    size = "sm",
    ...props
}) => {
    return (
        <a href={downloadUrl} target="_blank" onClick={e => !downloadAble && e.preventDefault()} download={downloadAble}>
            <div className={`sp1_file_upload--input-preview ${classname}`} {...props}>
                {/* delete button */}
                {deleteAble  && (
                    <Button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onRemove(e, id)
                        }}
                        className='__remove--btn'
                    >
                        <i className="fa-regular fa-trash-can"></i>
                    </Button>
                )}
                {/* end delete button */}
                {(fileType === "images" || fileType.startsWith('image/')) ? (
                    <img
                        src={previewUrl}
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            maxWidth: "80px",
                            maxHeight: "80px",
                            objectFit: "fill",
                        }}
                    />
                ) : (
                    <RenderIcon filename={fileName} size={size} />
                )}

            </div>
        </a>
    );
};

// uploaded file previews
const SelectedFilePreveiw = ({children}) => {
    const { previews, files, setFiles, setPreviews } = React.useContext(FileUploaderContext);

    const onDelete = (e, index) => {
        e.stopPropagation();
        const updatePreview = [...previews];
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        updatePreview.splice(index, 1);
        setFiles(updatedFiles);
        setPreviews(updatePreview)
    }

    return children({previews, onDelete})
}

// file uploader
const FileUploader = ({ files, setFiles, children, className = "" }) => {
    const [previews, setPreviews] = React.useState("");
    return (
        <FileUploaderContext.Provider
            value={{
                files,
                setFiles,
                previews,
                setPreviews,
            }}
        >
            <div
                className={`d-flex flex-wrap align-items-center ${className}`}
                style={{ gap: "10px" }}
            >
                {children}
            </div>
        </FileUploaderContext.Provider>
    );
};

FileUploader.Input = FileInput;
FileUploader.Preview = FilePreview;
FileUploader.SelectedFiles = SelectedFilePreveiw

export default FileUploader;
