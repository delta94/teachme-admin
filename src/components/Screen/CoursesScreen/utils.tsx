import React from 'react';
import moment from 'moment';

import { IWMDropdownOption } from '../../common/WMDropdown';
import WMTag from '../../common/WMTag';

import classes from './style.module.scss';

export const mockDates = {
  from: moment(new Date()).subtract(3, 'months').startOf('month').format('YYYY-MM-DD'),
  to: moment(new Date()).subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
};

export const statuses: IWMDropdownOption[] = [
  { id: 0, value: 'All Status' },
  { id: 1, value: 'Published' },
  { id: 2, value: 'Modified' },
  { id: 3, value: 'Draft' },
  { id: 4, value: 'Archived' },
];

export const segments: IWMDropdownOption[] = [
  { id: 0, value: 'All Segments' },
  { id: 1, value: 'All Employees' },
  { id: 2, value: 'HR' },
  { id: 3, value: 'Sales' },
  { id: 4, value: 'Product' },
  { id: 5, value: 'R&D' },
];
