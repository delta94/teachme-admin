import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Divider, Tooltip } from 'antd';

import { useAppSkeleton } from '../../../Hook';
import { IconType } from '../../common/Icon/icon.interface';
import Icon from '../../common/Icon';
import WMButton from '../../common/WMButton';
import Header from '../../common/Header';
import { WMSkeletonInput, WMSkeletonAvatar, WMSkeletonButton } from '../../common/WMSkeleton';

import SystemMenu from './SystemMenu';
import EnvironmentMenu from './EnvironmentMenu';
import UserMenu from './UserMenu';

import classes from './style.module.scss';

export default function HeaderToolbar(): ReactElement {
  const menuClassName = classes['header-toolbar-menu'];
  const appInit = useAppSkeleton();

  return (
    <Header className={classes['header-toolbar']}>
      {appInit ? (
        <>
          <SystemMenu className={menuClassName} />
          <EnvironmentMenu className={menuClassName} />
          <Divider className={classes['separator']} type="vertical" />
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
        </>
      ) : (
        <div className={classes['header-toolbar-skeleton']}>
          <WMSkeletonInput style={{ width: 100 }} active />
          <WMSkeletonInput style={{ width: 100 }} active />
          <WMSkeletonButton active shape="circle" />
          <WMSkeletonAvatar active shape="square" />
        </div>
      )}
    </Header>
  );
}
