import * as React from 'react';
import { Listbox } from '@headlessui/react'



const priority = ["High", "Medium", "Low"]


const PrioritySelection = ({selected, setSelected}) => { 
    return(
        <Listbox value={selected} onChange={setSelected}>
            <div className="form-group position-relative my-3">
                <label htmlFor=""> Priority <sup>*</sup> </label>
                    <Listbox.Button className=" sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100">{selected}
                    
                    <div className='__icon'>
                        <i className="fa-solid fa-sort"></i>
                    </div>
                </Listbox.Button>
                <Listbox.Options  className="sp1-select-options">
                    {priority?.map((s, i) => (
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

export default PrioritySelection;