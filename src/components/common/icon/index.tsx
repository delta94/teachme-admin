import React from 'react';
import { IconSVG } from './iconsSVG';

import './index.scss';

export default function Icon({ type }: { type: string }) {
  const Component = IconSVG[type as keyof typeof IconSVG];

  return <span className={`icon ${type}`}>{Component && <Component />}</span>;
}
