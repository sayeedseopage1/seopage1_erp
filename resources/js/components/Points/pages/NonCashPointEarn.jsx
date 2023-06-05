import * as React from 'react'
import PointCard from '../components/PointCard'
import CardPagination from '../ui/CardPagination'
import { useNonCashPointMutation } from '../../services/api/PointTableDataApiSlice';

const NonCashPointEarn = () => {
    const [currentPage, setCurrentPage] =  React.useState(1);
    const [currentPageData, setCurrentPageData] = React.useState([]);
    const [numberOfRowPerPage, setNumberOfRowPerPage] = React.useState(10);
    const [errorAchievablePoints, setErrorAchievablePoints] = React.useState('');

    // form data
    const [itemName, setItemName] = React.useState('');
    const [achievablePoints, setAchievablePoints] = React.useState('');
    const [description, setDescription] = React.useState('');


    const [
        nonCashPoint,
        {
            isLoading,
            isSuccess
        }
    ] = useNonCashPointMutation();

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if(!itemName || !achievablePoints) return;

        nonCashPoint({
            name: itemName,
            point: achievablePoints,
            description: description
        }).unwrap();
    }


    const handleKeyDown = e => { 
        if(isNaN(e.key)){
            setErrorAchievablePoints("Only Number is valid")
            return;
        }else{
            setErrorAchievablePoints('');
            return;
        }
    }

  return (
    <section className='py-3'>
       <div className='row border-top py-3 px-3'>
            <div className='col-12 col-sm-6 p-0'>
               <div className="" style={{maxWidth: '600px'}}>
               Earn your Credits by completing objectives and leveling up through our Rewards program. You can use your credits on the items below:
               </div>
            </div>

            
           
            <div className="col-12 col-sm-6">
                <div className="row justify-content-end">
                    <button 
                        type='button' 
                        className="btn btn-sm btn-primary col-12 col-sm-6 col-md-2 justify-content-end py-1 py-md-2 mt-2 mt-sm-0" 
                        style={{whiteSpace:'nowrap'}}
                        data-toggle="modal"
                        data-target = '#add_non_cash_point'
                    >
                        + Add New 
                    </button> 
                    <div className="modal fade" id="add_non_cash_point" tabIndex="-1" role="dialog" aria-labelledby="NonCashPoint" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content sp1_ncp_modal_content">
                                <div className="modal-header sp1_ncp_modal_header">
                                    <h5 className="modal-title f-16" id="NonCashPoint">Add New Non Cash Point Item</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body sp1_ncp_modal_body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Item Name<sup>*</sup></label>
                                        <input type="text" 
                                            className="form-control py-2" 
                                            id="exampleInputEmail1" 
                                            value={itemName}
                                            onChange={e => setItemName(e.target.value)}
                                            aria-describedby="ItemName" 
                                            placeholder='Item name'
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="achievablePoints">Achievable Points <sup>*</sup></label>
                                        <input type="number" 
                                            className="form-control py-2" 
                                            id="achievablePoints" 
                                            aria-describedby="achievablePoints"  
                                            placeholder='Achievable Points'
                                            value={achievablePoints}
                                            onChange={e => setAchievablePoints(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {
                                            errorAchievablePoints && 
                                            <small id="emailHelp" className="form-text text-muted">
                                                {errorAchievablePoints}
                                            </small>
                                        }
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Item Description</label>
                                        <textarea 
                                            type="text" 
                                            cols={10} 
                                            rows={3} 
                                            value={description} 
                                            onChange={e => setDescription(e.target.value)} 
                                            className="form-control" 
                                            id="exampleInputPassword1" 
                                            placeholder='Item Description'
                                        />
                                    </div>  

                                    {/* <div className="form-group">
                                        <label htmlFor="">Select Icon</label>
                                    <div className="d-flex align-items-center">
                                            <div className='d-flex align-items-center mr-4'>
                                                <input type='radio' name='icon' value="gold-coin.svg" className='mr-2' />
                                                <img src='/img/gold-coin.svg' alt="" width={36} height={36} />
                                            </div>
                                            <div className='d-flex align-items-center mr-2'>
                                                <input type='radio' name='icon' value="seopage1-coin-sm.png" className='mr-2' />
                                                <img src='/img/seopage1-coin-sm.png' alt="" width={44} height={44} />
                                            </div>
                                        </div> 
                                    </div>   */}
                                    
                                </form>
                                </div>
                                <div className="modal-footer sp1_ncp_modal_footer">
                                    <button type="button" className="btn btn-sm py-1 btn-secondary" data-dismiss="modal">Close</button>
                                    
                                    <button 
                                        type="button" 
                                        className="btn btn-sm py-1 btn-primary" 
                                        onClick={handleSubmit}
                                    >
                                        Create
                                    </button>
                                </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
       </div> 

       <div className="flex flex-column">
            <PointCard />
            <PointCard />
            <PointCard />
            <PointCard />
            <PointCard />
            <PointCard />
       </div>


       <div>
            <div className="cnx__table_footer">
                <div className="__show_entries">
                    <span>Show</span> 
                    <select className='py-2 border' onChange={(e) => setNumberOfRowPerPage(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                    </select>

                    <span>entries</span>
                </div>


                <div className='__total_entries'>
                    Showing 1 to 10 of 100 entries
                </div>


                {/* pagination */}
                 <CardPagination 
                    data={[]}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setCurrentPageData={(v) => setCurrentPageData(v)}
                    numOfPerPageRow={Number(numberOfRowPerPage)}
                /> 
                {/* end pagination */}
            </div>
       </div>
    </section>
  )
}

export default NonCashPointEarn