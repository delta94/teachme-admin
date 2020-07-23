import React, { ReactElement, useState, useEffect } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';
import { QuizScreen, BaseQuizQuestion } from '@walkme/types';
import CourseOutlineQuiz from '../../../Screen/CourseEditorScreen/CourseOutlineQuiz';

import {
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
  ActionType,
} from '../../../../providers/CourseEditorContext';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import WMCard from '../../../common/WMCard';
import QuizEditForm, { QuizScreenType } from '../../../common/QuizEditForm';

import classes from './playground.module.scss';

export default function QuizEdit(): ReactElement {
  const [courseId, setCourseId] = useState(0);

  const [state, dispatch] = useCourseEditorContext();
  const { course } = state;
  const [quizScreenType, setQuizScreenType] = useState<QuizScreenType>(
    QuizScreenType.WelcomeScreen,
  );
  const [quizScreenData, setQuizScreenData] = useState<QuizScreen | BaseQuizQuestion>();

  useEffect(() => {
    fetchItemsList(dispatch);
    fetchCourse(dispatch, courseId);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId]);

  const handleScreenDataChanged = (updatedData: any): void => {
    if (course && course.quiz) {
      switch (quizScreenType) {
        case QuizScreenType.WelcomeScreen:
          course.quiz.welcomeScreen = updatedData;
          break;
        case QuizScreenType.SuccessScreen:
          course.quiz.successScreen = updatedData;
          break;
        case QuizScreenType.FailScreen:
          course.quiz.failScreen = updatedData;
          break;
        default:
          throw new Error(`Unknown quiz screen type ${quizScreenType}`);
      }

      dispatch({ type: ActionType.UpdateCourseOutline });
    }
  };

  return (
    <div className={classes['cards-wrapper']}>
      {course?.quiz && (
        <div className={classes['outline-demo']}>
          <CourseOutlineQuiz
            item={course?.quiz}
            quizItemClicked={({ type, data }) => {
              setQuizScreenType(type);
              setQuizScreenData(data);
            }}
          />
        </div>
      )}
      {course?.quiz && Boolean(quizScreenType) && quizScreenData && (
        <QuizEditForm
          quizScreenData={quizScreenData}
          quizScreenType={quizScreenType}
          onClose={() => setQuizScreenData((undefined as unknown) as QuizScreen | BaseQuizQuestion)}
          handleDataChanged={(updatedData) => {
            console.log('updatedData ', updatedData);
            handleScreenDataChanged(updatedData);
          }}
        />
      )}
    </div>
  );
}
