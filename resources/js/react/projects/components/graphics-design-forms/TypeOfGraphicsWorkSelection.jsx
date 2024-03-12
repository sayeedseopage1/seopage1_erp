import * as React from 'react'
import _ from 'lodash';
import { useParams } from 'react-router-dom';
// import Loader from '../../../single-task/components/Loader';
// import { useGetTaskDetailsQuery } from '../../../../react-latest/services/api/SingleTaskPageApi';
import { Combobox } from '@headlessui/react';
import { useGetTaskDetailsQuery } from '../../../services/api/SingleTaskPageApi';
import Loader from '../../../single-task/components/Loader';

// FIXME: it will be replace with api data in future
const graphicOptions = [
    { id: 1, type_name: 'Logo' },
    { id: 2, type_name: 'Banner' },
    { id: 3, type_name: 'Brochure' },
    { id: 4, type_name: 'Company Profile' },
    { id: 5, type_name: 'Image Retouching' },
    { id: 6, type_name: 'Background Removal' },
    { id: 7, type_name: 'Illustration' },
    { id: 8, type_name: 'Motion Graphics' },
    // { id: 9, type_name: 'Others' },
];

const TypeOfGraphicsWorkSelection = ({ selected, onSelect, taskId, isDesignerTask }) => {
    const [query, setQuery] = React.useState('');

    const params = useParams();

    const {
        data,
        isFetching
    } = useGetTaskDetailsQuery(`/${params?.taskId || taskId}/json?mode=category`);

    const types_list = graphicOptions?.map(d => ({
        id: d?.id,
        type_name: d?.type_name
    }))

    const filteredData =
        query === ''
            ? types_list
            : types_list?.filter((gType) => {
                return gType?.type_name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selected} disabled={isDesignerTask} onChange={onSelect}>
            <div className="form-group position-relative my-3">
                <label className='f-14 text-dark-gray mb-1' htmlFor="">Type Of Graphics Work<sup>*</sup></label>
                <Combobox.Button className="d-flex align-items-center w-100 sp1-selection-display-button">
                    <Combobox.Input
                        onChange={e => setQuery(e.target.value)}
                        placeholder='Select type of graphics work'
                        displayValue={(value) => value?.type_name || ''}
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
                                            {gType?.type_name}
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
