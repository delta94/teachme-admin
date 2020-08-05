export * from './panels';

export type CourseMetadata = {
  id: number;
  title: string;
  publishStatus: PublishStatus;
  segments: Array<string>;
};

export enum PublishStatus {
  Published,
  Draft,
  Archived,
  Modified,
  Deleted,
}
