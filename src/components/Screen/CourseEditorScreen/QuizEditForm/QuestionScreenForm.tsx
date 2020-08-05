import React, { ReactElement, useState, useEffect } from 'react';
import { QuestionType } from '@walkme/types';
import { DownOutlined } from '@ant-design/icons';

import { QuizQuestion } from '../../../../walkme/data/courseBuild/quiz/question';
import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';

import TextCounterInput from '../../../common/TextCounterInput';

import TextCounterTextarea from '../../../common/TextCounterTextarea';
import FormGroup from '../../../common/FormGroup';
import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';
import { AddButton } from '../../../common/buttons';
import WMSwitch from '../../../common/WMSwitch';

import Answers from './Answers';

import classes from './style.module.scss';
import { fieldErrorMessage } from './utils';

const questionTypes: IWMDropdownOption[] = [
  { id: QuestionType.Single, value: 'Single Selection' },
  { id: QuestionType.Multiple, value: 'Multiple Selection' },
];

export default function QuestionScreenForm({ question }: { question: QuizQuestion }): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

  const [selectedQuestionType, setSelectedQuestionType] = useState(
    questionTypes[question.type as QuestionType],
  );

  useEffect(() => {
    setSelectedQuestionType(questionTypes[question.type]);
  }, [question.type]);

  return (
    <div className={classes['question-screen-form']}>
      <FormGroup className={classes['question-type']} label="Question Type:">
        <WMDropdown
          options={questionTypes}
          selected={selectedQuestionType}
          onSelectedChange={(selected: IWMDropdownOption) => {
            question.type = selected.id as QuestionType;
            dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
          }}
        >
          <WMButton className={classes['dropdown-menu-button']}>
            {selectedQuestionType.value}
            <DownOutlined />
          </WMButton>
        </WMDropdown>
      </FormGroup>
      <TextCounterInput
        maxLength={80}
        placeholder="Text"
        label="Title"
        value={question.title}
        errorMessage={fieldErrorMessage(question.title)}
        onChange={(e) => {
          question.title = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
        }}
      />
      <TextCounterTextarea
        maxLength={210}
        placeholder="Text"
        label="Description (Optional)"
        value={question.description}
        minRows={3}
        maxRows={5}
        onChange={(e) => {
          question.description = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
        }}
      />
      <Answers
        answers={question.answers.toArray()}
        type={selectedQuestionType.id as QuestionType}
        onDeleteAnswer={(answerIndex) => {
          const answerToDelete = question.answers.getItem(answerIndex);
          question.answers.removeItem(answerToDelete);
          dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
        }}
        errorMessage={
          !question.isSelectionValid() ? 'You must select at least 1 correct answer' : undefined
        }
      />
      <AddButton
        className={classes['add-answer']}
        onClick={() => {
          question.answers.addNewItem();
          dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
        }}
      />
      <FormGroup className={classes['explanation']}>
        <WMSwitch
          className={classes['switch-field']}
          checked={question.properties?.hasExplanation}
          label="Explain answer (after quiz)"
          onChange={(checked: boolean) => {
            if (question.properties) {
              question.properties.hasExplanation = checked;
              dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
            }
          }}
        />
        <TextCounterInput
          counterClassName={classes['explanation-field']}
          maxLength={200}
          placeholder="Text"
          disabled={!question.properties?.hasExplanation}
          value={question.explanation ? question.explanation : ''}
          onChange={(e) => {
            question.explanation = e.target.value;
            dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
          }}
        />
      </FormGroup>
    </div>
  );
}
