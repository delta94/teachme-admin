import React, { ReactElement } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { NEW_COURSE_EDITOR_ROUTE } from '../../../../constants/routes';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';

import classes from './style.module.scss';

export default function NewCourseButton(): ReactElement {
  return (
    <Link className={classes['create-button-wrapper']} to={NEW_COURSE_EDITOR_ROUTE.path}>
      <WMButton
        shape="round"
        variant={ButtonVariantEnum.Create}
        className={classes['create-button']}
      >
        <PlusOutlined className="plus-icon" />
      </WMButton>
      <span className={classes.text}>Create</span>
    </Link>
  );
}
