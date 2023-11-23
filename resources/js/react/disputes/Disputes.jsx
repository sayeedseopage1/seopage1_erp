import _ from "lodash";
import React from "react";
import Loader from "../global/Loader";
import DataTable from "../global/table/DataTable";
import { useLazyGetDisputesQuery } from "../services/api/SingleTaskPageApi";
import { User } from "../utils/user-details";
import { disputeTableColumn } from "./components/DisputeTableColumn";
import DisputeTableLoader from "./components/DisputeTableLoader";
import FilterContainer from './components/Filter-bar/FilterContainer';
import Filterbar from "./components/Filter-bar/Filterbar";
import { RefreshButton } from "./components/RefreshButton";
import ResolveModal from "./components/ResolveModal";


const reducer = (state=[], action) => {
    switch(action.type){
        case 'INIT_DISPUTE':
            const sortedData = _.orderBy(
                action.disputes,
                [
                    'status',
                    'dispute_updated_at'
                ],
                ['asc', 'desc']
            );

            return sortedData;
        case 'UPDATE_DISPUTE_CONVERSATION':
            return _.map(state, d => {
                if(d.id === action.disputeId){
                    return { ...d,  conversations: action.conversations  }
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
    const [widgetDate, setWidgetData] = React.useState({
        totalDispute: 0,
        raisedByMe: 0,
        needMyAttention: 0,
        resolvedDispute: 0,
        wonDispute: 0,
        lostDispute: 0,
        resolvedByAdmin: 0,
        resolvedByTeamLead: 0,
    });
    const [filters, setFilters] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [getDisputes, {isFetching}] = useLazyGetDisputesQuery();
    const auth = new User(window.Laravel.user);

     const onFilter = async (filter) => {
        let queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();
        setFilters(queryObject);

        try{
            if(filter?.start_date && filter?.end_date){
                const res = await getDisputes(`?${queryString}`).unwrap();
                if(res){
                    const data = _.filter(res, d=> {
                        if(filter.status === 'Pending'){
                            return d.status === 0 && _.size(d.conversations)===0 && !d.resolved_by
                        }else if(filter.status === 'In Progress'){
                            return d.status === 0 && (_.size(d.conversations)!==0 || d.resolved_by)
                        }else if(filter.status === 'Resolved'){
                            return d.status === 1
                        }else return d;
                    })
                    dispatch({type: 'INIT_DISPUTE', disputes: data});
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    const defString = JSON.stringify(disputes);

    // handle refresh button
    const handleRefresh = () => {
        onFilter(filters);
    }

    React.useEffect(() => {

        // calculate total dispute
        const raisedByMe = _.filter(disputes, data => data?.raised_by?.id === auth?.getId())
        const resolveByAdmin = _.filter(disputes, data => data?.status && data?.authorized_by?.id === auth?.getId())
        const resolveByTeamLead = _.filter(disputes, data => data.status && !data?.need_authrization && data?.resolved_by?.id === auth?.getId())



        const totalDispute = _.size(disputes);
        // need attention

        // calculate need my attention item
        let filterData = _.filter(disputes , dispute=> {
            if(dispute && dispute.conversations){
                let indexOf = dispute.conversations.findIndex( d => !d.replies );
                if(indexOf !== -1){
                    return true;
                }else return false;
            } return false;
        })

        const teamLeadAction = _.size(_.filter(disputes, d=> !d.status && !d.need_authrization))
        const needActionForAdmin = _.size(_.filter(disputes, d=> !d.status && d.need_authrization))

        const needMyAttention = auth?.getRoleId() === 1 ? needActionForAdmin : auth?.getRoleId() === 8 ? teamLeadAction : _.size(filterData)

        // resolve dispute
        const resolvedDispute = _.size(_.filter(disputes, f => f.status));
        const won = _.size(_.filter(disputes, f => f.status && f?.winner?.id === auth.getId()))
        const lost = _.size(_.filter(disputes, f => f.status && f?.winner?.id !== auth.getId()))


        setWidgetData({
            ...widgetDate,
            raisedByMe: _.size(raisedByMe),
            totalDispute,
            needMyAttention,
            resolvedDispute,
            wonDispute: won,
            lostDispute: lost,
            resolvedByAdmin: _.size(resolveByAdmin),
            resolvedByTeamLead: _.size(resolveByTeamLead)
        })
    }, [defString])


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
                        <div className="p-3 bg-white rounded-lg h-100">
                            <span className="f-14 font-weight-bold" style={{color: '#9D9FA9'}}>Total Disputes</span>
                            <h5>{widgetDate.totalDispute}</h5>
                        </div>
                    </div>
                    {/* end card */}

                    {
                        auth?.getRoleId() === 1 ?
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                                <div className="p-3 bg-white rounded-lg h-100">
                                    <span className="f-14 font-weight-bold" style={{color: '#9D9FA9'}}>Disputes Resolved by Me</span>
                                    <h5>{widgetDate.resolvedByAdmin}</h5>
                                </div>
                            </div>
                        :null
                    }

                    {
                        auth?.getRoleId() === 8 ?
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                                <div className="p-3 bg-white rounded-lg h-100">
                                    <span className="f-14 font-weight-bold" style={{color: '#9D9FA9'}}>Disputes Resolved by Me</span>
                                    <h5>{widgetDate.resolveByTeamLead}</h5>
                                </div>
                            </div>
                        :null
                    }

                    {/* card */}
                    {
                        !_.includes([1,8], auth?.getRoleId()) ?
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                            <div className="p-3 bg-white rounded-lg h-100">
                                <span className="f-14 font-weight-bold" style={{color: '#9D9FA9'}}>Disputes Raised by Me</span>
                                <h5>{widgetDate.raisedByMe}</h5>
                            </div>
                        </div>
                    :null
                    }
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg h-100">
                            <span className="f-14 font-weight-bold" style={{color: '#9D9FA9'}}>Disputes Need My Attention</span>
                            <h5>{widgetDate.needMyAttention}</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg h-100">
                            <span className="f-14 font-weight-bold" style={{color: '#9D9FA9'}}>Total Resolved Disputes</span>
                            <h5>{widgetDate.resolvedDispute}</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg h-100">
                            <span className="f-14 font-weight-bold" style={{color: '#9D9FA9'}}>Won Disputes</span>
                            <h5>{widgetDate.wonDispute}</h5>
                        </div>
                    </div>
                    {/* end card */}
                    {/* card */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div className="p-3 bg-white rounded-lg h-100">
                            <span className="f-14 font-weight-bold" style={{color: '#9D9FA9'}}>Lost Disputes</span>
                            <h5 className="mt-2">{widgetDate.lostDispute}</h5>
                        </div>
                    </div>
                    {/* end card */}
                </div>

                <div className="w-100 d-flex align-items-center">
                    <RefreshButton onClick={handleRefresh}>
                        {isFetching ?
                            <Loader title="Loading..." borderRightColor="white" />:
                            "Refresh"
                        }
                    </RefreshButton>
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
                        classes={{th: 'dispute_table_th'}}
                        loader={<DisputeTableLoader />}
                    />
                </div>
            </div>




            <ResolveModal
                state={{
                    updateDisputeConversation,
                    updateDisputeById
                }}
            />  {/* resolve modal */}
        </React.Fragment>
    );
};

export default Disputes;
