import React, { ReactElement } from 'react';
import { Divider } from 'antd';
import { QuestionType } from '@walkme/types';

import { IQuizQuestions } from '../../../constants/mocks/quizBarChart-mock';
import { Quiz } from '../../../walkme/data/courseBuild/quiz';

import { WMHorizontalBarChart } from '../charts';

import { QuizQuestion } from '../../../walkme/data/courseBuild/quiz/question';
import classes from './style.module.scss';

export default function CourseQuizTabCharts({
  data,
  quiz,
}: {
  data: any;
  quiz: Quiz;
}): ReactElement {
  // TODO: The data doesn't match to the expected data structure.
  console.log('quiz ', quiz);

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
      {quiz.questions.toArray().map((question: QuizQuestion, index: number) => {
        const isLast = index === data.questions.length - 1;

        return (
          <div key={question.title}>
            <div className={classes['question-title']}>{question.title}</div>
            <div className={classes['question-type']}>{`${
              QuestionType[question.type]
            } Select`}</div>
            <WMHorizontalBarChart
              bars={question.answers.toArray().map(({ text, isCorrect }) => ({
                title: text,
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
