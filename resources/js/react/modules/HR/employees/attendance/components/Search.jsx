import React from "react";
import styled from "styled-components";

const Search = ({ value, onChange, placeholder, className="" }) => {
    return (
        <SearchContainer className={className}>
            <SearchIcon aria-label="search-icon">
                <i className="fa-solid fa-magnifying-glass" />
            </SearchIcon>
            <SearchInput
                type="search"
                aria-label="search-input"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onKeyDown={e => e.stopPropagation()}
            />
        </SearchContainer>
    );
};

export default Search;

const SearchContainer = styled.div`
    display: grid;
    grid-template-columns: 32px 1fr;
    border: 1px solid lightgrey;
    background-color: #fff;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
`;

const SearchIcon = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SearchInput = styled.input`
    font-size: 14px;
    background-color: #fff;
    border: none;
    outline: none;
`;
