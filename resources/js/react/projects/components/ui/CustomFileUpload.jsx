import React from 'react';
import { AiOutlineUpload } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { getFileIcon, shortenFileName } from '../../utils';

const CustomFileUpload = ({ refInputFiles, setRefInputFiles, previous, onPreviousFileDelete, readOnly }) => {

    const handleRefFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileList = Array.from(selectedFiles);
            setRefInputFiles((prev) => [...prev, ...fileList]);
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                <input
                    type="file"
                    onChange={handleRefFileChange}
                    style={{ display: 'none' }}
                    id="fileInputRef"
                    multiple
                />

                {
                    !readOnly && <label title='Upload File' htmlFor="fileInputRef" className='mb-1 p-2 rounded w-100 d-flex align-items-center justify-content-center' style={{ cursor: 'pointer', backgroundColor: '#F1F3F5' }}>
                        <span className='mr-2'>Upload File</span> <AiOutlineUpload size={20} />
                    </label>
                }
            </div>
            <div className='d-flex align-items-center flex-wrap mb-1' style={{ gap: '10px' }}>
                {
                    !readOnly && <>
                        {refInputFiles?.map((file, index) => (
                            <div title={file?.name} style={{ width: "150px" }} key={index} className='p-1 text-center mt-1 bg-light rounded d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-center'>{getFileIcon(file?.name?.split('.').pop())}
                                    <span className='ml-1'>{shortenFileName(file?.name)}</span></div>

                                <span className='text-danger' style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => {
                                    const newRefFiles = [...refInputFiles];
                                    newRefFiles?.splice(index, 1);
                                    setRefInputFiles(newRefFiles);
                                }} >
                                    <TiDelete size={20} />
                                </span>
                            </div>
                        ))}
                    </>
                }
                {
                    previous && previous?.map((file, index) => (
                        <div title={file?.filename} style={{ width: "150px", backgroundColor: '#F1F3F5' }} key={index} className='p-1 text-center mt-1  rounded d-flex align-items-center justify-content-between'>
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
};

export default CustomFileUpload;