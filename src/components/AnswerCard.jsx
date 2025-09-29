import React, { useState } from 'react';

const AnswerCard = ({ answer, isExpanded = false }) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [votes, setVotes] = useState(answer.votes || 0);
  const [userVote, setUserVote] = useState(null); // 'up', 'down', or null
  
  const handleVote = (voteType) => {
    if (userVote === voteType) {
      // Remove vote
      setVotes(votes - (voteType === 'up' ? 1 : -1));
      setUserVote(null);
    } else if (userVote === null) {
      // Add new vote
      setVotes(votes + (voteType === 'up' ? 1 : -1));
      setUserVote(voteType);
    } else {
      // Change vote
      setVotes(votes + (voteType === 'up' ? 2 : -2));
      setUserVote(voteType);
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-0.5">
      {/* Answer Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
          👨‍💻
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900 dark:text-white">John Developer</span>
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
              ✓ Accepted
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Answered 3 hours ago</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span>Expert</span>
            </span>
          </div>
        </div>
      </div>

      {/* Answer Content */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-none' : 'max-h-24'}`}>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {answer.content}
          {!expanded && answer.content.length > 200 && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
          )}
        </div>
        
        {expanded && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            {/* Code Example */}
            {answer.codeExample && (
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Example:</span>
                  <button className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors">
                    Copy
                  </button>
                </div>
                <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                  <code>{answer.codeExample}</code>
                </pre>
              </div>
            )}
            
            {/* Additional Resources */}
            {answer.resources && answer.resources.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Helpful Resources:</h4>
                <div className="space-y-2">
                  {answer.resources.map((resource, index) => (
                    <a 
                      key={index}
                      href={resource.url}
                      className="block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
                    >
                      🔗 {resource.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expand/Collapse Button */}
      {answer.content.length > 200 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors mb-4 flex items-center gap-1 group/expand"
        >
          <span>{expanded ? 'Show Less' : 'Read More'}</span>
          <span className={`transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''} group-hover/expand:scale-110`}>
            ⌄
          </span>
        </button>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          {/* Upvote */}
          <button
            onClick={() => handleVote('up')}
            className={`group/vote flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              userVote === 'up' 
                ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-400 dark:border-green-500' 
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <span className={`transition-all duration-200 group-hover/vote:scale-125 ${
              userVote === 'up' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
            }`}>
              👍
            </span>
            <span className={`font-medium ${
              userVote === 'up' ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-300'
            }`}>
              {Math.max(0, votes)}
            </span>
          </button>

          {/* Downvote */}
          <button
            onClick={() => handleVote('down')}
            className={`group/vote flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              userVote === 'down' 
                ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-500' 
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <span className={`transition-all duration-200 group-hover/vote:scale-125 ${
              userVote === 'down' ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
            }`}>
              👎
            </span>
          </button>

          {/* Reply */}
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95">
            <span className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">💬</span>
            <span className="text-gray-600 dark:text-gray-300 text-sm">Reply</span>
          </button>
        </div>

        {/* Share & Save */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110 group/share">
            <span className="text-gray-500 dark:text-gray-400 group-hover/share:text-gray-700 dark:group-hover/share:text-gray-200">📤</span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110 group/save">
            <span className="text-gray-500 dark:text-gray-400 group-hover/save:text-yellow-500">🔖</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;