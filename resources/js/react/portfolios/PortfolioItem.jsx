import { usePopper } from "react-popper";
import { useCopyToClipboard } from "react-use";
import React, {useState, useEffect} from 'react';
import PortfolioModal from "./components/PortfolioModal";
import { useLazyGetPortfolioDataByIdQuery } from "../services/api/portfolioApiSlice";
 

const PortfolioItem = ({id, url, onClick, isLoading}) => { 
    const [showModal, setShowModal] = useState(false); 
    const [state, copyToClipboard] = useCopyToClipboard();
    const [isCopied, setIsCopied] = useState(false);
    const [refEl, setRefEl] = useState(null);
    const [popperEl, setPopperEl] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [data, setData] = useState([]);
  

      
    useEffect(() => {
      let timer = setTimeout(() => {
          setIsCopied(false);
      }, 1000)
  
      return () => clearTimeout(timer)
    }, [state])
  
  
  //   popper element
    const {styles, attributes} = usePopper(refEl, popperEl, {
      placement: 'top',
      modifiers:[
          {name:'offset', options: {offset: [0,0]}},
          {
              name: 'arrow', 
              options: {
                  element: arrowElement, 
              }
          }
      ]
  });  
 

  const [getPortfolioDataById, {isFetching}] = useLazyGetPortfolioDataByIdQuery();
  
    const handleToggleModal = async () => {
        setShowModal(true);
        const res = await getPortfolioDataById(id).unwrap();
        setData(res);
    }

    const close = () => setShowModal(false);
  
  
    return(
        <>  
            <div className='portfolio-item' onClick={handleToggleModal}>
                <div className=''>
                    <img 
                        src={`https://www.google.com/s2/favicons?domain=${url}&sz=256`}
                        alt=""
                        width={32}
                        height={32}
                    />
                </div>
                <div className='portfolio-item-link singleline-ellipsis'>
                    {url}
                </div>
        
                <button ref={setRefEl} aria-label='copy-text' onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(url);
                    setIsCopied(true);
                }} className='portfolio-item-icon'>
                    
                    {
                        isCopied ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-copy' />
                    } 
        
                        {/* tooltip */}
                    {isCopied && 
                        <div 
                            className='dispute-tooltip'
                            ref={setPopperEl} 
                            style={styles.popper}
                            {...attributes.popper}
                        >
                            {/* tooltip content */}
                            <div className='dispute-tooltip-content'> 
                                Copied
                            </div>
                            <div 
                                ref={setArrowElement} 
                                style={styles.arrow} 
                                className='dispute-notif-arrow' 
                            />
                        </div>
                    }
                </button>
            </div>

            <PortfolioModal isOpen={showModal} close={close} data={data} isLoading={isFetching} />
        </>
  )    
}

export default PortfolioItem;

