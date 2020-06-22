import React, { ReactElement } from 'react';

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
          <Icon type="help" />
        </div>
        <div className="user">
          <Icon type="users" />
        </div>
      </div>
    </header>
  );
}
