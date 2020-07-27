import moment from 'moment';

export const defaultDateRange = {
  from: moment(new Date()).subtract(7, 'd').format('YYYY-MM-DD'),
  to: moment(new Date()).format('YYYY-MM-DD'),
};
