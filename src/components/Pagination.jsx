function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1 
            ? 'bg-gray-600 text-gray-400' 
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        Anterior
      </button>
      
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === index + 1
              ? 'bg-purple-600 text-white'
              : 'bg-gray-700 text-white hover:bg-purple-700'
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages 
            ? 'bg-gray-600 text-gray-400' 
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;