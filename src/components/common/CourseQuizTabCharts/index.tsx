import React, { ReactElement } from 'react';
import { Divider } from 'antd';
import { QuestionType } from '@walkme/types';

import { QuizOutlineUI, QuizOutlineUIQuestion } from '../../../walkme/models/course/quiz';

import { WMHorizontalBarChart } from '../charts';

import classes from './style.module.scss';

export default function CourseQuizTabCharts({ quiz }: { quiz: QuizOutlineUI }): ReactElement {
  return (
    <div className={classes['course-quiz-tab-charts']}>
      {quiz.questions.map((question: QuizOutlineUIQuestion, index: number) => {
        const isLast = index === quiz.questions.length - 1;

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
      })}
    </div>
  );
}
