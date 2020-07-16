import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Divider, Tooltip } from 'antd';

import { useAppContext } from '../../../providers/AppContext';
import { IconType } from '../../common/Icon/icon.interface';
import Icon from '../../common/Icon';
import WMButton from '../../common/WMButton';
import Header from '../../common/Header';

import SystemMenu from './SystemMenu';
import EnvironmentMenu from './EnvironmentMenu';
import UserMenu from './UserMenu';

import classes from './style.module.scss';

export default function HeaderToolbar(): ReactElement {
  const [state, dispatch] = useAppContext();

  const menuClassName = classes['header-toolbar-menu'];

  console.log('HeaderToolbar state ', state);

  return (
    <Header className={classes['header-toolbar']}>
      <SystemMenu className={menuClassName} />
      <EnvironmentMenu className={menuClassName} />
      <Divider className={classes['separator']} type="vertical" />
      {/** TODO: help href should change*/}
      <Tooltip title="Help">
        <WMButton
          className={classes['help-btn']}
          href="https://walkme.com"
          target="_blank"
          icon={<Icon type={IconType.HelpCircle} />}
        />
      </Tooltip>
      <UserMenu
        buttonClassName={classes['user-btn']}
        className={cc([classes['user-menu'], menuClassName])}
      />
    </Header>
  );
}
