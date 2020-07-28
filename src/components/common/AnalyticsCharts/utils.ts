import moment from 'moment';

import { CompletionGraphStats } from '../../../walkme/models';

import { ICourseSummaryLegendData } from './analytics.interface';

export const calculatePercentages = (first: number, second: number): number =>
  Boolean(first) && Boolean(second) ? parseInt(((first / second) * 100).toFixed(2)) : 0;

export const parseCourseSummaryLegendData = ({
  total_completion,
  total_users_accessed,
}: {
  total_completion: any;
  total_users_accessed: number;
}): ICourseSummaryLegendData => ({
  ...total_completion,
  startedPercentages: calculatePercentages(total_completion.start_users, total_users_accessed),
  completedPercentages: calculatePercentages(
    total_completion.completed_users,
    total_completion.start_users,
  ),
});

export const formatMarkCompletionDate = (
  mark_completion: CompletionGraphStats[],
  format: string,
): CompletionGraphStats[] =>
  mark_completion.map((item) => ({
    ...item,
    date: moment(item.date).format(format),
  }));
