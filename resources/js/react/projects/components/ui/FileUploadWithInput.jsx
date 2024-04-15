import React from 'react';
import { AiOutlineUpload } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { getFileIcon, shortenFileName, validateUrl } from '../../utils';

function FileUploadWithInput({ inputType, placeholder, inputUrl, setInputUrl, inputFiles, setInputFiles, previous, onPreviousFileDelete }) {

    const handleUrlChange = (event) => {
        setInputUrl(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileList = Array.from(selectedFiles);
            setInputFiles(fileList);
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                <input
                    type={inputType}
                    value={inputUrl}
                    onChange={handleUrlChange}
                    style={{ width: '80%' }}
                    placeholder={placeholder}
                    className={`form-control height-35 w-100 f-14`}
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                    multiple
                />
                <label title='Upload File' htmlFor="fileInput" className='ml-1 mb-0 bg-light p-2 rounded' style={{ cursor: 'pointer' }}>
                    <AiOutlineUpload size={20} />
                </label>
            </div>
            {(inputUrl && inputType === 'url') && !validateUrl(inputUrl) && (
                <div style={{ color: "red" }}>Please enter a valid URL</div>
            )}
            <div className='d-flex align-items-center flex-wrap' style={{ gap: '10px' }}>
                {inputFiles?.map((file, index) => (
                    <div title={file?.name} style={{ width: "150px" }} key={index} className='p-1 text-center mt-2 bg-light rounded d-flex align-items-center justify-content-between'>
                        <div>{getFileIcon(file?.name.split('.').pop())} {shortenFileName(file?.name)}</div>

                        <span className='text-danger' style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => {
                            const newFiles = [...inputFiles];
                            newFiles?.splice(index, 1);
                            setInputFiles(newFiles);
                        }} >
                            <TiDelete size={20} />
                        </span>

                    </div>
                ))}
                {
                    previous && previous?.map((file, index) => (
                        <div title={file?.filename} style={{ width: "150px" }} key={index} className='p-1 text-center mt-2 bg-light rounded d-flex align-items-center justify-content-between'>
                            <a href={file?.file_url} target="_blank" rel="noopener noreferrer">
                                <div>{getFileIcon(file?.filename.split('.').pop())} {shortenFileName(file?.filename)}</div>
                            </a>
                            <span className='text-danger' style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={(e) => onPreviousFileDelete(e, file, previous)} >
                                <TiDelete size={20} />
                            </span>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default FileUploadWithInput;