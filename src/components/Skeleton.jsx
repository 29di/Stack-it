import React from 'react';

// Base Skeleton Component
const Skeleton = ({ className = "", animate = true, ...props }) => {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
      {...props}
    />
  );
};

// Question Card Skeleton
export const QuestionCardSkeleton = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-4 bg-white dark:bg-gray-800 animate-pulse">
      {/* Header with Avatar and Title */}
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
};

// Answer Card Skeleton
export const AnswerCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-4 animate-pulse">
      {/* Answer Header */}
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>

      {/* Answer Content */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Code Block */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-12 rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-16 rounded-full" />
          <Skeleton className="h-10 w-12 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// Search Bar Skeleton
export const SearchBarSkeleton = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto animate-pulse">
      <Skeleton className="w-full h-16 rounded-2xl" />
    </div>
  );
};

// Navbar Skeleton
export const NavbarSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="h-6 w-20" />
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Skeleton className="h-10 w-20 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="h-10 w-20 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

// List Skeleton (for multiple items)
export const ListSkeleton = ({ count = 3, ItemComponent = QuestionCardSkeleton, className = "" }) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <ItemComponent key={index} />
      ))}
    </div>
  );
};

// Page Skeleton (full page loading)
export const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 animate-pulse">
      <NavbarSkeleton />
      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <SearchBarSkeleton />
        </div>
        
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-8 w-20 rounded" />
          <Skeleton className="h-8 w-24 rounded" />
          <Skeleton className="h-8 w-32 rounded" />
        </div>

        <ListSkeleton count={5} />
      </div>
    </div>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="animate-spin rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 w-full h-full"></div>
    </div>
  );
};

// Shimmer Effect Component
export const ShimmerSkeleton = ({ className = "", children }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200/50 dark:via-gray-600/20 to-transparent"></div>
    </div>
  );
};

// Skeleton with shimmer effect
export const SkeletonWithShimmer = ({ className = "", ...props }) => {
  return (
    <ShimmerSkeleton className={className}>
      <Skeleton animate={false} className="w-full h-full" {...props} />
    </ShimmerSkeleton>
  );
};

export default Skeleton;