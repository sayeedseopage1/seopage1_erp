import React from 'react'

const Person = ({avatar, url, name}) => {
  return(
    <div className='d-flex align-items-center'>
      <div className='' style={{width: '28px'}}>
        {avatar ? 
            <div style={{width: '32px', height: '28px'}}>
              <img 
                src={`/user-uploads/avatar/${avatar}`}
                alt={name}
                width={24}
                height={24}
                style={{width: '28px', height: '28px'}}
                className='rounded-circle'
              />
            </div>
          : <div
                className="sp1-item-center border rounded-circle"
                style={{
                    width: "28px",
                    height: "28px",
                }}
            >
                <div
                    style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                    }}
                >
                    {name?.slice(0, 1).toUpperCase()}
                </div>
            </div>
        }
      </div>

      <a href={url} className='pl-2 '>{name}</a>
    </div>
  )
}

export default Person