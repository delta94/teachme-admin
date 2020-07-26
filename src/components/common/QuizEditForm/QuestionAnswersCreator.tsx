import React, { ReactElement, useState, useEffect } from 'react';
import { QuestionType, QuizAnswer } from '@walkme/types';

import TextCounterInput from '../TextCounterInput';
import WMCheckbox from '../WMCheckbox';
import WMRadio from '../WMRadio';

import classes from './style.module.scss';

export default function QuestionAnswersCreator({
  answers,
  type,
  onAnswersChange,
}: {
  answers: QuizAnswer[];
  type: QuestionType;
  onAnswersChange: (answers: QuizAnswer[]) => void;
}): ReactElement {
  const [answersOptions, setAnswersOptions] = useState(answers);

  const AnswerField = ({ answer }: { answer: QuizAnswer }) => (
    <TextCounterInput
      className={classes['answer-field']}
      maxLength={200}
      placeholder="Text"
      value={answer.text}
      onChange={(e) => {
        console.log('on answer text change ', e.target.value);
        // onDataChange({ title: e.target.value });
      }}
    />
  );

  useEffect(() => {
    setAnswersOptions(answers);
  }, [answers]);

  useEffect(() => {
    const isSingleAnswer = type === QuestionType.Single;
    const totalCorrectAnswers = answersOptions.filter(({ isCorrect }) => isCorrect).length;

    if (isSingleAnswer && totalCorrectAnswers > 1) {
      setAnswersOptions(
        answersOptions.map((opt, index) =>
          index === 0 ? { ...opt, isCorrect: true } : { ...opt, isCorrect: false },
        ),
      );
    }
  }, [type, answersOptions]);

  return (
    <div className={classes['answers-creator']}>
      {answersOptions.map((answer) =>
        type === QuestionType.Single ? (
          <WMRadio
            className={classes['single-select-field']}
            key={`answer-${answer.id}`}
            value={answer.id}
            checked={answer.isCorrect}
            label={<AnswerField answer={answer} />}
            onChange={(e) => console.log('WMRadio on change', e)}
          />
        ) : (
          <WMCheckbox
            className={classes['multiple-select-field']}
            key={`answer-${answer.id}`}
            value={answer.id}
            checked={answer.isCorrect}
            onChange={(e) => console.log('WMCheckbox on change', e)}
          >
            <AnswerField answer={answer} />
          </WMCheckbox>
        ),
      )}
    </div>
  );
}
