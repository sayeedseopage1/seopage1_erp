import * as React from 'react'
import _ from 'lodash';
// import { useParams } from 'react-router-dom';
// import Loader from '../../../single-task/components/Loader';
// import { useGetTaskDetailsQuery } from '../../../../react-latest/services/api/SingleTaskPageApi';
import { Combobox } from '@headlessui/react';
// import { useGetTaskDetailsQuery } from '../../../services/api/SingleTaskPageApi';
// import Loader from '../../../single-task/components/Loader';

const themeOptions = [
    { id: 1, type_name: 'No specific theme' },
    { id: 2, type_name: 'Need to use a specific theme' },
];


const ThemeTypeSelect = ({ selected, onSelect, taskId, isDesignerTask }) => {
    const [query, setQuery] = React.useState('');


    const theme_type_list = themeOptions?.map(d => ({
        id: d?.id,
        type_name: d?.type_name
    }))

    const filteredData =
        query === ''
            ? theme_type_list
            : theme_type_list?.filter((lType) => {
                return lType?.type_name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selected} disabled={isDesignerTask} onChange={onSelect}>
            <div className="form-group position-relative my-3">
                <label className='f-14 text-dark-gray mb-1' htmlFor="">Theme<sup>*</sup></label>
                <Combobox.Button className="d-flex align-items-center w-100 sp1-selection-display-button">
                    <Combobox.Input
                        onChange={e => setQuery(e.target.value)}
                        placeholder='Select type of theme'
                        displayValue={(value) => value?.type_name || ''}
                        className="form-control height-35 f-14 sp1-selection-display w-100"
                    />
                    <div className='__icon'>
                        <i className="fa-solid fa-sort"></i>
                    </div>
                </Combobox.Button>

                <Combobox.Options className="sp1-select-options">

                    {/* {isFetching && (
                        <div className='sp1-select-option-nodata'>
                            <Loader />
                        </div>
                    )} */}

                    {filteredData?.length === 0 ?
                        <div className='sp1-select-option-nodata'>
                            Nothing found.
                        </div>
                        : filteredData?.map((lType, lTypeIndex) => (
                            <Combobox.Option
                                key={lTypeIndex}
                                className={({ active }) => `sp1-select-option ${active ? 'active' : ''}`}
                                value={lType}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {lType?.type_name}
                                        </span>
                                        {selected ? (
                                            <span className="ml-auto"> <i className='fa-solid fa-check' /> </span>
                                        ) : null}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                </Combobox.Options>
            </div>
        </Combobox >
    )
}

export default ThemeTypeSelect;
