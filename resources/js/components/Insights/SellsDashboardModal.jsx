import Modal from "../UI/Modal"

const goals = [
    {
        entity: { type: 'deal', name: 'Deal' },
        goalType: [
            { title: "Added", subtitle: "Based on the number or value of new deals" },
            { title: "Progressed", subtitle: "Based on the number or value of deals entering a certain stage" },
            { title: "Won", subtitle: "Based on the number or value of won deals" },
        ]
    },
    {
        entity: { type: 'activity', name: 'Activity' },
        goalType: [
            { title: "Added", subtitle: "Based on the number or value of new activities" },
            { title: "Progressed", subtitle: "Based on the number or value of deals entering a certain stage" },
            { title: "Won", subtitle: "Based on the number or value of won deals" },
        ]
    },
    {
        entity: { type: 'forecast', name: 'Forecast' },
        goalType: [
            { title: "Revenue", subtitle: "Based on the number or value of new deals" },
        ]
    }
]


const SellsDashboardModal = () => {

    const renderIcon = (type) => {
        switch (type) {
            case 'deal':
                return <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            case 'forecast':
                return <i className="bi bi-arrow-repeat" />
            case 'leads':
                return <i className="fa-solid fa-location-crosshairs" />;
            case 'activity':
                return <i className="bi bi-calendar-event" />
        }
    }


    return (
        <Modal isOpen={true} close={() => { }}>
            <div className="sp1_ins_sell_dm--container">
                <div>
                    <div className="card sp1_ins_sell_dm--card">
                        {/* header */}
                        <div className="card-header">
                            Add New Report

                            <button type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* end header */}
                        <div className="card-body sp1_ins_sell_dm--card_body">
                            <div className="row">
                                {/* entities  */}
                                <div className="col">
                                    <div className="ps1_ins_sell_dm--entities">
                                        {/* Entity  */}
                                        <div className="ps1_ins_sell_dm--entity active">
                                            {renderIcon('deal')}
                                            <span>Deal</span>
                                            <i className="fa-solid fa-chevron-right ml-auto " style={{ fontSize: '14px' }} />
                                        </div>
                                        {/* End Entity  */}

                                        {/* Entity  */}
                                        <div className="ps1_ins_sell_dm--entity">
                                            {renderIcon('activity')}
                                            <span>Activity</span>
                                        </div>
                                        {/* End Entity  */}

                                        {/* Entity  */}
                                        <div className="ps1_ins_sell_dm--entity">
                                            {renderIcon('forecast')}
                                            <span>Forecast</span>
                                        </div>
                                        {/* End Entity  */}
                                    </div>
                                </div>
                                {/* end entity */}

                                {/* choose type */}
                                <div className="col">
                                    sdfsdfsd
                                </div>
                                {/* end choose type */}
                            </div>
                        </div>

                        <div className="card-footer d-flex align-items-center justify-content-end">
                            <button className="btn btn-sm btn-outline-secondary mr-2">Close</button>
                            <button className="btn btn-sm btn-success">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SellsDashboardModal;