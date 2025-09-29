import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dummyQuestions } from '../data/questions';

const Home = () => {
  const [questions, setQuestions] = useState(dummyQuestions);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Newest');
  const [tagFilter, setTagFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  // Get all unique tags for filter dropdown
  const allTags = [...new Set(questions.flatMap(q => q.tags))];

  const filteredQuestions = questions
    .filter(q => q.title.toLowerCase().includes(search.toLowerCase()) || 
                 q.description.toLowerCase().includes(search.toLowerCase()))
    .filter(q => tagFilter === 'All' || q.tags.includes(tagFilter))
    .filter(q => filter === 'Unanswered' ? q.answers?.length === 0 : true)
    .sort((a, b) => {
      if (filter === 'Most Voted') return b.votes - a.votes;
      if (filter === 'Newest') return new Date(b.timeAgo) - new Date(a.timeAgo);
      return 0;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = filteredQuestions.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter, tagFilter]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-elevation border border-surface-border-light dark:border-surface-border-dark p-6">
          
          {/* Header with filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Link 
              to="/ask"
              className="bg-gradient-primary hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-soft"
            >
              Ask New Question
            </Link>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('Newest')}
                className={`px-3 py-1 rounded border transition-all duration-200 ${
                  filter === 'Newest' 
                    ? 'bg-gradient-primary text-white border-primary-500 shadow-soft' 
                    : 'bg-surface-light dark:bg-surface-dark border-surface-border-light dark:border-surface-border-dark text-content-primary hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark'
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setFilter('Unanswered')}
                className={`px-3 py-1 rounded border transition-all duration-200 ${
                  filter === 'Unanswered' 
                    ? 'bg-gradient-primary text-white border-primary-500 shadow-soft' 
                    : 'bg-surface-light dark:bg-surface-dark border-surface-border-light dark:border-surface-border-dark text-content-primary hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark'
                }`}
              >
                Unanswered
              </button>
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="px-3 py-1 border border-surface-border-light dark:border-surface-border-dark rounded bg-surface-light dark:bg-surface-dark text-content-primary"
              >
                <option value="All">More</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-4 pr-10 py-2 border border-surface-border-light dark:border-surface-border-dark rounded-lg bg-surface-light dark:bg-surface-dark text-content-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-content-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {currentQuestions.map((question) => (
              <div key={question._id} className="border border-surface-border-light dark:border-surface-border-dark rounded-lg p-4 hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Link 
                      to={`/question/${question._id}`}
                      className="text-lg font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      {question.title}
                    </Link>
                    
                    <div className="flex items-center gap-2 mt-1 mb-3">
                      {question.tags.map((tag, index) => (
                        <span key={index} className="bg-surface-hover-light dark:bg-surface-hover-dark text-content-primary px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-content-secondary text-sm mb-3 line-clamp-2">
                      {question.description}
                    </p>
                    
                    <div className="text-sm text-content-secondary">
                      {question.author}
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="text-sm text-content-secondary mb-1">
                      {question.timeAgo}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-surface-border-light dark:border-surface-border-dark rounded text-content-primary hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === number
                      ? 'bg-gradient-primary text-white border-primary-500'
                      : 'border-surface-border-light dark:border-surface-border-dark text-content-primary hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-surface-border-light dark:border-surface-border-dark rounded text-content-primary hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          )}
          
          {/* Results Info */}
          <div className="text-center mt-4 text-sm text-content-secondary">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredQuestions.length)} of {filteredQuestions.length} questions
          </div>
        </div>

        {/* Sidebar */}
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-surface-light dark:bg-surface-dark rounded-lg shadow-elevation p-4 w-16">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 bg-surface-hover-light dark:bg-surface-hover-dark rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-content-secondary">👤</span>
            </div>
            <div className="text-xs text-center">
              <div className="font-medium text-content-primary">SQL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
