import moment from 'moment';
import { IDateRange } from '../providers/CoursesContext/courses-context.interface';

export const defaultDateRange = {
  from: moment(new Date()).subtract(7, 'd').format('YYYY-MM-DD'),
  to: moment(new Date()).format('YYYY-MM-DD'),
};

export const getValidDateRange = (dateStrings: string[]): IDateRange | undefined => {
  const [fromDate, toDate] = dateStrings;

  return Boolean(fromDate) && Boolean(toDate) ? { from: fromDate, to: toDate } : undefined;
};
