import _ from 'lodash';
import React, { useState } from 'react';
import { useCopyToClipboard } from 'react-use';


const ColorItem = ({color, desc}) => {

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
        <div className='position-relative px-2'>
            <div
                onClick={() => handleCopy(color)}
                className='py-1 px-3 d-inline-block mr-2 text-white rounded'
                style={{background: color}}
            >
                 {!show ? color : state.value ?
                    <span> Copied {state.value}</span> : null
                 }
            </div>
            <div className='p-2 f-12'>
                <div dangerouslySetInnerHTML={{__html: desc}} />
            </div>
        </div>
    )
}

const PMGuideline = ({guideline}) => {

 const desginUrl = () => {
    if(guideline?.design){
    if(guideline?.design === 'XD/Figma'){
        return <a href={guideline?.xd_url ?? '#'}> {guideline?.xd_url ?? ''} </a>
    }else if (guideline?.design === 'Photoshop'){
        return <a href={guideline?.drive_url ?? '#'}> {guideline?.drive_url ?? ''} </a>
    }else if(_.replace(guideline?.design, /\s/g, '') === "TheReferenceSiteThatHastoBeClone"){
        const ref = JSON.parse(guideline?.reference_link);
        return (
            <ol style={{listStyle: 'numeric'}}>
                {_.size(ref) && _.map(ref, (r, i) => (
                    <li key={i+r} style={{listStyle: 'numaric'}}> <a href={r ?? '#'}> {r ?? ''} </a> </li>
                ))}
            </ol>
        )
    }
    }
 }
  return (
    <React.Fragment>
            <div className="px-3 py-3" style={{background: '#F7F8FA'}}>
                {guideline?.theme_details ?
                    <div className='mb-3'>
                        <div className='mb-2 f-16' style={{color: '#878E97'}}><strong>Theme Details: </strong></div>
                        <ul className='pl-2 ml-0'>
                            <li><span className='font-weight-bold'>Theme Name: </span> {guideline?.theme_name}</li>
                            <li><span className='font-weight-bold'>Theme URL: </span> <a href={guideline?.theme_url} className='hover-underline'>{guideline?.theme_url}</a></li>
                        </ul>
                    </div>
                    : null
                }


                {
                    guideline?.design_details ?
                    <div className='mb-3'>
                        <div className='mb-2 f-16' style={{color: '#878E97'}}><strong>Design Details: </strong></div>
                        <ul className='pl-2 ml-0'>
                            <li><span className='font-weight-bold'>Design: </span> {guideline?.design}</li>
                            <li><span className='font-weight-bold'>Reference URL: </span> {desginUrl()}</li>
                            <li>
                            <div className='font-weight-bold'>Instruction:</div>
                            <div style={{fontSize: '12px !important'}} dangerouslySetInnerHTML={{__html: guideline?.instruction}} />
                            </li>
                        </ul>
                    </div>
                    : null
                }

                {
                    guideline?.color_schema ?
                    <div className='mb-3'>
                        <div className='mb-2 f-16' style={{color: '#878E97'}}><strong>Color Scheme: </strong></div>
                        <ul className='pl-2 ml-0'>
                            <li className='d-flex flex-column'>
                                <span className='font-weight-bold mr-2 mb-2'>Primary Color: </span>
                                <ColorItem color={guideline?.primary_color} desc={guideline?.primary_color_description}/>
                            </li>

                            <li className='d-flex flex-column'>
                                <span className='font-weight-bold mr-2 mb-2'>Secondary Color: </span>
                                {
                                    _.map(_.toArray(guideline?.color), (color,i) => (
                                        <ColorItem key={i + color} color={color}
                                        desc={guideline?.color_description?.[i]}/>
                                    ))
                                }
                            </li>
                        </ul>
                    </div>
                    : null
                }


                {
                    guideline?.plugin_research ?
                    <div className='mb-3'>
                        <div className='mb-2 f-16' style={{color: '#878E97'}}><strong>Plugin Research: </strong></div>
                        <ul className='pl-2 ml-0'>
                            <li><span className='font-weight-bold'>Plugin Name: </span> {guideline?.plugin_name}</li>

                            <li><span className='font-weight-bold'>Plugin URL: </span> <a href={guideline?.plugin_url} className='hover-underline'>{guideline?.plugin_url}</a></li>

                            <li><span className='font-weight-bold'>Google Drive Link: </span> <a href={guideline?.google_drive_link} className='hover-underline'>{guideline?.google_drive_link}</a></li>

                            <li>
                                <div className='font-weight-bold mb-2'>Description: </div>
                                <div>
                                    <div dangerouslySetInnerHTML={{__html: guideline?.instruction_plugin }} />
                                </div>
                            </li>
                        </ul>
                    </div>
                    : null
                }
            </div>
    </React.Fragment>
  )
}

export default PMGuideline
