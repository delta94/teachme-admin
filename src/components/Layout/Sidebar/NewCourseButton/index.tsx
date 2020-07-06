import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { COURSE_EDITOR_ROUTE } from '../../../../constants/routes';

import classes from './style.module.scss';

export default function NewCourseButton(): ReactElement {
  return (
    <div className={classes['create-btn']}>
      <Divider className={classes['bottom-separator']} />
      <Link to={COURSE_EDITOR_ROUTE.path} className={classes.oval}>
        <PlusOutlined className="plus-icon" />
      </Link>
      <span className={classes.text}>Create</span>
    </div>
  );
}
