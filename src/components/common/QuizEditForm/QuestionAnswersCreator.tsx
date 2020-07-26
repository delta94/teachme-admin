import React, { ReactElement, useState, useEffect } from 'react';
import { QuestionType } from '@walkme/types';

import { BuildQuizAnswer } from '../../../walkme/data/courseBuild/quiz/question/answers';

import TextCounterInput from '../TextCounterInput';
import WMCheckbox, { IWMCheckbox } from '../WMCheckbox';
import { IRadioButton } from '../WMVerticalRadioGroup';
import WMRadio from '../WMRadio';

import classes from './style.module.scss';

export const parseToOptions = (answers: BuildQuizAnswer[]): IRadioButton[] | IWMCheckbox[] => {
  return answers.map((answer: BuildQuizAnswer) => ({
    label: answer.text,
    value: answer.id,
  }));
};

export default function QuestionAnswersCreator({
  answers,
  type,
  onAnswersChange,
}: {
  answers: BuildQuizAnswer[];
  type: QuestionType;
  onAnswersChange: (answers: BuildQuizAnswer[]) => void;
}): ReactElement {
  const [answersOptions, setAnswersOptions] = useState(answers);

  const AnswerField = ({ answer }: { answer: BuildQuizAnswer }) => (
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

  return (
    <div className={classes['answers-creator']}>
      <p>QuestionAnswersCreator</p>
      {answersOptions.map((answer) =>
        type === QuestionType.Single ? (
          <WMRadio
            key={`answer-${answer.id}`}
            value={answer.id}
            checked={answer.isCorrect}
            label={<AnswerField answer={answer} />}
            onChange={(e) => console.log('WMRadio on change', e)}
          />
        ) : (
          <WMCheckbox
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
