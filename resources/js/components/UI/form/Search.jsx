import { forwardRef } from 'react';
import './search.css'


const Search = forwardRef(({ value, onChange, placeholder, className = "", ...props }, ref) => {

    return (
        <div className='sp1_search--box'>
            <i className="fa-solid fa-search sp1_search--icon" />
            <input
                ref={ref}
                type="text"
                placeholder={placeholder || 'Search here...'}
                value={value}
                onChange={e => onChange ? onChange(e.target.value) : null}
                className={`sp1_search--input ${className}`}
            />
        </div>
    )
});

export default Search;