import React, { ReactElement, useState } from 'react';
import cc from 'classcat';

import { CourseItemType } from '../../../../interfaces/course.interfaces';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon from '../../../common/Icon';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';

import NewResourceBaseForm from './NewResourceBaseForm';
import NewVideoForm from './NewVideoForm';
import { NewResourceType, IResourceBaseData, IResourceVideoData } from './interface';
import { initialNewResourceBaseData, initialNewVideoData } from './utils';

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
  const [newResourceData, setNewResourceData] = useState<IResourceBaseData | IResourceVideoData>();
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);

  const resourceIcon = newResourceType && <Icon type={newResourceType} />;

  const isValidData = (data: IResourceBaseData | IResourceVideoData) => {
    const isEmptyStr = (val?: string) => val === '';

    return isEmptyStr(data.title) || isEmptyStr(data.url);
  };

  const onDataChange = (data: IResourceBaseData | IResourceVideoData) => {
    setHasValidationError(isValidData(data));

    setNewResourceData(data);
  };

  const resource = {
    [CourseItemType.Video]: {
      id: 'Video',
      title: 'New Video',
      titleIcon: resourceIcon,
      content: (
        <NewVideoForm onDataChange={onDataChange} initialNewResource={initialNewVideoData} />
      ),
    },
    [CourseItemType.Article]: {
      id: 'Article',
      title: 'New Article',
      titleIcon: resourceIcon,
      content: (
        <NewResourceBaseForm
          onDataChange={onDataChange}
          initialNewResource={initialNewResourceBaseData}
        />
      ),
    },
  };

  const activeResource = (newResourceType && resource[newResourceType]) ?? null;

  const closePanel = () => {
    setNewResourceData(undefined);
    setHasValidationError(false);

    onClose();
  };

  const onSave = () => {
    // send resourceData to SDK
    console.log('onSave newResourceData => ', newResourceData);
    closePanel();
  };

  return (
    <DetailsPanel
      className={cc([classes['new-resource'], className])}
      title={activeResource?.title}
      titleIcon={activeResource?.titleIcon}
      isOpen={Boolean(activeResource)}
      onClose={closePanel}
    >
      {activeResource?.content}
      {activeResource && (
        <footer className={classes['actions']}>
          <WMButton
            variant={ButtonVariantEnum.Secondary}
            shape={'round'}
            className={classes['cancel-button']}
            onClick={closePanel}
          >
            Cancel
          </WMButton>
          <WMButton
            variant={ButtonVariantEnum.Primary}
            shape={'round'}
            disabled={hasValidationError || !newResourceData}
            onClick={onSave}
          >
            save
          </WMButton>
        </footer>
      )}
    </DetailsPanel>
  );
}
