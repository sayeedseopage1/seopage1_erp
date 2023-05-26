import * as React from 'react'
import { usePopper } from 'react-popper'
import { useSelector } from 'react-redux';




const LI = ({text, words}) => {
    // replace $p 
    words.forEach(element => {
        let replace = `<span className='font-weight-bold'> ${element} </span>`;
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
    const { usersObjects } = useSelector(s => s.users);
    const [ref, setRef] = React.useState(null);
    const [popperRef, setPopperRef] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
 

    const { styles, attributes} = usePopper(ref, popperRef, {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'flip',
                options:{
                    fallbackPlacements: ['bottom', 'left', 'right', 'top' ],
                }
            }
        ]
    })


    if(_.isEmpty(row)){
        return <span> - </span>
    }


    const getUserName = (a) => {
        let id = row[a];
        return usersObjects && usersObjects[id]?.name;
    }

   
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



//   console.log({
//     bidder,
//     bidder_amount,
//     qualified_by,
//     qualified_amount,
//     required_defined_by,
//     required_defined_amount,
//   })

  return (
    <React.Fragment>
        
        <span
            onClick={() => setIsOpen(!isOpen)}
            ref={setRef} 
            style={{fontWeight: 'bold', cursor: 'pointer'}}
        >
            {row['tracking_type'] === 'count' ? 
                amount > 1 ? '1.00' : Number(amount).toFixed(2)
            : `$ ${Number(amount).toFixed(2)}`}  
        </span>


        {/*
            isOpen &&  
            <div 
                ref={setPopperRef}
                style={{
                    ...styles.popper,
                    width: '250px',
                    height: '300px',
                    overflowY: 'auto',
                    background: '#fff',
                    boxShadow: '0 0 6px rgba(0,0,0,0.2)',
                    borderRadius: '6px',
                    border: '1px solid rgba(0,0,0,0.2)',
                }}
                {...attributes}
            >
                <div className="p-2 fs-small">
                    <ol type='1' style={{listStyle:'inside', padding: '20px'}}>
                        <LI
                            text="$p got $p for converting the lead."
                            words= {[
                                `${bidder}`,
                                `$${bidder_amount}`
                            ]}
                        />
                        {/* <li style={{listStyle: 'decimal'}}>
                            {bidder} got ${bidder_amount} for converting the lead.
                        </li>
                        <li style={{listStyle: 'decimal'}}>
                            <span className="font-weight-bold">{qualified_by}</span>  got <span className="font-weight-bold">${qualified_amount}</span> for qualifying the deal. 
                        </li>


                        <li style={{listStyle: 'decimal'}}>{required_defined_by} got ${required_defined_amount} for qualifying the deal. </li> */}
                    {/* </ol>
                </div> 
            </div>
        }  */}
    </React.Fragment>
  )
}

export default ContributionDetails

