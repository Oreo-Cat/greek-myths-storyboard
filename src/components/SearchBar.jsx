import React, { useState } from 'react';

export default function SearchBar({ myths, onSelect }) {
  const [query, setQuery] = useState('');
  const results = myths.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="absolute top-4 left-4 z-50 bg-white p-3 shadow rounded w-80">
      <input
        type="text"
        placeholder="Search myths..."
        className="border p-2 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul className="mt-2 max-h-48 overflow-y-auto">
          {results.map((m) => (
            <li
              key={m.id}
              className="cursor-pointer p-1 hover:bg-gray-200"
              onClick={() => {
                onSelect(m.id);
                setQuery('');
              }}
            >
              {m.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
