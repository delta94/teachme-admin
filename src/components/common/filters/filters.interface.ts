export enum TimeOption {
  Yesterday = 'Yesterday',
  LastWeek = 'Last Week',
  LastMonth = 'Last Month',
  LastThreeMonth = 'Last three Month',
  Last7Days = 'Last 7 Days',
  Last30Days = 'Last 30 Days',
  Last90Days = 'Last 90 Days',
  Custom = 'Custom Dates',
}

export interface ITimeFilterOptions {
  id: TimeOption;
  dates?: {
    start?: Date;
    end?: Date;
  };
}
