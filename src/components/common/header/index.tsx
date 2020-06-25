import React, { ReactElement } from 'react';
import TimeFilter from '../filters/TimeFilter';

export default function Header({
  className,
  showTimeFilter,
  children,
}: {
  className: string;
  children: ReactElement;
  showTimeFilter?: boolean;
}) {
  return (
    <header className={`header ${className}`}>
      {showTimeFilter && <TimeFilter />}
      {children}
    </header>
  );
}
