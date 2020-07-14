import React, { ReactElement } from 'react';
import { Divider } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import WMCheckbox, { WMCheckboxGroup } from '../../../common/WMCheckbox';
import Header from '../../../common/Header';

export default function Checkboxes(): ReactElement {
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };

  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];

  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
  ];

  return (
    <>
      <Header title="wm-checkbox without label" />
      <WMCheckbox />
      <WMCheckbox defaultChecked />
      <WMCheckbox defaultChecked indeterminate />
      <WMCheckbox>label</WMCheckbox>
      <WMCheckbox defaultChecked>label</WMCheckbox>
      <WMCheckbox defaultChecked indeterminate>
        label
      </WMCheckbox>

      <WMCheckbox disabled>label</WMCheckbox>
      <WMCheckbox disabled defaultChecked>
        label
      </WMCheckbox>
      <WMCheckbox disabled defaultChecked indeterminate>
        label
      </WMCheckbox>
      <Divider />
      <Header title="wm-checkbox-group" />
      <WMCheckboxGroup options={options} defaultValue={['Apple']} onChange={onChange} />
      <Divider />
      <WMCheckboxGroup
        options={optionsWithDisabled}
        defaultValue={['Pear', 'Orange']}
        onChange={onChange}
      />
      <Divider />
      <WMCheckboxGroup options={options} disabled defaultValue={['Pear']} onChange={onChange} />
      <Divider />
      <Header title="wm-checkbox-group-vertical" />
      <WMCheckboxGroup options={options} defaultValue={['Apple']} onChange={onChange} isVertical />
      <Divider />
      <WMCheckboxGroup
        options={optionsWithDisabled}
        defaultValue={['Apple']}
        onChange={onChange}
        isVertical
      />
      <Divider />
      <WMCheckboxGroup
        options={options}
        disabled
        defaultValue={['Apple']}
        onChange={onChange}
        isVertical
      />
    </>
  );
}
