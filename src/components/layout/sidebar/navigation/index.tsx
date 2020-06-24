import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Link, useLocation } from 'react-router-dom';

import Icon from '../../../common/icon';

import './index.less';
import { IRoute } from '../../../../constants/routes';

export default function Navigation({ routes }: { routes: IRoute[] }): ReactElement {
  const { pathname } = useLocation();

  return (
    <nav className="navigation">
      <ul>
        {routes.map((route) => {
          const { id, title, path } = route;

          return (
            <li
              key={`sidebar-nav-item-${id}`}
              className={cc(['nav-item', { active: pathname === path }])}
            >
              <Link to={path}>
                <Icon type={id} />
                <span className="text">{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
