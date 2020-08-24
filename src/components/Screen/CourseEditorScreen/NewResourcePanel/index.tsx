import React, { ReactElement } from 'react';
import cc from 'classcat';

import { CourseItemType } from '../../../../interfaces/course.interfaces';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon from '../../../common/Icon';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';

import NewResourceForm from './NewResourceForm';
import { NewResourceType } from './interface';

import classes from './style.module.scss';

export type { NewResourceType };

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
        <NewResourceForm
          onDataChange={(data) => {
            console.log('NewResourceForm onDataChange', data);
          }}
        />
      ),
    },
    [CourseItemType.Article]: {
      id: 'Article',
      title: 'New Article',
      titleIcon: resourceIcon,
      content: (
        <NewResourceForm
          onDataChange={(data) => {
            console.log('NewResourceForm onDataChange', data);
          }}
        />
      ),
    },
  };

  const activeResource = (newResourceType && resource[newResourceType]) ?? null;

  return (
    <DetailsPanel
      className={cc([classes['new-resource'], className])}
      title={activeResource?.title}
      titleIcon={activeResource?.titleIcon}
      isOpen={Boolean(activeResource)}
      onClose={onClose}
    >
      {activeResource?.content}
      {activeResource && (
        <footer className={classes['actions']}>
          <WMButton
            variant={ButtonVariantEnum.Secondary}
            shape={'round'}
            className={classes['cancel-button']}
            onClick={() => console.log('Cancel')}
          >
            Cancel
          </WMButton>
          <WMButton
            variant={ButtonVariantEnum.Primary}
            shape={'round'}
            // disabled={!hasChanges }
            onClick={() => console.log('Save')}
          >
            save
          </WMButton>
        </footer>
      )}
    </DetailsPanel>
  );
}
