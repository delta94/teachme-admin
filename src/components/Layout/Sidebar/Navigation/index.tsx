import React, { ReactElement, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import cc from 'classcat';

import { IRoute } from '../../../../constants/routes';
import Icon from '../../../common/Icon';

import classes from './style.module.scss';

export default function Navigation({ routes }: { routes: IRoute[] }): ReactElement {
  const { pathname } = useLocation();

  return (
    <nav className={classes.navigation}>
      <ul>
        {routes
          .filter((route) => !route.hideInSidebar && route)
          .map(
            (route): ReactNode => {
              const { id, title, path, iconType, matches } = route;

              const isActive = matches && matches.some((match) => pathname.indexOf(match) > -1);

              return (
                <li
                  key={`sidebar-nav-item-${id}`}
                  className={cc([classes['nav-item'], { [classes.active]: isActive }])}
                >
                  <Link to={path}>
                    {iconType && <Icon type={iconType} className={classes.icon} />}
                    <span className={classes.text}>{title}</span>
                  </Link>
                </li>
              );
            },
          )}
      </ul>
    </nav>
  );
}
