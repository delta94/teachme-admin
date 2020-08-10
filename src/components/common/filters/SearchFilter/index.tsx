import React, { ReactElement, useState, ChangeEvent } from 'react';
import { Input } from 'antd';
import cc from 'classcat';
import { useDebounceCallback } from '@react-hook/debounce';

import { useAppSkeleton } from '../../../../hooks/skeleton';

import Icon, { IconType } from '../../Icon';
import { WMSkeletonInput } from '../../WMSkeleton';

import classes from './style.module.scss';

export interface ISearchFilter {
  className?: string;
  placeholder?: string;
  value?: string;
  onSearch: (searchValue: string) => void;
  disabled?: boolean;
}

export default function SearchFilter({
  className,
  placeholder,
  value,
  onSearch,
  disabled,
}: ISearchFilter): ReactElement {
  const [searchValue, setSearchValue] = useState(value ?? '');
  const appInit = useAppSkeleton();
  const debouncedOnSearch = useDebounceCallback(onSearch, 400);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debouncedOnSearch(e.target.value);
  };

  return (
    <>
      {appInit ? (
        <Input
          prefix={<Icon type={IconType.Search} />}
          className={cc([classes['search-filter'], className])}
          placeholder={placeholder}
          value={searchValue}
          onChange={onChange}
          disabled={disabled}
        />
      ) : (
        <WMSkeletonInput className={classes['skeleton']} active size="default" />
      )}
    </>
  );
}
