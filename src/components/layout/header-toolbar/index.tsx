import React, { ReactElement } from 'react';
import { Divider, Button, Tooltip } from 'antd';

import { IconType } from '../../common/icon/icon.interface';

import SystemMenu from './system-menu';
import EnvironmentMenu from './environment-menu';
import UserMenu from './user-menu';

import Icon from '../../common/icon';

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
          <Button
            type="link"
            href="https://walkme.com"
            target="_blank"
            icon={<Icon type={IconType.HelpCircle} />}
            className={classes.help}
          />
        </Tooltip>
        <UserMenu />
      </div>
      <Divider className={classes['header-toolbar-separator']} />
    </header>
  );
}
