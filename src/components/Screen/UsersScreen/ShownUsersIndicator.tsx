import React, { ReactElement } from 'react';

import { useUsersContext } from '../../../providers/UsersContext';

import WMSkeleton from '../../common/WMSkeleton';

import classes from './style.module.scss';

export default function ShownUsersIndicator(): ReactElement {
  const [state] = useUsersContext();
  const { isFetchingUsers, totals_unique_users, total_rows, usersSearchValue } = state;

  return (
    <WMSkeleton
      className={classes['shown-users-skeleton']}
      loading={isFetchingUsers}
      active
      paragraph={false}
    >
      <div className={classes['shown-users-indicator']}>
        {usersSearchValue ? (
          <>
            Search
            <span className={classes['search-result']}>{total_rows} Results found</span>
          </>
        ) : (
          <>{totals_unique_users} Users</>
        )}
      </div>
    </WMSkeleton>
  );
}
