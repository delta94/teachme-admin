import { UsersColumn } from '../../../walkme/models';
import { IWMSelectOption } from '../../common/WMSelect';

export const sortByOptions = {
  id: UsersColumn.ID,
  title: UsersColumn.COURSE_ID,
  started_date: UsersColumn.STARTED_DATE,
  completed_date: UsersColumn.COMPLETED_DATE,
  time_to_complete: UsersColumn.TIME_TO_COMPLETE,
  quiz_result: UsersColumn.QUIZ_RESULT,
  quiz_attempts: UsersColumn.QUIZ_ATTEMPTS,
};

export const courses: IWMSelectOption[] = [
  { label: 'All', value: 0 },
  { label: 'Course 1', value: 1 },
  { label: 'Course 2', value: 2 },
];

export const statuses: IWMSelectOption[] = [
  { label: 'All', value: 0 },
  { label: 'Completed', value: 1 },
  { label: 'Not completed', value: 2 },
];

export const results: IWMSelectOption[] = [
  { label: 'All', value: 0 },
  { label: 'Passed', value: 1 },
  { label: 'Not Passed', value: 2 },
];
