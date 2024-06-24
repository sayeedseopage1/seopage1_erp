import React, { useState } from 'react';
import userProfile from '../../../assets/freelancerMessage/user_avatar_2.png';
import chatActiveIcon from '../../../assets/freelancerMessage/chat-active.svg';
import fileUploadIcon from '../../../assets/freelancerMessage/folder-add.svg';
import sendIcon from '../../../assets/freelancerMessage/send-2.svg';
import emojiIcon from '../../../assets/freelancerMessage/grammerly.svg';
import ChatContents from '../ui/ChatContents';
import { Controller, useForm } from 'react-hook-form';
import { Input } from 'antd';
import { getFileIcon, shortenFileName } from '../../../utils';
const { TextArea } = Input;

const ChatBox = () => {
    const [fileInputData, setFileInputData] = useState(null);
    const [filePreviews, setFilePreviews] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setFileInputData(files.length > 0 ? files : null);

        if (files.length > 0) {
            const previews = Array.from(files).map(file => {
                return URL.createObjectURL(file);
            });
            setFilePreviews(previews);
        } else {
            setFilePreviews([]);
        }
    };

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm();

    const messageInputData = watch("message", "");

    const onSubmit = (data) => {
        console.log(data);
        reset(); // Reset form after submission
        setFileInputData(null); // Clear file input state
        setFilePreviews([]); // Clear file previews
    };

    return (
        <div>
            <div className='chat_header_wrapper'>
                <div className='chat_box_header'>
                    <div className='chat_box_header_content'>
                        <div className='chat_user_avatar_wrapper'>
                            <img src={userProfile} alt="" className='chat_user_avatar' />
                            <img src={chatActiveIcon} alt="chatActiveIcon" className='active_status' />
                        </div>
                        <div>
                            <div className='chat_header_name_wrapper'>
                                <h4 className='chat_header_name'>Ahmad12issa</h4>
                                <p className='chat_header_user_name'>@Ahmad12Issa</p>
                            </div>
                            <p className='chat_header_designation'>Sky FLY UI UX Deigner</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='chat_box_wrapper'>
                <div className='chat_box_content_wrapper'>
                    <ChatContents />
                </div>
                <div className='message_send_actions_wrapper'>
                    <div>
                        {filePreviews?.length > 0 && (
                            <div className='message_all_file_previews'>
                                {filePreviews?.map((preview, index) => (
                                    <div key={index} className='message_file_preview'>
                                        {fileInputData[index].type.startsWith('image/') ? (
                                            <img src={preview} alt={`preview ${index}`} className='preview_image message_file_preview' />
                                        ) : fileInputData[index].type.startsWith('video/') ? (
                                            <video controls className='preview_video message_file_preview'>
                                                <source src={preview} type={fileInputData[index].type} />
                                            </video>
                                        ) : (
                                            <a href={preview} title={fileInputData[index]?.name} className='file_download_link message_file_preview'>
                                                <div className='d-flex flex-column justify-content-center align-items-center h-100'>{getFileIcon(fileInputData[index]?.name
                                                    .split('.')
                                                    .pop())}

                                                    <span className='input_file_name'>{shortenFileName(fileInputData[index]?.name)}</span></div>
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='message_send_actions'>
                            <div className='message_input_wrapper'>
                                <button className='bg-transparent' type='button'>
                                    <img src={emojiIcon} alt="Emoji Icon" />
                                </button>
                                <Controller
                                    name="message"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextArea
                                            {...field}
                                            className='message_input'
                                            placeholder="Type a message"
                                            autoSize={{
                                                minRows: 1,
                                                maxRows: 6,
                                            }}
                                            variant='borderless'
                                        />
                                    )}
                                />
                            </div>
                            <div className='file_upload_and_send'>
                                <label className='file_upload'>
                                    <img
                                        src={fileUploadIcon}
                                        alt="Upload Icon"
                                    />
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple
                                        style={{ display: "none" }}
                                    />
                                </label>
                                <button disabled={!messageInputData && !fileInputData} type="submit" className='message_send_btn'>
                                    <img src={sendIcon} alt="Send Icon" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
