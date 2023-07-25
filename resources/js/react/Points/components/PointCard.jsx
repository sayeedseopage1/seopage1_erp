import React from 'react'

const PointCard = () => {
  return (
    <div className="row sp1_point_card border-top">
        <div className="col-12 col-md-6 d-flex align-items-center">
            <>
                <div className='sp1_point_card_icon'>
                    <img src="/img/gift.png" alt='' width={44} height={44} />
                </div>
            </>

            <div className='sp1_point_card_text'>
                <h6 className='m-0 font-weight-bold'>Conduct a meeting</h6>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, voluptas.</p>
            </div>

        </div>

        <div className='col-12 col-md-6  d-flex flex-wrap align-items-center '>
            <div className='mr-2 ml-md-auto'>
                <img src="/img/seopage1-coin-sm.png" alt='' width={58} height={58} />
            </div> 
            <h5 className='my-0 mr-2 text-primary font-weight-bold'> 5000000</h5>
            <a href="#" className='btn btn-sm btn-primary py-1 py-md-2 px-3'>
                Earn Points
            </a>
        </div>
    </div>
  )
}

export default PointCard