import React, { ReactElement } from 'react';

import { useUsersContext } from '../../../providers/UsersContext';

import { LoadMoreButton } from '../../common/buttons';

import classes from './style.module.scss';

export default function LoadMoreWrapper(): ReactElement {
  const [{ users, totals_unique_users, total_rows }] = useUsersContext();

  return (
    <div className={classes['load-more-wrapper']}>
      <span>{`1-${users.length} of ${total_rows} results`}</span>
      <LoadMoreButton onClick={() => console.log('loaded')} />
    </div>
  );
}
