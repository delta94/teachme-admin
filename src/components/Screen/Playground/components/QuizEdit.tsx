import React, { ReactElement, useState, useEffect } from 'react';
import { QuizScreen } from '@walkme/types';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';
import {
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
  ActionType,
} from '../../../../providers/CourseEditorContext';

import { QuizScreenType } from '../../CourseEditorScreen/QuizEditForm/interface';

import CourseOutlineQuiz from '../../../Screen/CourseEditorScreen/CourseOutlineQuiz';
import QuizEditForm from '../../CourseEditorScreen/QuizEditForm';

import classes from './playground.module.scss';

export default function QuizEdit(): ReactElement {
  const [courseId, setCourseId] = useState(0);

  const [state, dispatch] = useCourseEditorContext();
  const { course } = state;
  const [quizScreenType, setQuizScreenType] = useState<QuizScreenType>(
    QuizScreenType.WelcomeScreen,
  );
  const [quizScreenData, setQuizScreenData] = useState<QuizScreen | QuizQuestion>();

  useEffect(() => {
    fetchItemsList(dispatch);
    fetchCourse(dispatch, courseId);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId]);

  return (
    <div className={classes['cards-wrapper']}>
      {course?.quiz && (
        <div className={classes['outline-demo']}>
          <CourseOutlineQuiz
            quiz={course?.quiz}
            // quizItemClick={({ type, data }) => {
            //   setQuizScreenType(type);
            //   setQuizScreenData(data);
            // }}
          />
        </div>
      )}
      {course?.quiz && Boolean(quizScreenType) && quizScreenData && (
        <QuizEditForm quizScreenData={quizScreenData} quizScreenType={quizScreenType} />
      )}
    </div>
  );
}
