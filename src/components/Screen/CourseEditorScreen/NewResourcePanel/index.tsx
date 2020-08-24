import React, { ReactElement, useState } from 'react';
import cc from 'classcat';

import { CourseItemType } from '../../../../interfaces/course.interfaces';
import DetailsPanel from '../../../common/DetailsPanel';
import Icon from '../../../common/Icon';
import WMButton, { ButtonVariantEnum } from '../../../common/WMButton';
import WMSwitch from '../../../common/WMSwitch';
import WMInput from '../../../common/WMInput';
import FormGroup from '../../../common/FormGroup';

import NewResourceForm from './NewResourceForm';
import { NewResourceType, IResourceBaseData, IResourceVideoData } from './interface';

import classes from './style.module.scss';
import { initialNewResourceBaseData, initialNewVideoData } from './utils';

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
  const resourceIcon = newResourceType && <Icon type={newResourceType} />;

  const onDataChange = (data: IResourceBaseData | IResourceVideoData) => {
    setNewResourceData(data);
  };

  const onVideoDataChange = (updated: Partial<IResourceVideoData>) => {
    if (newResourceData) {
      onDataChange({
        ...newResourceData,
        ...updated,
      });
    } else {
      onDataChange({
        ...initialNewVideoData,
        ...updated,
      });
    }
  };

  const resource = {
    [CourseItemType.Video]: {
      id: 'Video',
      title: 'New Video',
      titleIcon: resourceIcon,
      content: (
        <>
          <NewResourceForm onDataChange={onDataChange} initialNewResource={initialNewVideoData}>
            <WMSwitch
              className={classes['switch-field']}
              defaultChecked={initialNewVideoData.autoplay}
              checked={(newResourceData as IResourceVideoData)?.autoplay}
              label="Autoplay"
              onChange={(checked: boolean) => onVideoDataChange({ autoplay: checked })}
            />
          </NewResourceForm>
          <FormGroup
            className={cc([classes['resource-field'], classes['video-parameters-field']])}
            title="Video Player Parameters"
          >
            <WMInput
              id="video-parameters-field"
              defaultValue={initialNewVideoData.videoPlayerParameters}
              value={(newResourceData as IResourceVideoData)?.videoPlayerParameters}
              onChange={(e) => onVideoDataChange({ videoPlayerParameters: e.target.value })}
            />
          </FormGroup>
        </>
      ),
    },
    [CourseItemType.Article]: {
      id: 'Article',
      title: 'New Article',
      titleIcon: resourceIcon,
      content: (
        <NewResourceForm
          onDataChange={onDataChange}
          initialNewResource={initialNewResourceBaseData}
        />
      ),
    },
  };

  const activeResource = (newResourceType && resource[newResourceType]) ?? null;

  const closePanel = () => {
    setNewResourceData(undefined);

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
            disabled={!newResourceData}
            onClick={onSave}
          >
            save
          </WMButton>
        </footer>
      )}
    </DetailsPanel>
  );
}
