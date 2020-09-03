import moment from 'moment';

import { CompletionGraphStats } from '../../../walkme/models';

import { isNaturalNumber } from '../../../utils';
import { IBar } from '../charts/PieBarChart/pieBarChart.interface';

import { ICourseSummaryLegendData } from './analytics.interface';

export const fixedNumber = (value: number): number | string =>
  isNaturalNumber(value) ? value : value.toFixed(2);

export const calculatePercentages = (first: number, second: number): number | undefined =>
  Boolean(first) && Boolean(second) ? parseInt(((first / second) * 100).toFixed(2)) : undefined;

export const calculateFixedPercentages = (first: number, second: number): number | undefined => {
  if (Boolean(first) && Boolean(second)) {
    const value = (first / second) * 100;

    return +fixedNumber(value);
  } else {
    return undefined;
  }
};

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

export const parseBucketsToPieBarSummary = (buckets: any[]): IBar[] =>
  buckets.map(({ users_percentages, from, to }) => ({
    value: users_percentages.toFixed(2),
    legend: to ? `${parseInt(from, 10) + parseInt(to, 10)}` : '12', // TODO: verify with Eli if is correct data
  }));
