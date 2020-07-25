import React, { ReactElement, useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';

import TextCounter from '../../common/TextCounterInput';

import TextCounterTextarea from '../TextCounterTextarea';
import FormGroup from '../FormGroup';
import WMDropdown, { IWMDropdownOption } from '../WMDropdown';
import WMButton from '../WMButton';

import classes from './style.module.scss';

const questionTypes: IWMDropdownOption[] = [
  { id: 0, value: 'Single Selection' },
  { id: 1, value: 'Multiple Selection' },
];

export default function QuestionScreenForm({
  data,
  handleDataChange,
}: {
  data: any;
  handleDataChange: (updatedData: any) => void;
}): ReactElement {
  const [question, setQuestion] = useState(data);
  const [selectedQuestionType, setSelectedQuestionType] = useState(questionTypes[data.type]);

  const onDataChange = (updatedData: any) => {
    handleDataChange({ ...question, ...updatedData });

    setQuestion((prev: any) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const onQuestionTypeChange = (selected: IWMDropdownOption) => {
    onDataChange({ type: selected.id });
    setSelectedQuestionType(selected);
  };

  useEffect(() => {
    if (data.id !== question.id) {
      setQuestion(data);
      setSelectedQuestionType(questionTypes[data.type]);
    }
  }, [data, question.id]);

  return (
    <div className={classes['quiz-question-screen-form']}>
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
      <TextCounter
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
    </div>
  );
}
