import * as React from 'react'
import Button from './Button'

const UploadFilesInLine = ({onPreviousFileDelete, previous, files, setFiles, mode="", uploadInputClass='', fileWrapperClass=''}) => {
    const [previews, setPreviews] = React.useState([]);


  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    setFiles(prev => [...prev, ...uploadedFiles]);

    const filePreviews = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const reader = new FileReader();
      const file = uploadedFiles[i];

      reader.onload = (event) => {

        const arr = file.name.split('.');
        const ext = arr[arr.length - 1];

        filePreviews.push({
          name: file.name,
          type: file.type,
          preview: event.target.result,
          ext
        });

        if (filePreviews.length === uploadedFiles.length) {
          setPreviews([...previews, ...filePreviews]);
        }
      };

      reader.readAsDataURL(file);
    }
  };


  const RenderIcon = ({_file, type=''}) => { 
    if(type === 'previous' && !_file?.filename){
        throw new Error('Filename not found on provided files');
    }
    // console.log({_file})
    let filename ='';
    let file = {};
    if(type === 'previous'){
      let name = _file?.filename;
      let arr = _file?.filename.split('.');
      file.ext = arr[arr.length -1];
      filename = name?.slice(0, 3) + '...' + name?.slice(name.length - 10, name?.length);
    }else{
      let name = _file?.name;
      filename = name?.slice(0, 3) + '...' + name?.slice(name.length - 10, name?.length);
      file = {..._file}
    }


    return(
      <div className='uploaded-file-preview'>
          <div className='__icon'>

              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  fill="currentColor"
                  viewBox="0 0 16 16"
              >
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
              </svg>

              <span className="uploaded-file-ext">
                  {file?.ext?.slice(0, 6)}
              </span>
          </div>
          <span className="d-block mt-3">{filename}</span>
      </div>
    )
  }


  const handleRemoveFile = (e, file) => {
    e.preventDefault();
    const updatePreview = [...previews];
    const updatedFiles = [...files];
    updatedFiles.splice(file, 1);
    updatePreview.splice(file, 1);
    setFiles(updatedFiles);
    setPreviews(updatePreview)
  }

  return (
    <div className='d-flex align-items-center flex-wrap' style={{gap: '10px'}}>

        {mode !== 'preview' &&  <div className={`sp1_sub-task-file-upload ${uploadInputClass}`}>
            <i className="fa-solid fa-cloud-arrow-up"></i>
            <span>Upload Files</span>
            <input type="file" multiple onChange={handleFileUpload}/>
        </div> }

        {previous?.map((file) => (
          <div
              key={file.id}
              className={`sp1_sub-task-file-upload ${fileWrapperClass}`}
              data-toggle="tooltip"
              data-placement="bottom"
              title={file?.name}
          >

          {mode === 'preview' ? (
            <a
              href={file?.file_url}
              download={true}
              className='file-download-preview d-flex align-items-center justify-content-center'
              data-toggle="tooltip"
              data-placement='top'
              title='Click to Download!'
            >
              {file?.icon ==='images' ?
            <img
              src={file?.file_url}
              alt=""
              style={{
                width: '100%',
                height:'100%',
                objectFit: 'fill'
              }}
            />
            :  <RenderIcon _file={file} type='previous'/> }
            </a>
          ):
          file?.icon ==='images' ?
            <img
              src={file?.file_url}
              alt=""
              style={{
                width: '100%',
                height:'100%',
                objectFit: 'fill'
              }}
            />
            :  <RenderIcon _file={file} type='previous'/>
      }

            {
                mode !== 'preview' &&
                <Button
                  onClick={(e) => onPreviousFileDelete(e, file) }
                  className='__remove--btn'
                >
                  <i className="fa-regular fa-trash-can"></i>
                </Button>
            }
      </div>
        ))}

        {previews?.map((file, i) => (
            <div
                key={i}
                className={`sp1_sub-task-file-upload ${fileWrapperClass}`}
                data-toggle="tooltip"
                data-placement="bottom"
                title={file?.name}
            >
                {file?.type.startsWith('image/') ?
                    <img src={file?.preview} alt="" style={{width: '100%', height:'100%', objectFit: 'fill'}} />
                    :  <RenderIcon _file={file} type="" />
                }

                    <Button
                      onClick={(e) => handleRemoveFile(e, i)}
                      className='__remove--btn'
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </Button>
            </div>
        ))}
    </div>
  )
}

export default UploadFilesInLine
