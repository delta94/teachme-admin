import React, { ReactElement, useState, ChangeEvent } from 'react';
import { Input } from 'antd';
import cc from 'classcat';

import Icon, { IconType } from '../../Icon';

import classes from './style.module.scss';

export interface ISearchFilter {
  className?: string;
  placeholder?: string;
  value?: string;
  onSearch: (searchValue: string) => void;
}

export default function SearchFilter({
  className,
  placeholder,
  value,
  onSearch,
}: ISearchFilter): ReactElement {
  const [searchValue, setSearchValue] = useState(value ?? '');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Input
      prefix={<Icon type={IconType.Search} />}
      className={cc([classes['search-filter'], className])}
      placeholder={placeholder}
      value={searchValue}
      onChange={onChange}
    />
  );
}
