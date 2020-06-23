import React, { ReactElement } from 'react';

import { IconType } from '../../common/icon/icon.interface';

import Icon from '../../common/icon';

import './index.scss';

export default function HeaderToolbar(): ReactElement {
  return (
    <header className="header-toolbar">
      <div className="settings">
        <div className="system-selection">
          <span>Salesforce</span>
        </div>
        <div className="help">
          <Icon type={IconType.HelpCircle} />
        </div>
        <div className="user">
          <Icon type={IconType.HeaderAvatar} />
        </div>
      </div>
    </header>
  );
}
