/* eslint-disable react/display-name */
import React, { ReactElement, ReactNode } from 'react';
import { IconTextCell, DashCell, NumberCell } from '../../common/tableCells';
import Icon from '../../common/Icon';

interface IColumn {
  title: ReactNode;
  dataIndex: string;
  key: string;
  width?: string;
  render: (data: any) => ReactElement;
}

export const getColumns = (dropOffEnabled?: boolean): IColumn[] => {
  const dropOffTitle = dropOffEnabled ? 'Drop-off' : 'Drop-off (?)';
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
