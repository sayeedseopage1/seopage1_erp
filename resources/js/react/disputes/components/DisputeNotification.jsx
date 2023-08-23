import React from 'react'
import { usePopper } from 'react-popper';


const DisputeNotification = () => {
    const [referenceElement, setReferenceElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(null);
    const [arrowElement, setArrowElement] = React.useState(null);

    const {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: 'top',
        modifiers:[
            {name:'offset', options: {offset: [10,0]}},
            {
                name: 'arrow', 
                options: {
                    element: arrowElement, 
                }
            }
        ]
    }); 


    return(
        <React.Fragment>
            <div ref={setReferenceElement} className=''>
                2322
            </div>

            {/* tooltip */}

            <div 
                className='dispute-tooltip'
                ref={setPopperElement} 
                style={styles.popper}
                {...attributes.popper}
            >
                {/* tooltip content */}
                <div className='dispute-tooltip-content'> 
                    3 Questions
                </div>
                <div 
                    ref={setArrowElement} 
                    style={styles.arrow} 
                    className='dispute-notif-arrow' 
                />
            </div>

        </React.Fragment>
    )
}



export default DisputeNotification