import React from 'react'

const LiveSearch = ({handleSearch, searchTerm, setSearchTerm}) => { 

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(searchTerm)
        }, 500);
    
        return () => clearTimeout(delayDebounceFn);
      }, [searchTerm]);
    
      const handleChange = (event) => {
        setSearchTerm(event.target.value);
      };



  return (
    <div className="input-group">
        <div className="input-group-prepend">
            <div className="input-group-text"><i className='fa-solid fa-search' /></div>
        </div>
        <input 
            type="text" 
            className="form-control"
            style={{padding: '3px 10px'}} 
            id="inlineFormInputGroup" 
            placeholder="Search here..." 
            value={searchTerm}
            onChange={handleChange}
        />
    </div>
  )
}

export default LiveSearch