import React, { ReactElement } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { NEW_COURSE_EDITOR_ROUTE } from '../../../../constants/routes';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';

import classes from './style.module.scss';

export default function NewCourseButton(): ReactElement {
  return (
    <div className={classes['create-button-wrapper']}>
      <WMButton
        shape="round"
        variant={ButtonVariantEnum.Create}
        className={classes['create-button']}
        href={`/apps/teachme-admin${NEW_COURSE_EDITOR_ROUTE.path}`}
      >
        <PlusOutlined className="plus-icon" />
      </WMButton>
      <span className={classes.text}>Create</span>
    </div>
  );
}
