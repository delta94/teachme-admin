import moment from 'moment';

import { CompletionGraphStats } from '../../../walkme/models';
import { isNaturalNumber } from '../../../utils';

import { IBar } from '../charts/PieBarChart/pieBarChart.interface';

import { ICourseSummaryLegendData } from './analytics.interface';

export const calculatePercentages = (first: number, second: number): number | undefined =>
  Boolean(first) && Boolean(second) ? parseInt(((first / second) * 100).toFixed(2)) : undefined;

/**
 * fixedNumber
 * prevents display of 0 after the decimal point if it's a natural number
 */
export const fixedNumber = (value: number): string => {
  const converted = +value.toFixed(2);
  return isNaturalNumber(converted) ? converted.toString() : converted.toFixed(2);
};

/**
 * calculateFixedPercentages
 * should return natural number or fixed number as string
 */
export const calculateFixedPercentages = (first: number, second: number): string | undefined =>
  Boolean(first) && Boolean(second) ? fixedNumber((first / second) * 100) : undefined;

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
