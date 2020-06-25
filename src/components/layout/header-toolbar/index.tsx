import React, { ReactElement } from 'react';

import Icon from '../../common/icon';

import classes from './style.module.scss';

export default function HeaderToolbar(): ReactElement {
  return (
    <header className={classes['header-toolbar']}>
      <div className={classes.settings}>
        <div className={classes['system-selection']}>
          <span>Salesforce</span>
        </div>
        <div className={classes.help}>
          <Icon type="help" />
        </div>
        <div className={classes.user}>
          <Icon type="users" />
        </div>
      </div>
    </header>
  );
}
