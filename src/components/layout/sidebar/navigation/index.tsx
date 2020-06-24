import React, { ReactElement } from 'react';
import cc from 'classcat';

import { IRoute } from '../../../../constants/routes';
import { Link, useLocation } from 'react-router-dom';

import Icon from '../../../common/icon';

import './index.scss';

export default function Navigation({ routes }: { routes: IRoute[] }): ReactElement {
  const { pathname } = useLocation();

  return (
    <nav className="navigation">
      <ul>
        {routes.map((route) => {
          const { id, title, path, iconType } = route;

          return (
            <li
              key={`sidebar-nav-item-${id}`}
              className={cc(['nav-item', { active: pathname === path }])}
            >
              <Link to={path}>
                {iconType && <Icon type={iconType} />}
                <span className="text">{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
