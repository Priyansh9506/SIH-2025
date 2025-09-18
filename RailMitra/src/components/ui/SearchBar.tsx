import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { clsx } from 'clsx';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search trains, sections, alerts...",
  onSearch,
  onFilter,
  className
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSubmit} className={clsx('relative', className)}>
      <div className={clsx(
        'flex items-center bg-gray-800 border rounded-lg transition-all duration-200',
        isFocused ? 'border-railflow-primary shadow-lg shadow-railflow-primary/20' : 'border-gray-700'
      )}>
        <Search className="h-5 w-5 text-gray-400 ml-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-gray-400 px-3 py-2 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="p-1 text-gray-400 hover:text-white mr-2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {onFilter && (
          <button
            type="button"
            onClick={onFilter}
            className="p-2 text-gray-400 hover:text-railflow-primary border-l border-gray-700 mr-1"
          >
            <Filter className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};
