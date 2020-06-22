import React, { ReactElement } from 'react';

export default function Header({
  className,
  children,
}: {
  className: string;
  children: ReactElement;
}) {
  return <header className={`header ${className}`}>{children}</header>;
}
