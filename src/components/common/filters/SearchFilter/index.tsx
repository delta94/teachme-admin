import React, { ReactElement, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import cc from 'classcat';

import classes from './style.module.scss';

export interface ISearchFilter {
  className?: string;
  placeholder?: string;
  onSearch: (searchValue: string) => void;
}

export default function SearchFilter({
  className,
  placeholder,
  onSearch,
}: ISearchFilter): ReactElement {
  const [value, setValue] = useState('');

  const onChange = (e: any) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Input
      className={cc([classes['search-filter'], className])}
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      onChange={onChange}
      value={value}
    />
  );
}
