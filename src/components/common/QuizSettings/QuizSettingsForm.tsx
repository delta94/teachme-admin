import React, { ReactElement, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';
import { BuildQuizProperties } from '@walkme/types';

import { getCourse } from '../../../walkme';

import WMInput from '../WMInput';
import FormGroup from '../FormGroup';
import WMSwitch from '../WMSwitch';

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
        <>
          <FormGroup
            className={classes['passmark']}
            title="Passmark"
            label="What is the passmark for your quiz?"
            labelHtmlFor="passmark"
          >
            <WMInput
              id="passmark"
              className={classes['passmark-field']}
              value={quizPassmark}
              onChange={onPassmarkChange}
            />
            {'%'}
          </FormGroup>
          <Divider />
          <FormGroup className={classes['passmark']} title="Minimal course progress limitations">
            <WMSwitch
              defaultChecked={isForceCourseCompletion}
              label="Enable quiz after all course work is completed"
            />
          </FormGroup>
        </>
      )}
    </div>
  );
}
