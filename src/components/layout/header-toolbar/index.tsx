import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import { IconType } from '../../common/icon/icon.interface';

import Icon from '../../common/icon';

import './index.scss';

export default function HeaderToolbar(): ReactElement {
  return (
    <header className="header-toolbar">
      <div className="settings">
        <div className="dropdown system-selection">
          <span>Salesforce</span>
        </div>
        <div className="dropdown environment-selection">
          <span>Production</span>
        </div>
        <Divider className="setting-separator" type="vertical" />
        <div className="help">
          <Icon type={IconType.HelpCircle} />
        </div>
        <div className="user">
          <Icon type={IconType.HeaderAvatar} />
        </div>
      </div>
      <Divider className="header-toolbar-separator" />
    </header>
  );
}
