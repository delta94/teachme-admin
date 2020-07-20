import React, { ReactElement, useState } from 'react';
import { Divider } from 'antd';

import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import WMCard from '../../../common/WMCard';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon, { IconType } from '../../../common/Icon';
import QuizSettingsForm from '../../../common/QuizSettingsForm';

import classes from './playground.module.scss';

export default function QuizSettings(): ReactElement {
  const [courseId, setCourseId] = useState(0);

  return (
    <div className={classes['cards-wrapper']}>
      <WMCard className={classes['quiz-settings-buttons']}>
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1284870)}>
          Quiz Settings - 1284870
        </WMButton>
        <Divider />
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1297234)}>
          Quiz Settings - 1297234
        </WMButton>
        <Divider />
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1277328)}>
          Quiz Settings - 1277328
        </WMButton>
        <Divider />
      </WMCard>
      <DetailsPanel
        title={
          <>
            <Icon type={IconType.QuizSettings} /> Quiz Settings
          </>
        }
        isOpen={Boolean(courseId)}
        onClose={() => setCourseId(0)}
      >
        <QuizSettingsForm courseId={courseId} />
      </DetailsPanel>
    </div>
  );
}
