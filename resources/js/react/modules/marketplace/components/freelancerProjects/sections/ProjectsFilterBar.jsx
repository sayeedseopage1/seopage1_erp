import React, { useState } from 'react';
import ProjectCheckBox from '../ui/ProjectCheckBox';
import { project_skills, project_types } from '../../../constants/projects';
import { Divider } from 'antd';
import FilterBarTitle from '../ui/FilterBarTitle';

const ProjectsFilterBar = () => {
    const [filterQuery, setFilterQuery] = useState({
        project_types: [],
        fixed_price: [],
        hourly_rate: [],
        project_skills: [],
        listing_types: [],
        project: "",
        clients_country: "",
        languages: [],
    });

    console.log(filterQuery)

    return (
        <div className='projects_page_filter_bar'>
            <h2 className='projects_page_filter_bar_header'>Filters</h2>
            {/* project type  */}
            <div className='project_type_wrapper'>
                <FilterBarTitle title={'Project Type'} onClick={() => setFilterQuery({ ...filterQuery, project_types: [] })} />
                <div>
                    {
                        project_types.map((item) => (
                            <ProjectCheckBox key={item.id} data={item} checked={filterQuery?.project_types?.includes(item?.value)} onChange={(e) => {
                                setFilterQuery((prev) => {
                                    const isExist = prev?.project_types?.includes(item?.value)
                                    if (isExist) {
                                        return {
                                            ...prev,
                                            project_types: prev?.project_types?.filter((i) => i !== item?.value)
                                        }
                                    } else {
                                        return {
                                            ...prev,
                                            project_types: [...prev?.project_types, item?.value]
                                        }
                                    }
                                })
                            }} />
                        ))
                    }
                </div>
            </div>
            <Divider />
            {/* fixed price */}
            <div className='fixed_price_wrapper'>
                <FilterBarTitle title={'Fixed price'} onClick={() => setFilterQuery({ ...filterQuery, fixed_price: [] })} />
            </div>
            {/* Hourly rate */}
            <div className='fixed_price_wrapper'>
                <FilterBarTitle title={'Hourly rate'} onClick={() => setFilterQuery({ ...filterQuery, hourly_rate: [] })} />
            </div>
            {/* Skills */}
            <div className='fixed_price_wrapper'>
                <FilterBarTitle title={'Skills'} onClick={() => setFilterQuery({ ...filterQuery, project_skills: [] })} />
                <div>
                    {
                        project_skills.map((item) => (
                            <ProjectCheckBox key={item.id} data={item} checked={filterQuery?.project_skills?.includes(item?.value)} onChange={(e) => {
                                setFilterQuery((prev) => {
                                    const isExist = prev?.project_skills?.includes(item?.value)
                                    if (isExist) {
                                        return {
                                            ...prev,
                                            project_skills: prev?.project_skills?.filter((i) => i !== item?.value)
                                        }
                                    } else {
                                        return {
                                            ...prev,
                                            project_skills: [...prev?.project_skills, item?.value]
                                        }
                                    }
                                })
                            }} />
                        ))
                    }
                </div>
            </div>
            {/* Listing type */}
            <div className='fixed_price_wrapper'>
                <FilterBarTitle title={'Listing type'} onClick={() => setFilterQuery({ ...filterQuery, listing_types: [] })} />
            </div>
            {/* Project  */}
            <div className='fixed_price_wrapper'>
                <FilterBarTitle title={'Project'} onClick={() => setFilterQuery({ ...filterQuery, project: "" })} />
            </div>
            {/* Client's country */}
            <div className='fixed_price_wrapper'>
                <FilterBarTitle title={"Client's country"} onClick={() => setFilterQuery({ ...filterQuery, clients_country: "" })} />
            </div>
            {/* Languages */}
            <div className='fixed_price_wrapper'>
                <FilterBarTitle title={'Languages'} onClick={() => setFilterQuery({ ...filterQuery, languages: [] })} />
            </div>
        </div>
    );
};

export default ProjectsFilterBar;