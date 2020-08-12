import React, { ReactElement } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import {
  useUsersContext,
  fetchUsers,
  UsersListQueryOptions,
} from '../../../providers/UsersContext';

import { LoadMoreButton } from '../../common/buttons';

import classes from './style.module.scss';

export default function LoadMoreWrapper({
  queryOptions,
}: {
  queryOptions: UsersListQueryOptions;
}): ReactElement {
  const [appState] = useAppContext();
  const {
    environment: { id: envId },
    dateRange: { from, to },
  } = appState;
  const [{ isFetchingUsers, users, total_rows }, dispatch] = useUsersContext();

  const options = {
    ...queryOptions,
    first_item_index: users.length,
  };

  return (
    <>
      {!isFetchingUsers && (
        <div className={classes['load-more-wrapper']}>
          <span>{`1-${users.length} of ${total_rows} results`}</span>
          {total_rows > users.length && (
            <LoadMoreButton onClick={() => fetchUsers(dispatch, envId, from, to, options, users)} />
          )}
        </div>
      )}
    </>
  );
}
