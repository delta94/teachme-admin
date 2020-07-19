import React, { ReactElement, useState, useEffect, useCallback, ChangeEvent } from 'react';
import cc from 'classcat';
import { BuildQuizProperties } from '@walkme/types';

import { getCourse } from '../../../walkme';

import WMInput from '../WMInput';

import classes from './style.module.scss';

export default function QuizSettingsForm({ courseId }: { courseId: number }): ReactElement {
  const [originalQuizProperties, setOriginalQuizProperties] = useState(
    (null as unknown) as BuildQuizProperties,
  );
  const [quizProperties, setQuizProperties] = useState((null as unknown) as BuildQuizProperties);
  const [quizPassmark, setQuizPassmark] = useState(0);
  const [isRandAnswers, setIsRandAnswers] = useState(false);
  const [isRandQuestions, setIsRandQuestions] = useState(false);
  const [isForceCourseCompletion, setIsForceCourseCompletion] = useState(false);
  const [isShowSummary, setIsShowSummary] = useState(false);

  // Creating list of quiz for playground
  const getCourseOutline = useCallback(async () => {
    const course = await getCourse(courseId, 0);

    course && course.quiz
      ? setOriginalQuizProperties(course.quiz.properties as BuildQuizProperties)
      : setOriginalQuizProperties((null as unknown) as BuildQuizProperties);
  }, [courseId]);

  useEffect(() => {
    getCourseOutline();
  }, [courseId, getCourseOutline]);

  const onPassmarkChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(parseInt(value)) && reg.test(value)) || value === '' || value === '-') {
      setQuizPassmark(
        value === '' || value === '-' ? 0 : parseInt(value) > 100 ? 100 : parseInt(value),
      );
    }
  };

  useEffect(() => {
    if (originalQuizProperties) {
      const {
        passmark,
        randAnswers,
        randQuestions,
        forceCourseCompletion,
        showSummary,
      } = originalQuizProperties;

      setQuizProperties(originalQuizProperties);
      setQuizPassmark(passmark);
      setIsRandQuestions(randQuestions);
      setIsRandAnswers(randAnswers);
      setIsForceCourseCompletion(forceCourseCompletion);
      setIsShowSummary(showSummary);
    }
  }, [originalQuizProperties]);

  return (
    <div className={classes['quiz-settings-form']}>
      {quizProperties && (
        <div className={cc([classes['form-group'], classes['passmark']])}>
          <span className={classes['form-group-title']}>Passmark</span>
          <label htmlFor="passmark">What is the passmark for your quiz?</label>
          <WMInput
            id="passmark"
            className={classes['passmark']}
            value={quizPassmark}
            onChange={onPassmarkChange}
          />{' '}
          %
        </div>
      )}
    </div>
  );
}
