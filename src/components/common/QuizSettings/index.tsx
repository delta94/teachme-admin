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
  const [showSettingsForm, setShowSettingsForm] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      // Using setTimeout to prevent rendering the content while the quiz-setting container's animation done
      timer = setTimeout(() => {
        setShowSettingsForm(isOpen);
      }, 300);
    } else {
      setShowSettingsForm(isOpen);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <WMCard
      className={cc([classes['quiz-settings'], { [classes['open']]: isOpen }])}
      title={<QuizSettingsHeader onClose={onClose} />}
    >
      {showSettingsForm && <QuizSettingsForm courseId={courseId} />}
    </WMCard>
  );
}
