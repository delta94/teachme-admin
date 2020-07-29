import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import { IQuizQuestions } from '../../../constants/mocks/quizBarChart-mock';

import { WMHorizontalBarChart } from '../charts';

import classes from './style.module.scss';

export default function CourseQuizTabCharts({ data }: { data: any }): ReactElement {
  return (
    <div className={classes['course-quiz-tab-charts']}>
      {data.questions.map((question: IQuizQuestions, index: number) => {
        const isLast = index === data.questions.length - 1;

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
