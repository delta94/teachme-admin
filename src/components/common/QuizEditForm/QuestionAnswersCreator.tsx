import React, { ReactElement } from 'react';
import { QuestionType, QuizAnswer } from '@walkme/types';

import { useCourseEditorContext, ActionType } from '../../../providers/CourseEditorContext';

import TextCounterInput from '../TextCounterInput';
import WMCheckbox from '../WMCheckbox';
import WMRadio from '../WMRadio';

import classes from './style.module.scss';

export default function QuestionAnswersCreator({
  answers,
  type,
}: {
  answers: QuizAnswer[];
  type: QuestionType;
}): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

  const AnswerField = ({ answer, index }: { answer: QuizAnswer; index: number }) => (
    <TextCounterInput
      className={classes['answer-field']}
      maxLength={200}
      placeholder="Text"
      value={answer.text}
      onBlur={(e) => {
        const val = e.target.value;
        if (val.trim() !== '') {
          answer.text = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline });
        } else {
          console.log('error this field require');
        }
      }}
    />
  );

  return (
    <div className={classes['answers-creator']}>
      {answers.map((answer, index) =>
        type === QuestionType.Single ? (
          <WMRadio
            className={classes['single-select-field']}
            key={`answer-${answer.id}`}
            value={answer.id}
            checked={answer.isCorrect}
            label={<AnswerField answer={answer} index={index} />}
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
            <AnswerField answer={answer} index={index} />
          </WMCheckbox>
        ),
      )}
    </div>
  );
}
