import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-second px-4 py-2 text-sm text-main transition-all duration-300 placeholder:text-main/70 focus:outline-none focus:ring focus:ring-main/30 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
