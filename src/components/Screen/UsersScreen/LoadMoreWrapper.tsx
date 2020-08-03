import React, { ReactElement } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { useUsersContext, defaultQueryOptions, fetchUsers } from '../../../providers/UsersContext';

import { LoadMoreButton } from '../../common/buttons';

import classes from './style.module.scss';

export default function LoadMoreWrapper(): ReactElement {
  const [appState] = useAppContext();
  const {
    environment: { id: envId },
  } = appState;
  const [state, dispatch] = useUsersContext();
  const {
    dateRange: { from, to },
    isFetchingUsers,
    users,
    total_rows,
    usersSearchValue,
  } = state;

  const options = {
    ...defaultQueryOptions,
    first_item_index: users.length,
  };

  if (usersSearchValue.length) options.user_name = usersSearchValue;

  return (
    <>
      {total_rows > defaultQueryOptions.num_of_records && !isFetchingUsers && (
        <div className={classes['load-more-wrapper']}>
          <span>{`1-${users.length} of ${total_rows} results`}</span>
          <LoadMoreButton onClick={() => fetchUsers(dispatch, envId, from, to, options, users)} />
        </div>
      )}
    </>
  );
}