import React, { ReactElement, useState, ReactNode } from 'react';
import cc from 'classcat';

import TextCounterInput from '../../../common/TextCounterInput';
import FormGroup from '../../../common/FormGroup';
import { WMVerticalRadioGroup } from '../../../common/WMRadio';
import WMInput from '../../../common/WMInput';
import { IRadioButton } from '../../../common/WMRadio/interface';

import classes from './style.module.scss';

const openInOptions = [
  {
    label: 'New Tab',
    value: 0,
  },
  {
    label: 'Lightbox',
    value: 1,
  },
];

export default function NewResourceForm({ children }: { children?: ReactNode }): ReactElement {
  const [activeOpenInOption, setActiveOpenInOption] = useState<IRadioButton>(openInOptions[0]);
  return (
    <div className={classes['resource-form']}>
      <TextCounterInput
        maxLength={80}
        placeholder="Read this"
        label="Name"
        onBlur={(e) => {
          console.log('URL onBlur e => ', e);
        }}
      />
      <TextCounterInput
        maxLength={80}
        placeholder="http://"
        label="URL"
        onBlur={(e) => {
          console.log('URL onBlur e => ', e);
        }}
      />
      <FormGroup title="Open in">
        <WMVerticalRadioGroup
          options={openInOptions}
          onChange={(e: any) => {
            console.log('Open in onchange e => ', e);
            setActiveOpenInOption(openInOptions[e.target.value]);
          }}
          value={activeOpenInOption.value}
        />
      </FormGroup>
      <div
        className={cc([
          classes['lightbox'],
          { [classes['active']]: activeOpenInOption.value === openInOptions[1].value },
        ])}
      >
        <span>Width</span>
        <WMInput
          id="lightbox-width"
          className={classes['lightbox-field']}
          value={''}
          onChange={() => {
            console.log('lightbox-width changed');
          }}
        />
        <span>Height</span>
        <WMInput
          id="lightbox-height"
          className={classes['lightbox-field']}
          value={''}
          onChange={() => {
            console.log('lightbox-height changed');
          }}
        />
      </div>
      {children}
    </div>
  );
}
