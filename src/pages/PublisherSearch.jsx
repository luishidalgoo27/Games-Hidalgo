import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchPublishers } from '../services/api';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

function PublisherSearch() {
  const [publishers, setPublishers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const publishersPerPage = 20;

  useEffect(() => {
    fetchPublishers();
  }, [currentPage]);

  const fetchPublishers = async (query = '') => {
    const data = await searchPublishers(query, currentPage, publishersPerPage);
    setPublishers(data.results);
    setTotalPages(Math.ceil(data.count / publishersPerPage));
  };

  const handleSearch = (query) => {
    setCurrentPage(1);
    fetchPublishers(query);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-game min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-amber-50">Buscar Publishers</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {publishers.map((publisher) => (
          <Link 
            key={publisher.id} 
            to={`/publisher/${publisher.id}`}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
          >
            <h2 className="text-xl font-bold text-amber-50">{publisher.name}</h2>
            <p className="text-gray-400 mt-2">Juegos: {publisher.games_count}</p>
          </Link>
        ))}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}

export default PublisherSearch;