/* eslint-disable react/display-name */
import React, { ReactElement } from 'react';
import { IconTextCell, DashCell, NumberCell } from '../../common/tableCells';
import Icon from '../../common/Icon';

export const columns = [
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
    title: 'Drop-off',
    dataIndex: 'dropOff',
    key: 'drop-off',
    width: '15%',
    render: (value: number): ReactElement => (
      <DashCell value={value}>
        <NumberCell value={value} />
      </DashCell>
    ),
  },
];
