import React from "react";
import { disputeTableColumn } from "./components/DisputeTableColumn";
import DataTable from "../global/table/DataTable";
import FilterContainer from './components/Filter-bar/FilterContainer';
import Filterbar from "./components/Filter-bar/Filterbar";
import { useLazyGetDisputesQuery } from "../services/api/SingleTaskPageApi";
import _ from "lodash";
import DisputeTableLoader from "./components/DisputeTableLoader";


const reducer = (state=[], action) => {
    switch(action.type){
        case 'INIT_DISPUTE':
            return state = _.orderBy(action.disputes, 'id', 'desc');
        case 'UPDATE_DISPUTE_CONVERSATION':
            return _.map(state, d => {
                if(d.id === action.disputeId){
                    return {
                        ...d,
                        conversations: action.conversations
                    }
                }
                return d;
            });
        case 'UPDATE_DISPUTE':
            return _.map(state, d => {
                if(d.id === action.disputeId){
                    return {
                        ...action.data
                    }
                }
                return d;
            })
        default:
            return state;
    }
}


const Disputes = () => {
    const [disputes, dispatch] = React.useReducer(reducer, []);
    const [filters, setFilters] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [getDisputes, {isFetching}] = useLazyGetDisputesQuery();


    const onFilter = async (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();
        setFilters(queryObject);

        try{
            if(filter?.start_date && filter?.end_date){
                const res = await getDisputes(`?${queryString}`).unwrap();  
                if(res){
                    const data = _.orderBy(res, 'id', 'desc');
                    dispatch({type: 'INIT_DISPUTE', disputes: data});
                }
            }
        }catch(err){
            console.log(err)
        } 
    }

    // update dispute state
    const updateDisputeConversation = ({disputeId, conversations}) => {
        dispatch({
            type: 'UPDATE_DISPUTE_CONVERSATION',
            disputeId,
            conversations
        })
    }
    // Update Single Dispute
    const updateDisputeById = ({disputeId, data})=>{
        dispatch({
            type: 'UPDATE_DISPUTE',
            disputeId,
            data
        })
    }


    return (
        <React.Fragment>

            <FilterContainer>
                <Filterbar onFilter={onFilter} /> 
            </FilterContainer>

            <div className="py-2 py-md-4 px-2 px-md-5 w-full">
                {/* card section */}
                <div className="row">
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}

                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg">
                            <h6>Total Issues</h6>
                            <h5>101</h5>
                        </div>
                    </div>
                    {/* end card */}
                </div>

                {/* disputes table */}
                <div className="mt-3 p-3 bg-white">
                    <DataTable
                        tableData={disputes}
                        tableColumns={disputeTableColumn}
                        hideColumns={[]}
                        search={search}
                        filter={filters}
                        tableName="dispute-table"
                        isLoading={isFetching}
                        state={{
                            updateDisputeConversation,
                            updateDisputeById
                        }}
                        loader={<DisputeTableLoader />}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Disputes;
