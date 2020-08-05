import { PublishStatus } from '../walkme/data/courseList';
import { WMTagColor } from '../components/common/WMTag';

export const publishStatusColors = {
  [PublishStatus['Published']]: WMTagColor.Green,
  [PublishStatus['Modified']]: WMTagColor.Green,
  [PublishStatus['Draft']]: WMTagColor.Orange,
  [PublishStatus['Archived']]: WMTagColor.Gray,
  undefined: WMTagColor.Gray,
};

export const publishStatusLabels = {
  [PublishStatus['Published']]: 'published',
  [PublishStatus['Modified']]: 'modified',
  [PublishStatus['Draft']]: 'draft',
  [PublishStatus['Archived']]: 'archived',
};

export const getPublishStatusLabel = (value: PublishStatus): string =>
  publishStatusLabels[value as keyof typeof publishStatusLabels];

export const getPublishStatusColor = (value: PublishStatus): string =>
  publishStatusColors[value as keyof typeof publishStatusColors];
