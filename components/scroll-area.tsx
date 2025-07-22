import React, { forwardRef } from 'react';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';
  scrollbarClassName?: string;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({
    children,
    className = '',
    orientation = 'vertical',
    scrollbarClassName = '',
    ...props
  }, ref) => {
    const scrollbarOrientation = {
      vertical: 'overflow-y-auto',
      horizontal: 'overflow-x-auto',
      both: 'overflow-auto',
    };

    return (
      <div
        ref={ref}
        className={`custom-scrollbar ${scrollbarOrientation[orientation]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;
