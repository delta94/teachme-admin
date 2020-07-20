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

  const updateQuizProperties = (updatedData: Partial<BuildQuizProperties>) => {
    setQuizProperties((prevState: BuildQuizProperties) => ({
      ...prevState,
      ...updatedData,
    }));
  };

  const onPassmarkChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(parseInt(value)) && reg.test(value)) || value === '' || value === '-') {
      const quizPassmark =
        value === '' || value === '-' ? 0 : parseInt(value) > 100 ? 100 : parseInt(value);

      updateQuizProperties({ passmark: quizPassmark });
    }
  };

  useEffect(() => {
    if (originalQuizProperties) setQuizProperties(originalQuizProperties);
  }, [originalQuizProperties]);

  useEffect(() => {
    if (
      quizProperties &&
      JSON.stringify(originalQuizProperties) !== JSON.stringify(quizProperties)
    ) {
      // TODO: here we should call to dispatch to update course quiz
      console.log('*** quizProperties changed ', quizProperties);
    }
  }, [quizProperties, originalQuizProperties]);

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
              value={quizProperties.passmark}
              onChange={onPassmarkChange}
            />
            {'%'}
          </FormGroup>
          <Divider />
          <FormGroup
            className={classes['force-course-completion']}
            title="Minimal course progress limitations"
          >
            <WMSwitch
              checked={quizProperties.forceCourseCompletion}
              label="Enable quiz after all course work is completed"
              onChange={(checked: boolean) =>
                updateQuizProperties({ forceCourseCompletion: checked })
              }
            />
          </FormGroup>
          <Divider />
          <FormGroup className={classes['random-questions']} title="Randomize">
            <WMSwitch
              checked={quizProperties.randQuestions}
              label="Randomize questions order"
              infoText="Toggling this option on will randomize the questions in the quiz for every quiz attempt."
              onChange={(checked: boolean) => updateQuizProperties({ randQuestions: checked })}
            />
          </FormGroup>
          <FormGroup className={classes['random-answers']}>
            <WMSwitch
              checked={quizProperties.randAnswers}
              label="Randomize answers order"
              infoText="Toggling this option on will randomize the answers of each question in the quiz for every quiz attempt."
              onChange={(checked: boolean) => updateQuizProperties({ randAnswers: checked })}
            />
          </FormGroup>
          <Divider />
          <FormGroup className={classes['show-summary']} title="Full quiz results view">
            <WMSwitch
              checked={quizProperties.showSummary}
              label="Toggle on to allow users to view the correct answers and compare them to the answers they selected"
              onChange={(checked: boolean) => updateQuizProperties({ showSummary: checked })}
            />
          </FormGroup>
        </>
      )}
    </div>
  );
}
