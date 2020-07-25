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
  handleDataChanged,
}: {
  data: any;
  handleDataChanged: (updatedData: any) => void;
}): ReactElement {
  const [question, setQuestion] = useState(data);
  const onDataChanged = (updatedData: any) => handleDataChanged({ ...question, ...updatedData });

  useEffect(() => {
    if (data.id !== question.id) {
      console.log('QuestionScreenForm data ', data);
      setQuestion(data);
    }
  }, [data, data.id, question.id]);

  return (
    <div className={classes['quiz-question-screen-form']}>
      {/* TODO: make it match to correct data */}
      <FormGroup className={classes['question-type']} label="Question Type:">
        <WMDropdown
          options={questionTypes}
          selected={questionTypes[0]}
          onSelectedChange={(selected) => console.log('onSelectedChange selected ', selected)}
        >
          <WMButton className={classes['dropdown-menu-button']}>
            {questionTypes[0].value}
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
          console.log('title changed ', e.target.value);
          onDataChanged({ title: e.target.value });
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
          console.log('description changed ', e.target.value);
          // onDataChanged({ description: e.target.value });
        }}
      />
    </div>
  );
}
