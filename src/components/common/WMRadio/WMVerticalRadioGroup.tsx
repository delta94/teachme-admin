import React, { useState, useEffect, ReactElement } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Radio, Tooltip } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

import cc from 'classcat';

import { IWMRadioGroup } from './interface';

import classes from './style.module.scss';

export default function WMVerticalRadioGroup({
  onChange,
  value,
  options,
  className,
  showTooltipHelpText,
  ...otherProps
}: IWMRadioGroup): ReactElement {
  const [localValue, setLocalValue] = useState(value);

  const localOnChange = (e: RadioChangeEvent) => {
    const val = e.target.value;

    setLocalValue(val);
    onChange && onChange(e);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Radio.Group
      className={cc([classes['wm-radio-group'], className])}
      onChange={localOnChange}
      value={localValue}
      {...otherProps}
    >
      {options.map((option) => (
        <>
          <Radio className={classes['wm-radio-button']} {...option}>
            {option.label}
            {showTooltipHelpText && option.helpText && (
              <Tooltip key={option.value} title={option.helpText}>
                <InfoCircleOutlined className={classes['option-help-icon']} />
              </Tooltip>
            )}
          </Radio>
          {/* an option to render the help text below the radio button */}
          {!showTooltipHelpText && option.helpText && (
            <p className={classes['help-text']}>{option.helpText}</p>
          )}
        </>
      ))}
    </Radio.Group>
  );
}
