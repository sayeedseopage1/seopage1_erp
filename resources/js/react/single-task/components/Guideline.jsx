import React from 'react'
import { useState, useRef } from 'react';
import Modal from './Modal';
import { useClickAway } from 'react-use';
import _ from 'lodash';
import PMGuideline, { ColorItem } from './PMGuideline';
import FileUploader from '../../file-upload/FileUploader';
import { useGetTypesOfGraphicWorksQuery } from '../../services/api/SingleTaskPageApi';
import './styles/guideline.css'

const Guideline = ({ text, task, type = "", editorContainerClass, workEnv, singleTask }) => {
    const [expend, setExpend] = useState(false);
    let isLong = text?.length > 400;
    const showText = isLong ? text.slice(0, 400) + '...' : text;
    const ref = useRef();
    const { data: graphicOptions, isFetching } = useGetTypesOfGraphicWorksQuery("")

    // console.log("TaskCategory", singleTask?.category?.category_name)

    const graphicWorkDetails = new Object(singleTask?.graphic_work_detail);

    const typeOfGraphicsCategoryName = graphicOptions?.find((item) => graphicWorkDetails?.type_of_graphic_work_id === item?.id)?.name

    const {
        brand_name,
        created_at,
        design_instruction,
        file_types_needed,
        font_name,
        font_url,
        graphic_task_files,
        id,
        number_of_versions,
        primary_color,
        primary_color_description,
        reference,
        secondary_colors,
        task_id,
        type_of_graphic_work_id,
        type_of_logo,
        updated_at
    } = graphicWorkDetails;

    const { cms, theme_name, theme_template_library_link } = singleTask || {}

    let defaultSecondaryColors;
    let defaultFileTypesNeeded;
    // files
    let defaultTextForDesign;
    let defaultImageForDesigner;
    let defaultImgOrVidForWork;
    let defaultBrandGuidelineFiles;
    if (secondary_colors || file_types_needed || graphic_task_files) {
        defaultSecondaryColors = JSON.parse(secondary_colors)
        defaultFileTypesNeeded = JSON.parse(file_types_needed)
        defaultTextForDesign = graphic_task_files?.filter((item) => item?.file_type == 1)
        defaultImageForDesigner = graphic_task_files?.filter((item) => item?.file_type == 2)
        defaultImgOrVidForWork = graphic_task_files?.filter((item) => item?.file_type == 3)
        defaultBrandGuidelineFiles = graphic_task_files?.filter((item) => item?.file_type == 4)
    }



    const handleExpend = (e) => {
        e.preventDefault();
        setExpend(!expend);
    };

    useClickAway(ref, () => {
        setExpend(false)
    })

    return (
        <div className='sp1_task_card--sub-card'>
            {/* graphics and ui start  */}
            {
                singleTask?.category?.category_name === "Graphic Design" && <div className="px-4 py-3" style={{ background: '#F3F5F9' }}>
                    <h6 className="mb-2">Graphic Work Details</h6>
                    <hr />
                    <div className="row">
                        <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                            <span><strong>Type Of Graphics Work</strong>: <br /> {typeOfGraphicsCategoryName}</span>
                        </div>
                        {
                            type_of_graphic_work_id === 1 && <>
                                <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                    <span><strong>Type of Logo</strong>: <br /> {type_of_logo}</span>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                    <span><strong>Brand Name</strong>: <br /> {brand_name}</span>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                    <span><strong>Number of Versions</strong>: <br /> {number_of_versions}</span>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                    <span><strong>File Types Needed</strong>: <br /> {defaultFileTypesNeeded}</span>
                                </div>
                            </>
                        }
                        {
                            (type_of_graphic_work_id === 2 || type_of_graphic_work_id === 3 || type_of_graphic_work_id === 4) && <>
                                <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                    <div>
                                        <strong>Attach text that will be used for the design</strong>: <br /> <FileUploader>
                                            {_.map(
                                                defaultTextForDesign,
                                                (attachment) => {
                                                    const file_icon = attachment?.filename.split(".").pop();

                                                    return attachment?.filename ? (
                                                        <FileUploader.Preview
                                                            key={attachment?.id}
                                                            fileName={attachment?.filename}
                                                            downloadAble={true}
                                                            deleteAble={false}
                                                            downloadUrl={attachment?.file_url}
                                                            previewUrl={attachment?.file_url}
                                                            fileType={
                                                                _.includes(
                                                                    ["png", "jpeg", "jpg", "svg", "webp", "gif"],
                                                                    file_icon
                                                                )
                                                                    ? "images"
                                                                    : "others"
                                                            }
                                                            classname="comment_file"
                                                            ext={file_icon}
                                                        />
                                                    ) : null;
                                                }
                                            )}
                                        </FileUploader>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            (type_of_graphic_work_id === 5 || type_of_graphic_work_id === 6) && <>
                                <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                    <div>
                                        <strong>Image where the designer will work</strong>: <br /> <FileUploader>
                                            {_.map(
                                                defaultImageForDesigner,
                                                (attachment) => {
                                                    const file_icon = attachment?.filename.split(".").pop();

                                                    return attachment?.filename ? (
                                                        <FileUploader.Preview
                                                            key={attachment?.id}
                                                            fileName={attachment?.filename}
                                                            downloadAble={true}
                                                            deleteAble={false}
                                                            downloadUrl={attachment?.file_url}
                                                            previewUrl={attachment?.file_url}
                                                            fileType={
                                                                _.includes(
                                                                    ["png", "jpeg", "jpg", "svg", "webp", "gif"],
                                                                    file_icon
                                                                )
                                                                    ? "images"
                                                                    : "others"
                                                            }
                                                            classname="comment_file"
                                                            ext={file_icon}
                                                        />
                                                    ) : null;
                                                }
                                            )}
                                        </FileUploader>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            type_of_graphic_work_id === 8 && <>
                                <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                    <div>
                                        <strong>Images/videos that will be used for the work</strong>: <br /> <FileUploader>
                                            {_.map(
                                                defaultImgOrVidForWork,
                                                (attachment) => {
                                                    const file_icon = attachment?.filename.split(".").pop();

                                                    return attachment?.filename ? (
                                                        <FileUploader.Preview
                                                            key={attachment?.id}
                                                            fileName={attachment?.filename}
                                                            downloadAble={true}
                                                            deleteAble={false}
                                                            downloadUrl={attachment?.file_url}
                                                            previewUrl={attachment?.file_url}
                                                            fileType={
                                                                _.includes(
                                                                    ["png", "jpeg", "jpg", "svg", "webp", "gif"],
                                                                    file_icon
                                                                )
                                                                    ? "images"
                                                                    : "others"
                                                            }
                                                            classname="comment_file"
                                                            ext={file_icon}
                                                        />
                                                    ) : null;
                                                }
                                            )}
                                        </FileUploader>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            (type_of_graphic_work_id === 7 || type_of_graphic_work_id === 9) && <>
                                <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                    <div>
                                        <strong>Name of the illustration work</strong>: <br /> <div className={`sp1_ck_content sp1_guideline_text px-2 py-2 rounded`} style={{ backgroundColor: "#E9ECEF" }} dangerouslySetInnerHTML={{ __html: design_instruction }}>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            font_name && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                <span><strong>Font Name</strong>: <br /> {font_name}</span>
                            </div>
                        }
                        {
                            reference && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                <span><strong>Reference</strong>: <br /> {reference}</span>
                            </div>
                        }
                        {
                            font_url && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                <span><strong>Font Url</strong>: <br /> <a target="__blank" href={font_url}>{font_url}</a></span>
                            </div>
                        }
                        {
                            defaultBrandGuidelineFiles?.length > 0 && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                <div>
                                    <strong>Brand Guideline</strong>: <br /> <FileUploader>
                                        {_.map(
                                            defaultBrandGuidelineFiles,
                                            (attachment) => {
                                                const file_icon = attachment?.filename.split(".").pop();

                                                return attachment?.filename ? (
                                                    <FileUploader.Preview
                                                        key={attachment?.id}
                                                        fileName={attachment?.filename}
                                                        downloadAble={true}
                                                        deleteAble={false}
                                                        downloadUrl={attachment?.file_url}
                                                        previewUrl={attachment?.file_url}
                                                        fileType={
                                                            _.includes(
                                                                ["png", "jpeg", "jpg", "svg", "webp", "gif"],
                                                                file_icon
                                                            )
                                                                ? "images"
                                                                : "others"
                                                        }
                                                        classname="comment_file"
                                                        ext={file_icon}
                                                    />
                                                ) : null;
                                            }
                                        )}
                                    </FileUploader>
                                </div>
                            </div>
                        }
                    </div>
                    {/* color schema */}
                    <div className="col-12 col-md-6 px-0">
                        <div className="form-group">
                            <div className='mb-2 f-16' style={{ color: '#878E97' }}><strong>Color Scheme: </strong></div>
                            <div className='mb-3 rounded'>
                                <ol style={{ marginLeft: "0px" }}>
                                    <li className='d-flex flex-column'>
                                        <span className='font-weight-bold mr-2 mb-2'>Primary Color: </span>
                                        <ColorItem color={primary_color} desc={primary_color_description} />
                                    </li>

                                    <li className='d-flex flex-column'>
                                        <span className='font-weight-bold mr-2 mb-2'>
                                            {
                                                defaultSecondaryColors?.length > 1
                                                    ? "Secondary Colors: "
                                                    : "Secondary Color: "
                                            }
                                        </span>
                                        {
                                            defaultSecondaryColors?.map((color, i) => (
                                                <ColorItem key={i + color} color={color?.color}
                                                    desc={color?.description} />
                                            ))
                                        }
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    {/* end color schema */}
                </div>
            }
            {singleTask?.category?.category_name === "Graphic Design" && <hr />}
            {
                singleTask?.category?.category_name === "UI/UIX Design" && <div className="px-4 py-3" style={{ background: '#F3F5F9' }}>
                    <h6 className="mb-2">UI/UIX Work Details</h6>
                    <hr />
                    <div className="row">
                        {
                            cms && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                <span><strong>CMS</strong>: <br /> {cms}</span>
                            </div>
                        }
                        {
                            theme_name && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                <span><strong>Theme Name</strong>: <br /> {theme_name}</span>
                            </div>
                        }
                        {
                            theme_template_library_link && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                <span><strong>CMS</strong>: <br /> <a target="__blank" href={theme_template_library_link}>{theme_template_library_link}</a></span>
                            </div>
                        }
                    </div>
                </div>
            }
            {singleTask?.category?.category_name === "UI/UIX Design" && <hr />}
            {/* graphics and ui end  */}

            <div>
                <h6 className="mb-2">General Description:</h6>
                <div className={`sp1_ck_content sp1_guideline_text ${editorContainerClass}`} dangerouslySetInnerHTML={{ __html: showText }}></div>
                {isLong ? <a href="#" onClick={handleExpend} className=''> View more </a> : ''}
            </div>

            <Modal className="sp1_task_card--sub-card-modal" isOpen={expend}>
                <div ref={ref} className='sp1_task_card--sub-card-modal-content'>
                    <div className='d-flex align-items-center justify-content-between __header'>
                        <button onClick={() => setExpend(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div className='__content'>

                        {task?.hasProjectManagerGuideline && type !== "TASK_DESCRIPTION" ?
                            <div className='mb-3'>
                                <h1>Project Manager Guideline</h1>
                                <PMGuideline guideline={task?.PMTaskGuideline} />
                            </div> : null
                        }

                        {!_.isEmpty(workEnv) && type !== "TASK_DESCRIPTION" ? (
                            <div className="sp1_task_card--sub-card m-4">
                                <div className="px-4 py-3" style={{ background: '#F3F5F9' }}>
                                    <h6 className="mb-2">Working Environment</h6>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>Working/Staging Site's URL</strong>: <br /> <a target="__blank" href={workEnv?.site_url}>View on new tab</a></span>
                                        </div>

                                        <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>Frontend Password</strong>: <br /> {workEnv?.frontend_password}</span>
                                        </div>

                                        <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>Working/Staging Site's Login URL</strong>: <br /> <a target="__blank" href={workEnv?.login_url}>View on new tab</a> </span>
                                        </div>

                                        <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>Working/Staging Site's Username/Email</strong>: <br /> {workEnv?.email}</span>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>Password</strong>: <br /> {workEnv?.password}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {type === "TASK_DESCRIPTION" ? <h5>Task Description</h5> : null}

                        {/* graphics and ui start  */}
                        {
                            singleTask?.category?.category_name === "Graphic Design" && <div className="px-4 py-3" style={{ background: '#F3F5F9' }}>
                                <h6 className="mb-2">Graphic Work Details</h6>
                                <hr />
                                <div className="row">
                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                        <span><strong>Type Of Graphics Work</strong>: <br /> {typeOfGraphicsCategoryName}</span>
                                    </div>
                                    {
                                        type_of_graphic_work_id === 1 && <>
                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <span><strong>Type of Logo</strong>: <br /> {type_of_logo}</span>
                                            </div>
                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <span><strong>Brand Name</strong>: <br /> {brand_name}</span>
                                            </div>
                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <span><strong>Number of Versions</strong>: <br /> {number_of_versions}</span>
                                            </div>
                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <span><strong>File Types Needed</strong>: <br /> {defaultFileTypesNeeded}</span>
                                            </div>
                                        </>
                                    }
                                    {
                                        (type_of_graphic_work_id === 2 || type_of_graphic_work_id === 3 || type_of_graphic_work_id === 4) && <>
                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <div>
                                                    <strong>Attach text that will be used for the design</strong>: <br /> <FileUploader>
                                                        {_.map(
                                                            defaultTextForDesign,
                                                            (attachment) => {
                                                                const file_icon = attachment?.filename.split(".").pop();

                                                                return attachment?.filename ? (
                                                                    <FileUploader.Preview
                                                                        key={attachment?.id}
                                                                        fileName={attachment?.filename}
                                                                        downloadAble={true}
                                                                        deleteAble={false}
                                                                        downloadUrl={attachment?.file_url}
                                                                        previewUrl={attachment?.file_url}
                                                                        fileType={
                                                                            _.includes(
                                                                                ["png", "jpeg", "jpg", "svg", "webp", "gif"],
                                                                                file_icon
                                                                            )
                                                                                ? "images"
                                                                                : "others"
                                                                        }
                                                                        classname="comment_file"
                                                                        ext={file_icon}
                                                                    />
                                                                ) : null;
                                                            }
                                                        )}
                                                    </FileUploader>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        (type_of_graphic_work_id === 5 || type_of_graphic_work_id === 6) && <>
                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <div>
                                                    <strong>Image where the designer will work</strong>: <br /> <FileUploader>
                                                        {_.map(
                                                            defaultImageForDesigner,
                                                            (attachment) => {
                                                                const file_icon = attachment?.filename.split(".").pop();

                                                                return attachment?.filename ? (
                                                                    <FileUploader.Preview
                                                                        key={attachment?.id}
                                                                        fileName={attachment?.filename}
                                                                        downloadAble={true}
                                                                        deleteAble={false}
                                                                        downloadUrl={attachment?.file_url}
                                                                        previewUrl={attachment?.file_url}
                                                                        fileType={
                                                                            _.includes(
                                                                                ["png", "jpeg", "jpg", "svg", "webp", "gif"],
                                                                                file_icon
                                                                            )
                                                                                ? "images"
                                                                                : "others"
                                                                        }
                                                                        classname="comment_file"
                                                                        ext={file_icon}
                                                                    />
                                                                ) : null;
                                                            }
                                                        )}
                                                    </FileUploader>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        type_of_graphic_work_id === 8 && <>
                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <div>
                                                    <strong>Images/videos that will be used for the work</strong>: <br /> <FileUploader>
                                                        {_.map(
                                                            defaultImgOrVidForWork,
                                                            (attachment) => {
                                                                const file_icon = attachment?.filename.split(".").pop();

                                                                return attachment?.filename ? (
                                                                    <FileUploader.Preview
                                                                        key={attachment?.id}
                                                                        fileName={attachment?.filename}
                                                                        downloadAble={true}
                                                                        deleteAble={false}
                                                                        downloadUrl={attachment?.file_url}
                                                                        previewUrl={attachment?.file_url}
                                                                        fileType={
                                                                            _.includes(
                                                                                ["png", "jpeg", "jpg", "svg", "webp", "gif"],
                                                                                file_icon
                                                                            )
                                                                                ? "images"
                                                                                : "others"
                                                                        }
                                                                        classname="comment_file"
                                                                        ext={file_icon}
                                                                    />
                                                                ) : null;
                                                            }
                                                        )}
                                                    </FileUploader>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        (type_of_graphic_work_id === 7 || type_of_graphic_work_id === 9) && <>
                                            <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                                <div>
                                                    <strong>Name of the illustration work</strong>: <br /> <div className={`sp1_ck_content sp1_guideline_text px-2 py-2 rounded`} style={{ backgroundColor: "#E9ECEF" }} dangerouslySetInnerHTML={{ __html: design_instruction }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        font_name && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>Font Name</strong>: <br /> {font_name}</span>
                                        </div>
                                    }
                                    {
                                        reference && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>Reference</strong>: <br /> {reference}</span>
                                        </div>
                                    }
                                    {
                                        font_url && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>Font Url</strong>: <br /> <a target="__blank" href={font_url}>{font_url}</a></span>
                                        </div>
                                    }
                                    {
                                        defaultBrandGuidelineFiles?.length > 0 && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <div>
                                                <strong>Brand Guideline</strong>: <br /> <FileUploader>
                                                    {_.map(
                                                        defaultBrandGuidelineFiles,
                                                        (attachment) => {
                                                            const file_icon = attachment?.filename.split(".").pop();

                                                            return attachment?.filename ? (
                                                                <FileUploader.Preview
                                                                    key={attachment?.id}
                                                                    fileName={attachment?.filename}
                                                                    downloadAble={true}
                                                                    deleteAble={false}
                                                                    downloadUrl={attachment?.file_url}
                                                                    previewUrl={attachment?.file_url}
                                                                    fileType={
                                                                        _.includes(
                                                                            ["png", "jpeg", "jpg", "svg", "webp", "gif"],
                                                                            file_icon
                                                                        )
                                                                            ? "images"
                                                                            : "others"
                                                                    }
                                                                    classname="comment_file"
                                                                    ext={file_icon}
                                                                />
                                                            ) : null;
                                                        }
                                                    )}
                                                </FileUploader>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {/* color schema */}
                                <div className="col-12 col-md-6 px-0">
                                    <div className="form-group">
                                        <div className='mb-2 f-16' style={{ color: '#878E97' }}><strong>Color Scheme: </strong></div>
                                        <div className='mb-3 rounded'>
                                            <ol style={{ marginLeft: "0px" }}>
                                                <li className='d-flex flex-column'>
                                                    <span className='font-weight-bold mr-2 mb-2'>Primary Color: </span>
                                                    <ColorItem color={primary_color} desc={primary_color_description} />
                                                </li>

                                                <li className='d-flex flex-column'>
                                                    <span className='font-weight-bold mr-2 mb-2'>
                                                        {
                                                            defaultSecondaryColors?.length > 1
                                                                ? "Secondary Colors: "
                                                                : "Secondary Color: "
                                                        }
                                                    </span>
                                                    {
                                                        defaultSecondaryColors?.map((color, i) => (
                                                            <ColorItem key={i + color} color={color?.color}
                                                                desc={color?.description} />
                                                        ))
                                                    }
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                {/* end color schema */}
                            </div>
                        }
                        {singleTask?.category?.category_name === "Graphic Design" && <hr />}
                        {
                            singleTask?.category?.category_name === "UI/UIX Design" && <div className="px-4 py-3" style={{ background: '#F3F5F9' }}>
                                <h6 className="mb-2">UI/UIX Work Details</h6>
                                <hr />
                                <div className="row">
                                    {
                                        cms && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>CMS</strong>: <br /> {cms}</span>
                                        </div>
                                    }
                                    {
                                        theme_name && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>Theme Name</strong>: <br /> {theme_name}</span>
                                        </div>
                                    }
                                    {
                                        theme_template_library_link && <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                            <span><strong>CMS</strong>: <br /> <a target="__blank" href={theme_template_library_link}>{theme_template_library_link}</a></span>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        {singleTask?.category?.category_name === "UI/UIX Design" && <hr />}
                        {/* graphics and ui end  */}
                        <div>
                            <h6 className="mb-2">General Description:</h6>
                            <div className={`sp1_ck_content word-break ${editorContainerClass}`} dangerouslySetInnerHTML={{ __html: text }} />
                        </div>
                        {
                            _.size(task?.attachments) > 0 && type === "TASK_DESCRIPTION" ?
                                <div className="mt-3">
                                    <h6 className="mb-2">Task Attachments:</h6>
                                    <FileUploader>
                                        {_.map(task?.attachments, attachment => (
                                            attachment?.task_file_name ?
                                                <FileUploader.Preview
                                                    key={attachment?.task_file_id}
                                                    fileName={attachment?.task_file_name}
                                                    downloadAble={true}
                                                    deleteAble={false}
                                                    downloadUrl={attachment?.task_file_url}
                                                    previewUrl={attachment?.task_file_url}
                                                    fileType={_.includes(['png', 'jpeg', 'jpg', 'svg', 'webp', 'gif'], attachment?.task_file_icon) ? 'images' : 'others'}
                                                    classname="comment_file"
                                                    ext={attachment?.task_file_icon}
                                                /> : null
                                        ))}
                                    </FileUploader>

                                </div>
                                : null
                        }
                    </div>

                    <div className=' __footer'>
                        <button className='btn btn-sm py-1 btn-primary ml-auto' onClick={() => setExpend(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Guideline
