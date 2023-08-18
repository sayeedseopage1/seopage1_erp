import React from 'react'

const Avatar = ({type="square", width= 32, height=32, className, src, alt, name}) => {
    console.log({src})
    let modifiedName = name ? name.charAt(0).toUpperCase() + name.slice(1) : null;
    return(
        <div className='border sp1_item_center' style={{width, height, overflow: 'hidden', borderRadius: type === 'circle' ? '100%' : '6px'}}>
            {
                src ? 
                    <img 
                        src={src} 
                        alt={alt} 
                        style={{
                            width, 
                            height, 
                            overflow: 'hidden', 
                            borderRadius: type === 'circle' ? '100%' : '6px'
                        }} 
                    /> : 
                    <div className='font-weight-bold' style={{fontSize: '1.2rem'}}>
                    { modifiedName } 
                </div> 
            }
        </div>
    )
}

export default Avatar