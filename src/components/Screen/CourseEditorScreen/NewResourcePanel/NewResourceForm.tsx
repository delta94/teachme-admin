import React, { ReactElement, useState, ReactNode, ChangeEvent, useEffect } from 'react';
import cc from 'classcat';
import { DownOutlined } from '@ant-design/icons';
import _isEqual from 'lodash/isEqual';

import { isNumericValue, getValidRangeNumber } from '../../../../utils';

import FormGroup from '../../../common/FormGroup';
import TextCounterInput from '../../../common/TextCounterInput';
import { WMVerticalRadioGroup } from '../../../common/WMRadio';
import WMInput from '../../../common/WMInput';
import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

import { ResourceOpenType, SizeUnit, IResourceData } from './interface';

import classes from './style.module.scss';

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

const initialResourceData: IResourceData = {
  title: '',
  url: '',
  openTarget: ResourceOpenType.NewTab,
  lightbox: {
    size: { width: 60, height: 60 },
    sizeUnit: sizeUnitOptions[0],
  },
};

export default function NewResourceForm({
  children,
  onDataChange,
}: {
  children?: ReactNode;
  onDataChange: (data: IResourceData) => void;
}): ReactElement {
  const [resourceData, setResourceData] = useState<IResourceData>(initialResourceData);
  const { title, url, openTarget, lightbox } = resourceData;

  const resourceDataChange = (updated: Partial<IResourceData>) =>
    setResourceData((prev: IResourceData) => ({
      ...prev,
      ...updated,
    }));

  const onUnitSize = (event: ChangeEvent<HTMLInputElement>, type: 'width' | 'height') => {
    const { value } = event.target;

    if (isNumericValue(value)) {
      setResourceData((prev: IResourceData) => ({
        ...prev,
        lightbox: {
          ...prev.lightbox,
          size: { ...prev.lightbox.size, [type]: getValidRangeNumber(value) },
        },
      }));
    }
  };

  const onSizeUnitChange = (selected: IWMDropdownOption) =>
    setResourceData((prev: IResourceData) => ({
      ...prev,
      lightbox: {
        ...prev.lightbox,
        sizeUnit: selected,
      },
    }));

  useEffect(() => {
    setResourceData(initialResourceData);
    return () => setResourceData(initialResourceData);
  }, []);

  useEffect(() => {
    if (!_isEqual(initialResourceData, resourceData)) {
      onDataChange(resourceData);
    }
  }, [resourceData, onDataChange]);

  return (
    <div className={classes['resource-form']}>
      <TextCounterInput
        counterClassName={classes['resource-field']}
        maxLength={80}
        placeholder="Read this"
        label="Name"
        value={title}
        onBlur={(e) => resourceDataChange({ title: e.target.value })}
      />
      <TextCounterInput
        counterClassName={classes['resource-field']}
        maxLength={80}
        placeholder="http://"
        label="URL"
        value={url}
        onBlur={(e) => resourceDataChange({ url: e.target.value })}
      />
      <FormGroup
        className={cc([classes['resource-field'], classes['resource-open-options']])}
        title="Open in"
      >
        <WMVerticalRadioGroup
          options={resourceOpenOptions}
          onChange={(e: any) => resourceDataChange({ openTarget: e.target.value })}
          value={openTarget}
        />
      </FormGroup>
      <div
        className={cc([
          classes['resource-field'],
          classes['lightbox'],
          { [classes['active']]: openTarget === ResourceOpenType.Lightbox },
        ])}
      >
        <span>Width</span>
        <WMInput
          id="lightbox-width"
          className={classes['lightbox-field']}
          value={lightbox.size.width}
          onChange={(e) => onUnitSize(e, 'width')}
        />
        <WMDropdown
          options={sizeUnitOptions}
          selected={lightbox.sizeUnit}
          onSelectedChange={onSizeUnitChange}
        >
          <WMButton className={classes['unit-size-field']}>
            {lightbox.sizeUnit.value}
            <DownOutlined />
          </WMButton>
        </WMDropdown>
        <span className="">Height</span>
        <WMInput
          id="lightbox-height"
          className={classes['lightbox-field']}
          value={lightbox.size.height}
          onChange={(e) => onUnitSize(e, 'height')}
        />
        {lightbox.sizeUnit.value}
      </div>
      {children}
    </div>
  );
}
