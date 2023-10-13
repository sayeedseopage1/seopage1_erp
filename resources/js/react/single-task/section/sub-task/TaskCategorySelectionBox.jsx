import { Combobox } from '@headlessui/react'
import * as React from 'react'
import SearchBox from '../../components/form/Searchbox';
import _  from 'lodash';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useGetTaskDetailsQuery } from '../../../../react-latest/services/api/SingleTaskPageApi';



const TaskCategorySelectionBox = ({selected, onSelect, taskId}) => {
    const [query, setQuery] = React.useState('');

    const params = useParams();
    const {
        data:categories,
        isFetching
    } = useGetTaskDetailsQuery(`/${params?.taskId || taskId}/json?mode=category`);


    const filteredData =
    query === ''
      ? categories
      : categories?.filter((cat) => {
          return cat?.category_name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selected} onChange={onSelect}>
        <div className="form-group position-relative my-3">
            <label htmlFor="">Task category<sup>*</sup></label>
            <Combobox.Button className="d-flex align-items-center w-100 sp1-selection-display-button">
                <Combobox.Input
                    onChange={e => setQuery(e.target.value)}
                    placeholder='--'
                    displayValue={(value) => value?.category_name || ''}
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

                {filteredData?.length===0 ?
                    <div className='sp1-select-option-nodata'>
                         Nothing found.
                    </div>
                :filteredData?.map((cat, catIdx) => (
                <Combobox.Option
                    key={catIdx}
                    className={({ active }) =>  `sp1-select-option ${ active ? 'active' : ''}`}
                    value={cat}
                >
                    {({ selected }) => (
                        <>
                            <span
                                className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                {cat?.category_name}
                            </span>
                            {selected ? (
                                <span className="ml-auto"> <i className='fa-solid fa-check'/> </span>
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

export default TaskCategorySelectionBox
