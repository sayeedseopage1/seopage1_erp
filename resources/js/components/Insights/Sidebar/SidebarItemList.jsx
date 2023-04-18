



const SidebarItemList = (contents, namespace) => {
    return (

        <div>
            {contents.length > 0 ? contents.map(c => (
                <NavLink
                    to={`${namespace}/${c.text || c}`}
                    key={Math.random()}
                    className={
                        ({ isActive }) =>
                            isActive
                                ? "sp1_ins_sidebar--link active"
                                : "sp1_ins_sidebar--link"}
                >
                    {d.type === 'activity' && (
                        <i className="bi bi-calendar-event" />
                    )}
                    {d.type === 'deal' &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    {d.type === 'leads' && <i className="fa-solid fa-location-crosshairs"></i>}
                    {d.type === 'forecast' && <i className="bi bi-arrow-repeat" />}
                    <span className="mr-auto"> {c.text || c}</span>
                    <i className="bi bi-arrows-move move" />
                </NavLink>

            )) : <span className="sp1_ins_sidebar--link empty"> No Goal </span>
            }
        </div>
    )
}