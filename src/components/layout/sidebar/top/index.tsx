import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import { ReactComponent as LogoIcon } from '../../../../images/logo.svg';

import './index.scss';

export default function Top(): ReactElement {
  return (
    <div className="top">
      <div className="logo">
        <span>TEACH</span>
        <LogoIcon />
      </div>
      <Divider className="top-separator" />
    </div>
  );
}
