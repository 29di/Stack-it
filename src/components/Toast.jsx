import React, { useState, useEffect, createContext, useContext } from 'react';

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Types
const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Individual Toast Component
const Toast = ({ id, type, title, message, duration, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 10);

    // Auto close
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles = "flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-sm max-w-sm w-full transform transition-all duration-300 ease-out";
    
    const typeStyles = {
      [TOAST_TYPES.SUCCESS]: "bg-green-50/95 dark:bg-green-900/90 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200",
      [TOAST_TYPES.ERROR]: "bg-red-50/95 dark:bg-red-900/90 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200",
      [TOAST_TYPES.WARNING]: "bg-yellow-50/95 dark:bg-yellow-900/90 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200",
      [TOAST_TYPES.INFO]: "bg-blue-50/95 dark:bg-blue-900/90 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200"
    };

    const animationStyles = isExiting 
      ? "opacity-0 translate-x-full scale-95" 
      : isVisible 
        ? "opacity-100 translate-x-0 scale-100" 
        : "opacity-0 translate-x-full scale-95";

    return `${baseStyles} ${typeStyles[type]} ${animationStyles}`;
  };

  const getIcon = () => {
    const iconMap = {
      [TOAST_TYPES.SUCCESS]: "✅",
      [TOAST_TYPES.ERROR]: "❌", 
      [TOAST_TYPES.WARNING]: "⚠️",
      [TOAST_TYPES.INFO]: "ℹ️"
    };
    return iconMap[type];
  };

  return (
    <div className={getToastStyles()}>
      {/* Icon */}
      <div className="flex-shrink-0 text-xl">
        {getIcon()}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold text-sm mb-1">
            {title}
          </div>
        )}
        {message && (
          <div className="text-sm opacity-90">
            {message}
          </div>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 ml-2 text-lg opacity-60 hover:opacity-100 transition-opacity transform hover:scale-110 active:scale-95"
      >
        ×
      </button>
    </div>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={removeToast} />
        </div>
      ))}
    </div>
  );
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      duration: 4000, // Default 4 seconds
      ...toast
    };

    setToasts(prev => [...prev, newToast]);
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  // Convenience methods
  const showSuccess = (title, message, options = {}) => {
    return addToast({ ...options, type: TOAST_TYPES.SUCCESS, title, message });
  };

  const showError = (title, message, options = {}) => {
    return addToast({ ...options, type: TOAST_TYPES.ERROR, title, message });
  };

  const showWarning = (title, message, options = {}) => {
    return addToast({ ...options, type: TOAST_TYPES.WARNING, title, message });
  };

  const showInfo = (title, message, options = {}) => {
    return addToast({ ...options, type: TOAST_TYPES.INFO, title, message });
  };

  const contextValue = {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    showSuccess,
    showError, 
    showWarning,
    showInfo
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Hook for quick toast actions
export const useToastActions = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const notifyUpvote = () => showSuccess("Upvoted!", "Thanks for your feedback");
  const notifyDownvote = () => showInfo("Downvoted", "Feedback recorded");
  const notifyComment = () => showSuccess("Comment Added!", "Your comment has been posted");
  const notifyQuestionPosted = () => showSuccess("Question Posted!", "Your question is now live");
  const notifyError = (message) => showError("Error", message);
  const notifyWarning = (message) => showWarning("Warning", message);

  return {
    notifyUpvote,
    notifyDownvote, 
    notifyComment,
    notifyQuestionPosted,
    notifyError,
    notifyWarning
  };
};

export { TOAST_TYPES };