import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { dummyQuestions } from '../data/questions';

const QuestionDetails = () => {
  const { id } = useParams();
  
  // React Hooks must be called before any conditional returns
  const [newAnswer, setNewAnswer] = useState('');
  const [expandedAnswers, setExpandedAnswers] = useState({});
  
  // Find the question by ID from the shared data
  const question = dummyQuestions.find(q => q._id === id);
  
  // If question not found, show error
  if (!question) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-content-primary mb-4">
              Question Not Found
            </h1>
            <p className="text-content-secondary mb-6">
              The question you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/" 
              className="bg-gradient-primary hover:from-primary-600 hover:to-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const answers = question.answers || [];

  // ReactQuill modules configuration for answers
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block', 'list', 'bullet', 'link'
  ];

  const toggleAnswer = (answerId) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [answerId]: !prev[answerId]
    }));
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (newAnswer.trim()) {
      console.log('New answer submitted:', newAnswer);
      setNewAnswer('');
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400">
            <Link to="/" className="hover:text-primary-700 dark:hover:text-primary-300">
              Questions
            </Link>
            <span className="text-content-secondary">&gt;</span>
            <span className="text-content-primary truncate">
              {question.title.length > 50 ? question.title.substring(0, 50) + '...' : question.title}
            </span>
          </div>
        </nav>

        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-elevation border border-surface-border-light dark:border-surface-border-dark">
          
          {/* Question Header */}
          <div className="p-6 border-b border-surface-border-light dark:border-surface-border-dark">
            <h1 className="text-2xl font-bold text-content-primary mb-4">
              {question.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              {question.tags.map((tag, index) => (
                <span key={index} className="bg-surface-hover-light dark:bg-surface-hover-dark text-content-primary px-2 py-1 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-content-secondary text-sm leading-relaxed mb-4">
              {question.description}
            </p>
            
            <div className="text-sm text-content-secondary">
              Asked by <span className="font-medium">{question.author}</span> • {question.timeAgo}
            </div>
          </div>

          {/* Answers Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-content-primary mb-6">
              Answers
            </h2>

            {/* Answer List */}
            <div className="space-y-6">
              {answers.map((answer) => (
                <div key={answer.id} className="border border-surface-border-light dark:border-surface-border-dark rounded-lg p-4">
                  
                  {/* Answer Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-surface-hover-light dark:bg-surface-hover-dark rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-content-secondary">👤</span>
                      </div>
                      <div>
                        <div className="font-medium text-content-primary text-sm">
                          {answer.author}
                          {answer.isAccepted && (
                            <span className="ml-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 text-xs px-2 py-1 rounded-full">
                              ✓ Accepted
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-content-secondary">
                          {answer.timeAgo}
                        </div>
                      </div>
                    </div>
                    
                    {/* Vote buttons */}
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-colors">
                        <span className="text-secondary-600 dark:text-secondary-400">▲</span>
                      </button>
                      <span className="text-sm font-medium text-content-primary">
                        {answer.votes}
                      </span>
                      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-colors">
                        <span className="text-content-muted">▼</span>
                      </button>
                    </div>
                  </div>

                  {/* Answer Content */}
                  <div className={`text-content-secondary text-sm leading-relaxed ${
                    expandedAnswers[answer.id] ? '' : 'line-clamp-3'
                  }`}>
                    <div className="whitespace-pre-line">
                      {answer.content}
                    </div>
                  </div>

                  {/* Expand/Collapse button */}
                  {answer.content.length > 200 && (
                    <button
                      onClick={() => toggleAnswer(answer.id)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm mt-2"
                    >
                      {expandedAnswers[answer.id] ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Answer Form */}
            <div className="mt-8 pt-6 border-t border-surface-border-light dark:border-surface-border-dark">
              <h3 className="text-lg font-semibold text-content-primary mb-4">
                Submit Your Answer
              </h3>
              
              <form onSubmit={handleSubmitAnswer} className="space-y-4">
                <div>
                  <div className="border border-surface-border-light dark:border-surface-border-dark rounded-lg overflow-hidden">
                    <ReactQuill
                      value={newAnswer}
                      onChange={setNewAnswer}
                      modules={modules}
                      formats={formats}
                      placeholder="Write your answer here..."
                      style={{
                        backgroundColor: 'white',
                        minHeight: '200px'
                      }}
                      className="bg-surface-light dark:bg-surface-dark"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-primary hover:from-primary-600 hover:to-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-soft"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar - If not login note */}
        <div className="mt-6 p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg">
          <p className="text-sm text-warning-800 dark:text-warning-200">
            <strong>Note:</strong> If not logged in, users are not able to vote (show a quick login/signup popup). 
            No multiple votes allowed - User can up-vote answer (once per user).
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;