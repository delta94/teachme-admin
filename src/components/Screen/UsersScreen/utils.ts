import { UsersColumn } from '../../../walkme/models';
import { IWMDropdownOption } from '../../common/WMDropdown';

export const sortByOptions = {
  id: UsersColumn.ID,
  title: UsersColumn.COURSE_ID,
  started_date: UsersColumn.STARTED_DATE,
  completed_date: UsersColumn.COMPLETED_DATE,
  time_to_complete: UsersColumn.TIME_TO_COMPLETE,
  quiz_result: UsersColumn.QUIZ_RESULT,
  quiz_attempts: UsersColumn.QUIZ_ATTEMPTS,
};

export const courses: IWMDropdownOption[] = [
  { id: 0, value: 'All Courses' },
  { id: 1, value: 'Course 1' },
  { id: 2, value: 'Course 2' },
  { id: 3, value: 'Course 3' },
  { id: 4, value: 'Course 4' },
  { id: 5, value: 'Course 5' },
];

export const statuses: IWMDropdownOption[] = [
  { id: 0, value: 'All' },
  { id: 1, value: 'Completed' },
  { id: 2, value: 'Did not complete' },
];

export const results: IWMDropdownOption[] = [
  { id: 0, value: 'All Results' },
  { id: 1, value: 'Passed' },
  { id: 2, value: 'Failed' },
  { id: 3, value: 'Did not submit' },
  { id: 4, value: 'No quiz' },
];
