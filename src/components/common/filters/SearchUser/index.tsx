import React, { ReactElement } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Icon from '../../Icon';
import { IconType } from '../../Icon/icon.interface';
import classes from './style.module.scss';

export default function SearchUser(): ReactElement {
  return (
    <>
      <div className={classes['icon-file']}>
        <Icon type={IconType.FileUsersIcon} />
      </div>
      <Input placeholder=" Search users" prefix={<SearchOutlined />} />
    </>
  );
}
