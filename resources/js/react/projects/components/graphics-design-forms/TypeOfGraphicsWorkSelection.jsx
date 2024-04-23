import * as React from 'react'
import _ from 'lodash';
// import { useParams } from 'react-router-dom';
import Loader from '../../../single-task/components/Loader';
import { Combobox } from '@headlessui/react';
import { useGetTypesOfGraphicWorksQuery } from '../../../services/api/SingleTaskPageApi';

const TypeOfGraphicsWorkSelection = ({ selected, onSelect, isDesignerTask }) => {
    const [query, setQuery] = React.useState('');

    const { data: graphicOptions, isFetching } = useGetTypesOfGraphicWorksQuery("")

    const types_list = graphicOptions?.map(d => ({
        id: d?.id,
        name: d?.name
    }))

    const filteredData =
        query === ''
            ? types_list
            : types_list?.filter((gType) => {
                return gType?.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selected} disabled={isDesignerTask} onChange={onSelect}>
            <div className="form-group position-relative my-3">
                <label className='f-14 text-dark-gray mb-1' htmlFor="">Type Of Graphics Work<sup>*</sup></label>
                <Combobox.Button className="d-flex align-items-center w-100 sp1-selection-display-button">
                    <Combobox.Input
                        onChange={e => setQuery(e.target.value)}
                        placeholder='Select type of graphics work'
                        displayValue={(value) => value?.name || ''}
                        className="form-control height-35 f-14 sp1-selection-display w-100"
                    />
                    <div className='__icon'>
                        <i className="fa-solid fa-sort"></i>
                    </div>
                </Combobox.Button>

                <Combobox.Options className="sp1-select-options">

                    {isFetching && (
                        <div className='sp1-select-option-nodata'>
                            <Loader />
                        </div>
                    )}

                    {filteredData?.length === 0 ?
                        <div className='sp1-select-option-nodata'>
                            Nothing found.
                        </div>
                        : filteredData?.map((gType, gTypeIndex) => (
                            <Combobox.Option
                                key={gTypeIndex}
                                className={({ active }) => `sp1-select-option ${active ? 'active' : ''}`}
                                value={gType}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {gType?.name}
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

export default TypeOfGraphicsWorkSelection;
