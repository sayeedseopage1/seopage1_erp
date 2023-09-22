import React from 'react'

const Avatar = ({type="square", width= 32, height=32, className, src, alt, name, fontSize='1.2rem'}) => {
   
    let modifiedName = name?.slice(0, 1).toUpperCase();

    return(
        <>
            <div 
                className={`border sp1-item-center ${className}`}
                style={{width: `${width}px`, height: `${height}px`, 
                overflow: 'hidden', 
                borderRadius: type === 'circle' ? '100%' : '6px'
            }}>
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
                        <span className='font-weight-bold' style={{fontSize, textDecoration: 'none !important'}}>
                            { modifiedName } 
                        </span> 
                }
            </div>
        </>
    )
}

export default Avatar