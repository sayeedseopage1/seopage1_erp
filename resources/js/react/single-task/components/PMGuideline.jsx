import _ from 'lodash'
import React, { useState } from 'react'
import { useCopyToClipboard } from 'react-use';


const Color = ({color, description}) => {
    const ref = React.useRef(null);
    const [state, copyToClipboard] = useCopyToClipboard();
    const [show, setIsShow] = useState(false);

    
    const handleCopy = (text) => {
        copyToClipboard(color);
        setIsShow(true);

       setTimeout(()=> {
            setIsShow(false);
        }, 1000)
    }
    

    return (        
        <div className="col-12 col-lg-6 col-xl-4 mb-2">
            <div className='border p-2 rounded'>
                <div className='px-2 py-1' onClick={() => handleCopy(color)} style={{ background: color, width: '100%', height: 'fit-content', fontSize: '13px'}}>
                    <span className='text-white'> {color }</span>
                </div> 

                {show && state.value ? <span> Copied {state.value}</span> : null}

               <div>
                    <span className='f-12 py-1'><strong>Explaination of This Color</strong> </span> <br/>
                    <p className='f-12'>
                        {description}
                    </p>
                </div> 
            </div>
        </div>

    )
}

const PMGuideline = ({guideline}) => { 
 let colors = guideline?.color; 


  return (
    <React.Fragment>
        <div className="sp1_task_card--sub-card">
                <div className="px-4 py-3" style={{background: '#F3F5F9'}}>
                    <h6 className="pb-2">Project Manager Guideline</h6>
                    <hr/>
                    {
                        guideline?.theme_details > 0 &&
                        <div>
                            <span className='f-14 font-weight-bold d-block mb-2'>Provide Theme Details:</span>
                            <div className="row">
                                <div className="col-12 col-lg-6 col-xl-4 mb-2">
                                    <span><strong>Theme Name</strong>: <br/> {guideline?.theme_name}</span> 
                                </div>
                                
                                <div className="col-12 col-lg-6 col-xl-4 mb-2">
                                    <span><strong>Theme URL</strong>: <br/> <a hrev={guideline?.theme_url} className='word-break'> {guideline?.theme_name} </a></span> 
                                </div>
                            </div>
                        </div>
                    }


                    <div className="row">
                        <div className="col-12 col-lg-6 col-xl-4 mb-2">
                            <span><strong>Design</strong>: <br/> {guideline?.design}</span> 
                        </div>
                        <div className="col-12 col-lg-6 col-xl-4 mb-2">
                            <span><strong>Google Drive File/Folder URL</strong>: <br/> <a href={guideline?.drive_url} className='word-break'> {guideline?.drive_url} </a></span> 
                        </div>
                    </div>

                    {
                        _.size(_.toArray(colors)) > 0 &&
                        <div>
                            <span className='f-14 font-weight-bold d-block mb-2'>Color Details</span>
                            <div className='row'>
                                {_.map(_.toArray(colors), (color, index) => ( 
                                    <Color key={color} color={color} description={guideline?.color_description?.[index]} />
                                ))}
                            </div>
                       </div> 
                    }

                    {
                        guideline?.plugin_research > 0 && 
                        <div>
                            <span className='f-14 font-weight-bold d-block mb-2'> Necessary Plugins: </span>
                            <div className="row">
                                <div className="col-12 col-lg-6 col-xl-4 mb-2">
                                    <span><strong>Plugin Name</strong>: <br/> {guideline?.plugin_name}</span> 
                                </div>
                                
                                <div className="col-12 col-lg-6 col-xl-4 mb-2">
                                    <span><strong>Plugin URL</strong>: <br/> <a hrev={guideline?.plugin_url} className='word-break'> {guideline?.plugin_url} </a></span> 
                                </div>
                                
                                <div className="col-12 col-lg-6 col-xl-4 mb-2">
                                    <span><strong>Google Drive Link</strong>: <br/> <a hrev={guideline?.google_drive_link} className='word-break'> {guideline?.google_drive_link} </a></span> 
                                </div>

                                                                
                                <div className="col-12 col-lg-6 col-xl-4 mb-2">
                                    <span><strong>Instructions for Using This Plugin</strong>: <br/> <a hrev={guideline?.instruction_plugin} > {guideline?.instruction_plugin} </a></span> 
                                </div>

                            </div>
                        </div>
                    }
 
                </div>
            </div>
    </React.Fragment>
  )
}

export default PMGuideline