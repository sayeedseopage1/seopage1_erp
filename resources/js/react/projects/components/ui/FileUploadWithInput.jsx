import React from 'react';
import { AiOutlineUpload } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { getFileIcon, shortenFileName, validateUrl } from '../../utils';

function FileUploadWithInput({ inputType, placeholder, inputUrl, setInputUrl, inputFiles, setInputFiles, previous, onPreviousFileDelete, readOnly }) {

    const handleUrlChange = (event) => {
        setInputUrl(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileList = Array.from(selectedFiles);
            setInputFiles((prev) => [...prev, ...fileList]);
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                {
                    !readOnly && <input
                        type={inputType}
                        value={inputUrl}
                        onChange={handleUrlChange}
                        style={{ width: '80%' }}
                        placeholder={placeholder}
                        className={`form-control height-35 w-100 f-14`}
                    />
                }
                {
                    (readOnly && inputUrl) && <input
                        type={inputType}
                        value={inputUrl}
                        onChange={handleUrlChange}
                        style={{ width: '80%' }}
                        placeholder={placeholder}
                        className={`form-control height-35 w-100 f-14`}
                        readOnly={readOnly}
                    />
                }
                {!readOnly && <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                    multiple
                />}

                {
                    !readOnly && <label title='Upload File' htmlFor="fileInput" className='ml-1 mb-0 bg-light p-2 rounded' style={{ cursor: 'pointer' }}>
                        <AiOutlineUpload size={20} />
                    </label>
                }
            </div>
            {(inputUrl && inputType === 'url') && !validateUrl(inputUrl) && (
                <div style={{ color: "red" }}>Please enter a valid URL</div>
            )}
            <div className='d-flex align-items-center flex-wrap' style={{ gap: '10px' }}>
                {
                    !readOnly && <>{inputFiles?.map((file, index) => (
                        <div title={file?.name} style={{ width: "150px" }} key={index} className='p-1 text-center mt-2 bg-light rounded d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>{getFileIcon(file?.name?.split('.').pop())}
                                <span className='ml-1'>{shortenFileName(file?.name)}</span></div>

                            <span className='text-danger' style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => {
                                const newFiles = [...inputFiles];
                                newFiles?.splice(index, 1);
                                setInputFiles(newFiles);
                            }} >
                                <TiDelete size={20} />
                            </span>

                        </div>
                    ))}</>
                }
                {
                    previous && previous?.map((file, index) => (
                        <div title={file?.filename} style={{ width: "150px", backgroundColor: '#F1F3F5' }} key={index} className='p-1 text-center mt-2  rounded d-flex align-items-center justify-content-between'>
                            <a href={file?.file_url} target="_blank" rel="noopener noreferrer">
                                <div className='d-flex align-items-center'>{getFileIcon(file?.filename.split('.').pop())} <span className='ml-1'>{shortenFileName(file?.filename)}</span></div>
                            </a>
                            {
                                !readOnly && <span className='text-danger' style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={(e) => onPreviousFileDelete(e, file, previous)} >
                                    <TiDelete size={20} />
                                </span>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default FileUploadWithInput;