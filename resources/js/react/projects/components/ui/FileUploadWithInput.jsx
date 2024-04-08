/* import React, { useState } from 'react';
import { AiOutlineUpload } from "react-icons/ai";
import { FaFileImage, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFile } from "react-icons/fa";

function getFileIcon(extension) {
    switch (extension.toLowerCase()) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            return <FaFileImage />;
        case 'pdf':
            return <FaFilePdf />;
        case 'doc':
        case 'docx':
            return <FaFileWord />;
        case 'xls':
        case 'xlsx':
            return <FaFileExcel />;
        case 'ppt':
        case 'pptx':
            return <FaFilePowerpoint />;
        default:
            return <FaFile />;
    }
}

function shortenFileName(fileName) {
    const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (nameWithoutExtension.length > 5) {
        return nameWithoutExtension.substring(0, 4) + '...' + nameWithoutExtension.charAt(nameWithoutExtension.length - 1) + '.' + extension;
    }
    return fileName;
}

function FileUploadWithInput() {
    const [url, setUrl] = useState('');
    const [files, setFiles] = useState([]);

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileList = Array.from(selectedFiles);
            setFiles(fileList);
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    style={{ width: '80%' }}
                    placeholder="Enter URL"
                    className={`form-control height-35 w-100 f-14`}
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                    multiple
                />
                <label htmlFor="fileInput" className='ml-1 mb-0 bg-light p-2 rounded' style={{ cursor: 'pointer' }}>
                    <AiOutlineUpload size={20} />
                </label>
            </div>
            <div className='d-flex align-items-center flex-wrap' style={{ gap: '10px' }}>
                {files.map((file, index) => (
                    <div key={index} className='p-1 text-center mt-2 bg-light rounded'  >
                        {getFileIcon(file.name.split('.').pop())} {shortenFileName(file.name)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileUploadWithInput;
 */

import React, { useState } from 'react';
import { AiOutlineUpload } from "react-icons/ai";
import { FaFileImage, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFile } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

function getFileIcon(extension) {
    switch (extension.toLowerCase()) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            return <FaFileImage />;
        case 'pdf':
            return <FaFilePdf />;
        case 'doc':
        case 'docx':
            return <FaFileWord />;
        case 'xls':
        case 'xlsx':
            return <FaFileExcel />;
        case 'ppt':
        case 'pptx':
            return <FaFilePowerpoint />;
        default:
            return <FaFile />;
    }
}

function shortenFileName(fileName) {
    const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (nameWithoutExtension.length > 5) {
        return nameWithoutExtension.substring(0, 4) + '...' + nameWithoutExtension.charAt(nameWithoutExtension.length - 1) + '.' + extension;
    }
    return fileName;
}

function FileUploadWithInput() {
    const [url, setUrl] = useState('');
    const [files, setFiles] = useState([]);

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileList = Array.from(selectedFiles);
            setFiles(fileList);
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    style={{ width: '80%' }}
                    placeholder="Enter URL"
                    className={`form-control height-35 w-100 f-14`}
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                    multiple
                />
                <label htmlFor="fileInput" className='ml-1 mb-0 bg-light p-2 rounded' style={{ cursor: 'pointer' }}>
                    <AiOutlineUpload size={20} />
                </label>
            </div>
            <div className='d-flex align-items-center flex-wrap' style={{ gap: '10px' }}>
                {files.map((file, index) => (
                    <div style={{ width: "150px" }} key={index} className='p-1 text-center mt-2 bg-light rounded d-flex align-items-center justify-content-between'>
                        <div>{getFileIcon(file.name.split('.').pop())} {shortenFileName(file.name)}</div>

                        <span className='text-danger' style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => {
                            const newFiles = [...files];
                            newFiles.splice(index, 1);
                            setFiles(newFiles);
                        }} >
                            <TiDelete size={20} />
                        </span>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileUploadWithInput;
