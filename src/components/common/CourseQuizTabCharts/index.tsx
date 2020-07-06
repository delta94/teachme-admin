import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import { IQuizQuestions, quizBarChartMock } from '../../../constants/mocks/quizBarChart-mock';

import WMHorizontalBarChart from '../WMHorizontalBarChart';

import classes from './style.module.scss';

export default function CourseQuizTabCharts(): ReactElement {
  return (
    <div className={classes['course-quiz-tab-charts']}>
      {quizBarChartMock.questions.map((question: IQuizQuestions, index: number) => {
        const isLast = index === quizBarChartMock.questions.length - 1;

        return (
          <div key={question.title}>
            <div className={classes['question-title']}>{question.title}</div>
            <div className={classes['question-type']}>{question.type}</div>
            <WMHorizontalBarChart bars={question.answers} totalValue={question.totalValue} />
            {!isLast && <Divider className={classes['question-divider']} />}
          </div>
        );
      })}
    </div>
  );
}
