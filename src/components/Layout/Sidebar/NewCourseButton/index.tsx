import React, { ReactElement } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { NEW_COURSE_EDITOR_ROUTE } from '../../../../constants/routes';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';

import classes from './style.module.scss';

export default function NewCourseButton(): ReactElement {
  const history = useHistory();
  const { pathname: currentPath } = useLocation();

  const onLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    if (NEW_COURSE_EDITOR_ROUTE.path === currentPath) {
      e.preventDefault();

      history.replace({ key: uuidv4(), pathname: NEW_COURSE_EDITOR_ROUTE.path });
    }
  };

  return (
    <Link
      className={classes['create-button-wrapper']}
      to={NEW_COURSE_EDITOR_ROUTE.path}
      onClick={onLinkClick}
    >
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
