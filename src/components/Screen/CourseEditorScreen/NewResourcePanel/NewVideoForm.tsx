import React, { ReactElement, useState, ReactNode, useEffect } from 'react';
import cc from 'classcat';

import FormGroup from '../../../common/FormGroup';
import WMInput from '../../../common/WMInput';
import WMSwitch from '../../../common/WMSwitch';

import { IResourceVideoData } from './interface';
import NewResourceBaseForm from './NewResourceBaseForm';

import classes from './style.module.scss';
import { setVideoAutoplayParameter } from './utils';

export interface INewResourceForm {
  children?: ReactNode;
  initialNewResource: IResourceVideoData;
}

export default function NewVideoForm({ initialNewResource }: INewResourceForm): ReactElement {
  const [resourceData, setResourceData] = useState<IResourceVideoData>(initialNewResource);
  const { autoplay, videoPlayerParameters, ...baseData } = resourceData;

  const resourceDataChange = (updated: Partial<IResourceVideoData>) =>
    setResourceData({
      ...resourceData,
      ...updated,
    });

  return (
    <>
      <NewResourceBaseForm initialNewResource={baseData} onDataChange={resourceDataChange} />
      <WMSwitch
        className={classes['switch-field']}
        checked={resourceData.autoplay}
        label="Autoplay"
        onChange={(checked: boolean) =>
          resourceDataChange({
            autoplay: checked,
            videoPlayerParameters: setVideoAutoplayParameter({
              parameters: resourceData.videoPlayerParameters,
              autoplay: checked,
            }),
          })
        }
      />
      <FormGroup
        className={cc([classes['resource-field'], classes['video-parameters-field']])}
        title="Video Player Parameters"
      >
        <WMInput
          id="video-parameters-field"
          value={resourceData.videoPlayerParameters}
          onChange={(e) => resourceDataChange({ videoPlayerParameters: e.target.value })}
        />
      </FormGroup>
    </>
  );
}
