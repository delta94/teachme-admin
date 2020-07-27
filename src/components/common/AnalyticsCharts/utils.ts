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
  completedUsers: total_completion.start_users,
  completedPercentages: calculatePercentages(
    total_completion.completed_users,
    total_completion.start_users,
  ),
  startedPercentages: calculatePercentages(total_completion.start_users, total_users_accessed),
});
