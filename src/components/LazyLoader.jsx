import React, { Suspense } from 'react';

const OptimizedSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-2 border-spero border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const LazyLoader = ({ children }) => (
  <Suspense fallback={<OptimizedSpinner />}>
    {children}
  </Suspense>
);
