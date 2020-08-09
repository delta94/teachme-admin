import React, { ReactElement, useState } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import {
  useCoursesContext,
  publishCourses,
  archiveCourses,
  fetchCoursesData,
} from '../../../providers/CoursesContext';
// import { PublishStatus } from '../../../walkme/data';

import WMButton, { ButtonVariantEnum } from '../../common/WMButton';
import { PublishToEnvironmentDialog } from '../../common/dialogs';

import classes from './style.module.scss';

export default function ProductionStatusActions(): ReactElement {
  const [appState] = useAppContext();
  const {
    dateRange: { from, to },
  } = appState;
  const [{ selectedRows }, dispatch] = useCoursesContext();

  // TODO: uncomment once sdk supports marking as draft
  // const hasPublished = selectedRows.some(
  //   (course) => course.publishStatus === PublishStatus.Published,
  // );
  // const hasArchived = selectedRows.some(
  //   (course) => course.publishStatus === PublishStatus.Archived,
  // );
  // const hasDraft = selectedRows.some((course) => course.publishStatus === PublishStatus.Draft);

  const [showPublish, setShowPublish] = useState(false);

  return (
    <>
      <div className={classes['production-status-actions']}>
        <WMButton variant={ButtonVariantEnum.Link} onClick={() => setShowPublish(true)}>
          Publish
        </WMButton>
        <WMButton
          variant={ButtonVariantEnum.Link}
          onClick={async () => {
            await archiveCourses(dispatch, 0, selectedRows);
            fetchCoursesData(dispatch, 0, from, to);
          }}
        >
          Archive
        </WMButton>
        {/* TODO: uncomment once sdk supports marking as draft */}
        {/* <WMButton
          variant={ButtonVariantEnum.Link}
          onClick={() => console.log('Production status was changed to draft')}
          disabled={hasPublished || (hasArchived && hasDraft)}
        >
          Mark as Draft
        </WMButton> */}
      </div>
      <PublishToEnvironmentDialog
        coursesCount={selectedRows.length}
        open={showPublish}
        onCancel={() => setShowPublish(false)}
        onConfirm={async (envId) => {
          setShowPublish(false);
          await publishCourses(dispatch, envId, selectedRows);
          fetchCoursesData(dispatch, 0, from, to);
        }}
      />
    </>
  );
}
