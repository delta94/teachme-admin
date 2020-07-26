import React, { ReactElement } from 'react';
import { QuestionType } from '@walkme/types';

import FormGroup from '../FormGroup';
import TextCounterInput from '../TextCounterInput';

import classes from './style.module.scss';

export default function QuestionAnswersCreator({
  answers,
  type,
  onAnswersChange,
}: {
  answers: any[];
  type: QuestionType;
  onAnswersChange: (answers: any[]) => void;
}): ReactElement {
  return (
    <div className={classes['answers-creator']}>
      <p>QuestionAnswersCreator</p>
      {answers.map((answer) => (
        <FormGroup key={`answer-${answer.id}`} className={classes['answer-group']}>
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
        </FormGroup>
      ))}
    </div>
  );
}
