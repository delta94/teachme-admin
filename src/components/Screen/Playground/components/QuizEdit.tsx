import React, { ReactElement, useState, useCallback, useEffect } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';
import { QuizScreen, BuildQuiz, BuildQuizQuestion, BaseQuizQuestion } from '@walkme/types';

import { getCourse } from '../../../../walkme';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import WMCard from '../../../common/WMCard';
import QuizEditForm, { QuizScreenType } from '../../../common/QuizEditForm';

import classes from './playground.module.scss';

export default function QuizEdit(): ReactElement {
  const [courseId, setCourseId] = useState(0);
  const [quizData, setQuizData] = useState<BuildQuiz | undefined>();
  const [quizQuestions, setQuizQuestions] = useState(([] as unknown) as BuildQuizQuestion[]);
  const [quizScreenData, setQuizScreenData] = useState<QuizScreen | BaseQuizQuestion>();
  const [quizScreenName, setQuizScreenName] = useState<QuizScreenType>(
    QuizScreenType.WelcomeScreen,
  );

  const getCourseOutline = useCallback(async () => {
    const course = await getCourse(courseId, 0);
    const quiz = course && course.quiz;

    if (quiz) {
      setQuizData((quiz as unknown) as BuildQuiz | undefined);
      setQuizQuestions(quiz.questions.toArray() as BuildQuizQuestion[]);
    } else {
      setQuizData((undefined as unknown) as BuildQuiz | undefined);
      setQuizQuestions(([] as unknown) as BuildQuizQuestion[]);
    }
  }, [courseId]);

  useEffect(() => {
    // TODO: use useCourseEditorContext
    getCourseOutline();
  }, [courseId, getCourseOutline]);

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
      {quizData && (
        <div className={classes['outline-demo']}>
          <WMButton
            variant={ButtonVariantEnum.Link}
            onClick={() => {
              setQuizScreenName(QuizScreenType.WelcomeScreen);
              setQuizScreenData(quizData.welcomeScreen);
            }}
          >
            Quiz WelcomeScreen ({courseId})
          </WMButton>
          <Divider />
          {quizQuestions.map((question: BaseQuizQuestion, index: number) => (
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
              setQuizScreenData(quizData.successScreen);
            }}
          >
            Quiz successScreen ({courseId})
          </WMButton>
          <Divider />
          <WMButton
            variant={ButtonVariantEnum.Link}
            onClick={() => {
              setQuizScreenName(QuizScreenType.FailScreen);
              setQuizScreenData(quizData.failScreen);
            }}
          >
            Quiz failScreen ({courseId})
          </WMButton>
        </div>
      )}
      <QuizEditForm
        quizData={quizData}
        quizScreenData={quizScreenData}
        quizScreenType={quizScreenName}
        onClose={() => setQuizScreenData((undefined as unknown) as QuizScreen | BaseQuizQuestion)}
      />
    </div>
  );
}
