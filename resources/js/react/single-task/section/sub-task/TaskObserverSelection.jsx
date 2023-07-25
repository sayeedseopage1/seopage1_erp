import { Combobox } from '@headlessui/react'
import * as React from 'react' 
import _, { filter } from 'lodash';

const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
    { id: 6, name: 'Katelyn Rohan', unavailable: false },
    { id: 7, name: 'Katelyn Rohan', unavailable: false },
    { id: 8, name: 'Katelyn Rohan', unavailable: false },
    { id: 9, name: 'Katelyn Rohan', unavailable: false },
  ]

const TaskObserverSelection = () => {
    const [taskCategory, setTaskCategory] = React.useState(null);
    const [query, setQuery] = React.useState('');

    const filteredData =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox  value={taskCategory} onChange={setTaskCategory}>
        <div className="form-group position-relative my-3">
            <label htmlFor="">Task Observer</label>
            <Combobox.Button className="d-flex align-items-center w-100 sp1-selection-display-button">
                <Combobox.Input 
                    onChange={e => setQuery(e.target.value)} 
                    displayValue={(value) => value?.name || '--'}
                    className="form-control height-35 f-14 sp1-selection-display w-100" 
                />
                <div className='__icon'>
                    <i className="fa-solid fa-sort"></i>
                </div>
            </Combobox.Button>
                 
            <Combobox.Options className="sp1-select-options">
                
                {filteredData?.length===0 ? 
                    <div className='sp1-select-option-nodata'>
                         Nothing found.
                    </div>
                :filteredData.map((person, personIdx) => (
                <Combobox.Option
                    key={personIdx}
                    className={({ active }) =>  `sp1-select-option ${ active ? 'active' : ''}`}
                    value={person}
                >
                    {({ selected }) => (
                        <>
                            <span
                                className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                {person.name}
                            </span>
                            {selected ? (
                                <span className="">
                                
                                </span>
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

export default TaskObserverSelection 