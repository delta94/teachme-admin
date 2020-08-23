import React, { ReactElement } from 'react';

import { CourseItemType } from '../../../../interfaces/course.interfaces';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon from '../../../common/Icon';

import NewVideoForm from './NewVideoForm';
import NewArticleForm from './NewArticleForm';

import classes from './style.module.scss';

export type NewResourceType = CourseItemType.Article | CourseItemType.Video;

export default function NewResourcePanel({
  newResourceType,
  className,
  onClose,
}: {
  newResourceType?: NewResourceType;
  className: string;
  onClose: () => void;
}): ReactElement {
  const resourceIcon = newResourceType && <Icon type={newResourceType} />;

  const resource = {
    [CourseItemType.Video]: {
      id: 'Video',
      title: 'New Video',
      titleIcon: resourceIcon,
      content: <NewVideoForm />,
    },
    [CourseItemType.Article]: {
      id: 'Article',
      title: 'New Article',
      titleIcon: resourceIcon,
      content: <NewArticleForm />,
    },
  };

  const activeResource = (newResourceType && resource[newResourceType]) ?? null;

  return (
    <DetailsPanel
      className={className}
      title={activeResource?.title}
      titleIcon={activeResource?.titleIcon}
      isOpen={Boolean(activeResource)}
      onClose={onClose}
    >
      {activeResource?.content}
    </DetailsPanel>
  );
}
