import React, { ReactElement, useState } from 'react';
import cc from 'classcat';

import FormGroup from '../../../common/FormGroup';
import WMInput from '../../../common/WMInput';
import WMSwitch from '../../../common/WMSwitch';

import { IResourceVideoData } from './interface';
import NewResourceBaseForm from './NewResourceBaseForm';

import classes from './style.module.scss';

export interface INewVideoForm {
  data: IResourceVideoData;
}

export default function NewVideoForm({ data }: INewVideoForm): ReactElement {
  const [resourceData, setResourceData] = useState<IResourceVideoData>(data);
  const { autoplay, videoPlayerParameters, ...baseData } = resourceData;

  const onResourceDataChange = (updated: Partial<IResourceVideoData>) =>
    setResourceData({
      ...resourceData,
      ...updated,
    });

  return (
    <>
      <NewResourceBaseForm data={baseData} onDataChange={onResourceDataChange} />
      <WMSwitch
        className={classes['switch-field']}
        checked={resourceData.autoplay}
        label="Autoplay"
        onChange={(checked: boolean) =>
          onResourceDataChange({
            autoplay: checked,
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
          onChange={(e) => onResourceDataChange({ videoPlayerParameters: e.target.value })}
        />
      </FormGroup>
    </>
  );
}
