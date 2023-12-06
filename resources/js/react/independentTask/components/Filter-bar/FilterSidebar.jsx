import React from "react";
import Button from "../Button";
import ClientFilter from "./ClientFilter";
import StatusFilter from "./StatusFilter";
import UserFilter from "./UserFilter";

const FilterSidebar = ({
    developer,
    setDeveloper,
    client,
    setClient,
    leadDeveloper,
    setLeadDeveloper,
    pm,
    setPm,
    status,
    setStatus,
    search,
    setSearch,
    dateType,
    setDateType,
    close,
    isDev,
    isTopManagement
}) => {
    return (
        <div className="sp1_filter_sidebar">
            <div className="sp1_filter_sidebar_header">
                <h4>Filter</h4>
                <Button variant="tertiary" onClick={close}>
                    <i className="fa-solid fa-xmark" />
                </Button>
            </div>

            <div className="p-3 d-flex flex-column" style={{ gap: "10px" }}>
                {/* <DateTypeFilter state={dateType} setState={setDateType} /> */}

                <ClientFilter
                    title="Client"
                    state={client}
                    setState={setClient}
                    roleIds={null}
                />

                {/* <UserFilter
                title="Project Manager"
                state={pm}
                setState={setPm}
                roleIds={[4]}
            />  */}

                <UserFilter
                    title="Assigned By"
                    state={leadDeveloper}
                    setState={setLeadDeveloper}
                    roleIds={[1, 4]}
                    disabled={!isTopManagement}
                    currentUser={!isTopManagement}
                />

                {/* <UserFilter
                    title="Lead Developer"
                    state={leadDeveloper}
                    setState={setLeadDeveloper}
                    roleIds={[6]}
                /> */}

                {/* {page === "subtasks" ? ( */}
                    <UserFilter
                        title="Assigned To"
                        state={developer}
                        setState={setDeveloper}
                        roleIds={[5]}
                    />
                {/* ) : (
                    <UserFilter
                        title="Assigned To"
                        state={developer}
                        setState={setDeveloper}
                        roleIds={[4, 6, 9, 10]}
                    />
                )} */}

                {/* {!isDev && (
                    <UserFilter
                        title="Developer"
                        state={developer}
                        setState={setDeveloper}
                        roleIds={[5, 9, 10]}
                    />
                )} */}

                <StatusFilter state={status} setState={setStatus} />
            </div>
        </div>
    );
};

export default FilterSidebar;
