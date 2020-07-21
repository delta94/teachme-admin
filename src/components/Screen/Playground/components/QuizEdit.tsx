import React, { ReactElement, useState, useCallback, useEffect } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';
import { Quiz, QuizScreen, BaseQuiz } from '@walkme/types';

import { getCourse } from '../../../../walkme';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import WMCard from '../../../common/WMCard';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon, { IconType } from '../../../common/Icon';
import QuizEditForm from '../../../common/QuizEditForm';

import classes from './playground.module.scss';

export default function QuizEdit(): ReactElement {
  const [courseId, setCourseId] = useState(0);
  const [quizData, setQuizData] = useState<(Quiz & BaseQuiz) | undefined>();

  const getCourseOutline = useCallback(async () => {
    const course = await getCourse(courseId, 0);
    const quizData = course && course.quiz;

    console.log('getCourseOutline quiz ', quizData);

    quizData
      ? setQuizData((quizData as unknown) as (Quiz & BaseQuiz) | undefined)
      : setQuizData((undefined as unknown) as (Quiz & BaseQuiz) | undefined);
  }, [courseId]);

  useEffect(() => {
    // TODO: use useCourseEditorContext
    getCourseOutline();
  }, [courseId, getCourseOutline]);

  return (
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
        {quizData && <QuizEditForm quizData={quizData} quizPropertyData={quizData.welcomeScreen} />}
      </DetailsPanel>
    </div>
  );
}
