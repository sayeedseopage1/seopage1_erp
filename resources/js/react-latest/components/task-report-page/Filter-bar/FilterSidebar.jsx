import React from 'react'
import Button from '../../../ui/Button';
import UserFilter from './UserFilter';
import StatusFilter from './StatusFilter';
import DateTypeFilter from './DateTypeFilter';
import ProjectFilterItem from './ProjectFilter';

const FilterSidebar = ({
    client,
    setClient,
    reportIssuer,
    setReportIssuer,
    accountableIndividual,
    setAccountableIndividual,
    status,
    setStatus,
    selectedProject,
    handleProjectFilter,
    getProjectsOptions,
    isFetching,
    close,
}) => {

    return (
        <div className='sp1_filter_sidebar'>
            <div className='sp1_filter_sidebar_header'>
                <h4>Filter</h4>
                <Button variant='tertiary' onClick={close}>
                    <i className='fa-solid fa-xmark' />
                </Button>
            </div>


            <div className='p-3 d-flex flex-column' style={{ gap: '10px' }}>

                {/* client filter */}
                <UserFilter
                    title="Client"
                    state={client}
                    setState={setClient}
                    roleIds={null}
                />

                {/* projects filter */}
                <ProjectFilterItem
                    title="Projects"
                    items={getProjectsOptions ? [...getProjectsOptions] : []}
                    isLoading={isFetching}
                    selected={selectedProject}
                    onSelect={handleProjectFilter}
                />


                {/* Report Issuer */}
                <UserFilter
                    title="Report Issuer"
                    state={reportIssuer}
                    setState={setReportIssuer}
                    roleIds={[5, 6]}
                />

                {/* Accountable Individual */}
                <UserFilter
                    title="Accountable Individual"
                    state={accountableIndividual}
                    setState={setAccountableIndividual}
                    roleIds={[4,6,8]}
                />


                {/* status */}
                <StatusFilter
                    state={status}
                    setState={setStatus}
                />
            </div>
        </div>
    )
}

export default FilterSidebar