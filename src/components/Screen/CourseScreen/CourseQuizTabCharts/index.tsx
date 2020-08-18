import React, { ReactElement } from 'react';
import { Divider } from 'antd';
import { QuestionType } from '@walkme/types';

import { QuizOutlineUI, QuizOutlineUIQuestion } from '../../../../walkme/models/course/quiz';

import { WMHorizontalBarChart } from '../../../common/charts';
import CourseQuizEmptyState from '../CourseQuizEmptyState';

import classes from './style.module.scss';

export default function CourseQuizTabCharts({
  quiz: { questions },
}: {
  quiz: QuizOutlineUI;
}): ReactElement {
  return (
    <div className={classes['course-quiz-tab-charts']}>
      {questions?.length ? (
        questions.map((question: QuizOutlineUIQuestion, index: number) => {
          const isLast = index === questions.length - 1;

          return (
            <div key={question.title}>
              <div className={classes['question-title']}>{question.title}</div>
              <div className={classes['question-type']}>{`${
                QuestionType[question.type]
              } Select`}</div>
              <WMHorizontalBarChart
                bars={question.answers.map(({ title, isCorrect, countAnswers }) => ({
                  title,
                  isCorrect,
                  value: countAnswers,
                }))}
                totalValue={100}
                totalResponses={question.total_responses}
              />
              {!isLast && <Divider className={classes['question-divider']} />}
            </div>
          );
        })
      ) : (
        <CourseQuizEmptyState message="This Course does not have a quiz" isQuizOutlineTab />
      )}
    </div>
  );
}
