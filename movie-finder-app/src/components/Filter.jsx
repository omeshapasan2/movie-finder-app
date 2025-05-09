import { useState, useEffect, useCallback } from "react";
import "../css/Filter.css";
import { useTheme } from '../contexts/ThemeContext';

function Filter({ filters, onChange }) {
  const [ratingValue, setRatingValue] = useState(filters.rating || "");
  const [tempRatingValue, setTempRatingValue] = useState(filters.rating || "");
  const [showRatingValue, setShowRatingValue] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const { darkMode } = useTheme();

  // Debounced onChange handler
  const debouncedOnChange = useCallback(
    (type, value) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      setDebounceTimer(
        setTimeout(() => {
          onChange(type, value);
        }, 500)
      ); // 500ms delay after sliding stops
    },
    [debounceTimer, onChange]
  );

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  useEffect(() => {
    // Update rating position when value changes
    if (tempRatingValue) {
      const percentage = ((tempRatingValue - 1) / 9) * 100;
      setSliderPosition(percentage);
    } else {
      setSliderPosition(0);
    }
  }, [tempRatingValue]);

  const handleRatingChange = (e) => {
    const value = e.target.value;
    setRatingValue(value);
    setTempRatingValue(value);
    onChange("rating", value); // Immediate update for direct input
  };

  const handleRatingSliderChange = (e) => {
    const value = e.target.value;
    setTempRatingValue(value);
    setShowRatingValue(true);
    debouncedOnChange("rating", value);
  };

  const handleSliderMouseUp = () => {
    // Force update when user releases the slider
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    setRatingValue(tempRatingValue);
    onChange("rating", tempRatingValue);
  };

  const handleSliderMouseEnter = () => {
    setShowRatingValue(true);
  };

  const handleSliderMouseLeave = () => {
    setShowRatingValue(false);
  };

  return (
    <div className={`filter-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="filter-grid">
        {/* Genre Filter */}
        <div className="filter-group">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            value={filters.genre || ""}
            onChange={(e) => onChange("genre", e.target.value)}
          >
            <option value="">All Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            <option value="27">Horror</option>
            <option value="878">Science Fiction</option>
            <option value="10749">Romance</option>
            <option value="9648">Mystery</option>
            <option value="53">Thriller</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="14">Fantasy</option>
          </select>
        </div>

        {/* Year Range Filter */}
        <div className="filter-group">
          <label htmlFor="yearStart">Year Range</label>
          <div className="number-input-wrapper">
            <input
              id="yearStart"
              type="number"
              placeholder="From"
              value={filters.yearStart || ""}
              onChange={(e) => onChange("yearStart", e.target.value)}
              min="1900"
              max={new Date().getFullYear()}
            />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3vh' }}>
              {/* <span>to</span> */}
            </div>
            <input
              id="yearEnd"
              type="number"
              placeholder="To"
              value={filters.yearEnd || ""}
              onChange={(e) => onChange("yearEnd", e.target.value)}
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div className="filter-group rating-group">
          <label htmlFor="rating">Min Rating (1-10)</label>
          <div className="rating-control">
            <div className="number-input-wrapper">
              <input
                id="rating"
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={ratingValue}
                onChange={handleRatingChange}
                placeholder="1-10"
              />
              <div className="spinner-buttons">
                <div 
                  className="spinner-button" 
                  onClick={() => {
                    const currentValue = parseFloat(ratingValue || 1);
                    const newValue = Math.min(currentValue + 0.1, 10).toFixed(1);
                    setRatingValue(newValue);
                    setTempRatingValue(newValue);
                    onChange("rating", newValue);
                  }}
                >
                  ▲
                </div>
                <div 
                  className="spinner-button" 
                  onClick={() => {
                    const currentValue = parseFloat(ratingValue || 1);
                    const newValue = Math.max(currentValue - 0.1, 1).toFixed(1);
                    setRatingValue(newValue);
                    setTempRatingValue(newValue);
                    onChange("rating", newValue);
                  }}
                >
                  ▼
                </div>
              </div>
            </div>
            <div className="rating-slider-container">
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={tempRatingValue || 1}
                onChange={handleRatingSliderChange}
                onMouseUp={handleSliderMouseUp}
                onMouseEnter={handleSliderMouseEnter}
                onMouseLeave={handleSliderMouseLeave}
                className="modern-slider"
                style={{
                  "--slider-fill-percent": `${sliderPosition}%`,
                  "--slider-value": tempRatingValue || 0,
                }}
              />
              {showRatingValue && tempRatingValue && (
                <div 
                  className="slider-value-tooltip"
                  style={{ left: `calc(${sliderPosition}%)` }}
                >
                  {Number(tempRatingValue).toFixed(1)}
                </div>
              )}
              <div className="slider-labels">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Filter;