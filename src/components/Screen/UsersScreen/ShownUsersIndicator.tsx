import React, { ReactElement } from 'react';

import { useUsersContext } from '../../../providers/UsersContext';

import classes from './style.module.scss';

export default function ShownUsersIndicator(): ReactElement {
  const [{ filteredUsers, totals_unique_users, usersSearchValue }] = useUsersContext();

  return (
    <div className={classes['shown-users-indicator']}>
      {usersSearchValue ? (
        <>
          Search
          <span className={classes['search-result']}>{filteredUsers.length} Results found</span>
        </>
      ) : (
        `${totals_unique_users} Users`
      )}
    </div>
  );
}
