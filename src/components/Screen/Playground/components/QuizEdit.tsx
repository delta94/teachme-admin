import React, { ReactElement, useState, useCallback, useEffect } from 'react';
import { Divider } from 'antd';
import cc from 'classcat';
import {
  Quiz,
  QuizScreen,
  BaseQuiz,
  QuizQuestion,
  BuildQuiz,
  BuildQuizQuestion,
  BaseQuizQuestion,
} from '@walkme/types';

import { getCourse } from '../../../../walkme';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import WMCard from '../../../common/WMCard';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon, { IconType } from '../../../common/Icon';
import QuizEditForm from '../../../common/QuizEditForm';

import classes from './playground.module.scss';

export default function QuizEdit(): ReactElement {
  const [courseId, setCourseId] = useState(0);
  const [quizData, setQuizData] = useState<BuildQuiz | undefined>();
  const [quizQuestions, setQuizQuestions] = useState(([] as unknown) as BuildQuizQuestion[]);

  const [quizPropertyData, setQuizPropertyData] = useState<QuizScreen | BaseQuizQuestion>();
  const [quizPropertyName, setQuizPropertyName] = useState<string>('');

  const getCourseOutline = useCallback(async () => {
    const course = await getCourse(courseId, 0);
    const quiz = course && course.quiz;

    console.log('getCourseOutline quiz ', quiz);
    if (quiz) {
      console.log('getCourseOutline quiz.questions.toArray() ', quiz.questions.toArray());
      setQuizQuestions(quiz.questions.toArray() as BuildQuizQuestion[]);
    }

    quiz
      ? setQuizData((quiz as unknown) as BuildQuiz | undefined)
      : setQuizData((undefined as unknown) as BuildQuiz | undefined);
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
              setQuizPropertyName('welcomeScreen');
              setQuizPropertyData(quizData.welcomeScreen);
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
                  setQuizPropertyName('question');
                  setQuizPropertyData(question);
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
              setQuizPropertyName('successScreen');
              setQuizPropertyData(quizData.successScreen);
            }}
          >
            Quiz successScreen ({courseId})
          </WMButton>
          <Divider />
          <WMButton
            variant={ButtonVariantEnum.Link}
            onClick={() => {
              setQuizPropertyName('failScreen');
              setQuizPropertyData(quizData.failScreen);
            }}
          >
            Quiz failScreen ({courseId})
          </WMButton>
        </div>
      )}
      {quizData && quizPropertyData && (
        <DetailsPanel
          title="Quiz Settings"
          titleIcon={<Icon type={IconType.QuizSettings} />}
          isOpen={Boolean(quizPropertyData)}
          onClose={() => setCourseId(0)}
        >
          <QuizEditForm
            quizData={quizData}
            quizPropertyData={quizPropertyData}
            quizPropertyName={quizPropertyName}
          />
        </DetailsPanel>
      )}
    </div>
  );
}
