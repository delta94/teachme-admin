import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import cc from 'classcat';

import { getCourse } from '../../../walkme';

import WMCard from '../WMCard';

import classes from './style.module.scss';
import QuizSettingsHeader from './QuizSettingsHeader';
import QuizSettingsForm from './QuizSettingsForm';

export default function QuizSettings({
  courseId,
  isOpen,
  onClose,
}: {
  courseId: number;
  isOpen: boolean;
  onClose: () => void;
}): ReactElement {
  return (
    <WMCard
      className={cc([classes['quiz-settings'], { [classes['open']]: isOpen }])}
      title={<QuizSettingsHeader onClose={onClose} />}
    >
      <QuizSettingsForm courseId={courseId} />
    </WMCard>
  );
}
