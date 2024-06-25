import React, { useState } from 'react';
import ProjectCheckBox from '../ui/ProjectCheckBox';
import { languages, listing_types, project_skills, project_types } from '../../../constants/projects';
import { Divider } from 'antd';
import FilterBarTitle from '../ui/FilterBarTitle';

const ProjectsFilterBar = () => {
    const [filterQuery, setFilterQuery] = useState({
        project_types: [],
        fixed_price: [
            {
                id: 1,
            }
        ],
        hourly_rate: [],
        project_skills: [],
        listing_types: [],
        project: "",
        clients_country: "",
        languages: [],
    });

    console.log(filterQuery)

    return (
        <div id='projects_page_filter' className='projects_page_filter_bar'>
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
            <div className='filter_sub_wrapper'>
                <FilterBarTitle title={'Fixed price'} onClick={() => setFilterQuery({ ...filterQuery, fixed_price: [] })} />
            </div>
            {/* Hourly rate */}
            <div className='filter_sub_wrapper'>
                <FilterBarTitle title={'Hourly rate'} onClick={() => setFilterQuery({ ...filterQuery, hourly_rate: [] })} />
            </div>
            {/* Skills */}
            <div className='filter_sub_wrapper'>
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
            <div className='filter_sub_wrapper'>
                <FilterBarTitle title={'Listing type'} onClick={() => setFilterQuery({ ...filterQuery, listing_types: [] })} />
                <div>
                    {
                        listing_types.map((item) => (
                            <ProjectCheckBox key={item.id} data={item} checked={filterQuery?.listing_types?.includes(item?.value)} onChange={(e) => {
                                setFilterQuery((prev) => {
                                    const isExist = prev?.listing_types?.includes(item?.value)
                                    if (isExist) {
                                        return {
                                            ...prev,
                                            listing_types: prev?.listing_types?.filter((i) => i !== item?.value)
                                        }
                                    } else {
                                        return {
                                            ...prev,
                                            listing_types: [...prev?.listing_types, item?.value]
                                        }
                                    }
                                })
                            }} />
                        ))
                    }
                </div>
            </div>
            {/* Project  */}
            <div className='filter_sub_wrapper'>
                <FilterBarTitle title={'Project'} onClick={() => setFilterQuery({ ...filterQuery, project: "" })} />
            </div>
            {/* Client's country */}
            <div className='filter_sub_wrapper'>
                <FilterBarTitle title={"Client's country"} onClick={() => setFilterQuery({ ...filterQuery, clients_country: "" })} />
            </div>
            {/* Languages */}
            <div className='filter_sub_wrapper'>
                <FilterBarTitle title={'Languages'} onClick={() => setFilterQuery({ ...filterQuery, languages: [] })} />
                <div>
                    {
                        languages.map((item) => (
                            <ProjectCheckBox key={item.id} data={item} checked={filterQuery?.languages?.includes(item?.value)} onChange={(e) => {
                                setFilterQuery((prev) => {
                                    const isExist = prev?.languages?.includes(item?.value)
                                    if (isExist) {
                                        return {
                                            ...prev,
                                            languages: prev?.languages?.filter((i) => i !== item?.value)
                                        }
                                    } else {
                                        return {
                                            ...prev,
                                            languages: [...prev?.languages, item?.value]
                                        }
                                    }
                                })
                            }} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProjectsFilterBar;