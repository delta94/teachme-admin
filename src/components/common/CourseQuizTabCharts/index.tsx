import React, { ReactElement } from 'react';
import { Divider } from 'antd';
import { QuestionType } from '@walkme/types';

import { QuizOutlineUI, QuizOutlineUIQuestion } from '../../../walkme/models/course/quiz';

import { WMHorizontalBarChart } from '../charts';

import classes from './style.module.scss';

export default function CourseQuizTabCharts({ quiz }: { quiz: QuizOutlineUI }): ReactElement {
  /**
   * The data doesn't match to the expected data structure.
   * using the commented code and the console.log as reference.
   * TODO: remove the comments and the hard-coded values after getting a proper data
   * */

  // console.log('quiz ', quiz);

  // return (
  //   <div className={classes['course-quiz-tab-charts']}>
  //     {data.questions.map((question: IQuizQuestions, index: number) => {
  //       const isLast = index === data.questions.length - 1;

  //       return (
  //         <div key={question.title}>
  //           <div className={classes['question-title']}>{question.title}</div>
  //           <div className={classes['question-type']}>{question.type}</div>
  //           <WMHorizontalBarChart bars={question.answers} totalValue={question.totalValue} />
  //           {!isLast && <Divider className={classes['question-divider']} />}
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

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
              bars={question.answers.map(({ title, isCorrect }) => ({
                title,
                isCorrect,
                value: 0, // missing data
              }))}
              totalValue={0} // missing data
            />
            {!isLast && <Divider className={classes['question-divider']} />}
          </div>
        );
      })}
    </div>
  );
}
