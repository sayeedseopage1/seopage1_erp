import * as React from 'react'
import { usePopper } from 'react-popper'
import { useSelector } from 'react-redux';
import { useClickAway } from 'react-use';
import Dropdown from '../ui/Dropdown';
import { useTeams } from '../hooks/useTeams';
import { useUsers } from '../hooks/useUsers';


const LI = ({text, words}) => {
    // replace $p 
    words.forEach((element, index) => {
        let replace = `<span style='font-weight: bold; color: ${ index === 1 ? 'rgb(29, 134, 3)': '#000'}'> ${element} </span>`;
        let regex = new RegExp("\\$p");
        text = text.replace(regex, replace);
    });
    

    
    return (
        <>
            <li style={{listStyle: 'decimal'}} dangerouslySetInnerHTML={{__html: text}}/>
        </>
    )
}



const ContributionDetails = ({row}) => {
    const { usersObjects, usersIsFetching  } = useUsers();
    const [isOpen, setIsOpen] = React.useState(false);
    const {teamsObject, isTeamsFetching, getTeamMembers} = useTeams(); 
    const [goal, setGoal] = React.useState(null);
    const [data, setData] = React.useState(null);


    React.useEffect(() => {
       // get goal details from local
       let localGoal = localStorage.getItem(`goal_${window.Laravel.user.id}`) 

       if(localGoal){
        setGoal(JSON.parse(localGoal));
       }
    }, [])
   
    if(_.isEmpty(row)){
        return <span> - </span>
    }


    const isInTeam = (id) => {
        if(!isTeamsFetching && !usersIsFetching){
           let members = getTeamMembers(teamsObject[goal?.team_id]);
           return members?.findIndex(m => Number(m) === id) !== -1;
        }
    }

    const getUserName = (a) => {
        let id = Number(row[a]);
        let name = usersObjects && usersObjects[id]?.name;
        return isInTeam(id) ? name : undefined; 
    }

    // const handleClick = () => {
        
    //     const bidder = getUserName('bidder');
    //     const bidder_amount = row['bidder_amount'];
    //     const qualified_by = getUserName('qualified_by');
    //     const qualified_amount = row['qualified_amount'];
    //     const required_defined_by = getUserName('required_defined');
    //     const required_defined_amount = row['required_defined_amount'];
    //     const proposal_made_by = getUserName('proposal_made');
    //     const proposal_made_amount = row['proposal_made_amount'];
    //     const negotiation_started_by = getUserName('negotiation_started');
    //     const negotiation_started_amount = row['negotiation_started_amount'];
    //     const milestone_breakdown_by = getUserName('milestone_breakdown');
    //     const milestone_breakdown_amount = row['milestone_breakdown_amount'];
    //     const deal_won_by = getUserName('added_by');
    //     const won_deal_amount = row['won_deal_amount'];

    //     setIsOpen(!isOpen);


    //     setData({
    //         amount,
    //         bidder,
    //         bidder_amount,
    //         qualified_by,
    //         qualified_amount,
    //         required_defined_by,
    //         required_defined_amount,
    //         proposal_made_by,
    //         proposal_made_amount,
    //         negotiation_started_by,
    //         negotiation_started_amount,
    //         milestone_breakdown_by,
    //         milestone_breakdown_amount,
    //         deal_won_by,
    //         won_deal_amount
    //     })
    // }


    const amount = row['team_total_amount'];

    
   
    const bidder = getUserName('bidder');
    const bidder_amount = row['bidder_amount'];
    const qualified_by = getUserName('qualified_by');
    const qualified_amount = row['qualified_amount'];
    const required_defined_by = getUserName('required_defined');
    const required_defined_amount = row['required_defined_amount'];
    const proposal_made_by = getUserName('proposal_made');
    const proposal_made_amount = row['proposal_made_amount'];
    const negotiation_started_by = getUserName('negotiation_started');
    const negotiation_started_amount = row['negotiation_started_amount'];
    const milestone_breakdown_by = getUserName('milestone_breakdown');
    const milestone_breakdown_amount = row['milestone_breakdown_amount'];
    const deal_won_by = getUserName('added_by');
    const won_deal_amount = row['won_deal_amount'];
   
 


  const tv = goal?.trackingType === 'value'


    return(
        <Dropdown>
            <Dropdown.Toggle>
                <span 
                    style={{fontWeight: 'bold', cursor: 'pointer'}}
                >
                    {row['tracking_type'] === 'count' ? 
                        amount > 1 ? '1.00' : Number(amount).toFixed(2)
                    : `$ ${Number(amount).toFixed(2)}`}  
                </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>

                    {
                        (!goal || isTeamsFetching || usersIsFetching) ? (
                            <span>Loading...</span>
                        ):(
                        <ol type='1' style={{listStyle:'inside', padding: '0 20px', margin: '0'}}>                         

                        {bidder !== undefined && (
                        <LI
                            text="$p got $p for converting the lead."
                            words= {[
                                `${bidder}`,
                                `${tv ? '$':''}${bidder_amount}`
                            ]}
                        />
                        )}

                        {qualified_by !== undefined && (
                        <LI
                            text="$p got $p for qualifying the deal."
                            words= {[
                                `${qualified_by}`,
                                `${tv ? '$':''}${qualified_amount}`
                            ]}
                        />
                        )}

                        {required_defined_by !== undefined && (
                        <LI
                            text="$p got $p for defined requirements."
                            words= {[
                                `${required_defined_by}`,
                                `${tv ? '$':''}${required_defined_amount}`
                            ]}
                        />
                        )} 

                        {proposal_made_by !== undefined && (
                        <LI
                            text="$p got $p for sending proposal to the client."
                            words= {[
                                `${proposal_made_by}`,
                                `${tv ? '$':''}${proposal_made_amount}`
                            ]}
                        />
                        )}   




                        {negotiation_started_by !== undefined && (
                        <LI
                            text="$p got $p for starting negotiation with the client."
                            words= {[
                                `${negotiation_started_by}`,
                                `${tv ? '$':''}${negotiation_started_amount}`
                            ]}
                        />
                        )} 


                        {milestone_breakdown_by !== undefined && (
                        <LI
                            text="$p got $p for sharing milestone with the client."
                            words= {[
                                `${milestone_breakdown_by}`,
                                `${tv ? '$':''}${milestone_breakdown_amount}`
                            ]}
                        />
                        )} 


                        {deal_won_by !== undefined && (
                        <LI
                            text="$p got $p for marking this deal as won."
                            words= {[
                                `${deal_won_by}`,
                                `${tv ? '$':''}${won_deal_amount}`
                            ]}
                        />
                        )}  
                        </ol>
                        )
                    }
                    
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ContributionDetails

