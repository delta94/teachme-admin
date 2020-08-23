import React, { ReactElement } from 'react';

import { CourseItemType } from '../../../../interfaces/course.interfaces';
import DetailsPanel from '../../../common/DetailsPanel';
import TextCounterInput from '../../../common/TextCounterInput';
import Icon from '../../../common/Icon';

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
      content: (
        <div className={classes['new-article-form']}>
          <TextCounterInput
            maxLength={80}
            placeholder="Read this"
            label="Name"
            onBlur={(e) => {
              console.log('URL onBlur e => ', e);
            }}
          />
          <TextCounterInput
            maxLength={80}
            placeholder="http://"
            label="URL"
            onBlur={(e) => {
              console.log('URL onBlur e => ', e);
            }}
          />
        </div>
      ),
    },
    [CourseItemType.Article]: {
      id: 'Article',
      title: 'New Article',
      titleIcon: resourceIcon,
      content: (
        <div className={classes['new-video-form']}>
          <TextCounterInput
            maxLength={80}
            placeholder="Read this"
            label="Name"
            onBlur={(e) => {
              console.log('URL onBlur e => ', e);
            }}
          />
          <TextCounterInput
            maxLength={80}
            placeholder="http://"
            label="URL"
            onBlur={(e) => {
              console.log('URL onBlur e => ', e);
            }}
          />
        </div>
      ),
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
