import React, { ReactElement } from 'react';
import { Divider, Tooltip } from 'antd';

import { IconType } from '../../common/Icon/icon.interface';
import Icon from '../../common/Icon';
import WMButton from '../../common/WMButton';

import SystemMenu from './SystemMenu';
import EnvironmentMenu from './EnvironmentMenu';
import UserMenu from './UserMenu';

import classes from './style.module.scss';

export default function HeaderToolbar(): ReactElement {
  return (
    <header className={classes['header-toolbar']}>
      <div className={classes['header-toolbar-left']}>
        <SystemMenu />
        <EnvironmentMenu />
        <Divider className={classes['setting-separator']} type="vertical" />
        {/** TODO: help href should change*/}
        <Tooltip title="Help">
          <WMButton
            type="link"
            href="https://walkme.com"
            target="_blank"
            icon={<Icon type={IconType.HelpCircle} />}
            className={classes['help']}
          />
        </Tooltip>
        <UserMenu />
      </div>
      <Divider className={classes['header-toolbar-separator']} />
    </header>
  );
}
