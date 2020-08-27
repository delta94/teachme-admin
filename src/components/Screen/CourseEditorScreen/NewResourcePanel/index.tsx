import React, { ReactElement } from 'react';
import cc from 'classcat';

import { CourseItemType } from '../../../../interfaces/course.interfaces';

import NewResourceBaseForm from './NewResourceBaseForm';
import NewVideoForm from './NewVideoForm';
import { NewResourceType, IResourceBaseData, IResourceVideoData } from './interface';
import { initialNewResourceBaseData, initialNewVideoData } from './utils';

import classes from './style.module.scss';

export { initialNewResourceBaseData, initialNewVideoData };

export type { IResourceBaseData, IResourceVideoData, NewResourceType };

export default function NewResourcePanel({
  newResourceType,
  className,
}: {
  newResourceType?: NewResourceType;
  className?: string;
}): ReactElement {
  const resource = {
    [CourseItemType.Video]: {
      content: <NewVideoForm initialNewResource={initialNewVideoData} />,
    },
    [CourseItemType.Article]: {
      content: <NewResourceBaseForm initialNewResource={initialNewResourceBaseData} />,
    },
  };

  const activeResource = (newResourceType && resource[newResourceType]) ?? null;

  return <div className={cc([classes['new-resource'], className])}>{activeResource?.content}</div>;
}
