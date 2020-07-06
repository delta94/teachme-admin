import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { NEWCOURSE_ROUTE } from '../../../../constants/routes';

import classes from './style.module.scss';

export default function NewCourseButton(): ReactElement {
  return (
    <div className={classes['create-btn']}>
      <Divider className={classes['bottom-separator']} />
      <Link to={NEWCOURSE_ROUTE.path}>
        <div className={classes.oval}>
          <PlusOutlined className="plus-icon" />
        </div>
      </Link>
      <span className={classes.text}>Create</span>
    </div>
  );
}
