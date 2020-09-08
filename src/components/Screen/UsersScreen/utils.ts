import { UsersColumn } from '../../../walkme/models';
import { IWMSelectOption } from '../../common/WMSelect';

export const sortByOptions = {
  id: UsersColumn.ID,
  title: UsersColumn.COURSE_NAME,
  started_date: UsersColumn.STARTED_DATE,
  completed_date: UsersColumn.COMPLETED_DATE,
  time_to_complete: UsersColumn.TIME_TO_COMPLETE,
  quiz_result: UsersColumn.QUIZ_RESULT,
  quiz_attempts: UsersColumn.QUIZ_ATTEMPTS,
};

export const completedOptions: IWMSelectOption[] = [
  { label: 'All', value: -1 },
  { label: 'Completed', value: true },
  { label: 'Not completed', value: false },
];

export const resultsOptions: IWMSelectOption[] = [
  { label: 'All', value: -1 },
  { label: 'Passed', value: true },
  { label: 'Not Passed', value: false },
];
