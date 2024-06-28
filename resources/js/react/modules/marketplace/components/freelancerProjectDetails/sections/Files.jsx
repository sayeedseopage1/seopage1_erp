import React, { useState } from 'react';
import fileUploadIcon from '../../../assets/freelancerProjectDetails/document-download.svg'
import filesIcon from '../../../assets/freelancerProjectDetails/file.svg';
import documentIcon from '../../../assets/freelancerProjectDetails/document-text.svg';
import galleryIcon from '../../../assets/freelancerProjectDetails/gallery.svg';
import videoIcon from '../../../assets/freelancerProjectDetails/video-square.svg'
import FilesFilterButton from '../ui/FilesFilterButton';
import { ConfigProvider, Table } from 'antd';
import { freelancer_project_files } from '../../../constants/projects';
import moment from 'moment';
import fileDownload from 'js-file-download';
import axios from 'axios';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

/**
 * Renders the Files component which displays a table of files with filter options.
 * The component uses React hooks to manage state for the active filter tab, active files,
 * and file input data. It also defines helper functions for handling filter changes,
 * file uploads, and file downloads. The component renders a table with columns for
 * file name, size, owner, modified date, and a download button. The table data is
 * filtered based on the active filter tab. The component also renders a filter button
 * bar with buttons for all files, documents, images, and videos. The component renders
 * a file upload button and input field for uploading files.
 *
 * @return {JSX.Element} The rendered Files component.
 */

const Files = () => {
    const [activeFilterTab, setActiveFilterTab] = useState('all');
    const [activeFiles, setActiveFiles] = useState([...freelancer_project_files]);
    const [fileInputData, setFileInputData] = useState([]);

    const documentFiles = freelancer_project_files.filter(file => file.file_type == 'document');
    const imageFiles = freelancer_project_files.filter(file => file.file_type == 'image');
    const videoFiles = freelancer_project_files.filter(file => file.file_type == 'video');

    const filtersBtnData = [
        { type: 'all', icon: filesIcon, label: 'All Files', count: freelancer_project_files?.length },
        { type: 'document', icon: documentIcon, label: 'Documents', count: documentFiles?.length },
        { type: 'image', icon: galleryIcon, label: 'Images', count: imageFiles?.length },
        { type: 'video', icon: videoIcon, label: 'Video', count: videoFiles?.length },
    ];

    const handleFilterChange = (filterType) => {
        setActiveFilterTab(filterType)
        if (filterType == 'all') {
            setActiveFiles([...freelancer_project_files])
        } else {
            const filteredFiles = [...freelancer_project_files]?.filter(file => file?.file_type == filterType);
            setActiveFiles(filteredFiles)
        }
    }


    const handleFileChange = (event) => {
        const files = event.target.files;
        console.log(files)
    };


    const handleDownload = (record) => {
        axios.get(record?.file_url, {
            responseType: 'blob',
        })
            .then((res) => {
                fileDownload(res.data, record?.filename)
            })
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'filename',
            key: 'filename',
            render: (text, record) => <div className='file_table_file_name_wrapper sp1_marketplace_sm_text'>
                <img src={record?.file_type == 'document' ? documentIcon : record?.file_type == 'image' ? galleryIcon : record?.file_type == 'video' ? videoIcon : filesIcon} alt="filesIcon" />
                <p>{text?.substring(
                    0,
                    text?.lastIndexOf(".")
                )}</p>
            </div>,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (text) => <div className='sp1_marketplace_sm_text'>{text}KB</div>,
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
            render: (text) => <div className='sp1_marketplace_sm_text'>
                <p>{text?.name}</p>
                <p>@{text?.user_name}</p>
            </div>,
        },
        {
            title: 'Modified',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (text) => <div className='sp1_marketplace_sm_text'>{moment(text)?.fromNow()}</div>,
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => <div className='d-flex justify-content-end sp1_marketplace_sm_text'>
                <button
                    onClick={() => {
                        handleDownload(record);
                    }}
                    className='file_download_btn'>
                    <span>
                        Download
                    </span>
                    <span>
                        <MdOutlineKeyboardArrowDown size={20} />
                    </span>
                </button>
            </div>,
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: 'transparent',
                    },
                },
            }}
        >
            <div className='files_page_wrapper'>
                <div className='files_page_filter_wrapper'>
                    <div className='files_page_header_title_wrapper'>
                        <h4 className='files_page_header_title'>Filter</h4>
                    </div>
                    <div className='files_page_filter_btn_wrapper'>
                        {filtersBtnData?.map(filter => (
                            <FilesFilterButton
                                key={filter?.type}
                                isActive={activeFilterTab === filter?.type}
                                onClick={() => handleFilterChange(filter?.type)}
                                icon={filter?.icon}
                                label={filter?.label}
                                count={filter?.count}
                            />
                        ))}
                    </div>
                </div>
                <div className='files_page_content_wrapper'>
                    <div className='files_page_header_title_wrapper'>
                        <h4 className='files_page_header_title'>Files</h4>
                        <label className='upload_file_btn'>
                            <img src={fileUploadIcon} alt="fileUploadIcon" />
                            <span>Upload File</span>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                multiple
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={activeFiles}
                        scroll={{ x: 768 }}
                        pagination={false}
                    />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Files;