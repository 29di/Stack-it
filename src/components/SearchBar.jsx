import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search questions...", suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Sample suggestions data - you can replace this with actual data
  const defaultSuggestions = [
    { type: 'tag', value: 'React', count: 150 },
    { type: 'tag', value: 'JavaScript', count: 200 },
    { type: 'tag', value: 'Node.js', count: 80 },
    { type: 'question', value: 'How to use useState in React?', id: '1' },
    { type: 'question', value: 'What is Node.js used for?', id: '2' },
    { type: 'question', value: 'How to center a div?', id: '3' },
  ];

  const allSuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions;

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.value.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestion(-1);
  }, [query, allSuggestions]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Simulate search loading
    if (value.length > 0) {
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 300);
    } else {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.value);
    setShowSuggestions(false);
    onSearch(suggestion.value, suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestion >= 0 && filteredSuggestions[activeSuggestion]) {
        handleSuggestionClick(filteredSuggestions[activeSuggestion]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
      searchInputRef.current?.blur();
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      setShowSuggestions(false);
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    onSearch('');
    searchInputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={suggestionsRef}>
      {/* Search Input Container */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isSearching ? (
            <div className="animate-spin h-5 w-5 text-blue-500">
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md group-hover:border-gray-400 dark:group-hover:border-gray-500"
        />
        
        {/* Clear Button */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors transform hover:scale-110 active:scale-95"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg max-h-80 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center justify-between group/suggestion ${
                index === activeSuggestion ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
              } ${index === 0 ? 'rounded-t-xl' : ''} ${index === filteredSuggestions.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-100 dark:border-gray-700'}`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-2xl ${
                  suggestion.type === 'tag' ? '🏷️' : 
                  suggestion.type === 'question' ? '❓' : '📝'
                }`}>
                </span>
                <div>
                  <div className="text-gray-900 dark:text-white font-medium group-hover/suggestion:text-blue-600 dark:group-hover/suggestion:text-blue-400 transition-colors">
                    {suggestion.value}
                  </div>
                  {suggestion.type === 'tag' && suggestion.count && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {suggestion.count} questions
                    </div>
                  )}
                </div>
              </div>
              
              {suggestion.type === 'tag' && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full opacity-0 group-hover/suggestion:opacity-100 transition-opacity">
                  Tag
                </span>
              )}
            </button>
          ))}
          
          {/* Search All Results */}
          <button
            onClick={handleSearch}
            className="w-full px-4 py-3 text-left border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 rounded-b-xl"
          >
            <div className="flex items-center gap-3">
              <span className="text-blue-500">🔍</span>
              <span className="text-gray-700 dark:text-gray-300">
                Search for "<span className="font-semibold text-blue-600 dark:text-blue-400">{query}</span>"
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;