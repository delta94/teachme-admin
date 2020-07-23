import React, { ReactElement, useState, useEffect } from 'react';
import { QuizScreen, BaseQuizQuestion } from '@walkme/types';

import {
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
  ActionType,
} from '../../../../providers/CourseEditorContext';

import CourseOutlineQuiz from '../../../Screen/CourseEditorScreen/CourseOutlineQuiz';
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
        />
      )}
    </div>
  );
}
