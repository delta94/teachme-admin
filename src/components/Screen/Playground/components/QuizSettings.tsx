import React, { ReactElement, useState } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';

import CourseEditorProvider from '../../../../providers/CourseEditorContext';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import WMCard from '../../../common/WMCard';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon, { IconType } from '../../../common/Icon';
import QuizSettingsForm from '../../../common/QuizSettingsForm';

import classes from './playground.module.scss';

export default function QuizSettings(): ReactElement {
  const [courseId, setCourseId] = useState(0);

  return (
    <CourseEditorProvider>
      <div className={classes['cards-wrapper']}>
        <WMCard className={cc([classes['buttons'], classes['grow']])}>
          <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1284870)}>
            Quiz Settings - courseId 1284870
          </WMButton>
          <Divider />
          <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1297234)}>
            Quiz Settings - courseId 1297234
          </WMButton>
          <Divider />
          <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1277328)}>
            Quiz Settings - courseId 1277328
          </WMButton>
          <Divider />
        </WMCard>
        <DetailsPanel
          title="Quiz Settings"
          titleIcon={<Icon type={IconType.QuizSettings} />}
          isOpen={Boolean(courseId)}
          onClose={() => setCourseId(0)}
        >
          <QuizSettingsForm courseId={courseId} />
        </DetailsPanel>
      </div>
    </CourseEditorProvider>
  );
}
