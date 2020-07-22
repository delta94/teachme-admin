import React, { ReactElement, useState } from 'react';
import {
  Quiz,
  QuizScreen,
  QuizQuestion,
  BaseQuiz,
  BuildQuiz,
  BaseQuizQuestion,
} from '@walkme/types';
import cc from 'classcat';

import classes from './style.module.scss';

export default function QuizEditForm({
  quizData,
  quizPropertyName,
  quizPropertyData,
}: {
  quizData: BuildQuiz;
  quizPropertyName: string;
  quizPropertyData: QuizScreen | BaseQuizQuestion;
}): ReactElement {
  const [originalQuiz, setOriginalQuiz] = useState<BuildQuiz>(quizData);
  const [quiz, setQuiz] = useState<QuizScreen | BaseQuizQuestion>(quizPropertyData);

  // useEffect(() => {
  //   if (originalQuiz) setQuiz(originalQuiz);
  // }, [originalQuiz]);

  // useEffect(() => {
  //   if (quiz && !propsAreEqual(originalQuiz, quiz)) {
  //     // TODO: here we should call to dispatch to update course quiz
  //     console.log('*** quiz changed ', quiz);
  //   }
  // }, [quiz, originalQuiz]);

  return (
    <div className={classes['quiz-settings-form']}>
      {quizPropertyData && <>{JSON.stringify(quizPropertyData)}</>}
    </div>
  );
}
