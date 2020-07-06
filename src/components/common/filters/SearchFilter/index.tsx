import React, { ReactElement, useState } from 'react';
import { Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import classes from './style.module.scss';

export interface ISearchFilter {
  className?: string;
  placeholder?: string;
}

export default function SearchFilter({ placeholder }: ISearchFilter): ReactElement {
  const [value, setValue] = useState('');

  const onSearch = (e: any) => {
    setValue(e.target.value);
    message.info(`Searching ${e.target.value}`);
  };

  return (
    <Input
      className={classes['search-filter']}
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      onChange={onSearch}
      value={value}
    />
  );
}
