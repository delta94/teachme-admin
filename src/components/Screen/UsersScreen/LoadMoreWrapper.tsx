import React, { Dispatch, ReactElement, useMemo } from 'react';

import { fetchUsers, UsersListQueryOptions } from '../../../providers/UsersContext';

import { LoadMoreButton } from '../../common/buttons';

import { UserListUILineItem } from '../../../walkme/models/users';
import classes from './style.module.scss';

function LoadMoreWrapper({
  queryOptions,
  isFetchingUsers,
  users,
  total_rows,
  dispatch,
  envId,
  from,
  to,
}: {
  queryOptions: UsersListQueryOptions;
  isFetchingUsers: boolean;
  users: Array<UserListUILineItem>;
  total_rows: number;
  dispatch: Dispatch<any>;
  envId: number;
  from: string;
  to: string;
}): ReactElement {
  const options = useMemo(
    () => ({
      ...queryOptions,
      first_item_index: users.length,
    }),

    [queryOptions, users.length],
  );

  return (
    <>
      {!isFetchingUsers && (
        <div className={classes['load-more-wrapper']}>
          {users.length ? (
            <span>{`1-${users.length} of ${total_rows} results`}</span>
          ) : (
            <span>No results</span>
          )}
          {total_rows > users.length && (
            <LoadMoreButton onClick={() => fetchUsers(dispatch, envId, from, to, options, users)} />
          )}
        </div>
      )}
    </>
  );
}

export default React.memo(LoadMoreWrapper);
