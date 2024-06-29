import React from 'react';
import { RiSearch2Line } from "react-icons/ri";

const searchBoxInputStyle = {
    padding: '15px 20px',
    height: "52px",
    color: "#8F8F8F",
    fontfamily: "Poppins",
    fontSize: "14px",
    fontWeight: "400",
    width: "100%",
    borderRadius: "7px",
    border: "1px solid #8F8F8F",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "5px",
}

const SearchBox = ({ value, onChange, placeholder = "Search Here ...." }) => {
    return (
        <div style={searchBoxInputStyle}>
            <input
                placeholder={placeholder} className='border-0 flex-grow-1 bg-transparent' value={value} onChange={e => onChange(e.currentTarget.value)} type="text"
            />
            <RiSearch2Line size={24} />
        </div>
    );
};

export default SearchBox;