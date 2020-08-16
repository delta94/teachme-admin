/* eslint-disable react/display-name */
import React, { ReactElement, ReactNode } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

import { IconTextCell, DashCell, NumberCell } from '../../common/tableCells';
import Icon from '../../common/Icon';
import WMPopover from '../../common/WMPopover';
import classes from './style.module.scss';

interface IColumn {
  title: ReactNode;
  dataIndex: string;
  key: string;
  width?: string;
  render: (data: any) => ReactElement;
}

export const getColumns = (dropOffEnabled?: boolean): IColumn[] => {
  const notEnabledDropOfTitle = (
    <WMPopover content="Drop-off is only calculated for courses with an enforced outline">
      <span className={classes['drop-off-col']}>
        Drop-off <InfoCircleOutlined className={classes['drop-off-info']} />
      </span>
    </WMPopover>
  );
  const dropOffTitle = dropOffEnabled ? 'Drop-off' : notEnabledDropOfTitle;

  return [
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'item-name',
      render: ({ value, icon }: { value: string; icon?: string }): ReactElement => (
        <IconTextCell value={value} icon={icon && <Icon type={icon} />} />
      ),
    },
    {
      title: 'Users Completed Item',
      dataIndex: 'usersCompletedItem',
      key: 'users-completed-item',
      width: '15%',
      render: (value: number): ReactElement => (
        <DashCell value={value}>
          <NumberCell value={value} />
        </DashCell>
      ),
    },
    {
      title: dropOffTitle,
      dataIndex: 'dropOff',
      key: 'drop-off',
      width: '15%',
      render: (value: number): ReactElement => (
        <DashCell value={value}>
          <NumberCell value={`${value}%`} />
        </DashCell>
      ),
    },
  ];
};
