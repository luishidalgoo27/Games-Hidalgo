import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce the search to avoid making too many API calls
  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  return (
    <input
      type="text"
      placeholder="Buscar juegos..."
      value={searchTerm}
      onChange={handleChange}
      className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}

export default SearchBar;