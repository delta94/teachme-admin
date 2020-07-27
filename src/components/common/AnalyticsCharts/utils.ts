import moment from 'moment';
import { ICourseSummaryLegendData } from './analytics.interface';

export const calculatePercentages = (first: number, second: number): number =>
  parseInt(((first / second) * 100).toFixed(2));

export const parseCourseSummaryLegendData = ({
  total_completion,
  total_users_accessed,
}: {
  total_completion: any;
  total_users_accessed: number;
}): ICourseSummaryLegendData => ({
  startUsers: total_completion.start_users,
  completedUsers: total_completion.completed_users,
  startedPercentages: calculatePercentages(total_completion.start_users, total_users_accessed),
  completedPercentages: calculatePercentages(
    total_completion.completed_users,
    total_completion.start_users,
  ),
});

export const formatMarkCompletionDate = ({ mark_completion }: { mark_completion: any[] }) =>
  mark_completion.map((item) => ({
    ...item,
    date: moment(item.date).format('MM/DD'),
  }));
