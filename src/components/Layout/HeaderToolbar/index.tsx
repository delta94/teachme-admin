import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Divider, Tooltip } from 'antd';

import { IconType } from '../../common/Icon/icon.interface';
import Icon from '../../common/Icon';
import WMButton from '../../common/WMButton';

import SystemMenu from './SystemMenu';
import EnvironmentMenu from './EnvironmentMenu';
import UserMenu from './UserMenu';

import classes from './style.module.scss';
import Header from '../../common/Header';

export default function HeaderToolbar(): ReactElement {
  const menuClassName = classes['header-toolbar-menu'];

  return (
    <Header className={classes['header-toolbar']}>
      <>
        <div className={classes['header-toolbar-left']}>
          <SystemMenu className={menuClassName} />
          <EnvironmentMenu className={menuClassName} />
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
          <UserMenu className={cc([classes['user-menu'], menuClassName])} />
        </div>
        <Divider className={classes['header-toolbar-separator']} />
      </>
    </Header>
  );
}
