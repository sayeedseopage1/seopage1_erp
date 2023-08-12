import * as React from 'react';
import { Listbox } from '@headlessui/react'



const status = [
    "To Do",
]


const StatusSelection = () => {
    const [selected, setSelected] = React.useState(status[0]);

    return(
        <Listbox value={selected} onChange={setSelected}>
            <div className="form-group position-relative my-3">
                <label htmlFor=""> Status </label>
                <Listbox.Button className=" sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">{selected}
                    <div className='__icon'>
                        <i className="fa-solid fa-sort"></i>
                    </div>
                </Listbox.Button>
                <Listbox.Options  className="sp1-select-options">
                    {status?.map((s, i) => (
                        <Listbox.Option 
                            key={i}
                            className={({ active }) =>  `sp1-select-option ${ active ? 'active' : ''}`}
                            value={s}
                        > {s} </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    )
}

export default StatusSelection;