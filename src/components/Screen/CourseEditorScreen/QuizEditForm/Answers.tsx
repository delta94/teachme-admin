import React, { ReactElement } from 'react';
import { QuestionType, QuizAnswer } from '@walkme/types';

import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';
import { fieldErrorMessage } from '../../../../utils';

import TextCounterInput from '../../../common/TextCounterInput';
import WMCheckbox from '../../../common/WMCheckbox';
import WMRadio from '../../../common/WMRadio';
import WMButton from '../../../common/WMButton';
import Icon, { IconType } from '../../../common/Icon';

import classes from './style.module.scss';

export default function Answers({
  answers,
  type,
  errorMessage,
  onDeleteAnswer,
}: {
  answers: QuizAnswer[];
  type: QuestionType;
  errorMessage?: string;
  onDeleteAnswer: (answerIndex: number) => void;
}): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

  const AnswerField = ({ answer, index }: { answer: QuizAnswer; index: number }) => (
    <div className={classes['answer-container']}>
      <TextCounterInput
        counterClassName={classes['answer-field']}
        maxLength={200}
        placeholder="Text"
        value={answer.text}
        errorMessage={fieldErrorMessage(answer.text)}
        onBlur={(e) => {
          answer.text = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
        }}
      />
      {Boolean(answers.length > 2) && (
        <WMButton className={classes['delete-button']} onClick={() => onDeleteAnswer(index)}>
          <Icon type={IconType.Delete} />
        </WMButton>
      )}
    </div>
  );

  return (
    <div className={classes['answers-creator']}>
      <p>Answers:</p>
      {answers.map((answer: QuizAnswer, index: number) =>
        type === QuestionType.Single ? (
          <WMRadio
            className={classes['single-select-field']}
            key={`answer-${answer.id}`}
            value={answer.id}
            checked={answer.isCorrect}
            label={<AnswerField answer={answer} index={index} />}
            onChange={(e) => {
              answer.isCorrect = e.target.checked;
              dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
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
              dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
            }}
          >
            <AnswerField answer={answer} index={index} />
          </WMCheckbox>
        ),
      )}
      {errorMessage && <span className={classes['error-message']}>{errorMessage}</span>}
    </div>
  );
}
