import React, { ReactElement, useState, useEffect } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';
import { QuizScreen, BaseQuizQuestion } from '@walkme/types';

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
  const [mockState, setMockState] = useState(new Date());
  const forceRerender = () => setMockState(new Date());
  const [quizScreenName, setQuizScreenName] = useState<QuizScreenType>(
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
      {course?.quiz && (
        <div className={classes['outline-demo']}>
          <WMButton
            variant={ButtonVariantEnum.Link}
            onClick={() => {
              setQuizScreenName(QuizScreenType.WelcomeScreen);
              setQuizScreenData(course?.quiz?.welcomeScreen);
            }}
          >
            Quiz WelcomeScreen ({courseId})
          </WMButton>
          <Divider />
          {course?.quiz?.questions?.toArray().map((question: BaseQuizQuestion, index: number) => (
            <div key={`question-container-${index}`} className={classes['questions']}>
              <WMButton
                variant={ButtonVariantEnum.Link}
                onClick={() => {
                  setQuizScreenName(QuizScreenType.QuestionScreen);
                  setQuizScreenData(question);
                }}
              >
                {question.title}
              </WMButton>
              <Divider />
            </div>
          ))}
          <WMButton
            variant={ButtonVariantEnum.Link}
            onClick={() => {
              setQuizScreenName(QuizScreenType.SuccessScreen);
              setQuizScreenData(course?.quiz?.successScreen);
            }}
          >
            Quiz successScreen ({courseId})
          </WMButton>
          <Divider />
          <WMButton
            variant={ButtonVariantEnum.Link}
            onClick={() => {
              setQuizScreenName(QuizScreenType.FailScreen);
              setQuizScreenData(course?.quiz?.failScreen);
            }}
          >
            Quiz failScreen ({courseId})
          </WMButton>
        </div>
      )}
      {Boolean(quizScreenName) && quizScreenData && (
        <QuizEditForm
          quizData={course?.quiz}
          quizScreenData={quizScreenData}
          quizScreenType={quizScreenName}
          onClose={() => setQuizScreenData((undefined as unknown) as QuizScreen | BaseQuizQuestion)}
        />
      )}
    </div>
  );
}
