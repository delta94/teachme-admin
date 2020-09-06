import React, { ReactElement, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { QuizScreen } from '@walkme/types';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';
import { useAppContext } from '../../../../providers/AppContext';
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
  const [{ course }, dispatch] = useCourseEditorContext();
  const [{ environment }] = useAppContext();
  const [courseId] = useState(0);
  const history = useHistory();

  const [quizScreenType] = useState<QuizScreenType>(QuizScreenType.WelcomeScreen);
  const [quizScreenData] = useState<QuizScreen | QuizQuestion>();

  useEffect(() => {
    fetchItemsList(dispatch, environment.id);
    fetchCourse(dispatch, courseId, environment.id, history);

    return () => dispatch({ type: ActionType.ResetCourseEditor });
  }, [dispatch, courseId, environment.id, history]);

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
