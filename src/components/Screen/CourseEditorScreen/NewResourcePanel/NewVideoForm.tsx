import React, { ReactElement, useState } from 'react';
import cc from 'classcat';

import FormGroup from '../../../common/FormGroup';
import WMInput from '../../../common/WMInput';
import WMSwitch from '../../../common/WMSwitch';

import { IResourceVideoData } from './interface';
import NewResourceBaseForm from './NewResourceBaseForm';

import { generateVideoParameter, autoplayActiveStr } from './utils';
import classes from './style.module.scss';

export interface INewVideoForm {
  initialNewResource: IResourceVideoData;
}

export default function NewVideoForm({ initialNewResource }: INewVideoForm): ReactElement {
  const [resourceData, setResourceData] = useState<IResourceVideoData>(initialNewResource);
  const { autoplay, videoPlayerParameters, ...baseData } = resourceData;

  const onResourceDataChange = (updated: Partial<IResourceVideoData>) =>
    setResourceData({
      ...resourceData,
      ...updated,
    });

  return (
    <>
      <NewResourceBaseForm initialNewResource={baseData} onDataChange={onResourceDataChange} />
      <WMSwitch
        className={classes['switch-field']}
        checked={resourceData.autoplay}
        label="Autoplay"
        onChange={(checked: boolean) =>
          onResourceDataChange({
            autoplay: checked,
            videoPlayerParameters: generateVideoParameter({
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
          onChange={(e) => {
            const { value } = e.target;
            onResourceDataChange({
              autoplay: value.includes(autoplayActiveStr),
              videoPlayerParameters: value,
            });
          }}
        />
      </FormGroup>
    </>
  );
}
