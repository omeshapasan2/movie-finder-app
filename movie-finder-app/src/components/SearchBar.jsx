import React from 'react'
import "../css/SearchBar.css"

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
            <button type="submit" className="search-button">Search</button>
        </form>
    </div>
  )
}

export default SearchBar
