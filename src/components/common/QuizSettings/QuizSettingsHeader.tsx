import React, { ReactElement } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import Icon, { IconType } from '../Icon';
import WMButton from '../WMButton';

import classes from './style.module.scss';

export default function QuizSettingsHeader({ onClose }: { onClose: () => void }): ReactElement {
  return (
    <div className={classes['quiz-settings-header']}>
      <span className={classes['quiz-settings-title']}>
        <Icon type={IconType.QuizSettings} /> Quiz Settings
      </span>
      <WMButton className={classes['close']} onClick={onClose}>
        <CloseOutlined />
      </WMButton>
    </div>
  );
}
