import React, { ReactElement, useState, useEffect } from 'react';
import { QuestionType } from '@walkme/types';
import { DownOutlined } from '@ant-design/icons';

import { QuizQuestion } from '../../../walkme/data/courseBuild/quiz/question';
import { ActionType, useCourseEditorContext } from '../../../providers/CourseEditorContext';

import TextCounterInput from '../../common/TextCounterInput';

import TextCounterTextarea from '../TextCounterTextarea';
import FormGroup from '../FormGroup';
import WMDropdown, { IWMDropdownOption } from '../WMDropdown';
import WMButton from '../WMButton';
import { AddButton } from '../buttons';
import WMSwitch from '../WMSwitch';

import QuestionAnswersCreator from './QuestionAnswersCreator';

import classes from './style.module.scss';

const questionTypes: IWMDropdownOption[] = [
  { id: QuestionType.Single, value: 'Single Selection' },
  { id: QuestionType.Multiple, value: 'Multiple Selection' },
];

export default function QuestionScreenForm({ data }: { data: QuizQuestion }): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

  const [selectedQuestionType, setSelectedQuestionType] = useState(
    questionTypes[data.type as QuestionType],
  );

  useEffect(() => {
    setSelectedQuestionType(questionTypes[data.type]);
  }, [data.type]);

  return (
    <div className={classes['question-screen-form']}>
      <FormGroup className={classes['question-type']} label="Question Type:">
        <WMDropdown
          options={questionTypes}
          selected={selectedQuestionType}
          onSelectedChange={(selected: IWMDropdownOption) => {
            data.type = selected.id as QuestionType;
            dispatch({ type: ActionType.UpdateCourseOutline });
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
        value={data.title}
        onChange={(e) => {
          data.title = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline });
        }}
      />
      <TextCounterTextarea
        maxLength={210}
        placeholder="Text"
        label="Description (Optional)"
        value={data.description}
        minRows={3}
        maxRows={5}
        onChange={(e) => {
          data.description = e.target.value;
          dispatch({ type: ActionType.UpdateCourseOutline });
        }}
      />
      <p>Answers:</p>
      <QuestionAnswersCreator
        answers={data.answers.toArray()}
        type={selectedQuestionType.id as QuestionType}
      />
      <AddButton
        className={classes['add-answer']}
        onClick={() => {
          data.answers.addNewItem();
          dispatch({ type: ActionType.UpdateCourseOutline });
        }}
      />
      <FormGroup className={classes['explanation']}>
        <WMSwitch
          className={classes['switch-field']}
          checked={data.properties?.hasExplanation}
          label="Explain answer (after quiz)"
          onChange={(checked: boolean) => {
            if (data.properties) {
              data.properties.hasExplanation = checked;
              dispatch({ type: ActionType.UpdateCourseOutline });
            }
          }}
        />
        <TextCounterInput
          counterClassName={classes['explanation-field']}
          maxLength={200}
          placeholder="Text"
          disabled={!data.properties?.hasExplanation}
          value={data.explanation ? data.explanation : ''}
          onChange={(e) => {
            data.explanation = e.target.value;
            dispatch({ type: ActionType.UpdateCourseOutline });
          }}
        />
      </FormGroup>
    </div>
  );
}
