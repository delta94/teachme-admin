import React, { ReactElement } from 'react';

import { CourseItemType } from '../../../../interfaces/course.interfaces';
import DetailsPanel from '../../../common/DetailsPanel';
import TextCounterInput from '../../../common/TextCounterInput';
import Icon from '../../../common/Icon';

import classes from './style.module.scss';

export default function NewResourcePanel({
  newResourceType,
  className,
  onClose,
}: {
  newResourceType?: CourseItemType;
  className: string;
  onClose: () => void;
}): ReactElement {
  return (
    <DetailsPanel
      className={className}
      title={
        newResourceType &&
        `New ${newResourceType.charAt(0).toUpperCase() + newResourceType.slice(1)}`
      }
      titleIcon={newResourceType && <Icon type={newResourceType} />}
      isOpen={Boolean(newResourceType)}
      onClose={onClose}
    >
      {newResourceType === CourseItemType.Article ? (
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
      ) : (
        'New Resource'
      )}
    </DetailsPanel>
  );
}
