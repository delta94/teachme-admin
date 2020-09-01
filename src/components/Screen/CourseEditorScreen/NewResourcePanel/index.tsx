import React, { ReactElement } from 'react';
import cc from 'classcat';

import { CourseItemType } from '../../../../interfaces/course.interfaces';

import NewResourceBaseForm from './NewResourceBaseForm';
import NewVideoForm from './NewVideoForm';
import { NewResourceType, IResourceBaseData, IResourceVideoData, INewResource } from './interface';
import { initialNewResourceBaseData, initialNewVideoData } from './utils';

import classes from './style.module.scss';

export { initialNewResourceBaseData, initialNewVideoData };

export type { IResourceBaseData, IResourceVideoData, NewResourceType, INewResource };

export default function NewResourcePanel({
  newResourceType,
  newResourceData,
  className,
}: {
  newResourceType: NewResourceType;
  newResourceData: IResourceBaseData | IResourceVideoData;
  className?: string;
}): ReactElement {
  const resource = {
    [CourseItemType.Video]: {
      content: <NewVideoForm data={newResourceData as IResourceVideoData} />,
    },
    [CourseItemType.Article]: {
      content: <NewResourceBaseForm data={newResourceData as IResourceBaseData} />,
    },
  };

  const activeResource = (newResourceType && resource[newResourceType]) ?? null;

  return <div className={cc([classes['new-resource'], className])}>{activeResource?.content}</div>;
}
