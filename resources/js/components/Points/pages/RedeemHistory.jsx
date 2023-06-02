import React from 'react'

const RedeemHistory = () => {
  return (
    <div className='py-4 border-top'>
        <h5>Rewards</h5>
        <h6>You Are Currently Receiving The Following Benefits: </h6>

        <div className='row w-100'>
            <div className="col-12 col-lg-6">
                <div>
                    <table className='sp1_rr_tbl'>
                        <thead>
                            <tr className='sp1_rr_tbl_tr'>
                                <th>Date</th>
                                <th>Type Of Rewards</th>
                                <th>Number Of Points Used</th>
                                <th>Approved By</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className='sp1_rr_tbl_tr'>
                                <td>Date</td>
                                <td>Type Of Rewards</td>
                                <td>Number Of Points Used</td>
                                <td>Approved By</td>
                            </tr>

                            <tr className='sp1_rr_tbl_tr'>
                                <td>Date</td>
                                <td>Type Of Rewards</td>
                                <td>Number Of Points Used</td>
                                <td>Approved By</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='col-12 col-lg-6 mt-4 mt-lg-0'>
                <div className='sp1_redeem_pending_rewards'>
                    <div className="text-center py-2 sp1_rpwt">
                        Your Pending Rewards
                    </div>


                    <div className="px-5 py-2 w-100">
                        <div className="row sp1_rpwt_item">
                            <div className="col-4 col-lg-3 p-2">
                                <div className='sp1_rpwt_item_inner'>
                                    Adjust one day's home office
                                </div>
                            </div> 
                            <div className="col-4 col-lg-3 p-2">
                                <div className='sp1_rpwt_item_inner'>
                                    Adjust one day's home office
                                </div>
                            </div> <div className="col-4 col-lg-3 p-2">
                                <div className='sp1_rpwt_item_inner'>
                                    Adjust one day's home office
                                </div>
                            </div> <div className="col-4 col-lg-3 p-2">
                                <div className='sp1_rpwt_item_inner'>
                                    Adjust one day's home office
                                </div>
                            </div> <div className="col-4 col-lg-3 p-2">
                                <div className='sp1_rpwt_item_inner'>
                                    Adjust one day's home office
                                </div>
                            </div> <div className="col-4 col-lg-3 p-2">
                                <div className='sp1_rpwt_item_inner'>
                                    Adjust one day's home office
                                </div>
                            </div> <div className="col-4 col-lg-3 p-2">
                                <div className='sp1_rpwt_item_inner'>
                                    Adjust one day's home office
                                </div>
                            </div> <div className="col-4 col-lg-3 p-2">
                                <div className='sp1_rpwt_item_inner'>
                                    Adjust one day's home office
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default RedeemHistory