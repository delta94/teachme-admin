import React, { ReactElement, useState, ReactNode, ChangeEvent, useEffect } from 'react';
import cc from 'classcat';
import { DownOutlined } from '@ant-design/icons';
import _isEqual from 'lodash/isEqual';

import { isNumericValue, getValidRangeNumber, fieldErrorMessage } from '../../../../utils';

import FormGroup from '../../../common/FormGroup';
import TextCounterInput from '../../../common/TextCounterInput';
import { WMVerticalRadioGroup } from '../../../common/WMRadio';
import WMInput from '../../../common/WMInput';
import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

import { ResourceOpenType, IResourceBaseData } from './interface';
import { resourceOpenOptions, sizeUnitOptions } from './utils';

import classes from './style.module.scss';

export interface INewResourceBaseForm {
  children?: ReactNode;
  onDataChange?: (data: IResourceBaseData) => void;
  initialNewResource: IResourceBaseData;
}

export default function NewResourceBaseForm({
  onDataChange,
  initialNewResource,
}: INewResourceBaseForm): ReactElement {
  const [resourceData, setResourceData] = useState<IResourceBaseData>(initialNewResource);
  const { title, url, openTarget, lightbox } = resourceData;

  const onResourceDataChange = (updated: Partial<IResourceBaseData>) =>
    setResourceData((prev: IResourceBaseData) => ({
      ...prev,
      ...updated,
    }));

  const onLightboxSizeChange = (event: ChangeEvent<HTMLInputElement>, type: 'width' | 'height') => {
    const { value } = event.target;

    if (isNumericValue(value)) {
      setResourceData((prev: IResourceBaseData) => ({
        ...prev,
        lightbox: {
          ...prev.lightbox,
          size: { ...prev.lightbox.size, [type]: getValidRangeNumber(value) },
        },
      }));
    }
  };

  const onLightboxUnitChange = (selected: IWMDropdownOption) =>
    setResourceData((prev: IResourceBaseData) => ({
      ...prev,
      lightbox: {
        ...prev.lightbox,
        unit: selected,
      },
    }));

  useEffect(() => {
    if (onDataChange && !_isEqual(initialNewResource, resourceData)) {
      onDataChange(resourceData);
    }
  }, [resourceData, initialNewResource, onDataChange]);

  return (
    <>
      <TextCounterInput
        counterClassName={classes['resource-field']}
        maxLength={80}
        placeholder="Read this"
        label="Name"
        value={title}
        errorMessage={fieldErrorMessage(title)}
        onChange={(e) => {
          onResourceDataChange({ title: e.target.value });
        }}
      />
      <TextCounterInput
        counterClassName={classes['resource-field']}
        maxLength={80}
        placeholder="http://"
        label="URL"
        value={url}
        errorMessage={fieldErrorMessage(url)}
        onChange={(e) => {
          onResourceDataChange({ url: e.target.value });
        }}
      />
      <FormGroup
        className={cc([classes['resource-field'], classes['resource-open-options']])}
        title="Open in"
      >
        <WMVerticalRadioGroup
          options={resourceOpenOptions}
          onChange={(e: any) => onResourceDataChange({ openTarget: e.target.value })}
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
          onChange={(e) => onLightboxSizeChange(e, 'width')}
        />
        <WMDropdown
          options={sizeUnitOptions}
          selected={lightbox.unit}
          onSelectedChange={onLightboxUnitChange}
        >
          <WMButton className={classes['unit-size-field']}>
            {lightbox.unit.value}
            <DownOutlined />
          </WMButton>
        </WMDropdown>
        <span className="">Height</span>
        <WMInput
          id="lightbox-height"
          className={classes['lightbox-field']}
          value={lightbox.size.height}
          onChange={(e) => onLightboxSizeChange(e, 'height')}
        />
        {lightbox.unit.value}
      </div>
    </>
  );
}
