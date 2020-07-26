import React, { ReactElement, useState, useEffect } from 'react';
import { QuestionType } from '@walkme/types';
import { DownOutlined } from '@ant-design/icons';

import TextCounterInput from '../../common/TextCounterInput';

import TextCounterTextarea from '../TextCounterTextarea';
import FormGroup from '../FormGroup';
import WMDropdown, { IWMDropdownOption } from '../WMDropdown';
import WMButton from '../WMButton';

import QuestionAnswersCreator from './QuestionAnswersCreator';

import classes from './style.module.scss';

const questionTypes: IWMDropdownOption[] = [
  { id: QuestionType.Single, value: 'Single Selection' },
  { id: QuestionType.Multiple, value: 'Multiple Selection' },
];

export default function QuestionScreenForm({
  data,
  handleDataChange,
}: {
  data: any;
  handleDataChange: (updatedData: any) => void;
}): ReactElement {
  const [question, setQuestion] = useState(data);
  const [selectedQuestionType, setSelectedQuestionType] = useState(
    questionTypes[data.type as QuestionType],
  );

  const onDataChange = (updatedData: any) => {
    handleDataChange({ ...question, ...updatedData });

    setQuestion((prev: any) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const onQuestionTypeChange = (selected: IWMDropdownOption) => {
    onDataChange({ type: selected.id as QuestionType });
    setSelectedQuestionType(selected);
  };

  useEffect(() => {
    if (data.id !== question.id) {
      setQuestion(data);
      setSelectedQuestionType(questionTypes[data.type]);
    }
  }, [data, question.id]);

  console.log('question', question);
  return (
    <div className={classes['question-screen-form']}>
      {/* TODO: make it match to correct data */}
      <FormGroup className={classes['question-type']} label="Question Type:">
        <WMDropdown
          options={questionTypes}
          selected={selectedQuestionType}
          onSelectedChange={onQuestionTypeChange}
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
        onChange={(e) => {
          onDataChange({ title: e.target.value });
        }}
      />
      <TextCounterTextarea
        maxLength={210}
        placeholder="Text"
        label="Description"
        value={question.description}
        minRows={3}
        maxRows={5}
        onChange={(e) => {
          onDataChange({ description: e.target.value });
        }}
      />
      <QuestionAnswersCreator
        answers={question.answers.toArray()}
        type={selectedQuestionType.id as QuestionType}
        onAnswersChange={(updatedAnswers: any[]) => {
          console.log('onAnswersChange updatedAnswers', updatedAnswers);
        }}
      />
    </div>
  );
}
