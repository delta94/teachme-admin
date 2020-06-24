import React from 'react';

import { IconType } from './icon.interface';
import { IconSVG } from './iconsSVG';

import './index.scss';

export default function Icon({ type }: { type: IconType }) {
  const Component = IconSVG[type as keyof typeof IconSVG];

  return <span className={`icon ${type}`}>{Component && <Component />}</span>;
}
