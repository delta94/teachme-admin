import React, { ReactElement } from 'react';
import { QuestionType, QuizAnswer } from '@walkme/types';

import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';

import TextCounterInput from '../../../common/TextCounterInput';
import WMCheckbox from '../../../common/WMCheckbox';
import WMRadio from '../../../common/WMRadio';

import { fieldErrorMessage } from './utils';

import classes from './style.module.scss';

export default function QuestionAnswersCreator({
  answers,
  type,
}: {
  answers: QuizAnswer[];
  type: QuestionType;
}): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

  const AnswerField = ({ answer }: { answer: QuizAnswer }) => (
    <TextCounterInput
      counterClassName={classes['answer-field']}
      maxLength={200}
      placeholder="Text"
      value={answer.text}
      errorMessage={fieldErrorMessage(answer.text)}
      onBlur={(e) => {
        answer.text = e.target.value;
        dispatch({ type: ActionType.UpdateCourseOutline });
      }}
    />
  );

  return (
    <div className={classes['answers-creator']}>
      {answers.map((answer: QuizAnswer) =>
        type === QuestionType.Single ? (
          <WMRadio
            className={classes['single-select-field']}
            key={`answer-${answer.id}`}
            value={answer.id}
            checked={answer.isCorrect}
            label={<AnswerField answer={answer} />}
            onChange={(e) => {
              answer.isCorrect = e.target.checked;
              dispatch({ type: ActionType.UpdateCourseOutline });
            }}
          />
        ) : (
          <WMCheckbox
            className={classes['multiple-select-field']}
            key={`answer-${answer.id}`}
            value={answer.id}
            checked={answer.isCorrect}
            onChange={(e) => {
              answer.isCorrect = e.target.checked;
              dispatch({ type: ActionType.UpdateCourseOutline });
            }}
          >
            <AnswerField answer={answer} />
          </WMCheckbox>
        ),
      )}
    </div>
  );
}
