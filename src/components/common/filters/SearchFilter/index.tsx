import React, { ReactElement, useState, ChangeEvent } from 'react';
import { Input } from 'antd';
import cc from 'classcat';

import { useAppSkeleton } from '../../../../hooks/skeleton';

import Icon, { IconType } from '../../Icon';
import { WMSkeletonInput } from '../../WMSkeleton';

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
  const appInit = useAppSkeleton();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={classes['search-filter']}>
      {appInit ? (
        <Input
          prefix={<Icon type={IconType.Search} />}
          className={cc([classes['search-filter-input'], className])}
          placeholder={placeholder}
          value={searchValue}
          onChange={onChange}
        />
      ) : (
        <WMSkeletonInput style={{ width: 150 }} active size="default" />
      )}
    </div>
  );
}
