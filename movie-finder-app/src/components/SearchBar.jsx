import React from 'react'
import "../css/SearchBar.css"
import { FaSearch } from "react-icons/fa";

const SearchBar = ({value, onChange, onSubmit}) => {
  return (
    <div>
        <form onSubmit={onSubmit} className="search-form">
            <input
                type="text"
                placeholder="Search for Movies..."
                className="search-input"
                value={value}
                onChange={onChange}
            />
            <button type="submit" className="search-button"><FaSearch /></button>
        </form>
        <br/>
    </div>
  )
}

export default SearchBar
