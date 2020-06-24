import React, { ReactElement } from 'react';
import { ReactComponent as LogoIcon } from '../../../../images/logo.svg';

import './index.less';

export default function Top(): ReactElement {
  return (
    <div className="top">
      <div className="logo">
        <span>TEACH</span>
        <LogoIcon />
      </div>
    </div>
  );
}
