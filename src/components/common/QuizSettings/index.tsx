import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import cc from 'classcat';
import { BuildCourse } from '@walkme/types';

import { getCourse } from '../../../walkme';

import WMButton from '../WMButton';
import Header from '../Header';
import WMCard from '../WMCard';

import classes from './style.module.scss';

const QuizSettingsHeader = ({ onClose }: { onClose: () => void }) => (
  <Header className={classes['quiz-settings-header']} title="Quiz Settings">
    <WMButton className={classes['close']} onClick={onClose}>
      <CloseOutlined />
    </WMButton>
  </Header>
);

export default function QuizSettings({
  courseId,
  isOpen,
  onClose,
}: {
  courseId: number;
  isOpen: boolean;
  onClose: () => void;
}): ReactElement {
  const [course, setCourse] = useState((null as unknown) as BuildCourse);

  // Creating list of quiz for playground
  const getCourseOutline = useCallback(async () => {
    const course = await getCourse(courseId, 0);

    setCourse(course as BuildCourse);
  }, [courseId]);

  useEffect(() => {
    getCourseOutline();
  }, [courseId, getCourseOutline]);

  return (
    <WMCard
      className={cc([classes['quiz-settings'], { [classes['open']]: isOpen }])}
      title={<QuizSettingsHeader onClose={onClose} />}
    >
      bla bla
    </WMCard>
  );
}
