export enum Time {
  Yesterday = 'Yesterday',
  LastWeek = 'Last Week',
  LastMonth = 'Last Month',
  LastThreeMonth = 'Last three Month',
  Last7Days = 'Last 7 Days',
  Last30Days = 'Last 30 Days',
  Last90Days = 'Last 90 Days',
  Custom = 'Custom Dates',
}

export interface ITimeOptions {
  id: Time;
  dates?: {
    start?: Date;
    end?: Date;
  };
}
