/* eslint-disable react/prop-types */


const ScoreCardGraph = ({value, label, profit="", profitStatus="down"}) => {
    return(
        <div className='cnx__conversion_graph__wrapper'>
            <div className='cnx__conversion__graph'>
                <div className='cnx__score_card_graph'>
                    <div className='__score_card_header'>
                        <span>{profitStatus === 'up' ? '' : '- '}${profit}</span>
                        <i className={`fa-solid fa-caret-${profitStatus}`} />
                    </div>
                    <h1 className='__score_card_score'>
                        ${value}
                    </h1>

                    <div className='__score_card_label'>{label}</div>
                </div>
            </div>
        </div>
    )
}

export default ScoreCardGraph;
