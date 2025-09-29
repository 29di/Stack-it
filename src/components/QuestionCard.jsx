import React, { useState, useMemo } from 'react';
import { useToastActions } from './Toast';

const QuestionCard = ({ question }) => {
  const { title, description, tags, votes, _id } = question;
  const [upvotes, setUpvotes] = useState(Math.max(0, votes || 0));
  const [downvotes, setDownvotes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  const { notifyUpvote, notifyDownvote, notifyComment } = useToastActions();

  // Generate consistent random avatar for each question based on ID
  const avatar = useMemo(() => {
    const avatars = [
      '👨‍💻', '👩‍💻', '🧑‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', 
      '🧑‍🔬', '👩‍🔬', '👨‍🏫', '👩‍🏫', '🧑‍🎨', '👩‍🎨'
    ];
    const colors = [
      'bg-gradient-to-br from-purple-400 to-pink-400',
      'bg-gradient-to-br from-blue-400 to-cyan-400', 
      'bg-gradient-to-br from-green-400 to-emerald-400',
      'bg-gradient-to-br from-orange-400 to-red-400',
      'bg-gradient-to-br from-indigo-400 to-purple-400',
      'bg-gradient-to-br from-pink-400 to-rose-400'
    ];
    
    // Use question ID to generate consistent avatar
    const avatarIndex = (_id ? _id.charCodeAt(0) : Math.floor(Math.random() * 100)) % avatars.length;
    const colorIndex = (_id ? _id.charCodeAt(0) : Math.floor(Math.random() * 100)) % colors.length;
    
    return {
      emoji: avatars[avatarIndex],
      color: colors[colorIndex]
    };
  }, [_id]);

  const handleUpvote = () => {
    setUpvotes(prevUpvotes => prevUpvotes + 1);
    notifyUpvote();
  };

  const handleDownvote = () => {
    setDownvotes(prevDownvotes => prevDownvotes + 1);
    notifyDownvote();
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        timestamp: new Date().toLocaleString(),
        author: 'Anonymous' // You can replace this with actual user data
      };
      setComments([...comments, comment]);
      setNewComment('');
      notifyComment();
    }
  };

  return (
    <div className="group border border-surface-border-light dark:border-surface-border-dark rounded-2xl p-6 mb-4 hover:shadow-elevation hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 bg-surface-light dark:bg-surface-dark hover:-translate-y-1 transform">
      {/* Header with Avatar and Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full ${avatar.color} flex items-center justify-center text-white text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-200`}>
          {avatar.emoji}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-1 text-content-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {title}
          </h2>
          <div className="flex items-center gap-2 text-sm text-content-secondary">
            <span>Posted by Anonymous</span>
            <span>•</span>
            <span>2 hours ago</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        className="text-content-secondary text-sm mb-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Enhanced Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700 hover:from-primary-100 hover:to-primary-200 dark:hover:from-primary-800/30 dark:hover:to-primary-700/30 transition-all duration-200 transform hover:scale-105"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Enhanced Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleUpvote}
            className="group/btn flex items-center gap-2 px-4 py-2 bg-vote-up-light hover:bg-vote-up-hover-light dark:bg-vote-up-dark dark:hover:bg-vote-up-hover-dark rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 border border-vote-up-border-light dark:border-vote-up-border-dark"
          >
            <span className="text-vote-up-text-light dark:text-vote-up-text-dark group-hover/btn:scale-125 transition-transform duration-200">👍</span>
            <span className="text-vote-up-text-light dark:text-vote-up-text-dark font-medium">{upvotes}</span>
          </button>
          
          <button
            onClick={handleDownvote}
            className="group/btn flex items-center gap-2 px-4 py-2 bg-vote-down-light hover:bg-vote-down-hover-light dark:bg-vote-down-dark dark:hover:bg-vote-down-hover-dark rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 border border-vote-down-border-light dark:border-vote-down-border-dark"
          >
            <span className="text-vote-down-text-light dark:text-vote-down-text-dark group-hover/btn:scale-125 transition-transform duration-200">👎</span>
            <span className="text-vote-down-text-light dark:text-vote-down-text-dark font-medium">{downvotes}</span>
          </button>
          
          <button
            onClick={handleToggleComments}
            className="group/btn flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 dark:hover:from-primary-800/30 dark:hover:to-secondary-800/30 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 border border-primary-200 dark:border-primary-700"
          >
            <span className="text-primary-600 dark:text-primary-400 group-hover/btn:scale-125 transition-transform duration-200">💬</span>
            <span className="text-primary-700 dark:text-primary-300 font-medium">{comments.length}</span>
          </button>
        </div>
        
        {/* Share button */}
        <button className="group/share p-2 rounded-full hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-all duration-200 transform hover:scale-110">
          <span className="text-content-secondary group-hover/share:text-content-primary">📤</span>
        </button>
      </div>

      {/* Enhanced Comments Section */}
      {showComments && (
        <div className="mt-6 pt-6 border-t border-surface-border-light dark:border-surface-border-dark animate-in slide-in-from-top-2 duration-300">
          <h3 className="text-lg font-semibold mb-4 text-content-primary flex items-center gap-2">
            <span className="text-primary-500">💬</span>
            Comments ({comments.length})
          </h3>
          
          {/* Enhanced Add Comment Section */}
          <div className="mb-6 p-4 bg-surface-hover-light dark:bg-surface-hover-dark rounded-xl border border-surface-border-light dark:border-surface-border-dark">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center text-white text-sm">
                👤
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border border-surface-border-light dark:border-surface-border-dark rounded-lg resize-none dark:bg-surface-dark dark:text-content-primary bg-surface-light text-content-primary focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  rows="3"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-content-secondary">{newComment.length}/500</span>
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-6 py-2 bg-gradient-primary hover:from-primary-600 hover:to-primary-700 disabled:from-content-muted disabled:to-content-muted text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed font-medium"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💭</div>
                <p className="text-content-secondary">No comments yet. Start the conversation!</p>
              </div>
            ) : (
              comments.map((comment, index) => (
                <div 
                  key={comment.id} 
                  className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-surface-border-light dark:border-surface-border-dark shadow-soft hover:shadow-elevation transition-all duration-200 transform hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center text-white text-sm">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-sm text-content-primary">{comment.author}</span>
                        <span className="text-xs text-content-secondary">{comment.timestamp}</span>
                      </div>
                      <p className="text-content-secondary text-sm leading-relaxed">{comment.text}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="text-xs text-content-secondary hover:text-primary-500 transition-colors">Reply</button>
                        <button className="text-xs text-content-secondary hover:text-secondary-500 transition-colors">❤️ Like</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
