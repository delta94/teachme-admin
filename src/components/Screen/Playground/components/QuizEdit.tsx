import React, { ReactElement, useState, useEffect } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';
import { QuizScreen, BaseQuizQuestion } from '@walkme/types';
import CourseOutlineQuiz from '../../../common/lists/CourseOutlineQuiz';
import { BuildQuizScreen } from '../../../../walkme/data/courseBuild/quiz/screen';

import {
  useCourseEditorContext,
  fetchItemsList,
  fetchCourse,
  fetchNewCourse,
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
  const [mockState, setMockState] = useState(new Date());
  const forceRerender = () => setMockState(new Date());
  const [quizScreenType, setQuizScreenType] = useState<QuizScreenType>(
    QuizScreenType.WelcomeScreen,
  );
  const [quizScreenData, setQuizScreenData] = useState<QuizScreen | BaseQuizQuestion>();

  useEffect(() => {
    fetchItemsList(dispatch);

    if (courseId) {
      fetchCourse(dispatch, courseId);
    } else {
      fetchNewCourse(dispatch);
    }

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

      // TODO: use provider to update the data
      forceRerender();
    }
  };

  return (
    <div className={classes['cards-wrapper']}>
      <WMCard className={cc([classes['buttons'], classes['grow']])}>
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1284870)}>
          Quiz Outline - courseId 1284870
        </WMButton>
        <Divider />
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1297234)}>
          Quiz Outline - courseId 1297234
        </WMButton>
        <Divider />
        <WMButton variant={ButtonVariantEnum.Primary} onClick={() => setCourseId(1277328)}>
          Quiz Outline - courseId 1277328
        </WMButton>
        <Divider />
      </WMCard>
      <div className={classes['outline-demo']}>
        {course?.quiz && (
          <CourseOutlineQuiz
            item={course?.quiz}
            forceRerender={forceRerender}
            quizItemClicked={({ type, data }) => {
              setQuizScreenType(type);
              setQuizScreenData(data);
            }}
          />
        )}
      </div>
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
