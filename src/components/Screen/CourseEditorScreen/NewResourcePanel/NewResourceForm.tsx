import React, { ReactElement, useState, ReactNode, ChangeEvent } from 'react';
import cc from 'classcat';
import { DownOutlined } from '@ant-design/icons';

import FormGroup from '../../../common/FormGroup';
import TextCounterInput from '../../../common/TextCounterInput';
import { WMVerticalRadioGroup } from '../../../common/WMRadio';
import WMInput from '../../../common/WMInput';
import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

import classes from './style.module.scss';

export enum ResourceOpenType {
  NewTab = 'new tab',
  Lightbox = 'lightbox',
}

export enum SizeUnit {
  Percentages = 'percentages',
  Pixels = 'pixels',
}

const resourceOpenOptions = [
  {
    label: 'New Tab',
    value: ResourceOpenType.NewTab,
  },
  {
    label: 'Lightbox',
    value: ResourceOpenType.Lightbox,
  },
];

const sizeUnitOptions: IWMDropdownOption[] = [
  { id: SizeUnit.Percentages, value: '%' },
  { id: SizeUnit.Pixels, value: 'px' },
];

const lightboxDefault = { width: 60, height: 60 };

export default function NewResourceForm({ children }: { children?: ReactNode }): ReactElement {
  const [activeOpenInOption, setActiveOpenInOption] = useState<ResourceOpenType>(
    ResourceOpenType.NewTab,
  );
  const [selectedSizeUnit, setSelectedSizeUnit] = useState<IWMDropdownOption>(sizeUnitOptions[0]);
  const [lightbox, setLightbox] = useState<{ width: number; height: number }>(lightboxDefault);

  const onUnitSize = (event: ChangeEvent<HTMLInputElement>, type: 'width' | 'height') => {
    const { value } = event.target;

    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(parseInt(value)) && reg.test(value)) || value === '' || value === '-') {
      const size =
        value === '' || value === '-' ? 0 : parseInt(value) > 100 ? 100 : parseInt(value);

      setLightbox((prev) => ({
        ...prev,
        [type]: size,
      }));
    }
  };

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
          options={resourceOpenOptions}
          onChange={(e: any) => {
            console.log('Open in onchange e => ', e);
            setActiveOpenInOption(e.target.value);
          }}
          value={activeOpenInOption}
        />
      </FormGroup>
      <div
        className={cc([
          classes['lightbox'],
          { [classes['active']]: activeOpenInOption === ResourceOpenType.Lightbox },
        ])}
      >
        <span>Width</span>
        <WMInput
          id="lightbox-width"
          className={classes['lightbox-field']}
          value={lightbox.width}
          onChange={(e) => onUnitSize(e, 'width')}
        />
        <WMDropdown
          options={sizeUnitOptions}
          selected={selectedSizeUnit}
          onSelectedChange={(selected: IWMDropdownOption) => setSelectedSizeUnit(selected)}
        >
          <WMButton className={classes['unit-size-field']}>
            {selectedSizeUnit.value}
            <DownOutlined />
          </WMButton>
        </WMDropdown>
        <span className="">Height</span>
        <WMInput
          id="lightbox-height"
          className={classes['lightbox-field']}
          value={lightbox.height}
          onChange={(e) => onUnitSize(e, 'height')}
        />
        {selectedSizeUnit.value}
      </div>
      {children}
      <footer className={classes['resource-form-footer']}>save</footer>
    </div>
  );
}
