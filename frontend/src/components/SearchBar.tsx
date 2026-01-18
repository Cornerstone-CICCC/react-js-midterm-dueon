import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const search = async () => {
      if (keyword.trim().length > 0) {
        try {
          const res = await axios.get(`/product/search?q=${keyword}`);
          setResults(res.data);
        } catch (err) {
          console.error("Search API error:", err);
        }
      } else {
        setResults([]);
      }
    };

    const debounce = setTimeout(search, 300);
    return () => clearTimeout(debounce);
  }, [keyword]);

  return (
    <div className="search-overlay">
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search"
            className="search-main-input"
            autoFocus
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <span className="search-cancel" onClick={onClose}>
            Cancel
          </span>
        </div>

        {results.length > 0 && (
          <div className="search-results-list">
            {results.map((product) => (
              <div
                key={product._id}
                className="search-result-item"
                onClick={() => {
                  navigate(`/product/${product._id}`);
                  onClose();
                }}
              >
                {product.title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="search-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default SearchBar;
