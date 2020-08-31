import React, { ReactElement, useMemo } from 'react';

import { pluralizer } from '../../../utils';

import WMSkeleton from '../../common/WMSkeleton';

import classes from './style.module.scss';

function ShownUsersIndicator({
  showResults,
  isFetchingUsers,
  totals_unique_users,
  total_rows,
}: {
  showResults: boolean;
  isFetchingUsers: boolean;
  total_rows: number;
  totals_unique_users: number;
}): ReactElement {
  const results = useMemo(() => pluralizer('Result', total_rows), [total_rows]);
  const users = useMemo(() => pluralizer('User', totals_unique_users), [totals_unique_users]);

  return (
    <WMSkeleton
      className={classes['shown-users-skeleton']}
      loading={isFetchingUsers}
      active
      paragraph={false}
    >
      <div className={classes['shown-users-indicator']}>
        {showResults ? (
          <>
            Search
            <span className={classes['search-result']}>{`${total_rows} ${results} found`}</span>
          </>
        ) : (
          `${totals_unique_users} ${users}`
        )}
      </div>
    </WMSkeleton>
  );
}

export default React.memo(ShownUsersIndicator);
