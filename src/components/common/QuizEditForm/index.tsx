import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { Quiz, QuizScreen, QuizQuestion } from '@walkme/types';
import cc from 'classcat';

import classes from './style.module.scss';

export default function QuizEditForm({
  quizData,
  quizPropertyData,
}: {
  quizData: Quiz;
  quizPropertyData: QuizScreen | QuizQuestion;
}): ReactElement {
  const [originalQuiz, setOriginalQuiz] = useState<Quiz>(quizData);
  const [quiz, setQuiz] = useState<QuizScreen | QuizQuestion>(quizPropertyData);

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
