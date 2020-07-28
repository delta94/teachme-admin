import moment from 'moment';

import { CompletionGraphStats } from '../../../walkme/models';

import { IBar } from '../charts/PieBarChart/pieBarChart.interface';

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
  start_percentages: calculatePercentages(total_completion.start_users, total_users_accessed),
  completed_percentages: calculatePercentages(
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

export const convertPercentagesToPieBar = (percentages: number): number => percentages * 10; // convert percentages to PieBarSummary proper value

export const parseBucketsToPieBarSummary = (buckets: any[]): IBar[] =>
  buckets.map((bucket: any) => ({
    value: convertPercentagesToPieBar(bucket.users_percentages),
    legend: `${bucket.from}-${bucket.to}`,
  }));
