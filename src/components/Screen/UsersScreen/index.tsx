import React, { ReactElement } from 'react';
import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import { usersMockData } from '../../../constants/mocks/users-mock';
import { data as tableData, columns } from '../../../mocks/tableMockUsersData';
import ScreenHeader from '../../common/ScreenHeader';

export default function UsersScreen(): ReactElement {
  const { title: mainTitle, usersTable } = usersMockData;
  return (
    <>
      <ScreenHeader title={mainTitle} />
      <WMCard title={`${tableData.length} ${usersTable.title}`}>
        <WMTable data={tableData} columns={columns} />
      </WMCard>
    </>
  );
}