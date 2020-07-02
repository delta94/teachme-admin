import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { IRoute } from '../../../../constants/routes';

import classes from './style.module.scss';

export default function NewCourseBtn({ routes }: { routes: IRoute[] }): ReactElement {
  return (
    <div>
      {routes.map((route) => {
        const { id, path } = route;
        return (
          <div className={classes['create-btn']} key={`sidebar-nav-item-${id}`}>
            <Divider className={classes['bottom-separator']} />
            <Link to={path}>
              <div className={classes.oval}>
                <PlusOutlined className="plus-icon" />
              </div>
            </Link>
            <span className={classes.text}>Create</span>
          </div>
        );
      })}
    </div>
  );
}
