import React, { ReactElement } from 'react';
import { QuestionType, QuizAnswer } from '@walkme/types';

import { useCourseEditorContext, ActionType } from '../../../../providers/CourseEditorContext';

import TextCounterInput from '../../../common/TextCounterInput';
import WMCheckbox from '../../../common/WMCheckbox';
import WMRadio from '../../../common/WMRadio';
import WMButton from '../../../common/WMButton';
import Icon, { IconType } from '../../../common/Icon';

import { fieldErrorMessage } from './utils';

import classes from './style.module.scss';

export default function Answers({
  answers,
  type,
  onRemoveAnswer,
}: {
  answers: QuizAnswer[];
  type: QuestionType;
  onRemoveAnswer: (answerIndex: number) => void;
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
        <WMButton className={classes['delete-button']} onClick={() => onRemoveAnswer(index)}>
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
    </div>
  );
}
