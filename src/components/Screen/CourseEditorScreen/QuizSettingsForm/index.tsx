import React, { ReactElement, ChangeEvent } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';
import { BuildQuizProperties } from '@walkme/types';

import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';

import WMInput from '../../../common/WMInput';
import FormGroup from '../../../common/FormGroup';
import WMSwitch from '../../../common/WMSwitch';

import classes from './style.module.scss';

export default function QuizSettingsForm({ courseId }: { courseId: number }): ReactElement {
  const [state, dispatch] = useCourseEditorContext();
  const { course } = state;

  const updateQuizProperties = (updatedData: Partial<BuildQuizProperties>) => {
    if (course?.quiz?.properties) {
      course.quiz.properties = { ...course.quiz.properties, ...updatedData };
      dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
    }
  };

  const onPassmarkChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(parseInt(value)) && reg.test(value)) || value === '' || value === '-') {
      const quizPassmark =
        value === '' || value === '-' ? 0 : parseInt(value) > 100 ? 100 : parseInt(value);

      if (course?.quiz) {
        course.quiz.properties = { ...course.quiz.properties, ...{ passmark: quizPassmark } };
        dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
      }
    }
  };

  return (
    <div className={classes['quiz-settings-form']}>
      {course?.quiz?.properties && (
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
              value={course?.quiz?.properties.passmark}
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
              className={classes['switch-field']}
              checked={course?.quiz?.properties.forceCourseCompletion}
              label="Enable quiz after all course work is completed"
              onChange={(checked: boolean) =>
                updateQuizProperties({ forceCourseCompletion: checked })
              }
            />
          </FormGroup>
          <Divider />
          <FormGroup className={classes['random-questions']} title="Randomize">
            <WMSwitch
              className={cc([classes['switch-field'], classes['space-bottom']])}
              checked={course?.quiz?.properties.randQuestions}
              label="Randomize questions order"
              infoText="Toggling this option on will randomize the questions in the quiz for every quiz attempt."
              onChange={(checked: boolean) => updateQuizProperties({ randQuestions: checked })}
            />
          </FormGroup>
          <FormGroup className={classes['random-answers']}>
            <WMSwitch
              className={classes['switch-field']}
              checked={course?.quiz?.properties.randAnswers}
              label="Randomize answers order"
              infoText="Toggling this option on will randomize the answers of each question in the quiz for every quiz attempt."
              onChange={(checked: boolean) => updateQuizProperties({ randAnswers: checked })}
            />
          </FormGroup>
          <Divider />
          <FormGroup className={classes['show-summary']} title="Full quiz results view">
            <WMSwitch
              className={classes['switch-field']}
              checked={course?.quiz?.properties.showSummary}
              label="Toggle on to allow users to view the correct answers and compare them to the answers they selected"
              onChange={(checked: boolean) => updateQuizProperties({ showSummary: checked })}
            />
          </FormGroup>
        </>
      )}
    </div>
  );
}
