import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import cc from 'classcat';

import { IRoute } from '../../../../constants/routes';
import Icon from '../../../common/icon';

import classes from './style.module.scss';

export default function Navigation({ routes }: { routes: IRoute[] }): ReactElement {
  const { pathname } = useLocation();

  return (
    <nav className={classes.navigation}>
      <ul>
        {routes.map((route) => {
          const { id, title, path, iconType } = route;
          const isActive = pathname === path;

          return (
            <li
              key={`sidebar-nav-item-${id}`}
              className={cc([classes['nav-item'], { [classes.active]: isActive }])}
            >
              <Link to={path}>
                {iconType && <Icon type={iconType} />}
                <span className={classes.text}>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
