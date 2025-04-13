import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder({ view }) {
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
        className={`input sm:focus:w-72" w-28 bg-second text-main placeholder:text-main/70 sm:w-64 ${view === 'small' && 'w-full'}`}
      />
    </form>
  );
}

export default SearchOrder;
