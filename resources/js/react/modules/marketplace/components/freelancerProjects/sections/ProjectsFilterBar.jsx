import React, { useState } from 'react';
import ProjectCheckBox from '../ui/ProjectCheckBox';
import { languages, listing_types, project_skills, project_types } from '../../../constants/projects';
import { Divider } from 'antd';
import FilterBarTitle from '../ui/FilterBarTitle';
import FilterInput from '../ui/FilterInput';
import { FiSearch } from "react-icons/fi";

const ProjectsFilterBar = () => {
    const [filterQuery, setFilterQuery] = useState({
        project_types: [],
        fixed_price: {
            fixed_min: null,
            fixed_max: null
        },
        hourly_rate: {
            hourly_min: null,
            hourly_max: null
        },
        project_skills: [],
        listing_types: [],
        project: "",
        clients_country: "",
        languages: [],
    });

    // console.log(filterQuery)

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
                <FilterBarTitle title={'Fixed price'} onClick={() => setFilterQuery({
                    ...filterQuery, fixed_price: {
                        fixed_min: null,
                        fixed_max: null
                    }
                })} />
                <FilterInput
                    onChange={(e) => setFilterQuery({ ...filterQuery, fixed_price: { ...filterQuery?.fixed_price, fixed_min: e.target.value } })}
                    placeholder={'0'}
                    label='min'
                    prefix='$'
                    suffix='USD'
                    value={filterQuery?.fixed_price?.fixed_min}
                />
                <FilterInput
                    onChange={(e) => setFilterQuery({ ...filterQuery, fixed_price: { ...filterQuery?.fixed_price, fixed_max: e.target.value } })}
                    placeholder='0'
                    label='max'
                    prefix='$'
                    suffix='USD'
                    value={filterQuery?.fixed_price?.fixed_max}
                />
            </div>
            {/* Hourly rate */}
            <div className='filter_sub_wrapper'>
                <FilterBarTitle title={'Hourly rate'} onClick={() => setFilterQuery({
                    ...filterQuery, hourly_rate: {
                        hourly_min: null,
                        hourly_max: null
                    }
                })} />
                <FilterInput
                    onChange={(e) => setFilterQuery({ ...filterQuery, hourly_rate: { ...filterQuery?.hourly_rate, hourly_min: e.target.value } })}
                    placeholder='0'
                    label='min'
                    prefix='$'
                    suffix='USD'
                    value={filterQuery?.hourly_rate?.hourly_min}
                />
                <FilterInput
                    onChange={(e) => setFilterQuery({ ...filterQuery, hourly_rate: { ...filterQuery?.hourly_rate, hourly_max: e.target.value } })}
                    placeholder='0'
                    label='max'
                    prefix='$'
                    suffix='USD'
                    value={filterQuery?.hourly_rate?.hourly_max}
                />
            </div>
            {/* Skills */}
            <div className='filter_sub_wrapper'>
                <FilterBarTitle title={'Skills'} onClick={() => setFilterQuery({ ...filterQuery, project_skills: [] })} />
                <FilterInput
                    placeholder={'Search skills'}
                    suffix={
                        <FiSearch />
                    }
                />
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
                <div className='text-center'>
                    <button className='filter_view_all_button'>View all ({project_skills?.length})</button>
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
                <FilterInput
                    placeholder='Enter a location'
                    suffix={
                        <FiSearch />
                    }
                    value={filterQuery?.project}
                    onChange={(e) => setFilterQuery({ ...filterQuery, project: e.target.value })}
                />
            </div>
            {/* Client's country */}
            <div className='filter_sub_wrapper'>
                <FilterBarTitle title={"Client's country"} onClick={() => setFilterQuery({ ...filterQuery, clients_country: "" })} />
                <FilterInput
                    placeholder='Search countries'
                    suffix={
                        <FiSearch />
                    }
                    value={filterQuery?.clients_country}
                    onChange={(e) => setFilterQuery({ ...filterQuery, clients_country: e.target.value })}
                />
            </div>
            {/* Languages */}
            <div className='filter_sub_wrapper'>
                <FilterBarTitle title={'Languages'} onClick={() => setFilterQuery({ ...filterQuery, languages: [] })} />
                <FilterInput
                    placeholder={'Search languages'}
                    suffix={
                        <FiSearch />
                    }
                />
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